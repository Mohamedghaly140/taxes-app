import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { isLoggedIn, token } = authContext;

	console.log(isLoggedIn, token);

	return (
		<Route
			{...rest}
			render={props =>
				!isLoggedIn && !token ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
