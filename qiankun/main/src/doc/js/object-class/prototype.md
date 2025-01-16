# 创建对象篇（续）
## 原型模式
**每个函数**都会创建**一个prototype属性**，这个属性是**一个对象**，包含应该**由特定引用类型的实例共享的属性和方法**。实际上，**这个对象就是通过调用构造函数创建的对象的原型**。

🌟使用**原型对象**的**好处**是，**在它上面定义的属性和方法可以被对象实例共享**。

- 原来在构造函数中直接赋给对象实例的值，可以**直接赋值给它们的原型**，如下所示：
``` javascript
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    console.log(this.name);
};
let person1 = new Person();
person1.sayName(); // "Nicholas"
let person2 = new Person();
person2.sayName(); // "Nicholas"
console.log(person1.sayName == person2.sayName); // true
```
- 使用**函数表达式**也可以：
``` javascript
let Person = function() {};
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    console.log(this.name);
};
let person1 = new Person();
person1.sayName();    // "Nicholas"
let person2 = new Person();
person2.sayName();    // "Nicholas"
console.log(person1.sayName == person2.sayName); // true
```
这里，**所有属性**和sayName()方法都**直接添加到了Person的prototype属性上**，**构造函数体中什么也没有**。但这样定义之后，**调用构造函数创建的新对象仍然拥有相应的属性和方法**。与构造函数模式不同，**使用这种原型模式定义的属性和方法是由所有实例共享的**。因此person1和person2访问的都是相同的属性和相同的sayName()函数。要理解这个过程，就必须理解ECMAScript中原型的本质。

### 理解原型
<!-- TODO -->

### 原型层级
<!-- TODO -->


### 原型与in操作符
<!-- TODO -->

### 属性枚举顺序
<!-- TODO -->










## 对象迭代{Object.values()和Object.entries()}
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

### 其他原型语法
在前面的例子中，每次定义一个属性或方法都会把Person.prototype重写一遍。可以使用对象字面量重写原型，减少冗余精简
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
```
<!-- TODO -->

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
### 原型的动态性
<!-- TODO -->

### 原生对象原型
<!-- TODO -->

### 原型的问题
原型模式也不是没有问题。
- 首先，它弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性值。
- 最主要问题源自它的共享特性。
<!-- TODO -->
  
