const defaultState = () => {
	return {
		chosenPlan: 'Business Unlimited',
		plans: [
			{
				id: 'Unlimited Basic Phone',
				numberOfPhones: 0,
				cost: 30
			},
			{
				id: 'Unlimited Essentials (min. 5 lines)',
				numberOfPhones: 0,
				cost: 35
			},
			{
				id: 'Unlimited $45 (min. 4 lines)',
				numberOfPhones: 0,
				cost: 45
			},
			{
				id: 'Unlimited $50 (min. 4 lines)',
				numberOfPhones: 0,
				cost: 50
			}
		],
		militaryDiscount: {
			isActive: false,
			amount: 5
		},
		twoYear: {
			numberOfPhones: 0,
			cost: 25
		},
		connectedDevices: [
			{ id: 'Tablet Essentials', cost: 30, numberOfDevices: 0 },
			{ id: 'Tablet', cost: 45, numberOfDevices: 0 },
			{ id: 'Jetpack', cost: 45, numberOfDevices: 0 },
			{ id: 'Hum+', cost: 10, numberOfDevices: 0 },
			{ id: 'HumX', cost: 35, numberOfDevices: 0 },
			{ id: 'Homephone', cost: 20, numberOfDevices: 0 },
			{ id: 'Gizmo (grandfathered)', cost: 5, numberOfDevices: 0 },
			{ id: 'Smartwatch/Gizmo', cost: 10, numberOfDevices: 0 },
			{ id: 'Arlo', cost: 45, numberOfDevices: 0 }
		],
		numberOfNewDevices: 0,
		tmp: 0,
		existingDPPValues: [],
		existingCreditValues: []
	}
}

export default defaultState
