import React from 'react';

interface Props {
	onSubmit: any;
	nameChange: any;
}

export interface UserSearchType {
	username: string;
	country: string;
}

const MainSearchBox: React.FC<Props> = (
	{ onSubmit, nameChange }
): JSX.Element => {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { currentTarget: { value } } = event;
		nameChange(value);
	}

	const searchSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// TODO: 유효성검사
		onSubmit();
	}

	return (
		<form>
			<div>
				Name
			</div>
			<input
				type="text"
				placeholder="소환사 명"
			/>
			<button>
				검색
			</button>
		</form>
	)
}

export default MainSearchBox;
