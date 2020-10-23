const state = () => {
	return {
		webappVersion: "2.8.0",
		userInfo: {
			email: "",
			firstName: "",
			lastName: "",
			role: ""
			// hasSeenNewChanges: true
		},
		optionsType: {
			optionOne: "consumer",
			optionTwo: "consumer"
		}
	};
};

export default state;
