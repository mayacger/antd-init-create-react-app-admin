import ShopUser from '../containers/account/shop';
import adminUser from '../containers/account/admin';

const routeConfig = {
	'/account/shop': {
		component: ShopUser,
		name: '商家用户管理'
	},
	'/account/admin': {
		component: adminUser,
		name: '大后台用户管理'
	},
};


export const getRouterData = () => {
	const routerData = [];


	Object.keys(routeConfig).map((path) => {
		let router = routeConfig[path];
		router = {
			...router,
			path,
		};
		return routerData.push(router);
	});
	return routerData;
};
