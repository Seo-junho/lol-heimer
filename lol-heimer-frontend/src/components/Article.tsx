import React from 'react';

interface IProps {
	className?: string;
}

const Article: React.FC<IProps> = ({
	children,
	className,
}) => {
	return (
		<article className={`max-w-7xl mx-auto p-5 ${className}`}>
			{ children }
		</article>
	);
}

export default Article
