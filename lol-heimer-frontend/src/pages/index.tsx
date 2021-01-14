import React, { useEffect, useState } from 'react';
import axios from "axios";
import MainSearchBox from '@components/SearchBox/MainSearchBox';
import { API_SEARCH_USER } from '@end-point/index';
import { useHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { setLoading } from '@store/loading';
import { connect } from 'react-redux';
import Heimer from '../images/heimer.png';
import LotationChampion from '@components/Rotation/RotationChampion';
import Article from '@components/Article';
import './index.scss'

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
			<Article>
				<div className="w-full flex flex-col items-center justify-center">
					<ins
						className="kakao_ad_area"
						style={{
							display: 'none',
						}}
						data-ad-unit    = "DAN-7SsI5Wftq4gGy5PI"
						data-ad-width   = "728"
						data-ad-height  = "90">
					</ins>
				</div>
			</Article>
			<LotationChampion />
			<Article>
				<h1 className="text-orange-500 font-bold text-lg sm:text-xl my-3 pb	-2 border-b-2 border-solid border-orange-500">
					롤 관련 영상
				</h1>
				<div className="flex items-center justify-center youtube">
					<iframe
						src="https://www.youtube.com/embed/lXWSn8lAn2k"
						frameBorder={"0"}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen={true}>
					</iframe>
				</div>
			</Article>
		</>
	)
}

export default connect(null, mapDispatchToProps)(Pages);
