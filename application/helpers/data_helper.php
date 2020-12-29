<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function getItem($id = 0)
{
	$userIconData = file_get_content( 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/item.json');

	$reponseData = [];
	$reponseData['name'] = '';
	$reponseData['icon_img'] = '';
	//$reponseData['desc'] = '';
	$reponseData['plain_text'] = '';
	$reponseData['item_price'] = '';

	if (!empty($userIconData['data'][$id])) {
		$userIconData = $userIconData['data'][$id];
		$reponseData['name'] = $userIconData['name'];
		$reponseData['icon_img'] = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/' .$userIconData['image']['full'];
		//$reponseData['desc'] = $userIconData['description'];
		//$reponseData['plain_text'] = $userIconData['plaintext'];
		$reponseData['item_price'] = $userIconData['gold']['total'];
	}
	return $reponseData;
}


/**
 * 유저 아이콘을 가져 옵니다.
 * @param int $id
 * @return string
 */
function getUserIcon($id = 0)
{
	$userIconData = file_get_content( 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/profileicon.jso');
	$key = array_search($id, array_column($userIconData['data'], 'id'));

	$userIconData = $userIconData['data'];
	$userIconList = array_keys($userIconData);
	$userIconId = $userIconList[$key];

	$userIconData = $userIconData[$userIconId];

	return 'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/profileicon/' . $userIconData['image']['full'];
}

/**
 * 스펠 정보를 가져 옵니다.
 * @param int $id
 * @return array
 */
function getSpell($id = 0)
{
	$data = file_get_content( 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/summoner.json');
	$key = array_search($id, array_column($data['data'], 'key'));
	$data = $data['data'];
	$list = array_keys($data);
	$k = $list[$key];
	$data = $data[$k];

	$reponseData = [];

	$reponseData['id'] = $data['id'];
	$reponseData['name'] = $data['name'];
	$reponseData['icon_img'] = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/spell/'	.$data['id']. '.png';
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

	$champion_data = file_get_content( 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/champion.json');

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
	$champion['image'] = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/' . $champion_data['image']['full'];

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
