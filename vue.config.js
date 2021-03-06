module.exports = {
  // 关闭eslint检测
  lintOnSave: false,
  // devServer: {
  //   overlay: {
  //     warning: false,
  //     errors: false
  //   }
  // },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    // 生产模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main_prod.js')

      // config.set('externals', {
      //   vue: 'Vue',
      //   'vue-router': 'VueRouter',
      //   echarts: 'echarts'
      // })

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main.js')

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
  },
  devServer: {
    proxy: {
      // 请求api时要加上/api === http://localhost:4000/
      // /api/position/40.10038,116.36867 === http://localhost:4000/position/40.10038,116.36867
      '/hotList': {
        // 跳转目标请求地址
        target: 'https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/',
        // 允许跨域
        changeOrigin: true,
        // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.
        pathRewrite: {
          // ^ 代表target地址 后面的api代码请求的api
          '^/hotList': ''
        }
      },
      // 百度地图API请求
      '/bmap': {
        // 跳转目标请求地址
        target: 'http://api.map.baidu.com',
        // 允许跨域
        changeOrigin: true,
        // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.
        pathRewrite: {
          // ^ 代表target地址 后面的api代码请求的api
          '^/bmap': ''
        }
      }
    }
  }
}
