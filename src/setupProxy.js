const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware ('/api/**', { target: 'https://quiet-plains-04151.herokuapp.com', changeOrigin: true }));
};