# 函数内部
- ECMAScript 5中，函数内部存在两个特殊的对象：**arguments**和**this**；
- ECMAScript 5也会给函数对象上添加一个属性：**caller**。虽然ECMAScript 3中并没有定义，但所有浏览器除了早期版本的Opera都支持这个属性；
- ECMAScript 6又新增了**new.target**属性。

## arguments
arguments是一个类数组对象，包含调用函数是传入的所有参数。只有用function关键字定义的函数时才有（箭头函数没有）。
- 主要用于包含函数参数，但arguments对象其实还有一个callee属性，是一个指向arguments对象所在函数的指针。

``` javascript
// 阶乘函数（递归）
// 这个函数要正确执行就必须保证函数名是factorial，从而导致了紧密耦合
function factorial(num) {
    if (num <= 1) {
    return 1;
    } else {
    return num ＊ factorial(num -1);
    }
}
```
使用arguments.callee就可以让函数逻辑与函数名解耦。无论函数叫什么名称，都可以引用正确的函数。
``` javascript
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        // 重写之后的factorial()函数已经用arguments.callee代替了之前硬编码的factorial
        // 无论函数叫什么名称，都可以引用正确的函数
        return num＊arguments.callee(num-1);
    }
}

let trueFactorial = factorial;
factorial = function() {
    return 0;
};

console.log(trueFactorial(5));   // 120
console.log(factorial(5));        // 0
```
trueFactorial变量被赋值为factorial，实际上把同一个函数的指针又保存到了另一个位置。然后，factorial函数又被重写为一个返回0的函数。如果像factorial()最初的版本那样不使用arguments.callee，那么像上面这样调用trueFactorial()就会返回0。不过，通过将函数与名称解耦，trueFactorial()就可以正确计算阶乘，而factorial()则只能返回0。

## this
### 在标准函数中
在标准函数中，this引用的是把函数当成方法调用的上下文对象，这时候通常称其为this值（在网页的全局上下文中调用函数时，this指向windows）​。

``` javascript
window.color = 'red';
let o = {
    color: 'blue'
};
function sayColor() {
    console.log(this.color);
}

// 这个this到底引用哪个对象必须到函数被调用时才能确定。 
sayColor();     // 'red'
o.sayColor = sayColor;
o.sayColor();   // 'blue'
```

### 在箭头函数中
在箭头函数中，this引用的是定义箭头函数的上下文。
``` javascript
window.color = 'red';
let o = {
    color: 'blue'
};
let sayColor = () => console.log(this.color);

// 在对sayColor()的两次调用中，this引用的都是window对象，因为这个箭头函数是在window上下文中定义的
sayColor();     // 'red'
o.sayColor = sayColor;
o.sayColor();   // 'red'
```

### 在事件回调或定时回调中调用某个函数时
在事件回调或定时回调中调用某个函数时，this值指向的并非想要的对象。此时将回调函数写成箭头函数就可以解决问题。这是因为箭头函数中的this会保留定义该函数时的上下文。

``` javascript
function King() {
    this.royaltyName = 'Henry';
    // this引用King的实例
    setTimeout(() => console.log(this.royaltyName), 1000);
}
function Queen() {
    this.royaltyName = 'Elizabeth';
    // this引用window对象
    setTimeout(function() { console.log(this.royaltyName); }, 1000);
}
new King();   // Henry
new Queen(); // undefined
```

### 注意
函数名只是保存指针的变量。因此全局定义的sayColor()函数和o.sayColor()是同一个函数，只不过执行的上下文不同。

## caller
ECMAScript 5也会给函数对象上添加一个属性：caller。虽然ECMAScript 3中并没有定义，但所有浏览器除了早期版本的Opera都支持这个属性。这个属性引用的是调用当前函数的函数，或者如果是在全局作用域中调用的则为null。
``` javascript
function outer() {
    inner();
}
function inner() {
    console.log(inner.caller);
}
outer(); // 以上代码会显示outer()函数的源代码。
/**
ƒ outer() {
    inner();
}
 */
// 这是因为ourter()调用了inner(), inner.caller指向outer()。
```
如果要降低耦合度，则可以通过arguments.callee.caller来引用同样的值:
``` javascript
function outer() {
    inner();
}
function inner () {
    console.log(arguments.callee.caller);
}
outer(); // 以上代码会显示outer()函数的源代码。
/**
ƒ outer() {
    inner();
}
 */
```

### 注意
- 在严格模式下访问arguments.callee会报错。
ECMAScript 5也定义了arguments.caller，但在严格模式下访问它会报错，在非严格模式下则始终是undefined。
这是为了分清arguments.caller和函数的caller而故意为之的。
而作为对这门语言的安全防护，这些改动也让第三方代码无法检测同一上下文中运行的其他代码。
- 严格模式下还有一个限制，就是不能给函数的caller属性赋值，否则会导致错误。

## new.target
ECMAScript中的函数始终可以作为构造函数实例化一个新对象，也可以作为普通函数被调用。
ECMAScript 6新增了检测函数是否使用new关键字调用的new.target属性。
如果函数是正常调用的，则new.target的值是undefined；如果是使用new关键字调用的，则new.target将引用被调用的构造函数。
``` javascript
function King() {
    if (! new.target) {
    throw 'King must be instantiated using "new"'
    }
    console.log('King instantiated using "new"');
}
new King(); // King instantiated using "new"
King();      // Error: King must be instantiated using "new"
```