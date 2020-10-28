module.exports = {
	mode: 'production',
	env: {
		NODE_ENV: 'production'
	},

	// sourcemap

	cssSourceMap: false,
	/**
	 * @function 控制是否生成以及如何生成sourcemap
	 */
	devtool: '#source-map'
};
