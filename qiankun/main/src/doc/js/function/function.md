# 函数名
函数名就是**指向函数的指针**，所以它们跟其他包含对象指针的变量具有相同的行为。这意味着一个函数可以有多个名称。

``` javascript
funtion sum(num1, num2) {
  return num1 + num2
}
console.log(sum(1, 2)) // 3
let anotherSum = sum // anotherSum和sum都指向同一个函数
cosnole.log(anotherSum(1, 2)) // 3
sum = null // 切断了sum与函数之间的关联
console.log(anotherSum(1, 2)) // 3 // anotherSum仍然指向函数
```
ECMAScript 6的所有函数对象都会暴露一个只读的name属性，其中包含关于函数的信息。

ECMAScript 6的所有函数对象都会暴露一个只读的name属性，其中包含关于函数的信息会标识成"anonymous"(匿名函数)

# 理解参数
ECMAScript函数的参数在内部表现为一个数组。在使用function关键字定义（非箭头）函数时，可以在函数内部访问arguments对象，从中取得传进来的每个参数值。

## arguments对象
**arguments对象是一个类数组对象**（但不是Array的实例）​，因此可以使用中括号语法访问其中的元素（第一个参数是arguments[0]​，第二个参数是arguments[1]​）​。而要确定传进来多少个参数，可以访问arguments.length属性。

- ECMAScript函数的**参数只是为了方便才写出来的，并不是必须写出来的**。
- arguments对象可以与命名参数一起使用
``` javascript
function doAdd(num1, num2) {
  if (arguments.length == 1) {
    return num1 + 10
  } else if (arguments.length == 2) {
    return arguments[0] + num2 // 命名参数num1保存着与arugments[0]一样的值，因此使用谁都无所谓。​（同样，num2也保存着跟arguments[1]一样的值。​）
  }
}
```
- **arguments对象的值始终会与对应的命名参数同步**。如果只传了一个参数，然后把arguments[1]设置为某个值，那么这个值并不会反映到第二个命名参数。这是因为arguments对象的长度是根据传入的参数个数，而非定义函数时给出的命名参数个数来确定的。
``` javascript
function doAdd(num1, num2 = 2) {
    arguments[1] = 10 // 第二个参数的值重写为10。因为arguments对象的值会自动同步到对应的命名参数，所以修改arguments[1]也会修改num2的值，因此两者的值都是10。但这并不意味着它们都访问同一个内存地址，它们在内存中还是分开的，只不过会保持同步而已
    console.log(arguments[0] + num2)
}

cosnole.log(doAdd(10)) // 12
console.log(doAdd(10, 20)) // 30
```

# 没有重载
ECMAScript函数不能像传统编程那样重载。在其他语言比如Java中，一个函数可以有两个定义，只要签名（接收参数的类型和数量）不同就行。如前所述，ECMAScript函数没有签名，因为参数是由包含零个或多个值的数组表示的。没有函数签名，自然也就没有重载。

- 在ECMAScript中定义了两个同名函数，则**后定义的会覆盖先定义**的。
- 可以通过**检查参数的类型和数量**，然后分别执行不同的逻辑来**模拟函数重载**。

**把函数名当成指针也有助于理解为什么ECMAScript没有函数重载**。

# 默认参数值
## 在ECMAScript5.1及以前
实现**默认参数**的一种常用方式就是**检测某个参数是否等于undefined**，如果是则意味着没有传这个参数，那就给它赋一个值

``` javascript
function makeKing(name) {
    name = (typeof name == 'undefined' ? 'John' : name)
    return name + ' the king'
}
conosle.log(makeKing()) // John the king
conosle.log(makeKing('Tom')) // Tom the king
```

