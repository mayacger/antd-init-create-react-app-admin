import { getData } from '../services';
import * as type from './type';

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});
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
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    return fetch(params).then(res => dispatch(receiveData(res, stateName)));
};


export const isLogin =  () => {
	return dispatch => {
		getData('userManage/user/isBigUsersLogin').then(data => {
				dispatch({
					type: 'ISLOGIN',
					isLogin: data.resultCode === -20000 ? false : true,
				})
		})
	}
}
