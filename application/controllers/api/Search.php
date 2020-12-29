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
			$response['data']['team_league_info'] = $league_info[0];
			$response['data']['solo_league_info'] = $league_info[1];

			$response['data']['team_league_info']->tier_img = 'http://junho98.cdn3.cafe24.com/tier_emblem/' . mb_strtolower($league_info[0]->tier). '.png';
			$response['data']['solo_league_info']->tier_img = 'http://junho98.cdn3.cafe24.com/tier_emblem/' . mb_strtolower($league_info[1]->tier). '.png';
		}
		echo json_encode($response);
	}

	/**
	 * 게임 매칭 리스트를 가져옴
	 * @param string $userName 유저 닉네임
	 * @param int $limit
	 * @param int $offset
	 */
	public function getMatchList(string $userName = '', int $limit = 10, int $offset = 0)
	{
		if (empty($userName)) {
			$this->return('400', 'not found username', []);
		}

		$AccountId = $this->getUserAccountId($userName);
		$apiUrl = $this->base_url . '/match/v4/matchlists/by-account/' . $AccountId .'?api_key=' . RIOT_API_KEY . '&startIndex='.$offset.'&endIndex='.$limit;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $apiUrl);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$matchList = json_decode(curl_exec($ch));
		curl_close($ch);


		$matchDetail = [];

		foreach($matchList->matches as $key=>$value){
			$apiUrl = $this->base_url . '/match/v4/matches/' . $value->gameId .'?api_key=' . RIOT_API_KEY;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $apiUrl);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			$matchInfo = json_decode(curl_exec($ch));
			curl_close($ch);

			$matchDetail[$key]['play_champion'] = getChampionData($value->champion);
			$matchDetail[$key]['timestamp'] = $value->timestamp;
			$matchDetail[$key]['role'] = $value->role;
			$matchDetail[$key]['lane'] = $value->lane;
			$matchDetail[$key]['queue'] = get_property('queues',$value->queue);

			$matchDetail[$key]['game_creation'] = $matchInfo->gameCreation;
			$matchDetail[$key]['game_duration'] = $matchInfo->gameDuration;
			$matchDetail[$key]['game_mode'] = get_property('game_mode', $matchInfo->gameMode);
			$matchDetail[$key]['game_type'] = get_property('game_type', $matchInfo->gameType);
			$matchDetail[$key]['map'] = get_property('map', $matchInfo->mapId);

			$blue_team = [];
			$red_team = [];

			$teams = [];
			foreach ($matchInfo->teams as $team) {
				$teams[$team->teamId] = $team;
			}

			foreach ($matchInfo->participants as $k=>$participants) {
				foreach ($matchInfo->participantIdentities as $j=>$player) {
					if ($participants->participantId == $player->participantId) {
						$player_info = $this->getUserTierAndLevel($player->player->summonerName);

						// 유저 기본 정보
						$player_name = $player->player->summonerName;
						$player_level = $player_info['level'];
						$player_tier = $player_info['tier'];

						// 게임 기본 정보
						$kill = $participants->stats->kills; // 킬 수
						$deaths = $participants->stats->deaths; // 데스
						$assists = $participants->stats->assists; // 어시스트
						$champ_level = $participants->stats->champLevel; // 챔피언 레벨
						$total_minions_killed = $participants->stats->totalMinionsKilled; // 총 처치 미니언 수
						$champion_total_damage = $participants->stats->totalDamageDealtToChampions; // 챔피언 피해량
						$total_damage = $participants->stats->totalDamageDealtToChampions; // 총 피해량
						$vision_score = $participants->stats->visionScore; // 시야 점수

						// 스페셜 킬 여부
						$is_double_kill = $participants->stats->doubleKills > 0;
						$is_triple_kill = $participants->stats->tripleKills > 0;
						$is_quadra_kill = $participants->stats->quadraKills > 0;
						$is_penta_kill = $participants->stats->pentaKills > 0;

						// 스페셜 킬 횟수
						$double_kill_count = $participants->stats->doubleKills;
						$triple_kill_count = $participants->stats->tripleKills;
						$quadra_kill_count = $participants->stats->quadraKills;
						$penta_kill_count = $participants->stats->pentaKills;

						$game_stat = ($teams[$participants->teamId]->win == 'Fail') ? '패배' : '승리';
						$spell_1 = getSpell($participants->spell1Id);
						$spell_2 = getSpell($participants->spell2Id);

						$item0 = getItem($participants->stats->item0);
						$item1 = getItem($participants->stats->item1);
						$item2 = getItem($participants->stats->item2);
						$item3 = getItem($participants->stats->item3);
						$item4 = getItem($participants->stats->item4);
						$item5 = getItem($participants->stats->item5);
						$item6 = getItem($participants->stats->item6);

						if ($j < 5){
							$blue_team[$j]['game_stat'] = $game_stat;
							$blue_team[$j]['player_info']['player_name'] = $player_name;
							$blue_team[$j]['player_info']['player_level'] = $player_level;
							$blue_team[$j]['player_info']['player_tier'] = $player_tier;

							$blue_team[$j]['game_info']['kills'] = $kill;
							$blue_team[$j]['game_info']['deaths'] = $deaths;
							$blue_team[$j]['game_info']['assists'] = $assists;
							$blue_team[$j]['game_info']['champ_level'] = $champ_level;
							$blue_team[$j]['game_info']['total_minions_killed'] = $total_minions_killed;
							$blue_team[$j]['game_info']['champion_total_damage'] = $champion_total_damage;
							$blue_team[$j]['game_info']['total_damage'] = $total_damage;
							$blue_team[$j]['game_info']['vision_score'] = $vision_score;

							$blue_team[$j]['kill_info']['is_double_kill'] = $is_double_kill;
							$blue_team[$j]['kill_info']['is_triple_kill'] = $is_triple_kill;
							$blue_team[$j]['kill_info']['is_quadra_kill'] = $is_quadra_kill;
							$blue_team[$j]['kill_info']['is_penta_kill'] = $is_penta_kill;

							$blue_team[$j]['kill_info']['double_kill_count'] = $double_kill_count;
							$blue_team[$j]['kill_info']['triple_kill_count'] = $triple_kill_count;
							$blue_team[$j]['kill_info']['quadra_kill_count'] = $quadra_kill_count;
							$blue_team[$j]['kill_info']['penta_kill_count'] = $penta_kill_count;

							$blue_team[$j]['spell_info']['spell_1'] = $spell_1;
							$blue_team[$j]['spell_info']['spell_2'] = $spell_2;

							$blue_team[$j]['item_info']['item'] = [];
							$blue_team[$j]['item_info']['item'][0] = $item0;
							$blue_team[$j]['item_info']['item'][1] = $item1;
							$blue_team[$j]['item_info']['item'][2] = $item2;
							$blue_team[$j]['item_info']['item'][3] = $item3;
							$blue_team[$j]['item_info']['item'][4] = $item4;
							$blue_team[$j]['item_info']['item'][5] = $item5;
							$blue_team[$j]['item_info']['item'][6] = $item6;
						} else {
							$red_team[$j]['game_stat'] = $game_stat;
							$red_team[$j]['player_info']['player_name'] = $player_name;
							$red_team[$j]['player_info']['player_level'] = $player_level;
							$red_team[$j]['player_info']['player_tier'] = $player_tier;

							$red_team[$j]['game_info']['kills'] = $kill;
							$red_team[$j]['game_info']['deaths'] = $deaths;
							$red_team[$j]['game_info']['assists'] = $assists;
							$red_team[$j]['game_info']['champ_level'] = $champ_level;
							$red_team[$j]['game_info']['total_minions_killed'] = $total_minions_killed;
							$red_team[$j]['game_info']['champion_total_damage'] = $champion_total_damage;
							$red_team[$j]['game_info']['total_damage'] = $total_damage;
							$red_team[$j]['game_info']['vision_score'] = $vision_score;

							$red_team[$j]['kill_info']['is_double_kill'] = $is_double_kill;
							$red_team[$j]['kill_info']['is_triple_kill'] = $is_triple_kill;
							$red_team[$j]['kill_info']['is_quadra_kill'] = $is_quadra_kill;
							$red_team[$j]['kill_info']['is_penta_kill'] = $is_penta_kill;

							$red_team[$j]['kill_info']['double_kill_count'] = $double_kill_count;
							$red_team[$j]['kill_info']['triple_kill_count'] = $triple_kill_count;
							$red_team[$j]['kill_info']['quadra_kill_count'] = $quadra_kill_count;
							$red_team[$j]['kill_info']['penta_kill_count'] = $penta_kill_count;

							$red_team[$j]['spell_info']['spell_1'] = $spell_1;
							$red_team[$j]['spell_info']['spell_2'] = $spell_2;

							$red_team[$j]['item_info']['item'] = [];
							$red_team[$j]['item_info']['item'][0] = $item0;
							$red_team[$j]['item_info']['item'][1] = $item1;
							$red_team[$j]['item_info']['item'][2] = $item2;
							$red_team[$j]['item_info']['item'][3] = $item3;
							$red_team[$j]['item_info']['item'][4] = $item4;
							$red_team[$j]['item_info']['item'][5] = $item5;
							$red_team[$j]['item_info']['item'][6] = $item6;
						}

						// 내 데이터 넣기
						if ($player->player->currentAccountId == $AccountId) {
							$matchDetail[$key]['player_name'] = $player_name;
							$matchDetail[$key]['player_level'] = $player_level;
							$matchDetail[$key]['player_tier'] = $player_tier;

							$matchDetail[$key]['kills'] = $kill;
							$matchDetail[$key]['deaths'] = $deaths;
							$matchDetail[$key]['assists'] = $assists;
							$matchDetail[$key]['champ_level'] = $champ_level;
							$matchDetail[$key]['total_minions_killed'] = $total_minions_killed;
							$matchDetail[$key]['champion_total_damage'] = $champion_total_damage;
							$matchDetail[$key]['total_damage'] = $total_damage;
							$matchDetail[$key]['vision_score'] = $vision_score;

							$matchDetail[$key]['is_double_kill'] = $is_double_kill;
							$matchDetail[$key]['is_triple_kill'] = $is_triple_kill;
							$matchDetail[$key]['is_quadra_kill'] = $is_quadra_kill;
							$matchDetail[$key]['is_penta_kill'] = $is_penta_kill;

							$matchDetail[$key]['double_kill_count'] = $double_kill_count;
							$matchDetail[$key]['triple_kill_count'] = $triple_kill_count;
							$matchDetail[$key]['quadra_kill_count'] = $quadra_kill_count;
							$matchDetail[$key]['penta_kill_count'] = $penta_kill_count;

							$matchDetail[$key]['game_stat'] = $game_stat;
							$matchDetail[$key]['spell_1'] = $spell_1;
							$matchDetail[$key]['spell_2'] = $spell_2;

							$matchDetail[$key]['item_info']['item'] = [];
							$matchDetail[$key]['item_info']['item'][0] = $item0;
							$matchDetail[$key]['item_info']['item'][1] = $item1;
							$matchDetail[$key]['item_info']['item'][2] = $item2;
							$matchDetail[$key]['item_info']['item'][3] = $item3;
							$matchDetail[$key]['item_info']['item'][4] = $item4;
							$matchDetail[$key]['item_info']['item'][5] = $item5;
							$matchDetail[$key]['item_info']['item'][6] = $item6;
						}
					}
				}
			}
			array_values($blue_team);
			array_values($red_team);
			$matchDetail[$key]['blue_team'] = $blue_team;
			$matchDetail[$key]['red_team'] = $red_team;
		}
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
//		$userInfo = $this->getUser($userName);
//		$userId = $this->getUserId($userName);
//		$league_info = $this->getUserLeagueInfo($userId);
//
//		$userInfo = json_decode($userInfo);

		$response = [];

		$response['level'] = '-';
		$response['tier'] = '-';

//		$response['level'] = $userInfo->summonerLevel;
//		if (!empty($league_info)) {
//			$response['tier'] = $league_info[1]->tier . ' ' . $league_info[1]->rank;
//		}
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
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
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

}

