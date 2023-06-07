const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "member-service",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URL_MEMBER,
      changeOrigin: true,
    })
  );
};
