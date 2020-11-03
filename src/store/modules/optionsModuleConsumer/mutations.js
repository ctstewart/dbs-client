import defaultState from './defaultState'

const mutate = (state, payload) => {
	state[payload.property] = payload.with
}

const toggle = (state, property) => {
	state[property] = !state[property]
}

const setMixAndMatchPlans = (state, payload) => {
	state.mixAndMatchPlans.plans[payload.index].numberOfPhones = payload.value
}

const incrementConnectedDevice = (state, id) => {
	const findId = (i) => i.id === id
	const index = state.connectedDevices.findIndex(findId)
	if (state.connectedDevices[index].value < 25) {
		state.connectedDevices[index].value++
	}
}

const decrementConnectedDevice = (state, id) => {
	const findId = (i) => i.id === id
	const index = state.connectedDevices.findIndex(findId)
	if (state.connectedDevices[index].value > 0) {
		state.connectedDevices[index].value--
	}
}

const mutateDeviceName = (state, payload) => {
	state.dppValues[payload.index].deviceName = payload.value
}

const mutateDpp = (state, payload) => {
	state.dppValues[payload.index].dpp = payload.value
}

const mutateCredits = (state, payload) => {
	state.dppValues[payload.index].credits = payload.value
}

const addDppValue = (state) => {
	const index = state.dppValues.length
	state.dppValues.push({ id: `device-${index}`, deviceName: '', dpp: 0, credits: 0 })
}

const removeDppValue = (state, index) => {
	state.dppValues.splice(index, 1)
	state.dppValues.forEach((i, index) => {
		i.id = `device-${index}`
	})
}

const resetState = (state) => {
	Object.assign(state, defaultState())
}

const mutations = {
	mutate,
	toggle,
	setMixAndMatchPlans,
	incrementConnectedDevice,
	decrementConnectedDevice,
	mutateDeviceName,
	mutateDpp,
	mutateCredits,
	addDppValue,
	removeDppValue,
	resetState
}

export default mutations