## 在ECMAScript6及以后
**ES6**支持**显式定义默认参数**了。下面就是与前面代码等价的ES6写法，只要在函数定义中的参数后面用=就可以为参数赋一个默认值
``` javascript
function makeKing(name = 'John') {
    return name + ' the king'
}
conosle.log(makeKing()) // John the king
conosle.log(makeKing('Tom')) // Tom the king
console.log(makeKing(undefined)) // John the king
// 给参数传undefined相当于没有传值，不过这样可以利用多个独立的默认值
```

## 小结
1. 在使用默认参数时，**arguments对象的值不反映参数的默认值，只反映传给函数的参数**。
当然，跟ES5严格模式一样，**修改命名参数**也**不会影响arguments对象**，它始终**以调用函数时传入的值为准**

``` javascript
function makeKing(name = 'John') {
    arguments[0] = 'Tom'
    return name +'the king'
}
console.log(makeKing()) // undefined the king
cosnole.log(makeKing('Tom')) // Tom the king
```
2. 默认参数值可以是原始值或对象类型，也可以使用调用函数返回的值

``` javascript
let romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
let ordinality = 0;
function getNumerals() {
    // 每次调用后递增
    return romanNumerals[ordinality++];
}
function makeKing(name = 'Henry', numerals = getNumerals()) {
    return `King ${name} ${numerals}`;
}
console.log(makeKing());                    // 'King Henry I'
console.log(makeKing('Louis', 'XVI'));   // 'King Louis XVI'
console.log(makeKing());                    // 'King Henry II'
console.log(makeKing());                    // 'King Henry III'
```
3. 函数的**默认参数**只有**在函数被调用时才会求值**，不会在函数定义时求值。而且，**计算默认值的函数只有在调用函数但未传相应参数时才会被调用**。

## 默认参数作用域与暂时性死区
给多个参数定义默认值实际上跟使用let关键字顺序声明变量一样。给多个参数定义默认值实际上跟使用let关键字顺序声明变量一样。参数是按顺序初始化的，所以后定义默认值的参数可以引用先定义的参数。

``` javascript
    function makeKing(name = 'Henry', numerals=name) {
        // 后定义默认值的参数可以引用先定义的参数
      return `King ${name} ${numerals}`;
    }
    console.log(makeKing()); // King Henry Henry
```

- **参数初始化顺序遵循“暂时性死区”规则，即前面定义的参数不能引用后面定义的参数**。否则就会报错

``` javascript
    // 调用时不传第一个参数会报错
    function makeKing(name=numerals, numerals = 'VIII') {
      return `King ${name} ${numerals}`;
    }
```

- 参数也存在于自己的作用域中，它们不能引用函数体的作用域

``` javascript
    // 调用时不传第二个参数会报错
    function makeKing(name = 'Henry', numerals=defaultNumeral) {
      let defaultNumeral = 'VIII';
      return `King ${name} ${numerals}`;
    }
```

# 参数扩展与收集
## 扩展参数
有如下函数定义，它会将所有传入的参数累加起来
``` javascript
    let values = [1, 2, 3, 4];
    function getSum() {
      let sum = 0;
      for (let i = 0; i < arguments.length; ++i) {
        sum += arguments[i];
      }
      return sum;
    }
```
**[&check;] 方法1：使用扩展参数**
``` javascript
    let values = [1, 2, 3, 4];
    function getSum(...numbers) {
      let sum = 0;
      for (let i = 0; i < numbers.length; ++i) {
        sum += numbers[i];
      }
      return sum;
    }
    console.log(getSum(...values)); // 10
```
- 使用扩展操作符传参的时候，并不妨碍在其前面或后面再传其他的值，包括使用扩展操作符传其他参数。
- 对函数中的arguments对象而言，它并不知道扩展操作符的存在，而是按照调用函数时传入的参数接收每一个值。
- arguments对象只是消费扩展操作符的一种方式。在普通函数和箭头函数中，也可以将扩展操作符用于命名参数，当然同时也可以使用默认参数。

