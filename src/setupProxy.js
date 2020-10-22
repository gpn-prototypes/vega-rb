const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function module(app) {
  if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_PROXY) {
    app.use(
      ['/graphql', '/files'],
      createProxyMiddleware({
        target: process.env.REACT_APP_PROXY,
        changeOrigin: true,
      }),
    );
  }
};
