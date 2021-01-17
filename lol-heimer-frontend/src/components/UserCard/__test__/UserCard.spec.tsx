import React from 'react';
import UserCard from '../UserCard';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { CDN_URL } from '@end-point/server';

describe('<UserCard />', () => {
	it('UserCard Render Done', async () => {
		const summonerIcon = 'test';
		const summonerName = 'unknown';
		const summonerLevel = 123;
		const { getByText, getByRole, getByPlaceholderText } = render(
			<UserCard
				userInfo={{
					name: summonerName,
					summonerLevel: summonerLevel,
					profileIconId: 0,
					profile_icon: summonerIcon,
					id: 'unknown',
					accountId: 'unknown',
					puuid: 'unknown',
					revisionDate: 0,
				}}
			></UserCard>
		);
		const image = getByRole(/summonerIcon/gi);
		expect(image).toHaveStyle(`background-image: ${CDN_URL(summonerIcon)}`);
		getByText(/unknown/gi);
		getByText(/123/gi);
	});
})
