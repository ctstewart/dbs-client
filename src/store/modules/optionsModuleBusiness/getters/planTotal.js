const planTotal = (state, getters) => {
	var localTotal = 0
	var totalNumberOfPhones = 0

	state.plans.forEach(plan => {
		localTotal += plan.numberOfPhones * plan.cost
		totalNumberOfPhones += plan.numberOfPhones
	})

	if (state.militaryDiscount.isActive) {
		localTotal -= totalNumberOfPhones * state.militaryDiscount.amount
	}

	localTotal += state.twoYear.numberOfPhones * state.twoYear.cost

	state.connectedDevices.forEach(cd => {
		localTotal += cd.numberOfDevices * cd.cost
	})

	return localTotal
}

export default planTotal
