const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use('/api', createProxyMiddleware('/api', {
    target: process.env.PROXY_TARGET || 'http://localhost:8080',
    changeOrigin: true,
    ws: true,
    onProxyReqWs: (preq, req, socket) => socket.on('error', function () { })
  }))
}
