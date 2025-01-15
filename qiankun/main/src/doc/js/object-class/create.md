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
### 注意
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

### new操作符做了什么？
要创建Person的实例，应使用new操作符。以这种方式调用构造函数会执行如下操作。
1. 在内存中**创建一个新对象**。
2. 这个新对象内部的[​[Prototype]​]特性被**赋值**为构造函数的prototype属性。
3. 构造函数内部的this被赋值为这个新对象（即this指向新对象）​。
4. 执行构造函数内部的代码（给新对象添加属性）​。
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。










## 原型模式

















## 对象迭代







