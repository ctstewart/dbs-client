import mixAndMatchPlanMath from './mixAndMatchPlanMath'
import oldUnlimitedAndTieredPlanMath from './oldUnlimitedAndTieredPlanMath'
import loyaltyPlanMath from './loyaltyPlanMath'
import connectedDeviceMath from './connectedDeviceMath'

const planTotal = (state, getters) => {
	var localTotal = 0

	// If Mix and Match Plan
	if (getters.isUnlimited) {
		const objectForMethod = {
			'plansArray': state.mixAndMatchPlans.plans,
			'autopay': state.autopay,
			'militaryNew': state.militaryNew,
			'militaryOld': state.militaryOld,
			'responderNew': state.responderNew,
			'responderOld': state.responderOld,
			'militaryResponderDiscountAmountNew': state.mixAndMatchPlans.militaryResponderDiscountAmountNew,
			'militaryResponderDiscountAmountOld': state.mixAndMatchPlans.militaryResponderDiscountAmountOld
		}

		localTotal += mixAndMatchPlanMath(objectForMethod)
	
	} else if (state.chosenPlan === 'Loyalty') {
		const objectForMethod = {
			'numberOfPhones': state.numberOfPhonesTieredAndOldUnlimited,
			'loyaltyPlans': state.loyaltyPlans,
			'autopay': state.autopay,
		}

		localTotal += loyaltyPlanMath(objectForMethod)

	// If Tiered or old Unlimited Plans
	} else {
		const objectForMethod = {
			'numberOfPhones': state.numberOfPhonesTieredAndOldUnlimited,
			'oldUnlimitedPlansArray': state.oldUnlimitedPlans,
			'tieredPlansArray': state.tieredPlans,
			'chosenPlan': state.chosenPlan,
			'autopay': state.autopay,
			'militaryNew': state.militaryNew,
			'responderNew': state.responderNew,
			'discount': state.discount
		}

		localTotal += oldUnlimitedAndTieredPlanMath(objectForMethod)
	}

	localTotal += state.twoyear * 20

	if (state.militaryNew || state.militaryOld) {
		localTotal += state.basic * 30 * 0.85
	} else {
		localTotal += state.basic * 30
	}

	if (localTotal === 0) { return localTotal }

	const objectForConnectedDeviceMath = {
		'chosenPlan': state.chosenPlan,
		'isUnlimited': getters.isUnlimited,
		'mixAndMatchPlansArray': state.mixAndMatchPlans.plans,
		'connectedDevicesArray': state.connectedDevices,
		'oldUnlimitedPlansArray': state.oldUnlimitedPlans,
		'tieredPlansArray': state.tieredPlans,
		'militaryNew': state.militaryNew,
		'militaryOld': state.militaryOld
	}

	localTotal += connectedDeviceMath(objectForConnectedDeviceMath)

	return localTotal
}

export default planTotal
