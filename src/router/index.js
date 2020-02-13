import Vue from 'vue'
import VueRouter from 'vue-router'

import PageBenefitSheet from '../components/pages/PageBenefitSheet'
import PageOption from '../components/pages/PageOption'
import PageBusiness from '../components/pages/PageBusiness'
import BusinessBenefitSheet from '../components/pages/PageBusiness/BusinessBenefitSheet'
import BusinessOption from '../components/pages/PageBusiness/BusinessOption'
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
        path: '/option/:vuexModule',
        name: 'PageOption',
        component: PageOption,
        meta: { requiresAuth: true }
    },
    {
        path: '/business',
        component: PageBusiness,
        children: [
            {
                path: '',
                component: BusinessBenefitSheet
            },
            {
                path: 'option/:vuexModule',
                component: BusinessOption
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