import React from 'react';
import { Card } from 'react-bootstrap';

interface Props {
	userInfo: {
		name: string;
		summonerLevel: number;
		profileIconId: number;
		id?: string;
		accountId?: string;
		puuid?: string;
		revisionDate?: number;
	}
};

const UserCard: React.FC<Props> = (
	{ userInfo: {
		name = '',
		summonerLevel = 0,
		profileIconId = 0,
		id = '',
		accountId = '',
		puuid = '',
		revisionDate = 0,
	} }
): JSX.Element => {
	return (
		<>
			<Card style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>{ name }</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">{ summonerLevel }</Card.Subtitle>
					<Card.Text>
						아이콘
						{ profileIconId }
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	)
}

export default UserCard;
