const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use('/api', createProxyMiddleware('/api', {
    target: 'https://150.136.74.192:8080',
    changeOrigin: true,
    ws: true,
    onProxyReqWs: (preq, req, socket) => socket.on('error', function () {})
  }))

  app.use('/uploads', createProxyMiddleware('/uploads', {
    target: 'https://150.136.74.192:8080',
    changeOrigin: true
  }))
}
