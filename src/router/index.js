import Vue from 'vue'
import VueRouter from 'vue-router'

//import PageLogin from '../components/pages/PageLogin'
import PageBenefitSheet from '../components/pages/PageBenefitSheet'
import PageOption1 from '../components/pages/PageOption1'
import PageOption2 from '../components/pages/PageOption2'

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
        path: '/option1',
        name: 'PageOption1',
        component: PageOption1
    },
    {
        path: '/option2',
        name: 'PageOption2',
        component: PageOption2
    }
]

const router = new VueRouter({
    routes
})

export default router