import React, { useState } from 'react';
import axios from "axios";
import MainSearchBox from '@components/SearchBox/MainSearchBox';
import { API_SEARCH_USER } from '@end-point/index';
import { useHistory } from 'react-router';

const Pages: React.FC = (
): JSX.Element => {
  const history = useHistory();

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
			// const data = await axios.get(`${API_SEARCH_USER}/${user.username}`);
			// console.log('data', data)
			history.push(`/user/${user.username}`);
		} catch {
			// TODO: Error handling
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
