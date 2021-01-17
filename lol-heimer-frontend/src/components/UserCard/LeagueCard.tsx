import { LeagueCardProps } from '@dtos/UserCard/LeagueCard.dto';
import React from 'react';
import './LeagueCard.scss';

const LeagueCard: React.FC<LeagueCardProps> = (
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
		<div className="card flex-1 flex flex-row items-center">
			<div className="flex-grow-0">
				<img
					className="img-tier"
					src={`${tier_img}`}
					alt="img-tier"
				/>
			</div>
			<div className="flex-1 lg:pl-5 flex flex-col items-center justify-center lg:items-start">
				<h3 className="text--lg">{ type === 'solo' ? '솔로랭크' : '자유 5:5 랭크' }</h3>
				<h4 className="text--md">{ tier } { rank }</h4>
				<h4 className="text--sm">포인트 { leaguePoints }</h4>
				<div>
					<span className="text--md font-bold text-blue-600">{ wins }</span>승&nbsp;
					<span className="text--md font-bold text-red-500">{ losses }</span>패
					<div className="text--md text-center lg:text-left">
						(<span
							className={`font-bold ${winsLate >= 50 ? 'text-green-600' : 'text-gray-600'}`}
							role="winsLate"
						>{ winsLate }%</span>)
					</div>
				</div>
			</div>
		</div>
	)
}

export default LeagueCard;
