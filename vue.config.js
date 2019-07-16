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
  },
  pages: {
    'index': {
      entry: './src/index/main.js',
      template: 'public/index.html',
      title: 'Login'
    },
    'benefitSheet': {
      entry: './src/benefitSheet/main.js',
      template: 'public/index.html',
      title: 'Benefit Sheet'
    },
    'option1': {
      entry: './src/option1/main.js',
      template: 'public/index.html',
      title: 'Option 1'
    },
    'option2': {
      entry: './src/option2/main.js',
      template: 'public/index.html',
      title: 'Option 2'
    }
  }
}
