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
    return getters.oldTotal - rootGetters['optionOne/total']
})

const optionTwoDifferenceMonthly = ((state, getters, rootState, rootGetters) => {
    return getters.oldTotal - rootGetters['optionTwo/total']
})

const getters = {
    oldTotal,
    optionOneDifferenceMonthly,
    optionTwoDifferenceMonthly
}

export default getters