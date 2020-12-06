import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { API_SEARCH_USER } from '@end-point/index';
import UserCard from '@components/UserCard/UserCard';
import LeagueCard from '@components/UserCard/LeagueCard';

interface Params {
	username: string;
}
const User: React.FC = (
): JSX.Element => {
	const { username }: Params = useParams();
	const [userInfo, setUserInfo] = useState<any>({});
	const [soloLeague, setSoloLeague] = useState<any>({});
	const [teamLeague, setTeamLeague] = useState<any>({});

	useEffect(() => {
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
				})
				.catch((error: any) => {
					console.log('error', error);
				});
		} catch (e) {
			console.log('axios catch', e);
		}
	}, []);

	return (
		<>
			<UserCard
				userInfo={userInfo}
			/>
			<LeagueCard
				leagueInfo={soloLeague}
			/>
			<LeagueCard
				leagueInfo={teamLeague}
			/>
		</>
	)
}

export default User;
