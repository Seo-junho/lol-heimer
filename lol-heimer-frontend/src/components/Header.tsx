import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
						{/* <ul className="depth2">
							<li><a href="/">Home2</a></li>
						</ul> */}
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
