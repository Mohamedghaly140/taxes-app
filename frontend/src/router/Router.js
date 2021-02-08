import { Switch, Route } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import AddFinancier from '../pages/AddFinancier/AddFinancier';

import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import FinancierDetails from '../pages/FinancierDetails/FinancierDetails';
import Home from '../pages/Home/Home';

import PrivateRoute from '../components/Routing/Routing';
import NotFound from '../pages/NotFound/NotFound';

const Routes = () => {
	return (
		<>
			<Navigation />
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/sign-up" component={SignUp} />
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute path="/add-financier" component={AddFinancier} />
				<PrivateRoute path="/edit-financier/:id" component={AddFinancier} />
				<PrivateRoute path="/financier/:id" component={FinancierDetails} />
				<Route component={NotFound} />
			</Switch>
		</>
	);
};

export default Routes;
