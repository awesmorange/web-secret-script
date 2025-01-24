# SCSS
[官网](https://sass-lang.com/guide/)

## 1. 变量
### 与CSS属性不同，变量可以在css规则块定义之外存在。当变量定义在css规则块内，那么该变量只能在此规则块内使用。
```scss
// 1. 定义变量，引用变量
// 2. 变量定义在css规则块内，那么该变量只能在此规则块内使用
$color: #333;
.box {
    $font-size: 14px;
    color: $color; // 变量使用
    font-size: $font-size; // 变量使用
}

// 编译后
.box {
    color: #333;
}
```
### 中划线和下划线互相兼容
```scss
// 3. 中划线和下划线互相兼容
$link-color: #333;
a {
    color: $link_color; 
}

// 编译后
a {
    color: #333;
}

```

## 2. 嵌套
### 嵌套
```scss
// 1. 嵌套
.box {
    color: #333;
    .box-title {
        font-size: 14px;
    }
}

// 编译后
.box {
    color: #333;
}
.box .box-title {
    font-size: 14px; 
}
```
### 父选择器的标识符&
```scss
// 2. 父选择器的标识符&
article a {
  color: blue;
  &:hover { color: red }
}
// 编译后
article a {
  color: blue;
}
article a:hover {
  color: red; 
}
```
### 群组选择器的嵌套
```scss
// 3. 群组选择器的嵌套
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
// 编译后
.container h1, .container h2, .container h3 { margin-bottom: .8em }
```
### 子组合选择器和同层组合选择器：>、+和~
**+**: 同层相邻组合选择器
**~**: 同层全体组合选择器
**>**: 子组合选择器
```scss
// 4. 子组合选择器和同层组合选择器：>、+和~
article {
  ~ article { border-top: 1px dashed #ccc } // 选择所有跟在article后的同层article元素，不管它们之间隔了多少其他元素
  > footer { background: #eee } // 选择article的所有直接子元素footer
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 } // 选择紧接在nav元素后的article元素
}
// 编译后
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```
### 嵌套属性
在sass中，除了CSS选择器，属性也可以进行嵌套。
```scss
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}
// 编译后
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc; 
}
```

## 3. 计算
数学计算在CSS有很大的用处。SASS常用的数学计算符号有 **+**, **-**, **\***, **math.div()**, and **%**.
```scss
@use "sass:math";

.container {
  display: flex;
}

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
// 编译后
.container {
  display: flex;
}

article[role=main] {
  width: 62.5%;
}

aside[role=complementary] {
  width: 31.25%;
  margin-left: auto;
}
```

## 4. 混合器
```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
// 编译后
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

## 5. 使用选择器继承来精简CSS
```scss
// 1. 使用选择器继承来精简CSS
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}

// 编译后
.warning, .error, .success, .message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```

## 6. 注释
```scss
// 编译后不会显示

/* 编译后会展示 */

// 编译后
/* 编译后会展示 */
```

## @规则介绍
- 导入: @use, @forward, @import

- 混合：@mixin, @include

- 方法：@function

- 继承：@extend

- 指向根部：@at-root

- 调试：@error, @warn, @debug

    @error：用于抛出错误并终止编译。
    @warn：用于输出警告信息，但不终止编译。
    @debug：用于输出调试信息，帮助开发者调试代码。

- 控制：@if, @each, @for, @while

详见【At规则】页