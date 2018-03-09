import React, { PureComponent } from 'react';

import { Layout, Icon, Dropdown, Avatar, Menu
 } from 'antd';

import './index.less';
const { Header } = Layout;



export default class GlobalHeader extends PureComponent {



	render () {
		const { collapsed, toggle} = this.props;
		const menu = (
		  <Menu >
		    <Menu.Item key="1">1st menu item</Menu.Item>
		    <Menu.Item key="2">2nd memu item</Menu.Item>
		    <Menu.Item key="3">3rd menu item</Menu.Item>
		  </Menu>
		);
		return(
			<Header style={{color: '#fff', padding: 0}}>
				<Icon
          className='trigger'
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={ () => toggle()}
        />
				<div className="right">
					<Dropdown overlay={menu}>
				    <span className="action account">
							 <Avatar size="small" className="avatar" src={''} />
				      admin
					</span>
				  </Dropdown>
				</div>
			</Header>
		)
	}
}
