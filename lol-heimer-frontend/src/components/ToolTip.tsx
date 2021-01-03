import React from 'react';

interface IProp {
	direction?: string;
}

const ToolTip: React.FC<IProp> = ({
	direction = 'top',
	children,
}) => {
	return (
		<div className="tooltip">
			{ children }
		</div>
	);
}

export default ToolTip;
