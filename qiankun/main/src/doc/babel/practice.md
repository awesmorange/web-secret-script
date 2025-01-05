# 实际应用
尝试在项目中使用 Babel 进行代码转换，理解转换前后的代码差异。

当然，我会给出一个案例，展示如何在项目中使用 Babel 进行代码转换，并解释转换前后的代码差异。我们将创建一个简单的项目，使用一些现代 JavaScript 特性，然后用 Babel 转换它。
1. 设置项目
``` bash
mkdir babel-demo
cd babel-demo
npm init -y
```
2. 安装依赖
``` bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```
3. 配置 Babel
``` json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead",
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}
```
4. 创建源代码
``` javascript
// src/index.js

// 使用箭头函数
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

// 使用 let 和 const
let count = 0;
const MAX_COUNT = 5;

// 使用 for...of 循环
for (const num of [1, 2, 3]) {
  count += num;
}

// 使用 Promise
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
};

// 使用 async/await
const main = async () => {
  greet("World");
  console.log(`Count: ${count}`);
  const data = await fetchData();
  console.log(data);
};

main();
```
5. 转换代码
``` json
// package.json
"scripts": {
  "build": "babel src -d lib"
}
```
然后运行：
``` bash
npm run build
```
这将把 src 目录中的代码转换并输出到 lib 目录。
6. 查看转换后的代码
``` javascript
"use strict";

require("core-js/modules/es.promise.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.finally.js");
// ... 其他 polyfill 导入

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { /* ... */ }
function _asyncToGenerator(fn) { /* ... */ }

// 箭头函数被转换为普通函数
var greet = function greet(name) {
  console.log("Hello, ".concat(name, "!"));
};

// let 和 const 被转换为 var
var count = 0;
var MAX_COUNT = 5;

// for...of 循环被转换为普通 for 循环
for (var _i = 0, _arr = [1, 2, 3]; _i < _arr.length; _i++) {
  var num = _arr[_i];
  count += num;
}

// Promise 保持不变，因为我们使用了 polyfill
var fetchData = function fetchData() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      return resolve("Data fetched!");
    }, 1000);
  });
};

// async/await 被转换为使用 Promise 的形式
var main = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    greet("World");
    console.log("Count: ".concat(count));
    var data = yield fetchData();
    console.log(data);
  });

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

main();
```

## 代码差异解释
- Polyfill 导入：Babel 自动导入了必要的 polyfills，以确保代码在旧环境中也能运行。

- 箭头函数：所有的箭头函数都被转换为普通函数。

- let 和 const：这些声明被转换为 var，以兼容旧版本的 JavaScript。

- 模板字符串：被转换为使用 concat 方法的字符串连接。

- for...of 循环：被转换为传统的 for 循环。

- Promise：由于我们使用了 polyfill，Promise 本身没有被转换，但确保了在不支持 Promise 的环境中也能使用。

- async/await：被转换为使用 Promise 的等效代码，并使用了一个辅助函数 _asyncToGenerator

通过这个例子，你可以看到 Babel 如何将现代 JavaScript 代码转换为可以在旧环境中运行的代码。它不仅转换了语法（如箭头函数），还通过 polyfill 添加了缺失的功能（如 Promise）。这就是为什么 Babel 在开发现代 Web 应用时如此重要 —— 它允许我们使用最新的 JavaScript 特性，同时保持对旧浏览器的兼容性。

# 高级用法
学习如何编写自定义插件和预设，以满足特定的项目需求。
！！ 编写 Babel 插件需要对 AST（抽象语法树）有一定的了解。

## 案例1：创建一个插件，将所有的 console.log 调用转换为 console.info
1. 创建一个名为 babel-plugin-log-to-info.js 的文件。
这个插件做了以下工作：
- 检查是否是函数调用表达式。
- 检查被调用的是否是 console.log。
- 如果是，将 log 替换为 info。
``` javascript
module.exports = function({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        if (
          t.isMemberExpression(path.node.callee) &&
          t.isIdentifier(path.node.callee.object, { name: "console" }) &&
          t.isIdentifier(path.node.callee.property, { name: "log" })
        ) {
          path.node.callee.property = t.identifier("info");
        }
      }
    }
  };
};

```
2. 使用插件
``` json
{
  "plugins": ["./babel-plugin-console-info.js"]
}
```
3. 测试插件
创建一个测试文件 test.js：
```javascript
console.log("Hello, World!");
```
运行 Babel 转换后，输出将变为：
```javascript
console.info("Hello, World!");
```

