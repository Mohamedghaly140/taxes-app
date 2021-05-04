import httpClient from '../../api/httpClient';
import {
	// Get Financiers List Actions
	GET_FINANCIERS_LIST_REQUEST,
	GET_FINANCIERS_LIST_SUCCESS,
	GET_FINANCIERS_LIST_FAIL,
	// Get Financier Actions
	GET_FINANCIER_REQUEST,
	GET_FINANCIER_SUCCESS,
	GET_FINANCIER_FAIL,
	// Add Financier Actions
	ADD_FINANCIER_REQUEST,
	ADD_FINANCIER_SUCCESS,
	ADD_FINANCIER_FAIL,
	// Update Financier Actions
	UPDATE_FINANCIER_REQUEST,
	UPDATE_FINANCIER_SUCCESS,
	UPDATE_FINANCIER_FAIL,
	// Delete Financier Actions
	DELETE_FINANCIER_REQUEST,
	DELETE_FINANCIER_SUCCESS,
	DELETE_FINANCIER_FAIL,
} from '../constants/financier.actions';

export const getFinancierList = _ => {
	return async (dispatch, getState) => {
		dispatch({ type: GET_FINANCIERS_LIST_REQUEST });

		const {
			auth: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		try {
			const { data } = await httpClient.get(
				`/api/financier/user/${userInfo.userId}`,
				config
			);

			console.log(data);

			dispatch({
				type: GET_FINANCIERS_LIST_SUCCESS,
				payload: { financiers: data.financiers, message: data.message },
			});
		} catch (error) {
			dispatch({
				type: GET_FINANCIERS_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const getFinancierById = id => {
	return async (dispatch, getState) => {
		dispatch({ type: GET_FINANCIER_REQUEST });

		const {
			auth: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		try {
			const { data } = await httpClient.get(`api/financier/${id}`, config);

			console.log(data);

			dispatch({
				type: GET_FINANCIER_SUCCESS,
				payload: { financier: data.financier, message: data.message },
			});
		} catch (error) {
			dispatch({
				type: GET_FINANCIER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const addFinancier = financierData => {
	return async (dispatch, getState) => {
		dispatch({ type: ADD_FINANCIER_REQUEST });

		const {
			auth: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		try {
			const { data } = await httpClient.post(
				`/api/financier`,
				financierData,
				config
			);

			console.log(data);

			dispatch({
				type: ADD_FINANCIER_SUCCESS,
				payload: { financier: data.financier, message: data.message },
			});
		} catch (error) {
			dispatch({
				type: ADD_FINANCIER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const updateFinancier = (id, financierData) => {
	return async (dispatch, getState) => {
		dispatch({ type: UPDATE_FINANCIER_REQUEST });

		const {
			auth: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		try {
			const { data } = await httpClient.put(
				`/api/financier/${id}`,
				financierData,
				config
			);

			console.log(data);

			dispatch({
				type: UPDATE_FINANCIER_SUCCESS,
				payload: { financier: data.financier, message: data.message },
			});
		} catch (error) {
			dispatch({
				type: UPDATE_FINANCIER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const deleteFinancier = id => {
	return async (dispatch, getState) => {
		dispatch({ type: DELETE_FINANCIER_REQUEST });

		const {
			auth: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		console.log(userInfo.token);

		try {
			const { data } = await httpClient.delete(`/api/financier/${id}`, config);

			console.log(data);

			dispatch({
				type: DELETE_FINANCIER_SUCCESS,
				payload: { financier: data.financier, message: data.message },
			});
		} catch (error) {
			dispatch({
				type: DELETE_FINANCIER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};
