import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_SEARCH_GET_MATCH_DETAIL } from './../../end-point/index';
import ItemBox from './ItemBox';
import MatchDetailUser from './MatchDetailUser';

interface IProps {
	gameId: number;
	setIsPopup: Function;
};

const MatchDetailPopup: React.FC<IProps> = ({
	gameId,
	setIsPopup,
}) => {

	const [isLoading, setIsLoading] = useState(true);
	const [blueTeam, setBlueTeam] = useState([]);
	const [redTeam, setRedTeam] = useState([]);

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

	console.log('blue_team', blueTeam);
	console.log('red_team', redTeam);

	return (
		<div className="fixed top-0 left-0 z-50 flex justify-center items-center">
			<div className="absolute shadow-lg mb-5 w-11/12 p-5 lg:max-w-5xl bg-gray-100 flex flex-col sm:flex-row items-center justify-center border border-white rounded-xl z-50">
				{ isLoading && <>Loading</> }
				<div className="flex justify-center flex-col">
					{ blueTeam.map((data: any) => <MatchDetailUser user={data} />) }
				</div>
			</div>
			<div
				className="w-screen h-screen bg-black opacity-30"
				onClick={() => { setIsPopup(false) }}
			></div>
		</div>
	);
}

export default MatchDetailPopup;
