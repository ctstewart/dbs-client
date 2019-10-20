const mixAndMatchPlanMath = (({plansArray, autopay, militaryNew, militaryOld, responderNew, responderOld, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld, twoYearNumber, twoYearCost, basicPhoneNumber, basicPhoneCost}) => {
    var localTotal = 0
    var numberOfPhones = plansArray.reduce((accumulator, currentValue) => {
        return parseInt(accumulator) + parseInt(currentValue.numberOfPhones)
    },0)

    if (numberOfPhones < 1) {
        return 0
    } else if (numberOfPhones > 5) {
        numberOfPhones = 5
    }

    plansArray.forEach((i) => {
        if (autopay) {
            localTotal = localTotal + (i.numberOfPhones * i[numberOfPhones].autopay)
        } else if (!autopay) {
            localTotal = localTotal + (i.numberOfPhones * i[numberOfPhones].noAutopay)
        }
    })

    if (militaryNew || responderNew) {
        localTotal = localTotal - militaryResponderDiscountAmountNew[numberOfPhones]
    } else if (militaryOld || responderOld) {
        localTotal = localTotal - militaryResponderDiscountAmountOld[numberOfPhones]
    }

    localTotal = localTotal + (twoYearNumber * twoYearCost)

    localTotal = localTotal + (basicPhoneNumber * basicPhoneCost)

    numberOfPhones = 0

    return localTotal
})

const oldUnlimitedAndTieredMath = (({numberOfPhones, oldUnlimitedPlansArray, tieredPlansArray, chosenPlan, autopay, militaryNew, responderNew, discount, twoYearNumber, twoYearCost, basicPhoneNumber, basicPhoneCost}) => {
    if (numberOfPhones <= 0) {
        return 0
    }

    var localTotal = 0

    oldUnlimitedPlansArray.forEach((oldUnlimitedPlan) => {
        if (chosenPlan === oldUnlimitedPlan.name) {
            if (autopay) {
                localTotal += oldUnlimitedPlan.autopay
            } else if (!autopay) {
                localTotal += oldUnlimitedPlan.noAutopay
            }

            if (militaryNew || responderNew) {
                localTotal = localTotal * 0.85
            }
        }
    })

    tieredPlansArray.forEach((tieredPlan) => {
        if (chosenPlan === tieredPlan.name) {
            if (autopay) {
                localTotal = localTotal + tieredPlan.autopay
            } else if (!autopay) {
                localTotal = localTotal + tieredPlan.noAutopay
            }

            if (militaryNew || responderNew) {
                localTotal = localTotal * 0.85
            } else if (parseInt(discount) > 0) {
                localTotal = localTotal * (0.01 * (100 - parseInt(discount)))
            }
        }
    })

    localTotal = localTotal + (twoYearNumber * twoYearCost)

    localTotal = localTotal + (basicPhoneNumber * basicPhoneCost)

    return localTotal
})

const planTotal = ((state, getters) => {
    if (getters.isUnlimited) {
        var objectForMethod = {
            'plansArray': state.mixAndMatchPlans.plans,
            'autopay': state.autopay,
            'militaryNew': state.militaryNew,
            'militaryOld': state.militaryOld,
            'responderNew': state.responderNew,
            'responderOld': state.responderOld,
            'militaryResponderDiscountAmountNew': state.militaryResponderDiscountAmountNew,
            'militaryResponderDiscountAmountOld': state.militaryResponderDiscountAmountOld,
            'twoYearNumber': state.twoyear,
            'twoYearCost': 20,
            'basicPhoneNumber': state.basic,
            'basicPhoneCost': 30
        }
        return mixAndMatchPlanMath(objectForMethod)
    } else {
        var objectForMethod = {
            'numberOfPhones': parseInt(state.numberOfPhonesTieredAndOldUnlimited),
            'oldUnlimitedPlansArray': state.oldUnlimitedPlans,
            'tieredPlansArray': state.tieredPlans,
            'autopay': state.autopay,
            'militaryNew': state.militaryNew,
            'responderNew': state.responderNew,
            'discount': state.discount,
            'twoYearNumber': state.twoyear,
            'twoYearCost': 20,
            'basicPhoneNumber': state.basic,
            'basicPhoneCost': 30
        }
        return oldUnlimitedAndTieredMath(objectForMethod)
    }
})

export default planTotal