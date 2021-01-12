import ImgChampion from '@components/ImgBox/ImgChampion';
import { API_CHANPION_GET_ROTATIONS } from '@end-point/index';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Article from '../Article';

const RotationChampion: React.FC = () => {
	const [champions, setChampions] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const [translateX, setTranslateX] = useState(0);

	const [isRotationClick, setIsRotationClick] = useState(false);

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

	const champWidth = 130;
	const maxTranslateX = champWidth * champions.length;

	useEffect(() => {
		if (Math.abs(translateX) >= maxTranslateX) {
			setTranslateX(0);
		}
	}, [translateX]);


	let rotationInterval: any = null;
	useEffect(() => {
		if (champions.length === 0) {
			return;
		}

		if (isRotationClick) {
			clearInterval(rotationInterval);
		} else {
			rotationInterval = setInterval(() => {
				if (!isRotationClick) {
					setTranslateX(current => current - 4);
				}
			}, 30);
		}

		return () => {
			clearInterval(rotationInterval);
		}
	}, [champions, isRotationClick]);

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
				<div
					className="w-full py-3 overflow-hidden"
					onMouseDown={() => { setIsRotationClick(true) }}
					onMouseUp={() => { setIsRotationClick(false) }}
				>
					<div className="flex flex-row	justify-start items-center"
					style={{
						transform: `translate(${translateX}px, 0)`
					}}>
						{ champions.map((champ: any, index: number) => (
							<div
								key={index}
								className="flex-1 flex flex-col items-center m-3 shadow-md border border-white border-solid"
								style={{
									minWidth: `${champWidth}px`
								}}
							>
								<ImgChampion
									className={'rounded-md relative bg-gray-500'}
									style={{
										width: `${champWidth}px`,
										height: `200px`,
									}}
									imgUrl={champ.loading_image}
								>
									<div className="absolute bottom-0 w-full text-center">
										<div className="w-full h-8 bg-white bg-opacity-50 flex items-center justify-center font-bold text-sm">
											{ champ.name }
										</div>
									</div>
								</ImgChampion>
							</div>
						))}
					</div>
				</div>
			)}
		</Article>
	);
}

export default RotationChampion;
