const state = () => {
	return {
		webappVersion: "3.1.0",
		newChangesDate: '11/19/2020',
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
