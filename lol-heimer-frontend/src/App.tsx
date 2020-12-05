import React from 'react';
import './App.scss';
import Routers from './routers';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = (
): JSX.Element => {
  return (
    <div className="App">
			<BrowserRouter>
				<Layout>
					<Routers />
				</Layout>
			</BrowserRouter>
    </div>
  );
}

export default App;
