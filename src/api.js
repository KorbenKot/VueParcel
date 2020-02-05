import axios from 'axios';

const http = axios.create({
    baseURL: 'https://math.zao.click/api/',
    headers: { 'Content-Type': 'application/json' },
});

export default {
    createRequest(method, url, data = {}, config = {}) {
        const M = method.toLowerCase();

        if (M === 'get') {
            return http[M](url, config)
                .then(res => Promise.resolve(res))
                .catch(err => Promise.reject(err));
        }

        if (M === 'post') {
            return http[M](url, data, config)
                .then(res => Promise.resolve(res))
                .catch(err => Promise.reject(err));
        }

        return null;
    },
};
