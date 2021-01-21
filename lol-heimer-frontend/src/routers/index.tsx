import { Switch, Route } from 'react-router-dom';
import Pages from '@pages/index';
import User from '../pages/User';
import './index.scss'
import PageNotFound404 from '@pages/error/PageNotFound404';
import UserNotFound from '@pages/error/UserNotFound';
import Login from '@pages/Login';

const Routers: React.FC = (
): JSX.Element => {

	return (
		<Switch>
			<Route exact path='/login' component={Login} />
			<Route exact path='/' component={Pages} />
			<Route exact path='/home/user/:username' component={User} />
			<Route exact path='/error/nouser' component={UserNotFound} />
			<Route path='*' component={PageNotFound404} />
		</Switch>
	)
}

export default Routers;
