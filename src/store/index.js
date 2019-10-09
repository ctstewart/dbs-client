import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {state} from './state'
import * as getters from './getters'
import * as mutations from './mutations'

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    strict: process.env.NODE_ENV !== 'production'
})