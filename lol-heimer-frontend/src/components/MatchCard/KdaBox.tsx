import React from 'react';

interface IProps {
	className?: string;
	type?: string;
	kills: number;
	deaths: number;
	assists: number;
};

const KdaBox: React.FC<IProps> = ({
	className = '',
	type = 'xl',
	kills,
	deaths,
	assists,
}) => {
	let mx = '1';
	if (type === 'md' || type === 'sm' || type === 'xs') {
		mx = '0.5';
	}
	return (
		<div className={className}>
			<span className={`text-${type}`}>{ kills }</span>
			<span className={`text-${type} text-gray-500 mx-${mx}`}>/</span>
			<span className={`text-${type} ${deaths !== 0 && ('text-red-500')}`}>{ deaths }</span>
			<span className={`text-${type} text-gray-500 mx-${mx}`}>/</span>
			<span className={`text-${type}`}>{ assists }</span>
		</div>
	);
}

export default KdaBox;
