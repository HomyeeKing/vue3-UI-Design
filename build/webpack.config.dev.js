const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.config.base');
const config = require('./config');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const utils = require('./utils');

const configuration = merge(commonConfig, {
	mode: config.mode,
	devtool: 'inline-source-map',
	entry: {
		app: utils.resolve('example/main'),
		vendors: ['vue', 'vue-router']
	},
	output: {
		path: utils.resolve('example/dist'),
		publicPath: config.assetsPublicPath,
		filename: '[name].js',
		// 非入口chunk文件名
		chunkFilename: '[name].chunk.js'
	},
	devServer: {
		host: config.devServer.host,
		port: config.devServer.port,
		open: config.devServer.autoOpenBrowser,
		overlay: config.devServer.overlay
			? { warnings: false, errors: true }
			: false,
		publicPath: '/',
		quiet: true,
		progress: true,
		compress: true,
		watchOptions: {
			poll: config.devServer.poll
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: utils.resolve('examples/index.html'),
			inject: true
		})
	]
});

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.devServer.port;
	portfinder.getPort((err, port) => {
		if (err) reject(err);
		else {
			// public the new Port, necessary for e2e test
			process.env.PORT = port;
			configuration.devServer.port = port;

			configuration.plugins.push(
				new FriendlyErrorsPlugin({
					compilationSuccessInfo: {
						messages: [
							`Your application is runnign here: http://${configuration.devServer.host}:${port}`
						]
					},
					onErrors: config.devServer.notifyOnErrors
						? utils.createNotifierCallback()
						: undefined
				})
			);

			resolve(configuration);
		}
	});
});
