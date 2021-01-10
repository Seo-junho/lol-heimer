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
		<div className="flex justify-start flex-row items-center my-1">
			<div className="w-10">
				<div
					className="bg-cover bg-no-repeat rounded-full"
					style={{
						width: '40px',
						height: '40px',
						backgroundImage: `url(${play_champion.image})`,
					}}
				/>
			</div>
			<div className="flex flex-col mx-2">
				<div
					className="bg-cover bg-no-repeat mb-0.5"
					style={{
						width: '20px',
						height: '20px',
						backgroundImage: `url(${spell_1.icon_img})`,
					}}
				/>
				<div
					className="bg-cover bg-no-repeat"
					style={{
						width: '20px',
						height: '20px',
						backgroundImage: `url(${spell_2.icon_img})`,
					}}
				/>
			</div>
			<div className="w-40">{ player_name }</div>
			<div className="w-20 flex flex-col items-center justify-center mx-2">
				<span className="text-sm">Level { player_level }</span>
				<span className="text-sm">{ player_tier }</span>
			</div>
			<KdaBox
				className="w-20 flex flex-row"
				type={'md'}
				kills={kills}
				deaths={deaths}
				assists={assists}
			/>
			<div className="w-16 text-center">CS { total_minions_killed }</div>
			<div className="w-28 mx-2">
				<span className="text-sm">{ total_damage }</span>
				<div className="w-full h-3 bg-gray-300">
					<div
						className="bg-red-500 h-3"
						style={{
							width: `${dmgPer}%`
						}}>
					</div>
				</div>
			</div>
			<ItemBox items={item} size={'25px'} type={'flat'} />
		</div>
	);
}

export default MatchDetailUser;
