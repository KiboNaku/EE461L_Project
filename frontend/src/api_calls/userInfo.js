import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const userInfo = (user) => {
    let userInfoUrl = consts.BACKEND_ROUTE + consts.USER_INFO;
    return axios
        .get(userInfoUrl)
}
    