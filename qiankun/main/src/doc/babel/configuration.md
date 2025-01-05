# 配置文件
学习如何创建和配置 .babelrc 或 babel.config.js 文件。例如：

``` json
// 结构
{
  "presets": [], // 规则
  "plugins": [] // 插件
}
```

完整示例配置
``` bash
# 安装 Babel 和相关依赖
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/plugin-transform-react-jsx core-js@3 babel-plugin-transform-react-remove-prop-types
```
``` json
// 适用于使用 React 的现代 JavaScript 项目
{
  "presets": [
    [
      "@babel/preset-env", // 用于转换最新的 JavaScript 特性。
      {
        "targets": {
          "browsers": [">0.25%", "not ie 11", "not op_mini all"] // 指定目标浏览器，这里使用了 ">0.25%" 表示市场份额超过 0.25% 的浏览器，并排除了 IE11 和 Opera Mini。
        },
        "useBuiltIns": "usage", // 只引入用到的 polyfills。
        "corejs": 3 // 使用 core-js 3.x 版本。
      }
    ],
    "@babel/preset-react" // 用于转换 React 和 JSX 语法。
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties", // 支持类属性语法。
    "@babel/plugin-transform-runtime", // 避免重复注入辅助代码。
    [
      "@babel/plugin-transform-react-jsx", // 配置 JSX 转换
      {
        "runtime": "automatic" // 使用 "automatic" 运行时
      }
    ]
  ],
  "env": {
    "development": { // 开发环境
      "sourceMaps": "inline" // 启用内联 source maps
    },
    "production": { // 生产环境
      "plugins": [
        [
          "transform-react-remove-prop-types", // 移除 React PropTypes，优化打包大小
          {
            "removeImport": true
          }
        ]
      ]
    }
  }
}
```
