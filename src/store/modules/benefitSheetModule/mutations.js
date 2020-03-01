import defaultState from './defaultState'

const mutate = (state, payload) => {
	state[payload.property] = payload.with
}

const mutateBenefits = (state, payload) => {
	state.benefits[payload.index] = payload.value
}

const resetState = (state) => {
	Object.assign(state, defaultState())
}

const mutations = {
	mutate,
	mutateBenefits,
	resetState
}

export default mutations
