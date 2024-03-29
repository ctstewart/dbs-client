/* plansArray should be structured like this:
plansArray = [
    {
        id: 'Name of plan',
        numberOfPhones: 0,
        1: { lines: 1, autopay: 70, noAutopay: 80 },
        2: { lines: 2, autopay: 60, noAutopay: 70 },
        3: { lines: 3, autopay: 45, noAutopay: 55 },
        4: { lines: 4, autopay: 35, noAutopay: 45 },
        5: { lines: 5, autopay: 30, noAutopay: 40 }
    }
] */

import returnNumberOfPhones from './returnNumberOfPhones'
import returnTotalPhoneCost from './returnTotalPhoneCost'
import returnCommonDiscountAmount from './returnCommonDiscountAmount'

const mixAndMatchPlanMath = ({ plansObject, autopay, militaryNew, militaryOld, responderNew, responderOld, nurse, teacher, student, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld, studentDiscount }) => {
	const numberOfPhones = returnNumberOfPhones(plansObject)
	if (numberOfPhones === 0) { return 0 }

	var localTotal = 0
	localTotal += returnTotalPhoneCost(plansObject, numberOfPhones, autopay)
	localTotal -= returnCommonDiscountAmount(militaryNew, responderNew, militaryOld, responderOld, nurse, teacher, student, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld, studentDiscount, numberOfPhones)

	return localTotal
}

export default mixAndMatchPlanMath
