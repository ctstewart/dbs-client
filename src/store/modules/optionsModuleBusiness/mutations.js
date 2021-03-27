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
	state.dppValues.push({ id: `device-${index}`, deviceName: '', dpp: 0, credits: 0, editing: true })
}

const removeDppValue = (state, index) => {
	state.dppValues.splice(index, 1)
	state.dppValues.forEach((i, index) => {
		i.id = `device-${index}`
	})
}

const editDpp = (state, index) => {
	state.dppValues.forEach(i => i.editing = false)
	state.dppValues[index].editing = true
}

const closeEditDpp = (state, index) => {
	state.dppValues.forEach(i => i.editing = false)
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
	mutateDeviceName,
	mutateDpp,
	mutateCredits,
	addDppValue,
	removeDppValue,
	editDpp,
	closeEditDpp,
	resetState
}

export default mutations
