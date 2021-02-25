import { useState } from 'react';
import { Modal } from 'react-bootstrap';

const ModalView = () => {
	const [show, setShow] = useState(false);

	const closeModalHandler = () => setShow(false);
	const showModalHandler = () => setShow(true);

	return (
		<Modal show={show} onHide={closeModalHandler}>
			<Modal.Header closeButton>
				<Modal.Title>هل انت متأكد من حذف البيانات</Modal.Title>
			</Modal.Header>
			<Modal.Body>سوف يتم حذف بيانات الممول من قاعده البيانات</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModalHandler}>
					لا
				</Button>
				<Button variant="primary" onClick={closeModalHandler}>
					نعــــم
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalView;
