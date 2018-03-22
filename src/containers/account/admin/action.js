import { getData } from '../../../services';
import { userManagePath } from '../../../config';
export const findMembers =  () => {
	return dispatch => {
		getData(userManagePath + '/api/user/findBigUsers','POST', {mainParam:{}}).then(({resultCode, resultData}) => {
			if (resultCode > 0) {
				// let list = [];
				// resultData.list.map((item) => {
				// 	item.key = item.userNo;
				// 	return list.push(item)
				// });

				dispatch({
					type: 'BIGUSERS',
					bigUsers: {
						...resultData,
					},
				});
			}
		});
	};
};
export const saveBigSystemManage =  (values) => {
	return dispatch => {
		getData(userManagePath + '/api/user/saveOrUpdateBigSystemManage','POST',
		{
			bigUserPrmRefs:['admin'],
			enable:1,
			userName: values.name,
			password: values.password,
			remark: values.password,
			nickName: values.name,
		}
		).then(({resultCode, resultData}) => {
			if (resultCode > 0) {
				// dispatch({
				// 	type: 'BIGUSERS',
				// 	bigUsers: resultData,
				// });
			}
		});
	};
};
export const removeBigUsers =  (userNo) => {
	return dispatch => {
		getData(userManagePath + '/api/user/removeBigUsers','POST',
		{
			bigUserNos:userNo,
		}
		).then(({resultCode, resultData}) => {
			if (resultCode > 0) {
				// dispatch({
				// 	type: 'BIGUSERS',
				// 	bigUsers: resultData,
				// });
			}
		});
	};
};
