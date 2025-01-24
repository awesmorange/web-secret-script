# @if
``@if`` 指令用于根据条件来应用样式。如果条件为真，则应用 ``@if`` 块中的样式；如果条件为假，则可以选择应用 ``@else`` 或 ``@else if`` 块中的样式。
```scss
$type: monster;

p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

# @each
``@each`` 指令用于遍历一个列表或映射，并为列表中的每个元素应用样式。
```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

# @for
``@for`` 指令用于循环一定的次数，并为每次循环应用样式。``@for`` 有两种形式：``@for $var from <start> through <end>`` 和 ``@for $var from <start> to <end>``。``through`` 包含 ``<end>`` 的值，而 ``to`` 不包含。

- ``@for $var from <start> through <end>``包含 ``<end>`` 的值
  ```scss
  @for $i from 1 through 3 {
    .item-#{$i} {
      width: 2em * $i;
    }
  }
  // 编译后CSS
  .item-1 {
    width: 2em;
  }

  .item-2 {
    width: 4em;
  }

  .item-3 {
    width: 6em;
  }
  ```

-  ``@for $var from <start> to <end>``不包含 ``<end>`` 的值
    ```scss
    @for $i from 1 to 3 {
      .item-#{$i} {
        width: 2em * $i;
      }
    }
    // 编译后CSS
    .item-1 {
      width: 2em;
    }

    .item-2 {
      width: 4em;
    }
    ```

# @while
@while 指令用于在条件为真时重复执行一个块。
```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

# 总结
``@if``：根据条件应用样式。

``@each``：遍历列表或映射并应用样式。

``@for``：循环一定次数并应用样式。

``@while``：在条件为真时重复执行一个块。

这些指令可以帮助你更高效地编写Sass代码，使样式表更加灵活和可维护。
