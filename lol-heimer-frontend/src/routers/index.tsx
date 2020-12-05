import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Pages from '@pages/index';
import User from '../pages/User';

const Routers: React.FC = (
): JSX.Element => {

	return (
		<Switch>
			<Route exact path='/' component={Pages} />
			<Route exact path='/user/:username' component={User} />
		</Switch>
	)
}

export default Routers;
