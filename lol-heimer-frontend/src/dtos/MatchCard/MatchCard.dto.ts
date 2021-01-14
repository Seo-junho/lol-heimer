interface MatchCardMatchPlayChampionDTO {
	id: string;
	key: string;
	name: string;
	title: string;
	image: string;
};

interface MatchCardMatchSpellDTO {
	name: string;
	icon_img: string;
};

interface MatchCardMatchItemDTO {
	name: string;
	icon_img: string;
	plain_text: string;
	item_price: number;
};

interface MatchCardMatchDTO {
	game_id: number;
	play_champion: MatchCardMatchPlayChampionDTO;
	timestamp: number;
	role: string;
	lane: string;
	queue: string;
	game_creation: number;
	game_duration: number;
	game_type: string;
	player_name: string;
	player_level: string;
	player_tier: string;
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
	spell_1: MatchCardMatchSpellDTO;
	spell_2: MatchCardMatchSpellDTO;
	item: MatchCardMatchItemDTO[];
};

export interface MatchCardProps {
	match: MatchCardMatchDTO;
	username: string;
};
