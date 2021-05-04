import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import {
	getFinanciersList,
	addFinancier,
	updateFinancier,
	deleteFinancier,
	getFinancier,
} from './financier.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	getFinancier: getFinancier,
	getFinanciersList: getFinanciersList,
	addFinancier: addFinancier,
	updateFinancier: updateFinancier,
	deleteFinancier: deleteFinancier,
});

export default rootReducer;
