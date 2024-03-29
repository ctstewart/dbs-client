import defaultState from './defaultState'

const mutate = (state, payload) => {
	state[payload.property] = payload.with
}

const mutateBenefits = (state, payload) => {
	state.benefits[payload.index] = payload.value
}

const mutateNotes = (state, payload) => {
	state.notes[payload.index] = payload.value
}

const toggleAccordionStyle = (state) => {
	state.accordionStyle = !state.accordionStyle
}

const resetState = (state) => {
	Object.assign(state, defaultState())
}

const mutations = {
	mutate,
	mutateBenefits,
	mutateNotes,
	toggleAccordionStyle,
	resetState
}

export default mutations
