import axios from 'axios';
import * as consts from '../constants/backendRoutes';

export const fetchDatasets = () => {
    let fetchDatasetsUrl =  consts.FETCH_DATASETS_ROUTE;
	return axios
		.get(fetchDatasetsUrl)
}