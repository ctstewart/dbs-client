/* eslint-disable no-new */

import Vue from 'vue'
import App from './app.vue'
import router from './router'
import { store } from './store'
import VueCurrencyInput from 'vue-currency-input'

// Import the Auth0 configuration
import { domain, clientId } from '../auth_config.json'

// Import the plugin here
import { Auth0Plugin } from './auth'

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
	domain,
	clientId,
	onRedirectCallback: appState => {
		router.push(
			appState && appState.targetUrl
				? appState.targetUrl
				: window.location.pathname
		)
	},
})

const pluginOptions = {
	globalOptions: { currency: 'USD', locale: 'en', autoDecimalMode: true },
}

Vue.use(VueCurrencyInput, pluginOptions)

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
})
