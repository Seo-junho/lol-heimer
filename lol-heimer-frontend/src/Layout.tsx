import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Layout.scss'

const mapStateToProps = (state: boolean, ownProps: {}) => {
  return { loadingState: state };
};

const Layout: React.FC = ({
	children,
	loadingState,
}: any): JSX.Element => {

	return (
		<>
			<header>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/'>Home2</Link>
						</li>
						<li>
							<Link to='/'>Home3</Link>
						</li>
					</ul>
				</nav>
			</header>
			<div className="container">
				{ children }
			</div>
			{ loadingState.isLoading && (
				<div>Loading</div>
			)}
		</>
	)
}

export default connect(mapStateToProps)(Layout);
