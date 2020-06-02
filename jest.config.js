const { resolve } = require('path')

module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: "test\/.*\\.spec\\.ts?$",
  moduleFileExtensions: ['js', 'ts', 'json'],
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  }
}
