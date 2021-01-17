import React from 'react';
import ImgBox from '../ImgBox';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<ImgBox />', () => {
	it('Render', () => {
		const imgUrl = `url(http://test.com)`;
		const { getByText, getByRole, container } = render(
			<ImgBox
				imgUrl={imgUrl}
			>
				<div>Render</div>
			</ImgBox>
		);
		getByText(/Render/gi);
		const image = getByRole(/image/gi);
		expect(image).toHaveStyle(`background-image: ${imgUrl}`);
		expect(container.firstChild).toHaveClass('bg-cover bg-no-repeat')
	})
})
