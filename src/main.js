import Vue from 'vue'
import App from './app.vue'
import router from './router'
import { store } from './store'
import VueCurrencyInput from 'vue-currency-input'

const pluginOptions = {
  globalOptions: { currency: 'USD', locale: 'en', autoDecimalMode: true }
}

Vue.use(VueCurrencyInput, pluginOptions)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
