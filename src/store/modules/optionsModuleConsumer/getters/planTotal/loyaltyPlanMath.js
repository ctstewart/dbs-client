const loyaltyPlanMath = ({ numberOfPhones, loyaltyPlans, autopay }) => {
	if (numberOfPhones <= 0) { return 0 }
	if (numberOfPhones > 4) { numberOfPhones = 4 }

	if (autopay) {
		return loyaltyPlans[numberOfPhones].autopay
	} else if (!autopay) {
		return loyaltyPlans[numberOfPhones].noAutopay
	}
}

export default loyaltyPlanMath
