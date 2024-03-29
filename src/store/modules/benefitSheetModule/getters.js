const oldTotal = (state) => {
	var localTotal = 0
	if (state.oldPhoneBill !== null && !isNaN(parseFloat(state.oldPhoneBill))) {
		localTotal += parseFloat(state.oldPhoneBill)
	}
	if (state.oldHomeSolution !== null && !isNaN(parseFloat(state.oldHomeSolution))) {
		localTotal += parseFloat(state.oldHomeSolution)
	}
	return localTotal
}

const optionOneDifferenceMonthly = (state, getters, rootState, rootGetters) => {
	return rootGetters[`${rootState.optionsType.optionOne}/optionOne/total`] - getters.oldTotal
}

const optionTwoDifferenceMonthly = (state, getters, rootState, rootGetters) => {
	return rootGetters[`${rootState.optionsType.optionTwo}/optionTwo/total`] - getters.oldTotal
}

const getters = {
	oldTotal,
	optionOneDifferenceMonthly,
	optionTwoDifferenceMonthly
}

export default getters
