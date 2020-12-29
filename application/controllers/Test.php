<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {



	public function index(){

		$url = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/summoner.json';
		$ci = curl_init();
		curl_setopt($ci, CURLOPT_URL, $url);
		curl_setopt($ci, CURLOPT_RETURNTRANSFER, 1);
		$cont = curl_exec($ci);
		curl_close($ci);

		$id = 0;

		//$json_string = file_get_contents();
		$data = json_decode($cont, true);
		$key = array_search($id, array_column($data['data'], 'id'));

		$data = $data['data'];
		$list = array_keys($data);
		$id = $list[$key];

		$data = $data[$id];

		$reponse_data = [];

		$reponse_data['id'] = $data['id'];
		$reponse_data['name'] = $data['name'];
		$reponse_data['icon_img'] =	'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/spell/'	.$data['id']. '.png';
		$reponse_data['desc'] = $data['description'];

		var_dump($data);

//		$id = 0;
//		$url = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/profileicon.json';
//		$json_string = file_get_contents($url);
//		$userIconData = json_decode($json_string, true);
//		$key = array_search($id, array_column($userIconData['data'], 'id'));
//
//		$userIconData = $userIconData['data'];
//		$userIconList = array_keys($userIconData);
//		$userIconId = $userIconList[$key];
//
//		$userIconData = $userIconData[$userIconId];
//
//		var_dump($userIconData);

	}
}