**[&check;] 方法2：使用apply()**
``` javascript
    let values = [1, 2, 3, 4];
    function getSum() {
      let sum = 0;
      for (let i = 0; i < arguments.length; ++i) {
        sum += arguments[i];
      }
      return sum;
    }
    console.log(getSum.apply(null, values)); // 10
```
## 收集参数
收集参数的结果会得到一个Array实例
``` javascript
function getSum(...values) {
    // 顺序累加values中的所有值
    // 初始值的总和为0
    return values.reduce((x, y) => x + y, 0);
}
console.log(getSum(1,2,3)); // 6
```
- 收集参数的前面如果还有命名参数，则只会收集其余的参数；如果没有则会得到空数组。因为收集参数的结果可变，所以只能把它作为最后一个参数

``` javascript
    // 不可以
    function getProduct(...values, lastValue) {} // 语法错误
    // 可以
    function ignoreFirst(firstValue, ...values) {
      console.log(values);
    }
    ignoreFirst();         // []
    ignoreFirst(1);        // []
    ignoreFirst(1,2);     // [2]
    ignoreFirst(1,2,3);   // [2, 3]
    ignoreFirst(1,2,3,4); // [2, 3, 4]
```

- 箭头函数虽然不支持arguments对象，但支持收集参数的定义方式，因此也可以实现与使用arguments一样的逻辑

``` javascript
    let getSum = (...values) => {
      return values.reduce((x, y) => x + y, 0);
    }
    console.log(getSum(1,2,3)); // 6
    console.log(getSum()); // 0
```

- 使用收集参数并不影响arguments对象，它仍然反映调用时传给函数的参数
``` javascript
    function getSum(...values) {
      console.log(arguments.length);   // 3
      console.log(arguments);           // [1, 2, 3]
      console.log(values);               // [1, 2, 3]
    }
    console.log(getSum(1,2,3));
```

# 函数声明与函数表达式
定义函数有两种方式：函数声明和函数表达式。
## 认识函数声明与函数表达式
JavaScript引擎**在任何代码执行之前，会先读取函数声明，并在执行上下文中生成函数定义**。而**函数表达式**必须等到代码**执行到它那一行，才会在执行上下文中生成函数定义**。
``` javascript
    // 没问题
    console.log(sum(10, 10));
    function sum(num1, num2) {
      return num1 + num2;
    }
```
函数声明会在任何代码执行之前先被读取并添加到执行上下文。这个过程叫作**函数声明提升**。
即使函数定义出现在调用它们的代码之后，引擎也会把函数声明提升到顶部。
## 函数表达式
函数表达式看起来就像**一个普通的变量定义和赋值**，即创建一个函数再把它赋值给一个变量functionName。这样创建的函数叫作**匿名函数**（anonymous funtion）​，因为**function关键字后面没有标识符**。​（匿名函数有也时候也被称为**兰姆达函数**）​。未赋值给其他变量的匿名函数的**name属性是空字符串**。

如果把前面代码中的函数声明改为等价的函数表达式，那么执行的时候就会出错。
``` javascript
    // 报错
    console.log(sum(10, 10));
    let sum = function(num1, num2) {
      return num1 + num2;
    };
```
之所以会出错，是因为这个函数定义包含在一个变量初始化语句中，而不是函数声明中。这并不是因为使用let而导致的，使用var关键字也会碰到同样的问题。
## 理解函数声明与函数表达式之间的区别，关键是理解提升
``` javascript
// 千万别这样做！
if (condition) {
  function sayHi() {
    console.log('Hi! ');
  }
} else {
  function sayHi() {
    console.log('Yo! ');
  }
}
sayHi();
```
上面写法在ECAMScript中不是有效的语法。JavaScript引擎会尝试将其纠正为适当的声明。问题在于浏览器纠正这个问题的方式并不一致。多数浏览器会忽略condition直接返回第二个声明。Firefox会在condition为true时返回第一个声明。这种写法很危险，不要使用。
正确写法如下：
``` javascript
// 正确写法
let sayHi;
if (condition) {
  sayHi = function() {
    console.log("Hi! ");
  };
} else {
  sayHi = function() {
    console.log("Yo! ");
  };
}
```

