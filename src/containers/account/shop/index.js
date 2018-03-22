import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeader from '../../../components/PageHeader';
import * as actions from './action';
class ShopUser extends Component {


	componentDidMount() {
		this.props.actions.findSellerMembers();
	}

	render() {
		const { name } = this.props;
		return (
			<PageHeader {...this.props}  title={name} dec="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"  >
				商家用户管理
			</PageHeader>
		);
	}
}

export default connect((state)=> ({}), (dispatch)=>({
	actions: bindActionCreators({...actions}, dispatch)
}))(ShopUser);
