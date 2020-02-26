import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
})

Vue.use(Vuex)

import state from './state'
import mutations from './mutations'

import benefitSheetModule from './modules/benefitSheetModule'
import optionsModuleConsumer from './modules/optionsModuleConsumer'
import optionsModuleBusiness from './modules/optionsModuleBusiness'

export const store = new Vuex.Store({
    state,
    mutations,
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
                },
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