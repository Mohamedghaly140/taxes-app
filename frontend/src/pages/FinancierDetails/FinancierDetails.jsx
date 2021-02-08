import { useState, useEffect, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useParams, useHistory, Link } from 'react-router-dom';
import httpClient from '../../api/httpClient';
import SpinnerContainer from '../../components/Spinner/SpinnerContainer';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';

import { AuthContext } from '../../context/auth-context';

const FinancierDetails = () => {
	const authContext = useContext(AuthContext);
	const { token } = authContext;

	const { id } = useParams();
	const history = useHistory();

	const [loading, setLoading] = useState(false);
	const [financier, setFinancier] = useState(null);

	useEffect(() => {
		httpClient
			.get(`/api/financier/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res.data);
				setFinancier(res.data.financier);
				setLoading(false);
			})
			.catch(err => {
				console.log(err.response.data.message);
				setLoading(false);
			});
	}, [id, token]);

	const financierDeleteHandler = id => {
		httpClient
			.delete(`/api/financier/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res.data);
				setLoading(false);
				history.push('/');
			})
			.catch(err => {
				console.log(err.response.data.message);
				setLoading(false);
			});
	};

	if (loading || !financier) {
		return (
			<div className="vh-100 d-flex justify-content-center align-items-center">
				<SpinnerContainer />
			</div>
		);
	}

	return (
		<div className="py-3">
			<Container>
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h2 className="m-0">تفاصيل الممول</h2>
					<Link
						className="btn btn-success"
						to={`/edit-financier/${financier.id}?editMode=true`}
					>
						تعديل بيانات الممول
					</Link>
					<button
						className="btn btn-danger"
						onClick={() => financierDeleteHandler(financier.id)}
					>
						حذف الممول من قاعده البيانات
					</button>
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
