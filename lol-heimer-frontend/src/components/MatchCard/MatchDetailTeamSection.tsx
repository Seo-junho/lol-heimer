import React from 'react';
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
	const bgStyle = team === 'blue' ? 'bg-blue-100' : 'bg-red-100';

	return (
		<div className={`flex justify-center flex-col ${bgStyle} p-2 md:p-7`}>
			<div className="hidden md:flex justify-start flex-row items-center my-1">
				<div className="w-60 mr-0.5">
					<span className={`font-bold ${isWin(data[0].game_stat) ? 'text-blue-600' : 'text-red-600'}`}>
						{ data[0].game_stat }
					</span>&nbsp;({ team === 'blue' ? '블루' : '레드' }팀)
				</div>
				<div className="md: w-20 text-center">티어</div>
				<div className="w-24 text-center">KDA</div>
				<div className="w-14 text-center">CS</div>
				<div className="w-28 text-center ml-2.5">피해량</div>
				<div className="w-48 text-center">아이템</div>
			</div>
			{ data.map((data: any, index: number) => <MatchDetailUser key={index} user={data} maxDamage={maxDamage} />) }
		</div>
	)
}

export default MatchDetailTeamSection;
