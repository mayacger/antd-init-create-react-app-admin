import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import classNames from 'classnames';

import InputItem from './InputItem';

class FormCtrl extends Component {


	static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {},
  };
	static childContextTypes = {
    tabUtil: PropTypes.object,
    form: PropTypes.object,
    updateActive: PropTypes.func,
  };
	state = {
    type: this.props.defaultActiveKey,
    tabs: [],
    active: {},
  };


	getChildContext() {
    return {
      // tabUtil: {
      //   addTab: (id) => {
      //     this.setState({
      //       tabs: [...this.state.tabs, id],
      //     });
      //   },
      //   removeTab: (id) => {
      //     this.setState({
      //       tabs: this.state.tabs.filter(currentId => currentId !== id),
      //     });
      //   },
      // },
      form: this.props.form,
      updateActive: (activeItem) => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  }

	onSwitch = (type) => {
    this.setState({
      type,
    });
    this.props.onTabChange(type);
  }

	handleSubmit = (e) => {
    e.preventDefault();
    const { active, type } = this.state;
    const activeFileds = active[type];
    this.props.form.validateFields(activeFileds, { force: true },
      (err, values) => {
        this.props.onSubmit(err, values);
      }
    );
  }

	render () {
		const { className, children } = this.props;
    // const { type, tabs } = this.state;
    const TabChildren = [];
    const otherChildren = [];
    React.Children.forEach(children, (item) => {
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.type.__ANT_PRO_LOGIN_TAB) {
        TabChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });
		return (
			<div className={classNames(className, 'login')}>
				<Form onSubmit={this.handleSubmit}>
					{otherChildren}
				</Form>
			</div>
		)
	}
}


export {InputItem};


export default Form.create()(FormCtrl);
