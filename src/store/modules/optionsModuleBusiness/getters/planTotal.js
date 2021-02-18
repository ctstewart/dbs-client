const planTotal = (state, getters) => {
	let localTotal = 0
	let totalNumberOfPhones = 0
	let totalNumberOfPhonesOn2020Unlimited = 0
	let totalNumberOfProPhones = 0
	let totalNumberOfProTablets2021 = 0

	state.plans.forEach(plan => {
		totalNumberOfPhones += plan.numberOfPhones

		if (plan.id === 'start2020' || plan.id === 'plus2020' || plan.id === 'pro2020') {
			totalNumberOfPhonesOn2020Unlimited += plan.numberOfPhones
		}

		if (plan.id === 'pro2020') {
			totalNumberOfProPhones = plan.numberOfPhones
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

		if (cd.id === 'tabletPro2021') {
			totalNumberOfProTablets2021 += cd.numberOfDevices
		}
	})

	if (totalNumberOfProPhones >= totalNumberOfProTablets2021) {
		localTotal -= totalNumberOfProTablets2021 * 20
		totalNumberOfProPhones -= totalNumberOfProTablets2021
	} else {
		localTotal -= totalNumberOfProPhones * 20
		totalNumberOfProPhones = 0
	}

	return localTotal
}

export default planTotal
