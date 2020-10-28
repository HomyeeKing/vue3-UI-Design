module.exports = {
	mode: 'development',
	assetsPublicPath: '/',
	// 普通对象 不是webpack devServer
	devServer: {
		host: 'localhost',
		prot: 3011,
		autoOpenBrowser: true,
		overlay: true,
		notifyOnErrors: true,
		poll: false //使用文件系统(file system)获取文件改动的通知devServer.watchOptions
	},
	env: {
		NODE_ENV: 'development'
	},
	cssSourceMap: false,
	devtool: '#source-map',

	notifyOnErrors: true, //跨平台错误提示
	cacheBusting: true //使缓存失效
};
