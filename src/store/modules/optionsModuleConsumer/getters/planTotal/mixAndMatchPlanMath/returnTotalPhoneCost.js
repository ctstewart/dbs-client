const returnTotalPhoneCost = (plansObject, numberOfPhones, autopay) => {
	var localTotal = 0
	plansObject.mixAndMatch3.forEach((plan) => {
		if (autopay) {
			localTotal += plan.numberOfPhones * plan[numberOfPhones].autopay
		} else if (!autopay) {
			localTotal += plan.numberOfPhones * plan[numberOfPhones].noAutopay
		}
	})
	plansObject.mixAndMatch2.forEach((plan) => {
		if (autopay) {
			localTotal += plan.numberOfPhones * plan[numberOfPhones].autopay
		} else if (!autopay) {
			localTotal += plan.numberOfPhones * plan[numberOfPhones].noAutopay
		}
	})
	plansObject.mixAndMatch1.forEach((plan) => {
		if (autopay) {
			localTotal += plan.numberOfPhones * plan[numberOfPhones].autopay
		} else if (!autopay) {
			localTotal += plan.numberOfPhones * plan[numberOfPhones].noAutopay
		}
	})
	return Number(localTotal)
}

export default returnTotalPhoneCost
