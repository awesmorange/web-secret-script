# 创建对象（运用原型式继承模拟类）
使用Object构造函数或对象字面量可以方便地创建对象，但创建具有同样接口的多个对象需要重复编写很多代码。

在JavaScript中，创建对象有两种方法：
- Object构造函数
- 对象字面量

## 概述
### ECMAScript 5.1并没有正式支持面向对象的结构
比如类或继承。但是，巧妙地运用原型式继承可以成功地模拟同样的行为。
### ECMAScript 6开始正式支持类和继承
ES6的类旨在**完全涵盖之前规范设计的基于原型的继承模式**。不过，无论从哪方面看，**ES6的类**都仅仅是封装了**ES5.1构造函数加原型继承**的**语法糖**而已。
### 📢注意
采用**面向对象编程模式**的JavaScript代码还是**应该使用ECMAScript 6的类**。本文主要讲被ES6的类取代的那些底层概念。

## 工厂模式
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

## 构造函数模式
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

## 原型模式

















## 对象迭代







