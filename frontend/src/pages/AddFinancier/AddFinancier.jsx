import { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import httpClient from '../../api/httpClient';
import Spinner from '../../components/Spinner/SpinnerContainer';
import { AuthContext } from '../../context/auth-context';

const AddFinancier = () => {
	const authContext = useContext(AuthContext);
	const { token, userId } = authContext;

	const [loading, setLoading] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [financier, setFinancier] = useState({
		name: '',
		email: '',
		fileNum: '',
		password: '',
		nationalID: '',
		TaxRegistrationNum: '',
	});

	const {
		name,
		email,
		password,
		fileNum,
		nationalID,
		TaxRegistrationNum,
	} = financier;

	const inputChangeHandler = event => {
		setFinancier({ ...financier, [event.target.name]: event.target.value });
	};

	const data = {
		...financier,
		nationalID: +nationalID,
		registered,
		creator: userId,
	};

	const onSubmitHandler = event => {
		event.preventDefault();

		console.log(data);

		setLoading(true);

		httpClient
			.post('/api/financier', data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res.data);
				setLoading(false);
			})
			.catch(err => {
				console.log(err.response.data.message);
				setLoading(false);
			});
	};

	return (
		<div>
			<div className="py-2 my-2 mb-4 text-center">
				<h2>اضافة ممول جديد</h2>
			</div>
			<Container>
				<Form onSubmit={onSubmitHandler}>
					<div className="d-flex justify-content-between align-items-center">
						<Form.Group className="w-100 mr-2">
							<Form.Label htmlFor="name">اسم الممول</Form.Label>
							<Form.Control
								id="name"
								name="name"
								type="text"
								placeholder="ادخل اسم الممول"
								value={name}
								onChange={inputChangeHandler}
							/>
						</Form.Group>

						<Form.Group className="w-100 ml-2">
							<Form.Label htmlFor="nationalID">الرقــم القومي </Form.Label>
							<Form.Control
								id="nationalID"
								name="nationalID"
								type="number"
								placeholder="ادخل الرقم القومي"
								value={nationalID}
								onChange={inputChangeHandler}
							/>
						</Form.Group>
					</div>

					<div className="d-flex justify-content-between align-items-center my-3">
						<Form.Group className="w-100 mr-2">
							<Form.Label htmlFor="fileNum">رقــم الملف</Form.Label>
							<Form.Control
								id="fileNum"
								name="fileNum"
								type="text"
								placeholder="ادخل رقـم الملف"
								value={fileNum}
								onChange={inputChangeHandler}
							/>
						</Form.Group>

						<Form.Group className="w-100 ml-2">
							<Form.Label htmlFor="TaxRegistrationNum">
								رقــم التسجيل الضريبي
							</Form.Label>
							<Form.Control
								id="TaxRegistrationNum"
								name="TaxRegistrationNum"
								type="text"
								placeholder="ادخل رقم التسجيل الضريبي"
								value={TaxRegistrationNum}
								onChange={inputChangeHandler}
							/>
						</Form.Group>
					</div>

					<div className="d-flex justify-content-between align-items-center my-3">
						<Form.Group className="w-100 mr-2">
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

						<Form.Group className="w-100 ml-2">
							<Form.Label htmlFor="password">كلمه المرور</Form.Label>
							<Form.Control
								id="password"
								name="password"
								type="text"
								placeholder="ادخل كلمه المرور"
								value={password}
								onChange={inputChangeHandler}
							/>
						</Form.Group>
					</div>

					<Form.Group>
						<Form.Label htmlFor="registered">
							مسجل علي منظومة البوابة الاليكترونية ؟
						</Form.Label>
						<Form.Check
							id="registered"
							className="ml-4"
							type="checkbox"
							label="نعم"
							checked={registered}
							onChange={e => setRegistered(e.target.checked)}
						/>
					</Form.Group>

					<div className="d-flex justify-content-start align-items-center">
						{!loading ? (
							<Spinner />
						) : (
							<Button variant="primary" type="submit">
								اضـــــافة
							</Button>
						)}
					</div>
				</Form>
			</Container>
		</div>
	);
};

export default AddFinancier;
