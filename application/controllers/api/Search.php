<?php
defined('BASEPATH') or exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

class Search extends CI_Controller{
	private $base_url = 'https://kr.api.riotgames.com/lol';

	public function index(){
		echo 'index_page';
	}

	/**
	 * 유저 정보를 가져옴
	 * @param string $userName 유저 닉네임
	 */
	public function getUserInfo($userName = '')
	{
		if (empty($userName)) {
			$this->return('400', 'not found username', []);
		}

		$userId = $this->getUserId($userName);
		$league_info = $this->getUserLeagueInfo($userId);

		$response['code'] = 200;
		$response['message'] = 'Success';
		$response['data']['user_info'] = $this->getUser($userName);
		$profileIconId = json_decode($response['data']['user_info'])->profileIconId;
		$response['data']['profile_icon'] = getUserIcon($profileIconId);

		if (!empty($league_info)) {
			$response['data']['solo_league_info'] = [];
			$response['data']['team_league_info'] = [];

			if (!empty($league_info[0])) {
				$response['data']['solo_league_info'] = $league_info[0];
				$response['data']['solo_league_info']->tier_img = '//junho98.cdn3.cafe24.com/img/2020/tier_' . mb_strtolower($league_info[0]->tier). '_'. $league_info[0]->rank .'.png';
			}
			if (!empty($league_info[1])) {
				$response['data']['team_league_info'] = $league_info[1];
				$response['data']['team_league_info']->tier_img = '//junho98.cdn3.cafe24.com/img/2020/tier_' . mb_strtolower($league_info[1]->tier). '_'. $league_info[1]->rank .'.png';
			}
		}
		echo json_encode($response);
	}

	public function getMatchListDetail(string $game_id)
	{
		if ($game_id == '') {
			$this->return('400', 'not found gameid', []);
		}
		$apiUrl = $this->base_url . '/match/v4/matches/' . $game_id .'?api_key=' . RIOT_API_KEY;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $apiUrl);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$matchInfo = json_decode(curl_exec($ch));
		curl_close($ch);

		$teams = []; // 팀 리스트
		$players = []; // 게임 플레이어 리스트

		$blue_team = [];
		$red_team = [];

		foreach ($matchInfo->teams as $team) {
			$teams[$team->teamId] = $team;
		}

		$match_participants = $matchInfo->participants;
		foreach ($matchInfo->participantIdentities as $player) {
			$players[$player->participantId]['participantId'] = $player->participantId;
			$players[$player->participantId]['summonerName'] = $player->player->summonerName;
			$players[$player->participantId]['currentAccountId'] = $player->player->currentAccountId;
		}

