# 递归
递归函数通常的形式是**一个函数通过名称调用自己**

## arguments.callee
arguments.callee就是一个指向正在执行的函数的指针, 可以在函数内部递归调用。
在写递归函数时使用arguments.callee可以避免函数名被修改引用的情况。
``` javascript
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        // return num ＊ factorial(num -1); // 1 函数名修改引用后，执行结果会不一样
        return num * arguments.callee(num - 1); // 2 避免函数名被修改引用的情况
    }
}

let anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(4));   // 写法1：报错；写法2：24
```

## 严格模式下arguments.callee失效
严格模式下arguments.callee失效，可以使用命名函数表达式（named function expression）达到目的。
``` javascript
const factorial = (function f(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num＊f(num-1);
    }
});
```
这里创建了一个命名函数表达式f()，然后将它赋值给了变量factorial。即使把函数赋值给另一个变量，函数表达式的名称f也不变，因此递归调用不会有问题。严格模式和非严格模式下，都适用。
