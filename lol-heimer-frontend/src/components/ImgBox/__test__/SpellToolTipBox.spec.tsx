import React from 'react';
import SpellToolTipBox from '../SpellToolTipBox';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../ImgBox', () => {
  return () => <span>Img Box Call</span>
});

jest.mock('@components/ToolTip', () => {
  return () => <span>ToolTip</span>
});

describe('<SpellToolTipBox />', () => {
	it('Render Done', () => {
		const { getByText } = render(<SpellToolTipBox
			name={'123'}
			imgUrl={'url'}
		/>);
		getByText(/Img Box Call/gi);
	});
});
