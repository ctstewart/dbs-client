const returnTotalPhoneCost = (plansArray, numberOfPhones, autopay) => {
	var localTotal = 0
	plansArray.forEach((plan) => {
		if (autopay) {
			localTotal += plan.numberOfPhones * plan[numberOfPhones].autopay
		} else if (!autopay) {
			localTotal += plan.numberOfPhones * plan[numberOfPhones].noAutopay
		}
	})
	return Number(localTotal)
}

export default returnTotalPhoneCost
