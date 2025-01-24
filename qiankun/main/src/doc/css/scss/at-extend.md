# @extend
用法：`` @extend <selector>``

没有使用@extend的写法
``` javascript
<template>
    <div class="error error--serious">
        Oh no! You've been hacked!
    </div>
</template>
<style>
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.error--serious {
  border-width: 3px;
}
</style>
```
使用@extend的写法
```scss
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}

// 编译后CSS
.error, .error--serious {
  border: 1px #f00;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}
```
``@extend``告诉Sass一个选择器应该继承另一个选择器的样式。使用``@extend``，如果类名只写``error-serious``，编译后，``error-serious``也会继承``error``的样式。

## 1. 反例
```scss
.content nav.sidebar {
  @extend .info;
}

// 下面这种情况不会被继承，因为 `p` 和 `nav`没有关联
p.info {
  background-color: #dee9fc;
}

// 没有办法判断 `<div class="guide">` 和 `<div class="content">`的具体层级, 所以 `guide` 里面 `info`的样式不会被继承.
.guide .info {
  border: 1px solid rgba(#000, 0.8);
  border-radius: 2px;
}

// SSass知道匹配“main.content”的每个元素也匹配“.content“，需要避免生成不必要的交错选择器。
main.content .info {
  font-size: 0.8em;
}
```

## 2. 占位选择器
以``%``而不是``..``开头的类选择器称为占位符选择器，可以用于继承的样式规则。任何包含占位符的选择器都不包含在CSS输出中，但继承占位符的选择器包含在内。
```scss
.alert:hover, %strong-alert {
  font-weight: bold;
}

%strong-alert:hover {
  color: red;
}

// 编译后CSS
.alert:hover {
  font-weight: bold;
}
```
### 私有占位符
与模块成员一样，占位符选择器可以通过以``-``或``_``开头来标记为私有。私有占位符选择器只能在定义它的样式表中继承。对于任何其他样式表，它看起来就像该选择器不存在一样。

### 🌟占位符的作用
占位符选择器的主要作用是**定义一组样式，但不会直接输出到CSS文件中，除非它们被 @extend 指令引用**。

占位符选择器的特点和用途如下：

- **不会直接输出**：与普通的类选择器（如 .class）不同，占位符选择器不会直接编译成CSS代码。这意味着它们不会在最终的CSS文件中生成对应的样式规则，除非它们被 @extend 指令引用。

- **可复用性**：占位符选择器通常用于定义可复用的样式块。通过 @extend 指令，可以将这些样式块应用到多个不同的选择器上，从而实现样式的复用。

- **减少CSS冗余**：由于占位符选择器不会直接输出到CSS文件中，因此可以避免生成不必要的样式规则，从而减少CSS文件的大小和冗余。

- **提高代码可读性**：使用占位符选择器可以使Sass代码更加模块化和结构化，提高代码的可读性和可维护性。

```scss
// 定义一个占位符选择器
%strong-alert {
  font-weight: bold;
  color: red;
}

// 使用 @extend 指令引用占位符选择器
.alert {
  @extend %strong-alert;
  // 其他样式...
}

.warning {
  @extend %strong-alert;
  // 其他样式...
}

// 编译后CSS
.alert, .warning {
  font-weight: bold;
  color: red;
}
```

## 3. 继承范围
如果使用``@import``规则，则继承根本**没有作用域**。它们不仅会影响您导入的每一个样式表，还会影响导入您的样式表的每个样式表，以及这些样式表导入的其他所有内容，等等。

使用``@use``规则或``@forward``规则加载的模块、这些模块加载的模块。该继承**只会影响上游模块**中编写的样式规则使``@extend``规则更具可预测性，确保它们只影响您编写时所知道的样式。

## 4. 强制继承和可选继承
通常，如果``@extend``与样式表中的任何选择器都不匹配，Sass将**产生错误**。这有助于防止拼写错误或在不重命名从其继承的选择器的情况下重命名选择器。**要求继承选择器存在是强制性的**。

不过，这可能并不总是你想要的。如果你想让``@extend``在继承选择器不存在的情况下什么都不做，只需添加`` !optional``到最后。

## 5. 使用继承还是Mixin?
- 使用Mixin:需要参数配置样式，或非语义样式集合；
- 使用继承：表达语义类（或其他语义选择器）之间的关系时，继承是最好的选择。

## 6. 继承的局限性
### 兼容性（不支持复合继承）
只有简单的选择器(如``.foo``)可以被继承。如果选择器包含复杂选择器(如``.foo.bar``与同时匹配``.foo``和``.bar``是一样的，所以用``@extend.foo, .info``代替它并没有任何好处)，则不建议使用。
```scss
.alert {
  @extend .message.info;
  //      ^^^^^^^^^^^^^
  // 错误：请写成 @extend .message, .info。

  @extend .main .info;
  //      ^^^^^^^^^^^
  // 错误：请写成 @extend .info。
}
```

### HTML 启发式规则
当 @extend 交错复杂选择器时，它不会生成所有可能的祖先选择器组合。它可以生成的许多选择器不太可能实际匹配真实的 HTML，并且生成所有这些选择器会使样式表变得非常大，而实际价值却很小。相反，它使用一种启发式规则：它假设每个选择器的祖先都是自包含的，不会与任何其他选择器的祖先交错。
```scss
header .warning li {
  font-weight: bold;
}

aside .notice dd {
  // Sass doesn't generate CSS to match the <dd> in
  //
  // <header>
  //   <aside>
  //     <div class="warning">
  //       <div class="notice">
  //         <dd>...</dd>
  //       </div>
  //     </div>
  //   </aside>
  // </header>
  //
  // because matching all elements like that would require us to generate nine
  // new selectors instead of just two.
  @extend li;
}

// 编译后CSS
header .warning li, header .warning aside .notice dd, aside .notice header .warning dd {
  font-weight: bold;
}
```

### 在 @media 中继承
虽然 @extend 在 @media 和其他 CSS 规则中是允许的，但不允许继承出现在其规则之外的选择器。这是因为继承选择器仅在给定的媒体上下文中适用，并且没有办法在不复制整个样式规则的情况下确保该限制在生成的选择器中得到保留。
```scss
SCSS Syntax
@media screen and (max-width: 600px) {
  .error--serious {
    @extend .error;
    //      ^^^^^^
    // Error: ：".error" 在 @media 中被继承，但在其外部使用。
  }
}

.error {
  border: 1px #f00;
  background-color: #fdd;
}
```
