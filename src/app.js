import Vue from 'vue';
import axios from 'axios';
import Vuelidate from 'vuelidate';
import router from './router/router';
import store from './store/store';
import App from './App.vue';

const http = axios.create({
    baseURL: 'https://math.zao.click/api/',
    headers: { 'Content-Type': 'application/json' },
});

http.createRequest = (method, url, data = {}, config = {}) => {
    const METH = method.toLowerCase();

    if (METH === 'get') {
        return http[METH](url, config)
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }

    if (METH === 'post') {
        return http[METH](url, data, config)
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
};

Vue.config.devtools = true;
Vue.use(Vuelidate);

new Vue({
    name: 'VueApp',
    router,
    store,
    render: h => h(App),
}).$mount('#app');
