const {merge} = require('webpack-merge');

const prodConfig = require('./prod');
const devConfig = require('./dev');
const utils = require('../utils');

const isProd = process.env.NODE_ENV === 'production';

const envConfig = isProd ? prodConfig : devConfig;

const resolve = utils.resolve;

const config = merge(
	{
		entry: {
			docs: resolve('doc/index.js'),
			'warriors-ui': resolve('index.js')
		},
		output: {
			assetPath: resolve('doc/dist'),
			library: 'warriors-ui',
			libraryTarget: 'umd',
			filename: 'warriors-ui.common.js'
		},
		alias: {
			main: resolve('src'),
			docs: resolve('docs')
		},
		/**
		 * @function 资源子目录 除了index.html，其余的js img css都分在这里
		 */
		assetsSubDirectory: 'static',
		/**
		 * @function 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
		 */
		externals: [
			{
				'better-scroll': {
					root: 'BScroll',
					commonjs: 'better-scroll',
					commonjs2: 'better-scroll',
					amd: 'better-scroll'
				}
			},
			/**
			 * 对于 webpack 外部化，通过定义函数来控制行为
			 * @param {string} context 包含引用的文件目录
			 * @param {string} request 被请求引入的路径
			 * @param {(err,result,type)=>{}} callback 用于指明模块如何被外部化的回调函数
			 */
			function(context, request, callback) {
				if (/^core-js/.test(request)) {
					return callback(null, request);
				}
				return callback();
			}
		]
	},
	envConfig
);
module.exports = config;
