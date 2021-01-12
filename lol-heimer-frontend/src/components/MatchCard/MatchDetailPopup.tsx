import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_SEARCH_GET_MATCH_DETAIL } from './../../end-point/index';
import ItemBox from './ItemBox';
import MatchDetailUser from './MatchDetailUser';
import SkeletonMatchDetail from './../../skeleton/SkeletonMatchDetail';

interface IHeaderProps {
	team: string;
	className: string;
	stat: string;
};

const MatchTeamHeader: React.FC<IHeaderProps> = ({
	team = 'blue',
	className = '',
	stat = '',
}) => {
	return (
		<div className="hidden md:flex justify-start flex-row items-center my-1">
			<div className="w-60 mr-0.5">
				<span className={`font-bold ${className}`}>
					{ stat }
				</span>&nbsp;({ team === 'blue' ? '블루' : '레드' }팀)
			</div>
			<div className="md: w-20 text-center">티어</div>
			<div className="w-24 text-center">KDA</div>
			<div className="w-14 text-center">CS</div>
			<div className="w-28 text-center ml-2.5">피해량</div>
			<div className="w-48 text-center">아이템</div>
		</div>
	);
};

interface ISectionProps {
	team: string;
	data: any[];
	maxDamage: number;
};

const MatchTeamSection: React.FC<ISectionProps> = ({
	team,
	data,
	maxDamage,
}) => {

	const isWin = (stat: string) => (stat === '승리');
	const bgStyle = team === 'blue' ? 'bg-blue-100 rounded-xl rounded-b-none' : 'bg-red-100';

	return (
		<div className={`flex justify-center flex-col ${bgStyle} p-2 md:p-10`}>
			<MatchTeamHeader
				team={team}
				className={isWin(data[0].game_stat) ? 'text-blue-600' : 'text-red-600'}
				stat={data[0].game_stat}
			/>
			{ data.map((data: any, index: number) => <MatchDetailUser key={index} user={data} maxDamage={maxDamage} />) }
		</div>
	)
}

interface IProps {
	gameId: number;
	setIsPopup: Function;
};

const MatchDetailPopup: React.FC<IProps> = ({
	gameId,
	setIsPopup,
}) => {

	const [isLoading, setIsLoading] = useState(true);
	const [blueTeam, setBlueTeam] = useState<any>([]);
	const [redTeam, setRedTeam] = useState<any>([]);

	useEffect(() => {
		let cancel = () => {};
		axios.get(`${API_SEARCH_GET_MATCH_DETAIL}/${gameId}`, {
			cancelToken: new axios.CancelToken((c) => {
				cancel = c;
			})
		}).then((response: any) => {
				const { data: { data: {
					blue_team,
					red_team,
				} } } = response;
				if (blue_team && red_team) {
					setBlueTeam(blue_team);
					setRedTeam(red_team);
				}
				setIsLoading(false);
			})
			.catch((error: any) => {
				console.log(`API_SEARCH_GET_MATCH_DETAIL ${error}`);
				setIsLoading(false);
			});
		return () => {
			cancel();
		}
	}, []);

	const maxDamage = Math.max.apply(null, [
		...blueTeam.map((item: any) => item.champion_total_damage),
		...redTeam.map((item: any) => item.champion_total_damage),
	]);

	return (
		<div
			className="fixed top-0 left-0 z-50 flex justify-center items-center"
		>
			<div
				className="absolute shadow-lg lg:max-w-5xl bg-gray-100 flex flex-col items-center justify-center border border-white rounded-xl z-50 overscroll-y-scroll"
			>
				{ isLoading ? <SkeletonMatchDetail /> : (
					<section className="flex flex-col bg-red-100 rounded-xl">
						{ blueTeam.length !== 0 && (
							<MatchTeamSection
								team={'blue'}
								data={blueTeam}
								maxDamage={maxDamage}
							/>
						) }
						{ redTeam.length !== 0 && (
							<MatchTeamSection
								team={'red'}
								data={redTeam}
								maxDamage={maxDamage}
							/>
						) }
						<div>
							<button
								className="base-btn rounded-t-none w-full text-center text-sm md:text-xl"
								onClick={() => { setIsPopup(false) }}
							>
								닫기
							</button>
						</div>
					</section>
				) }
			</div>
			<div
				className="w-screen h-screen bg-black opacity-30"
				onClick={() => { setIsPopup(false) }}
			></div>
		</div>
	);
}

export default MatchDetailPopup;
