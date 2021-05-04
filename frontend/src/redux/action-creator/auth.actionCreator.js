import httpClient from '../../api/httpClient';
import {
	USER_AUTH_REQUEST,
	USER_AUTH_LOGIN,
	USER_AUTH_REGISTER,
	USER_AUTH_FAIL,
	USER_AUTH_LOGOUT,
} from '../constants/auth.actions';

export const login = userData => {
	return async dispatch => {
		dispatch({ type: USER_AUTH_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await httpClient.post(
				'/api/auth/login',
				userData,
				config
			);

			dispatch({
				type: USER_AUTH_LOGIN,
				payload: data,
			});

			localStorage.setItem('userInfo', JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: USER_AUTH_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const register = userData => {
	return async dispatch => {
		dispatch({ type: USER_AUTH_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await httpClient.post(
				'/api/auth/signup',
				userData,
				config
			);

			dispatch({
				type: USER_AUTH_REGISTER,
				payload: data,
			});

			dispatch({
				type: USER_AUTH_LOGIN,
				payload: data,
			});

			localStorage.setItem('userInfo', JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: USER_AUTH_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const logout = () => {
	return dispatch => {
		localStorage.removeItem('userInfo');

		dispatch({ type: USER_AUTH_LOGOUT });
	};
};
