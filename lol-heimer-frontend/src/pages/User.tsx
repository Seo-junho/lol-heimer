import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { API_SEARCH_USER } from '@end-point/index';
import UserCard from '@components/UserCard/UserCard';
import LeagueCard from '@components/UserCard/LeagueCard';
import { setLoading } from '@store/loading';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


// TODO: typescript type 정의하기
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    setLoading
  }, dispatch);
};

interface Params {
	username: string;
};

interface IProps {
	setLoading: Function;
}

const User: React.FC<IProps> = ({
	setLoading,
}) => {
	const { username }: Params = useParams();
	const [userInfo, setUserInfo] = useState<any>({});
	const [soloLeague, setSoloLeague] = useState<any>({});
	const [teamLeague, setTeamLeague] = useState<any>({});

	useEffect(() => {
		setLoading(true);
		try {
			axios.get(`${API_SEARCH_USER}/${username}`)
				.then((response: any) => {
					const { data: { data : {
						user_info,
						solo_league_info,
						team_league_info,
					} } } = response;
					if (user_info && solo_league_info && team_league_info) {
						setUserInfo(JSON.parse(user_info));
						setSoloLeague(solo_league_info);
						setTeamLeague(team_league_info);
					}
					setLoading(false);
				})
				.catch((error: any) => {
					console.log('error', error);
					setLoading(false);
				});
		} catch (e) {
			console.log('axios catch', e);
			setLoading(false);
		}
	}, []);

	// TODO: skeleton css ADD
	return (
		<div className="flex flex-col sm:flex-row p-5 items-start justify-center">
			<UserCard
				userInfo={userInfo}
			/>
			<LeagueCard
				leagueInfo={soloLeague}
			/>
			<LeagueCard
				leagueInfo={teamLeague}
			/>
		</div>
	)
}

export default connect(null, mapDispatchToProps)(User);
