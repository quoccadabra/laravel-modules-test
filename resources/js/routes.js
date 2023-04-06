import LoginComponent from './components/Login.vue';
import Home from './components/Home.vue';
import UserComponent from './components/User.vue';

const routes = [
    {
        path: '/',
        redirect: '/admin'
        // component: Home,
        // beforeEnter: [hashRoute, decodeRoute]
    },
    {
        path: '/login',
        component: LoginComponent
    },
    {
        path: '/admin',
        name: 'admin',
        component: Home,
        children: [
            {
                path: 'user',
                name: 'admin.user',
                component: UserComponent
            },
        ]
    }
]
export default routes;