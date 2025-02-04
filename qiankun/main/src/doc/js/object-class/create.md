# 创建对象（运用原型式继承模拟类）
使用Object构造函数或对象字面量可以方便地创建对象，但创建具有同样接口的多个对象需要重复编写很多代码。

在JavaScript中，创建对象有两种方法：
- Object构造函数
- 对象字面量

## 1. 概述
### ECMAScript 5.1并没有正式支持面向对象的结构
比如类或继承。但是，巧妙地运用原型式继承可以成功地模拟同样的行为。
### ECMAScript 6开始正式支持类和继承
ES6的类旨在**完全涵盖之前规范设计的基于原型的继承模式**。不过，无论从哪方面看，**ES6的类**都仅仅是封装了**ES5.1构造函数加原型继承**的**语法糖**而已。
### 📢注意
采用**面向对象编程模式**的JavaScript代码还是**应该使用ECMAScript 6的类**。本文主要讲被ES6的类取代的那些底层概念。

## 2. 工厂模式
**工厂模式**是一种**抽象了创建具体对象的过程**的设计模式。下面的例子展示了一种按照特定接口创建对象的方式。
``` javascript
// 函数createPerson()接收3个参数，根据这几个参数构建了一个包含Person信息的对象
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name);
    };
    return o;
}
// 可以用不同的参数多次调用这个函数，每次都会返回包含3个属性和1个方法的对象。
let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
```
这种工厂模式虽然可以解决**创建多个类似对象**的问题，但**没有解决对象标识问题**（即新创建的对象是什么类型）​。

## 3. 构造函数模式
ECMAScript中的**构造函数**是用于**创建特定类型对象**的。像Object和Array这样的原生构造函数，运行时可以直接在执行环境中使用。当然也可以**自定义构造函数**，以**函数的形式为自己的对象类型定义属性和方法**。

前面的例子使用**构造函数模式**可以这样写：
``` javascript
// 构造函数名称的首字母都是要大写的，非构造函数则以小写字母开头
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name);
    };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName();   // Nicholas
person2.sayName();   // Greg
```
在这个例子中，Person()构造函数代替了createPerson()工厂函数。实际上，Person()内部的代码跟createPerson()基本是一样的，只是有如下区别。
- **没有显式地创建对象**。
- **属性和方法直接赋值给了this**。
- **没有return**。

有助于在ECMAScript中区分构造函数和普通函数的一个重要特征，就是**构造函数始终都应该以一个大写字母开头**，而非构造函数则应该以一个小写字母开头。

### 🌟new操作符做了什么？
要创建Person的实例，应使用new操作符。以这种方式调用构造函数会执行如下操作。
1. 在内存中**创建一个新对象**。
2. 这个**新对象内部的[​[Prototype]​]特性**被**赋值**为构造函数的prototype属性。
3. 构造函数内部的**this**被**赋值为这个新对象**（即**this指向新对象**）​。
4. **执行构造函数内部的代码（给新对象添加属性）**​。
5. **如果构造函数返回非空对象，则返回该对象**；否则，**返回刚创建的新对象**。

### 🌟instanceof 与 构造函数
上一个例子的最后，person1和person2分别保存着Person的不同实例。这**两个对象都有一个constructor属性指向Person**，如下所示：
``` javascript
console.log(person1.constructor == Person);   // true
console.log(person2.constructor == Person);   // true
```
**constructor本来是用于标识对象类型的**。不过，一般认为**instanceof操作符**是**确定对象类型**更可靠的方式。**前面例子中的每个对象都是Object的实例，同时也是Person的实例**，如下面调用instanceof操作符的结果所示：
``` javascript
console.log(person1 instanceof Object);   // true
console.log(person1 instanceof Person);   // true
console.log(person2 instanceof Object);   // true
console.log(person2 instanceof Person);   // true
```
✍**定义自定义构造函数可以确保实例被标识为特定类型**，相比于工厂模式，这是一个很大的好处。在这个例子中，person1和person2之所以也被认为是Object的实例，是因为**所有自定义对象都继承自Object**

