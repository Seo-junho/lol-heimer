import { MainSearchBoxUserSearchForm } from '@dtos/SearchBox/MainSearchBox.dto';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const MainSearchBox: React.FC = (
): JSX.Element => {
	const history = useHistory();

	const {
    register,
    getValues,
    handleSubmit
  } = useForm<MainSearchBoxUserSearchForm>({
    mode: 'onChange',
	});

	const onSubmit = async (): Promise<void> => {
		try {
			const { username } = getValues();
			history.push(`/home/user/${username}`);
		} catch {
			// TODO: Error handling
		}
	};

	return (
		<section
			className="w-full px-5 xl:px-0 mt-2 max-w-screen-xl mx-auto"
			role="serchBox"
		>
			<form
				className="flex items-center justify-center h-20"
				onSubmit={handleSubmit(onSubmit)}
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
					<button
						className="w-20 p-2 text-white border border-orange-400 bg-orange-400 hover:bg-orange-500 transition-colors rounded-r-sm"
						role="searchButton"
					>
						검색
					</button>
				</div>
			</form>
		</section>
	)
}

export default MainSearchBox;
