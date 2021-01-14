export interface LeagueCardProps {
	type: string;
	leagueInfo: {
		leagueId: string;
		queueType: string; // 솔로 | 팀랭
		tier: string;
		rank: string;
		summonerId: string;
		summonerName: string;
		leaguePoints: number;
		wins: number;
		losses: number;
		veteran: boolean;
		inactive: boolean;
		freshBlood: boolean;
		hotStreak: boolean;
		tier_img: string;
	};
}
