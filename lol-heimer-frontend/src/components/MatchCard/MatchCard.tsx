import React from 'react';
import PlayerTitle from './PlayerTitle';

interface IProps {
	match: any;
}

const MatchCard: React.FC<IProps> = ({
	match,
}) => {
	const { matchDetail: { participantIdentities, participants } } = match;
	const redFilter = (_: any, idx: number) => idx >= 5;
	const blueFilter = (_: any, idx: number) => idx < 5;

	const participantsMerge = (item: any, index: number) => ({
		...participants[index],
		...item,
	});

	const blueTeam = participantIdentities.filter(blueFilter).map(participantsMerge);
	const redTeam = participantIdentities.filter(redFilter).map(participantsMerge);

	console.log('redTeam', redTeam)

	return (
		<div className="shadow-lg mb-5 w-full p-5 flex flex-row items-center justify-center">
			<div className="flex-grow-0 w-40">
				<h1>라인: { match.lane }</h1>
				<h2>Rold: { match.role }</h2>
			</div>
			{/* <h1>시간: {new Date(item.timestamp)}</h1> */}
			<div className="flex-1 flex flex-row items-center justify-between px-10">
				<div className="flex flex-col">
					{ blueTeam.map((identitiy: any, idx: number) => (
						<PlayerTitle
							key={idx}
							championId={identitiy.championId}
							summonerName={identitiy.player.summonerName}
						/>
					))}
				</div>
				<div className="flex flex-col">
					{ redTeam.map((identitiy: any, idx: number) => (
						<PlayerTitle
							key={idx}
							championId={identitiy.championId}
							summonerName={identitiy.player.summonerName}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default MatchCard;
