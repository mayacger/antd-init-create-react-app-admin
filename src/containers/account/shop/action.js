import { getData } from '../../../services';
import { userManagePath } from '../../../config';
export const findSellerMembers =  () => {
	return dispatch => {
		getData(userManagePath + '/api/user/findSellerMembers','POST', {mainParam:{}}).then(data => {
			console.log(data);
				// dispatch({
				// 	type: 'ISLOGIN',
				// 	isLogin: data.resultCode === -20000 ? false : true,
				// });
		});
	};
};
