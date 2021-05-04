import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../redux';
import Message from '../../components/Message/Message';
import SpinnerContainer from '../../components/Spinner/SpinnerContainer';

const SignUp = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = user;

	const { loading, error } = useSelector(state => state.auth);

	const dispatch = useDispatch();

	const inputChangeHandler = event => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const onSubmitHandler = event => {
		event.preventDefault();

		dispatch(authActions.register(user));
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center pt-5">
			<h2 className="mb-5">مستخدم جديد</h2>
			{error && <Message>{error}</Message>}
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