		$i = 0; // 플레이어 인덱스 임시 저장 변수
		foreach ($players as $k=>$player) {
			$player_index = $player['participantId'] - 1;
			$player_info = $this->getUserTierAndLevel($player['summonerName']);

			if ($k < 6) {
				$team = 'blue_team';
			} else {
				$team = 'red_team';
			}

			${$team}[$i]['player_name'] = $player['summonerName'];
			${$team}[$i]['player_level'] = $player_info['level'];
			${$team}[$i]['player_tier'] = $player_info['tier'];
			${$team}[$i]['play_champion'] = getChampionData($match_participants[$player_index]->championId);

			${$team}[$i]['kills'] = $match_participants[$player_index]->stats->kills;
			${$team}[$i]['deaths'] = $match_participants[$player_index]->stats->deaths;
			${$team}[$i]['assists'] = $match_participants[$player_index]->stats->assists;
			${$team}[$i]['champ_level'] = $match_participants[$player_index]->stats->champLevel;
			${$team}[$i]['total_minions_killed'] = $match_participants[$player_index]->stats->totalMinionsKilled;
			${$team}[$i]['champion_total_damage'] = $match_participants[$player_index]->stats->totalDamageDealtToChampions;
			${$team}[$i]['total_damage'] = $match_participants[$player_index]->stats->totalDamageDealtToChampions;
			${$team}[$i]['vision_score'] = $match_participants[$player_index]->stats->visionScore;

			${$team}[$i]['is_double_kill'] = $match_participants[$player_index]->stats->doubleKills > 0;
			${$team}[$i]['is_triple_kill'] = $match_participants[$player_index]->stats->tripleKills > 0;
			${$team}[$i]['is_quadra_kill'] = $match_participants[$player_index]->stats->quadraKills > 0;
			${$team}[$i]['is_penta_kill'] = $match_participants[$player_index]->stats->pentaKills > 0;

			${$team}[$i]['double_kill_count'] = $match_participants[$player_index]->stats->doubleKills;
			${$team}[$i]['triple_kill_count'] = $match_participants[$player_index]->stats->tripleKills;
			${$team}[$i]['quadra_kill_count'] = $match_participants[$player_index]->stats->quadraKills;
			${$team}[$i]['penta_kill_count'] = $match_participants[$player_index]->stats->pentaKills;

			${$team}[$i]['game_stat'] = ($teams[$match_participants[$player_index]->teamId]->win == 'Fail') ? '패배' : '승리';
			${$team}[$i]['spell_1'] = getSpell($match_participants[$player_index]->spell1Id);
			${$team}[$i]['spell_2'] = getSpell($match_participants[$player_index]->spell2Id);

			$items = [
				$match_participants[$player_index]->stats->item0,
				$match_participants[$player_index]->stats->item1,
				$match_participants[$player_index]->stats->item2,
				$match_participants[$player_index]->stats->item3,
				$match_participants[$player_index]->stats->item4,
				$match_participants[$player_index]->stats->item5,
				$match_participants[$player_index]->stats->item6,
			];

			$item_list = getItemList($items);

			${$team}[$i]['item'] = [];

			foreach($item_list as $item){
				array_push(${$team}[$i]['item'], $item);
			}

			$i++;

			if ($i == 5) {
				$i = 0;
			}
		}
		$matchDetail = [];
		$matchDetail['blue_team'] = $blue_team;
		$matchDetail['red_team'] = $red_team;

