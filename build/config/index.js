const utils = require('../utils');

const config = {
	dev: {
		cacheBusting: false,
		cssSourceMap: false,
		showEslintErrorsInOverlay: false,
		assetsSubDirectory: 'static',
		host: 'localhost',
		port: 3011,
		assetsPublicPath: '/',
		errorOverlay: true,
		poll: false
	},
	build: {
		productionSourceMap: false,
		assetsSubDirectory: 'static',
		assetsRoot: utils.resolve('lib'),
		assetsPublicPath: '/'
	},
	examples: {
		assetsRoot: utils.resolve('dist/examples'),
		assetsSubDirectory: ''
	},
	docsBuild: {
		index: utils.resolve('dist/index.html'),
		assetsRoot: utils.resolve('dist'),
		assetsSubDirectory: 'static',
		productionSourceMap: false,
		assetsPublicPath: '/'
	},
	alias: {
		vue: '@vue/runtime-dom',
		'@': utils.resolve('examples'),
		packages: utils.resolve('packages'),
		mixins: utils.resolve('src/common/mixins'),
		components: utils.resolve('src/components'),
		helper: utils.resolve('src/common/helper'),
		images: utils.resolve('src/assets/images'),
		dist: utils.resolve('dist'),
		flexible: utils.resolve('src/utils/flexible'),
		'color-picker': utils.resolve('src/components/color-picker')
	}
};
module.exports = config;
