const mixAndMatchNumberOfPhonesAndId = ((state) => {
    return state.mixAndMatchPlans.plans.map((plan) => {
        return {
            id: plan.id,
            numberOfPhones: plan.numberOfPhones
        }
    })
})

export default mixAndMatchNumberOfPhonesAndId