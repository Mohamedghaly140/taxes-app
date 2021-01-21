import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';

import Spinner from '../../components/Spinner/SpinnerContainer';
import httpClient from '../../api/httpClient';
import { AuthContext } from '../../context/auth-context';

const Home = () => {
	const authContext = useContext(AuthContext);
	const { userId, token } = authContext;

	const [clients, setClients] = useState(null);
	const [loading, setLodaing] = useState(false);

	useEffect(() => {
		setLodaing(true);

		httpClient
			.get(`/api/financier/user/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res.data);
				setClients(res.data.financiers);
				setLodaing(false);
			})
			.catch(err => {
				console.log(err.response.data.message);
				setLodaing(false);
			});
	}, [token, userId]);

	if (loading || !clients) {
		return (
			<div className="vh-100 d-flex align-items-center justify-content-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div>
			<Container>
				<h2 className="text-center py-2 my-3">القوائم</h2>
				<div className="py-2 mb-4 d-flex justify-content-between align-items-center">
					<div>
						<Link to="/add-financier">اضافة ممول جديد</Link>
					</div>
					<div>
						للذهاب الي البوابة الاليكترونية{' '}
						<a
							href="https://eservice.incometax.gov.eg/etax"
							title="البوابة الألكترونية للخدمات الضريبية"
							rel="noreferrer"
							target="_blank"
						>
							اضغط هنا
						</a>
					</div>
				</div>
			</Container>
			<Container>
				{loading ? (
					<Spinner />
				) : (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>مسلسل</th>
								<th>الأســم</th>
								<th>البريد الاليكتروني</th>
								<th>اسم المستخدم</th>
								<th>كلمه المرور</th>
								<th>مسجل</th>
							</tr>
						</thead>
						<tbody>
							{clients.map((client, i) => (
								<tr key={client.id}>
									<td>
										<Link to={`/financier/${client.id}`}>{i + 1}</Link>
									</td>
									<td>{client.name}</td>
									<td>{client.email}</td>
									<td>{client.userName}</td>
									<td>{client.password}</td>
									<td className="text-center">
										{client.registered ? (
											<IoCheckmarkDoneCircle size="1.5em" color="green" />
										) : (
											<AiFillCloseCircle size="1.5em" color="red" />
										)}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Container>
		</div>
	);
};

export default Home;
