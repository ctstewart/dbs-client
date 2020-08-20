const connectedDeviceMath = ({
	chosenPlan,
	isUnlimited,
	mixAndMatchPlansArray,
	connectedDevicesArray,
	oldUnlimitedPlansArray,
	tieredPlansArray,
	plans5GB10GBArray,
	militaryNew,
	militaryOld
}) => {
	let localTotal = 0

	// Checks if the current plan is unlimited
	if (isUnlimited) {
		let cdArray = JSON.parse(JSON.stringify(connectedDevicesArray))

		function compare(a, b) {
			const x = a.unlimited
			const y = b.unlimited

			let comparison = 0
			if (x > y) {
				comparison = -1
			} else if (x < y) {
				comparison = 1
			}
			return comparison
		}

		cdArray.sort(compare)

		// Finds out how many phones there are for the Do More and Get More plans
		let numberOfDoMoreAndGetMorePhones = 0
		mixAndMatchPlansArray.forEach((mixAndMatchPlan) => {
			if (mixAndMatchPlan.id === 'Do More' || mixAndMatchPlan.id === 'Get More' || mixAndMatchPlan.id === 'Do More 5G UW' || mixAndMatchPlan.id === 'Get More 5G UW') {
				numberOfDoMoreAndGetMorePhones += mixAndMatchPlan.numberOfPhones
			}
		})

		console.log(numberOfDoMoreAndGetMorePhones)

		let halfOffTotal = 0
		cdArray.forEach(i => {
			console.log(halfOffTotal)
			if (i.halfOffEligible === true && numberOfDoMoreAndGetMorePhones > 0) {
				if (numberOfDoMoreAndGetMorePhones > i.value) {
					halfOffTotal += i.value * i.unlimited * .5
					numberOfDoMoreAndGetMorePhones -= i.value
				} else if (numberOfDoMoreAndGetMorePhones <= i.value) {
					halfOffTotal += numberOfDoMoreAndGetMorePhones * i.unlimited * .5
					numberOfDoMoreAndGetMorePhones -= i.value
				}
			}
		})

		localTotal -= halfOffTotal

		// Multiplies the number of connected devices by the plan cost and adds it to the localTotal variable
		connectedDevicesArray.forEach((connectedDevice) => {
			localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
		})

		if (militaryNew || militaryOld) {
			localTotal = localTotal * 0.85
		}
	}

	if (chosenPlan === 'Loyalty 55+' || chosenPlan === 'Loyalty Go') {
		connectedDevicesArray.forEach((connectedDevice) => {
			localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
		})
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

	plans5GB10GBArray.forEach((plan) => {
		if (chosenPlan === plan.id) {
			connectedDevicesArray.forEach((connectedDevice) => {
				localTotal = localTotal + (connectedDevice.tiered * connectedDevice.value)
			})
		}
	})

	return localTotal
}

export default connectedDeviceMath
