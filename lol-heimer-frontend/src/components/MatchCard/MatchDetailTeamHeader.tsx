import React from 'react';

interface IProps {
	team: string;
	className: string;
	stat: string;
};

const MatchTeamHeader: React.FC<IProps> = ({
	team = 'blue',
	className = '',
	stat = '',
}) => {
	return (
		<div className="hidden md:flex justify-start flex-row items-center my-1">
			<div className="w-60 mr-0.5">
				<span className={`font-bold ${className}`}>
					{ stat }
				</span>&nbsp;({ team === 'blue' ? '블루' : '레드' }팀)
			</div>
			<div className="md: w-20 text-center">티어</div>
			<div className="w-24 text-center">KDA</div>
			<div className="w-14 text-center">CS</div>
			<div className="w-28 text-center ml-2.5">피해량</div>
			<div className="w-48 text-center">아이템</div>
		</div>
	);
};

export default MatchTeamHeader;
