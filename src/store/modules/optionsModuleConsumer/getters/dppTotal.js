const dppTotal = (state) => {
	var localTotal = 0
	state.existingDPPValues.forEach((i) => {
		localTotal += parseFloat(i.value)
	})
	state.existingCreditValues.forEach((i) => {
		localTotal -= parseFloat(i.value)
	})
	return parseFloat(localTotal) / 100
}

export default dppTotal
