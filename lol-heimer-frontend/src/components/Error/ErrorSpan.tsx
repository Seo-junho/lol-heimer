import React from 'react';

interface ErrorSpanProps {
	className?: string;
}

const ErrorSpan: React.FC<ErrorSpanProps> = ({
	children,
	className = '',
}) => {
	return (
		<span className={`${className} mb-2 p-1 text-red-500`}>{ children }</span>
	)
}

export default ErrorSpan;
