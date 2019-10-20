const isUnlimited = ((state) => {
    if (state.chosenPlan === 'Unlimited') {
        return true
    } else {
        return false
    }
})

export default isUnlimited