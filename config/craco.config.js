const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@app': path.resolve(__dirname, '../src'),
			'@components': path.resolve(__dirname, '../src/components'),
			'@containers': path.resolve(__dirname, '../src/containers'),
			'@styles': path.resolve(__dirname, '../src/styles'),
			'@assets': path.resolve(__dirname, '../src/assets'),
			'@images': path.resolve(__dirname, '../src/assets/images'),
			'@svgs': path.resolve(__dirname, '../src/assets/svgs'),
		},
	},
	jest: {
		configure: {
			moduleNameMapper: {
				'^@app(.*)$': '<rootDir>/../src$1',
				'^@components(.*)$': '<rootDir>/../src/components$1',
				'^@containers(.*)$': '<rootDir>/../src/containers$1',
				'^@styles(.*)$': '<rootDir>/../src/styles$1',
				'^@assets(.*)$': '<rootDir>/../src/assets$1',
				'^@images(.*)$': '<rootDir>/../src/assets/images$1',
				'^@svgs(.*)$': '<rootDir>/../src/assets/svgs$1'
			},
		},
	},
}
