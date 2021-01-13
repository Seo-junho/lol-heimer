import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

interface Props {
	onSubmit: any;
	nameChange: any;
}

export interface UserSearchType {
	username: string;
	country: string;
}

interface UserSearchForm {
	username: string;
}

const MainSearchBox: React.FC<Props> = (
	{ onSubmit, nameChange }
): JSX.Element => {
	const history = useHistory();
	const {
    register,
    getValues,
    handleSubmit
  } = useForm<UserSearchForm>({
    mode: 'onChange',
	});

	const formSubmit = () => {
		const { username } = getValues();
		history.push(`/home/user/${username}`);
  }

	return (
		<article
			className="w-full px-5 xl:px-0 mt-2 max-w-screen-xl mx-auto"
		>
			<form
				className="flex items-center justify-center h-20"
				onSubmit={handleSubmit(formSubmit)}
			>
				<div className="w-full sm:w-2/5 flex flex-row shadow-md rounded-sm">
					<input
						ref={register}
						type="text"
						name="username"
						placeholder="소환사 명"
						className="w-full px-3 py-1 text-xl focus:outline-none border border-orange-400 rounded-l-sm"
						required
					/>
					<button className="w-20 p-2 text-white border border-orange-400 bg-orange-400 hover:bg-orange-500 transition-colors rounded-r-sm">
						검색
					</button>
				</div>
			</form>
		</article>
	)
}

export default MainSearchBox;
