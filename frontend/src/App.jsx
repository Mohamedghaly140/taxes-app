import { useState, useCallback, useEffect } from 'react';
import './App.css';
import { AuthContext } from './context/auth-context';
import AppRouter from './router/Router';

let logoutTimer;

const App = () => {
	const [name, setName] = useState(null);
	const [token, setToken] = useState(false);
	const [userId, setUserId] = useState(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

	const login = useCallback((uid, token, name, expirationDate) => {
		setName(name);
		setToken(token);
		setUserId(uid);
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				name: name,
				expiration: tokenExpirationDate.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setName(null);
		setToken(null);
		setUserId(null);
		setTokenExpirationDate(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, tokenExpirationDate, logout]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		console.log(
			'🚀 ~ file: App.jsx ~ line 52 ~ useEffect ~ storedData',
			storedData
		);
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			const { userId, token, name, expiration } = storedData;
			console.log('token', token);
			login(userId, token, name, new Date(expiration));
		}
	}, [login]);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				name: name,
				login: login,
				logout: logout,
			}}
		>
			<AppRouter />
		</AuthContext.Provider>
	);
};

export default App;
