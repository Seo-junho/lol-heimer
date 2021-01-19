import React from 'react';
import './App.scss';
import Routers from './routers';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = (
): JSX.Element => {
  return (
		<BrowserRouter>
			<HelmetProvider>
				<Routers />
			</HelmetProvider>
		</BrowserRouter>
  );
}

export default App;
