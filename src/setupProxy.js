const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'https://foodzone2020.herokuapp.com/',
      changeOrigin: true,
    })
  );
};