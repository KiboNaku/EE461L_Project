import axios from 'axios';
import * as consts from '../constants/backendRoutes';


export const removeProject = name => {
    let removeUrl =  consts.REMOVE_PROJECT;
	return axios
		.post(removeUrl, { name : name, "token": localStorage.getItem("token") })
}