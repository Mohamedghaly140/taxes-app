import { Spinner } from 'react-bootstrap';

const SpinnerContainer = () => {
	return (
		<div className="d-flex justify-content-center align-items-center">
			<Spinner animation="border" variant="primary" />
		</div>
	);
};

export default SpinnerContainer;
