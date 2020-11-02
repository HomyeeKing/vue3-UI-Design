module.exports = {
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/src', '<rootDir>/packages', '<rootDir>/test'],
	// 指定类型文件用什么编译器处理
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\.js$': '"<rootDir>/node_modules/babel-jest"'
	},
	moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
	//收集测试覆盖率
	collectCoverage: true,
	collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
	coverageReporters: ['html', 'text-summary']
};
