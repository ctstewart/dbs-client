const returnMilitaryResponderDiscount = (militaryNew, responderNew, militaryOld, responderOld, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld, numberOfPhones) => {
	if (militaryNew || responderNew) {
		return Number(militaryResponderDiscountAmountNew[numberOfPhones])
	} else if (militaryOld || responderOld) {
		return Number(militaryResponderDiscountAmountOld[numberOfPhones])
	} else {
		return 0
	}
}

export default returnMilitaryResponderDiscount
