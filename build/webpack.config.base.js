const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const config = require('./config');
const utils = require('./utils');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
function assetsPath(_path) {
	const assetsSubDirectory =
		process.env.NODE_ENV === 'production'
			? config.build.assetsSubDirectory
			: config.dev.assetsSubDirectory;
	return path.posix.join(assetsSubDirectory, _path);
}

const baseWebpackConfig = {
	output: {
		path: config.build.assetsRoot,
		publicPath: config.build.assetsPublicPath,
		library: 'ho-ui',
		libraryTarget: 'umd',
		filename: 'ho-ui.common.js'
	},
	resolve: {
		// 能够解析的扩展名，这样引用文件的时候就可以不加扩展名了
		extensions: ['.ts', '.js', '.tsx', '.vue', '.json'],
		alias: config.alias
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
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
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.(jsx?|babel|es6)$/,
				include: process.cwd(),
				exclude: /node_modules/,
				loader: 'babel-loader'
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
				test: /\.s[ac]ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							indentedSyntax: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	]
};

module.exports = baseWebpackConfig;
