import Vue from 'vue'
import VueRouter from 'vue-router'

import { authGuard } from '../auth/authGuard'

import PageBenefitSheet from '../components/pages/PageBenefitSheet'
import PageOptions from '../components/pages/PageOptions'
import PageConsumerOption from '../components/pages/PageOptions/PageConsumerOption'
import PageBusinessOption from '../components/pages/PageOptions/PageBusinessOption'
import PageChangelog from '../components/pages/PageChangelog'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'PageBenefitSheet',
		component: PageBenefitSheet,
		beforeEnter: authGuard,
	},
	{
		path: '/options',
		component: PageOptions,
		beforeEnter: authGuard,
		children: [
			{
				path: 'consumer/:vuexModule',
				name: 'PageConsumerOption',
				component: PageConsumerOption,
				beforeEnter: authGuard,
			},
			{
				path: 'business/:vuexModule',
				name: 'PageBusinessOption',
				component: PageBusinessOption,
				beforeEnter: authGuard,
			},
		],
	},
	{
		path: '/changelog',
		name: 'PageChangelog',
		component: PageChangelog,
		beforeEnter: authGuard,
	},
]

const router = new VueRouter({
	routes,
})

export default router
