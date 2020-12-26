import React from 'react';

interface IProps {
	match: any;
}

const MatchCard: React.FC<IProps> = ({
	match,
}) => {
	
	return (
		<div className="shadow-lg mb-5 w-full p-5">
			<h1>라인: {match.lane}</h1>
			<h2>Rold: {match.role}</h2>
			{/* <h1>시간: {new Date(item.timestamp)}</h1> */}
			<div className="flex flex-row items-center justify-center">
				<div className="flex flex-col">
					{ match.matchDetail.participantIdentities.filter((_: any, idx: number) => idx >= 5).map((identitiy: any, idx: number) => {
						return (
							<div>
								{ identitiy.player.summonerName }
							</div>
						)
					})}
				</div>
				<div className="flex flex-col">
					{ match.matchDetail.participantIdentities.filter((_: any, idx: number) => idx < 5).map((identitiy: any, idx: number) => {
						return (
							<div>
								{ identitiy.player.summonerName }
							</div>
						)
					})}
				</div>
			</div>
		</div>
	);
}

export default MatchCard;
