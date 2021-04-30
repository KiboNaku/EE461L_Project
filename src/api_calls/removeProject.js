import axios from 'axios';
import * as consts from '../constants/backendRoutes';


export const removeProject = id => {
    let removeUrl =  consts.REMOVE_PROJECT;
	return axios
		.post(removeUrl, { id : id, "token": localStorage.getItem("token") })
}