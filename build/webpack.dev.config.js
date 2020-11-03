const { merge } = require('webpack-merge');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.config.base');
const config = require('./config');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const utils = require('./utils');

const configuration = merge(commonConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		app: utils.resolve('./src/main.ts'),
		vendors: ['vue', 'vue-router']
	},
	output: {
		path: utils.resolve('examples/dist'),
		publicPath: config.build.assetsPublicPath,
		filename: '[name].js',
		// 非入口chunk文件名
		chunkFilename: '[name].chunk.js'
	},
	devServer: {
		host: config.dev.host,
		port: config.dev.port,
		open: false,
		overlay: config.dev.errorOverlay
			? { warnings: false, errors: true }
			: false,
		publicPath: '/',
		quiet: true,
		progress: true,
		compress: true,
		watchOptions: {
			poll: config.dev.poll
		}
	},
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.dev.cssSourceMap,
			usePostCSS: true
		})
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
	portfinder.basePort = config.dev.port;
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
					onErrors: config.dev.notifyOnErrors
						? utils.createNotifierCallback()
						: undefined
				})
			);

			resolve(configuration);
		}
	});
});
