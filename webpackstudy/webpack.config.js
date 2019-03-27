let path = require("path");
let HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    devServer : {
        port : 3000,
        progress : true,
        contentBase : './dist',
        compress : true
    },
    mode : 'development', //默认2种模式 production-生产 development-开发
    entry : './src/index.js', //入口
    output : {
        filename : "bundle.[hash:8].js", //打包后文件名
        path : path.resolve(__dirname,'dist'),// 必须是绝对路径
    },
    plugins :[ // 数组 存放所有webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify:{
                removeAttributeQuotes: true,
                collapseWhitespace: true,
               
            },
            hash: true
        })
    ],
    module: { // 模块
        // loader
        rules: [ //规则
            // style-loader 把CSS插入到head中
            // css-loader 解析处理 @import 语法
            { 
                test: /\.css$/, 
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'
                        }
                    },
                     'css-loader'
                    ]
            },
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
                     'less-loader' // 把less -> css
                    ]
            },
        ]
    }
}