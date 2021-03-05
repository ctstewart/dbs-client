const returnCommonDiscountAmount = (militaryNew, responderNew, militaryOld, responderOld, nurse, teacher, student, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld, studentDiscount, numberOfPhones) => {
	if (militaryNew || responderNew || nurse || teacher) {
		return Number(militaryResponderDiscountAmountNew[numberOfPhones])
	} else if (militaryOld || responderOld) {
		return Number(militaryResponderDiscountAmountOld[numberOfPhones])
	} else if (student) {
		return Number(studentDiscount[numberOfPhones])
	} else {
		return 0
	}
}

export default returnCommonDiscountAmount
