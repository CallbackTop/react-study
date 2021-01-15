const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', { // 请求前缀
      target: 'http://localhost:5000', // 目标代理地址
      changeOrigin: true, // 将请求头中的 host 设置为 target
      pathRewrite: {'^/api': ''}, // url 重写，将请求前缀去掉
    }),
  )
}