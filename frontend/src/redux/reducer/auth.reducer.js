import {
	USER_AUTH_REQUEST,
	USER_AUTH_LOGIN,
	USER_AUTH_REGISTER,
	USER_AUTH_FAIL,
	USER_AUTH_LOGOUT,
} from '../constants/auth.actions';

const initialState = {
	loading: false,
	isLoggedIn: false,
	userInfo: null,
	error: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_AUTH_REQUEST:
			return { ...state, isLoggedIn: false, loading: true };
		case USER_AUTH_LOGIN:
			return {
				...state,
				loading: false,
				isLoggedIn: true,
				userInfo: action.payload,
			};
		case USER_AUTH_REGISTER:
			return {
				...state,
				loading: false,
				isLoggedIn: true,
				userInfo: action.payload,
			};
		case USER_AUTH_FAIL:
			return {
				...state,
				loading: false,
				isLoggedIn: false,
				error: action.payload,
			};
		case USER_AUTH_LOGOUT:
			return { loading: false, userInfo: null, isLoggedIn: false, error: null };
		default:
			return state;
	}
};

export default userReducer;
