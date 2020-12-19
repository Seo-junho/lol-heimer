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
		name = 'unknown',
		summonerLevel = 0,
		profileIconId = 0,
		id = 'unknown',
		accountId = 'unknown',
		puuid = 'unknown',
		revisionDate = 0,
	} }
): JSX.Element => {
	return (
		<div className="card">
			<h3 className="text-4xl">{ name }</h3>
			{/* <img
				src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon4631.jpg?image=q_auto:best&v=${profileIconId}`}
			/> */}
			<h4 className="text-xl">{ summonerLevel }</h4>
		</div>
	)
}

export default UserCard;
