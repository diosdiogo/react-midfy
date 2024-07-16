import axios from 'axios';
import { responseInterceptor, errorInterceptors } from './interceptors'

const Api = axios.create({
    baseURL: 'https://66959eba4bd61d8314cbc535.mockapi.io/api/v1',
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptors(error),
)

export default Api;