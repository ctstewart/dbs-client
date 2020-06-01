const loyalty55PlanMath = ({ numberOfPhones, loyalty55Plans, autopay }) => {
	if (numberOfPhones <= 0) { return 0 }
	if (numberOfPhones > 4) { numberOfPhones = 4 }

	if (autopay) {
		return loyalty55Plans[numberOfPhones].autopay
	} else if (!autopay) {
		return loyalty55Plans[numberOfPhones].noAutopay
	}
}

export default loyalty55PlanMath
