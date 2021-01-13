import React from 'react';
import ToolTip from '@components/ToolTip';
import { CDN_URL } from '@end-point/server';
import './ToolTip.scss'
import ImgBox from './ImgBox';

interface IProps {
	item: any;
	size?: string;
	className?: string;
}

const ImgToolTipBox: React.FC<IProps> = ({
	item = { name: '' },
	size = 'md',
	className = '',
}) => {
	const isItem = item.name ? true : false;
	return (
		<>
			<ImgBox
				className={`${className} ${size}-box tooltip-box rounded-md bg-gray-500 ${!isItem && ' opacity-30'}`}
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
