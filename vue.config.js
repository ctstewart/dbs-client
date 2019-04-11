module.exports = {
  publicPath: '',
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
