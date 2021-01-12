import ToolTip from '@components/ToolTip';
import React, { useState } from 'react';
import './ItemBox.scss'
import { CDN_URL } from '@end-point/server';

interface IItemProps {
	item: any;
	size?: string;
	className: string;
}

const Item: React.FC<IItemProps> = ({
	item,
	size,
	className,
}) => {
	const isItem = item.name ? true : false;

	return (
		<>
			<div
				className={`${className} tooltip-box rounded-md bg-cover bg-no-repeat bg-gray-500 ${!isItem && ' opacity-30'}`}
				style={{
					width: size,
					height: size,
					backgroundImage: `${CDN_URL(item.icon_img)}`,
				}}
			>
				{ isItem && (
					<ToolTip>
						툴팁
					</ToolTip>
				)}
			</div>
		</>
	);
}


interface IProps {
	items: any;
	className?: string;
	size?: string;
	type?: string;
}

const ItemBox: React.FC<IProps> = ({
	items,
	className = '',
	size = '40px',
	type = 'double'
}) => {

	return (
		<>
			{ type === 'double' && (
				<div className={`${className} flex flex-col`}>
					<div className="flex flex-row">
						<Item item={items[0]} size={size} className={`m-0.5`} />
						<Item item={items[1]} size={size} className={`m-0.5`} />
						<Item item={items[2]} size={size} className={`m-0.5`} />
						<Item item={items[6]} size={size} className={`m-0.5`} />
					</div>
					<div className="flex flex-row">
						<Item item={items[3]} size={size} className={`m-0.5`} />
						<Item item={items[4]} size={size} className={`m-0.5`} />
						<Item item={items[5]} size={size} className={`m-0.5`} />
					</div>
				</div>
			)}
			{ type === 'flat' && (
				<div className={`${className} flex flex-row`}>
					<Item item={items[0]} size={size} className={`m-0.1`}/>
					<Item item={items[1]} size={size} className={`m-0.1`}/>
					<Item item={items[2]} size={size} className={`m-0.1`}/>
					<Item item={items[3]} size={size} className={`m-0.1`}/>
					<Item item={items[4]} size={size} className={`m-0.1`}/>
					<Item item={items[5]} size={size} className={`m-0.1`}/>
					<Item item={items[6]} size={size} className={`m-0.1`}/>
				</div>
			)}
		</>
	);
}

export default ItemBox;
