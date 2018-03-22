import React, { PureComponent } from 'react';

import { Layout, Icon, Dropdown, Avatar, Menu
 } from 'antd';

import styles from './index.module.less';
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
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={ () => toggle()}
        />
			<div className={styles.right}>
					<Dropdown overlay={menu}>
				    <span className={styles.action + " " +styles.account}>
							 <Avatar size="small" className={styles.avatar} src={''} />
				      admin
					</span>
				  </Dropdown>
				</div>
			</Header>
		)
	}
}
