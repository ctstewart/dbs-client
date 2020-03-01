const oldUnlimitedAndTieredPlanMath = ({ numberOfPhones, oldUnlimitedPlansArray, tieredPlansArray, chosenPlan, autopay, militaryNew, responderNew, discount }) => {
	if (numberOfPhones <= 0) { return 0 }

	var localTotal = 0
	oldUnlimitedPlansArray.forEach((oldUnlimitedPlan) => {
		if (chosenPlan === oldUnlimitedPlan.id) {
			if (autopay) {
				localTotal += oldUnlimitedPlan.autopay
			} else if (!autopay) {
				localTotal += oldUnlimitedPlan.noAutopay
			}

			if (militaryNew) {
				localTotal = localTotal * 0.85
			}
		}
	})

	tieredPlansArray.forEach((tieredPlan) => {
		if (chosenPlan === tieredPlan.id) {
			if (autopay) {
				localTotal += tieredPlan.autopay
			} else if (!autopay) {
				localTotal += tieredPlan.noAutopay
			}

			if (militaryNew || responderNew) {
				localTotal = localTotal * 0.85
			} else if (parseInt(discount) > 0) {
				localTotal = localTotal * (0.01 * (100 - parseInt(discount)))
			}
		}
	})

	localTotal += numberOfPhones * 20

	return localTotal
}

export default oldUnlimitedAndTieredPlanMath
