import React, { useState } from 'react';
import SpellToolTipBox from '@components/ImgBox/SpellToolTipBox';
import { CDN_URL } from '@end-point/server';
import ItemBox from './ItemBox';
import KdaBox from './KdaBox';
import MatchDetailPopup from './MatchDetailPopup';
import { MatchCardProps } from '@dtos/MatchCard/MatchCard.dto';

const MatchCard: React.FC<MatchCardProps> = ({
	match,
	username,
}) => {
	const {
		timestamp,
		play_champion: {
			name: championName,
			image: championIcon,
		},
		spell_1: {
			name: spellName1,
			icon_img: spellIconImg1,
		},
		spell_2: {
			name: spellName2,
			icon_img: spellIconImg2,
		},
		queue,
		game_id,
		game_duration,
		game_stat,
		kills,
		deaths,
		assists,
		champ_level,
		total_minions_killed,
		is_double_kill,
		is_triple_kill,
		is_quadra_kill,
		is_penta_kill,
		item,
	} = match;

	const [isPopup, setIsPopup] = useState(false);
	const isWin = game_stat === '승리';
	const playMinute = Math.floor(game_duration / 60);
	const playTime = `${playMinute}분 ${game_duration % 60}초`;
	const kda = deaths === 0 ? 'Prefect' : `${((kills + assists) / deaths).toFixed(2)}:1 평점`;
	const csPerMinute = (total_minions_killed / playMinute).toFixed(2);
	const cardBgColor = playMinute > 5 ? (isWin ? 'bg-blue-200' : 'bg-red-200') : ('bg-gray-300');

	let killType = '';
	if (is_penta_kill) {
		killType = '펜타킬';
	} else if (is_quadra_kill) {
		killType = '쿼드라킬';
	} else if (is_triple_kill) {
		killType = '트리플킬';
	} else if (is_double_kill) {
		killType = '더블킬';
	}

	const parseTime = (timestemp: number): string => {
		const curDate = new Date();
		const playDate = new Date(timestemp);

		const betweenTime = Math.floor((curDate.getTime() - playDate.getTime()) / 1000 / 60);
		if (betweenTime < 60) {
			return `${betweenTime}분전`;
		}

		const betweenTimeHour = Math.floor(betweenTime / 60);
		if (betweenTimeHour < 24) {
			return `${betweenTimeHour}시간전`;
		}

		const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
		return `${betweenTimeDay}일전`;
	}

	return (
		<div
			className={`shadow-lg mb-5 w-full p-2 flex flex-col sm:flex-row items-center justify-center ${cardBgColor} border border-white rounded-xl`}
		>
			<div className="flex-grow-0 flex flex-col items-center">
				<span className="font-bold text-gray-800">{ queue }</span>
				<div className="flex flex-row sm:flex-col sm:divide-y-2 divide-white divide-solid justify-center items-center">
					<div className="sm:pb-2">
						<span className="font-light">{`${parseTime(timestamp + game_duration)}`}</span>
					</div>
					<div className="flex sm:flex-col justify-center items-center sm:pt-2">
						<div className={`px-3 font-bold ${isWin ? 'text-blue-500' : 'text-red-500'}`}>{ game_stat }</div>
						<div className="font-light">{`${playTime}`}</div>
					</div>
				</div>
			</div>
			<div className="flex-grow-0 w-40 flex flex-row">
				<div className="flex flex-col justify-center items-center p-3">
					<div
						className="border border-white rounded-full bg-cover bg-no-repeat"
						style={{
							width: '100px',
							height: '100px',
							backgroundImage: `${CDN_URL(championIcon)}`,
						}}
					/>
					<div className="mt-1 text-lg">{ championName } </div>
				</div>
				<div className="flex flex-col justify-center items-center my-2 pb-8 sm:pb-0">
					<SpellToolTipBox
						className={'mb-1'}
						name={spellName1}
						imgUrl={spellIconImg1}
						size={'md'}
					/>
					<SpellToolTipBox
						name={spellName2}
						imgUrl={spellIconImg2}
						size={'md'}
					/>
				</div>
			</div>
			<div className="px-5 flex flex-col justify-center items-center">
				<KdaBox
					kills={kills}
					deaths={deaths}
					assists={assists}
				/>
				<div className={`text-xl py-1 ${deaths === 0 && 'text-orange-600'}`}>
					{ kda }
				</div>
				{ killType && (
					<div className="px-2 py-0.5 text-white bg-red-500 border border-red-500 rounded-2xl">
						{ killType }
					</div>
				)}
			</div>
			<div className="flex flex-col justify-center items-center py-3">
				<span className="text-sm text-gray-500">레벨: { champ_level }</span>
				<span className="text-sm text-gray-500">{ total_minions_killed } ({ csPerMinute }) CS</span>
			</div>
			<ItemBox items={item} className="mx-3"/>
			<button className="base-btn" onClick={()=>setIsPopup(true)}>
				상세보기
			</button>
			{ isPopup && (
				<MatchDetailPopup
					gameId={game_id}
					setIsPopup={setIsPopup}
					queue={queue}
				/>
			) }
			{/* <div className="flex-1 hidden sm:flex flex-row items-center justify-between px-1">
				<div className="flex flex-col">
					{ blueTeam.map((identitiy: any) => (
						<PlayerTitle
							key={identitiy.participantId}
							championId={identitiy.championId}
							summonerName={identitiy.player.summonerName}
						/>
					))}
				</div>
				<div className="flex flex-col">
					{ redTeam.map((identitiy: any) => (
						<PlayerTitle
							key={identitiy.participantId}
							championId={identitiy.championId}
							summonerName={identitiy.player.summonerName}
						/>
					))}
				</div>
			</div> */}
		</div>
	);
}

export default MatchCard;
