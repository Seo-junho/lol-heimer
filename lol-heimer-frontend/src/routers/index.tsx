import Switch from 'react-bootstrap/esm/Switch';
import { BrowserRouter, Route } from 'react-router-dom';
import Pages from '@pages/index';

const Routers: React.FC = (
): JSX.Element => {

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Pages} />
			</Switch>
		</BrowserRouter>
	)
}

export default Routers;
