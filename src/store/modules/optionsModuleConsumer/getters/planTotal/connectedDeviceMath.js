const connectedDeviceMath = ({
	chosenPlan,
	isUnlimited,
	mixAndMatchPlansArray,
	loyalty55MixAndMatch2020PlansArray,
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

		let numberOfDoMoreAndGetMorePhones = 0
		mixAndMatchPlansArray.forEach((mixAndMatchPlan) => {
			if (mixAndMatchPlan.id === 'Do More' || mixAndMatchPlan.id === 'Get More') {
				numberOfDoMoreAndGetMorePhones += mixAndMatchPlan.numberOfPhones
			}
		})

		// console.log(`Number of Do More and Get More phones is ${numberOfDoMoreAndGetMorePhones}`)

		let halfOffTotal = 0
		cdArray.forEach(i => {
			if (i.halfOffEligible2 === true && numberOfDoMoreAndGetMorePhones > 0 && i.value > 0) {
				let numberOfDevices = i.value
				if (numberOfDoMoreAndGetMorePhones > i.value) {
					// console.log(`This is taking ${i.value * i.unlimited * 0.5} off of a ${i.id}`)
					halfOffTotal += i.value * i.unlimited * 0.5
					i.value = 0
					numberOfDoMoreAndGetMorePhones -= numberOfDevices
					// console.log(`The number of discounts left is ${numberOfDoMoreAndGetMorePhones}`)
				} else if (numberOfDoMoreAndGetMorePhones <= i.value) {
					// console.log(`This is taking ${numberOfDoMoreAndGetMorePhones * i.unlimited * 0.5} off of a ${i.id}`)
					halfOffTotal += numberOfDoMoreAndGetMorePhones * i.unlimited * 0.5
					i.value -= numberOfDoMoreAndGetMorePhones
					numberOfDoMoreAndGetMorePhones -= numberOfDevices
					// console.log(`The number of discounts left is ${numberOfDoMoreAndGetMorePhones}`)
				}
			}
		})

		numberOfDoMoreAndGetMorePhones = 0
		mixAndMatchPlansArray.forEach((mixAndMatchPlan) => {
			if (mixAndMatchPlan.id === 'Do More 3.0' || mixAndMatchPlan.id === 'Get More 3.0') {
				numberOfDoMoreAndGetMorePhones += mixAndMatchPlan.numberOfPhones
			}
		})

		// console.log(`Number of Do More 3.0 and Get More 3.0 phones is ${numberOfDoMoreAndGetMorePhones}`)

		cdArray.forEach(i => {
			if (i.halfOffEligible3 === true && numberOfDoMoreAndGetMorePhones > 0 && i.value > 0) {
				let numberOfDevices = i.value
				if (numberOfDoMoreAndGetMorePhones > i.value) {
					// console.log(`This is taking ${i.value * i.unlimited * 0.5} off of a ${i.id}`)
					halfOffTotal += i.value * i.unlimited * 0.5
					i.value = 0
					numberOfDoMoreAndGetMorePhones -= numberOfDevices
				} else if (numberOfDoMoreAndGetMorePhones <= i.value) {
					// console.log(`This is taking ${numberOfDoMoreAndGetMorePhones * i.unlimited * 0.5} off of a ${i.id}`)
					halfOffTotal += numberOfDoMoreAndGetMorePhones * i.unlimited * 0.5
					i.value -= numberOfDoMoreAndGetMorePhones
					numberOfDoMoreAndGetMorePhones -= numberOfDevices
				}
				// console.log(`The number of discounts left is ${numberOfDoMoreAndGetMorePhones}`)
			}
		})

		localTotal -= halfOffTotal

		// console.log('-----------------------------------------------------')

		// Multiplies the number of connected devices by the plan cost and adds it to the localTotal variable
		connectedDevicesArray.forEach((connectedDevice) => {
			localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
		})

		if (militaryNew || militaryOld) {
			localTotal = localTotal * 0.85
		}
	}

	if (chosenPlan === 'loyalty55MixAndMatch2020') {
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

		let numberOfDoMoreAndGetMorePhones = 0
		loyalty55MixAndMatch2020PlansArray.forEach((mixAndMatchPlan) => {
			if (mixAndMatchPlan.id === 'Do More' || mixAndMatchPlan.id === 'Get More') {
				numberOfDoMoreAndGetMorePhones += mixAndMatchPlan.numberOfPhones
			}
		})

		// console.log(`Number of Do More and Get More phones is ${numberOfDoMoreAndGetMorePhones}`)

		let halfOffTotal = 0
		cdArray.forEach(i => {
			if (i.halfOffEligible3 === true && numberOfDoMoreAndGetMorePhones > 0 && i.value > 0) {
				let numberOfDevices = i.value
				if (numberOfDoMoreAndGetMorePhones > i.value) {
					// console.log(`This is taking ${i.value * i.unlimited * 0.5} off of a ${i.id}`)
					halfOffTotal += i.value * i.unlimited * 0.5
					i.value = 0
					numberOfDoMoreAndGetMorePhones -= numberOfDevices
				} else if (numberOfDoMoreAndGetMorePhones <= i.value) {
					// console.log(`This is taking ${numberOfDoMoreAndGetMorePhones * i.unlimited * 0.5} off of a ${i.id}`)
					halfOffTotal += numberOfDoMoreAndGetMorePhones * i.unlimited * 0.5
					i.value -= numberOfDoMoreAndGetMorePhones
					numberOfDoMoreAndGetMorePhones -= numberOfDevices
				}
				// console.log(`The number of discounts left is ${numberOfDoMoreAndGetMorePhones}`)
			}
		})

		localTotal -= halfOffTotal

		// console.log('-----------------------------------------------------')

		// Multiplies the number of connected devices by the plan cost and adds it to the localTotal variable
		connectedDevicesArray.forEach((connectedDevice) => {
			localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
		})

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
