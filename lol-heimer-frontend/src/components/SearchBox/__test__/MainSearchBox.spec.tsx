import React from 'react';
import MainSearchBox from '../MainSearchBox';
import { render, wait, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

const mockPush = jest.fn();
jest.mock('react-router', () => {
  const realModule = jest.requireActual('react-router');
  return {
    ...realModule,
    useHistory: () => ({
      push: mockPush,
    })
  }
});

describe('<MainSearchBox />', () => {
	it('Render & Search Done', async () => {
		const imgUrl = `url(http://test.com)`;
		const { getByText, getByRole, getByPlaceholderText } = render(
			<MainSearchBox></MainSearchBox>
		);
		const name = '엉 디';
		const username = getByPlaceholderText(/소환사 명/gi);
		const button = getByRole(/searchButton/gi);
		await waitFor(() => {
      userEvent.type(username, name);
      userEvent.click(button);
		});
    expect(mockPush).toHaveBeenCalledWith(`/home/user/${name}`);
	});

  afterAll(() => {
    jest.clearAllMocks();
  });
})
