import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const fetchProjects = () => {
    let fetchProjectUrl = consts.BACKEND_ROUTE + consts.FETCH_PROJECT_ROUTE;
	return axios
		.get(fetchProjectUrl)
		.then(response => {
			return response.data
		})
}