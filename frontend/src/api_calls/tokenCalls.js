import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const validate = tokenInfo => {
    let validateUrl = consts.BACKEND_ROUTE + consts.VALIDATE_TOKEN;
	return axios
		.post(validateUrl, tokenInfo);
}


