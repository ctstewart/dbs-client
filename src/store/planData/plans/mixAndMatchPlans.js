const mixAndMatchPlans = {
	plans: [
		{
			id: 'Start',
			numberOfPhones: 0,
			1: { lines: 1, autopay: 70, noAutopay: 80 },
			2: { lines: 2, autopay: 60, noAutopay: 70 },
			3: { lines: 3, autopay: 45, noAutopay: 55 },
			4: { lines: 4, autopay: 35, noAutopay: 45 },
			5: { lines: 5, autopay: 30, noAutopay: 40 }
		},
		{
			id: 'Play More',
			numberOfPhones: 0,
			1: { lines: 1, autopay: 80, noAutopay: 90 },
			2: { lines: 2, autopay: 70, noAutopay: 80 },
			3: { lines: 3, autopay: 55, noAutopay: 65 },
			4: { lines: 4, autopay: 45, noAutopay: 55 },
			5: { lines: 5, autopay: 40, noAutopay: 50 }
		},
		{
			id: 'Do More',
			numberOfPhones: 0,
			1: { lines: 1, autopay: 80, noAutopay: 90 },
			2: { lines: 2, autopay: 70, noAutopay: 80 },
			3: { lines: 3, autopay: 55, noAutopay: 65 },
			4: { lines: 4, autopay: 45, noAutopay: 55 },
			5: { lines: 5, autopay: 40, noAutopay: 50 }
		},
		{
			id: 'Get More',
			numberOfPhones: 0,
			1: { lines: 1, autopay: 90, noAutopay: 100 },
			2: { lines: 2, autopay: 80, noAutopay: 90 },
			3: { lines: 3, autopay: 65, noAutopay: 75 },
			4: { lines: 4, autopay: 55, noAutopay: 65 },
			5: { lines: 5, autopay: 50, noAutopay: 60 }
		},
		{
			id: 'Just Kids (New)',
			numberOfPhones: 0,
			1: { lines: 1, autopay: 0, noAutopay: 0 },
			2: { lines: 2, autopay: 50, noAutopay: 60 },
			3: { lines: 3, autopay: 40, noAutopay: 50 },
			4: { lines: 4, autopay: 35, noAutopay: 45 },
			5: { lines: 5, autopay: 25, noAutopay: 35 }
		},
		{
			id: 'Go',
			numberOfPhones: 0,
			1: { lines: 1, autopay: 75, noAutopay: 80 },
			2: { lines: 2, autopay: 65, noAutopay: 70 },
			3: { lines: 3, autopay: 50, noAutopay: 55 },
			4: { lines: 4, autopay: 40, noAutopay: 45 },
			5: { lines: 5, autopay: 40, noAutopay: 45 }
		},
		{
			id: 'Beyond',
			numberOfPhones: 0,
			1: { lines: 1, autopay: 85, noAutopay: 90 },
			2: { lines: 2, autopay: 80, noAutopay: 85 },
			3: { lines: 3, autopay: 60, noAutopay: 65 },
			4: { lines: 4, autopay: 50, noAutopay: 55 },
			5: { lines: 5, autopay: 50, noAutopay: 55 }
		},
		{
			id: 'Above',
			numberOfPhones: 0,
			1: { lines: 1, autopay: 95, noAutopay: 100 },
			2: { lines: 2, autopay: 90, noAutopay: 95 },
			3: { lines: 3, autopay: 70, noAutopay: 75 },
			4: { lines: 4, autopay: 60, noAutopay: 65 },
			5: { lines: 5, autopay: 60, noAutopay: 65 }
		},
		{
			id: 'Just Kids (Old)',
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
	}
}

export default mixAndMatchPlans;