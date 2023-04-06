import 'bootstrap';
import 'bootstrap-css';

// import scss from 'scss';
// window.Vue = require('vue');

import { createApp } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import App from './components/App.vue';
import routes from './routes';

import '../css/app.css';
import authStore from './stores/authStore';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import 'mosha-vue-toastify/dist/style.css'
// import { toast } from 'vue3-toastify';
// import { Toast } from 'bootstrap';

library.add(faUserSecret);


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
app.use(authStore);
app.use(router);
// app.use(toast)
app.mount('#app');