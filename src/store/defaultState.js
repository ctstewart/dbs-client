const state = () => {
	return {
		webappVersion: '2.4.0',
		userInfo: {
			email: '',
			firstName: '',
			lastName: '',
			admin: false,
			superAdmin: false,
			hasSeenNewChanges: true
		},
		userEmail: '',
		jwtExp: null,
		optionsType: {
			optionOne: 'consumer',
			optionTwo: 'consumer'
		}
	}
}

export default state
