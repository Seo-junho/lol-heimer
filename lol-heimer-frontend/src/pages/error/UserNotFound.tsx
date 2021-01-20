import React from 'react';
import Article from './../../components/Article';
import { Link } from 'react-router-dom';
import MainSearchBox from '@components/SearchBox/MainSearchBox';
import Layout from './../../Layout';

const UserNotFound: React.FC = () => {
	return (
		<Layout>
			<Article>
				<div className="w-full h-full flex flex-col items-start justify-center mt-20">
					<MainSearchBox />
					<h1 className="text-4xl">
						Not Found User
					</h1>
					<h2 className="text-2xl mt-3">
						이런 검색하신 유저를 찾을 수 없습니다!
					</h2>
					<button className="bg-orange-400 hover:bg-orange-500 text-white text-2xl px-3 py-2 mt-4">
						<Link to="/">
							홈으로 가기
						</Link>
					</button>
				</div>
			</Article>
		</Layout>
	);
}

export default UserNotFound;
