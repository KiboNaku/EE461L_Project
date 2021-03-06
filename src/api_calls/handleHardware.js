import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const fetchHW = () => {
    let fetchHWUrl =  consts.FETCH_HARDWARE_ROUTE;
	return axios
		.get(fetchHWUrl)
}

export const rentHW = hardware => {
    let rentHWUrl =  consts.RENT_HARDWARE_ROUTE;
	return axios
		.post(rentHWUrl, { hardware : hardware, "token": localStorage.getItem("token") })
}

export const returnHW = hardware => {
    let returnHWUrl =  consts.RETURN_HARDWARE_ROUTE;
	return axios
		.post(returnHWUrl, { hardware : hardware, "token": localStorage.getItem("token") })
}

export const assignHW = (token, records) => {
	let assignHWUrl = consts.ASSIGN_HARDWARE;
	return axios 
		.post(assignHWUrl, { "token": token, "records": records })
		.then(response => {
			return response.data
		})
}

export const unassignHW = (token, records) => {
	let unassignHWUrl = consts.UNASSIGN_HARDWARE;
	return axios 
		.post(unassignHWUrl, { "token": token, "records": records })
		.then(response => {
			return response.data
		})
}
