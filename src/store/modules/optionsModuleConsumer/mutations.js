import defaultState from './defaultState'

const mutate = ((state, payload) => {
    state[payload.property] = payload.with
})

const toggle = ((state, property) => {
    state[property] = !state[property]
})

const setMixAndMatchPlans = ((state, payload) => {
    state.mixAndMatchPlans.plans[payload.index].numberOfPhones = payload.value
})

const incrementConnectedDevice = ((state, index) => {
    if (state.connectedDevices[index].value < 25) {
        state.connectedDevices[index].value++
    }
})

const decrementConnectedDevice = ((state, index) => {
    if (state.connectedDevices[index].value > 0) {
        state.connectedDevices[index].value--
    }
})

const mutateExistingDpp = ((state, payload) => {
    state.existingDPPValues[payload.index].value = payload.value
})

const mutateExistingCredits = ((state, payload) => {
    state.existingCreditValues[payload.index].value = payload.value
})

const resetState = ((state) => {
    Object.assign(state, defaultState())
})

const mutations = {
    mutate,
    toggle,
    setMixAndMatchPlans,
    incrementConnectedDevice,
    decrementConnectedDevice,
    mutateExistingDpp,
    mutateExistingCredits,
    resetState
}

export default mutations