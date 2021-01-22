import ButtonLoading from '@components/Button/ButtonLoading';
import ErrorSpan from '@components/Error/ErrorSpan';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { API_MEMBER_SIGNUP_MEMBER, API_MEMBER_LOGIN_MEMBER } from './../../end-point/index';

interface LoginFormProps {
	setLoginInfo: Function;
};

const LoginForm: React.FC<LoginFormProps> = ({
	setLoginInfo,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSignup, setIsSignup] = useState<boolean>(false);
	const {
		errors,
		register,
		getValues,
		handleSubmit,
		formState,
	} = useForm<any>({
		mode: 'onChange',
	});

	const onSubmit = async (): Promise<void> => {
		if (isLoading) {
			return;
		}
		setIsLoading(true);
		const getValue = getValues();
		const formData = new FormData();
		try {
			if (isSignup) {
				// 회원가입
				const { id, password, password2, name } = getValue;
				if (password !== password2) {
					// Error
					return;
				}

				formData.append('id', id);
				formData.append('password', password);
				formData.append('name', name);

				const { data: {
					status,
					message,
				} } = await axios.post(`${API_MEMBER_SIGNUP_MEMBER}`, formData);

				alert(message);
				if (status === 200) {
					setIsSignup(false);
				}
			} else {
				// 로그인
				const { id, password } = getValue;
				formData.append('id', id);
				formData.append('password', password);
				const { data: {
					id: userId,
					status,
					message,
				} } = await axios.post(`${API_MEMBER_LOGIN_MEMBER}`, formData);

				if (status === 200) {
					await setLoginInfo({
						userId
					});
					// history.push('/');
				} else {
					alert(message);
				}
			}
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
		}
	}

	return (
		<form
			className="flex flex-col w-11/12 md:w-1/3 rounded-xl shadow-lg py-10 px-5 bg-white m-5"
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				className="p-3 mb-2 outline-none border border-gray-300 border-solid rounded-xl"
				ref={register({
					required: '아이디를 입력해주세요'
				})}
				type="text"
				name="id"
				placeholder="ID"
				required
			/>
			{ errors.id?.message && (
				<ErrorSpan>{ errors.id?.message }</ErrorSpan>
			)}
			<input
				className="p-3 mb-2 outline-none border border-gray-300 border-solid rounded-xl"
				ref={register({
					required: '비밀번호를 입력해주세요.',
					minLength: 8,
				})}
				type="password"
				name="password"
				placeholder="비밀번호"
				required
			/>
			{ errors.password?.type === 'minLength' && (
				<ErrorSpan>비밀번호는 최소 8자 이상이어야 합니다.</ErrorSpan>
			)}
			{ errors.password?.message && (
				<ErrorSpan>{ errors.password?.message }</ErrorSpan>
			)}
			{ isSignup && (
				<>
					<input
						className="p-3 mb-2 outline-none border border-gray-300 border-solid rounded-xl"
						ref={register({
							required: '비밀번호 재입력을 입력해주세요.',
							minLength: 8,
							validate: value => value === getValues().password
						})}
						type="password"
						name="password2"
						placeholder="비밀번호 재입력"
						required
					/>
					{ errors.password2?.type === 'minLength' && (
						<ErrorSpan>비밀번호는 최소 8자 이상이어야 합니다.</ErrorSpan>
					)}
					{ errors.password2?.type === 'validate' && (
						<ErrorSpan>비밀번호가 일치하지 않습니다.</ErrorSpan>
					)}
					{ errors.password2?.message && (
						<ErrorSpan>{ errors.password2?.message }</ErrorSpan>
					)}
					<input
						className="p-3 mb-2 outline-none border border-gray-300 border-solid rounded-xl"
						ref={register({
							required: '이름을 입력해주세요.',
							minLength: 2,
						})}
						type="text"
						name="name"
						placeholder="이름"
						required
					/>
					{ errors.name?.type === 'minLength' && (
						<ErrorSpan>이름은 최소 2자 이상이어야 합니다.</ErrorSpan>
					)}
					{ errors.name?.message && (
						<ErrorSpan>{ errors.name?.message }</ErrorSpan>
					)}
				</>
			) }
			<ButtonLoading
				type="submit"
				className="btn-normal text-xl rounded-xl h-12 mb-5"
				loading={isLoading}
				canClick={formState.isValid}
			>
				{ isSignup ? (
					<>회원가입</>
				) : (
					<>로그인</>
				) }
			</ButtonLoading>
			<div className="flex flex-row items-center justify-evenly">
				<button
					className="link-box text-orange-600 out"
					onClick={() => { setIsSignup(current => !current)}}
					type="button"
				>
					{ isSignup ? (
						<>로그인 하러가기</>
					) : (
						<>회원가입 하러가기</>
					) }
				</button>
				<button
					className="link-box text-orange-600"
					type="button"
				>
					<Link to="/">
						홈으로 가기
					</Link>
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
