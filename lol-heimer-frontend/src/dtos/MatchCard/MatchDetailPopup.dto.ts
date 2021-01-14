export interface MatchDetailPopupProps {
	gameId: number;
	setIsPopup: (state: boolean) => void;
	queue: string;
}

interface MatchDetailPopupPlayChampionDTO {
	id: string;
	key: string;
	name: string;
	title: string;
	image: string;
};

interface MatchDetailPopupSpellDTO {
	name: string;
	icon_img: string;
}

export interface MatchDetailPopupItemDTO {
	name: string;
	icon_img: string;
	plain_text: string;
	item_price: number;
}

export interface MatchDetailPopupTeamDTO {
	player_name: string;
	player_level: number;
	player_tier: string;
	play_champion: MatchDetailPopupPlayChampionDTO;
	kills: number;
	deaths: number;
	assists: number;
	champ_level: number;
	total_minions_killed: number;
	champion_total_damage: number;
	total_damage: number;
	vision_score: number;
	is_double_kill: boolean;
	is_triple_kill: boolean;
	is_quadra_kill: boolean;
	is_penta_kill: boolean;
	double_kill_count: number;
	triple_kill_count: number;
	quadra_kill_count: number;
	penta_kill_count: number;
	game_stat: string;
	spell_1: MatchDetailPopupSpellDTO;
	spell_2: MatchDetailPopupSpellDTO;
	item: MatchDetailPopupItemDTO[];
}
