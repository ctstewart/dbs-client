const planTotal = (state, getters) => {
	let localTotal = 0
	let totalNumberOfPhones = 0
	let totalNumberOfPhonesOn2020Unlimited = 0
	let totalNumberOfProPhones = 0
	let totalNumberOfStartTablets2020 = 0
	let totalNumberOfProTablets2020 = 0

	state.plans.forEach(plan => {
		totalNumberOfPhones += plan.numberOfPhones

		if (plan.id === 'start2020' || plan.id === 'plus2020' || plan.id === 'pro2020') {
			totalNumberOfPhonesOn2020Unlimited += plan.numberOfPhones
		}

		if (plan.id === 'pro2020') {
			totalNumberOfProPhones += plan.numberOfPhones
		}
	})

	if (totalNumberOfPhonesOn2020Unlimited > 5) {
		totalNumberOfPhonesOn2020Unlimited = 5
	}



	state.plans.forEach(plan => {
		if (plan.id === 'start2020' || plan.id === 'plus2020' || plan.id === 'pro2020') {
			if (totalNumberOfPhonesOn2020Unlimited > 0) {
				if (state.autopay) {
					localTotal += plan.numberOfPhones * plan[totalNumberOfPhonesOn2020Unlimited].autopay
				} else {
					localTotal += plan.numberOfPhones * plan[totalNumberOfPhonesOn2020Unlimited].noAutopay
				}
			}
		} else {
			localTotal += plan.numberOfPhones * plan.cost
		}
	})


	if (state.militaryDiscount.isActive) {
		localTotal -= totalNumberOfPhones * state.militaryDiscount.amount
	}

	localTotal += state.twoYear.numberOfPhones * state.twoYear.cost

	state.connectedDevices.forEach(cd => {
		localTotal += cd.numberOfDevices * cd.cost

		if (cd.id === 'tabletStart2020') {
			totalNumberOfStartTablets2020 += cd.numberOfDevices
		}

		if (cd.id === 'tabletPro2020') {
			totalNumberOfProTablets2020 += cd.numberOfDevices
		}
	})

	if (totalNumberOfProPhones >= totalNumberOfProTablets2020) {
		localTotal -= totalNumberOfProTablets2020 * 30
		totalNumberOfProPhones -= totalNumberOfProTablets2020
	} else {
		localTotal -= totalNumberOfProPhones * 30
		totalNumberOfProPhones = 0
	}

	if (totalNumberOfProPhones >= totalNumberOfStartTablets2020) {
		localTotal -= totalNumberOfStartTablets2020 * 20
		totalNumberOfProPhones -= totalNumberOfStartTablets2020
	} else {
		localTotal -= totalNumberOfProPhones * 20
		totalNumberOfProPhones = 0
	}

	return localTotal
}

export default planTotal
