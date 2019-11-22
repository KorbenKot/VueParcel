import Vue from 'vue';
import router from './router/router';
import store from './store/store';

import App from './App.vue';

Vue.config.devtools = true;

new Vue({
    name: 'VueApp',
    router,
    store,
    render: h => h(App),
}).$mount('#app');
