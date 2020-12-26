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
		if (!empty($league_info)) {
			$response['data']['solo_league_info'] = $league_info[0];
			$response['data']['team_league_info'] = $league_info[1];
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
			$value->matchDetail = $matchInfo;
		}
		$this->return('200', 'Success!', $matchList);
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

