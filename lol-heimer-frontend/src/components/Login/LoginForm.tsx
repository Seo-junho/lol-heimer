import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {

	const {
		register,
		getValues,
		handleSubmit,
	} = useForm<any>({
		mode: 'onChange',
	});

	const onSubmit = async (): Promise<void> => {
		
	}

	return (
		<form
			className="flex flex-col w-11/12 md:w-1/3 rounded-xl shadow-lg py-10 px-5 bg-white m-5"
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				className="p-3 mb-2 outline-none border border-gray-300 border-solid rounded-xl"
				ref={register}
				type="text"
				name="id"
				placeholder="ID"
				required
			/>
			<input
				className="p-3 mb-2 outline-none border border-gray-300 border-solid rounded-xl"
				ref={register}
				type="password"
				name="password"
				placeholder="Password"
				required
			/>
			<button
				className="btn-normal text-xl bg-orange-400 hover:bg-orange-300 text-white rounded-xl h-12 mb-5"
			>
				Login
			</button>
			<div className="flex flex-row items-center justify-evenly">
				<button className="link-box text-orange-600">
					회원가입
				</button>
				<button className="link-box text-orange-600">
					<Link to="/">
						홈으로 가기
					</Link>
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
