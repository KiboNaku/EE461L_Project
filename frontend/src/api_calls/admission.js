import axios from 'axios';
import * as consts from '../constants/backendRoutes';

axios.defaults.port = 5000;

export const register = newUser => {
    let registerUrl = consts.BACKEND_ROUTE + consts.REGISTER_ROUTE;
	return axios
		.post(registerUrl, {
			firstName: newUser.first_name,
			lastName: newUser.last_name,
			email: newUser.email,
			password: newUser.password
		})
		.then(response => {
			// TODO: do something with response
			console.log("Register result:", response);
		})
}

export const login = user => {
    let loginUrl = consts.BACKEND_ROUTE + consts.LOGIN_ROUTE;
	return axios
		.post(loginUrl, {
			email: user.email,
			password: user.password,
		})
		.then(response => {
			// TODO: do something with response
			console.log("Login result:", response);
		})
		.catch(err => {
            // TODO: do something with error
			console.log("Login err:", err);
		})
}