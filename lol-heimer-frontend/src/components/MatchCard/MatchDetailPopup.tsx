import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_SEARCH_GET_MATCH_DETAIL } from './../../end-point/index';
import SkeletonMatchDetail from './../../skeleton/SkeletonMatchDetail';
import MatchDetailTeamSection from './MatchDetailTeamSection';

interface IProps {
	gameId: number;
	setIsPopup: Function;
	queue: string;
};

const MatchDetailPopup: React.FC<IProps> = ({
	gameId,
	setIsPopup,
	queue,
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
				<span className="w-full text-center rounded-t-xl text-white font-bold text-base md:text-xl p-2 bg-blue-400">{ queue }</span>
				{ isLoading ? <SkeletonMatchDetail /> : (
					<section className="flex flex-col bg-red-100 rounded-xl">
						{ blueTeam.length !== 0 && (
							<MatchDetailTeamSection
								team={'blue'}
								data={blueTeam}
								maxDamage={maxDamage}
							/>
						) }
						{ redTeam.length !== 0 && (
							<MatchDetailTeamSection
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
