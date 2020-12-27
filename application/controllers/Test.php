<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {

	public function index(){
		$id = 0;
		$url = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/profileicon.json';
		$json_string = file_get_contents($url);
		$userIconData = json_decode($json_string, true);
		$key = array_search($id, array_column($userIconData['data'], 'id'));

		$userIconData = $userIconData['data'];
		$userIconList = array_keys($userIconData);
		$userIconId = $userIconList[$key];

		$userIconData = $userIconData[$userIconId];

		var_dump($userIconData);

	}
}
