import React from 'react';
import LeagueCard from '../LeagueCard';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('<LeagueCard />', () => {
	it('LeagueCard Render solo Done', async () => {
		const { getByText, getByRole, getByAltText } = render(
			<LeagueCard
				type={'solo'}
				leagueInfo={{
					leagueId: '123',
					queueType: '',
					tier: 'UnRanked',
					rank: '-',
					summonerId: '',
					summonerName: '',
					leaguePoints: 100,
					wins: 100,
					losses: 100,
					veteran: false,
					inactive: false,
					freshBlood: false,
					hotStreak: false,
					tier_img: 'https://junho98.cdn3.cafe24.com/img/2020/tier_unranked.png',
				}}
			></LeagueCard>
		);
		getByText(/솔로랭크/gi);
		getByText(/UnRanked -/gi);
		const img = getByAltText('img-tier');
		expect(img).toHaveAttribute('src', 'https://junho98.cdn3.cafe24.com/img/2020/tier_unranked.png');
		const winsLate = getByRole('winsLate');
		expect(winsLate).toHaveClass(`text-green-600`);
	});

	it('LeagueCard Render Team Done', async () => {
		const { getByText, getByRole, getByAltText } = render(
			<LeagueCard
				type={'team'}
				leagueInfo={{
					leagueId: '123',
					queueType: '',
					tier: 'UnRanked',
					rank: '-',
					summonerId: '',
					summonerName: '',
					leaguePoints: 50,
					wins: 10,
					losses: 100,
					veteran: false,
					inactive: false,
					freshBlood: false,
					hotStreak: false,
					tier_img: 'testsrc',
				}}
			></LeagueCard>
		);
		getByText(/자유 5:5 랭크/gi);
		getByText(/UnRanked -/gi);
		const img = getByAltText('img-tier');
		expect(img).toHaveAttribute('src', 'testsrc');
		const winsLate = getByRole('winsLate');
		expect(winsLate).toHaveClass(`text-gray-600`);
	});
})
