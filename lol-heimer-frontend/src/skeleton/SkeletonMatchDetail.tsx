import React from 'react';

const SkeletonMatchDetail: React.FC = () => {
	return (
		<div
			className="w-screen animate-pulse p-5 flex flex-col items-center justify-center border border-white rounded-xl"
			style={{
				maxWidth: '900px',
				minWidth: '300px',
			}}
		>
			<div
				className="h-80 flex-grow-0 items-center mx-auto rounded-xl mb-2 bg-gray-200"
				style={{
					width: '100%'
				}}>
			</div>
			<div
				className="h-80 flex-grow-0 items-center mx-auto rounded-xl bg-gray-200"
				style={{
					width: '100%'
				}}>
			</div>
		</div>
	);
}

export default SkeletonMatchDetail;
