import React, { useState } from 'react';
import axios from "axios";
import MainSearchBox from '@components/SearchBox/MainSearchBox';
import { API_SEARCH_USER } from '@end-point/index';

const Pages: React.FC = (
): JSX.Element => {

	const [user, setUser] = useState({
		username: '',
		country: 'kr',
	});
	const nameChange = (username: string) => {
		setUser({
			...user,
			username,
		})
	}
	const onSubmit = async (): Promise<void> => {
		try {
			const data = await axios.get(`${API_SEARCH_USER}/${user.username}`);
			console.log('data', data)
		} catch {

		}
	}
	return (
		<>
			<MainSearchBox
				onSubmit={onSubmit}
				nameChange={nameChange}
			/>
		</>
	)
}

export default Pages;
