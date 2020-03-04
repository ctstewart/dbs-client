const resetBenefitSheetAndOptions = ({dispatch, commit}) => {
	commit('benefitSheet/resetState')
	commit('consumer/optionOne/resetState')
	commit('business/optionOne/resetState')
	commit('consumer/optionTwo/resetState')
	commit('business/optionTwo/resetState')
}

const resetAll = ({dispatch, commit}) => {
	dispatch('resetBenefitSheetAndOptions')
	commit('resetState')
}

const actions = {
	resetBenefitSheetAndOptions,
	resetAll
}

export default actions