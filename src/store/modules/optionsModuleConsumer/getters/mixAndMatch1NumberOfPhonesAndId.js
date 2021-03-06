const mixAndMatch1NumberOfPhonesAndId = (state) => {
	return state.mixAndMatchPlans.mixAndMatch1.map((plan) => {
		return {
			id: plan.id,
			numberOfPhones: plan.numberOfPhones
		}
	})
}

export default mixAndMatch1NumberOfPhonesAndId
