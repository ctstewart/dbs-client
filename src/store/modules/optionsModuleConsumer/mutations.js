import defaultState from './defaultState'

const mutate = (state, payload) => {
	state[payload.property] = payload.with
}

const toggle = (state, property) => {
	state[property] = !state[property]
}

const setCommonDiscountsToFalse = (state) => {
	state.militaryNew = false
	state.militaryOld = false
	state.responderNew = false
	state.responderOld = false
	state.nurse = false
	state.teacher = false
	state.student = false
}

const setCommonDiscount = (state, property) => {
	setCommonDiscountsToFalse(state)

	if (property) {
		state[property] = true
	}
}

const setMixAndMatch3 = (state, payload) => {
	state.mixAndMatchPlans.mixAndMatch3[payload.index].numberOfPhones = payload.value
}

const setMixAndMatch2 = (state, payload) => {
	state.mixAndMatchPlans.mixAndMatch2[payload.index].numberOfPhones = payload.value
}

const setMixAndMatch1 = (state, payload) => {
	state.mixAndMatchPlans.mixAndMatch1[payload.index].numberOfPhones = payload.value
}

const setLoyalty55MixAndMatch2020Plans = (state, payload) => {
	state.loyalty55MixAndMatch2020.plans[payload.index].numberOfPhones = payload.value
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
	state.dppValues[payload.index].fullRetail = payload.value
}

const mutateCredits = (state, payload) => {
	state.dppValues[payload.index].totalCredits = payload.value
}

const mutateDppLengthOptions = (state, payload) => {
	state.dppValues[payload.index].dppLengthOptions = payload.value
}

const mutateDppLength = (state, payload) => {
	state.dppValues[payload.index].dppLength = payload.value
}

const addDppValue = (state) => {
	const index = state.dppValues.length
	state.dppValues.push({ id: `device-${index}`, deviceName: '', fullRetail: 0, totalCredits: 0, dppLength: 24, dppLengthOptions: [24], editing: true })
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
	toggle,
	setCommonDiscountsToFalse,
	setCommonDiscount,
	setMixAndMatch3,
	setMixAndMatch2,
	setMixAndMatch1,
	setLoyalty55MixAndMatch2020Plans,
	incrementConnectedDevice,
	decrementConnectedDevice,
	mutateDeviceName,
	mutateDpp,
	mutateCredits,
	mutateDppLengthOptions,
	mutateDppLength,
	addDppValue,
	removeDppValue,
	editDpp,
	closeEditDpp,
	resetState
}

export default mutations
