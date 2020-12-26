import { Switch, Route } from 'react-router-dom';
import Pages from '@pages/index';
import User from '../pages/User';
import './index.scss'

const Routers: React.FC = (
): JSX.Element => {

	return (
		<Switch>
			<Route exact path='/' component={Pages} />
			<Route exact path='/home/user/:username' component={User} />
		</Switch>
	)
}

export default Routers;
