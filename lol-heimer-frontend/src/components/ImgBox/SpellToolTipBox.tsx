import React from 'react';
import ToolTip from '@components/ToolTip';
import { CDN_URL } from '@end-point/server';
import './ToolTip.scss'
import ImgBox from './ImgBox';
import { SpellToolTipBoxProps } from '@dtos/ImgBox/SpellToolTipBox.dto';

const SpellToolTipBox: React.FC<SpellToolTipBoxProps> = ({
	name = '',
	imgUrl = '',
	size = 'md',
	className = '',
}) => {
	return (
		<>
			<ImgBox
				className={`${className} ${size}-box tooltip-box rounded-md bg-gray-500`}
				imgUrl={`${CDN_URL(imgUrl)}`}
			>
				<ToolTip>
					<div className="flex flex-col p-1">
						<span className="font-bold text-base">{ name }</span>
					</div>
				</ToolTip>
			</ImgBox>
		</>
	);
}

export default SpellToolTipBox;
