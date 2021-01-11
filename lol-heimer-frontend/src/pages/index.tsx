import React, { useEffect, useState } from 'react';
import axios from "axios";
import MainSearchBox from '@components/SearchBox/MainSearchBox';
import { API_SEARCH_USER } from '@end-point/index';
import { useHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { setLoading } from '@store/loading';
import { connect } from 'react-redux';
import Heimer from '../images/heimer.png';

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    setLoading
  }, dispatch);
};

interface IProps {
	setLoading: Function;
};

const Pages: React.FC<IProps> = ({
	setLoading
}): JSX.Element => {
	const history = useHistory();

	useEffect(() => {
		setLoading(false);
	}, [])

	const [user, setUser] = useState({
		username: '',
		country: 'kr',
	});

	const nameChange = (username: string) => {
		setUser({
			...user,
			username,
		})
	};

	const onSubmit = async (): Promise<void> => {
		try {
			const data = await axios.get(`${API_SEARCH_USER}/${user.username}`);
			history.push(`/user/${user.username}`);
		} catch {
			// TODO: Error handling
		}
	};

	return (
		<>
			<div className="pt-12">
				<img src={Heimer} className="mx-auto" />
			</div>
			<MainSearchBox
				onSubmit={onSubmit}
				nameChange={nameChange}
			/>
		</>
	)
}

export default connect(null, mapDispatchToProps)(Pages);
