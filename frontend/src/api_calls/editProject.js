import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const joinProject = (user, project) => {
	let joinProjectUrl = consts.BACKEND_ROUTE + consts.JOIN_PROJECT;
	return axios
		.post(joinProjectUrl, { "user": user, "project": project })
		.then(response => {
			return response.data
		})
}