<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Search extends CI_Controller{
	private $base_url = 'https://kr.api.riotgames.com/lol/';
	private $api_key = 'RGAPI-9f2cc058-bc56-4a84-9774-2255676d79da';

	public function index(){
		echo 'index_page';
	}

	public function user(string $userId)
	{
		if (empty($userId)) {
			echo 'not found id';
			return false;
		}
		$api_url = $this->base_url . '/summoner/v4/summoners/by-name/?api_key' . $this->api_key;

		$data = [
			'summonerName' => $userId
		];

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_POST, true);

		$response = curl_exec($ch);
		curl_close($ch);

		return json_encode($response);
	}

}

?>
