import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const register = newUser => {
    let registerUrl = consts.BACKEND_ROUTE + consts.REGISTER_ROUTE;
	return axios
		.post(registerUrl, newUser)
		.then(response => {
			// TODO: do something with response
			console.log("Register result:", response);
		})
}

export const login = user => {
    let loginUrl = consts.BACKEND_ROUTE + consts.LOGIN_ROUTE;
	console.log("logging in with: ", user.email, user.password);
	return axios
		.post(loginUrl, user)
		.then(response => {
			// TODO: do something with response
			console.log("Login result:", response);
		})
		.catch(err => {
            // TODO: do something with error
			console.log("Login err:", err);
		})
}

