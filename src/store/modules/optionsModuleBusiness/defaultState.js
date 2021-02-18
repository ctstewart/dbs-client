const defaultState = () => {
	return {
		chosenPlan: 'Business Unlimited',
		plans: [
			{
				id: 'start2020',
				name: 'Start',
				numberOfPhones: 0,
				1: { lines: 1, autopay: 70, noAutopay: 75 },
				2: { lines: 2, autopay: 60, noAutopay: 65 },
				3: { lines: 3, autopay: 45, noAutopay: 50 },
				4: { lines: 4, autopay: 35, noAutopay: 40 },
				5: { lines: 5, autopay: 30, noAutopay: 35 },
			},
			{
				id: 'plus2020',
				name: 'Plus',
				numberOfPhones: 0,
				1: { lines: 1, autopay: 80, noAutopay: 85 },
				2: { lines: 2, autopay: 65, noAutopay: 70 },
				3: { lines: 3, autopay: 50, noAutopay: 55 },
				4: { lines: 4, autopay: 45, noAutopay: 50 },
				5: { lines: 5, autopay: 40, noAutopay: 45 },
			},
			{
				id: 'pro2020',
				name: 'Pro',
				numberOfPhones: 0,
				1: { lines: 1, autopay: 95, noAutopay: 100 },
				2: { lines: 2, autopay: 80, noAutopay: 85 },
				3: { lines: 3, autopay: 70, noAutopay: 75 },
				4: { lines: 4, autopay: 60, noAutopay: 65 },
				5: { lines: 5, autopay: 50, noAutopay: 55 },
			},
			{
				id: 'Unlimited Basic Phone',
				name: 'Unlimited Basic Phone',
				numberOfPhones: 0,
				cost: 30
			},
			{
				id: 'Unlimited Essentials (min. 5 lines)',
				name: 'Unlimited Essentials (min. 5 lines)',
				numberOfPhones: 0,
				cost: 35
			},
			{
				id: 'Unlimited $45 (min. 4 lines)',
				name: 'Unlimited $45 (min. 4 lines)',
				numberOfPhones: 0,
				cost: 45
			},
			{
				id: 'Unlimited $50 (min. 4 lines)',
				name: 'Unlimited $50 (min. 4 lines)',
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
			{ id: 'tabletStart2021', name: 'Tablet Start', cost: 30, numberOfDevices: 0, qualifiesFor2020Discount: false },
			{ id: 'tabletPro2021', name: 'Tablet Pro', cost: 40, numberOfDevices: 0, qualifiesFor2020Discount: true },
			{ id: 'tabletEssentials2020', name: 'Tablet Essentials (Old $30)', cost: 30, numberOfDevices: 0 },
			{ id: 'tablet2020', name: 'Tablet (Old $45)', cost: 45, numberOfDevices: 0 },
			{ id: 'jetpack', name: 'Jetpack', cost: 45, numberOfDevices: 0 },
			{ id: 'hum+', name: 'Hum+', cost: 10, numberOfDevices: 0 },
			{ id: 'humX', name: 'HumX', cost: 35, numberOfDevices: 0 },
			{ id: 'homephone', name: 'Homephone', cost: 20, numberOfDevices: 0 },
			{ id: 'gizmoGrandfathered', name: 'Gizmo (grandfathered)', cost: 5, numberOfDevices: 0 },
			{ id: 'smartwatchGizmo', name: 'Smartwatch/Gizmo', cost: 10, numberOfDevices: 0 },
			{ id: 'arlo', name: 'Arlo', cost: 45, numberOfDevices: 0 },
		],
		numberOfNewDevices: 0,
		tmp: 0,
		autopay: false,
		existingDPPValues: [],
		existingCreditValues: []
	}
}

export default defaultState
