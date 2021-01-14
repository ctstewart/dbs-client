const loyalty55MixAndMatch2020NumberOfPhonesAndId = (state) => {
	return state.loyalty55MixAndMatch2020.plans.map((plan) => {
		return {
			id: plan.id,
			numberOfPhones: plan.numberOfPhones
		}
	})
}

export default loyalty55MixAndMatch2020NumberOfPhonesAndId
