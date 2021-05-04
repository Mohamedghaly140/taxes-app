import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AiOutlineClear } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';

import { financierActions } from '../../redux';
import Message from '../../components/Message/Message';
import Spinner from '../../components/Spinner/SpinnerContainer';

const Home = () => {
	const [text, setText] = useState('');
	const [FilterClients, setFilterClients] = useState(null);

	const { userInfo } = useSelector(state => state.auth);
	const { loading, financiers, error } = useSelector(
		state => state.getFinanciersList
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo && userInfo.userId && userInfo.token) {
			dispatch(financierActions.getFinancierList());
		}
	}, [userInfo, dispatch]);

	useEffect(() => {
		if (text !== '' && financiers) {
			setFilterClients(
				financiers.filter(client => {
					const regex = new RegExp(`${text}`, 'gi');
					return client.name.match(regex) || client.email.match(regex);
				})
			);
		}
		// eslint-disable-next-line
	}, [text]);

	if (loading && !financiers) {
		return (
			<div className="vh-100 d-flex align-items-center justify-content-center">
				<Spinner />
			</div>
		);
	}

	if (!financiers || !financiers.length) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<div className="text-center" style={{ fontSize: 'large' }}>
					لا يوجد اي ممولين قم بالاضاقه{' '}
					<Link to="/add-financier">اضافة ممول جديد</Link>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Container>
				<h2 className="text-center py-2 my-3">القوائم</h2>
				{error && <Message>{error}</Message>}
				<div className="py-2 mb-4 d-flex justify-content-between align-items-center">
					<div>
						<Link to="/add-financier">
							اضافة ممول جديد <BiAddToQueue size="1.5em" />
						</Link>
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
								className="btn btn-danger mr-1 d-flex"
								onClick={() => setText('')}
							>
								<span className="d-inline-block mr-2">حـذف</span>
								<AiOutlineClear size="1.5em" />
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
								financiers.map((client, i) => (
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
