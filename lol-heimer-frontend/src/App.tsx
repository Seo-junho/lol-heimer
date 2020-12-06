import React from 'react';
import './App.scss';
import Routers from './routers';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = (
): JSX.Element => {
  return (
		<BrowserRouter>
			<Layout>
				<Routers />
			</Layout>
		</BrowserRouter>
  );
}

export default App;
