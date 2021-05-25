const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api/ws', createProxyMiddleware({
    target: 'http://localhost:8080',
    ws: true
  }));

  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8080'
  }));
};