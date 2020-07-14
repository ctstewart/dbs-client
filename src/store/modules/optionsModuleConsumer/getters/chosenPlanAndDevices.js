const chosenPlanAndDevices = (state, getters) => {
	let answer = "";
	if (getters.isUnlimited) {
		state.mixAndMatchPlans.plans.forEach(plan => {
			if (plan.numberOfPhones > 0) {
				answer += `${plan.numberOfPhones} ${plan.id}, `;
			}
		});
	} else {
		answer += `${state.chosenPlan}, ${state.numberOfPhonesTieredAndOldUnlimited} phone, `;
	}

	if (state.basic > 0) {
		answer += `${state.basic} basic phone, `;
	}

	state.connectedDevices.forEach(device => {
		if (device.value > 0) {
			answer += `${device.value} ${device.id}, `;
		}
	});

	return answer.substring(0, answer.length - 2);
};

export default chosenPlanAndDevices;
