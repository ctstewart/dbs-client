import mixAndMatchPlanMath from './mixAndMatchPlanMath'
import oldUnlimitedAndTieredPlanMath from './oldUnlimitedAndTieredPlanMath'

const planTotal = ((state, getters) => {
    var localTotal = 0

    // If Mix and Match Plan
    if (getters.isUnlimited) {
        var objectForMethod = {
            'plansArray': state.mixAndMatchPlans.plans,
            'autopay': state.autopay,
            'militaryNew': state.militaryNew,
            'militaryOld': state.militaryOld,
            'responderNew': state.responderNew,
            'responderOld': state.responderOld,
            'militaryResponderDiscountAmountNew': state.mixAndMatchPlans.militaryResponderDiscountAmountNew,
            'militaryResponderDiscountAmountOld': state.mixAndMatchPlans.militaryResponderDiscountAmountOld,
        }

        localTotal += mixAndMatchPlanMath(objectForMethod)
    
    // If Tiered or old Unlimited Plans
    } else {
        var objectForMethod = {
            'numberOfPhones': state.numberOfPhonesTieredAndOldUnlimited,
            'oldUnlimitedPlansArray': state.oldUnlimitedPlans,
            'tieredPlansArray': state.tieredPlans,
            'chosenPlan': state.chosenPlan,
            'autopay': state.autopay,
            'militaryNew': state.militaryNew,
            'responderNew': state.responderNew,
            'discount': state.discount,
        }

        localTotal += oldUnlimitedAndTieredPlanMath(objectForMethod)
    }

    localTotal += state.twoyear * 20
    localTotal += state.basic * 30

    return localTotal
})

export default planTotal