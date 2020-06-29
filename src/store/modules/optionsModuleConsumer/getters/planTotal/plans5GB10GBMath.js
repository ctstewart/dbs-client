const plans5GB10GBMath = ({ numberOfPhones, plansArray, chosenPlan, autopay, militaryNew, responderNew, discount }) => {
	if (numberOfPhones <= 0) { return 0 }

	var localTotal = 0
	plansArray.forEach((plan) => {
		if (chosenPlan === plan.id) {
			localTotal += plan.accountCost

			if (militaryNew || responderNew) {
				localTotal *= .85
			} else if (parseInt(discount) > 0) {
				localTotal *= (0.01 * (100 - parseInt(discount)))
			}

			if (autopay) {
				localTotal += plan.lineAccessAutopay * numberOfPhones
			} else {
				localTotal += plan.lineAccessNoAutopay * numberOfPhones
			}
		}
	})

	return localTotal
}

export default plans5GB10GBMath