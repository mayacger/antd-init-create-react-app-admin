import React, { Component } from 'react';
import { Layout, Icon, Menu } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { withRouter } from 'react-router'
import { urlToList } from '../../utils/pathTools';
import Link from '../Link';
import './menu.less';


const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export const getMeunMatcheys = (flatMenuKeys, path) => {
  return flatMenuKeys.filter((item) => {
    return pathToRegexp(item).test(path);
  });
};

class SiderMenu extends Component {


	constructor(props) {
    super(props);
		this.menus = props.SiderMenuList;
    this.flatMenuKeys = this.getFlatMenuKeys(props.SiderMenuList);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }

	componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }

	/**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    const list =  urlToList(pathname)
      .map((item) => {
        return getMeunMatcheys(this.flatMenuKeys, item)[0];
      })
      .filter(item => item);
			return list;
  }

	/**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  }

	// Get the currently selected menu
  getSelectedMenuKeys = () => {
    const { location: { pathname } } = this.props;
    return urlToList(pathname).map(itemPath =>
      getMeunMatcheys(this.flatMenuKeys, itemPath).pop(),
    );
  };

	isMainMenu = (key) => {
    return this.menus.some(
      item =>
        key && (item.key === key || item.path === key),
    );
  }

	handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };
	_renderMenu = (items) => {
		const { openKeys } = this.state;
		const { collapsed } = this.props;
		const menuProps = collapsed
      ? {}
      : {
        openKeys,
      };
		let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }


		if(items.length> 0){
			return (
				<Menu
					key="Menu"
					{...menuProps}
					onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
					mode="inline"
					theme="dark"
					inlineCollapsed={collapsed}
				>
				{items.map((item, i) => {
					if (item.children && item.children.length ){
						return (
							<SubMenu
								key={item.path}
								title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
								>
								{
									item.children.map((sub) => <Menu.Item key={sub.path}>
									<Link to={sub.path}>{sub.name}</Link>
								</Menu.Item>)
							}
							</SubMenu>
						)
					}else {
						return (
							<Menu.Item key={item.path}>
								<Link to={item.path}>
									<Icon type={item.icon} />
									<span>{item.name}</span>
								</Link>
							</Menu.Item>
						)
					}

				})}
			</Menu>
			)
		}
	}

	render () {
		const { SiderMenuList, logo, company, collapsed, onCollapse } = this.props;
		return (
			<Sider
				breakpoint="lg"
				collapsed={collapsed}
        onCollapse={onCollapse}
			>
				<div className="logo" key="logo">
					<Link to="/">
						<img src={logo} alt="logo" />
						<h1>{company}</h1>
					</Link>
				</div>
				{ SiderMenuList.length && this._renderMenu(SiderMenuList) }
			</Sider>
		);
	}
}

export default withRouter(SiderMenu);
