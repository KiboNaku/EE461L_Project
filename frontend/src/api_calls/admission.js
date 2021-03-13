import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const register = newUser => {
    let registerUrl = consts.BACKEND_ROUTE + consts.REGISTER_ROUTE;
	return axios
		.post(registerUrl, {
			first_name: newUser.first_name,
			last_name: newUser.last_name,
			email: newUser.email,
			password: newUser.password
		})
		.then(response => {
			// TODO: do something with response
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
		})
		.catch(err => {
            // TODO: do something with error
		})
}