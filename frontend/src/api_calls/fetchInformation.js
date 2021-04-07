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

export const userInfo = () => {
    let userInfoUrl = consts.BACKEND_ROUTE + consts.USER_INFO;
    return axios
        .post(userInfoUrl, { "token": localStorage.getItem("token") })
}

export const fetchUserProjects = () => {
	let fetchProjectUrl = consts.BACKEND_ROUTE + consts.USER_PROJECTS;
	return axios
		.post(fetchProjectUrl, { "token": localStorage.getItem("token") })
}

export const fetchUserHardware = () => {
	let fetchHardwareURL = consts.BACKEND_ROUTE + consts.USER_HARDWARE;
	return axios
		.post(fetchHardwareURL, { "token": localStorage.getItem("token") })
}

export const fetchProjectInfo = (projectId) => {
	let fetchProjectURL = consts.BACKEND_ROUTE + consts.FETCH_PROJECT_INFO;
	return axios
		.post(fetchProjectURL, {"project_id": projectId})
}