## 案例2：创建自定义 Babel 预设
1. 创建一个名为 babel-preset-custom.js 的文件：
```javascript
module.exports = function() {
  return {
    plugins: [
      require('./babel-plugin-console-info'),
      require('@babel/plugin-proposal-optional-chaining'),
      require('@babel/plugin-proposal-nullish-coalescing-operator')
    ]
  };
};
```
这个预设包含了我们的自定义插件和两个常用的 Babel 插件。

2. 使用预设
在你的 .babelrc 文件中使用这个预设：
``` json
{
  "presets": ["./babel-preset-custom"]
}
```
3. 测试预设
创建测试文件 test.js
``` javascript
console.log("Hello, World!");

const obj = {
  foo: {
    bar: {
      baz: 42
    }
  }
};

const value = obj?.foo?.bar?.baz ?? "default";
```
运行 Babel 转换后，输出将类似于：
``` javascript
console.info("Hello, World!");

var _obj$foo, _obj$foo$bar;

const obj = {
  foo: {
    bar: {
      baz: 42
    }
  }
};
const value = (_obj$foo = obj === null || obj === void 0 ? void 0 : obj.foo) === null || _obj$foo === void 0 ? void 0 : (_obj$foo$bar = _obj$foo.bar) === null || _obj$foo$bar === void 0 ? void 0 : _obj$foo$bar.baz) !== null && (_obj$foo$bar = _obj$foo.bar) !== void 0 ? _obj$foo$bar : "default";
```

## 案例3：高级插件，自动为函数加性能日志
1. 创建一个名为 babel-plugin-performance-logger.js 的文件：
这个插件会在每个函数声明的开始添加一个性能计时器，并在函数结束时记录执行时间。
``` javascript
module.exports = function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path) {
        const { node } = path;
        
        // 创建性能测量代码
        const startTime = t.variableDeclaration("const", [
          t.variableDeclarator(
            t.identifier("startTime"),
            t.callExpression(
              t.memberExpression(t.identifier("performance"), t.identifier("now")),
              []
            )
          )
        ]);
        
        const endTime = t.variableDeclaration("const", [
          t.variableDeclarator(
            t.identifier("endTime"),
            t.callExpression(
              t.memberExpression(t.identifier("performance"), t.identifier("now")),
              []
            )
          )
        ]);
        
        const logStatement = t.expressionStatement(
          t.callExpression(
            t.memberExpression(t.identifier("console"), t.identifier("log")),
            [
              t.templateLiteral(
                [
                  t.templateElement({ raw: "Function " }),
                  t.templateElement({ raw: " took " }),
                  t.templateElement({ raw: "ms" }, true)
                ],
                [
                  t.identifier("name"),
                  t.binaryExpression(
                    "-",
                    t.identifier("endTime"),
                    t.identifier("startTime")
                  )
                ]
              )
            ]
          )
        );
        
        // 将性能测量代码插入到函数体的开始和结束
        node.body.body.unshift(startTime);
        node.body.body.push(endTime);
        node.body.body.push(logStatement);
      }
    }
  };
};
```
2. 使用插件
``` json
{
  "plugins": ["./babel-plugin-function-performance-log.js"]
}
```
3. 测试插件
``` javascript
// test.js
function exampleFunction() {
  console.log("Doing some work...");
}

exampleFunction();
```
babel 转换后：
``` javascript
function exampleFunction() {
  const startTime = performance.now();
  console.log("Doing some work...");
  const endTime = performance.now();
  console.log(`Function exampleFunction took ${endTime - startTime}ms`);
}

exampleFunction();
```

通过这些例子，你可以看到如何创建自定义的 Babel 插件和预设来满足特定的项目需求。插件可以用来转换代码、添加新的功能或优化现有代码，而预设则可以将多个插件和配置打包在一起，方便重用。

通过学习这些内容，你将能够熟练使用 Babel 来处理 JavaScript 代码的兼容性问题，并在现代 Web 开发中充分利用新的语言特性。

