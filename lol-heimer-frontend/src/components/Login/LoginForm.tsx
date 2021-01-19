import React from 'react';
import { useForm } from 'react-hook-form';

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
			onSubmit={handleSubmit(onSubmit)}
		>
			ㄴㅇㅁㄻㄴㅇㄹ
		</form>
	);
}

export default LoginForm;
