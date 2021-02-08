import { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

import Spinner from '../../components/Spinner/SpinnerContainer';
import httpClient from '../../api/httpClient';
import { AuthContext } from '../../context/auth-context';

const Home = () => {
	const authContext = useContext(AuthContext);
	const { userId, token, isLoggedIn } = authContext;

	const [text, setText] = useState('');
	const [FilterClients, setFilterClients] = useState(null);

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
				setClients(res.data.financiers);
				setLodaing(false);
			})
			.catch(err => {
				console.log(err.response.data.message);
				setLodaing(false);
			});
	}, [token, userId]);

	useEffect(() => {
		if (text !== '' && clients) {
			setFilterClients(
				clients.filter(client => {
					const regex = new RegExp(`${text}`, 'gi');
					return client.name.match(regex) || client.email.match(regex);
				})
			);
		}
		// eslint-disable-next-line
	}, [text]);

	if (!token || !isLoggedIn) {
		return <Redirect to="/login" />;
	}

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
				<div className="py-2 mb-4 d-flex justify-content-center align-items-center">
					<div className="col-6">
						<span className="d-block font-weight-bold text-center mb-2">
							بحــــــــــــــث <BiSearch size="1.5em" />
						</span>
						<div className="d-flex">
							<button
								className="btn btn-danger mr-1"
								onClick={() => setText('')}
							>
								حذف
							</button>
							<input
								className="form-control"
								type="text"
								name="search"
								id="search"
								value={text}
								onChange={e => setText(e.target.value)}
							/>
						</div>
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
								<th>منظومة</th>
								<th>مضافة</th>
							</tr>
						</thead>
						<tbody>
							{text === '' &&
								clients.map((client, i) => (
									<tr key={client.id}>
										<td>
											<Link
												className="w-100 h-100 d-block"
												to={`/financier/${client.id}`}
											>
												{i + 1}
											</Link>
										</td>
										<td>{client.name}</td>
										<td>{client.email}</td>
										<td dir="ltr">{client.userName}</td>
										<td>{client.password}</td>
										<td className="text-center">
											{client.registered ? (
												<IoCheckmarkDoneCircle size="1.5em" color="green" />
											) : (
												<AiFillCloseCircle size="1.5em" color="red" />
											)}
										</td>
										<td className="text-center">
											{client.addValue ? (
												<IoCheckmarkDoneCircle size="1.5em" color="green" />
											) : (
												<AiFillCloseCircle size="1.5em" color="red" />
											)}
										</td>
									</tr>
								))}
							{FilterClients &&
								text !== '' &&
								FilterClients.map((client, i) => (
									<tr key={client.id}>
										<td>
											<Link
												className="w-100 h-100 d-block"
												to={`/financier/${client.id}`}
											>
												{i + 1}
											</Link>
										</td>
										<td>{client.name}</td>
										<td>{client.email}</td>
										<td dir="ltr">{client.userName}</td>
										<td>{client.password}</td>
										<td className="text-center">
											{client.registered ? (
												<IoCheckmarkDoneCircle size="1.5em" color="green" />
											) : (
												<AiFillCloseCircle size="1.5em" color="red" />
											)}
										</td>
										<td className="text-center">
											{client.addValue ? (
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
