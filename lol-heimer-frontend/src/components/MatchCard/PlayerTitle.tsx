import React from 'react';
import { PlayerTitleProps } from '@dtos/MatchCard/PlayerTitle.dto';

const PlayerTitle: React.FC<PlayerTitleProps> = ({
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
