import React from 'react';
import PlayerTitle from '../PlayerTitle';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<PlayerTitle />', () => {
	it('PlayerTitle Render Done', () => {
		const { getByText } = render(
			<PlayerTitle
				championId={1000}
				summonerName={'챔편이름'}
			/>
		);
		getByText(/1000/gi);
		getByText(/챔편이름/gi);
	})
});
