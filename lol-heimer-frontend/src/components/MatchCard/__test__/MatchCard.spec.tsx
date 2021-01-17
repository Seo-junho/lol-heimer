import React from 'react';
import MatchCard from '../MatchCard';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CDN_URL } from '@end-point/server';

jest.mock('@components/ImgBox/SpellToolTipBox', () => {
  return () => <span>SpellToolTipBox</span>
});

jest.mock('../ItemBox', () => {
  return () => <span>ItemBox</span>
});

jest.mock('../KdaBox', () => {
  return () => <span>KdaBox</span>
});

jest.mock('../MatchDetailPopup', () => {
  return () => <span>MatchDetailPopup</span>
});

describe('<MatchCard />', () => {
	it('MatchCard Render Done', () => {
		const { getByText, getByRole } = render(
			<MatchCard
				match={{
					game_id: 1232,
					play_champion: {
						id: 'string',
						key: 'string',
						name: 'string',
						title: 'string',
						image: 'string',
					},
					timestamp: (new Date().getTime() - 2017),
					role: '',
					lane: '',
					queue: '소환사의 협곡',
					game_creation: 123,
					game_duration: 1280,
					game_type: '',
					player_name: '',
					player_level: '',
					player_tier: '',
					kills: 0,
					deaths: 0,
					assists: 0,
					champ_level: 0,
					total_minions_killed: 0,
					champion_total_damage: 0,
					total_damage: 0,
					vision_score: 0,
					is_double_kill: false,
					is_triple_kill: false,
					is_quadra_kill: false,
					is_penta_kill: true,
					double_kill_count: 0,
					triple_kill_count: 0,
					quadra_kill_count: 0,
					penta_kill_count: 1,
					game_stat: '승리',
					spell_1: {
						name: '점멸',
						icon_img: '',
					},
					spell_2: {
						name: '점화',
						icon_img: '',
					},
					item: [],
				}}
				username={'엉 디'}
			/>
		);
		const matchCard = getByRole(/matchCard/gi);
		expect(matchCard).toHaveClass('bg-blue-200');
		getByText(/소환사의 협곡/gi);
		getByText(/분전/gi);
		const chanpionIcon = getByRole(/chanpionIcon/gi);
		expect(chanpionIcon).toHaveStyle(`background-image: ${CDN_URL('string')}`);
	})
});
