module.exports = {
  output: {
    // Serve the bundle from /static
    publicPath: '/static/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devServer: {
    hot: true,
    port: 4000,
    // Proxy everything besides the bundle to Shiny
    proxy: {
      '/': {
        target: 'http://localhost:3000'
      },
      '/websocket': {
        target: 'ws://localhost:3000',
        ws: true
      },
      '/autoreload': {
        target: 'ws://localhost:3000',
        ws: true
      }
    }
  }
}
