import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const fetchHW = () => {
    let fetchHWUrl = consts.BACKEND_ROUTE + consts.FETCH_HARDWARE_ROUTE;
	return axios
		.get(fetchHWUrl)
		.then(response => {
			return response.data
		})
}