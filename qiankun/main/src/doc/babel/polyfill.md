# Polyfill 的使用
了解 @babel/polyfill 的作用和使用方法，以及如何按需加载 polyfill。
## @babel/polyfill 的作用
@babel/polyfill 是用来模拟完整的 ES2015+ 环境的一个工具。它主要做两件事：
- 提供新的全局对象，如 Promise、WeakMap 等。
- 修改现有的全局对象，添加新的方法，如 Array.from、Object.assign 等。
这使得你可以在旧版本的浏览器中使用这些新特性。

## 使用方法
1. 安装 @babel/polyfill
``` bash
npm install --save @babel/polyfill
```
2. 在代码中引入 @babel/polyfill
``` javascript
// 方式一：在你的入口文件顶部引入
// main.js
import '@babel/polyfill';
```
``` javascript
// webpack.config.js
// 方法二: 在 Webpack 的 entry 数组中添加
module.exports = {
  entry: ["@babel/polyfill", "./app/js"]
};
```
## 按需加载
全量引入 @babel/polyfill 会导致打包文件体积过大。为了优化，我们可以使用 @babel/reset-env 的 useBuiltIns 选项来实现按需加载。
1. 安装依赖
``` bash
npm install --save-dev @babel/preset-env
npm install --save core-js@3
```
2. 配置 .babelrc 文件 或 babel.config.js 文件
``` json
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage", //  "usage" 表示根据代码中实际使用的特性来按需引入 polyfill。
      "corejs": 3 // 指定使用 core-js 的版本 3
    }]
  ]
}
```
3. 移除全局引入
使用按需加载后，你应该移除之前全局引入 @babel/polyfill 的代码。
4. 实际效果
假设你的代码中使用了 Promise：
``` javascript
const p = new Promise((resolve, reject) => {
  resolve(1);
});
```
Babel 会自动引入 Promise 的 polyfill
``` javascript
import "core-js/modules/es.promise";
// 你的原始代码
const p = new Promise((resolve, reject) => {
  resolve(1);
});

```
