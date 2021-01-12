import React from 'react';
import MatchTeamHeader from './MatchDetailTeamHeader';
import MatchDetailUser from './MatchDetailUser';

interface ISectionProps {
	team: string;
	data: any[];
	maxDamage: number;
};

const MatchDetailTeamSection: React.FC<ISectionProps> = ({
	team,
	data,
	maxDamage,
}) => {

	const isWin = (stat: string) => (stat === '승리');
	const bgStyle = team === 'blue' ? 'bg-blue-100 rounded-xl rounded-b-none' : 'bg-red-100';

	return (
		<div className={`flex justify-center flex-col ${bgStyle} p-1 md:p-7`}>
			<MatchTeamHeader
				team={team}
				className={isWin(data[0].game_stat) ? 'text-blue-600' : 'text-red-600'}
				stat={data[0].game_stat}
			/>
			{ data.map((data: any, index: number) => <MatchDetailUser key={index} user={data} maxDamage={maxDamage} />) }
		</div>
	)
}

export default MatchDetailTeamSection;
