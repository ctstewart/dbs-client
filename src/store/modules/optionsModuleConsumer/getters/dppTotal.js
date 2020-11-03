const dppTotal = (state) => {
	var localTotal = 0
	state.dppValues.forEach((i) => {
		localTotal += parseFloat(i.dpp)
		localTotal -= parseFloat(i.credits)
	})
	return parseFloat(localTotal) / 100
}

export default dppTotal
