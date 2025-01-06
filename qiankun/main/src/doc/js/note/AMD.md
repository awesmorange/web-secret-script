# 模块化开发概述
## 如果js文件很多，会产生两个重要的问题:

1. 无法通过引入文件确定js文件的依赖关系
2. 彼此的js文件里面的代码产生的冲突也无法查看。

``` html
// index.html
<script src='js/a.js'></script>
<script src='js/b.js'></script>
<script src='js/c.js'></script>
```
``` javascript
// a.js
let num = 1;
console.log(num);

// b.js
console.log(num);

// c.js
let num = 2;
console.log(num);

// 问题1：无法通过引入文件确定js文件的依赖关系（num会报错，已存在该变量）
```
## 闭包解决

1. 闭包会让垃圾回收机制失效，影响性能
2. 闭包无法进行相互依赖
3. 闭包可以避免冲突 √

## 模块化开发

函数编程-->闭包-->命名空间-->模块化编程（面向对象可以理解成深度的模块化）

1. 模块化开发可以避免冲突和依赖。
2. 可以更方便的使用别人的代码，想要什么功能，就加载什么模块（每个js文件就是一个独立的模块）
3. 模块化思想就是指将页面的内容的关联性分解成不同的且相互独立的模块进行开发，每个模块之间没有必然的联系，互不影响。
4. 大家必须以同样的方式编写模块，否则达不到预想的效果。（要用模块化都用模块化，用闭包都用闭包）-- 人情世故<_<
# 前端规范
## COMMONJS 规范
最早的规范，COMMONJS 最开始是 Mozilla 的工程师于 2009年开始的一个项目，他的目的释然浏览器之外的JavaScript也能够通过模块化的方式来开发和协作 -- Node.js (服务器端环境) Nodejs自带浏览器引擎

1. CommonJS 的规范中，每个Javascript 文件就是一个独立的模块
2. CommonJS 的规范中提出定义模块，调用模块，配置模块的方式方法
3. CommonJS 规范的主要使用场景是服务器端编程，所以采用同步加载模块的策略。不适合前端开发。
## AMD规范
AMD 是 Asynchronous Module Definition 的简称，，即“一步模块定义”，是从CommonJS讨论中诞生的

1. AMD优先照顾浏览器的模块加载场景，使用了异步加载和会掉的方式，浏览器端异步加载库Require.js实现的就是AMD规范。
2. 核心：学习AMD规范的核心就是使用require.js插件。
3. 学习规范的核心就是：定义模块，调用模块，配置模块
## CMD规范
CMD规范，全称 Common Module Definition，成为 通用模块加载规范。一般也是在浏览器端。浏览器端异步加载库Sea.js实现的就是CMD规范。（SeaJS的作者是前淘宝UED，现支付宝前端工程师玉伯）要去github自己下载使用

## 总结
commonJS（Node.js） -> AMD（Require.js）-> CMD（Sea.js）
# requireJS
RequireJS 是一个 JavaScript 文件和模块载入工具。他针对浏览器使用场景进行优化，并且也可以应用到其他 JavaScript 环境中。如Node.js

module: 模块的意义
```html
<script src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.min.js" defer async=true data-main="script/main.js"></script>
```
defer: 异步加载，不会阻塞后面的代码，ie兼容写法

async=true: 异步加载，不会阻塞后面的代码，标准浏览器写法

data-main: 默认的写法，不能修改，后面的main.js表示主入口文件，main.js名称可以修改。所有的js代码以这个文件为入口。

## 模块
### 定义模块
define 定义模块，接受第二个参数

第一个参数，必须是一个数组，指明改模块的依赖性

第二个参数是一个回调函数

一个文件就是一个模块，define只能出现一次
``` javascript
// effect.js
define([
    // 依赖
],()=>{
    let a = 0;
    return {
        num: a,
        tab: function() {
            // ...
            return 100
        }
    }
})
```
或者下面的写法
``` javascript
// effect.js
define([
    // 依赖
],()=>{
    let num = 0;
    function tab () {
            // ...
            return 100
        }
    return {
        num: num,
        tab: tab
    }
})
```

### 调用模块

require 调用模块，接受第二个参数

第一个参数，必须是一个数组，指明改模块的依赖性(表示要执行的模块)

第二个参数是一个回调函数

require 一个文件可以有多个，调用模块可以多个
``` javascript
// main.js
require(['effect'], (m1)=>{ // m1: 表示effect模块的返回值
console.log(m1.num) // 0

console.log(m1.tab()) // 100
})
```

### 优化写法
``` javascript
// effect.js
define([
    // 依赖
],()=>{
    return {
        num: 0,
        tab: !function() {
            // ...
            return 100
        }()
    }
})

// main.js
require(['effect'])
```
## 实战
