<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Server extends CI_Controller{

	private $base_url = 'https://kr.api.riotgames.com/lol';

	/**
	 * 서버 상태 가져옴
	 */
	public function getServerStatus()
	{
		$response['code'] = 200;
		$response['message'] = 'Success';
		$response['data'] = [];


		$api_url = $this->base_url . '/status/v4/platform-data?api_key=' . RIOT_API_KEY;

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

		$result = curl_exec($ch);
		curl_close($ch);

		$response['data'] = $result;

		echo json_encode($response);
	}
}
