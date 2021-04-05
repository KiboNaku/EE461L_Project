import axios from 'axios';
import * as consts from '../constants/backendRoutes';

// may need more defining
export const userInfo = (user) => {
    let userInfoUrl = consts.BACKEND_ROUTE + consts.USER_INFO;
    return axios
        .get(userInfoUrl)
}
    