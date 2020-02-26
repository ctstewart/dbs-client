import Vue from 'vue'
import VueRouter from 'vue-router'

import PageBenefitSheet from '../components/pages/PageBenefitSheet'
import PageOptions from '../components/pages/PageOptions'
import PageConsumerOption from '../components/pages/PageOptions/PageConsumerOption'
import PageBusinessOption from '../components/pages/PageOptions/PageBusinessOption'
import PageAdmin from '../components/pages/PageAdmin'
import PageChangelog from '../components/pages/PageChangelog'
import PageLogin from '../components/pages/PageLogin'
import PageResetPassword from '../components/pages/PageResetPassword'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'PageBenefitSheet',
        component: PageBenefitSheet,
        meta: { requiresAuth: true }
    },
    {
        path: '/options',
        component: PageOptions,
        children: [
            {
                path: 'consumer/:vuexModule',
                name: 'PageConsumerOption',
                component: PageConsumerOption,
                meta: { requiresAuth: true }
            },
            {
                path: 'business/:vuexModule',
                name: 'PageBusinessOption',
                component: PageBusinessOption,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/admin',
        name: 'PageAdmin',
        component: PageAdmin,
        meta: { requiresAuth: true }
    },
    {
        path: '/changelog',
        name: 'PageChangelog',
        component: PageChangelog,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'PageLogin',
        component: PageLogin
    },
    {
        path: '/resetPassword/:resetToken',
        name: 'PageResetPassword',
        component: PageResetPassword
    },
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