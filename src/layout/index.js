import React, { PureComponent } from 'react';
import { Layout } from 'antd';

import DocumentTitle from 'react-document-title';

import SiderMenu from '../components/SiderMenu';
import { getData } from '../services';
import { Route, Switch, Redirect } from 'react-router-dom';

import GlobalHeader from '../components/GlobalHeader';
import { getMenuData } from '../common/menu';
import logo from '../logo.svg';
import UserLayout from './UserLayout';




const { Content, Footer } = Layout;


class nullComponent extends PureComponent {
	render() {
		return <div>order</div>;
	}
}

export { UserLayout };

class LayoutWrapper extends PureComponent {


	state = {
		SiderMenuList: [],
		collapsed: false,
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
    const { routerData, location } = this.props;
		const { SiderMenuList } = this.state;

    const { pathname } = location;

    let title = '遛弯电商';
    if (SiderMenuList[pathname] && SiderMenuList[pathname].name) {
      title = `${SiderMenuList[pathname].name} `;
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
							<Content style={{ margin: '24px 16px 0', height: '100%'  }}>
				        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
				          content
									<Switch>
										<Route path='/order' component={nullComponent} />
									</Switch>
				        </div>
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


export default LayoutWrapper;
