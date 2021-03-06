const mixAndMatch3NumberOfPhonesAndId = (state) => {
	return state.mixAndMatchPlans.mixAndMatch3.map((plan) => {
		return {
			id: plan.id,
			numberOfPhones: plan.numberOfPhones
		}
	})
}

export default mixAndMatch3NumberOfPhonesAndId
