let path = require("path");



module.exports = {
    mode : 'development', //默认2种模式 production-生产 development-开发
    entry : './src/index.js', //入口
    output : {
        filename : "bundle.js", //打包后文件名
        path : path.resolve(__dirname,'dist'),// 必须是绝对路径
    }
}