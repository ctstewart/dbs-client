const chosenPlanAndDevices = (state, getters) => {
	let answer = "";

	state.plans.forEach(plan => {
		if (plan.numberOfPhones > 0) {
			answer += `${plan.numberOfPhones} ${plan.name}, `;
		}
	});

	state.connectedDevices.forEach(device => {
		if (device.numberOfDevices > 0) {
			answer += `${device.numberOfDevices} ${device.name}, `;
		}
	});

	return answer.substring(0, answer.length - 2);
};

export default chosenPlanAndDevices;