**赋值给变量的函数表达式也可以表示构造函数**。构造函数不一定要写成函数声明的形式。
``` javascript
let Person = function(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name);
    };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName();   // Nicholas
person2.sayName();   // Greg
console.log(person1 instanceof Object);   // true
console.log(person1 instanceof Person);   // true
console.log(person2 instanceof Object);   // true
console.log(person2 instanceof Person);   // true
```

在实例化时，如果**不想传参数，那么构造函数后面的括号可加可不加**。**只要有new操作符，就可以调用相应的构造函数**
``` javascript
function Person() {
    this.name = "Jake";
    this.sayName = function() {
        console.log(this.name);
    };
}
let person1 = new Person();
let person2 = new Person;
person1.sayName();   // Jake
person2.sayName();   // Jake
console.log(person1 instanceof Object);   // true
console.log(person1 instanceof Person);   // true
console.log(person2 instanceof Object);   // true
console.log(person2 instanceof Person);   // true
```

### 💥构造函数也是函数
**构造函数与普通函数唯一的区别就是调用方式不同**。除此之外，构造函数也是函数。并没有把某个函数定义为构造函数的特殊语法。任何函数只要使用new操作符调用就是构造函数，而不使用new操作符调用的函数就是普通函数。比如，前面的例子中定义的Person()可以像下面这样调用：
``` javascript
// 作为构造函数
let person = new Person("Nicholas", 29, "Software Engineer");
person.sayName();     // "Nicholas"
// 作为函数调用
Person("Greg", 27, "Doctor");    // 添加到window对象
window.sayName();     // "Greg"
// 在另一个对象的作用域中调用
let o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName();    // "Kristen"
```
**🌟在调用一个函数而没有明确设置this值的情况下**（即没有作为对象的方法调用，或者没有使用call()/apply()调用）,**this始终指向Global对象**（在浏览器中就是window对象）。

### 构造函数的问题
构造函数的主要问题在于，**其定义的方法会在每个实例上都创建一遍**。
ECMAScript中的函数是对象，因此每次定义函数时，都会初始化一个对象。逻辑上讲，这个构造函数实际上是这样的：
``` javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function("console.log(this.name)"); // 逻辑等价
}
```
每个Person实例都会有自己的Function实例用于显示name属性。当然了，以这种方式创建函数会带来不同的作用域链和标识符解析。但创建新Function实例的机制是一样的。因此不同的Person实例之间的同名函数是不相等的。
``` javascript
console.log(person1.sayName == person2.sayName); // false
```
#### 🌟解决方法
因为都是做一样的事，所以没必要定义两个不同的Function实例。况且，this对象可以把函数与对象的绑定推迟到运行时。要解决这个问题，可以把**函数定义转移到构造函数外部**：
``` javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
function sayName() {
    console.log(this.name);
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName();   // Nicholas
person2.sayName();   // Greg
```
这样虽然解决了相同逻辑的函数重复定义的问题，但**全局作用域也因此被搞乱**了，**因为那个函数实际上只能在一个对象上调用**。如果这个对象需要多个方法，那么就要在全局作用域中定义多个函数。这会导致**自定义类型引用的代码不能很好地聚集一起**。这个新问题可以**通过原型模式来解决**。

## 4. 原型模式
**每个函数**都会创建**一个prototype属性**，这个属性是**一个对象**，包含应该**由特定引用类型的实例共享的属性和方法**。实际上，**这个对象就是通过调用构造函数创建的对象的原型**。

🌟使用**原型对象**的**好处**是，**在它上面定义的属性和方法可以被对象实例共享**。

**[见原型模式篇](./prototype.md)**

