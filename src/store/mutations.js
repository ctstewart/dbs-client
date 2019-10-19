const mutate = ((state, payload) => {
    state[payload.property] = payload.with
})

const toggle = ((state, property) => {
    state[property] = !state[property]
})

const setMixAndMatchPlans = ((state, payload) => {
    const foundIndex = state.mixAndMatchPlans.plans.map((plan) => { return plan.id }).indexOf(payload.id)
    state.mixAndMatchPlans.plans[foundIndex].numberOfPhones = payload.value
})

const incrementConnectedDevice = ((state, id) => {
    const foundIndex = state.connectedDevices.map((connectedDevice) => {return connectedDevice.id}).indexOf(id)
    if (state.connectedDevices[foundIndex].value < 25) {
        state.connectedDevices[foundIndex].value++
    }
})

const decrementConnectedDevice = ((state, id) => {
    const foundIndex = state.connectedDevices.map((connectedDevice) => {return connectedDevice.id}).indexOf(id)
    if (state.connectedDevices[foundIndex].value > 0) {
        state.connectedDevices[foundIndex].value--
    }
})

export {
    mutate,
    toggle,
    setMixAndMatchPlans,
    incrementConnectedDevice,
    decrementConnectedDevice
}