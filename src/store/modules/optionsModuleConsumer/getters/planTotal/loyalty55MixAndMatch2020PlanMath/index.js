import returnNumberOfPhones from './returnNumberOfPhones'
import returnTotalPhoneCost from './returnTotalPhoneCost'
import returnDiscount from './returnDiscount'

const mixAndMatchPlanMath = ({ plansArray, autopay, discount }) => {
	const numberOfPhones = returnNumberOfPhones(plansArray)
	if (numberOfPhones === 0) { return 0 }

	var localTotal = 0
	localTotal += returnTotalPhoneCost(plansArray, numberOfPhones, autopay)
	localTotal -= returnDiscount(discount, numberOfPhones)

	return localTotal
}

export default mixAndMatchPlanMath
