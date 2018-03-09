import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import Layout, { UserLayout } from './layout';

import { isLogin } from './action';


class RoutePage extends  Component{

	componentDidMount () {
		this.props.isLogin();
	}
	render () {
		const { user:{ isLogin } } = this.props;
		const loggedIn = true;
		return(
			<Router>
				<Switch>
					<Route path='/user' render={() => (
						isLogin ? (
							<Redirect to="/" />
						) : (
							<Route component={UserLayout} />
						)
						)} />
					<Route path='/' render={() => (
						isLogin ? (
							<Route component={Layout} />
						) : (
							<Redirect to="/user/login"/>
						)
						)} />

				</Switch>
			</Router>
		)
	}
}

export default connect((state) =>({
	user: state.user,
}),
(dispatch) => ({
	// isLogin: bindActionCreators({isLogin},dispatch),//方式1：多个
	isLogin: () => dispatch(isLogin()),//方式2：单个
}))(RoutePage);
