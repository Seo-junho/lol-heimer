import { Switch, Route, Redirect } from 'react-router-dom';
import Pages from '@pages/index';
import User from '../pages/User';
import './index.scss'
import PageNotFound404 from '@pages/error/PageNotFound404';
import UserNotFound from '@pages/error/UserNotFound';
import Login from '@pages/Login';
import { connect } from 'react-redux';
import { authMapDispatchToProps, authMapStateToProps, AuthStateType } from '@store/auth';

interface RoutersProps extends AuthStateType {};

const Routers: React.FC<RoutersProps> = ({
	userId
}): JSX.Element => {
	return (
		<Switch>
			<Route exact path='/login'>
				{ userId && <Redirect to='/' /> }
				<Login />
			</Route>
			<Route exact path='/' component={Pages} />
			<Route exact path='/home/user/:username' component={User} />
			<Route exact path='/error/nouser' component={UserNotFound} />
			<Route path='*' component={PageNotFound404} />
		</Switch>
	)
}

// export default Routers;
export default connect(authMapStateToProps, authMapDispatchToProps)(Routers);
