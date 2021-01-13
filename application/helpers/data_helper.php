<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function getItemList($ids = []){
	$item_list = json_decode(file_get_contents('game_meta/item.json'), true);
	$result = [];
	foreach ($ids as $id) {
		$reponseData = [];
		$reponseData['name'] = '';
		$reponseData['icon_img'] = '';
		$reponseData['plain_text'] = '';
		$reponseData['item_price'] = '';
		if (!empty($item_list['data'][$id])) {
			$userIconData = $item_list['data'][$id];
			$reponseData['name'] = $userIconData['name'];
			$reponseData['icon_img'] = '/item/' .$userIconData['image']['full'];
			$reponseData['item_price'] = $userIconData['gold']['total'];
		}
		array_push($result, $reponseData);
	}
	return $result;
}

/**
 * 유저 아이콘을 가져 옵니다.
 * @param int $id
 * @return string
 */
function getUserIcon($id = 0)
{
	$userIconData = json_decode(file_get_contents('game_meta/profile_icon.json'), true);
	$key = array_search($id, array_column($userIconData['data'], 'id'));

	$userIconData = $userIconData['data'];
	$userIconList = array_keys($userIconData);
	$userIconId = $userIconList[$key];

	$userIconData = $userIconData[$userIconId];

	return '/profileicon/' . $userIconData['image']['full'];
}

/**
 * 스펠 정보를 가져 옵니다.
 * @param int $id
 * @return array
 */
function getSpell($id = 0)
{
	$data = json_decode(file_get_contents('game_meta/summoner.json'), true);
	$key = array_search($id, array_column($data['data'], 'key'));
	$data = $data['data'];
	$list = array_keys($data);
	$k = $list[$key];
	$data = $data[$k];

	$reponseData = [];

	//$reponseData['id'] = $data['id'];
	$reponseData['name'] = $data['name'];
	$reponseData['icon_img'] = '/spell/'. $data['id']. '.png';
	//$reponseData['desc'] = $data['description'];

	return $reponseData;
}

/**
 * 챔피언 정보를 가져옵니다
 * @param int $id
 * @return array
 */
function getChampionData($id = 0)
{
	if ($id == 0) {
		return [];
	}
	$champion_data = json_decode(file_get_contents('game_meta/champion.json'), true);

	$key = array_search($id, array_column($champion_data['data'], 'key'));

	$champion_data = $champion_data['data'];
	$champion_list = array_keys($champion_data);
	$champion_name = $champion_list[$key];

	$champion_data = $champion_data[$champion_name];
	$champion = [];

	$champion['id'] = $champion_data['id'];
	$champion['key'] = $champion_data['key'];
	$champion['name'] = $champion_data['name'];
	$champion['title'] = $champion_data['title'];
	//$champion['desc'] = $champion_data['blurb'];
	$champion['image'] = '/champion/' . $champion_data['image']['full'];

	return $champion;
}

/**
 * 챔피언 정보를 가져옵니다 ( 로테이션 페이지 전용 )
 * @param int $id
 * @return array
 */
function getMainChampionData($id = 0)
{
	if ($id == 0) {
		return [];
	}

	$champion_data = json_decode(file_get_contents('game_meta/champion.json'), true);

	$key = array_search($id, array_column($champion_data['data'], 'key'));

	$champion_data = $champion_data['data'];
	$champion_list = array_keys($champion_data);
	$champion_name = $champion_list[$key];

	$champion_data = $champion_data[$champion_name];
	$champion = [];

	$champion['id'] = $champion_data['id'];
	$champion['key'] = $champion_data['key'];
	$champion['name'] = $champion_data['name'];
	$champion['title'] = $champion_data['title'];
	$champion['loading_image'] = '//ddragon.leagueoflegends.com/cdn/img/champion/loading/' . $champion_data['id'] . '_0.jpg';
	//$champion['desc'] = $champion_data['blurb'];
	$champion['image'] = '/champion/' . $champion_data['image']['full'];

	return $champion;
}


function file_get_content(string $url)
{
	$ci = curl_init();
	curl_setopt($ci, CURLOPT_URL, $url);
	curl_setopt($ci, CURLOPT_RETURNTRANSFER, 1);
	$contents = curl_exec($ci);
	curl_close($ci);

	return json_decode($contents,true);
}
