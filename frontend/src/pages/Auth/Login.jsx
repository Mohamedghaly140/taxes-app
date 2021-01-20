import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';

import { AuthContext } from '../../context/auth-context';
import httpClient from '../../api/httpClient';

const Login = () => {
	const authContext = useContext(AuthContext);
	const { login } = authContext;

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const inputChangeHandler = event => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const onSubmitHandler = event => {
		event.preventDefault();

		console.log('user login', user);

		httpClient
			.post('api/auth/login', user)
			.then(res => {
				console.log(res.data);
				const userData = res.data;
				const { userId, token, name } = userData;
				login(userId, token, name);
			})
			.catch(err => {
				console.log(err.response.data.message);
			});
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center pt-5">
			<h2 className="mb-5">تسجيل الدخول</h2>
			<Form
				className="w-100"
				style={{ maxWidth: '450px' }}
				onSubmit={onSubmitHandler}
			>
				<Form.Group>
					<Form.Label htmlFor="email">البريد الاليكتروني</Form.Label>
					<Form.Control
						id="email"
						type="email"
						name="email"
						placeholder="ادخل البريد الاليكتروني"
						value={email}
						onChange={inputChangeHandler}
					/>
					{/* <Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text> */}
				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="password">كلمه المرور</Form.Label>
					<Form.Control
						id="password"
						type="password"
						name="password"
						placeholder="ادخل كلمه المرور"
						value={password}
						onChange={inputChangeHandler}
					/>
				</Form.Group>
				{/* <Form.Group controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group> */}
				<Button variant="primary" type="submit">
					تسجيل الدخول
				</Button>
			</Form>
		</div>
	);
};

export default Login;
