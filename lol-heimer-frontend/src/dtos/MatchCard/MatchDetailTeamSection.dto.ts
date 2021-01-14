import { MatchDetailPopupTeamDTO } from "./MatchDetailPopup.dto";

export interface MatchDetailTeamSectionProps {
	team: string;
	data: MatchDetailPopupTeamDTO[];
	maxDamage: number;
}
