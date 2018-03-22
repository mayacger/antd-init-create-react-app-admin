import { getData } from '../services';
import * as type from './type';
import { userManagePath } from '../config';
// const userManagePath = 'userManage';
// const requestData = category => ({
//     type: type.REQUEST_DATA,
//     category
// });
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});

/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
// export const fetchData = ({funcName, params, stateName}) => dispatch => {
//     !stateName && (stateName = funcName);
//     return fetch(params).then(res => dispatch(receiveData(res, stateName)));
// };


export const isLogin =  () => {
	return dispatch => {
		getData(userManagePath + '/api/isBigUsersLogin').then(data => {
				dispatch({
					type: 'ISLOGIN',
					isLogin: data.resultCode === -20000 ? false : true,
				});
		});
	};
};
export const toLogin =  (values) => {
	const { userName, password } = values;
	return dispatch => {

		dispatch({
			type: 'LOGINING',
			payload: {
				submitting: true
			}
		});
		// getData(userManagePath + '/auth/user/saveOrUpdateBigSystemManage', 'POST', {
		// 	// bigUsers: {
		// 		userName,
		// 		password,
		// 	// }
		// }).then(data => {
		getData(userManagePath + '/api/bigUsersLogin', 'POST', {
			bigUsers: {
				userName,
				password,
			}
		}).then(data => {
			if(data.resultCode > 0 ) {

				dispatch({
					type: 'LOGIN',
					payload: {
						user: data.resultData
					}

				});
			}else {
				dispatch({
					type: 'ISLOGIN',
					isLogin: false,
					submitting: false,
					// isLogin: data.resultCode === -20000 ? false : true,
				});
			}

		});
	};
};
