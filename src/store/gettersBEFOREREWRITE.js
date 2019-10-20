const computedNumberOfPhones = (() => {
    var localTotal = 0

    if (state.chosenPlan === 'Unlimited') {
        state.mixAndMatchPlans.forEach((mixAndMatchPlan) => {
            localTotal = localTotal + mixAndMatchPlan.numberOfPhones
        })
        state.numberOfPhones = 0

    } else if (state.chosenPlan !== 'Unlimited') {
        state.mixAndMatchPlans.forEach((mixAndMatchPlan) => {
            mixAndMatchPlan.numberOfPhones = 0
        })
        localTotal = state.numberOfPhones

    }

    if (localTotal == null) {
        localTotal = 0
    }

    return localTotal
})

const mixAndMatchPlanMath = (({plansArray, autopay, militaryNew, militaryOld, responderNew, responderOld, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld, twoYearNumber, twoYearCost, basicPhoneNumber, basicPhoneCost}) => {
    var localTotal = 0
    var numberOfPhones = plansArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.numberOfPhones
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

const planTotal = ((state) => {
    if (state.chosenPlan === 'Unlimited') {
        var objectForMethod = {
            'numberOfPhones': state.numberOfPhones,
            'plansArray': state.mixAndMatchPlans.plans,
            'autopay': state.autopay,
            'militaryNew': state.militaryNew,
            'militaryOld': state.militaryOld,
            'responderNew': state.responderNew,
            'responderOld': state.responderOld,
            'militaryResponderDiscountAmountNew': state.militaryResponderDiscountAmountNew,
            'militaryResponderDiscountAmountOld': state.militaryResponderDiscountAmountOld,
            'twoYearNumber': state.twoyear.value,
            'twoYearCost': state.twoyear.cost,
            'basicPhoneNumber': state.basic.value,
            'basicPhoneCost': state.basic.cost
        }
        return mixAndMatchPlanMath(objectForMethod)
    } else {
        var objectForMethod = {
            'numberOfPhones': state.numberOfPhones,
            'oldUnlimitedPlansArray': state.oldUnlimitedPlans,
            'tieredPlansArray': state.tieredPlans,
            'autopay': state.autopay,
            'militaryNew': state.militaryNew,
            'responderNew': state.responderNew,
            'discount': state.discount,
            'twoYearNumber': state.twoyear.value,
            'twoYearCost': state.twoyear.cost,
            'basicPhoneNumber': state.basic.value,
            'basicPhoneCost': state.basic.cost
        }
        return oldUnlimitedAndTieredPlans(objectForMethod)
    }
})

const lineAccessTotal = ((state, getters) => {
    var localTotal = 0

    // Checks if the current plan is unlimited
    if (getters.isUnlimited) {
        // Finds out how many phones there are for the Do More and Get More plans
        var numberOfDoMoreAndGetMorePhones = 0;
        state.mixAndMatchPlans.plans.forEach((mixAndMatchPlan) => {
            if (mixAndMatchPlan.name === 'Do More' || mixAndMatchPlan.name === 'Get More') {
                numberOfDoMoreAndGetMorePhones += mixAndMatchPlan.numberOfPhones
            }
        })
        // Finds out how many tablets and jetpacks there are
        var numberOfTabletsAndJetpacks = 0;
        state.lineAccess.forEach((connectedDevice) => {
            if (connectedDevice.name === 'Tablet' || connectedDevice.name === 'Jetpack') {
                numberOfTabletsAndJetpacks += connectedDevice.value
            }
        })
        // Subtracts the smaller amount between tablets + jetpacks and do more + get more multiplied it by 10 from the localTotal for the half-off line access cost
        localTotal -= Math.min(numberOfDoMoreAndGetMorePhones, numberOfTabletsAndJetpacks) * 10
        // Multiplies the number of connected devices by the plan cost and adds it to the localTotal variable
        state.lineAccess.forEach((connectedDevice) => {
            localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
        })

        if (state.militaryNew || state.militaryOld) {
            localTotal = localTotal * 0.85
        }
    }

    state.oldUnlimitedPlans.forEach((plan) => {
        if (state.chosenPlan === plan.name) {
            state.lineAccess.forEach((connectedDevice) => {
                localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
            })
            localTotal = localTotal + (computedNumberOfPhones * 20)
        }
    })

    state.tieredPlans.forEach((plan) => {
        if (state.chosenPlan === plan.name) {
            state.lineAccess.forEach((connectedDevice) => {
                localTotal = localTotal + (connectedDevice.tiered * connectedDevice.value)
            })
            localTotal = localTotal + (computedNumberOfPhones * 20)
        }
    })

    return localTotal
})

const total = ((state, getters) => {
    return getters.planTotal

    /* if (this.isLoaded === false) {
            // console.log('Loading')
            return 'Loading'
        } else if (this.isLoaded === true) {
            // console.log('Loaded')
            this.saveToLocalStorage()
            this.saveTotalsToLocalStorage()

            if (this.computedNumberOfPhones <= 0) {
            return 'Add Phones'
            }

            return (this.planTotal + this.lineAccessTotal + this.tmpTotal + this.dppTotal).toFixed(2)

        } */
})

const isUnlimited = ((state) => {
    if (state.chosenPlan === 'Unlimited') {
        return true
    } else {
        return false
    }
})

export {
    computedNumberOfPhones,
    mixAndMatchPlanMath,
    oldUnlimitedAndTieredMath,
    planTotal,
    lineAccessTotal,
    total,
    isUnlimited
}