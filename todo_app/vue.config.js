const path = require("path");

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  outputDir: path.resolve(__dirname, "../wwwroot"),
  devServer: {
    proxy: 'http://localhost:5000'
  },
}
