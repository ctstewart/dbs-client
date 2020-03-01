const total = (state, getters) => {
	return getters.planTotal + getters.tmpTotal + getters.dppTotal
}

export default total
