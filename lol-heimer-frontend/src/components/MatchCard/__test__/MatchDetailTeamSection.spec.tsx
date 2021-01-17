import React from 'react';
import MatchDetailTeamSection from '../MatchDetailTeamSection';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../MatchDetailUser', () => {
  return () => <span>MatchDetailUser</span>
});

describe('<MatchDetailTeamSection />', () => {
	it('MatchDetailTeamSection Render Done', () => {
		const playerImage = 'playerImage';
		const spell1 = 'spell1';
		const spell2 = 'spell2';
		const { getByText, getByRole } = render(
			<MatchDetailTeamSection
				team={'blue'}
				data={[{
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
					game_stat: '승리',
					spell_1: {
						name: '',
						icon_img: spell1,
					},
					spell_2: {
						name: '',
						icon_img: spell2,
					},
					item: [],
				}]}
				maxDamage={10000}
			/>
		);
		const matchDetailTeam = getByRole(/matchDetailTeam/gi);
		expect(matchDetailTeam).toHaveClass('bg-blue-100');
		getByText(/승리/gi);

	})
});
