# Babel 的核心组件
- @babel/core：Babel 的核心功能
- @babel/cli：命令行工具
- @babel/preset-env：智能预设，根据目标环境自动确定需要的插件
这三个核心组件共同工作，使得 Babel 能够高效地将现代 JavaScript 代码转换为向后兼容的版本，同时保持配置的灵活性和易用性。

## @babel/core：Babel 的核心功能
Babel 的核心功能，包括解析、转换和生成代码。
- 解析（Parsing）：将源代码转换为抽象语法树（AST）。
- 转换（Transformation）：遍历 AST 并应用各种转换。
- 生成（Generation）：将转换后的 AST 重新生成为 JavaScript 代码。
``` javascript
const babel = require('@babel/core');

const result = babel.transform('const x = () => {};', {
  presets: ['@babel/preset-env']
});

console.log(result.code);
// 输出: "var x = function x() {};"
```

## @babel/cli：命令行工具
@babel/cli 是 Babel 的命令行接口，允许你从终端编译文件。

主要功能：
- 编译文件或目录
- 监视文件变化并自动重新编译
- 输出到指定文件或目录

``` bash
# 编译单个文件
babel script.js --out-file script-compiled.js

# 编译整个目录
babel src --out-dir lib

# 监视文件变化
babel src --watch --out-dir lib
```

## @babel/preset-env：智能预设
@babel/preset-env 是一个智能预设，它可以根据指定的目标环境自动确定需要的 Babel 插件和 polyfills。

主要功能：
- 自动确定需要的语法转换和 polyfills
- 可以指定目标环境（如特定浏览器版本）
- 支持按需加载 polyfills

``` json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": { // 指定目标环境
        "edge": "17",
        "firefox": "60",
        "chrome": "67",
        "safari": "11.1"
      },
      "useBuiltIns": "usage", // "usage" 表示只加载用到的 polyfills
      "corejs": "3.6.5" // 指定了 core-js 的版本
    }]
  ]
}
```
使用 @babel/preset-env 可以大大简化 Babel 的配置过程，使得开发者不需要手动指定每个需要的插件，同时也能确保生成的代码只包含必要的转换和 polyfills，从而优化输出代码的大小。
