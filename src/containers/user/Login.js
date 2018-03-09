import React, { Component } from 'react';
import { Checkbox, Alert, Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SubmitButton from '../../components/From/SubmitButton';
import Link from '../../components/Link';
import From, { InputItem } from '../../components/From';
import './main.less';
import mapConfig from './map';


class Login extends Component {
	state = {
    type: 'account',
    autoLogin: true,
  }

	changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

	handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          ...values,
          type,
					isLogin: true,
        },
      });
    }
  }


	render () {
		const { type } = this.state;
		const UserName = InputItem({
		    defaultProps: mapConfig.UserName.props,
		    defaultRules: mapConfig.UserName.rules,
		    type: 'UserName',
		  })(mapConfig.UserName.component);
		const Password = InputItem({
		    defaultProps: mapConfig.Password.props,
		    defaultRules: mapConfig.Password.rules,
		    type: 'Password',
		  })(mapConfig.Password.component);


		return (
			<div className="user-main">
				<From
					defaultActiveKey={type}
					onSubmit={this.handleSubmit}
					>
					<div>
						<UserName name="userName" placeholder="用户名" />
						<Password name="password" placeholder="密码"/>
	          <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>

	          <a style={{ float: 'right' }} href="">忘记密码</a>
	        </div>
					<SubmitButton>登录</SubmitButton>
					<div className="other">
	            <Link className="register" to="/user/register">注册账户</Link>
	        </div>
				</From>
			</div>
		)
	}
}
export default connect()(Login);
