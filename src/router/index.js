import Vue from 'vue'
import VueRouter from 'vue-router'

import PageLogin from '../components/pages/PageLogin'
import PageBenefitSheet from '../components/pages/PageBenefitSheet'
import PageOption from '../components/pages/PageOption'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'PageBenefitSheet',
        component: PageBenefitSheet,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'PageLogin',
        component: PageLogin
    },
    {
        path: '/option/:vuexModule',
        name: 'PageOption',
        component: PageOption,
        meta: { requiresAuth: true }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            localStorage.clear()
            next({path: '/login'})
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router