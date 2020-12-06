import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

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
		<Form onSubmit={searchSubmit}>
			<Form.Row className="align-items-center">
				<Col className="my-1">
					<Form.Label htmlFor="inlineFormInputName" srOnly>
						Name
					</Form.Label>
					<Form.Control
						id="inlineFormInputName"
						name="name"
						placeholder="소환사 명"
						onChange={onChange}
					/>
				</Col>
				<Col xs="auto" className="my-1">
					<Button type="submit">검색</Button>
				</Col>
			</Form.Row>
		</Form>
	)
}

export default MainSearchBox;
