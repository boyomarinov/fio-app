import Vue from 'vue';
import Router from 'vue-router';
import { store } from '@/store';

import Login from '@/components/login-page.vue';
import Home from '@/components/home-page.vue';

Vue.use(Router);

export const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next()
        } else {
            next('/login');
        }
    } else {
        next();
    }
});