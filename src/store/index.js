import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import optionsModule from './modules/optionsModule'

//import {state} from './state'
//import * as getters from './getters'
//import * as mutations from './mutations'

export const store = new Vuex.Store({
    modules: {
        optionsModule: {
            namespaced: true,
            state: optionsModule.state,
            getters: optionsModule.getters,
            mutations: optionsModule.mutations
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})