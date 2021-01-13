import React from 'react';
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
			{/* <header>
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
			</header> */}
			{ isLoading && (
				<Loading />
			)}
			<div className="main-container">
				{ children }
			</div>
			<footer className="bg-orange-400 text-white">
				<div className="max-w-7xl p-3 text-xs2 md:text-xs">
					<div className="flex flex-col md:flex-row">
						<span className="pr-2">
							Developer: AJu / junho.seo
						</span>
						<span className="pr-2 text-gray-600">
							<a className="gitgub-a" target="_blink" href="https://github.com/zoz0312">https://github.com/zoz0312</a>
						</span>
						<span className="text-gray-600">
							<a className="gitgub-a" target="_blink" href="https://github.com/Seo-junho">https://github.com/Seo-junho</a>
						</span>
					</div>
					<div>
						© 2021 LOL-Heimer. LOL-Heimer isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
					</div>
				</div>
			</footer>
		</>
	)
}

export default connect(mapStateToProps)(Layout);
