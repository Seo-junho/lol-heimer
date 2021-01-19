import Article from '@components/Article';
import LoginForm from '@components/Login/LoginForm';
import React from 'react';
import './Login.scss';

const Login: React.FC = () => {
	return (
		<Article className={'flex items-center justify-center article-login '}>
			<LoginForm />
		</Article>
	);
}

export default Login;
