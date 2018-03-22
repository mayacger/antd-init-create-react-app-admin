import React, { Component } from 'react';
import { Checkbox } from 'antd';
import { connect } from 'react-redux';

import SubmitButton from '../../components/From/SubmitButton';
import Link from '../../components/Link';
import From, { InputItem } from '../../components/From';
import styles from './index.module.less';
import mapConfig from './map';
import { toLogin } from '../../action';

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
    if (!err) {
			this.props.dispatch(toLogin(values));
    }
  }


	render () {
		const { type } = this.state;
		const { submitting } = this.props;
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
			<div className={styles.main}>
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
					<SubmitButton loading ={submitting}>登录</SubmitButton>
					<div className={styles.other}>
	            <Link className={styles.register} to="/user/register">注册账户</Link>
	        </div>
				</From>
			</div>
		)
	}
}
export default connect(state => ({
	submitting: state.user.submitting
}))(Login);
