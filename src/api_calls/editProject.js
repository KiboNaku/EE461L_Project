import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const joinProject = (token, project) => {
	let joinProjectUrl = consts.JOIN_PROJECT;
	return axios
		.post(joinProjectUrl, { "token": token, "project": project })
		.then(response => {
			return response.data
		})
}

export const addProject = (project) => {
	return axios
		.post(consts.ADD_PROJECT, { "token": localStorage.getItem("token"), "project": project })
		.then(response => {
			return response.data
		})
}