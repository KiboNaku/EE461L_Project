import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const fetchHW = () => {
    let fetchHWUrl = consts.BACKEND_ROUTE + consts.FETCH_HARDWARE_ROUTE;
	return axios
		.get(fetchHWUrl)
}

export const rentHW = hardware => {
    let rentHWUrl = consts.BACKEND_ROUTE + consts.RENT_HARDWARE_ROUTE;
	return axios
		.post(rentHWUrl, { hardware : hardware, "token": localStorage.getItem("token") })
}
