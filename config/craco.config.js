const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, '../src'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@app(.*)$': '<rootDir>/../src$1',
      },
    },
  },
}
