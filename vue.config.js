const path = require('path')
const publicPath = process.env.NODE_ENV === 'production' ? '' : ''
const IS_PROD = ["production", "test"].includes(process.env.NODE_ENV);
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
module.exports = {
    // publicPath,
    productionSourceMap: false,
    lintOnSave: false, //关闭eslint规范
    configureWebpack() {
        return {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src')
                }
            }
        }
    },
    devServer: {
        disableHostCheck: true,
        // https: false,
        proxy: {
            '/aodi': {
                target: 'https://cs.jumizc.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/aodi': '/aodi'
                }
            }
        },
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: IS_PROD,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            //     sass: {
            //         data: `
            //       @import "~@/assets/css/common.scss";
            // `
            //     },
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 100,
                        // propList: ['*', '!font-size'],
                        propList: ["*"]
                            // 该项仅在使用 Circle 组件时需要
                            // 原因参见 https://github.com/youzan/vant/issues/1948
                            // selectorBlackList: ['van-circle__layer']
                    })
                ]
            }
        },
        // devServer 选项单独配置
        modules: false
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}