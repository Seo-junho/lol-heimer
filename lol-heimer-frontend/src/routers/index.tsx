import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Pages from '@pages/index';

const Routers: React.FC = (
): JSX.Element => {

	return (
		<Switch>
			<Route exact path='/' component={Pages} />
		</Switch>
	)
}

export default Routers;
