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

			$matchDetail[$key]['gameCreation'] = $matchInfo->gameCreation;
			$matchDetail[$key]['gameDuration'] = $matchInfo->gameDuration;
			$matchDetail[$key]['gameMode'] = get_property('game_mode', $matchInfo->gameMode);
			$matchDetail[$key]['gameType'] = get_property('game_type', $matchInfo->gameType);
			$matchDetail[$key]['map'] = get_property('map', $matchInfo->mapId);

			foreach ( $matchInfo->participantIdentities as $k=>$player){
				if ($player->player->currentAccountId == $AccountId) {
					$playerParticipantId = $player->participantId;
					break;
				}
			}

			$teams = [];
			foreach ($matchInfo->teams as $team) {
				$teams[$team->teamId] = $team;
			}

			foreach ($matchInfo->participants as $k=>$participants) {
				if ($participants->participantId == $playerParticipantId) {
					$matchDetail[$key]['kills'] = $participants->stats->kills;
					$matchDetail[$key]['deaths'] = $participants->stats->deaths;
					$matchDetail[$key]['assists'] = $participants->stats->assists;
					$matchDetail[$key]['champ_level'] = $participants->stats->champLevel;
					$matchDetail[$key]['total_minions_killed'] = $participants->stats->champLevel;

					$matchDetail[$key]['is_double_kill'] = $participants->stats->doubleKills > 0;
					$matchDetail[$key]['is_triple_kill'] = $participants->stats->tripleKills > 0;
					$matchDetail[$key]['is_quadra_kill'] = $participants->stats->quadraKills > 0;
					$matchDetail[$key]['is_penta_kill'] = $participants->stats->pentaKills > 0;

					$matchDetail[$key]['game_stat'] = ($teams[$participants->teamId]->win == 'Fail') ? '패배' : '승리';
					$matchDetail[$key]['spell_1'] = getSpell($participants->spell1Id);
					$matchDetail[$key]['spell_2'] = getSpell($participants->spell2Id);
					break;
				}
			}
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