## 5. 对象迭代{Object.values()和Object.entries()}
ECMAScript 2017新增了两个静态方法，用于**将对象内容转换为序列化**的——更重要的是**可迭代**的——格式。这两个静态方法Object.values()和Object.entries()接收一个对象，返回它们内容的数组。
- Object.values()返回对象值的数组；
- Object.entries()返回键/值对的数组。

### 🌟注意
1. 非字符串属性会被转换为字符串输出。另外，这两个方法执行对象的**浅复制**：
``` javascript
const o = {
    qux: {}
};
console.log(Object.values(o)[0] === o.qux);
// true
console.log(Object.entries(o)[0][1] === o.qux);
// true
```
2. **符号属性会被忽略**：
``` javascript
const sym = Symbol();
const o = {
    [sym]: 'foo'
};
console.log(Object.values(o)); // []
console.log(Object.entries((o))); // []
```

### ①其他原型语法
在前面的例子中，每次定义一个属性或方法都会把Person.prototype重写一遍。可以使用对象字面量重写原型，减少冗余精简
``` javascript
function Person() {}
// Person.prototype被设置为等于一个通过对象字面量创建的新对象
// 最终结果是一样的，只有一个问题：这样重写之后，Person.prototype的constructor属性就不指向Person了。
Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
```
在创建函数时，也会创建它的prototype对象，同时会自动给这个原型的constructor属性赋值。而上面的写法完全重写了默认的prototype对象，因此其constructor属性也指向了完全不同的新对象（Object构造函数）​，不再指向原来的构造函数。虽然instanceof操作符还能可靠地返回值，但我们不能再依靠constructor属性来识别类型了
``` javascript
let friend = new Person();
// instanceof仍然对Object和Person都返回true
console.log(friend instanceof Object);        // true
console.log(friend instanceof Person);        // true
// 但constructor属性现在等于Object而不是Person了
console.log(friend.constructor == Person);   // false
console.log(friend.constructor == Object);   // true
```
#### 如果constructor的值很重要，则可以像下面这样在重写原型对象时专门设置一下它的值
``` javascript
function Person() {
}
// 这次的代码中特意包含了constructor属性，并将它设置为Person，保证了这个属性仍然包含恰当的值
Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
    console.log(this.name);
    }
};
```
📢以这种方式恢复constructor属性会创建一个[​[Enumerable]​]为true的属性。而原生constructor属性默认是不可枚举的。

因此，如果你使用的是兼容ECMAScript的JavaScript引擎，那可能会改为使用Object.defineProperty()方法来定义constructor属性。
``` javascript
function Person() {}
Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
    console.log(this.name);
    }
};
// 恢复constructor属性
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
});
```
#### 问题
这样重写之后（使用对象字面量写原型），**Person.prototype的constructor属性就不指向Person了**。在创建函数时，也会创建它的prototype对象，同时会自动给这个原型的constructor属性赋值。而上面的写法**完全重写了默认的prototype对象**，因此其**constructor属性也指向了完全不同的新对象（Object构造函数）​，不再指向原来的构造函数**。
- **instanceof操作符还能可靠地返回值**，
- 但**不能再依靠constructor属性来识别类型**了
如下面的例子所示：
``` javascript
let friend = new Person();
console.log(friend instanceof Object);        // true
console.log(friend instanceof Person);        // true
console.log(friend.constructor == Person);   // false
console.log(friend.constructor == Object);   // true
```
### ②原型的动态性
因为从原型上搜索值的过程是动态的，所以即使实例在修改原型之前已经存在，任何时候对原型对象所做的修改也会在实例上反映出来。
``` javascript
// 先创建一个Person实例并保存在friend中。然后一条语句在Person.prototype上添加了一个名为sayHi()的方法。
let friend = new Person();
Person.prototype.sayHi = function() {
    console.log("hi");
};
// 虽然friend实例是在添加方法之前创建的，但它仍然可以访问这个方法。
friend.sayHi();    // "hi"，没问题！
```
因为实例和原型之间的链接就是简单的指针，而不是保存的副本，所以会在原型上找到sayHi属性并返回这个属性保存的函数。
#### 修改prototype属性或方法与重写整个原型的区别
虽然随时能给原型添加属性和方法，并能够立即反映在所有对象实例上，但这跟重写整个原型是两回事。**实例的[​[Prototype]​]指针是在调用构造函数时自动赋值的**，这个指针即使把原型修改为不同的对象也不会变。重写整个原型会切断最初原型与构造函数的联系，但实例引用的仍然是最初的原型。记住，实例只有指向原型的指针，没有指向构造函数的指针。
``` javascript
function Person() {}
let friend = new Person();
Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
// Person的新实例是在重写原型对象之前创建的。在调用friend.sayName()的时候，会导致错误。
friend.sayName();   // 错误
```
这是因为firend指向的原型还是最初的原型，而这个原型上并没有sayName属性。

