import { useState, useEffect, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';

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
	}, [token]);

	if (loading || !clients) {
		return (
			<div className="vh-100 d-flex align-items-center justify-content-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-center py-2 my-3">القوائم</h2>
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
							</tr>
						</thead>
						<tbody>
							{clients.map((client, i) => (
								<tr key={client.id}>
									<td>{i + 1}</td>
									<td>{client.name}</td>
									<td>{client.email}</td>
									<td>{client.userName}</td>
									<td>{client.password}</td>
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
