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
只要**创建一个函数**，就会按照特定的规则为这个函数**创建一个prototype属性**（指向原型对象）​。默认情况下，所有原型对象**自动获得一个名为constructor的属性**，**指回与之关联的构造函数**。对前面的例子而言，Person.prototype.constructor指向Person。然后，因构造函数而异，可能会给原型对象添加其他属性和方法。

在**自定义构造函数**时，原型对象**默认只会获得constructor属性**，**其他的所有方法都继承自Object**。每次调用构造函数创建一个新实例，这个实例的内部[​[Prototype]​]指针就会被赋值为构造函数的原型对象。脚本中没有访问这个[​[Prototype]​]特性的标准方式，但Firefox、Safari和Chrome会在每个对象上暴露__proto__属性，通过这个属性可以访问对象的原型。在其他实现中，这个特性完全被隐藏了。关键在于理解这一点：实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有。
``` javascript
/＊＊
＊ 构造函数可以是函数表达式
＊ 也可以是函数声明，因此以下两种形式都可以：
＊    function Person() {}
＊    let Person = function() {}
＊/
function Person() {}
/＊＊
＊ 声明之后，构造函数就有了一个
＊ 与之关联的原型对象：
＊/
console.log(typeof Person.prototype);
console.log(Person.prototype);
// {
//    constructor: f Person(),
//    __proto__: Object
// }
/＊＊
＊ 如前所述，构造函数有一个prototype属性
＊ 引用其原型对象，而这个原型对象也有一个
＊ constructor属性，引用这个构造函数
＊ 换句话说，两者循环引用：
＊/
console.log(Person.prototype.constructor === Person); // true
/＊＊
＊ 正常的原型链都会终止于Object的原型对象
＊ Object原型的原型是null
＊/
console.log(Person.prototype.__proto__ === Object.prototype);    // true
console.log(Person.prototype.__proto__.constructor === Object); // true
console.log(Person.prototype.__proto__.__proto__ === null);      // true
console.log(Person.prototype.__proto__);
// {
//    constructor: f Object(),
//    toString: ...
//    hasOwnProperty: ...
//    isPrototypeOf: ...
//    ...
// }
let person1 = new Person(),
    person2 = new Person();
/＊＊
＊ 构造函数、原型对象和实例
＊ 是3 个完全不同的对象：
＊/
console.log(person1 ! == Person);              // true
console.log(person1 ! == Person.prototype); // true
console.log(Person.prototype ! == Person);   // true
/＊＊
＊ 实例通过__proto__链接到原型对象，
＊ 它实际上指向隐藏特性[[Prototype]]
＊
＊ 构造函数通过prototype属性链接到原型对象
＊
＊ 实例与构造函数没有直接联系，与原型对象有直接联系
＊/
console.log(person1.__proto__ === Person.prototype);    // true
conosle.log(person1.__proto__.constructor === Person); // true
/＊＊
＊ 同一个构造函数创建的两个实例
＊ 共享同一个原型对象：
＊/
console.log(person1.__proto__ === person2.__proto__); // true
/＊＊
＊ instanceof检查实例的原型链中
＊ 是否包含指定构造函数的原型：
＊/
console.log(person1 instanceof Person);              // true
console.log(person1 instanceof Object);              // true
console.log(Person.prototype instanceof Object);   // true
```
![对于前面例子中的Person构造函数和Person.prototype，可以通过图看出各个对象之间的关系。](image.png)

展示了Person构造函数、Person的原型对象和Person现有两个实例之间的关系。注意，Person.prototype指向原型对象，而Person.prototype.contructor指回Person构造函数。原型对象包含constructor属性和其他后来添加的属性。Person的两个实例person1和person2都只有一个内部属性指回Person.prototype，而且两者都与构造函数没有直接联系。另外要注意，虽然这两个实例都没有属性和方法，但person1.sayName()可以正常调用。这是由于对象属性查找机制的原因。
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
  
