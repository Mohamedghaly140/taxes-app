import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CgLogOut } from 'react-icons/cg';

import { authActions } from '../../redux';

const Navigation = () => {
	const { userInfo, isLoggedIn } = useSelector(state => state.auth);

	const dispatch = useDispatch();

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={NavLink} to="/" exact>
					بوابة الاقرارات
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						{isLoggedIn && (
							<Nav.Link as={NavLink} to="/" exact>
								قائمة الممولين
							</Nav.Link>
						)}
						{!isLoggedIn && (
							<Fragment>
								<Nav.Link as={NavLink} to="/login">
									تسجيل الدخول
								</Nav.Link>
								<Nav.Link as={NavLink} to="/sign-up">
									مستخدم جديد
								</Nav.Link>
							</Fragment>
						)}
						{isLoggedIn && (
							<Nav.Link className="active">
								مرحبا {userInfo && userInfo.name}
							</Nav.Link>
						)}
						{isLoggedIn && (
							<Nav.Link
								onClick={() => dispatch(authActions.logout())}
								className="active"
							>
								تسجيل الخروج <CgLogOut color="#fff" />
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
