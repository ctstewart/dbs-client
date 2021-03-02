const noCommonDiscount = (state) => {
	if (!state.militaryNew && !state.militaryOld && !state.responderNew && !state.responderOld && !state.nurse && !state.teacher) {
		return true
	} else {
		return false
	}
}

export default noCommonDiscount