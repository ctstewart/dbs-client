module.exports = {
  publicPath: '',
  outputDir: process.env.NODE_ENV === 'production'
  ? '../public'
  : './dist',
  devServer: {
    host: '0.0.0.0',
    https: true,
    port: process.env.DEV_SERVER_PORT,
    public: process.env.DEV_SERVER_PUBLIC,
    proxy: process.env.API_URL
  }
}
