const set = key => (state, val) => {
    state[key] = val
}

const setChosenPlan = ((state, payload) => {
    state.chosenPlan = payload
})

const mutate = ((state, payload) => {
    state[payload.property] = payload.with
})

const setMixAndMatchPlans = ((state, payload) => {
    const foundIndex = state.mixAndMatchPlans.plans.map((plan) => { return plan.id }).indexOf(payload.id)
    state.mixAndMatchPlans.plans[foundIndex].numberOfPhones = payload.value
})

export {
    setChosenPlan,
    mutate,
    setMixAndMatchPlans
}