import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../redux';
import Message from '../../components/Message/Message';
import SpinnerContainer from '../../components/Spinner/SpinnerContainer';

const Login = () => {
	const { loading, error } = useSelector(state => state.auth);

	const dispatch = useDispatch();

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

		dispatch(authActions.login(user));
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center pt-5">
			<h2 className="mb-5">تسجيل الدخول</h2>
			{error && <Message>{error}</Message>}
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

				<div className="my-2">
					<p className="mb-0">
						ليس لديك حساب <Link to="sign-up">سجل كمستخدم جديد</Link>
					</p>
				</div>

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

export default Login;
