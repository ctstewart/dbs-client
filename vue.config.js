module.exports = {
	publicPath: '',
	devServer: {
		host: 'localhost',
		port: 3000,
		// proxy: process.env.API_URL
	},
	transpileDependencies: ['vuex-persist'],
}
