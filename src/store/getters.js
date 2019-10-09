const mixAndMatchNumberOfPhonesAndId = ((state) => {
    return state.mixAndMatchPlans.plans.map((plan) => {
        return {
            id: plan.id,
            numberOfPhones: plan.numberOfPhones
        }
    })
})

const isUnlimited = ((state) => {
    if (state.chosenPlan === 'Unlimited') {
        return true
    } else {
        return false
    }
})

const planTotal = ((state) => {
    var localTotal = 0
    state.mixAndMatchPlans.plans.forEach((plan) => {
        localTotal += parseFloat(plan.numberOfPhones)
    })
    return localTotal
})

const total = ((state, getters) => {
    return getters.planTotal
})

export {
    mixAndMatchNumberOfPhonesAndId,
    isUnlimited,
    planTotal,
    total
}