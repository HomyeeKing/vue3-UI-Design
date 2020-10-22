const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const path = require('path');

const config = require('./config');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.config.base');
// const vueLoaderConfig = require('./vue-loader.conf');

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'prodution';

function assetsPath(_path) {
	const assetsSubDirectory = config.assetsSubDirectory;
	return path.posix.join(assetsSubDirectory, _path);
}

const docWebpackConfig = merge(baseWebpackConfig, {
	mode: env,
	entry: {
		docs: [config.entry.docs]
	},
	devtool: config.devtool,
	plugins: [
		new HtmlWebpackPlugin({
			template: 'docs/index.html',
			filename: 'index.html',
			inject: true
		}),
		new HtmlWebpackPlugin({
			template: 'docs/index.html',
			filename: 'demo.html',
			inject: true
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../docs/static'),
				to: 'static/assets',
				ignore: ['.*']
			}
		])
	],
	resolve: {
		alias: {
			'@warriors-ui': path.resolve(__dirname, '../packages')
		}
	}
});
let devDocWebpackConfig = docWebpackConfig;
let prodDocWebpackConfig = docWebpackConfig;

if (isDev) {
	const styleLoaders = utils.styleLoaders({ sourceMap: config.cssSourceMap });
	devDocWebpackConfig = merge(devDocWebpackConfig, {
		output: {
			path: config.output.assetsPath,
			publicPath: '/',
			filename: '[name].js'
		},
		devServer: {
			clientLogLevel: 'warning',
			hot: true,
			contentBase: false,
			disableHostCheck: true,
			/**一切服务采用gzip压缩 */
			compress: true,
			host: config.devServer.host,
			port: config.devServer.port,
			open: config.devServer.autoOpenBrowser,
			overlay: config.devServer.overlay
				? { warnings: false, errors: true }
				: false,
			publicPath: config.assetsPublicPath,
			/**启用 devServer.quiet 后，除了初始启动信息外，什么都不会写入控制台。 这也意味着来自webpack的错误或警告是不可见的。 */
			quiet: true,
			watchOptions: {
				poll: config.devServer.poll
			}
		},
		plugins: [new webpack.HotModuleReplacementPlugin()],
		module: {
			rules: [...styleLoaders]
		},
		optimization: {
			moduleIds: 'named'
		}
	});
}

if (isProd) {
	const styleLoaders = utils.styleLoaders({
		sourceMap: config.cssSourceMap,
		extract: true
	});
	prodDocWebpackConfig = merge(docWebpackConfig, {
		output: {
			path: config.output.assetPath,
			publicPath: '/warriors-ui',
			filename: assetsPath('js/[name].[chunkhash].js'),
			chunkFilename: assetsPath('js/[id].[chunkhash].js')
		},
		externals: {
			vue: 'Vue',
			'vue-router': 'VueRouter'
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: assetsPath('css/[name].[contenthash:7].css'),
				allChunks: true
			})
		],
		module: {
			rules: [...styleLoaders]
		}
	});
}

const devConfigWrapper = (devConfig) =>
	new Promise((resolve, reject) => {
		portfinder.basePort = config.devServer.port;
		portfinder.getPort((err, port) => {
			if (err) reject(err);
			else {
				devConfig.devServer.port = port;

				devConfig.plugins.push(
					new FriendlyErrorsPlugin({
						compilationSuccessInfo: {
							messages: [
								`The Sharp UI Preview is running at : http://${devConfig.devServer.host}:${port}`
							]
						},
						onErrors: config.notifyOnErrors
							? utils.createNotifierCallback()
							: null
					})
				);
				resolve(devConfig);
			}
		});
	});

module.exports = isProd
	? prodDocWebpackConfig
	: devConfigWrapper(devDocWebpackConfig);
