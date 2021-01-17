import React from 'react';
import MatchDetailUser from '../MatchDetailUser';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { CDN_URL } from '@end-point/server';

jest.mock('../KdaBox', () => {
  return () => <span>KdaBox</span>
});

jest.mock('../ItemBox', () => {
  return () => <span>ItemBox</span>
});

describe('<MatchDetailUser />', () => {
	it('MatchDetailUser Render Done', () => {
		const playerImage = 'playerImage';
		const spell1 = 'spell1';
		const spell2 = 'spell2';
		const { getByText, getByRole } = render(
			<MatchDetailUser
				user={{
					player_name: '',
					player_level: 100,
					player_tier: 'Challenger',
					play_champion: {
						id: '',
						key: '',
						name: '',
						title: '',
						image: playerImage,
					},
					kills: 10,
					deaths: 0,
					assists: 22,
					champ_level: 11,
					total_minions_killed: 333,
					champion_total_damage: 10,
					total_damage: 12345,
					vision_score: 10,
					is_double_kill: false,
					is_triple_kill: false,
					is_quadra_kill: false,
					is_penta_kill: false,
					double_kill_count: 0,
					triple_kill_count: 0,
					quadra_kill_count: 0,
					penta_kill_count: 0,
					game_stat: '',
					spell_1: {
						name: '',
						icon_img: spell1,
					},
					spell_2: {
						name: '',
						icon_img: spell2,
					},
					item: [],
				}}
				maxDamage={10000}
			/>
		);
		const championImage = getByRole(/championImage/gi);
		expect(championImage).toHaveStyle(`background-image: ${CDN_URL(playerImage)}`);
		const spell1Image = getByRole(/spell1Image/gi);
		expect(spell1Image).toHaveStyle(`background-image: ${CDN_URL(spell1)}`);
		const spell2Image = getByRole(/spell2Image/gi);
		expect(spell2Image).toHaveStyle(`background-image: ${CDN_URL(spell2)}`);
		getByText(/Level 100/gi);
		getByText(/Challenger/gi);
		getByText(/CS 333/gi);
		getByText(/12345/gi);
	});
});
