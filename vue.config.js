module.exports = {
  // 关闭语法检测
  lintOnSave: false,
  // vue.js里解决跨域问题
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.104.3.183:3000/', // 开发环境目标地址
        // target: 'http://127.0.0.1:8000/', // 开发环境目标地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 需要重写的地址
        }
      }
    }
  }
}
