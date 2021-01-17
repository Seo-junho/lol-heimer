import React from 'react';
import ItemBox from '../ItemBox';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@components/ImgBox/ItemToolTipBox', () => {
  return () => <span>ItemToolTipBox</span>
});

describe('<ItemBox />', () => {
	it('ItemBox Double Render Done', async () => {
		const { getByText, getByRole } = render(
			<ItemBox
				items={[0,0,0,0,0,0,0,0]}
				type={'double'}
			/>
		);
		const items = getByRole(/items/gi);
		expect(items).toHaveClass('flex-col')
	});

	it('ItemBox flat Render Done', async () => {
		const { getByText, getByRole } = render(
			<ItemBox
				items={[0,0,0,0,0,0,0,0]}
				type={'flat'}
			/>
		);
		const items = getByRole(/items/gi);
		expect(items).toHaveClass('flex-row')
	});
})
