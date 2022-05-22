import axios from 'axios';
import router from '../router';
import auth from './AccountService';

const api = axios.create({
    baseURL: "http://ec2-3-82-235-243.compute-1.amazonaws.com:3000",
});

api.interceptors.response.use(function (response) {
    //Llamadas que devuelven 2xx
    return response;
}, function (error) {
    if (error.response.status === 401) {
        auth.logout();
        router.push('/expired');
    }
    return Promise.reject(error);
});

export default api;