import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const middleware = [thunk];

const initialState = {
	auth: {
		userInfo: userInfoFromStorage,
		isLoggedIn: userInfoFromStorage ? true : false,
	},
};

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
