import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';

import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import Home from '../pages/Home/Home';

const Routes = () => {
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/sign-up" component={SignUp} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
