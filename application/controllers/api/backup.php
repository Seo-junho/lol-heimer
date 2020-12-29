<?php
foreach($matchList->matches as $key=>$value) {
	$apiUrl = $this->base_url . '/match/v4/matches/' . $value->gameId .'?api_key=' . RIOT_API_KEY;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $apiUrl);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0.5);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	$matchInfo = json_decode(curl_exec($ch));
	curl_close($ch);

	$matchDetail[$key]['play_champion'] = getChampionData($value->champion);
	$matchDetail[$key]['timestamp'] = $value->timestamp;
	$matchDetail[$key]['role'] = $value->role;
	$matchDetail[$key]['lane'] = $value->lane;
	$matchDetail[$key]['queue'] = get_property('queues',$value->queue);

	$matchDetail[$key]['game_creation'] = $matchInfo->gameCreation;
	$matchDetail[$key]['game_duration'] = $matchInfo->gameDuration;
	$matchDetail[$key]['game_mode'] = get_property('game_mode', $matchInfo->gameMode);
	$matchDetail[$key]['game_type'] = get_property('game_type', $matchInfo->gameType);
	$matchDetail[$key]['map'] = get_property('map', $matchInfo->mapId);

	$blue_team = [];
	$red_team = [];

	$teams = [];
	foreach ($matchInfo->teams as $team) {
		$teams[$team->teamId] = $team;
	}

	$players = [];
	$my_participant_id = '';

	$match_participants = $matchInfo->participants;

	foreach ($matchInfo->participantIdentities as $player) {
		$players[$player->participantId]['participantId'] = $player->participantId;
		$players[$player->participantId]['summonerName'] = $player->player->summonerName;
		$players[$player->participantId]['currentAccountId'] = $player->player->currentAccountId;
		if ($players[$player->participantId]['currentAccountId'] == $AccountId) {
			$my_participant_id = $players[$player->participantId]['participantId'];
		}
	}
	foreach ($matchInfo->participants as $k=>$participants) {
		$player_index = $participants->participantId;
		$player_info = $this->getUserTierAndLevel($players[$player_index]['summonerName']);

		// 유저 기본 정보
		$player_name = $players[$player_index]['summonerName'];
		$player_level = $player_info['level'];
		$player_tier = $player_info['tier'];

		// 게임 기본 정보
		$kill = $participants->stats->kills; // 킬 수
		$deaths = $participants->stats->deaths; // 데스
		$assists = $participants->stats->assists; // 어시스트
		$champ_level = $participants->stats->champLevel; // 챔피언 레벨
		$total_minions_killed = $participants->stats->totalMinionsKilled; // 총 처치 미니언 수
		$champion_total_damage = $participants->stats->totalDamageDealtToChampions; // 챔피언 피해량
		$total_damage = $participants->stats->totalDamageDealtToChampions; // 총 피해량
		$vision_score = $participants->stats->visionScore; // 시야 점수

		// 스페셜 킬 여부
		$is_double_kill = $participants->stats->doubleKills > 0;
		$is_triple_kill = $participants->stats->tripleKills > 0;
		$is_quadra_kill = $participants->stats->quadraKills > 0;
		$is_penta_kill = $participants->stats->pentaKills > 0;

		// 스페셜 킬 횟수
		$double_kill_count = $participants->stats->doubleKills;
		$triple_kill_count = $participants->stats->tripleKills;
		$quadra_kill_count = $participants->stats->quadraKills;
		$penta_kill_count = $participants->stats->pentaKills;

		$game_stat = ($teams[$participants->teamId]->win == 'Fail') ? '패배' : '승리';
		$spell_1 = getSpell($participants->spell1Id);
		$spell_2 = getSpell($participants->spell2Id);

		$item0 = getItem($participants->stats->item0);
		$item1 = getItem($participants->stats->item1);
		$item2 = getItem($participants->stats->item2);
		$item3 = getItem($participants->stats->item3);
		$item4 = getItem($participants->stats->item4);
		$item5 = getItem($participants->stats->item5);
		$item6 = getItem($participants->stats->item6);

		if ($player_index < 5){
			$blue_team[$player_index]['game_stat'] = $game_stat;
			$blue_team[$player_index]['player_info']['player_name'] = $player_name;
			$blue_team[$player_index]['player_info']['player_level'] = $player_level;
			$blue_team[$player_index]['player_info']['player_tier'] = $player_tier;

			$blue_team[$player_index]['game_info']['kills'] = $kill;
			$blue_team[$player_index]['game_info']['deaths'] = $deaths;
			$blue_team[$player_index]['game_info']['assists'] = $assists;
			$blue_team[$player_index]['game_info']['champ_level'] = $champ_level;
			$blue_team[$player_index]['game_info']['total_minions_killed'] = $total_minions_killed;
			$blue_team[$player_index]['game_info']['champion_total_damage'] = $champion_total_damage;
			$blue_team[$player_index]['game_info']['total_damage'] = $total_damage;
			$blue_team[$player_index]['game_info']['vision_score'] = $vision_score;

			$blue_team[$player_index]['kill_info']['is_double_kill'] = $is_double_kill;
			$blue_team[$player_index]['kill_info']['is_triple_kill'] = $is_triple_kill;
			$blue_team[$player_index]['kill_info']['is_quadra_kill'] = $is_quadra_kill;
			$blue_team[$player_index]['kill_info']['is_penta_kill'] = $is_penta_kill;

			$blue_team[$player_index]['kill_info']['double_kill_count'] = $double_kill_count;
			$blue_team[$player_index]['kill_info']['triple_kill_count'] = $triple_kill_count;
			$blue_team[$player_index]['kill_info']['quadra_kill_count'] = $quadra_kill_count;
			$blue_team[$player_index]['kill_info']['penta_kill_count'] = $penta_kill_count;

			$blue_team[$player_index]['spell_info']['spell_1'] = $spell_1;
			$blue_team[$player_index]['spell_info']['spell_2'] = $spell_2;

			$blue_team[$player_index]['item'][0] = $item0;
			$blue_team[$player_index]['item'][1] = $item1;
			$blue_team[$player_index]['item'][2] = $item2;
			$blue_team[$player_index]['item'][3] = $item3;
			$blue_team[$player_index]['item'][4] = $item4;
			$blue_team[$player_index]['item'][5] = $item5;
			$blue_team[$player_index]['item'][6] = $item6;
		} else {
			$red_team[$player_index]['game_stat'] = $game_stat;
			$red_team[$player_index]['player_info']['player_name'] = $player_name;
			$red_team[$player_index]['player_info']['player_level'] = $player_level;
			$red_team[$player_index]['player_info']['player_tier'] = $player_tier;

			$red_team[$player_index]['game_info']['kills'] = $kill;
			$red_team[$player_index]['game_info']['deaths'] = $deaths;
			$red_team[$player_index]['game_info']['assists'] = $assists;
			$red_team[$player_index]['game_info']['champ_level'] = $champ_level;
			$red_team[$player_index]['game_info']['total_minions_killed'] = $total_minions_killed;
			$red_team[$player_index]['game_info']['champion_total_damage'] = $champion_total_damage;
			$red_team[$player_index]['game_info']['total_damage'] = $total_damage;
			$red_team[$player_index]['game_info']['vision_score'] = $vision_score;

			$red_team[$player_index]['kill_info']['is_double_kill'] = $is_double_kill;
			$red_team[$player_index]['kill_info']['is_triple_kill'] = $is_triple_kill;
			$red_team[$player_index]['kill_info']['is_quadra_kill'] = $is_quadra_kill;
			$red_team[$player_index]['kill_info']['is_penta_kill'] = $is_penta_kill;

			$red_team[$player_index]['kill_info']['double_kill_count'] = $double_kill_count;
			$red_team[$player_index]['kill_info']['triple_kill_count'] = $triple_kill_count;
			$red_team[$player_index]['kill_info']['quadra_kill_count'] = $quadra_kill_count;
			$red_team[$player_index]['kill_info']['penta_kill_count'] = $penta_kill_count;

			$red_team[$player_index]['spell_info']['spell_1'] = $spell_1;
			$red_team[$player_index]['spell_info']['spell_2'] = $spell_2;

			$red_team[$player_index]['item'][0] = $item0;
			$red_team[$player_index]['item'][1] = $item1;
			$red_team[$player_index]['item'][2] = $item2;
			$red_team[$player_index]['item'][3] = $item3;
			$red_team[$player_index]['item'][4] = $item4;
			$red_team[$player_index]['item'][5] = $item5;
			$red_team[$player_index]['item'][6] = $item6;
		}
		// 내 데이터 넣기
		if ($players[$player_index]['currentAccountId'] == $AccountId) {
			$matchDetail[$key]['player_name'] = $player_name;
			$matchDetail[$key]['player_level'] = $player_level;
			$matchDetail[$key]['player_tier'] = $player_tier;

			$matchDetail[$key]['kills'] = $kill;
			$matchDetail[$key]['deaths'] = $deaths;
			$matchDetail[$key]['assists'] = $assists;
			$matchDetail[$key]['champ_level'] = $champ_level;
			$matchDetail[$key]['total_minions_killed'] = $total_minions_killed;
			$matchDetail[$key]['champion_total_damage'] = $champion_total_damage;
			$matchDetail[$key]['total_damage'] = $total_damage;
			$matchDetail[$key]['vision_score'] = $vision_score;

			$matchDetail[$key]['is_double_kill'] = $is_double_kill;
			$matchDetail[$key]['is_triple_kill'] = $is_triple_kill;
			$matchDetail[$key]['is_quadra_kill'] = $is_quadra_kill;
			$matchDetail[$key]['is_penta_kill'] = $is_penta_kill;

			$matchDetail[$key]['double_kill_count'] = $double_kill_count;
			$matchDetail[$key]['triple_kill_count'] = $triple_kill_count;
			$matchDetail[$key]['quadra_kill_count'] = $quadra_kill_count;
			$matchDetail[$key]['penta_kill_count'] = $penta_kill_count;

			$matchDetail[$key]['game_stat'] = $game_stat;
			$matchDetail[$key]['spell_1'] = $spell_1;
			$matchDetail[$key]['spell_2'] = $spell_2;

			$matchDetail[$key]['item'][0] = $item0;
			$matchDetail[$key]['item'][1] = $item1;
			$matchDetail[$key]['item'][2] = $item2;
			$matchDetail[$key]['item'][3] = $item3;
			$matchDetail[$key]['item'][4] = $item4;
			$matchDetail[$key]['item'][5] = $item5;
			$matchDetail[$key]['item'][6] = $item6;
		}
	}
	//			array_values($blue_team);
	//			array_values($red_team);
	//			$matchDetail[$key]['blue_team'] = $blue_team;
	//			$matchDetail[$key]['red_team'] = $red_team;
}
