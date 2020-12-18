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
			tier = '',
			rank = '',
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
		<div className="border-gray-300 border">
			{ queueType === 'RANKED_SOLO_5x5' ? '솔로' : '팀랭' }
			{ tier }
			{ rank }
			포인트 { leaguePoints }
			{ wins }승 { losses }패
		</div>
	)
}

export default LeagueCard;
