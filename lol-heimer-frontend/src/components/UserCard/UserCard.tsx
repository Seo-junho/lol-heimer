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
				className="bg-cover bg-no-repeat flex justify-center items-center"
				style={{
					width: '44px',
					height: '24px',
					backgroundImage: `url('${LevelBox}')`,
				}}
			>
				<h4 className="text-sm font-light text-white">{ summonerLevel }</h4>
			</div>
		</div>
	)
}

export default UserCard;
