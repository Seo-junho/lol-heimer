import React from 'react';

const Article: React.FC = ({
	children
}) => {
	return (
		<article className="max-w-7xl mx-auto p-5">
			{ children }
		</article>
	);
}

export default Article