# 立即调用的函数表达式
**立即调用**的**匿名函数**又被称作立即调用的函数表达式（IIFE, ImmediatelyInvoked Function Expression）​。它**类似于函数声明**，但由于**被包含在括号中**，所以会被解释为函数表达式。
``` javascript
(function() {
  // 块级作用域
})();
```
## ES5及以前模拟块级作用域
使用IIFE可以模拟块级作用域，即**在一个函数表达式内部声明变量，然后立即调用这个函数**。这样位于函数体作用域的变量就像是在块级作用域中一样。ECMAScript 5尚未支持块级作用域，使用IIFE模拟块级作用域是相当普遍的。
``` javascript
// IIFE
(function () {
  for (var i = 0; i < count; i++) {
    console.log(i);
  }
})();

// 访问的变量是在IIFE内部定义的，在外部访问不到
console.log(i);   // 抛出错误
```
在ECMAScript 5.1及以前，为了**防止变量定义外泄**，IIFE是个非常有效的方式。这样也**不会导致闭包相关的内存问题**，因为不存在对这个匿名函数的引用。为此，只要函数**执行完毕，其作用域链就可以被销毁**。

## ECMAScript 6以后，IIFE就没有那么必要了
块级作用域中的变量无须IIFE就可以实现同样的隔离。
``` javascript
// 内嵌块级作用域
{
  let i;
  for (i = 0; i < count; i++) {
    console.log(i);
  }
}
console.log(i); // 抛出错误
// 循环的块级作用域
for (let i = 0; i < count; i++) {
  console.log(i);
}
console.log(i); // 抛出错误
```

## IIFE锁定参数值
### [X]错误示例
``` javascript
let divs = document.querySelectorAll('div');
// 达不到目的！
for (var i = 0; i < divs.length; ++i) {
  divs[i].addEventListener('click', function() {
    console.log(i);
  });
}
```
这里使用var关键字声明了循环迭代变量i，但**这个变量并不会被限制在for循环的块级作用域内**。因此，渲染到页面上之后，点击每个\<div>都会弹出元素总数。这是因为在**执行单击处理程序时，迭代变量的值是循环结束时的最终值**，即元素的个数。而且，这个变量i存在于循环体外部，随时可以访问。
### [&check;]IIFE"锁定"索引值
``` javascript
// 实现点击第几个<div>就显示相应的索引值
let divs = document.querySelectorAll('div');
for (var i = 0; i < divs.length; ++i) {
  divs[i].addEventListener('click', (function(frozenCounter){
    return function(){
      console.log(frozenCounter);
    };
  })(i));
}
```
### [&check;]块级作用域"锁定"索引值
``` javascript
// 实现点击第几个<div>就显示相应的索引值
let divs = document.querySelectorAll('div');
for (let i = 0; i < divs.length; ++i) {
  divs[i].addEventListener('click', function() {
    console.log(i);
  });
}
```
在**ECMAScript 6**中，如果**对for循环使用块级作用域变量关键字**，在这里就是let，那么循环就会**为每个循环创建独立的变量**，从而让每个单击处理程序都能**引用特定的索引**。
### [X]块级作用域"锁定"索引值失败
如果把变量声明拿到for循环外部，那就不行了。下面这种写法会碰到跟在循环中使用var i =0同样的问题。
``` javascript
let divs = document.querySelectorAll('div');
// 达不到目的！
let i;
for (i = 0; i < divs.length; ++i) {
  divs[i].addEventListener('click', function() {
    console.log(i);
  });
}
```

# 函数作为值
因为函数名在ECMAScript中就是变量，所以函数可以用在任何可以使用变量的地方。这意味着不仅可以把函数**作为参数**传给另一个函数，而且还可以**在一个函数中返回**另一个函数。