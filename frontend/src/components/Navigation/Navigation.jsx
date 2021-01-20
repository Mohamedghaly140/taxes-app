import { Container, Navbar, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

const Navigation = () => {
	const auth = useContext(AuthContext);

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={NavLink} to="/" exact>
					بوابة الاقرارات
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link as={NavLink} to="/" exact>
							قائمة الممولين
						</Nav.Link>
						<Nav.Link as={NavLink} to="/login">
							تسجيل الدخول
						</Nav.Link>
						<Nav.Link as={NavLink} to="/sign-up">
							مستخدم جديد
						</Nav.Link>
						<Nav.Link as={NavLink} to="/sign-up">
							تسجيل الخروج
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
