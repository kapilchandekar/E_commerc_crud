import axios from 'axios'

const axiosMain = axios.create({
	baseURL:
		process.env.REACT_APP_ENV_STATUS === 'development'
			? `${process.env.REACT_APP_BASE_URL}`
			: `${process.env.REACT_APP_END_POINT_URL_PROD}`,
	headers: {
		'Content-Type': 'application/json',
	},
})
export default axiosMain

