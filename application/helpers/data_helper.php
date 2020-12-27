<?php
@ini_set("allow_url_fopen", "1");
function getUserIcon($id = 0)
{
	$url = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/profileicon.json';
	$json_string = file_get_contents($url);
	$userIconData = json_decode($json_string, true);
	$key = array_search($id, array_column($userIconData['data'], 'id'));

	$userIconData = $userIconData['data'];
	$userIconList = array_keys($userIconData);
	$userIconId = $userIconList[$key];

	$userIconData = $userIconData[$userIconId];

	return 'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/profileicon/' . $userIconData['image']['full'];
}


function getChampionData($id = 0)
{
	if ($id == 0) {
		return [];
	}

	$url = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/ko_KR/champion.json';
	$json_string = file_get_contents($url);
	$champion_data = json_decode($json_string, true);
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
	$champion['desc'] = $champion_data['blurb'];
	$champion['image'] = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/' . $champion_data['image']['full'];
//		array(11) {
//					["version"]=>
//			  string(7) "10.25.1"
//					["id"]=>
//			  string(6) "Aatrox"
//					["key"]=>
//			  string(3) "266"
//					["name"]=>
//			  string(12) "아트록스"
//					["title"]=>
//			  string(16) "다르킨의 검"
//					["blurb"]=>
//			  string(630) "한때는 공허에 맞서 싸웠던 슈리마의 명예로운 수호자 아트록스와 그의 종족은 결국 공허보다 위험한 존재가 되어 룬테라의 존속을 위협했지만, 교활한 필멸자의 마법에 속아넘어가 패배하게 되었다. 수백 년에 걸친 봉인 끝에, 아트록스는 자신의 정기가 깃든 마법 무기를 휘두르는 어리석은 자들을 타락시키고 육신을 바꾸는 것으로 다시 한번 자유의 길을 찾아내었다. 이제 이전의 잔혹한 모습을 닮은 육체를 차지한 아트록스는 세상의 종말과 오랫동안 기다려온 복수를..."
//					["info"]=>
//			  array(4) {
//						["attack"]=>
//				int(8)
//				["defense"]=>
//				int(4)
//				["magic"]=>
//				int(3)
//				["difficulty"]=>
//				int(4)
//			  }
//			  ["image"]=>
//			  array(7) {
//						["full"]=>
//				string(10) "Aatrox.png"
//						["sprite"]=>
//				string(13) "champion0.png"
//						["group"]=>
//				string(8) "champion"
//						["x"]=>
//				int(0)
//				["y"]=>
//				int(0)
//				["w"]=>
//				int(48)
//				["h"]=>
//				int(48)
//			  }
//			  ["tags"]=>
//			  array(2) {
//						[0]=>
//				string(7) "Fighter"
//						[1]=>
//				string(4) "Tank"
//			  }
//			  ["partype"]=>
//			  string(10) "피의 샘"
//					["stats"]=>
//			  array(20) {
//						["hp"]=>
//				int(580)
//				["hpperlevel"]=>
//				int(90)
//				["mp"]=>
//				int(0)
//				["mpperlevel"]=>
//				int(0)
//				["movespeed"]=>
//				int(345)
//				["armor"]=>
//				int(38)
//				["armorperlevel"]=>
//				float(3.25)
//				["spellblock"]=>
//				float(32.1)
//				["spellblockperlevel"]=>
//				float(1.25)
//				["attackrange"]=>
//				int(175)
//				["hpregen"]=>
//				int(3)
//				["hpregenperlevel"]=>
//				int(1)
//				["mpregen"]=>
//				int(0)
//				["mpregenperlevel"]=>
//				int(0)
//				["crit"]=>
//				int(0)
//				["critperlevel"]=>
//				int(0)
//				["attackdamage"]=>
//				int(60)
//				["attackdamageperlevel"]=>
//				int(5)
//				["attackspeedperlevel"]=>
//				float(2.5)
//				["attackspeed"]=>
//				float(0.651)
//			  }
//			}

	return $champion;
}
