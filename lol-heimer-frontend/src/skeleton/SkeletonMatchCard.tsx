import React from 'react';
import './SkeletonMatchCard.scss';
import '../components/MatchCard/MatchCard.scss';

const SkeletonMatchCard: React.FC = () => {
	return (
		<>
			<div className={`animate-pulse flex flex-row shadow-lg mb-5 w-full border border-white rounded-xl bg-gray-200`}>
				<div className="p-2 md:p-5 flex-grow-0 flex flex-col sm:flex-row justify-center items-center mx-auto">
					<div className="flex-grow-0 flex flex-col items-center">
						<div className="px-3 bg-gray-300 w-20 h-5"></div>
						<div className="flex-grow-0 flex flex-col items-center">
							<div className="flex sm:flex-col justify-center items-center mt-1">
								<div className="sm:pb-2 bg-gray-300 w-10 md:w-20 h-5"></div>
								<div className="px-3 bg-gray-300 w-10 h-5 my-1"></div>
								<div className="bg-gray-300 w-10 md:w-20 h-5"></div>
							</div>
						</div>
					</div>
					<div className="flex-grow-0 flex flex-row items-center">
						<div className="flex flex-col justify-center items-center px-3">
							<div
								className="border border-gray-300 champion-img rounded-full bg-gray-300"
							/>
							<div className="mt-1 bg-gray-300 skeleton-champion-name-box"></div>
						</div>
						<div className="flex flex-col justify-center items-center my-2 pb-1 sm:pb-0">
							<div className="bg-gray-300 mb-1 box-md" />
							<div className="bg-gray-300 mb-1 box-md" />
						</div>
						<div className="px-2 md:px-5 flex flex-col justify-center items-center">
							<div className="bg-gray-300 skeleton-kda-box mt-1"></div>
							<div className="bg-gray-300 skeleton-kda-box mt-1"></div>
						</div>
						<div className="hidden xs:flex flex-col justify-center items-center py-3">
						<div className="bg-gray-300 w-12 md:w-16 h-4 mt-1"></div>
						<div className="bg-gray-300 w-12 md:w-16 h-4 mt-1"></div>
						</div>
						<div className="flex flex-col">
							<div className="flex flex-row">
								<div className={`rounded-md bg-gray-300 m-0.5 box-md`} />
								<div className={`rounded-md bg-gray-300 m-0.5 box-md`} />
								<div className={`rounded-md bg-gray-300 m-0.5 box-md`} />
								<div className={`rounded-md bg-gray-300 m-0.5 box-md`} />
							</div>
							<div className="flex flex-row">
								<div className={`rounded-md bg-gray-300 m-0.5 box-md`} />
								<div className={`rounded-md bg-gray-300 m-0.5 box-md`} />
								<div className={`rounded-md bg-gray-300 m-0.5 box-md`} />
							</div>
						</div>
					</div>
				</div>
				<button className={`flex-grow-0 rounded-r-xl p-2 md:p-5 text-white text-2xl md:text-5xl btn-normal bg-gray-300`}>
					+
				</button>
			</div>
		</>
	);
}

export default SkeletonMatchCard;
