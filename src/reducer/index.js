import { combineReducers } from 'redux';
import * as type from '../action/type';

const defaultData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
            };
        default:
            return {...state};
    }
};

const user = (state={}, action) => {
	switch (action.type) {
		case 'ISLOGIN':
			return {
				...state,
				isLogin: action.isLogin
			}
		case 'LOGIN':
			return {
				...state,
				isLogin: action.payload.isLogin
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
    defaultData,
		user,
		register,
});
