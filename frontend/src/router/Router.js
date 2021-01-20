import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const Routes = () => {
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/sign-up" component={SignUp} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
