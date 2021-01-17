import React from 'react';
import ItemToolTipBox from '../ItemToolTipBox';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../ImgBox', () => {
  return () => <span>Img Box Call</span>
});

describe('<ItemToolTipBox />', () => {
	it('Render Done', () => {
		const { getByText } = render(<ItemToolTipBox
			item={{
				name: '',
				icon_img: '',
				plain_text: '',
				item_price: 123,
			}}
		/>);
		getByText(/Img Box Call/gi);
	});
});
