const state = () => {
	return {
		webappVersion: "4.1.0",
		userInfo: {
			email: "",
			firstName: "",
			lastName: "",
			role: ""
		},
		optionsType: {
			optionOne: "consumer",
			optionTwo: "consumer"
		},
		devices: []
	};
};

export default state;
