import { CDN_URL } from '@end-point/server';
import React from 'react';
import ItemBox from './ItemBox';
import KdaBox from './KdaBox';

interface IProps {
	user: any;
	maxDamage: number;
}

const MatchDetailUser: React.FC<IProps> = ({
	user,
	maxDamage,
}) => {
	const {
		play_champion,
		spell_1,
		spell_2,
		item,
		player_name,
		player_level,
		player_tier,
		kills,
		deaths,
		assists,
		total_minions_killed,
		total_damage,
	} = user;

	const dmgPer = (total_damage / maxDamage) * 100;

	return (
		<div className="flex justify-start flex-row items-center my-0.5 mb:my-1">
			<div>
				<div
					className="w-8 h-8 md:w-10 md:h-10 bg-cover bg-no-repeat rounded-full"
					style={{
						backgroundImage: `${CDN_URL(play_champion.image)}`,
					}}
				/>
			</div>
			<div className="flex flex-col mx-2">
				<div
					className="w-20 h-20 bg-cover bg-no-repeat mb-0.5"
					style={{
						width: '20px',
						height: '20px',
						backgroundImage: `${CDN_URL(spell_1.icon_img)}`,
					}}
				/>
				<div
					className="bg-cover bg-no-repeat"
					style={{
						width: '20px',
						height: '20px',
						backgroundImage: `${CDN_URL(spell_2.icon_img)}`,
					}}
				/>
			</div>
			<div className="flex flex-col md:flex-row items-start md:items-center">
				<div className="w-14 md:w-40 text-xs md:text-base">{ player_name }</div>
				<div className="w-10 md:w-20 hidden md:flex flex-col items-center justify-center mx-2">
					<span className="text-sm">Level { player_level }</span>
					<span className="text-sm">{ player_tier }</span>
				</div>
				<KdaBox
					className="w-16 md:w-20 flex flex-row items-center justify-start md:justify-center text-xs md:text-base"
					type={'md'}
					kills={kills}
					deaths={deaths}
					assists={assists}
				/>
			</div>
			<div className="flex flex-col md:flex-row items-start md:items-center justify-center">
				<div className="flex flex-row items-start md:items-center justify-center mb-1 md:mb-0">
					<div className="w-10 md:w-16 text-center text-xs md:text-sm">CS { total_minions_killed }</div>
					<div className="w-24 md:w-28 mx-2">
						<div className="w-full h-4 md:h-6 bg-gray-400 relative">
							<span className="text-xs md:text-sm absolute t-0 w-full text-center text-white font-bold h-full">{ total_damage }</span>
							<div
								className="bg-red-500 h-4 md:h-6"
								style={{
									width: `${dmgPer}%`
								}}>
							</div>
						</div>
					</div>
				</div>
				<ItemBox items={item} size={'xs'} type={'flat'} />
			</div>
		</div>
	);
}

export default MatchDetailUser;
