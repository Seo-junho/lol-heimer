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
import SkeletonMatchCard from '@skeleton/SkeletonMatchCard';


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
	const [matchLoading, setMatchLoading] = useState<boolean>(false);

	const limit = 5; // limit 개수 만큼 가져옵니다
	const [offset, setOffset] = useState<number>(limit);

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
					console.log('response', response.data.data)
					if (user_info && profile_icon) {
						setUserInfo({
							...JSON.parse(user_info),
							profile_icon,
						});
					}
					if (team_league_info) {
						setTeamLeague(team_league_info);
					}
					if (solo_league_info) {
						setSoloLeague(solo_league_info);
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
		if (matchLoading) {
			return;
		}
		setMatchLoading(true);
		try {
			axios.get(`${API_SEARCH_GET_MATCH_LIST}/${username}/${offset - limit}/${offset}`)
				.then((response: any) => {
					const { data: { data } } = response;
					if (data) {
						setMatches(current => [
							...current,
							...data,
						]);
					}
					setMatchLoading(false);
				})
				.catch((error: any) => {
					console.log('error', error);
					setMatchLoading(false);
				});
		} catch (e) {
			setMatchLoading(false);
		}
	}, [offset]);

	return (
		<Article>
			<div className="flex flex-col items-center justify-center">
				<div className="w-full flex">
					<UserCard
						userInfo={userInfo}
					/>
				</div>
				<div className="flex flex-col sm:flex-row w-full">
					<LeagueCard
						type='solo'
						leagueInfo={soloLeague}
					/>
					<LeagueCard
						type='team'
						leagueInfo={teamLeague}
					/>
				</div>
			</div>
			{ matchList.length !== 0 && (
				<div className="flex flex-col items-start justify-center">
					{ matchList.map((item, index) => (
						<MatchCard
							key={index}
							match={item}
							username={username}
						/>
					)) }
				</div>
			)}
			{ matchLoading ? (
				<div>
					{[...Array(limit)].map((_, index) => (
						<SkeletonMatchCard key={index} />
					))}
				</div>
			) : (
				<div>
					<button
						className="base-btn w-full text-cente text-2xl"
						onClick={() => { setOffset(current => current += limit) }}
					>
						더보기
					</button>
				</div>
			)}
		</Article>
	)
}

export default connect(null, mapDispatchToProps)(User);
