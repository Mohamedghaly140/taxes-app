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

// Get Financier List
const initialStateList = { loading: false, financiers: [], error: null };

export const getFinancier = (state = initialStateList, action) => {
	switch (action.type) {
		case GET_FINANCIER_REQUEST:
			return { ...state, loading: true };
		case GET_FINANCIER_SUCCESS:
			return {
				...state,
				loading: false,
				financier: action.payload.financier,
			};
		case GET_FINANCIER_FAIL:
			return {
				...state,
				loading: false,
				financier: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

// Add Financier List
const initialStateItem = { loading: false, financier: null, error: null };

export const getFinanciersList = (state = initialStateItem, action) => {
	switch (action.type) {
		case GET_FINANCIERS_LIST_REQUEST:
			return { ...state, loading: true };
		case GET_FINANCIERS_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				financiers: action.payload.financiers,
			};
		case GET_FINANCIERS_LIST_FAIL:
			return {
				...state,
				loading: false,
				financiers: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

// Add Financier List
const initialStateAdd = {
	loading: false,
	financier: null,
	success: false,
	error: null,
};

export const addFinancier = (state = initialStateAdd, action) => {
	switch (action.type) {
		case ADD_FINANCIER_REQUEST:
			return { ...state, loading: true };
		case ADD_FINANCIER_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				financier: action.payload.financier,
			};
		case ADD_FINANCIER_FAIL:
			return {
				...state,
				loading: false,
				financier: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

// Update Financier List
const initialStateUpdate = {
	loading: false,
	financier: null,
	success: false,
	error: null,
};

export const updateFinancier = (state = initialStateUpdate, action) => {
	switch (action.type) {
		case UPDATE_FINANCIER_REQUEST:
			return { ...state, loading: true };
		case UPDATE_FINANCIER_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				financier: action.payload.financier,
			};
		case UPDATE_FINANCIER_FAIL:
			return {
				...state,
				loading: false,
				financier: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

// Delete Financier List
const initialStateDelete = {
	loading: false,
	financier: null,
	success: false,
	error: null,
};

export const deleteFinancier = (state = initialStateDelete, action) => {
	switch (action.type) {
		case DELETE_FINANCIER_REQUEST:
			return { ...state, loading: true };
		case DELETE_FINANCIER_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				financier: action.payload.financier,
			};
		case DELETE_FINANCIER_FAIL:
			return {
				...state,
				loading: false,
				financier: null,
				error: action.payload,
			};
		default:
			return state;
	}
};
