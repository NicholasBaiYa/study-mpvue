let path = require("path");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")


module.exports = {
    optimization: {   // 优化项目
        minimizer: [
            new OptimizeCSSAssetsPlugin({})     // css 的优化
        ]
    },
    devServer : { // 开发服务器的配置
        port : 3000,
        progress : true,
        contentBase : './dist',
        compress : true
    },
    mode : 'production', //默认2种模式 production-生产 development-开发
    entry : './src/index.js', //入口
    output : {
        filename : "bundle.[hash:8].js", //打包后文件名
        path : path.resolve(__dirname,'dist'),// 必须是绝对路径
    },
    plugins :[ // 数组格式 存放所有webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify:{
                removeAttributeQuotes: true,
                collapseWhitespace: true,              
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
              },
            canPrint: true
          }),
    ],
    module: { // 模块
        // loader
        rules: [ //规则
            // style-loader 把CSS插入到head中
            // css-loader 解析处理 @import 语法
            // loader的顺序从右向左执行 从下向上执行
            { 
                test: /\.css$/, 
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top'
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                     'css-loader',
                     'postcss-loader' // 添加浏览器前缀 
                    ]
            },

            // 可以处理less sass 等
            { 
                test: /\.less$/, 
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'
                        }
                    },
                     'css-loader',  // import 解析路径
                     'postcss-loader', // 添加浏览器前缀
                     'less-loader' // 把less -> css
                    ]
            },
        ]
    }
}