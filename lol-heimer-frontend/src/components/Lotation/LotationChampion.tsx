import { API_CHANPION_GET_ROTATIONS } from '@end-point/index';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LotationChampion: React.FC = () => {

	const [champions, setChampions] = useState<any>([]);

	useEffect(() => {
		axios.get(`${API_CHANPION_GET_ROTATIONS}`)
			.then((response: any) => {
				const { data: { data: {
					free_champion_list
				} } } = response;
				if (free_champion_list) {
					setChampions(free_champion_list);
				}
			})
			.catch((error: any) => {

			});
	});

	return (
		<>
		</>
	);
}

export default LotationChampion;
