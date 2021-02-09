import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Navigation from '../components/Navigation/Navigation';
import AddFinancier from '../pages/AddFinancier/AddFinancier';

import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import FinancierDetails from '../pages/FinancierDetails/FinancierDetails';
import Home from '../pages/Home/Home';

const Routes = () => {
	const authContext = useContext(AuthContext);
	const { isLoggedIn, token } = authContext;

	let routes;

	if (token && isLoggedIn) {
		routes = (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/add-financier" component={AddFinancier} />
				<Route path="/edit-financier/:id" component={AddFinancier} />
				<Route path="/financier/:id" component={FinancierDetails} />
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/sign-up" component={SignUp} />
				<Redirect to="/login" />
			</Switch>
		);
	}

	return (
		<>
			<Navigation />
			{routes}
		</>
	);
};

export default Routes;
