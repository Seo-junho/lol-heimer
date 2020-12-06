import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC = (
	{ children }
): JSX.Element => {

	return (
		<>
			<header>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
					</ul>
				</nav>
			</header>
			<div className="container">
				{ children }
			</div>
		</>
	)
}

export default Layout;
