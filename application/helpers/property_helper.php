<?php

function get_seasons()
{
	return [
		[
			'id'	 => 0,
			"season" => "PRESEASON 3"
		],
		[
			'id'	 => 1,
			"season" => "SEASON 3"
		],
		[
			'id'	 => 2,
			"season" => "PRESEASON 2014"
		],
		[
			'id'	 => 3,
			"season" => "SEASON 2014"
		],
		[
			'id'	 => 4,
			"season" => "PRESEASON 2015"
		],
		[
			'id'	 => 5,
			"season" => "SEASON 2015"
		],
		[
			'id'	 => 6,
			"season" => "PRESEASON 2016"
		],
		[
			'id'	 => 7,
			"season" => "SEASON 2016"
		],
		[
			'id'	 => 8,
			"season" => "PRESEASON 2017"
		],
		[
			'id'	 => 9,
			"season" => "SEASON 2017"
		],
		[
			'id'	 => 10,
			"season" => "PRESEASON 2018"
		],
		[
			'id'	 => 11,
			"season" => "SEASON 2018"
		],
		[
			'id'	 => 12,
			"season" => "PRESEASON 2019"
		],
		[
			'id'	 => 13,
			"season" => "SEASON 2019"
		]
	];
}

function get_map()
{
	return [
		[
			"id" =>  1,
			"mapName" =>  "소환사의 협곡",
			"notes" =>  "원래 여름 버전"
		],
		[
			"id" =>  2,
			"mapName" =>  "소환사의 협곡",
			"notes" =>  "오리지널 가을 버전"
		],
		[
			"id" =>  3,
			"mapName" =>  "증명 장",
			"notes" =>  "튜토리얼 맵"
		],
		[
			"id" =>  4,
			"mapName" =>  "뒤틀린 나무 줄",
			"notes" =>  "원본 버전"
		],
		[
			"id" =>  8,
			"mapName" =>  "수정 흉터",
			"notes" =>  "도미니언지도"
		],
		[
			"id" =>  10,
			"mapName" =>  "뒤틀린 나무 줄",
			"notes" =>  "마지막 TT지도"
		],
		[
			"id" =>  11,
			"mapName" =>  "소환사의 협곡",
			"notes" =>  "현재 버전"
		],
		[
			"id" =>  12,
			"mapName" =>  "하울링 어비스",
			"notes" =>  "ARAM 맵"
		],
		[
			"id" =>  14,
			"mapName" =>  "정육점 다리",
		],
		[
			"id" =>  16,
			"mapName" =>  "우주 유적",
			"notes" =>  "다크 스타 특이점 맵"
		],
		[
			"id" =>  18,
			"mapName" =>  "발로 란 도시 공원",
			"notes" =>  "스타 가디언 침공지도"
		],
		[
			"id" =>  19,
			"mapName" =>  "하위 구조 43",
			"notes" =>  "PROJECT 사냥꾼지도"
		],
		[
			"id" =>  20,
			"mapName" =>  "충돌 사이트",
			"notes" =>  "Odyssey 추출 맵"
		],
		[
			"id" =>  20,
			"mapName" =>  "수렴",
			"notes" =>  "팀 파이트 전술지도"
		],
		[
			"id" =>  21,
			"mapName" =>  "Nexus Blitz",
			"notes" =>  "Nexus Blitz지도"
		]
	];
}

