import React from 'react';

interface Props {
	type: string;
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
		tier_img: string;
	};
};

const LeagueCard: React.FC<Props> = (
	{
		type,
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
			tier_img = 'https://junho98.cdn3.cafe24.com/img/2020/tier_unranked.png',
		}
	}
): JSX.Element => {
	let winsLate = 0;
	if (wins && losses) {
		const totalPlay = wins + losses;
		winsLate = +(((wins / totalPlay) * 100).toFixed(2));
	}

	return (
		<div className="card flex-1 flex flex-col lg:flex-row items-center">
			<div className="flex-grow-0">
				<img
					src={`${tier_img}`}
					style={{
						width: '150px',
					}}
				/>
			</div>
			<div className="flex-1 lg:pl-5 flex flex-col items-center justify-center lg:items-start">
				<h3 className="text-xl lg:text-2xl">{ type === 'solo' ? '솔로랭크' : '자유 5:5 랭크' }</h3>
				<h4 className="text-md lg:text-xl">{ tier } { rank }</h4>
				<h4 className="text-sm lg:text-md">포인트 { leaguePoints }</h4>
				<div>
					<span className="font-bold text-blue-600">{ wins }</span>승&nbsp;
					<span className="font-bold text-red-500">{ losses }</span>패
					<div className="text-center lg:text-left">(<span className={`font-bold ${winsLate >= 50 ? 'text-green-600' : 'text-gray-600'}`}>{ winsLate }%</span>)</div>
				</div>
			</div>
		</div>
	)
}

export default LeagueCard;
