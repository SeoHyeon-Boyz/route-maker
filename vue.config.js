module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    // ? '/html/scan/location'
    ? '/html'
    : '/',
    devServer: {
      https: false
    }
}
