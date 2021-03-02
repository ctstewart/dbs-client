const returnMilitaryResponderDiscount = (militaryNew, responderNew, militaryOld, responderOld, nurse, teacher, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld, numberOfPhones) => {
	if (militaryNew || responderNew || nurse || teacher) {
		return Number(militaryResponderDiscountAmountNew[numberOfPhones])
	} else if (militaryOld || responderOld) {
		return Number(militaryResponderDiscountAmountOld[numberOfPhones])
	} else {
		return 0
	}
}

export default returnMilitaryResponderDiscount
