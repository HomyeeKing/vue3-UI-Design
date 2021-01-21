const express = require('express');
const { compilation } = require('webpack');
const webpack = require('webpack');
const app = express();

const config = require('./webpack.dev.config');
const compiler = webpack(config);

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: false,
	heartbeat: 200
});
const devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
});
console.log(compiler.plugin);

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(config.devServer.port, function() {
	console.log(
		`Your application is runnign here: http://localhost:${config.devServer.port}`
	);
});
