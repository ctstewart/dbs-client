const mutate = ((state, payload) => {
    state[payload.property] = payload.with
})

const toggle = ((state, payload) => {
    state[payload] = !state[payload]
})

const setMixAndMatchPlans = ((state, payload) => {
    const foundIndex = state.mixAndMatchPlans.plans.map((plan) => { return plan.id }).indexOf(payload.id)
    state.mixAndMatchPlans.plans[foundIndex].numberOfPhones = payload.value
})

export {
    mutate,
    toggle,
    setMixAndMatchPlans
}