**重写构造函数上的原型之后再创建的实例才会引用新的原型。而在此之前创建的实例仍然会引用最初的原型。**

### 原生对象原型
原型模式之所以重要，不仅体现在自定义类型上，而且还因为它也是实现所有原生引用类型的模式。所有原生引用类型的构造函数（包括Object、Array、String等）都在原型上定义了实例方法。比如，数组实例的sort()方法就是Array.prototype上定义的，而字符串包装对象的substring()方法也是在String.prototype上定义的。
``` javascript
console.log(typeof Array.prototype.sort);         // "function"
console.log(typeof String.prototype.substring); // "function"
```
通过原生对象的原型可以取得所有默认方法的引用，也可以给原生类型的实例定义新的方法。可以像修改自定义对象原型一样修改原生对象原型，因此随时可以添加方法。

#### 下面的代码就给String原始值包装类型的实例添加了一个startsWith()方法
``` javascript
// 如果给定字符串的开头出现了调用startsWith()方法的文本，那么该方法会返回true
String.prototype.startsWith = function (text) {
    return this.indexOf(text) === 0;
};
let msg = "Hello world! ";
// 因为这个方法是被定义在String.prototype上，所以当前环境下所有的字符串都可以使用这个方法。
// msg是个字符串，在读取它的属性时，后台会自动创建String的包装实例，从而找到并调用startsWith()方法。
console.log(msg.startsWith("Hello"));   // true
```

📢尽管可以这么做，但并不推荐在产品环境中修改原生对象原型。这样做很可能造成误会，而且可能引发命名冲突（比如一个名称在某个浏览器实现中不存在，在另一个实现中却存在）​。另外还有可能意外重写原生的方法。推荐的做法是创建一个自定义的类，继承原生类型。

### 原型的问题
原型模式也不是没有问题。
- 首先，它弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性值。
- 最主要问题源自它的共享特性。

原型上的所有属性是在实例间共享的，这对函数来说比较合适。另外包含原始值的属性也还好，如前面例子中所示，可以通过在实例上添加同名属性来简单地遮蔽原型上的属性。真正的问题来自**包含引用值的属性**
``` javascript
function Person() {}
// Person.prototype有一个名为friends的属性，它包含一个字符串数组。
Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    friends: ["Shelby", "Court"],
    sayName() {
        console.log(this.name);
    }
};
// 创建了两个Person的实例
let person1 = new Person();
let person2 = new Person();
// person1.friends通过push方法向数组中添加了一个字符串
person1.friends.push("Van");
// 由于这个friends属性存在于Person.prototype而非person1上，新加的这个字符串也会在（指向同一个数组的）person2.friends上反映出来。
console.log(person1.friends);   // "Shelby,Court,Van"
console.log(person2.friends);   // "Shelby,Court,Van"
console.log(person1.friends === person2.friends);   // true
```
如果这是有意在多个实例间共享数组，那没什么问题。但一般来说，不同的实例应该有属于自己的属性副本。这就是实际开发中通常不单独使用原型模式的原因。
