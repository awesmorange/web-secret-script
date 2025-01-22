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

## 3. 查找模块











