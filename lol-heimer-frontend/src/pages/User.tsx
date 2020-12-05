import React from 'react';
import { useParams } from 'react-router';

interface Params {
	username: string;
}
const User: React.FC = (
): JSX.Element => {
	const { username }: Params = useParams();

	return (
		<>
			{ username }
		</>
	)
}

export default User;
