import React from 'react';
import ItemBox from './ItemBox';

interface IProps {
	user: any;
}

const MatchDetailUser: React.FC<IProps> = ({
	user,
}) => {
	const {
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

	return (
		<div className="flex justify-center flex-row items-center">
			<div className="flex flex-col">
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
			<div>{ player_name }</div>
			<div className="flex flex-col items-center justify-center">
				<span>Level { player_level }</span>
				<span>{ player_tier }</span>
			</div>
			<div className="flex flex-row">
				<span>{ kills }</span>
				<span>/</span>
				<span>{ deaths }</span>
				<span>/</span>
				<span>{ assists }</span>
			</div>
			<div>CS { total_minions_killed }</div>
			<div>{ total_damage }</div>
			<ItemBox items={item} size={'25px'} type={'flat'} />
		</div>
	);
}

export default MatchDetailUser;
