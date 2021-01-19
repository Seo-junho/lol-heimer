import Article from '@components/Article';
import LoginForm from '@components/Login/LoginForm';
import React from 'react';
import './Login.scss';

const Login: React.FC = () => {
	return (
		<div className={'flex flex-col items-center justify-center article-login login-box'}>
			<h1 className="text-white text-2xl md:text-6xl leading-loose mb-5">LoL Heimer Login</h1>
			<LoginForm />
		</div>
	);
}
export default Login;
