# Babel 与构建工具的集成
学习如何将 Babel 集成到 Webpack、Rollup 等构建工具中。
## 注意
- 确保你的 Babel 配置与项目需求相匹配。可能需要添加其他预设或插件，如 @babel/preset-react 用于 React 项目。
- 对于大型项目，考虑使用 babel.config.js 而不是 .babelrc，因为它提供了更多的灵活性。
- 在生产环境构建时，记得启用代码压缩和其他优化选项

## Webpack 中集成 Babel
1. 安装 Babel 和相关依赖
``` bash
npm install --save-dev babel-loader @babel/core @babel/preset-env webpack
```
2. 配置 webpack.config.js 文件
``` javascript
// 这个配置告诉 Webpack 使用 babel-loader 处理所有的 .js 文件（除了 node_modules 目录）
module.exports = {
  // ...其他 Webpack 配置
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```
3. 配置 .babelrc 或 babel.config.js 文件(可选)
如果你想将 Babel 配置从 Webpack 配置中分离出来，可以创建一个 .babelrc 文件
``` json
{
  "presets": ["@babel/preset-env"]
}
```
或者创建一个 babel.config.js 文件
``` javascript
module.exports = {
  presets: ['@babel/preset-env']
};
```
然后在 webpack.config.js 中简化 babel-loader 的配置：
``` javascript
// 简化 babel-loader 的配置
use: 'babel-loader'
```
## Rollup 中集成 Babel
1. 安装 Babel 和相关依赖
``` bash
npm install --save-dev rollup @rollup/plugin-babel @babel/core @babel/preset-env
```
2. 配置 rollup.config.js 文件
这个配置使用 @rollup/plugin-babel 插件来处理 JavaScript 文件。
``` javascript
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      exclude: 'node_modules/**'
    })
  ]
};
```
3. 配置 .babelrc 或 babel.config.js 文件(可选)
同样，你可以创建一个 .babelrc 文件来分离 Babel 配置：
``` json
{
  "presets": ["@babel/preset-env"]
}
```
或者创建一个 babel.config.js 文件：
``` javascript
module.exports = {
  presets: ['@babel/preset-env']
};
```
然后在 rollup.config.js 中简化 @rollup/plugin-babel 的配置：
``` javascript
import babel from '@rollup/plugin-babel';

export default {
  // ...其他配置
  plugins: [
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
    })
  ]
};
```
## Vite 中集成 Babel
Vite 是一个现代化的前端构建工具，它默认使用 esbuild 进行依赖预构建和 TypeScript 转译，而不是 Babel。在大多数现代 Web 开发项目中，Vite 的默认配置已经足够处理常见的 JavaScript 和 TypeScript 特性。集成 Babel 可能会增加构建复杂性和减慢构建速度，所以应该仔细权衡是否真的需要。如果你只需要转换 modern JavaScript 或 TypeScript，Vite 的内置功能通常就足够了。

1. 安装 Babel 和相关依赖
``` bash
npm install --save-dev @babel/core @babel/preset-env vite-plugin-babel
```
2. 配置 .babelrc 或 babel.config.js 文件
``` json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```
3. 配置 vite.config.js 文件
``` javascript
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [
    babel({
        // 这个配置告诉 Vite 使用 vite-plugin-babel 插件，并从 .babelrc 或 babel.config.js 文件中读取 Babel 配置。
      babelConfig: {
        babelrc: true,
        configFile: true,
      },
      filter: /\.js$/, // 只会对 .js 文件应用 Babel 转换
    })
  ]
});
```
