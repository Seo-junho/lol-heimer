import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Layout.scss'
import Loading from '@components/Loading';
import { LoadingType } from './store/index';

const mapStateToProps = ({ isLoading }: LoadingType, ownProps: {}) => {
  return { isLoading };
};

interface IProps extends LoadingType {};

const Layout: React.FC<IProps> = ({
	children,
	isLoading,
}): JSX.Element => {
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
			{ isLoading && (
				<Loading />
			)}
			<div>
				{ children }
			</div>
		</>
	)
}

export default connect(mapStateToProps)(Layout);
