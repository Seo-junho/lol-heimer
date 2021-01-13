import React from 'react';
import ImgToolTipBox from '@components/ImgBox/ItemToolTipBox';

interface IProps {
	items: any;
	className?: string;
	size?: string;
	type?: string;
}

const ItemBox: React.FC<IProps> = ({
	items,
	className = '',
	size,
	type = 'double'
}) => {

	return (
		<>
			{ type === 'double' && (
				<div className={`${className} flex flex-col`}>
					<div className="flex flex-row">
						<ImgToolTipBox item={items[0]} size={size} className={`m-0.5`} />
						<ImgToolTipBox item={items[1]} size={size} className={`m-0.5`} />
						<ImgToolTipBox item={items[2]} size={size} className={`m-0.5`} />
						<ImgToolTipBox item={items[6]} size={size} className={`m-0.5`} />
					</div>
					<div className="flex flex-row">
						<ImgToolTipBox item={items[3]} size={size} className={`m-0.5`} />
						<ImgToolTipBox item={items[4]} size={size} className={`m-0.5`} />
						<ImgToolTipBox item={items[5]} size={size} className={`m-0.5`} />
					</div>
				</div>
			)}
			{ type === 'flat' && (
				<div className={`${className} flex flex-row`}>
					<ImgToolTipBox item={items[0]} size={size} className={`m-0.1`}/>
					<ImgToolTipBox item={items[1]} size={size} className={`m-0.1`}/>
					<ImgToolTipBox item={items[2]} size={size} className={`m-0.1`}/>
					<ImgToolTipBox item={items[3]} size={size} className={`m-0.1`}/>
					<ImgToolTipBox item={items[4]} size={size} className={`m-0.1`}/>
					<ImgToolTipBox item={items[5]} size={size} className={`m-0.1`}/>
					<ImgToolTipBox item={items[6]} size={size} className={`m-0.1`}/>
				</div>
			)}
		</>
	);
}

export default ItemBox;
