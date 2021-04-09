import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const register = newUser => {
    let registerUrl = consts.REGISTER_ROUTE;
	return axios
		.post(registerUrl, newUser)
}

export const login = user => {
    let loginUrl = consts.LOGIN_ROUTE;
	console.log("logging in with: ", user.email, user.password);
	return axios
		.post(loginUrl, user)
}

export const logout = token => {
    let logoutUrl = consts.LOGOUT_ROUTE;
	return axios
		.post(logoutUrl, token)
}
