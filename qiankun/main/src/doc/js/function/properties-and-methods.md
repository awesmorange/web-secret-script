# 函数属性和方法
ECMAScript中的函数是对象，因此有属性和方法。
- 每个函数都有两个属性：**length**和**prototype**。
- 每个函数都有两个方法：**apply**和**call**。
- ECMAScript 5出于同样的目的（相对于apply和call）定义了一个新方法：**bind()**。

## 属性
### length
length属性保存函数定义的命名参数的个数。

```javascript
function sayName(name) {
    console.log(name);
}
function sum(num1, num2) {
    return num1 + num2;
}
function sayHi() {
    console.log("hi");
}
console.log(sayName.length);   // 1
console.log(sum.length);        // 2
console.log(sayHi.length);     // 0
```

### prototype
prototype是保存引用类型所有实例方法的地方。
- toString()、valueOf()等方法实际上都保存在prototype上，进而由所有实例共享。这个属性在自定义类型时特别重要。
- 在ECMAScript 5中，prototype属性是不可枚举的，因此使用for-in循环不会返回这个属性。

## 方法
apply() 和 call() 这两个方法都会以指定的this值来调用函数，即会设置调用函数时函数体内this对象的值。

call()方法与apply()的作用一样，只是传参的形式不同。到底是使用apply()还是call()，完全取决于怎么给要调用的函数传参更方便。apply()和call()真正强大的地方并不是给函数传参，而是控制函数调用上下文即函数体内this值的能力。
### apply
apply()方法接收两个参数：函数内this的值和一个参数数组。第二个参数可以是Array的实例，但也可以是arguments对象。

```javascript
function sum(num1, num2) {
    return num1 + num2;
}

// callSum1()会调用sum()函数，将this作为函数体内的this值（这里等于window，因为是在全局作用域中调用的）传入，同时还传入了arguments对象。
function callSum1(num1, num2) {
    return sum.apply(this, arguments); // 传入arguments对象
}

// callSum2()也会调用sum()函数，但会传入参数的数组。
function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]); // 传入数组
}

// 这两个函数都会执行并返回正确的结果。
console.log(callSum1(10, 10));   // 20
console.log(callSum2(10, 10));   // 20
```

### call
call()方法接受多个参数：第一个参数跟apply()一样，也是this值，而剩下的要传给被调用函数的参数则是逐个传递的。

```javascript
function sum(num1, num2) {
    return num1 + num2;
}
function callSum(num1, num2) {
    return sum.call(this, num1, num2);
}
console.log(callSum(10, 10)); // 20
```

### bind
bind()方法会创建一个函数的实例，其this值会被绑定到传给bind()函数的值。
``` javascript
window.color = 'red';
var o = {
    color: 'blue'
};
function sayColor() {
    console.log(this.color);
}
let objectSayColor = sayColor.bind(o);
objectSayColor();   //blue
```

### 注意
- 在严格模式下，调用函数时如果没有指定上下文对象，则this值不会指向window。除非使用apply()或call()把函数指定给一个对象，否则this的值会变成undefined。
- 使用call()或apply()的好处是可以将任意对象设置为任意函数的作用域，这样对象可以不用关心方法。
``` javascript
window.color = 'red';
let o = {
    color: 'blue'
};
function sayColor() {
    console.log(this.color);
}
sayColor();                // red
sayColor.call(this);     // red
sayColor.call(window);   // red
sayColor.call(o);         // blue
```
- 对函数而言，继承的方法toLocaleString()和toString()始终返回函数的代码。返回代码的具体格式因浏览器而异。有的返回源代码，包含注释，而有的只返回代码的内部形式，会删除注释，甚至代码可能被解释器修改过。由于这些差异，因此不能在重要功能中依赖这些方法返回的值，而只应在调试中使用它们。继承的方法valueOf()返回函数本身。