# 笔记问题

## 1. 为什么js算9.78*100=977.999999999

因为二进制无法表示浮点数，所以靠其他的手段，把一个整数变成浮点数,导致会有精度丢失。

为了尽量避免这种问题，可以采用一些方法，比如将数字转换为整数进行运算，再根据需要转换回小数，或者使用专门处理高精度数值的库。可以用big.js

## 2. 0.1 + 0.2 === 0.3 的结果是什么？
``` javascript
console.log(0.1 + 0.2 === 0.3);
```

## 3. "5" + 3 和 "5" - 3 的结果是什么？
``` javascript
console.log("5" + 3);
console.log("5" - 3);
```

## 4. typeof null 的值是什么？
``` javascript
console.log(typeof null);
```

## 5. 闭包是如何工作的？
``` javascript
function outerFunction() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const closure = outerFunction();
closure(); // ?
closure(); // ?
```

## 6. [] == ![] 的结果是什么？
``` javascript
console.log([] == ![]);
```

## 7. 以下代码中 console.log(a) 的输出是什么？
``` javascript
console.log(a);
var a = 5;
```

[2-7答案](https://mp.weixin.qq.com/s/889S1WEl-xXrh7LrDI9SBQ)