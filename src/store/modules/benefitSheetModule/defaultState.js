const defaultState = () => {
	return {
		benefits: ['', '', '', '', '', ''],
		oldPhoneBill: 0,
		oldHomeSolution: 0,
		optionOneTodayCost: 0,
		optionTwoTodayCost: 0,
		autocompleteOptions: [
			'Protection from Damage, Loss, Theft',
			'Advanced Setup',
			'Better Battery',
			'Better Camera',
			'Bigger Screen',
			'Higher Resolution',
			'Wireless Charging',
			'Vehicle Safety Service',
			'Vehicle Diagnostics',
			'Emergency Car Service',
			'Fantastic Customer Service',
			'Best Network Performance (RootMetrics)',
			'Most Reliable Network (RootMetrics)',
			'Unlimited Talk',
			'Unlimited Text',
			'Unlimited Data',
			'15GB High Speed Hotspot',
			'20GB High Speed Hotspot',
			'Keep Your Same Phone Number',
			'International Calling',
			'Disney+, Hulu, ESPN+'
		],
		taxPercent: 0,
		notes: [
			'',
			''
		],
		accordionStyle: false
	}
}

export default defaultState
