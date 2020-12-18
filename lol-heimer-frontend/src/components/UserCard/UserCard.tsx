import React from 'react';

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
		<div className="shadow-sm">
			{ name }
			{ summonerLevel }
			{ profileIconId }
		</div>
	)
}

export default UserCard;
