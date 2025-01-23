# @use 规则详解

## 1. 加载成员（样式、变量、mixin、function等）
```scss
// _code.scss
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
```scss
// foundation/_corners.scss
$radius: 3px; // 公共变量
$-height: 30px; // 私有变量：横线或者下划线开头

@mixin rounded {
  border-radius: $radius;
  height: $-height;
}
```

### **带前缀的变量、mixin的使用**
```scss
// button/style.scss
@use 'code';
@use 'foundation/lists';
@use "foundation/corners"; // @use "foundation/corners" as corners; 等同

.button {
  @include corners.rounded;
  padding: 5px + corners.$radius;
}
```

### **Namespace：重命名前缀**
```scss
// tag/style.scss
@use "foundation/corners" as c;

.tag {
  @include c.rounded;
  padding: 5px + c.$radius;
}
```

### **不带前缀的变量、mixin的使用**
```scss
// tag/style.scss
@use "foundation/corners" as *;

.tag {
  @include rounded;
  padding: 5px + $radius;
}
```

### 私有变量
私有变量：横线或者下划线开头
```scss
// tag/style.scss
@use "foundation/corners" as *;
.tag {
  @include corners.rounded;

  // 下面是错误使用! $-radius 在 `_corners.scss`以外不可见
  padding: 5px + corners.$-radius; // ❌
}
```

## 2. 配置
### 修改默认值
在变量后加上 **!default** 表示默认值，可以重定义值
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
// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```

### 使用Mixin
```scss
// _library.scss
$-black: #000;
$-border-radius: 0.25rem;
$-box-shadow: null;

/// If the user has configured `$-box-shadow`, returns their configured value.
/// Otherwise returns a value derived from `$-black`.
@function -box-shadow() {
  @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15));
}

@mixin configure($black: null, $border-radius: null, $box-shadow: null) {
  @if $black {
    $-black: $black !global;
  }
  @if $border-radius {
    $-border-radius: $border-radius !global;
  }
  @if $box-shadow {
    $-box-shadow: $box-shadow !global;
  }
}

@mixin styles {
  code {
    border-radius: $-border-radius;
    box-shadow: -box-shadow();
  }
}
```
```scss
// style.scss
@use 'library';

@include library.configure(
  $black: #222,
  $border-radius: 0.1rem
);

@include library.styles;
```

### 变量二次赋值
```scss
// _library.scss
$color: red;
```
```scss
// _override.scss
@use 'library';
library.$color: blue;
```
```scss
// style.scss
@use 'library';
@use 'override';
@debug library.$color;  //=> blue
```

## 3. 匹配模块
使用``@use "variables"`` 会自动匹配到 ``variables.scss``, ``variables.sass``,或者 ``variables.css`` 文件。

### 加载路径
所有Sass实现都允许用户提供加载路径：Sass在定位模块时将查看的文件系统上的路径。例如，如果将``node_modules/susy/sass``作为加载路径传递，则可以使用``@use “susy”``加载``node_module/susy/sass/susy.scss``（尽管pkg:URL是更好的处理方式）。

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
@use 'foundation';
```

## 4. 加载css文件
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

## 5. 与@import的区别
``@use``可以替换``@import``，但是用法不同。有以下几点区别：

- ``@use``仅**使变量、函数和混入在当前文件的范围内可用**。它从未将它们添加到全局范围内。这使得很容易找出Sass文件引用的每个名称的来源，这意味着您可以使用较短的名称，而不会有任何冲突的风险。

- ``@use``只加载每个文件一次。这可以确保您不会意外地多次复制依赖项的CSS。

- ``@use``必须出现在**文件的开头**，不能嵌套在样式规则中。

- 每个``@use``规则只能有**一个URL**。

- ``@use``即使使用缩进语法，也需要在其URL周围加引号。
