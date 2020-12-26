import React from 'react';

interface IProps {
	championId: number;
	summonerName: string;
}

const PlayerTitle: React.FC<IProps> = ({
	championId,
	summonerName,
}) => {
	return (
		<div>
			<span>{ championId }</span>
			<span>{ summonerName }</span>
		</div>
	)
};

export default PlayerTitle;
