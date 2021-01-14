import React from 'react';
import { Link } from 'react-router-dom';
import Article from '@components/Article';

const PageNotFound404: React.FC = () => {
	return (
		<Article>
			<div className="w-full h-full flex flex-col items-start justify-center mt-20">
				<h1 className="text-4xl">
					Page 404
				</h1>
				<h2 className="text-2xl mt-3">
					이런 페이지를 찾을 수 없습니다!
				</h2>
				<button className="bg-orange-400 hover:bg-orange-500 text-white text-2xl px-3 py-2 mt-4">
					<Link to="/">
						홈으로 가기
					</Link>
				</button>
			</div>
		</Article>
	);
}

export default PageNotFound404;
