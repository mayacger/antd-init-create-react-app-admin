import { combineReducers } from 'redux';
// import * as type from '../action/type';
import adminAccount from './admin';


const user = ( state = {submitting: false}, action ) => {
	switch (action.type) {
		case 'ISLOGIN':
			return {
				...state,
				isLogin: action.isLogin,
				submitting: false,
			};
		case 'LOGIN':
			return {
				...state,
				userInfo: action.payload.user,
				submitting: false,
				isLogin: true,
			}
		case 'LOGINING':
			return {
				...state,
				submitting: true,
			}
		default:
			return {...state};
	}
}
const register = (state={status:undefined}, action) => {
	switch (action.type) {

		default:
			return {...state};
	}
}
export default combineReducers({
		user,
		register,
		adminAccount,
});
