import React from 'react';

const Loading: React.FC = () => {
	return (
		<div className="h-loading flex items-center justify-center bg-black opacity-30 absolute">
			<div className="opacity-100 text-white text-6xl">Loading...</div>
		</div>
	);
}

export default Loading;