function get_game_mode()
{
	return [
		[
			"id" =>  "CLASSIC",
        	"description" =>  "Classic Summoner 's Rift and Twisted Treeline games"
		],
		[
			"id" =>  "ODIN",
        	"description" =>  "도미니언 / 크리스탈 스카 게임"
		],
		[
			"id" =>  "ARAM",
        	"description" =>  "ARAM 게임"
		],
		[
			"id" =>  "TUTORIAL",
        	"description" =>  "튜토리얼 게임"
		],
		[
			"id" =>  "URF",
        	"description" =>  "URF 게임"
		],
		[
			"id" =>  "DOOMBOTSTEEMO",
        	"description" =>  "둠봇 게임"
		],
		[
			"id" =>  "ONEFORALL",
        	"description" =>  "모든 게임을위한 하나"
		],
		[
			"id" =>  "ASCENSION",
        	"description" =>  "Ascension games"
		],
		[
			"id" =>  "FIRSTBLOOD" ,
        	"description" =>  "Snowdown Showdown games"
		],
		[
			"id" =>  "KINGPORO",
        	"description" =>  "Legend of the Poro King games"
		],
		[
			"id" =>  "SIEGE",
        	"description" =>  "Nexus Siege 게임 "
		],
		[
			"id " => "ASSASSINATE ",
			"description" =>  "Blood Hunt Assassin games"
		],
		[
			"id" =>  "ARSR",
        	"description" =>  "모든 무작위 소환사의 리프트 게임"
		],
		[
			"id" =>  "DARKSTAR",
        	"description" =>  "다크 스타  특이점 게임 "
		],
		[
			"id " => "STARGUARDIAN ",
        	"description " => "Star Guardian Invasion games "
		],
		[
			"id " => "PROJECT ",
        	"description " => "PROJECT Hunters games "
		],
		[
			"id" =>  "idX",
        	"description" =>  "Nexus Blitz 게임"
		],
		[
			"id" =>  "ODYSSEY",
        	"description" =>  "Odyssey 추출 게임"
		],
		[
			"id" =>  "NEXUSBLITZ",
			"description" =>  "Nexus Blitz games"
		]
	];
}
function get_game_type()
{
	return [
		[
			"gametype" => "CUSTOM_GAME",
        	"description" => "사용자 설정 게임"
		],
		[
			"gametype" => "TUTORIAL_GAME",
       		"description" => "튜토리얼 게임"
		],
		[
			"gametype" => "MATCHED_GAME",
        	"description" => "기타 게임"
		]
	];
}

