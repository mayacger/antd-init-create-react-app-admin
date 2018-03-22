import React, { PureComponent, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';

import GlobalFooter from '../components/GlobalFooter';
import Link from '../components/Link';
import Login from '../containers/user/Login';
import Register from '../containers/user/Register';
import logo from '../logo.svg';
import './user.less';

const links = [{
  key: 'help',
  title: '帮助',
  href: '/help',
}, {
  key: 'privacy',
  title: '隐私',
  href: '/privacy',
}, {
  key: 'terms',
  title: '条款',
  href: '/terms',
}];
const currYear = new Date().getFullYear();
const copyright = <Fragment>Copyright <Icon type="copyright" /> {currYear} </Fragment>;


const routerData = {
	'/user': {
		name: '用户中心',
	},
	'/user/login': {
		name: '登录',
	},
	'/user/register': {
		name: '注册',
	},
}
class UserLayout extends PureComponent {

	getPageTitle() {
    const { location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}`;
    }
    return title;
  }

	render () {
		return (
			<DocumentTitle title={this.getPageTitle()}>
				<div className="container">
					<div className="content">
						<div className="top">
              <div className="header">
                <Link to="/">
                  <img alt="logo" className="logo-login" src={logo} />
                  <span className="title">遛弯电商</span>
                </Link>
              </div>
              <div className="desc">先进的电商管理运营推广系统</div>
            </div>
						<Switch >
							<Route exact path="/user/login" component={Login}/>
							<Route exact path="/user/register" component={Register}/>
						</Switch>
					</div>
					<GlobalFooter links={links} copyright={copyright} />
				</div>
			</DocumentTitle>
		)
	}
}

export default UserLayout;
