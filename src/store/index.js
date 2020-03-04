import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import state from './state'
import mutations from './mutations'
import actions from './actions'

import benefitSheetModule from './modules/benefitSheetModule'
import optionsModuleConsumer from './modules/optionsModuleConsumer'
import optionsModuleBusiness from './modules/optionsModuleBusiness'

const vuexLocal = new VuexPersistence({
	storage: window.sessionStorage
})

Vue.use(Vuex)

export const store = new Vuex.Store({
	state,
	mutations,
	actions,
	modules: {
		benefitSheet: {
			namespaced: true,
			state: benefitSheetModule.state,
			getters: benefitSheetModule.getters,
			mutations: benefitSheetModule.mutations
		},
		consumer: {
			namespaced: true,
			modules: {
				optionOne: {
					namespaced: true,
					state: optionsModuleConsumer.state,
					getters: optionsModuleConsumer.getters,
					mutations: optionsModuleConsumer.mutations
				},
				optionTwo: {
					namespaced: true,
					state: optionsModuleConsumer.state,
					getters: optionsModuleConsumer.getters,
					mutations: optionsModuleConsumer.mutations
				}
			}
		},
		business: {
			namespaced: true,
			modules: {
				optionOne: {
					namespaced: true,
					state: optionsModuleBusiness.state,
					getters: optionsModuleBusiness.getters,
					mutations: optionsModuleBusiness.mutations
				},
				optionTwo: {
					namespaced: true,
					state: optionsModuleBusiness.state,
					getters: optionsModuleBusiness.getters,
					mutations: optionsModuleBusiness.mutations
				}
			}
		}
	},
	strict: process.env.NODE_ENV !== 'production',
	plugins: [vuexLocal.plugin]
})
