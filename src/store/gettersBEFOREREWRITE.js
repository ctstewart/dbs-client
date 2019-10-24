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