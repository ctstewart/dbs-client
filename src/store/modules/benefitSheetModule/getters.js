const oldTotal = ((state) => {
    var localTotal = 0
    if (state.oldPhoneBill !== null && !isNaN(parseFloat(state.oldPhoneBill))) {
        localTotal += parseFloat(state.oldPhoneBill)
    }
    if (state.oldHomeSolution !== null && !isNaN(parseFloat(state.oldHomeSolution))) {
        localTotal += parseFloat(state.oldHomeSolution)
    }
    return localTotal
})

const optionOneDifferenceMonthly = ((state, getters, rootState, rootGetters) => {
    return rootGetters['optionOne/total'] - getters.oldTotal
})

const optionTwoDifferenceMonthly = ((state, getters, rootState, rootGetters) => {
    return rootGetters['optionTwo/total'] - getters.oldTotal
})

const getters = {
    oldTotal,
    optionOneDifferenceMonthly,
    optionTwoDifferenceMonthly
}

export default getters