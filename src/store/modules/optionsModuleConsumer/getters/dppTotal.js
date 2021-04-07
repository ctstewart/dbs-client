const dppTotal = (state) => {
	var localTotal = 0
	state.dppValues.forEach((i) => {
		localTotal += parseFloat((i.fullRetail - i.totalCredits) / i.dppLength)
	})
	return parseFloat(localTotal) / 100
}

export default dppTotal
