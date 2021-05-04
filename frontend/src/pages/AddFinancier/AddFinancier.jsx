import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { financierActions } from '../../redux';
import Message from '../../components/Message/Message';
import Spinner from '../../components/Spinner/SpinnerContainer';

const AddFinancier = () => {
	const { id } = useParams();
	const { search } = useLocation();
	const history = useHistory();
	const editMode = search.split('=')[1] === 'true' ? true : false;

	const [registered, setRegistered] = useState(false);
	const [addValue, setAddValue] = useState(false);
	const [financier, setFinancier] = useState({
		name: '',
		phone: '',
		email: '',
		fileNum: '',
		password: '',
		userName: '',
		nationalID: '',
		attorneyNum: '',
		TaxRegistrationNum: '',
	});

	const {
		name,
		email,
		password,
		fileNum,
		nationalID,
		userName,
		phone,
		attorneyNum,
		TaxRegistrationNum,
	} = financier;

	const inputChangeHandler = event => {
		setFinancier({ ...financier, [event.target.name]: event.target.value });
	};

	const { userInfo } = useSelector(state => state.auth);

	const { financier: getFinancier, error: getError } = useSelector(
		state => state.getFinancier
	);

	const {
		loading: addLoading,
		success: addSuccess,
		error: addError,
	} = useSelector(state => state.addFinancier);

	const {
		loading: updateLoading,
		success: updateSuccess,
		error: updateError,
	} = useSelector(state => state.updateFinancier);

	const dispatch = useDispatch();

	const data = {
		...financier,
		nationalID: +nationalID,
		registered,
		addValue,
		creator: userInfo.userId,
	};

	useEffect(() => {
		console.log('edit id', id, editMode);
		if (editMode && id) {
			dispatch(financierActions.getFinancierById(id));
			const {
				name,
				email,
				password,
				fileNum,
				nationalID,
				userName,
				phone,
				attorneyNum,
				TaxRegistrationNum,
				registered,
				addValue,
			} = getFinancier;

			setAddValue(addValue);
			setRegistered(registered);

			setFinancier({
				name,
				phone,
				email,
				fileNum,
				password,
				userName,
				nationalID: nationalID.toString(),
				attorneyNum,
				TaxRegistrationNum,
			});
		}
		// eslint-disable-next-line
	}, [id, editMode, userInfo, dispatch]);

	useEffect(() => {
		if (addSuccess || updateSuccess) {
			history.push('/');
		}
	}, [addSuccess, updateSuccess, history]);

	const onSubmitHandler = event => {
		event.preventDefault();

		if (editMode) {
			dispatch(financierActions.updateFinancier(id, data));
		} else {
			dispatch(financierActions.addFinancier(data));
		}
	};

	return (
		<div>
			<div className="py-2 my-2 mb-4 text-center">
				<h2>{editMode ? 'تعديل بيانات الممول' : 'اضافة ممول جديد'}</h2>
			</div>
			<Container className="text-center px-2">
				{getError && <Message>{getError}</Message>}
				{addError && <Message>{addError}</Message>}
				{updateError && <Message>{updateError}</Message>}
			</Container>
			<Container>
				<Form onSubmit={onSubmitHandler} className="form-card mb-5 mt-3">
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

					<div className="d-flex justify-content-between align-items-center my-3">
						<Form.Group className="w-100 mr-2">
							<Form.Label htmlFor="phone">رقـــم الهاتف</Form.Label>
							<Form.Control
								id="phone"
								name="phone"
								type="number"
								placeholder="ادخل رقم الهاتف"
								value={phone}
								onChange={inputChangeHandler}
							/>
						</Form.Group>

						<Form.Group className="w-100 ml-2">
							<Form.Label htmlFor="attorneyNum">رقــم التوكيل</Form.Label>
							<Form.Control
								id="attorneyNum"
								name="attorneyNum"
								type="text"
								placeholder="ادخل رقــم التوكيل"
								value={attorneyNum}
								onChange={inputChangeHandler}
							/>
						</Form.Group>
					</div>

					<div className="d-flex justify-content-between align-items-center my-3">
						<Form.Group className="col-6 pl-0">
							<Form.Label htmlFor="userName">اسم المستخدم</Form.Label>
							<Form.Control
								id="userName"
								name="userName"
								type="text"
								placeholder="ادخل اسم المستخدم"
								value={userName}
								onChange={inputChangeHandler}
							/>
						</Form.Group>
					</div>

					<div className="d-flex justify-content-between align-items-center my-3">
						<Form.Group>
							<Form.Check
								id="registered"
								className="ml-4"
								type="checkbox"
								label="مسجل علي منظومة البوابة الاليكترونية"
								checked={registered}
								onChange={e => setRegistered(e.target.checked)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Check
								id="addValue"
								className="ml-4"
								type="checkbox"
								label="قيمــه مضافة"
								checked={addValue}
								onChange={e => setAddValue(e.target.checked)}
							/>
						</Form.Group>
					</div>

					<div className="d-flex justify-content-start align-items-center px-3">
						{addLoading || updateLoading ? (
							<Spinner />
						) : (
							<Button variant="primary" type="submit">
								{editMode ? 'تحديــث البيانات' : 'اضـــــافة'}
							</Button>
						)}
					</div>
				</Form>
			</Container>
		</div>
	);
};

export default AddFinancier;
