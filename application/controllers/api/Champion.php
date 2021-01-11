<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Champion extends CI_Controller {

	/**
	 * 로테이션 챔피언을 가져옴
	 */
	public function getRotations()
	{
		$api_url = 'https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=' . RIOT_API_KEY;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		$result = json_decode(curl_exec($ch));

		curl_close($ch);

		$response['status'] = '200';
		$response['message'] = 'Success';
		$response['data'] = [];

		$data = [];

		foreach($result->freeChampionIds as $k=>$freeChampion){
			$champion = getChampionData($freeChampion);
			$data['free_champion_list'][$k]['name'] = $champion['name'];
			$data['free_champion_list'][$k]['image'] = $champion['image'];
		}

		foreach($result->freeChampionIdsForNewPlayers as $k=>$freeChampionIdsForNewPlayers){
			$champion = getChampionData($freeChampionIdsForNewPlayers);
			$data['free_champion_list_for_new_player'][$k]['name'] = $champion['name'];
			$data['free_champion_list_for_new_player'][$k]['image'] = $champion['image'];
		}

		$response['data'] = $data;

		echo json_encode($response);
		return;
	}
}
