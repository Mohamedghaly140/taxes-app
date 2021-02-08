import axios from 'axios';

// import { AuthContext } from '../context/auth-context';

// const authContext = useContext(AuthContext);

// const { token } = authContext;

// const config = {
// 	headers: {
// 		'Access-Control-Allow-Origin': '*',
// 		'Content-Type': 'application/json',
// 	},
// 	// Authorization: `Bearer ${token}`,
// };

const instance = axios.create({
	baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

// instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
