import React from 'react';
import Spinner from '@svg/Spinner';

interface ButtonLoadingProps {
	type?: 'button' | 'submit' | 'reset' | undefined;
	className?: string;
	loading: boolean;
	canClick: boolean;
}

const ButtonLoading: React.FC<ButtonLoadingProps> = ({
	children,
	type = 'button',
	className,
	loading,
	canClick,
}) => (
	<button
		type={type}
		className={`${className} ${canClick
			? 'bg-orange-400 hover:bg-orange-300 text-white'
			: 'bg-gray-400 text-white cursor-not-allowed'
		} flex flex-row justify-center items-center`}
	>
		{ loading ?
		<>
			<Spinner className="h-7 w-7 m-2" />
			<span>Loading..</span>
		</> : children}
	</button>
)

export default ButtonLoading;
