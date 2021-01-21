import { useState, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { AuthContext } from '../../context/auth-context';
import httpClient from '../../api/httpClient';
import SpinnerContainer from '../../components/Spinner/SpinnerContainer';

const SignUp = () => {
	const authContext = useContext(AuthContext);
	const { login } = authContext;

	const history = useHistory();

	const [loading, setLodaing] = useState(false);
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = user;

	const inputChangeHandler = event => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const onSubmitHandler = useCallback(
		event => {
			event.preventDefault();

			setLodaing(true);

			httpClient
				.post('/api/auth/signup', user)
				.then(res => {
					// console.log(res.data);
					const userData = res.data;
					const { userId, token, name } = userData;
					login(userId, token, name);
					setLodaing(false);
					history.replace('/');
				})
				.catch(err => {
					console.log(err.response.data.message);
					setLodaing(false);
				});
		},
		[user, history, login]
	);

	return (
		<div className="d-flex flex-column justify-content-center align-items-center pt-5">
			<h2 className="mb-5">مستخدم جديد</h2>
			<Form
				className="w-100"
				style={{ maxWidth: '450px' }}
				onSubmit={onSubmitHandler}
			>
				<Form.Group>
					<Form.Label htmlFor="name">اسم المستخدم</Form.Label>
					<Form.Control
						id="name"
						name="name"
						type="text"
						placeholder="ادخل اسم المستخدم"
						value={name}
						onChange={inputChangeHandler}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label htmlFor="email">البريد الاليكتروني</Form.Label>
					<Form.Control
						id="email"
						name="email"
						type="email"
						placeholder="ادخل البريد الاليكتروني"
						value={email}
						onChange={inputChangeHandler}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label htmlFor="password">كلمه المرور</Form.Label>
					<Form.Control
						id="password"
						name="password"
						type="password"
						placeholder="ادخل كلمه المرور"
						value={password}
						onChange={inputChangeHandler}
					/>
				</Form.Group>

				{loading ? (
					<SpinnerContainer />
				) : (
					<Button variant="primary" type="submit" block>
						تسجيل الدخول
					</Button>
				)}
			</Form>
		</div>
	);
};

export default SignUp;
