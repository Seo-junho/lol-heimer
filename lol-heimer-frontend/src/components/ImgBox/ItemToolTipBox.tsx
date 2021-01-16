import React from 'react';
import ToolTip from '@components/ToolTip';
import { CDN_URL } from '@end-point/server';
import './ToolTip.scss'
import ImgBox from './ImgBox';
import { ItemToolTipBoxProps } from '@dtos/ImgBox/ItemToolTipBox.dto';

const ImgToolTipBox: React.FC<ItemToolTipBoxProps> = ({
	item = { name: '' },
	size = 'md',
	className = '',
}) => {
	const isItem = item.name ? true : false;
	return (
		<>
			<ImgBox
				className={`${className} box-${size} tooltip-box rounded-md bg-gray-500 ${!isItem && ' opacity-30'}`}
				imgUrl={`${CDN_URL(item.icon_img)}`}
			>
				{ isItem && (
					<ToolTip>
						<div className="flex flex-col p-1">
							<span className="font-bold text-xs">{ item.name }</span>
							{ item.item_price !== 0 && (
								<span className="text-xs">
									가격: <span className="text-yellow-400">{ item.item_price }</span>
								</span>
							) }
						</div>
					</ToolTip>
				)}
			</ImgBox>
		</>
	);
}

export default ImgToolTipBox;
