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
import returnMilitaryResponderDiscount from './returnMilitaryResponderDiscount'

const mixAndMatchPlanMath = (({plansArray, autopay, militaryNew, militaryOld, responderNew, responderOld, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld}) => {
    const numberOfPhones = returnNumberOfPhones(plansArray)
    if (numberOfPhones === 0) { return 0 }

    var localTotal = 0
    localTotal += returnTotalPhoneCost(plansArray, numberOfPhones, autopay)
    localTotal -= returnMilitaryResponderDiscount(militaryNew, responderNew, militaryOld, responderOld, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld, numberOfPhones)

    return localTotal
})

export default mixAndMatchPlanMath