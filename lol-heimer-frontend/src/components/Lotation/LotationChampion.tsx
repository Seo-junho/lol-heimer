import ImgChampion from '@components/ImgBox/ImgChampion';
import { API_CHANPION_GET_ROTATIONS } from '@end-point/index';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from './../Article';

const LotationChampion: React.FC = () => {

	const [champions, setChampions] = useState<any>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get(`${API_CHANPION_GET_ROTATIONS}`)
			.then((response: any) => {
				const { data: { data: {
					free_champion_list
				} } } = response;

				if (free_champion_list) {
					setChampions(free_champion_list);
				}

				setLoading(false);
			})
			.catch((error: any) => {

				setLoading(false);
			});
	}, []);

	return (
		<Article>
			<h1 className="text-orange-500 font-bold text-lg sm:text-xl my-3 pb	-2 border-b-2 border-solid border-orange-500">
				금주 로테이션 챔피언
			</h1>
			{ loading ? (
				<>
					Loading
				</>
			) : (
				<div className="flex flex-row flex-wrap	justify-center items-center py-3">
					{ champions.map((champ: any) => (
						<div
							className="flex-1 flex flex-col items-center"
							style={{
								minWidth: `5rem`
							}}
						>
							<ImgChampion
								className={'rounded-full'}
								size={`50px`}
								imgUrl={champ.image}
							/>
							{ champ.name }
						</div>
					))}
				</div>
			)}
		</Article>
	);
}

export default LotationChampion;
