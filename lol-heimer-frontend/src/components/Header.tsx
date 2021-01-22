import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { connect } from 'react-redux';
import { authMapDispatchToProps, authMapStateToProps, AuthStateType, AuthDispatchType } from '@store/auth';

interface HeaderProps extends AuthStateType, AuthDispatchType {};

const Header: React.FC<HeaderProps> = ({
	userId,
	setLogout,
}) => {
	return (
		<header>
			<div className="nav-box flex flex-row justify-between items-center">
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
				<div className="flex flex-row justify-center items-center">
					{ userId ? (
						<>
							<span>{ userId }님 환영합니다.</span>
							<button
								className="px-2 py-1 btn-normal bg-orange-600 hover:bg-orange-500 text-white"
								onClick={() => { setLogout() }}
							>
								로그아웃
							</button>
						</>
					) : (
						<button className="px-2 py-1 btn-normal bg-orange-600 hover:bg-orange-500 text-white">
							<Link to="/login">로그인</Link>
						</button>
					)}
				</div>
			</div>
		</header>
	);
}

export default connect(authMapStateToProps, authMapDispatchToProps)(Header);
