# @import
``@import``可以一次导入多个URL。
```scss
// style.scss
@import 'foundation/code', 'foundation/lists';
```

## 1. 匹配文件
``@import "variables" ``会自动匹配到``variables.scss``, ``variables.sass``, 或者 ``variables.css``。

### 加载路径
所有Sass实现都允许用户提供加载路径：Sass在定位模块时将查看的文件系统上的路径。例如，如果将``node_modules/susy/sass``作为加载路径传递，则可以使用``@import “susy”``加载``node_module/susy/sass/susy.scss``。

模块将优先加载项目路径里面的文件。只有当**不存在**与模块URL匹配的**相对文件**时，**才会使用加载路径**。这可以确保您在添加新库时不会意外弄乱相对导入。

**Sass不要求一定要使用相对路径（./），但是支持使用相对路径。**

### 零件文件
以``_``开头（如``_code.scs``）的Sass文件只作为模块加载，而不是单独编译。Sass工具不会单独编译这些文件，导入零件文件时**可以省略_**。

### index文件
如果目录中有``_index.scss``或者``_index.sass``文件，在index文件中会自动加载当前目录的路径。
```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}
```
```scss
// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}
```
可以对比``@import``和``@use``的区别。
```scss
// foundation/_index.scss
@import 'code', 'lists';
// @use 'code';
// @use 'lists';
```
```scss
// style.scss
@import 'foundation';
```

### 自定义导入🤔❓
- npm上的Node Sass和Dart Sass提供了一个导入器选项，作为其JS API的一部分。
- pub上的Dart Sass提供了一个抽象的Importer类，可以由自定义导入器扩展。
- Ruby Sass提供了一个抽象的Importers:：基类，可以通过自定义导入程序进行扩展。

## 2. 可嵌套
@import规则可以嵌套在样式块中。
```scss
// _theme.scss
pre, code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}
```
```scss
// style.scss
.theme-sample {
  @import "theme";
}
```

## 3. 加载css文件
除了加载.sass和.scs文件外，sass还可以加载普通的.css文件。
```scss
// code.css
code {
  padding: .25em;
  line-height: 0;
}
```
```scss
// style.scss
@use 'code';
```

## 4. 纯CSS @import
CSS也定义了@import规则。Sass将编译任何具有以下特征的@import为纯CSS导入：
- 导入URL以``.css结尾``的位置。
- 导入URL以``http://``或``https://``开头的位置。
- 导入URL被写为``URL（）``的地方。
- 具有``媒体查询``的导入。
```css
/* 纯CSS @import */
@import "theme.css";
@import "http://fonts.googleapis.com/css?family=Droid+Sans";
@import url(theme);
@import "landscape" screen and (orientation: landscape);
```

### 插值
虽然Sass导入不能使用插值（以确保可以分辨混入、函数和变量的来源），但普通CSS导入可以。这使得动态生成导入成为可能，例如基于混入参数。
```scss
@mixin google-font($family) {
  @import url("http://fonts.googleapis.com/css?family=#{$family}");
}

@include google-font("Droid Sans");
```

## 5. 导入和模块

### 仅导入文件
对``@use``有用的API可能对``@import``不适用。例如，``@use``默认情况下会为所有成员添加一个命名空间，这样您就可以安全地使用短名称，但@import不会，所以您可能需要更长的名称。如果您是库作者，您可能会担心，如果您更新库以使用新的模块系统，您现有的基于@import的用户将崩溃。

为了使这更容易，Sass还支持仅导入文件。如果你将一个文件命名为``<name>.import.scss``，它只会``为导入而加载``，``不会为@uses加载``。通过这种方式，您可以保留对@import用户的兼容性，同时仍然为新模块系统的用户提供一个很好的API。
```scss
// _reset.scss

// Module system users write `@include reset.list()`.
@mixin list() {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
```
```scss
// _reset.import.scss

// Legacy import users can keep writing `@include reset-list()`.
@forward "reset" as reset-*;
```

### 通过import配置模块
```scss
// _library.scss
$color: blue !default;

a {
  color: $color;
}
```
```scss
// _library.import.scss
@forward 'library' as lib-*;
```
```scss
// style.sass
$lib-color: green;
@import "library";
```