		$this->return('200', 'Success!', $matchDetail);
	}

	/**
	 * 유저 이름 기준으로 게임 매칭 리스트를 가져옴
	 * @param string $userName 유저 닉네임
	 * @param int $beginIndex
	 * @param int $endIndex
	 */
	public function getMatchListOld(string $userName = '', int $beginIndex = 0, int $endIndex = 10)
	{
		if (empty($userName)) {
			$this->return('400', 'not found username', []);
		}

		$AccountId = $this->getUserAccountId($userName);
		$apiUrl = $this->base_url . '/match/v4/matchlists/by-account/' . $AccountId .'?api_key=' . RIOT_API_KEY . '&beginIndex='.$beginIndex.'&endIndex='.$endIndex;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $apiUrl);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$matchList = json_decode(curl_exec($ch));
		curl_close($ch);

		$matchDetail = [];

		foreach($matchList->matches as $key=>$value){
			$apiUrl = $this->base_url . '/match/v4/matches/' . $value->gameId .'?api_key=' . RIOT_API_KEY;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $apiUrl);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			$matchInfo = json_decode(curl_exec($ch));
			curl_close($ch);

			$matchDetail[$key]['game_id'] = $value->gameId;
			$matchDetail[$key]['play_champion'] = getChampionData($value->champion);
			$matchDetail[$key]['timestamp'] = $value->timestamp;
			$matchDetail[$key]['role'] = $value->role;
			$matchDetail[$key]['lane'] = $value->lane;
			$matchDetail[$key]['queue'] = get_property('queues',$value->queue);
			$matchDetail[$key]['game_creation'] = $matchInfo->gameCreation;
			$matchDetail[$key]['game_duration'] = $matchInfo->gameDuration;
			//$matchDetail[$key]['game_mode'] = get_property('game_mode', $matchInfo->gameMode);
			$matchDetail[$key]['game_type'] = get_property('game_type', $matchInfo->gameType);
			//$matchDetail[$key]['map'] = get_property('map', $matchInfo->mapId);

			$teams = []; // 팀 리스트
			$players = []; // 게임 플레이어 리스트
			$my_participant_id = ''; // 내 고유 아이디

			foreach ($matchInfo->teams as $team) {
				$teams[$team->teamId] = $team;
			}

			$match_participants = $matchInfo->participants;
			foreach ($matchInfo->participantIdentities as $player) {
				$players[$player->participantId]['participantId'] = $player->participantId;
				$players[$player->participantId]['summonerName'] = $player->player->summonerName;
				$players[$player->participantId]['currentAccountId'] = $player->player->currentAccountId;
				if ($players[$player->participantId]['currentAccountId'] == $AccountId) {
					$my_participant_id = $players[$player->participantId]['participantId'];
				}
			}

			$player_info = $this->getUserTierAndLevel($players[$my_participant_id]['summonerName']);

			$matchDetail[$key]['player_name'] = $players[$my_participant_id]['summonerName'];
			$matchDetail[$key]['player_level'] = $player_info['level'];
			$matchDetail[$key]['player_tier'] = $player_info['tier'];

			$my_participant_id = $my_participant_id - 1;

			$matchDetail[$key]['kills'] = $match_participants[$my_participant_id]->stats->kills;
			$matchDetail[$key]['deaths'] = $match_participants[$my_participant_id]->stats->deaths;
			$matchDetail[$key]['assists'] = $match_participants[$my_participant_id]->stats->assists;
			$matchDetail[$key]['champ_level'] = $match_participants[$my_participant_id]->stats->champLevel;
			$matchDetail[$key]['total_minions_killed'] = $match_participants[$my_participant_id]->stats->totalMinionsKilled;
			$matchDetail[$key]['champion_total_damage'] = $match_participants[$my_participant_id]->stats->totalDamageDealtToChampions;
			$matchDetail[$key]['total_damage'] = $match_participants[$my_participant_id]->stats->totalDamageDealtToChampions;
			$matchDetail[$key]['vision_score'] = $match_participants[$my_participant_id]->stats->visionScore;

			$matchDetail[$key]['is_double_kill'] = $match_participants[$my_participant_id]->stats->doubleKills > 0;
			$matchDetail[$key]['is_triple_kill'] = $match_participants[$my_participant_id]->stats->tripleKills > 0;
			$matchDetail[$key]['is_quadra_kill'] = $match_participants[$my_participant_id]->stats->quadraKills > 0;
			$matchDetail[$key]['is_penta_kill'] = $match_participants[$my_participant_id]->stats->pentaKills > 0;

			$matchDetail[$key]['double_kill_count'] = $match_participants[$my_participant_id]->stats->doubleKills;
			$matchDetail[$key]['triple_kill_count'] = $match_participants[$my_participant_id]->stats->tripleKills;
			$matchDetail[$key]['quadra_kill_count'] = $match_participants[$my_participant_id]->stats->quadraKills;
			$matchDetail[$key]['penta_kill_count'] = $match_participants[$my_participant_id]->stats->pentaKills;

			$matchDetail[$key]['game_stat'] = ($teams[$match_participants[$my_participant_id]->teamId]->win == 'Fail') ? '패배' : '승리';
			$matchDetail[$key]['spell_1'] = getSpell($match_participants[$my_participant_id]->spell1Id);
			$matchDetail[$key]['spell_2'] = getSpell($match_participants[$my_participant_id]->spell2Id);

			$matchDetail[$key]['item'][0] = getItem($match_participants[$my_participant_id]->stats->item0);
			$matchDetail[$key]['item'][1] = getItem($match_participants[$my_participant_id]->stats->item1);
			$matchDetail[$key]['item'][2] = getItem($match_participants[$my_participant_id]->stats->item2);
			$matchDetail[$key]['item'][3] = getItem($match_participants[$my_participant_id]->stats->item3);
			$matchDetail[$key]['item'][4] = getItem($match_participants[$my_participant_id]->stats->item4);
			$matchDetail[$key]['item'][5] = getItem($match_participants[$my_participant_id]->stats->item5);
			$matchDetail[$key]['item'][6] = getItem($match_participants[$my_participant_id]->stats->item6);
		}
		$this->return('200', 'Success!', $matchDetail);
	}

	/**
	 * 유저 이름 기준으로 게임 매칭 리스트를 가져옴 ( new )
	 * @param string $userName 유저 닉네임
	 * @param int $beginIndex
	 * @param int $endIndex
	 */
	public function getMatchList(string $userName = '', int $beginIndex = 0, int $endIndex = 10)
	{
		if (empty($userName)) {
			$this->return('400', 'not found username', []);
		}

		$AccountId = $this->getUserAccountId($userName);
		$apiUrl = $this->base_url . '/match/v4/matchlists/by-account/' . $AccountId .'?api_key=' . RIOT_API_KEY . '&beginIndex='.$beginIndex.'&endIndex='.$endIndex;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $apiUrl);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$matchList = json_decode(curl_exec($ch));
		curl_close($ch);

		$matchDetail = [];

		$url_list = [];
		foreach ($matchList->matches as $key=>$value) {
			array_push($url_list,$this->base_url . '/match/v4/matches/' . $value->gameId .'?api_key=' . RIOT_API_KEY);
		}

		$res = $this->fetch_multi_url($url_list);

		foreach ($matchList->matches as $key=>$value) {
			$matchInfo = $res[$key];

			$matchDetail[$key]['game_id'] = $value->gameId;
			$matchDetail[$key]['play_champion'] = getChampionData($value->champion);
			$matchDetail[$key]['timestamp'] = $value->timestamp;
			$matchDetail[$key]['role'] = $value->role;
			$matchDetail[$key]['lane'] = $value->lane;
			$matchDetail[$key]['queue'] = get_property('queues',$value->queue);
			$matchDetail[$key]['game_creation'] = $matchInfo->gameCreation;
			$matchDetail[$key]['game_duration'] = $matchInfo->gameDuration;
			//$matchDetail[$key]['game_mode'] = get_property('game_mode', $matchInfo->gameMode);
			$matchDetail[$key]['game_type'] = get_property('game_type', $matchInfo->gameType);
			//$matchDetail[$key]['map'] = get_property('map', $matchInfo->mapId);

			$teams = []; // 팀 리스트
			$players = []; // 게임 플레이어 리스트
			$my_participant_id = ''; // 내 고유 아이디

			foreach ($matchInfo->teams as $team) {
				$teams[$team->teamId] = $team;
			}

			$match_participants = $matchInfo->participants;
			foreach ($matchInfo->participantIdentities as $player) {
				$players[$player->participantId]['participantId'] = $player->participantId;
				$players[$player->participantId]['summonerName'] = $player->player->summonerName;
				$players[$player->participantId]['currentAccountId'] = $player->player->currentAccountId;
				if ($players[$player->participantId]['currentAccountId'] == $AccountId) {
					$my_participant_id = $players[$player->participantId]['participantId'];
				}
			}

			$player_info = $this->getUserTierAndLevel($players[$my_participant_id]['summonerName']);

			$matchDetail[$key]['player_name'] = $players[$my_participant_id]['summonerName'];
			$matchDetail[$key]['player_level'] = $player_info['level'];
			$matchDetail[$key]['player_tier'] = $player_info['tier'];

			$my_participant_id = $my_participant_id - 1;

			$matchDetail[$key]['kills'] = $match_participants[$my_participant_id]->stats->kills;
			$matchDetail[$key]['deaths'] = $match_participants[$my_participant_id]->stats->deaths;
			$matchDetail[$key]['assists'] = $match_participants[$my_participant_id]->stats->assists;
			$matchDetail[$key]['champ_level'] = $match_participants[$my_participant_id]->stats->champLevel;
			$matchDetail[$key]['total_minions_killed'] = $match_participants[$my_participant_id]->stats->totalMinionsKilled;
			$matchDetail[$key]['champion_total_damage'] = $match_participants[$my_participant_id]->stats->totalDamageDealtToChampions;
			$matchDetail[$key]['total_damage'] = $match_participants[$my_participant_id]->stats->totalDamageDealtToChampions;
			$matchDetail[$key]['vision_score'] = $match_participants[$my_participant_id]->stats->visionScore;

			$matchDetail[$key]['is_double_kill'] = $match_participants[$my_participant_id]->stats->doubleKills > 0;
			$matchDetail[$key]['is_triple_kill'] = $match_participants[$my_participant_id]->stats->tripleKills > 0;
			$matchDetail[$key]['is_quadra_kill'] = $match_participants[$my_participant_id]->stats->quadraKills > 0;
			$matchDetail[$key]['is_penta_kill'] = $match_participants[$my_participant_id]->stats->pentaKills > 0;

			$matchDetail[$key]['double_kill_count'] = $match_participants[$my_participant_id]->stats->doubleKills;
			$matchDetail[$key]['triple_kill_count'] = $match_participants[$my_participant_id]->stats->tripleKills;
			$matchDetail[$key]['quadra_kill_count'] = $match_participants[$my_participant_id]->stats->quadraKills;
			$matchDetail[$key]['penta_kill_count'] = $match_participants[$my_participant_id]->stats->pentaKills;

			$matchDetail[$key]['game_stat'] = ($teams[$match_participants[$my_participant_id]->teamId]->win == 'Fail') ? '패배' : '승리';
			$matchDetail[$key]['spell_1'] = getSpell($match_participants[$my_participant_id]->spell1Id);
			$matchDetail[$key]['spell_2'] = getSpell($match_participants[$my_participant_id]->spell2Id);

			$items = [
				$match_participants[$my_participant_id]->stats->item0,
				$match_participants[$my_participant_id]->stats->item1,
				$match_participants[$my_participant_id]->stats->item2,
				$match_participants[$my_participant_id]->stats->item3,
				$match_participants[$my_participant_id]->stats->item4,
				$match_participants[$my_participant_id]->stats->item5,
				$match_participants[$my_participant_id]->stats->item6,
			];

			$item_list = getItemList($items);

			$matchDetail[$key]['item'] = [];

			foreach($item_list as $item){
				array_push($matchDetail[$key]['item'], $item);
			}
		}
		var_dump($matchDetail);
		die();
		$this->return('200', 'Success!', $matchDetail);
	}

	/**
	 * 유저의 리그 정보를 가져옴
	 * @param string $encryptedSummonerId 유저 고유 id
	 * @return bool|string
	 */
	public function getUserLeagueInfo(string $encryptedSummonerId)
	{
		$api_url = $this->base_url . '/league/v4/entries/by-summoner/'. $encryptedSummonerId . '?api_key=' . RIOT_API_KEY;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

		$result = json_decode(curl_exec($ch));
		curl_close($ch);

		return $result;
	}

	/**
	 * 유저의 티어와 레벨을 가져옴
	 * @param string $userName 유저 고유 id
	 * @return mixed
	 */
	private function getUserTierAndLevel(string $userName)
	{
		$userInfo = $this->getUser($userName);
		$userInfo = json_decode($userInfo);

		$response = [];

		$response['level'] = '-';
		$response['tier'] = '-';
		if (!empty($userInfo)) {
			$response['level'] = $userInfo->summonerLevel;
			$league_info = $this->getUserLeagueInfo($userInfo->id);
		}
		if (!empty($league_info[1])) {
			$response['tier'] = $league_info[1]->tier . ' ' . $league_info[1]->rank;
		}
		return $response;
	}


	/**
	 * 유저의 고유정보를 가져옴
	 * @param string $userName 유저 고유 id
	 * @return mixed
	 */
	private function getUser(string $userName)
	{
		$api_url = $this->base_url . '/summoner/v4/summoners/by-name/'. $userName . '?api_key=' . RIOT_API_KEY;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		//curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		//curl_setopt($ch, CURLOPT_POST, true);

		$result = curl_exec($ch);
		curl_close($ch);

		return $result;
	}

	/**
	 * 유저의 아이디를 가져옴
	 * @param string $userName 유저명
	 * @return mixed
	 */
	private function getUserId(string $userName)
	{
		$api_url = $this->base_url . '/summoner/v4/summoners/by-name/'. $userName . '?api_key=' . RIOT_API_KEY;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0.5);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		//curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		//curl_setopt($ch, CURLOPT_POST, true);

		$result = json_decode(curl_exec($ch));
		curl_close($ch);

		return $result->id;
	}

	/**
	 * 유저의 아이디를 가져옴
	 * @param string $userName 유저명
	 * @return mixed
	 */
	private function getUserAccountId(string $userName)
	{
		$api_url = $this->base_url . '/summoner/v4/summoners/by-name/'. $userName . '?api_key=' . RIOT_API_KEY;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		//curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		//curl_setopt($ch, CURLOPT_POST, true);

		$result = json_decode(curl_exec($ch));
		curl_close($ch);

		return $result->accountId;
	}

	private function return($status = '200', $message = 'Success', $data = [])
	{
		$response['status'] = $status;
		$response['message'] = $message;
		$response['data'] = $data;

		echo json_encode($response);
		return;
	}

	/**
	 * fetch_multi_url
	 *
	 * @param array $url_list
	 * @param int $timeout
	 * @return array
	 */
	private function fetch_multi_url( array $url_list, $timeout = 0 ) {

		$mh = curl_multi_init();

		foreach ($url_list as $i => $url) {
			$conn[$i] = curl_init($url);
			curl_setopt($conn[$i],CURLOPT_RETURNTRANSFER,1);
			curl_setopt($conn[$i],CURLOPT_FAILONERROR,1);
			curl_setopt($conn[$i],CURLOPT_FOLLOWLOCATION,1);
			curl_setopt($conn[$i],CURLOPT_MAXREDIRS,3);
			curl_setopt($conn[$i],CURLOPT_SSL_VERIFYPEER,false);
			curl_setopt($conn[$i],CURLOPT_SSL_VERIFYHOST,false);

			// 타임아웃
			if ($timeout){
				curl_setopt($conn[$i],CURLOPT_TIMEOUT, $timeout);
			}
			curl_multi_add_handle($mh,$conn[$i]);
		}

		$active = null;
		do {
			usleep(10000);
			$mrc = curl_multi_exec($mh,$active);
		} while ($active > 0);
//		while ($active and $mrc == CURLM_OK) {
//			if (curl_multi_select($mh) != -1) {
//				do {
//					$mrc = curl_multi_exec($mh,$active);
//				} while ($mrc == CURLM_CALL_MULTI_PERFORM);
//			}
//		}

		if ($mrc != CURLM_OK) {
			echo 'read fail :'.$mrc;
		}
		//결과 취득
		$res = array();
		foreach ($url_list as $i => $url) {
			if (($err = curl_error($conn[$i])) == '') {
				$res[$i] = json_decode(curl_multi_getcontent($conn[$i]));
			} else {
				echo 'fail :'.$url_list[$i].'<br />';

			}
			curl_multi_remove_handle($mh,$conn[$i]);

			curl_close($conn[$i]);

		}
		curl_multi_close($mh);

		return $res;
	}

	function get_time() { $t=explode(' ',microtime()); return (float)$t[0]+(float)$t[1]; }
}


