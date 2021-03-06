const mixAndMatch2NumberOfPhonesAndId = (state) => {
	return state.mixAndMatchPlans.mixAndMatch2.map((plan) => {
		return {
			id: plan.id,
			numberOfPhones: plan.numberOfPhones
		}
	})
}

export default mixAndMatch2NumberOfPhonesAndId
