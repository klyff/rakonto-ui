const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use('/api', createProxyMiddleware('/api', {
    target: 'http://129.213.25.223:8080',
    ws: true,
    onProxyReqWs: (preq, req, socket) => socket.on('error', function () {})
  }))

  app.use('/uploads', createProxyMiddleware('/uploads', {
    target: 'http://129.213.25.223:8080'
  }))
}
