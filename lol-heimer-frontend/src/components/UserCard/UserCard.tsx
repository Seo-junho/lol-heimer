import React from 'react';
import LevelBox from '@images/bg-levelbox.png';
import { CDN_URL } from '@end-point/server';
import { UserCardProps } from '@dtos/UserCard/UserCard.dto';
import './UserCard.scss';

const UserCard: React.FC<UserCardProps> = (
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
					className="img-icon bg-cover bg-no-repeat border-white border rounded-xl"
					style={{
						backgroundImage: `${CDN_URL(profile_icon)}`
					}}
					role="summonerIcon"
				>
				</div>
				<div
					className="bg-cover bg-no-repeat flex justify-center items-center relative -top-2"
					style={{
						width: '50px',
						height: '26px',
						backgroundImage: `url('${LevelBox}')`,
					}}
					role="levelBox"
				>
					<h4 className="text--md font-light text-white">{ summonerLevel }</h4>
				</div>
			</div>
			<h3 className="text--lg p-5">{ name }</h3>
		</div>
	)
}

export default UserCard;
