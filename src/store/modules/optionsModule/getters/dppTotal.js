const dppTotal = ((state) => {
    var localTotal = 0
    state.existingDPPValues.forEach((i) => {
        localTotal += i.value
    })
    state.existingCreditValues.forEach((i) => {
        localTotal -= i.value
    })
    return localTotal
})

export default dppTotal