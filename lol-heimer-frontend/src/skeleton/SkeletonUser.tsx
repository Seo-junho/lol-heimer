import React from 'react';
import './SkeletonUser.scss';
import '../components/UserCard/UserCard.scss';
import '../components/UserCard/LeagueCard.scss';

const SkeletonLeagueCard: React.FC = () => {
	return (
		<div className="card flex-1 flex flex-row items-center animate-pulse">
			<div className="flex-grow-0">
				<div
					className="skeleton-img-tier bg-gray-200"
				/>
			</div>
			<div className="flex-1 lg:pl-5 flex flex-col items-center justify-center lg:items-start">
				<div className="bg-gray-200 skeleton-lank-name mt-1"></div>
				<div className="bg-gray-200 skeleton-text h-4 mt-1"></div>
				<div className="bg-gray-200 skeleton-text2 h-4 mt-1"></div>
				<div className="bg-gray-200 skeleton-text h-4 mt-1"></div>
				<div className="bg-gray-200 skeleton-text2 h-4 mt-1"></div>
			</div>
		</div>
	)
}
const SkeletonUser: React.FC = () => {
	return (
		<>
			<div className="w-full flex">
				<div className="card flex-1 flex flex-row justify-center items-center animate-pulse">
					<div className="flex flex-col items-center">
						<div className="img-icon bg-cover bg-no-repeat rounded-xl bg-gray-200"></div>
						<div
							className="bg-cover bg-no-repeat flex justify-center items-center relative -top-2"
							style={{
								width: '50px',
								height: '26px',
							}}
						>
							<div className="skeleton-summoner-box bg-gray-200" />
						</div>
					</div>
					<div className="skeleton-name-box m-5 bg-gray-200" />
				</div>
			</div>
			<div className="flex flex-col sm:flex-row w-full">
				<SkeletonLeagueCard />
				<SkeletonLeagueCard />
			</div>
		</>
	);
}

export default SkeletonUser;
