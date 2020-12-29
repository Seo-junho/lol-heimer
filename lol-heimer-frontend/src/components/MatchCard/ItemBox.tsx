import React from 'react';


interface IItemProps {
	item: any;
}

interface IProps {
	items: any;
	className: string;
}

const Item: React.FC<IItemProps> = ({
	item,
}) => {
	const isItem = item.name ? true : false;
	return (
		<div
			className={`rounded-md m-0.5 bg-cover bg-no-repeat bg-gray-500 ${!isItem && ' opacity-30'}`}
			style={{
				width: '40px',
				height: '40px',
				backgroundImage: `url(${item.icon_img})`,
			}}
		/>
	);
}

const ItemBox: React.FC<IProps> = ({
	items,
	className,
}) => {
	return (
		<div className={`${className} flex flex-col`}>
			<div className="flex flex-row">
				<Item item={items[0]} />
				<Item item={items[1]} />
				<Item item={items[2]} />
			</div>
			<div className="flex flex-row">
				<Item item={items[3]} />
				<Item item={items[4]} />
				<Item item={items[5]} />
			</div>
		</div>
	);
}

export default ItemBox;
