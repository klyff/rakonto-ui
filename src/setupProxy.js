const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use('/api', createProxyMiddleware('/api', {
    target: 'http://localhost:8080',
    ws: true,
    onProxyReqWs: (preq, req, socket) => socket.on('error', function () {})
  }))

  app.use('/uploads', createProxyMiddleware('/uploads', {
    target: 'http://localhost:8080'
  }))
}
