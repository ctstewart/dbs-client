const defaultState = () => {
	return {
		chosenPlan: "Unlimited",
		mixAndMatchPlans: {
			mixAndMatch3: [
				{
					id: "Get More 3.0",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 90, noAutopay: 100 },
					2: { lines: 2, autopay: 80, noAutopay: 90 },
					3: { lines: 3, autopay: 65, noAutopay: 75 },
					4: { lines: 4, autopay: 55, noAutopay: 65 },
					5: { lines: 5, autopay: 50, noAutopay: 60 }
				},
				{
					id: "Do More 3.0",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 80, noAutopay: 90 },
					2: { lines: 2, autopay: 70, noAutopay: 80 },
					3: { lines: 3, autopay: 55, noAutopay: 65 },
					4: { lines: 4, autopay: 45, noAutopay: 55 },
					5: { lines: 5, autopay: 40, noAutopay: 50 }
				},
				{
					id: "Play More 3.0",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 80, noAutopay: 90 },
					2: { lines: 2, autopay: 70, noAutopay: 80 },
					3: { lines: 3, autopay: 55, noAutopay: 65 },
					4: { lines: 4, autopay: 45, noAutopay: 55 },
					5: { lines: 5, autopay: 40, noAutopay: 50 }
				},
				{
					id: "Start 3.0",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 70, noAutopay: 80 },
					2: { lines: 2, autopay: 60, noAutopay: 70 },
					3: { lines: 3, autopay: 45, noAutopay: 55 },
					4: { lines: 4, autopay: 35, noAutopay: 45 },
					5: { lines: 5, autopay: 30, noAutopay: 40 }
				},
				{
					id: "Just Kids (New)",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 0, noAutopay: 0 },
					2: { lines: 2, autopay: 50, noAutopay: 60 },
					3: { lines: 3, autopay: 40, noAutopay: 50 },
					4: { lines: 4, autopay: 35, noAutopay: 45 },
					5: { lines: 5, autopay: 25, noAutopay: 35 }
				},
			],
			mixAndMatch2: [
				{
					id: "Get More",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 90, noAutopay: 100 },
					2: { lines: 2, autopay: 80, noAutopay: 90 },
					3: { lines: 3, autopay: 65, noAutopay: 75 },
					4: { lines: 4, autopay: 55, noAutopay: 65 },
					5: { lines: 5, autopay: 50, noAutopay: 60 }
				},
				{
					id: "Do More",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 80, noAutopay: 90 },
					2: { lines: 2, autopay: 70, noAutopay: 80 },
					3: { lines: 3, autopay: 55, noAutopay: 65 },
					4: { lines: 4, autopay: 45, noAutopay: 55 },
					5: { lines: 5, autopay: 40, noAutopay: 50 }
				},
				{
					id: "Play More",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 80, noAutopay: 90 },
					2: { lines: 2, autopay: 70, noAutopay: 80 },
					3: { lines: 3, autopay: 55, noAutopay: 65 },
					4: { lines: 4, autopay: 45, noAutopay: 55 },
					5: { lines: 5, autopay: 40, noAutopay: 50 }
				},
				{
					id: "Start",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 70, noAutopay: 80 },
					2: { lines: 2, autopay: 60, noAutopay: 70 },
					3: { lines: 3, autopay: 45, noAutopay: 55 },
					4: { lines: 4, autopay: 35, noAutopay: 45 },
					5: { lines: 5, autopay: 30, noAutopay: 40 }
				},
			],
			mixAndMatch1: [
				{
					id: "Above",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 95, noAutopay: 100 },
					2: { lines: 2, autopay: 90, noAutopay: 95 },
					3: { lines: 3, autopay: 70, noAutopay: 75 },
					4: { lines: 4, autopay: 60, noAutopay: 65 },
					5: { lines: 5, autopay: 60, noAutopay: 65 }
				},
				{
					id: "Beyond",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 85, noAutopay: 90 },
					2: { lines: 2, autopay: 80, noAutopay: 85 },
					3: { lines: 3, autopay: 60, noAutopay: 65 },
					4: { lines: 4, autopay: 50, noAutopay: 55 },
					5: { lines: 5, autopay: 50, noAutopay: 55 }
				},
				{
					id: "Go",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 75, noAutopay: 80 },
					2: { lines: 2, autopay: 65, noAutopay: 70 },
					3: { lines: 3, autopay: 50, noAutopay: 55 },
					4: { lines: 4, autopay: 40, noAutopay: 45 },
					5: { lines: 5, autopay: 40, noAutopay: 45 }
				},
				{
					id: "Just Kids (Old)",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 0, noAutopay: 0 },
					2: { lines: 2, autopay: 55, noAutopay: 60 },
					3: { lines: 3, autopay: 45, noAutopay: 50 },
					4: { lines: 4, autopay: 35, noAutopay: 40 },
					5: { lines: 5, autopay: 35, noAutopay: 40 }
				}
			],

			militaryResponderDiscountAmountNew: {
				1: 10,
				2: 25,
				3: 25,
				4: 20,
				5: 20
			},

			militaryResponderDiscountAmountOld: {
				1: 15,
				2: 35,
				3: 40,
				4: 40,
				5: 40
			},

			studentDiscount: {
				1: 10,
				2: 25,
				3: 0,
				4: 0,
				5: 0
			}
		},
		loyalty55MixAndMatch2020: {
			plans: [
				{
					id: "Get More",
					name: "Get More",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 90, noAutopay: 100 },
					2: { lines: 2, autopay: 80, noAutopay: 90 },
					3: { lines: 3, autopay: 65, noAutopay: 75 },
					4: { lines: 4, autopay: 55, noAutopay: 65 },
					5: { lines: 5, autopay: 50, noAutopay: 60 }
				},
				{
					id: "Do More",
					name: "Do More",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 80, noAutopay: 90 },
					2: { lines: 2, autopay: 70, noAutopay: 80 },
					3: { lines: 3, autopay: 55, noAutopay: 65 },
					4: { lines: 4, autopay: 45, noAutopay: 55 },
					5: { lines: 5, autopay: 40, noAutopay: 50 }
				},
				{
					id: "Play More",
					name: "Play More",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 80, noAutopay: 90 },
					2: { lines: 2, autopay: 70, noAutopay: 80 },
					3: { lines: 3, autopay: 55, noAutopay: 65 },
					4: { lines: 4, autopay: 45, noAutopay: 55 },
					5: { lines: 5, autopay: 40, noAutopay: 50 }
				},
				{
					id: "Start",
					name: "Start",
					numberOfPhones: 0,
					1: { lines: 1, autopay: 70, noAutopay: 80 },
					2: { lines: 2, autopay: 60, noAutopay: 70 },
					3: { lines: 3, autopay: 45, noAutopay: 55 },
					4: { lines: 4, autopay: 35, noAutopay: 45 },
					5: { lines: 5, autopay: 30, noAutopay: 40 },
				},
			],
			discount: {
				1: 10,
				2: 40,
				3: 25,
				4: 20,
				5: 20,
			}
		},
		loyalty55Plans: {
			1: { lines: 1, autopay: 60, noAutopay: 65 },
			2: { lines: 2, autopay: 80, noAutopay: 90 },
			3: { lines: 3, autopay: 110, noAutopay: 125 },
			4: { lines: 4, autopay: 120, noAutopay: 140 }
		},
		loyaltyGoPlans: {
			1: { lines: 1, autopay: 60, noAutopay: 65 },
			2: { lines: 2, autopay: 90, noAutopay: 100 },
			3: { lines: 3, autopay: 105, noAutopay: 120 },
			4: { lines: 4, autopay: 120, noAutopay: 140 },
			5: { lines: 5, autopay: 135, noAutopay: 160 },
			6: { lines: 6, autopay: 150, noAutopay: 180 }
		},
		oldUnlimitedPlans: [
			{ id: "$110 Unlimited", autopay: 100, noAutopay: 110 },
			{ id: "$65 Unlimited", autopay: 60, noAutopay: 65 }
		],
		plans5GB10GB: [
			{
				id: "5GB",
				name: "5GB",
				accountCost: 30,
				lineAccessAutopay: 25,
				lineAccessNoAutopay: 35,
				eligibleForDiscounts: false
			},
			{
				id: "10GB",
				name: "10GB",
				accountCost: 40,
				lineAccessAutopay: 25,
				lineAccessNoAutopay: 35,
				eligibleForDiscounts: true
			}
		],
		tieredPlans: [
			{ id: "24GB", autopay: 110, noAutopay: 110 },
			{ id: "16GB", autopay: 90, noAutopay: 90 },
			{ id: "12GB", autopay: 80, noAutopay: 80 },
			{ id: "8GB", autopay: 70, noAutopay: 70 },
			{ id: "5GB Single", autopay: 35, noAutopay: 40 },
			{ id: "4GB", autopay: 50, noAutopay: 50 },
			{ id: "2GB", autopay: 35, noAutopay: 35 }
		],
		twoyear: 0,
		basic: 0,
		connectedDevices: [
			{ id: "Tablet", tiered: 10, unlimited: 20, value: 0, halfOffEligible3: true, halfOffEligible2: true },
			{ id: "Tablet Unlimited Plus", tiered: 10, unlimited: 30, value: 0, halfOffEligible3: true, halfOffEligible2: true },
			{ id: "Jetpack", tiered: 10, unlimited: 20, value: 0, halfOffEligible3: true, halfOffEligible2: true },
			{ id: "Jetpack Unlimited Plus", tiered: 10, unlimited: 30, value: 0, halfOffEligible3: true, halfOffEligible2: true },
			{ id: "Hum+", tiered: 10, unlimited: 10, value: 0, halfOffEligible3: false, halfOffEligible2: false },
			{ id: "HumX", tiered: 15, unlimited: 20, value: 0, halfOffEligible3: true, halfOffEligible2: false },
			{ id: "Homephone", tiered: 20, unlimited: 20, value: 0, halfOffEligible3: false, halfOffEligible2: false },
			{ id: "Gizmo (grandfathered)", tiered: 5, unlimited: 5, value: 0, halfOffEligible3: false, halfOffEligible2: false },
			{ id: "Smartwatch", tiered: 10, unlimited: 10, value: 0, halfOffEligible3: true, halfOffEligible2: false },
			{ id: "Gizmo", tiered: 10, unlimited: 10, value: 0, halfOffEligible3: false, halfOffEligible2: false },
			{ id: "Arlo", tiered: 10, unlimited: 20, value: 0, halfOffEligible3: false, halfOffEligible2: false }
		],
		autopay: false,
		militaryNew: false,
		militaryOld: false,
		responderNew: false,
		responderOld: false,
		nurse: false,
		teacher: false,
		student: false,
		visaCard: false,
		lteHomeInternet: false,
		discount: 0,
		numberOfPhonesTieredAndOldUnlimited: 0,
		numberOfNewDevices: 0,
		tmp: 0,
		otherCost: 0,
		dppValues: [
			// { id: 'device-0', deviceName: '', fullRetail: 0, totalCredits: 0, dppLength: 24, dppLengthOptions: [24], editing: false }
		],
	};
};

export default defaultState;
