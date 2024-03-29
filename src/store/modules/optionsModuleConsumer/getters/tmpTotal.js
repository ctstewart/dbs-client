const tmpTotal = (state) => {
	var localTotal = 0.00
	if (!state.tmp || state.tmp < 0 || isNaN(state.tmp)) {
		localTotal += 0.00
	} else {
		localTotal += parseFloat(state.tmp)
	}

	if (state.otherCost && !isNaN(state.otherCost)) {
		localTotal += parseFloat(state.otherCost)
	}

	return localTotal
}

export default tmpTotal
