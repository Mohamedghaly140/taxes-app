import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';

import { AuthContext } from '../context/auth-context';

const SignUp = () => {
	const auth = useContext(AuthContext);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = user;

	const inputChangeHandler = event => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const onSubmitHandler = event => {
		event.preventDefault();

		console.log('user login', user);

		// auth.login();
	};

	return (
		<div className="d-flex justify-content-center align-items-center pt-5 mt-5">
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
				<Button variant="primary" type="submit">
					تسجيل الدخول
				</Button>
			</Form>
		</div>
	);
};

export default SignUp;
