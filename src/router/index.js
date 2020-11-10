import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import { store } from '../store'

import PageBenefitSheet from '../components/pages/PageBenefitSheet'
import PageOptions from '../components/pages/PageOptions'
import PageConsumerOption from '../components/pages/PageOptions/PageConsumerOption'
import PageBusinessOption from '../components/pages/PageOptions/PageBusinessOption'
import PageChangelog from '../components/pages/PageChangelog'
import PageLogin from '../components/pages/PageLogin'
import PageResetPassword from '../components/pages/PageResetPassword'
import PageUpdatePassword from '../components/pages/PageUpdatePassword'

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
		meta: { requiresAuth: true },
		children: [
			{
				path: 'consumer/:vuexModule',
				name: 'PageConsumerOption',
				component: PageConsumerOption,
				meta: { requiresAuth: true },
			},
			{
				path: 'business/:vuexModule',
				name: 'PageBusinessOption',
				component: PageBusinessOption,
				meta: { requiresAuth: true },
			}
		]
	},
	{
		path: '/changelog',
		name: 'PageChangelog',
		component: PageChangelog,
		meta: { requiresAuth: true }
	},
	{
		path: '/updatePassword',
		name: 'PageUpdatePassword',
		component: PageUpdatePassword,
		meta: { requiresAuth: true }
	},
	{
		path: '/login',
		name: 'PageLogin',
		component: PageLogin,
		meta: { requiresAuth: false },
	},
	{
		path: '/resetPassword/:resetToken',
		name: 'PageResetPassword',
		component: PageResetPassword,
		meta: { requiresAuth: false },
	},
]

const router = new VueRouter({
	routes
})

router.beforeEach(async (to, from, next) => {
	if (to.meta.requiresAuth) {
		let userInfoExists = true

		for (let key in store.state.userInfo) {
			if (store.state.userInfo[key] === "") {
				userInfoExists = false
				break
			}
		}

		if (!userInfoExists) {
			try {
				const response = await axios({
					method: 'get',
					url: `${process.env.VUE_APP_API_URL}/api/v1/auth/me`,
					withCredentials: true,
				})

				if (!response || !response.data.success) {
					if (from.path === '/login') {
						next(false)
					} else {
						router.push('/login')
						next()
					}
				}

				store.commit('mutate', { property: 'userInfo', with: response.data.data })

				next()
			} catch (err) {
				console.error(err)
				router.push('/login')
				next()
			}
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
