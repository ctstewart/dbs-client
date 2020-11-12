const state = () => {
	return {
		webappVersion: "3.0.1",
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
