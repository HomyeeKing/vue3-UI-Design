const path = require('path');

// 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** package 相关配置 */
const packageConfig = require('../package.json');

exports.createNotifierCallback = () => {
	const notifier = require('node-notifier');

	return (severity, errors) => {
		if (severity !== 'error') {
			return;
		}
		const error = errors[0];
		const filename = error.file && error.file.split('!').pop();

		notifier.notify({
			title: packageConfig.name,
			message: severity + ':' + error.name,
			subtitle: filename || '',
			icon: path.join(__dirname, 'logo.png')
		});
	};
};
exports.resolve = (dir) => path.join(__dirname, '..', dir);

exports.cssLoaders = function(options) {
	options = options || {};
	const cssLoader = {
		loader: 'css-loader',
		options: {
			sourceMap: options.sourceMap
		}
	};

	const postcssLoader = {
		loader: 'postcss-loader',
		options: {
			sourceMap: options.sourceMap
		}
	};

	// generate loader string to be used with extract text plugin
	function generateLoaders(loader, loaderOptions) {
		const loaders = [cssLoader, postcssLoader];
		if (loader) {
			loaders.push({
				loader: `${loader}-loader`,
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			});
		}

		if (options.extract) {
			loaders.splice(0, 0, MiniCssExtractPlugin.loader);
		} else {
			loaders.splice(0, 0, 'vue-style-loader');
		}
		return loaders;
	}
	return {
		css: generateLoaders(),
		postcss: generateLoaders(),
		scss: generateLoaders('sass', { indentedSyntax: true })
	};
};
exports.styleLoaders = function(options) {
	const output = [];
	const loaders = exports.cssLoaders(options);

	for (const extension in loaders) {
		const loader = loaders[extension];
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			use: loader
		});
	}
};
