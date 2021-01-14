import mixAndMatchPlanMath from './mixAndMatchPlanMath'
import plans5GB10GBMath from './plans5GB10GBMath'
import oldUnlimitedAndTieredPlanMath from './oldUnlimitedAndTieredPlanMath'
import loyalty55PlanMath from './loyalty55PlanMath'
import loyaltyGoPlanMath from './loyaltyGoPlanMath'
import loyalty55MixAndMatch2020PlanMath from './loyalty55MixAndMatch2020PlanMath'
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

	} else if (state.chosenPlan === 'loyalty55MixAndMatch2020') {
		const objectForMethod = {
			'plansArray': state.loyalty55MixAndMatch2020.plans,
			'autopay': state.autopay,
			'discount': state.loyalty55MixAndMatch2020.discount
		}

		localTotal += loyalty55MixAndMatch2020PlanMath(objectForMethod)

	} else if (state.chosenPlan === '5GB' || state.chosenPlan === '10GB') {
		const objectForMethod = {
			'numberOfPhones': state.numberOfPhonesTieredAndOldUnlimited,
			'plansArray': state.plans5GB10GB,
			'chosenPlan': state.chosenPlan,
			'autopay': state.autopay,
			'militaryNew': state.militaryNew,
			'responderNew': state.responderNew,
			'discount': state.discount
		}

		localTotal += plans5GB10GBMath(objectForMethod)

	} else if (state.chosenPlan === 'Loyalty 55+') {
		const objectForMethod = {
			'numberOfPhones': state.numberOfPhonesTieredAndOldUnlimited,
			'loyalty55Plans': state.loyalty55Plans,
			'autopay': state.autopay
		}

		localTotal += loyalty55PlanMath(objectForMethod)
	} else if (state.chosenPlan === 'Loyalty Go') {
		const objectForMethod = {
			'numberOfPhones': state.numberOfPhonesTieredAndOldUnlimited,
			'loyaltyGoPlans': state.loyaltyGoPlans,
			'autopay': state.autopay
		}

		localTotal += loyaltyGoPlanMath(objectForMethod)

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
		'loyalty55MixAndMatch2020PlansArray': state.loyalty55MixAndMatch2020.plans,
		'connectedDevicesArray': state.connectedDevices,
		'oldUnlimitedPlansArray': state.oldUnlimitedPlans,
		'tieredPlansArray': state.tieredPlans,
		'plans5GB10GBArray': state.plans5GB10GB,
		'militaryNew': state.militaryNew,
		'militaryOld': state.militaryOld
	}

	localTotal += connectedDeviceMath(objectForConnectedDeviceMath)

	return localTotal
}

export default planTotal
