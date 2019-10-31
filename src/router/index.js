import Vue from 'vue'
import VueRouter from 'vue-router'

//import PageLogin from '../components/pages/PageLogin'
import PageBenefitSheet from '../components/pages/PageBenefitSheet'
import PageOption from '../components/pages/PageOption'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'PageBenefitSheet',
        component: PageBenefitSheet
    },
/*     {
        path: '/login',
        name: 'PageLogin',
        component: PageLogin
    }, */
    {
        path: '/option/:vuexModule',
        name: 'PageOption',
        component: PageOption
    }
]

const router = new VueRouter({
    routes
})

export default router