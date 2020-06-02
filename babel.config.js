const _ = require('lodash')

module.exports = api => {
  return (api.env('test')) ? {
    presets: [
      ["@babel/env", {
        targets: { node: 'current' }
      }],
      ["@babel/typescript", {
        isTSX: true,
        allExtensions: true,
      }],
    ],
    plugins: [
      // 'babel-plugin-rewire-ts',
    ]
  } : {
    presets: [
      ["@babel/env", {
        targets: { node: 'current' }
      }],
      ["@babel/typescript", {
        isTSX: true,
        allExtensions: true,
      }],
    ],
    plugins: [
      // '@babel/plugin-transform-runtime',
    ]
  }
}
