import React from 'react';
import './App.scss';
import Routers from './routers';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = (
): JSX.Element => {
  return (
		<BrowserRouter>
			<Routers />
		</BrowserRouter>
  );
}

export default App;
