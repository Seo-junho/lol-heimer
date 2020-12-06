import React from 'react';
import { Card } from 'react-bootstrap';

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
		<>
			<Card style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>
						{ queueType === 'RANKED_SOLO_5x5' ? '솔로' : '팀랭' }
					</Card.Title>
					<Card.Title>
						{ tier }
					</Card.Title>
					<Card.Subtitle
						className="mb-2 text-muted"
					>
						{ rank }
					</Card.Subtitle>
					<Card.Text>
						포인트 { leaguePoints }
					</Card.Text>
					<Card.Text>
						{ wins }승 { losses }패
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	)
}

export default LeagueCard;
