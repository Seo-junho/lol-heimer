import React from 'react';
import KdaBox from '../KdaBox';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<KdaBox />', () => {
	it('KdaBox Render Done', async () => {
		const { getByText } = render(
			<KdaBox
				kills={10}
				deaths={20}
				assists={30}
			/>
		);
		getByText(/10/gi);
		getByText(/20/gi);
		getByText(/30/gi);
	});
});
