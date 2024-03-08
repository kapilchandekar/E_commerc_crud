import axios from 'axios'
import { BASE_URL } from '../../helpers/url'

const axiosMain = axios.create({
	baseURL:
		process.env.REACT_APP_ENV_STATUS === 'development'
			? `${BASE_URL}`
			: `${process.env.REACT_APP_END_POINT_URL_PROD}`,
	headers: {
		'Content-Type': 'application/json',
	},
})
export default axiosMain

