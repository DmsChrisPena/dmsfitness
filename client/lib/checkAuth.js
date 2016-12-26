import axios from 'axios';

const checkAuth = (nextState, replaceState, callback) => {
	axios.get('/isLoggedIn')
		.then((res) => {
			callback();
		})
		.catch((err) => {
			setTimeout(() => {
				callback();
			}, 1000);
			window.location = '/login';
		});
};

export default checkAuth;