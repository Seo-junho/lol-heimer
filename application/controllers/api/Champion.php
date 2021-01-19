<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

class Champion extends MY_Controller {

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
			$champion = getMainChampionData($freeChampion);
			$data['free_champion_list'][$k]['name'] = $champion['name'];
			$data['free_champion_list'][$k]['image'] = $champion['image'];
			$data['free_champion_list'][$k]['loading_image'] = $champion['loading_image'];
			$data['free_champion_list'][$k]['title'] = $champion['title'];
		}

		foreach($result->freeChampionIdsForNewPlayers as $k=>$freeChampionIdsForNewPlayers){
			$champion = getMainChampionData($freeChampionIdsForNewPlayers);
			$data['free_champion_list_for_new_player'][$k]['name'] = $champion['name'];
			$data['free_champion_list_for_new_player'][$k]['image'] = $champion['image'];
			$data['free_champion_list_for_new_player'][$k]['loading_image'] = $champion['loading_image'];
			$data['free_champion_list_for_new_player'][$k]['title'] = $champion['title'];
		}

		$response['data'] = $data;

		echo json_encode($response);
		return;
	}
}
