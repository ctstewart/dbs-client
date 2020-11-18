const state = () => {
	return {
		webappVersion: "3.0.2",
		userInfo: {
			email: "",
			firstName: "",
			lastName: "",
			role: "",
		},
		optionsType: {
			optionOne: "consumer",
			optionTwo: "consumer"
		},
		devices: []
	};
};

export default state;
