import React from 'react';

interface Props {
	leagueInfo: {
		leagueId: string;
		queueType: string; // 솔로 | 팀랭
		tier: string;
		rank: string;
		summonerId: string;
		summonerName: string;
		leaguePoints: number;
		wins: number;
		losses: number;
		veteran: boolean;
		inactive: boolean;
		freshBlood: boolean;
		hotStreak: boolean;
	};
};

const LeagueCard: React.FC<Props> = (
	{
		leagueInfo: {
			leagueId = '',
			queueType = '',
			tier = 'UnRanked',
			rank = '-',
			summonerId = '',
			summonerName = '',
			leaguePoints = 0,
			wins = 0,
			losses = 0,
			veteran = false,
			inactive = false,
			freshBlood = false,
			hotStreak = false,
		}
	}
): JSX.Element => {
	return (
		<div className="card">
			<h3 className="text-2xl">{ queueType === 'RANKED_SOLO_5x5' ? '솔로' : '팀랭' }</h3>
			<h4 className="text-xl">{ tier } { rank }</h4>
			<h4 className="text-md">포인트 { leaguePoints }</h4>
			<div>
				<span className="font-bold text-blue-600">{ wins }</span>승&nbsp;
				<span className="font-bold text-red-500">{ losses }</span>패
			</div>
		</div>
	)
}

export default LeagueCard;
