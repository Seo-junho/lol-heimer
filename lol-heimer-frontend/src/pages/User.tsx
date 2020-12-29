import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { API_SEARCH_GET_MATCH_LIST, API_SEARCH_USER } from '@end-point/index';
import UserCard from '@components/UserCard/UserCard';
import LeagueCard from '@components/UserCard/LeagueCard';
import { setLoading } from '@store/loading';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MatchCard from '@components/MatchCard/MatchCard';
import Article from '@components/Article';
import SkeletonMatchCard from '@components/MatchCard/SkeletonMatchCard';


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

	const [matchList, setMatches] = useState<any[]>([]);

	const [matchLoading, setMatchLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		try {
			axios.get(`${API_SEARCH_USER}/${username}`)
				.then((response: any) => {
					const { data: { data : {
						user_info,
						solo_league_info,
						team_league_info,
						profile_icon,
					} } } = response;
					if (user_info && solo_league_info && team_league_info && profile_icon) {
						setUserInfo({
							...JSON.parse(user_info),
							profile_icon,
						});
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

	useEffect(() => {
		setMatchLoading(true);
		try {
			axios.get(`${API_SEARCH_GET_MATCH_LIST}/${username}/10/0`)
				.then((response: any) => {
					const { data: { data } } = response;
					console.log('data', data)
					if (data) {
						console.log('matches', data)
						setMatches(data);
					}
					setMatchLoading(false);
				})
				.catch((error: any) => {
					console.log('error', error);
					setMatchLoading(false);
				});
		} catch (e) {
			console.log('axios catch', e);
			setMatchLoading(false);
		}
	}, []);

	return (
		<Article>
			<div className="flex flex-col sm:flex-row p-5 items-center justify-center">
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
			{ matchLoading ? (
				<>
					<SkeletonMatchCard />
					<SkeletonMatchCard />
					<SkeletonMatchCard />
				</>
			) : (
				<div className="flex flex-col p-5 items-start justify-center">
					{ matchList.map((item, index) => (
						<MatchCard
							key={index}
							match={item}
							username={username}
						/>
					)) }
				</div>
			)}
		</Article>
	)
}

export default connect(null, mapDispatchToProps)(User);
