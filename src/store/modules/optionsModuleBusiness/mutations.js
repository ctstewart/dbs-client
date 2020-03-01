import defaultState from './defaultState'

const mutate = (state, payload) => {
	state[payload.property] = payload.with
}

const toggleMilitaryDiscount = (state) => {
	state.militaryDiscount.isActive = !state.militaryDiscount.isActive
}

const mutateTwoYear = (state, payload) => {
	state.twoYear.numberOfPhones = payload
}

const setPlans = (state, payload) => {
	state.plans[payload.index].numberOfPhones = payload.value
}

const incrementConnectedDevice = (state, index) => {
	if (state.connectedDevices[index].numberOfDevices < 200) {
		state.connectedDevices[index].numberOfDevices++
	}
}

const decrementConnectedDevice = (state, index) => {
	if (state.connectedDevices[index].numberOfDevices > 0) {
		state.connectedDevices[index].numberOfDevices--
	}
}

const addExistingDpp = (state, payload) => {
	// payload is a new value
	state.existingDPPValues.push(payload)
}

const removeExistingDpp = (state, payload) => {
	// payload is an index
	state.existingDPPValues.splice(payload, 1)
}

const addExistingCredit = (state, payload) => {
	// payload is a new value
	state.existingCreditValues.push(payload)
}

const removeExistingCredit = (state, payload) => {
	// payload is an index
	state.existingCreditValues.splice(payload, 1)
}

const resetState = (state) => {
	Object.assign(state, defaultState())
}

const mutations = {
	mutate,
	toggleMilitaryDiscount,
	mutateTwoYear,
	setPlans,
	incrementConnectedDevice,
	decrementConnectedDevice,
	addExistingDpp,
	removeExistingDpp,
	addExistingCredit,
	removeExistingCredit,
	resetState
}

export default mutations
