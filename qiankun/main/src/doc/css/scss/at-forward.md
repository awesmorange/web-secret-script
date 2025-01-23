# @forward
``@forward``规则加载Sass样式表，并在使用``@use``规则加载样式表时使其混入、函数和变量可用。它可以跨多个文件组织Sass库，同时允许用户加载单个入口点文件。

``@forward``可以导入模块的公共成员，但要在当前文件不可用，需要搭配``@use``使用。在同一文件中同时使用``@forward``和``@use``，``@forward``必须在``@use``之前。

```scss
// src/_list.scss
@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}
```
```scss
// bootstrap.scss
@forward "src/list";
```
```scss
// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```

## 添加前缀
用法：`` @forward "<url>" as <prefix>-*``
```scss
// src/_list.scss
@mixin reset {
  margin: 0;
  padding: 0;
  list-style: none;
}
```
```scss
// bootstrap.scss
@forward "src/list" as list-*;
```
```scss
// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```

## 控制可见
用法：``@forward "<url>" hide <members...>`` 或 ``@forward "<url>" show <members...>``

```scss
// src/_list.scss
$horizontal-list-gap: 2em;

@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin list-horizontal {
  @include list-reset;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: $horizontal-list-gap;
    }
  }
}
```
```scss
// bootstrap.scss
@forward "src/list" hide list-reset, $horizontal-list-gap;
```

## 配置模块
对于``!default``变量，``@forward``可以通过``with``配置模块。也可以使用``@use``的``with``配置模块。
```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
```
```scss
// _opinionated.scss
@forward 'library' with (
  $black: #222 !default,
  $border-radius: 0.1rem !default
);
```
```scss
// style.scss
@use 'opinionated' with ($black: #333);
```
