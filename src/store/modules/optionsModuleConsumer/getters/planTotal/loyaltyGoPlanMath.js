const loyaltyGoPlanMath = ({ numberOfPhones, loyaltyGoPlans, autopay }) => {
	if (numberOfPhones <= 0) { return 0 }
	if (numberOfPhones > 6) { numberOfPhones = 6 }

	if (autopay) {
		return loyaltyGoPlans[numberOfPhones].autopay
	} else if (!autopay) {
		return loyaltyGoPlans[numberOfPhones].noAutopay
	}
}

export default loyaltyGoPlanMath
