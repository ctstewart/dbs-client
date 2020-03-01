const connectedDeviceMath = ({
	chosenPlan,
	isUnlimited,
	mixAndMatchPlansArray,
	connectedDevicesArray,
	oldUnlimitedPlansArray,
	tieredPlansArray,
	militaryNew,
	militaryOld
}) => {
	var localTotal = 0

	// Checks if the current plan is unlimited
	if (isUnlimited) {
		// Finds out how many phones there are for the Do More and Get More plans
		var numberOfDoMoreAndGetMorePhones = 0
		mixAndMatchPlansArray.forEach((mixAndMatchPlan) => {
			if (mixAndMatchPlan.id === 'Do More' || mixAndMatchPlan.id === 'Get More') {
				numberOfDoMoreAndGetMorePhones += mixAndMatchPlan.numberOfPhones
			}
		})
		// Finds out how many tablets and jetpacks there are
		var numberOfTabletsAndJetpacks = 0
		connectedDevicesArray.forEach((connectedDevice) => {
			if (connectedDevice.id === 'Tablet' || connectedDevice.id === 'Jetpack') {
				numberOfTabletsAndJetpacks += connectedDevice.value
			}
		})
		// Subtracts the smaller amount between tablets + jetpacks and do more + get more multiplied it by 10 from the localTotal for the half-off line access cost
		localTotal -= Math.min(numberOfDoMoreAndGetMorePhones, numberOfTabletsAndJetpacks) * 10
		// Multiplies the number of connected devices by the plan cost and adds it to the localTotal variable
		connectedDevicesArray.forEach((connectedDevice) => {
			localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
		})

		if (militaryNew || militaryOld) {
			localTotal = localTotal * 0.85
		}
	}

	oldUnlimitedPlansArray.forEach((plan) => {
		if (chosenPlan === plan.id) {
			connectedDevicesArray.forEach((connectedDevice) => {
				localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
			})
		}
	})

	tieredPlansArray.forEach((plan) => {
		if (chosenPlan === plan.id) {
			connectedDevicesArray.forEach((connectedDevice) => {
				localTotal = localTotal + (connectedDevice.tiered * connectedDevice.value)
			})
		}
	})

	return localTotal
}

export default connectedDeviceMath
