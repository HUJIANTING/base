const path = require('path')// 引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}

module.exports = {
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('views', resolve('./src/views'))
      .set('assets', resolve('./src/assets'))
      .set('api', resolve('./src/api'))
      .set('utils', resolve('./src/utils'))
      .set('store', resolve('./src/store'))
      .set('plugins', resolve('./src/components/plugins'))
      .set('directive', resolve('./src/components/directive'))
      .set('mixin', resolve('./src/components/mixin'))
    // set第一个参数：设置的别名，第二个参数：设置的路径
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://106.53.138.72:8765',
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/auth': {
        target: 'http://106.53.138.72:8765',
        // target: 'http://192.168.0.37:8765', // 石全
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/app': {
        target: 'http://106.53.138.72:8765',
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/app': '/app'
        }
      },
      '/web': {
        target: 'http://106.53.138.72:8765',
        // target: 'http://192.168.0.37:8765', // 石全
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/web': '/web'
        }
      }
    }
  },
  productionSourceMap: false

}
