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
import optionsModule from './modules/optionsModule'

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
        optionOne: {
            namespaced: true,
            state: optionsModule.state,
            getters: optionsModule.getters,
            mutations: optionsModule.mutations
        },
        optionTwo: {
            namespaced: true,
            state: optionsModule.state,
            getters: optionsModule.getters,
            mutations: optionsModule.mutations
        }
    },
    strict: process.env.NODE_ENV !== 'production',
    plugins: [vuexLocal.plugin]
})