function get_queues()
{
	return [
		[
			"id" => 0,
			"map" => "사용자 지정 게임",
			"description" => null,
			"notes" => null
		],
		[
			"id" => 2,
			"map" => "소환사의 협곡",
			"description" => "5v5 블라인드 픽 게임",
			"notes" => "id 430을 위해 7.19 패치에서 사용되지 않음"
		],
		[
			"id" => 4,
			"map" => "소환사의 협곡",
			"description" => "5v5 랭크 솔로 게임",
			"notes" => "id 420 대신 사용되지 않음"
		],
		[
			"id" => 6,
			"map" => "소환사의 협곡",
			"description" => "5v5 등급 사전 제작 게임",
			"notes" => "게임 모드 지원 중단됨"
		],
		[
			"id" => 7,
			"map" => "소환사의 협곡",
			"description" => "Co-op vs AI 게임",
			"notes" => "id 32 및 33 대신 사용되지 않음"
		],
		[
			"id" => 8,
			"map" => "뒤틀린 나무 줄",
			"description" => "3v3 일반 게임",
			"notes" => "id 460을 위해 7.19 패치에서 사용되지 않음"
		],
		[
			"id" => 9,
			"map" => "뒤틀린 나무 줄",
			"description" => "3v3 랭크 플렉스 게임",
			"notes" => "id 470 대신 패치 7.19에서 사용되지 않음"
		],
		[
			"id" => 14,
			"map" => "소환사의 협곡",
			"description" => "5v5 드래프트 픽 게임",
			"notes" => "id 400 대신 사용되지 않음"
		],
		[
			"id" => 16,
			"map" => "크리스탈 스카",
			"description" => "5v5 Dominion Blind Pick 게임",
			"notes" => "게임 모드 지원 중단됨"
		],
		[
			"id" => 17,
			"map" => "크리스탈 스카",
			"description" => "5v5 Dominion Draft Pick 게임",
			"notes" => "게임 모드 지원 중단됨"
		],
		[
			"id" => 25,
			"map" => "크리스탈 스카",
			"description" => "Dominion Co-op vs AI 게임",
			"notes" => "게임 모드 지원 중단됨"
		],
		[
			"id" => 31,
			"map" => "소환사의 협곡",
			"description" => "Co-op vs AI Intro Bot 게임",
			"notes" => "id 830을 위해 7.19 패치에서 사용되지 않음"
		],
		[
			"id" => 32,
			"map" => "소환사의 협곡",
			"description" => "Co-op vs AI Beginner Bot 게임",
			"notes" => "id 840 대신 패치 7.19에서 사용되지 않음"
		],
		[
			"id" => 33,
			"map" => "소환사의 협곡",
			"description" => "Co-op vs AI Intermediate Bot 게임",
			"notes" => "7.19 패치에서 사용되지 않고 id 850이 사용됩니다."
		],
		[
			"id" => 41,
			"map" => "뒤틀린 나무 줄",
			"description" => "3 대 3 랭크 팀 게임",
			"notes" => "게임 모드 지원 중단됨"
		],
		[
			"id" => 42,
			"map" => "소환사의 협곡",
			"description" => "5v5 랭크 팀 게임",
			"notes" => "게임 모드 지원 중단됨"
		],
		[
			"id" => 52,
			"map" => "뒤틀린 나무 줄",
			"description" => "Co-op vs AI 게임",
			"notes" => "7.19 패치에서 사용되지 않고 id 800이 사용됩니다."
		],
		[
			"id" => 61,
			"map" => "소환사의 협곡",
			"description" => "5v5 팀 빌더 게임",
			"notes" => "게임 모드 지원 중단됨"
		],
		[
			"id" => 65,
			"map" => "하울링 어비스",
			"description" => "5v5 ARAM 게임",
			"notes" => "7.19 패치에서 사용되지 않고 id 450이 사용됩니다."
		],
		[
			"id" => 67,
			"map" => "하울링 어비스",
			"description" => "ARAM Co-op vs AI 게임",
			"notes" => "게임 모드 지원 중단됨"
		],
		[
			"id" => 70,
			"map" => "소환사의 협곡",
			"description" => "모든 게임을위한 하나",
			"notes" => "id 1020을 위해 패치 8.6에서 사용되지 않음"
		],
		[
			"id" => 72,
			"map" => "하울링 어비스",
			"description" => "1v1 Snowdown Showdown 게임",
			"참고" => null
		],
		[
			"id" => 73,
			"map" => "하울링 어비스",
			"description" => "2v2 Snowdown Showdown 게임",
			"참고" => null
		],
		[
			"id" => 75,
			"map" => "소환사의 협곡",
			"description" => "6v6 Hexakill 게임",
			"참고" => null
		],
		[
			"id" => 76,
			"map" => "소환사의 협곡",
			"description" => "Ultra Rapid Fire 게임",
			"참고" => null
		],
		[
			"id" => 78,
			"map" => "하울링 어비스",
			"description" => "One For All  => 미러 모드 게임",
			"참고" => null
		],
		[
			"id" => 83,
			"map" => "소환사의 협곡",
			"description" => "Co-op vs AI Ultra Rapid Fire 게임",
			"참고" => null
		],
		[
			"id" => 91,
			"map" => "소환사의 협곡",
			"description" => "둠봇 랭크 1 게임",
			"notes" => "id 950 대신 패치 7.19에서 사용되지 않음"
		],
		[
			"id" => 92,
			"map" => "소환사의 협곡",
			"description" => "둠봇 랭크 2 게임",
			"notes" => "id 950 대신 패치 7.19에서 사용되지 않음"
		],
		[
			"id" => 93,
			"map" => "소환사의 협곡",
			"description" => "둠봇 랭크 5 게임",
			"notes" => "id 950 대신 패치 7.19에서 사용되지 않음"
		],
		[
			"id" => 96,
			"map" => "크리스탈 스카",
			"description" => "상승 게임",
			"notes" => "id 910을 위해 7.19 패치에서 사용되지 않음"
		],
		[
			"id" => 98,
			"map" => "뒤틀린 나무 줄",
			"description" => "6v6 Hexakill 게임",
			"참고" => null
		],
		[
			"id" => 100,
			"map" => "정육점 다리",
			"description" => "5v5 ARAM 게임",
			"참고" => null
		],
		[
			"id" => 300,
			"map" => "하울링 어비스",
			"description" => "포로 킹 게임의 전설",
			"notes" => "id 920을 위해 7.19 패치에서 사용되지 않음"
		],
		[
			"id" => 310,
			"map" => "소환사의 협곡",
			"description" => "천적 게임",
			"참고" => null
		],
		[
			"id" => 313,
			"map" => "소환사의 협곡",
			"description" => "암시장 싸움꾼 게임",
			"참고" => null
		],
		[
			"id" => 315,
			"map" => "소환사의 협곡",
			"description" => "Nexus Siege 게임",
			"notes" => "7.19 패치에서 사용되지 않고 id 940이 사용됩니다."
		],
		[
			"id" => 317,
			"map" => "크리스탈 스카",
			"description" => "확실히 Dominion 게임이 아닙니다.",
			"참고" => null
		],
		[
			"id" => 318,
			"map" => "소환사의 협곡",
			"description" => "ARURF 게임",
			"notes" => "7.19 패치에서 사용되지 않고 id 900이 사용됩니다."
		],
		[
			"id" => 325,
			"map" => "소환사의 협곡",
			"description" => "모든 랜덤 게임",
			"참고" => null
		],
		[
			"id" => 400,
			"map" => "소환사의 협곡",
			"description" => "5v5 드래프트 픽 게임",
			"참고" => null
		],
		[
			"id" => 410,
			"map" => "소환사의 협곡",
			"description" => "5v5 등급 동적 게임",
			"notes" => "6.22 패치에서 게임 모드 사용 중단"
		],
		[
			"id" => 420,
			"map" => "소환사의 협곡",
			"description" => "5v5 랭크 솔로 게임",
			"참고" => null
		],
		[
			"id" => 430,
			"map" => "소환사의 협곡",
			"description" => "5v5 블라인드 픽 게임",
			"참고" => null
		],
		[
			"id" => 440,
			"map" => "소환사의 협곡",
			"description" => "5v5 랭크 플렉스 게임",
			"참고" => null
		],
		[
			"id" => 450,
			"map" => "하울링 어비스",
			"description" => "5v5 ARAM 게임",
			"참고" => null
		],
		[
			"id" => 460,
			"map" => "뒤틀린 나무 줄",
			"description" => "3 대 3 블라인드 픽 게임",
			"notes" => "9.23 패치에서 사용되지 않음"
		],
		[
			"id" => 470,
			"map" => "뒤틀린 나무 줄",
			"description" => "3v3 랭크 플렉스 게임",
			"notes" => "9.23 패치에서 사용되지 않음"
		],
		[
			"id" => 600,
			"map" => "소환사의 협곡",
			"description" => "혈액 사냥 암살자 게임",
			"참고" => null
		],
		[
			"id" => 610,
			"map" => "우주 유적",
			"description" => "다크 스타  => 특이점 게임",
			"참고" => null
		],
		[
			"id" => 700,
			"map" => "소환사의 협곡",
			"description" => "충돌 게임",
			"참고" => null
		],
		[
			"id" => 800,
			"map" => "뒤틀린 나무 줄",
			"description" => "Co-op vs. AI Intermediate Bot 게임",
			"notes" => "9.23 패치에서 사용되지 않음"
		],
		[
			"id" => 810,
			"map" => "뒤틀린 나무 줄",
			"description" => "Co-op vs. AI Intro Bot 게임",
			"notes" => "9.23 패치에서 사용되지 않음"
		],
		[
			"id" => 820,
			"map" => "뒤틀린 나무 줄",
			"description" => "협동 대 AI 초보자 봇 게임",
			"참고" => null
		],
		[
			"id" => 830,
			"map" => "소환사의 협곡",
			"description" => "Co-op vs. AI Intro Bot 게임",
			"참고" => null
		],
		[
			"id" => 840,
			"map" => "소환사의 협곡",
			"description" => "협동 대 AI 초보자 봇 게임",
			"참고" => null
		],
		[
			"id" => 850,
			"map" => "소환사의 협곡",
			"description" => "Co-op vs. AI Intermediate Bot 게임",
			"참고" => null
		],
		[
			"id" => 900,
			"map" => "소환사의 협곡",
			"description" => "URF 게임",
			"참고" => null
		],
		[
			"id" => 910,
			"map" => "크리스탈 스카",
			"description" => "상승 게임",
			"참고" => null
		],
		[
			"id" => 920,
			"map" => "하울링 어비스",
			"description" => "포로 킹 게임의 전설",
			"참고" => null
		],
		[
			"id" => 940,
			"map" => "소환사의 협곡",
			"description" => "Nexus Siege 게임",
			"참고" => null
		],
		[
			"id" => 950,
			"map" => "소환사의 협곡",
			"description" => "둠봇 투표 게임",
			"참고" => null
		],
		[
			"id" => 960,
			"map" => "소환사의 협곡",
			"description" => "둠봇 표준 게임",
			"참고" => null
		],
		[
			"id" => 980,
			"map" => "발로 란 공원",
			"description" => "스타 가디언 침공  => 일반 게임",
			"참고" => null
		],
		[
			"id" => 990,
			"map" => "발로 란 공원",
			"description" => "스타 가디언 침공  => 맹공격 게임",
			"참고" => null
		],
		[
			"id" => 1000,
			"map" => "과충전",
			"description" => "PROJECT  => Hunters games",
			"참고" => null
		],
		[
			"id" => 1010,
			"map" => "소환사의 협곡",
			"description" => "눈 ARURF 게임",
			"참고" => null
		],
		[
			"id" => 1020,
			"map" => "소환사의 협곡",
			"description" => "모든 게임을위한 하나",
			"참고" => null
		],
		[
			"id" => 1030,
			"map" => "충돌 사이트",
			"description" => "오디세이 추출  => 인트로 게임",
			"참고" => null
		],
		[
			"id" => 1040,
			"map" => "충돌 사이트",
			"description" => "Odyssey Extraction  => Cadet games",
			"참고" => null
		],
		[
			"id" => 1050,
			"map" => "충돌 사이트",
			"description" => "오디세이 추출  => 승무원 게임",
			"참고" => null
		],
		[
			"id" => 1060,
			"map" => "충돌 사이트",
			"description" => "Odyssey Extraction  => Captain games",
			"참고" => null
		],
		[
			"id" => 1070,
			"map" => "충돌 사이트",
			"description" => "오디세이 추출  => 맹공격 게임",
			"참고" => null
		],
		[
			"id" => 1090,
			"map" => "수렴",
			"description" => "Teamfight Tactics games",
			"참고" => null
		],
		[
			"id" => 1100,
			"map" => "수렴",
			"description" => "랭크 팀전 전술 게임",
			"참고" => null
		],
		[
			"id" => 1110,
			"map" => "수렴",
			"description" => "Teamfight Tactics Tutorial games",
			"참고" => null
		],
		[
			"id" => 1111,
			"map" => "수렴",
			"description" => "Teamfight Tactics 테스트 게임",
			"참고" => null
		],
		[
			"id" => 1200,
			"map" => "Nexus Blitz",
			"description" => "Nexus Blitz 게임",
			"notes" => "패치 9.2에서 사용되지 않음"
		],
		[
			"id" => 1300,
			"map" => "Nexus Blitz",
			"description" => "Nexus Blitz 게임",
			"참고" => null
		],
		[
			"id" => 2000,
			"map" => "소환사의 협곡",
			"description" => "튜토리얼 1",
			"참고" => null
		],
		[
			"id" => 2010,
			"map" => "소환사의 협곡",
			"description" => "튜토리얼 2",
			"참고" => null
		],
		[
			"id" => 2020,
			"map" => "소환사의 협곡",
			"description" => "튜토리얼 3",
			"참고" => null
		]
	];
}

/**
 * 설정 데이터를 가져옴
 * @param string $type 설정이름
 * @param int $id 값id
 * @return mixed|string
 */
function get_property($type = '', $id = 0 ) {
	$list = [];

	if ($type == 'game_mode') {
		$list = get_game_mode();
	} elseif ($type == 'seasons') {
		$list = get_seasons();
	} elseif ($type == 'map') {
		$list = get_map();
	} elseif ($type == 'game_type') {
		$list = get_game_type();
	} elseif ($type == 'queues') {
		$list = get_queues();
	}

	foreach($list as $item) {
		if ($item['id'] == $id) {
			if ($type == 'game_mode') {
				return $item['description'];
			} elseif ($type == 'seasons') {
				return $item['name'];
			} elseif ($type == 'map') {
				return $item['mapName'];
			} elseif ($type == 'queues') {
				return $item['map'];
			}
		}
	}

	return '';
}


