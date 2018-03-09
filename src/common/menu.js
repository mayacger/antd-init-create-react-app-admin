const menuBase = {
	"HR8HjoFl": {
		name: '系统配置管理',
	  icon: 'setting',
	  path: '/system',
		children: {
			"83QeuLEh": {
				name: '模块管理',
			  path: '/module',
			},
		}
	},
	"Y0x4ifsX": {
		name: '用户相关配置',
	  icon: 'user',
	  path: '/user',
		children: {
			"lw6R69Bj": {
				name: '商家用户管理',
			  path: '/shop',
			},
			"tJOtm4CE": {
				name: "网站用户管理",
			  path: '/web',
			},
			"YyNamNaX": {
				name: "角色管理",
			  path: '/role',
			},
			"InHUc1sL": {
				name: "大后台用户管理",
			  path: '/admin',
			},
		}
	},
	"9D609WTH": {
		name: '商家管理',
	  icon: 'shop',
	  path: '/seller',
		children: {
			"2SBF626P": {
				name: "商家账户管理",
				path: '/account',
			},
		},
	},
	"C3K8SKbt": {
		name: '财务管理',
	  icon: 'pay-circle',
	  path: '/finance',
		children: {
			"L6VqpmHH": {
				name: "支付渠道设置",
				path: '/channel',
			},
			"XNcPIx9q": {
				name: "提现管理",
				path: '/cash',
			},
			"yALo62LF": {
				name: "财务明细",
				path: '/detail',
			},
		},
	},
	"d67BsmxU": {
		name: '平台订单',
	  icon: 'file-text',
	  path: '/order',
	},
	"AsfLD0tl": {
		name: '网站会员管理',
	  icon: 'team',
	  path: '/member',
	},
	"wjCndcIm": {
		name: '页面管理',
	  icon: 'team',
	  path: '/cms',
		children: {
			"bv4j4Acg": {
				name: "模板分类",
				path: '/templetCategory',
			},
			"5uzKSjw0": {
				name: "模板管理",
				path: '/templet',
			},
			"mevhdeFv": {
				name: "页面分类",
				path: '/pageCategory',
			},
			"IrUNF2qL": {
				name: "页面编辑",
				path: '/pageEdit',
			},
		},
	},
};

export const getMenuData = (list, base = menuBase, parentPath = '') => {
	 return list.map((item) => {
		const parent = base[item.modNo];
		const result = {
			// ...item,
			name: parent.name || item.name,
			path: parentPath + parent.path,
			icon: parent.icon || '',
		}
		if(item.childSysModules.length) {
			result.children = getMenuData(item.childSysModules, parent.children, `${parentPath + parent.path}` );
			//  item.childSysModules.map((subItem) => {
			// 	if (parent.children[subItem.modNo]) {
			// 		 subItem.path = item.path + parent.children[subItem.modNo].path;
			// 	}
			// 	// return subItem;
			// });
		}
		return result;
	});
};
