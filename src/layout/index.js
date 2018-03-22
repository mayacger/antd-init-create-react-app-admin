import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import SiderMenu from '../components/SiderMenu';
import { getData } from '../services';
import { Route, Switch } from 'react-router-dom';

import GlobalHeader from '../components/GlobalHeader';
import { getMenuData } from '../common/menu';
import logo from '../logo.svg';
import UserLayout from './UserLayout';

import { getRouterData } from '../common/route';




const { Content, Footer } = Layout;


class nullComponent extends PureComponent {
	render() {
		return null;
	}
}

export { UserLayout };

class LayoutWrapper extends PureComponent {


	state = {
		SiderMenuList: getMenuData(),
		routerDatas: getRouterData(),
		collapsed: false,
	}


	static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.array,
  }

	getChildContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: getRouterData(),
    };
  }

	componentDidMount () {
		getData('moduleManage/auth/moduleManage/findModulesTree/SYS_BIG')
		.then(data => {
			if(data.resultCode > 0 ) {
				this.setState({
					SiderMenuList: getMenuData(data.resultData),
				})
			}
		});
	}
	getPageTitle = ()  => {
    const { location } = this.props;
		// const { SiderMenuList } = this.state;

    const { pathname } = location;

    let title = '遛弯电商';
		const { routerDatas } = this.state;
		const pageData = routerDatas.find(item =>{
			return item.path.search(pathname) >= 0;
		} );
    if (pageData && pageData.name) {
      title = `${pageData.name} `;
    }
    return title;
  }
	onCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}


	render () {
		const currYear = new Date().getFullYear();
		const { routerDatas } = this.state;
		// const SubRoutes = (route) => (
		// 	<Route
		// 		 path={route.path}
		// 		 render={props => (
		// 			 <route.component {...props} routes={route.routes} />
		// 		 )}
		// 	 />
		// )
		if(!this.state.SiderMenuList.length) {
			return null;
		}
		return (
			<DocumentTitle title={this.getPageTitle()}>
					<Layout>
				    <SiderMenu
							collapsed={this.state.collapsed}
							onCollapse={this.onCollapse}
							logo={logo}
							company='遛弯电商'
							SiderMenuList={this.state.SiderMenuList}/>
				    <Layout>
				      <GlobalHeader
								collapsed={this.state.collapsed}
								toggle={this.onCollapse}
								/>
							<Content style={{ margin: '24px 24px 0', height: '100%' }}>
									<Switch>
										{routerDatas.map((item , i) => <Route  key={i} path={item.path} render={ (props) => <item.component {...item} {...props} /> }  />)}
										<Route  component={nullComponent} />
									</Switch>
				      </Content>
				      <Footer style={{ textAlign: 'center' }}>
				        ©{currYear}
				      </Footer>
				    </Layout>
				  </Layout>
				</DocumentTitle>
		)
	}
}
// {routerDatas.map((item , i) => <SubRoutes key={i} {...item} />)}

export default LayoutWrapper;
