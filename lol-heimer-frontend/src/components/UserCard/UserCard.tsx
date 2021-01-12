import React from 'react';
import LevelBox from '@images/bg-levelbox.png';
import { CDN_URL } from '@end-point/server';

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
		<div className="card flex-1 flex flex-row justify-center items-center">
			<div className="flex flex-col items-center">
				<div
					className="w-40 h-40 bg-cover bg-no-repeat border-white border rounded-xl"
					style={{
						backgroundImage: `${CDN_URL(profile_icon)}`
					}}
				>
				</div>
				<div
					className="bg-cover bg-no-repeat flex justify-center items-center relative -top-2"
					style={{
						width: '50px',
						height: '26px',
						backgroundImage: `url('${LevelBox}')`,
					}}
				>
					<h4 className="text-md font-light text-white">{ summonerLevel }</h4>
				</div>
			</div>
			<h3 className="text-4xl p-5">{ name }</h3>
		</div>
	)
}

export default UserCard;
