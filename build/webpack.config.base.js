const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config');
const utils = require('./utils');
const vueLoaderConfig = require('./vue-loader.conf');

function assetsPath(_path) {
	const assetsSubDirectory = config.assetsSubDirectory;
	return path.posix.join(assetsSubDirectory, _path);
}

const baseWebpackConfig = {
	resolve: {
        // 能够解析的扩展名，这样引用文件的时候就可以不加扩展名了
		extensions: ['.js', '.vue', '.json'],
		alias: config.alias
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [
					utils.resolve('src'),
					utils.resolve('docs'),
					utils.resolve('node_modules/webpack-dev-server/client')
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				exclude: [utils.resolve('src/components/icon/src/svg')],
				options: {
					limit: 10000,
					name: assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: assetsPath('fonts/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.sass$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							indentedSyntax: true,
							// sass-loader version >= 8
							sassOptions: {
								indentedSyntax: true
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env': config.env
		})
	],
	node: {
		setImmediate: false,
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
};

module.exports = baseWebpackConfig;
