import React from 'react';
import './SkeletonMatchDetail.scss';

const SkeletonMatchDetail: React.FC = () => {
	return (
		<div
			className="skeleton-match-detail"
		>
			<div className="animate-pulse h-full p-5 flex flex-col items-center justify-center border border-white rounded-xl">
				<div
					className="detail-box flex-grow-0 items-center mx-auto rounded-xl mb-2 bg-gray-200"
				>
				</div>
				<div
					className="detail-box flex-grow-0 items-center mx-auto rounded-xl bg-gray-200"
				>
				</div>
			</div>
		</div>
	);
}

export default SkeletonMatchDetail;
