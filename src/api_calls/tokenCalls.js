import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const validate = tokenInfo => {
    let validateUrl =  consts.VALIDATE_TOKEN;
	return axios
		.post(validateUrl, tokenInfo);
}


