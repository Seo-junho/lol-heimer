import React from 'react';
import PlayerTitle from './PlayerTitle';

interface IProps {
	match: any;
	username: string;
}

const MatchCard: React.FC<IProps> = ({
	match,
	username,
}) => {
	const {
		matchDetail: { participantIdentities, participants },
		champion,
	} = match;
	const redFilter = (_: any, idx: number) => idx >= 5;
	const blueFilter = (_: any, idx: number) => idx < 5;

	const participantsMerge = (item: any, index: number) => ({
		...participants[index],
		...item,
	});

	const blueTeam = participantIdentities.filter(blueFilter).map(participantsMerge);
	const redTeam = participantIdentities.filter(redFilter).map(participantsMerge);
	const [searchUser] = participantIdentities.filter((identity: any) => identity.player.summonerName.replace(/ /g, '') === username)
	const [searchUserInfo] = participants.filter((identity: any) => identity.participantId === searchUser.participantId);
	// console.log('searchUserInfo', searchUserInfo)

	const roleType = (role: string) => {
		// TODO Type
		if (role === 'NONE') {
			return '일반';
		}
		if (role === 'DUO' || role === 'SOLO' || role === 'DUO_CARRY') {
			return ''
		}
	}

	const parseTime = (timestemp: number): string => {
		const curDate = new Date();
		const playDate = new Date(timestemp);

		const betweenTime = Math.floor((curDate.getTime() - playDate.getTime()) / 1000 / 60);
		if (betweenTime < 60) {
			return `${betweenTime}분전`;
		}

		const betweenTimeHour = Math.floor(betweenTime / 60);
		if (betweenTimeHour < 24) {
			return `${betweenTimeHour}시간전`;
		}

		const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
		return `${betweenTimeDay}일전`;
	}

	// console.log('match', match)

	return (
		<div className="shadow-lg mb-5 w-full p-5 flex flex-row items-center justify-center">
			<div className="flex-grow-0 w-40">
				<h1>라인: { match.lane }</h1>
				<h2>Rold: { match.role }</h2>
			</div>
			<div className="flex-grow-0 flex flex-col justify-center items-center">
				<div>
					<span className="font-light">{`${parseTime(match.timestamp)}`}</span>
				</div>
				<div className="flex flex-row justify-center items-center">
					<div>Champion: { searchUserInfo.championId } </div>
					<div>
						<div>spell1: { searchUserInfo.spell1Id }</div>
						<div>spell2: { searchUserInfo.spell2Id }</div>
					</div>
				</div>
			</div>
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
