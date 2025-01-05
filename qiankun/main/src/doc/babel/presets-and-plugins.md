# 常用预设（presets）和插件（plugins）
了解常用的预设（如 @babel/preset-react）和插件，以及它们的作用。

## 常用预设（Presets）：

- @babel/preset-env
    作用：根据目标环境自动确定需要的 JavaScript 转换和 polyfills。 
    特点：智能预设，可以根据指定的浏览器版本来优化输出。

- @babel/preset-react 作用：转换 React 和 JSX 语法。 包含插件：@babel/plugin-syntax-jsx, @babel/plugin-transform-react-jsx 等。

- @babel/preset-typescript 作用：转换 TypeScript 代码为 JavaScript。 特点：不进行类型检查，仅负责转换。

- @babel/preset-flow 作用：移除 Flow 类型注解。

## 常用插件（Plugins）：

- @babel/plugin-transform-runtime 作用：重用 Babel 注入的辅助代码，以减少代码体积。

- @babel/plugin-proposal-class-properties 作用：支持类的静态属性和实例属性。

- @babel/plugin-proposal-object-rest-spread 作用：支持对象的扩展运算符和剩余参数。

- @babel/plugin-syntax-dynamic-import 作用：支持动态 import() 语法。

- babel-plugin-transform-react-remove-prop-types 作用：在生产环境中移除 React PropTypes，优化打包大小。

- @babel/plugin-transform-modules-commonjs 作用：将 ES6 模块转换为 CommonJS 模块。

- @babel/plugin-proposal-optional-chaining 作用：支持可选链操作符 (?.)。

- @babel/plugin-proposal-nullish-coalescing-operator 作用：支持空值合并操作符 (??)。

- @babel/plugin-transform-arrow-functions 作用：将箭头函数转换为普通函数。

- @babel/plugin-transform-async-to-generator 作用：将 async/await 语法转换为 generator 函数。

``` json
// 这个配置使用了 @babel/preset-env、@babel/preset-react 和 @babel/preset-typescript 预设，以及几个常用插件
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead",
      "useBuiltIns": "usage",
      "corejs": 3
    }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```
