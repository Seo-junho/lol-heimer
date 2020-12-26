import React from 'react';

interface IProps {
	match: any;
}

const MatchCard: React.FC<IProps> = ({
	match,
}) => {
	const { matchDetail: { participantIdentities, participants } } = match;
	const redFilter = (_: any, idx: number) => idx >= 5;
	const blueFilter = (_: any, idx: number) => idx < 5;

	console.log('match', match);
	const participantsMerge = (item: any, index: number) => ({
		...participants[index],
		...item
	});

	const blueTeam = participantIdentities.filter(blueFilter).map(participantsMerge);
	const redTeam = participantIdentities.filter(redFilter).map(participantsMerge);

	console.log('blueTeam', blueTeam);

	return (
		<div className="shadow-lg mb-5 w-full p-5">
			<h1>라인: {match.lane}</h1>
			<h2>Rold: {match.role}</h2>
			{/* <h1>시간: {new Date(item.timestamp)}</h1> */}
			<div className="flex flex-row items-center justify-center">
				<div className="flex flex-col">
					{ blueTeam.map((identitiy: any, idx: number) => {
						return (
							<div key={idx}>
								{ identitiy.player.summonerName }
							</div>
						)
					})}
				</div>
				<div className="flex flex-col">
					{ redTeam.map((identitiy: any, idx: number) => {
						return (
							<div key={idx}>
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
