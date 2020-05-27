const total = (state, getters, rootState) => {
	if (rootState['benefitSheet'].taxPercent > 0) {
		return ((getters.planTotal + getters.tmpTotal) * (rootState['benefitSheet'].taxPercent + 1)) + getters.dppTotal
	} else {
		return getters.planTotal + getters.tmpTotal + getters.dppTotal
	}
}

export default total
