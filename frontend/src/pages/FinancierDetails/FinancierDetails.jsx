import { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

import { financierActions } from '../../redux';
import Message from '../../components/Message/Message';
import SpinnerContainer from '../../components/Spinner/SpinnerContainer';

const FinancierDetails = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();

	const { userInfo } = useSelector(state => state.auth);

	const { loading, financier, error } = useSelector(
		state => state.getFinancier
	);
	const {
		loading: loadingError,
		success: deleteSuccess,
		error: deleteError,
	} = useSelector(state => state.deleteFinancier);

	useEffect(() => {
		if (userInfo && userInfo.token) {
			dispatch(financierActions.getFinancierById(id));
		}

		if (deleteSuccess) {
			history.push('/');
		}
	}, [id, userInfo, history, deleteSuccess, dispatch]);

	const financierDeleteHandler = id => {
		dispatch(financierActions.deleteFinancier(id));
	};

	if (loading || !financier) {
		return (
			<div className="vh-100 d-flex justify-content-center align-items-center">
				<SpinnerContainer />
			</div>
		);
	}

	return (
		<div className="py-3 mb-5">
			<Container>
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h2 className="m-0">تفاصيل الممول</h2>
					{error && <Message>{error}</Message>}
					{deleteError && <Message>{deleteError}</Message>}
					<Link
						className="btn btn-success"
						to={`/edit-financier/${financier.id}?editMode=true`}
					>
						تعديل بيانات الممول <FiEdit size="1.5em" />
					</Link>
					{loadingError ? (
						<SpinnerContainer />
					) : (
						<button
							className="btn btn-danger"
							onClick={() => financierDeleteHandler(financier.id)}
						>
							حذف الممول من قاعده البيانات <RiDeleteBin5Fill size="1.5em" />
						</button>
					)}
				</div>
				<Table bordered className="details__table text-center">
					<tbody>
						<tr>
							<td>الأســم</td>
							<td>{financier.name}</td>
						</tr>
						<tr>
							<td>اسم المستخدم</td>
							<td>{financier.userName}</td>
						</tr>
						<tr>
							<td>كلمه المرور</td>
							<td>{financier.password}</td>
						</tr>
						<tr>
							<td>البريد الاليكتروني</td>
							<td>{financier.email}</td>
						</tr>
						<tr>
							<td>رقم التسجيل الضريبي</td>
							<td>{financier.TaxRegistrationNum}</td>
						</tr>
						<tr>
							<td>الرقم القومي</td>
							<td>{financier.nationalID}</td>
						</tr>
						<tr>
							<td>رقـــم الملف</td>
							<td>{financier.fileNum}</td>
						</tr>
						<tr>
							<td>رقـــم التوكيل</td>
							<td>{financier.attorneyNum}</td>
						</tr>
						<tr>
							<td>رقـــم الهاتف</td>
							<td>{financier.phone}</td>
						</tr>
						<tr>
							<td>مسجل علي بوابة الضريبية الاليكترونية</td>
							<td>
								{financier.registered ? (
									<IoCheckmarkDoneCircle size="1.5em" color="green" />
								) : (
									<AiFillCloseCircle size="1.5em" color="red" />
								)}
							</td>
						</tr>
						<tr>
							<td>مسجل قيمــه مضافة</td>
							<td>
								{financier.addValue ? (
									<IoCheckmarkDoneCircle size="1.5em" color="green" />
								) : (
									<AiFillCloseCircle size="1.5em" color="red" />
								)}
							</td>
						</tr>
					</tbody>
				</Table>
			</Container>
		</div>
	);
};

export default FinancierDetails;
