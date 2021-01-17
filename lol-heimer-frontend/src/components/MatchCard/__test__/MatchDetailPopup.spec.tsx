import React from 'react';
import axios from 'axios';
import MatchDetailPopup from '../MatchDetailPopup';
import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { act } from "react-dom/test-utils";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../../skeleton/SkeletonMatchDetail', () => {
  return () => <span>SkeletonMatchDetail</span>
});

jest.mock('../MatchDetailTeamSection', () => {
  return () => <span>MatchDetailTeamSection</span>
});

describe('<MatchDetailPopup />', () => {
	it('MatchDetailPopup Render Done', async () => {
		const data = {
			data: {
				"blue_team": [
					{
						"player_name": "스틸하트",
						"player_level": 176,
						"player_tier": "-",
						"play_champion": {
							"id": "Varus",
							"key": "110",
							"name": "바루스",
							"title": "응징의 화살",
							"image": "\/champion\/Varus.png"
						},
						"kills": 4,
						"deaths": 14,
						"assists": 20,
						"champ_level": 17,
						"total_minions_killed": 32,
						"champion_total_damage": 25441,
						"total_damage": 25441,
						"vision_score": 0,
						"is_double_kill": false,
						"is_triple_kill": false,
						"is_quadra_kill": false,
						"is_penta_kill": false,
						"double_kill_count": 0,
						"triple_kill_count": 0,
						"quadra_kill_count": 0,
						"penta_kill_count": 0,
						"game_stat": "패배",
						"spell_1": {
							"name": "탈진",
							"icon_img": "\/spell\/SummonerExhaust.png"
						},
						"spell_2": {
							"name": "점멸",
							"icon_img": "\/spell\/SummonerFlash.png"
						},
						"item": [
							{
								"name": "드락사르의 황혼검",
								"icon_img": "\/item\/6691.png",
								"plain_text": "",
								"item_price": 3200
							}
						]
					},
				],
				"red_team": [
					{
						"player_name": "엉 디",
						"player_level": 250,
						"player_tier": "-",
						"play_champion": {
							"id": "Varus",
							"key": "110",
							"name": "바루스",
							"title": "응징의 화살",
							"image": "\/champion\/Varus.png"
						},
						"kills": 4,
						"deaths": 14,
						"assists": 20,
						"champ_level": 17,
						"total_minions_killed": 32,
						"champion_total_damage": 25441,
						"total_damage": 25441,
						"vision_score": 0,
						"is_double_kill": false,
						"is_triple_kill": false,
						"is_quadra_kill": false,
						"is_penta_kill": false,
						"double_kill_count": 0,
						"triple_kill_count": 0,
						"quadra_kill_count": 0,
						"penta_kill_count": 0,
						"game_stat": "승리",
						"spell_1": {
							"name": "탈진",
							"icon_img": "\/spell\/SummonerExhaust.png"
						},
						"spell_2": {
							"name": "점멸",
							"icon_img": "\/spell\/SummonerFlash.png"
						},
						"item": [
							{
								"name": "드락사르의 황혼검",
								"icon_img": "\/item\/6691.png",
								"plain_text": "",
								"item_price": 3200
							}
						]
					},
				]
			},
		};
		const queue = '소환사의 협곡';

    await act(async () => {
			mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));
			const { getByText, getByRole } = render(
				<MatchDetailPopup
					gameId={123}
					setIsPopup={() => {}}
					queue={queue}
				/>
			);
			getByText(queue);
		});
	})
});
