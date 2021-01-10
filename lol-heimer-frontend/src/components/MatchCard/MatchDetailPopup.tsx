import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_SEARCH_GET_MATCH_DETAIL } from './../../end-point/index';
import ItemBox from './ItemBox';
import MatchDetailUser from './MatchDetailUser';
import SkeletonMatchDetail from './../../skeleton/SkeletonMatchDetail';

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

	console.log('blue_team', blueTeam);
	console.log('red_team', redTeam);
	console.log('maxDamage', maxDamage);

	const isWin = (stat: string) => (stat === '승리');

	return (
		<div className="fixed top-0 left-0 z-50 flex justify-center items-center">
			<div className="absolute shadow-lg lg:max-w-5xl bg-gray-100 flex flex-col sm:flex-row items-center justify-center border border-white rounded-xl z-50">
				{ true ? <SkeletonMatchDetail /> : (
					<section className="flex flex-col">
						{ blueTeam.length !== 0 && (
							<div className="flex justify-center flex-col bg-blue-100 p-10 rounded-xl mb-2">
								<div className="flex justify-start flex-row items-center my-1">
									<div className="w-60 mr-0.5">
										<span className={`font-bold ${isWin(blueTeam[0].game_stat) ? 'text-blue-600' : 'text-red-600'}`}>
											{ blueTeam[0].game_stat }
										</span>&nbsp;(블루팀)
									</div>
									<div className="w-20 text-center">티어</div>
									<div className="w-20 text-center">KDA</div>
									<div className="w-16 text-center mx-2">CS</div>
									<div className="w-28 text-center mr-2">피해량</div>
									<div className="w-48 text-center">아이템</div>
								</div>
								{ blueTeam.map((data: any) => <MatchDetailUser user={data} maxDamage={maxDamage} />) }
							</div>
						) }
						{ redTeam.length !== 0 && (
							<div className="flex justify-center flex-col bg-red-100 p-10 rounded-xl">
								<div className="flex justify-start flex-row items-center my-1">
									<div className="w-60 mr-0.5">
										<span className={`font-bold ${isWin(redTeam[0].game_stat) ? 'text-blue-600' : 'text-red-600'}`}>
											{ redTeam[0].game_stat }
										</span>&nbsp;(레드팀)
									</div>
									<div className="w-20 text-center">티어</div>
									<div className="w-20 text-center">KDA</div>
									<div className="w-16 text-center mx-2">CS</div>
									<div className="w-28 text-center mr-2">피해량</div>
									<div className="w-48 text-center">아이템</div>
								</div>
								{ redTeam.map((data: any) => <MatchDetailUser user={data} maxDamage={maxDamage} />) }
							</div>
						) }
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
