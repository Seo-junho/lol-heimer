import React from 'react';
import LevelBox from '@images/bg-levelbox.png';

interface Props {
	userInfo: {
		name: string;
		summonerLevel: number;
		profileIconId: number;
		profile_icon: string;
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
		profile_icon = '',
		id = 'unknown',
		accountId = 'unknown',
		puuid = 'unknown',
		revisionDate = 0,
	} }
): JSX.Element => {
	return (
		<div className="card flex flex-col justify-center items-center">
			<h3 className="text-4xl mb-5">{ name }</h3>
			<div
				className="w-40 h-40 bg-cover bg-no-repeat border-white border rounded-xl"
				style={{
					backgroundImage: `url(${profile_icon})`
				}}
			>
			</div>
			<div
				className="w-10 h-6 bg-cover bg-no-repeat"
				style={{
					backgroundImage: `url('${LevelBox}')`
				}}
			>
			</div>
			<h4 className="text-xl">{ summonerLevel }</h4>
		</div>
	)
}

export default UserCard;
