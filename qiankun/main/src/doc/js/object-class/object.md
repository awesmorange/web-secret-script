# 理解对象
创建自定义对象的通常方式是**创建Object的一个新实例**，然后再给它**添加属性和方法**
``` javascript
    let person = new Object();
    person.name = "Nicholas";
    person.age = 29;
    person.job = "Software Engineer";
    person.sayName = function() {
        console.log(this.name); // 会解析为person.name
    };
```
## 对象字面量
``` javascript
let person = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
// 与上面的person对象是等价的
```

## 属性的类型
ECMA-262使用一些**内部特性**来**描述属性的特征**。这些特性是由为JavaScript实现引擎的规范定义的。因此，开发者**不能在JavaScript中直接访问**这些特性。为了将某个特性标识为内部特性，规范会用两个中括号把特性的名称括起来，比如[​[Enumerable]​]​。属性分两种：**数据属性**和**访问器属性**。

### 数据属性
数据属性包含一个**保存数据值**的位置。值会从这个位置读取，也会写入到这个位置。数据属性有4个特性描述它们的行为。
- [​[Configurable]​]​：表示属性**是否可以通过delete删除并重新定义**，**是否可以修改它的特性**，以及**是否可以把它改为访问器属性**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**，如前面的例子所示。
- [​[Enumerable]​]​：表示属性**是否可以通过for-in循环返回**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**，如前面的例子所示。
- [​[Writable]​]​：表示属性的值是**否可以被修改**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**，如前面的例子所示。
- [​[Value]​]​：包含属性**实际的值**。这就是前面提到的那个读取和写入属性值的位置。这个特性的**默认值**为**undefined**。

#### 注意
1. 像前面例子中那样**将属性显式添加到对象**之后，​[​[Configurable]​]​、​[​[Enumerable]​]和[​[Writable]​]都会被设置为true，而[​[Value]​]特性会被设置为指定的值。
``` javascript
let person = {
    name: "Nicholas"
};
```
2. 要修改属性的默认特性，就必须使用Object.defineProperty()方法。
Object.defineProperty()接收3个参数：要给其添加属性的对象、属性的名称和一个描述符对象（configurable、enumerable、writable和value，跟相关特性的名称一一对应）。
``` javascript
let person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
}); // 只读的值"Nicholas"，不能再修改
console.log(person.name); // "Nicholas"
person.name = "Greg";
console.log(person.name); // "Nicholas"
```
在非严格模式下尝试给这个属性重新赋值会被忽略。在严格模式下，尝试修改只读属性的值会抛出错误。
3. 类似的规则也适用于创建不可配置的属性。
``` javascript
let person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
}); // name不能从对象上删除
console.log(person.name); // "Nicholas"
delete person.name;
console.log(person.name); // "Nicholas"
```
非严格模式下对这个属性调用delete没有效果，严格模式下会抛出错误。
4. 一个属性被定义为不可配置之后，就不能再变回可配置的了。再次调用Object.defineProperty()并修改任何非writable属性会导致错误。
``` javascript
let person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
});
// 抛出错误
Object.defineProperty(person, "name", {
    configurable: true,
    value: "Nicholas"
});
```
虽然可以对同一个属性多次调用Object.defineProperty()，但在把configurable设置为false之后就会受限制了。
5. 在调用Object.defineProperty()时，configurable、enumerable和writable的值如果不指定，则都默认为false。
### 访问器属性
访问器属性**不包含数据值**。包含一个获取（getter）函数和一个设置（setter）函数，不过这两个函数不是必需的。访问器属性有4个特性描述它们的行为。
- [​[Configurable]​]​：表示属性是否可以**通过delete删除并重新定义**，是否可以**修改它的特性**，以及**是否可以把它改为数据属性**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**。
- [​[Enumerable]​]​：表示属性**是否可以通过for-in循环返回**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**。
- [​[Get]​]​：获取函数，在读取属性时调用。**默认值**为**undefined**。
- [​[Set]​]​：设置函数，在写入属性时调用。**默认值**为**undefined**

#### 注意
1. 访问器属性是不能直接定义的，必须使用Object.defineProperty()。
``` javascript
// 定义一个对象，包含伪私有成员year_和公共成员edition
let book = {
    year_: 2017, // year_中的下划线常用来表示该属性并不希望在对象方法的外部被访问。
    edition: 1
};
Object.defineProperty(book, "year", {
    get() {
        return this.year_;
    },
    set(newValue) {
        if (newValue > 2017) {
            this.year_ = newValue;
            this.edition += newValue -2017;
        }
    }
});
book.year = 2018;
console.log(book.edition); // 2
```
2. 获取函数和设置函数不一定都要定义。**只定义获取函数**意味着属性是**只读**的，尝试修改属性会被忽略。

在严格模式下，尝试写入只定义了获取函数的属性会抛出错误。类似地，只有一个设置函数的属性是不能读取的，非严格模式下读取会返回undefined，严格模式下会抛出错误。
3. 在不支持Object.defineProperty()的浏览器中没有办法修改[​[Configurable]​]或[​[Enumerable]​]​。
4. 在ECMAScript 5以前，开发者会使用两个非标准的访问创建访问器属性：__define-Getter__()和__defineSetter__()。这两个方法最早是Firefox引入的，后来Safari、Chrome和Opera也实现了。

## 定义多个属性

## 读取属性的特性

## 合并对象

## 对象标识及相等判定

## 增强的对象语法

## 对象解构

