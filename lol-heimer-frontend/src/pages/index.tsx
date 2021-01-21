import React, { useEffect } from 'react';
import MainSearchBox from '@components/SearchBox/MainSearchBox';
import { bindActionCreators } from 'redux';
import { setLoading } from '@store/loading';
import { connect } from 'react-redux';
import Heimer from '../images/heimer.png';
import LotationChampion from '@components/Rotation/RotationChampion';
import Article from '@components/Article';
import './index.scss'
import { Helmet } from 'react-helmet-async';
import Layout from './../Layout';

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

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<Layout>
			<Helmet>
				<title>Home | LOL Heimer</title>
			</Helmet>
			<div className="pt-12">
				<img src={Heimer} className="mx-auto" alt="lol-heimer title" />
			</div>
			<MainSearchBox />
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
						title="youtube"
						src="https://www.youtube.com/embed/lXWSn8lAn2k"
						frameBorder={"0"}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen={true}>
					</iframe>
				</div>
			</Article>
		</Layout>
	)
}

export default connect(null, mapDispatchToProps)(Pages);
