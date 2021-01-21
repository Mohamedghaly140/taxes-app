import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import httpClient from '../../api/httpClient';
import SpinnerContainer from '../../components/Spinner/SpinnerContainer';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';

import { AuthContext } from '../../context/auth-context';

const FinancierDetails = () => {
	const authContext = useContext(AuthContext);
	const { token } = authContext;

	const { id } = useParams();

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
				<h2 className="my-3 mb-4">تفاصيل الممول</h2>
				<div className="card p-1 my-2 bg-gray">
					<h4>الأســم : {financier.name}</h4>
					<p>البريد الاليكتروني : {financier.email}</p>
					<p>رقم التسجيل الضريبي : {financier.TaxRegistrationNum}</p>
					<p>الرقم القومي : {financier.nationalID}</p>
					<p>اسم المستخدم : {financier.userName}</p>
					<p>كلمه المرور : {financier.password}</p>
					<p>رقـــم الملف : {financier.fileNum}</p>
					<p>
						مسجل علي بوابة الضريبية الاليكترونية :{' '}
						{financier.registered ? (
							<IoCheckmarkDoneCircle size="1.5em" color="green" />
						) : (
							<AiFillCloseCircle size="1.5em" color="red" />
						)}
					</p>
				</div>
			</Container>
		</div>
	);
};

export default FinancierDetails;
