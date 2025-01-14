# 理解对象
- Object.defineProperty()
- Object.defineProperties()
- Object.getOwnPropertyDescriptor()
- Object.assign()（ES6新增）
- Object.is()（ES6新增）
- ES6新增的语法糖
- 解构赋值（ES6新增）

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

## 属性的类型 Object.defineProperty()
ECMA-262使用一些**内部特性**来**描述属性的特征**。这些特性是由为JavaScript实现引擎的规范定义的。因此，开发者**不能在JavaScript中直接访问**这些特性。为了将某个特性标识为内部特性，规范会用两个中括号把特性的名称括起来，比如[​[Enumerable]​]​。属性分两种：**数据属性**和**访问器属性**。

### 数据属性
数据属性包含一个**保存数据值**的位置。值会从这个位置读取，也会写入到这个位置。数据属性有4个特性描述它们的行为。
- **[​[Configurable]​]**​：表示属性**是否可以通过delete删除并重新定义**，**是否可以修改它的特性**，以及**是否可以把它改为访问器属性**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**，如前面的例子所示。
- **[​[Enumerable]​]**​：表示属性**是否可以通过for-in循环返回**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**，如前面的例子所示。
- **[​[Writable]​]**​：表示属性的值是**否可以被修改**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**，如前面的例子所示。
- **[​[Value]​]**​：包含属性**实际的值**。这就是前面提到的那个读取和写入属性值的位置。这个特性的**默认值**为**undefined**。

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
5. **在调用Object.defineProperty()时，configurable、enumerable和writable的值如果不指定，则都默认为false**。

### 访问器属性
访问器属性**不包含数据值**。包含一个获取（getter）函数和一个设置（setter）函数，不过这两个函数不是必需的。访问器属性有4个特性描述它们的行为。
- **[​[Configurable]​]**​：表示属性是否可以**通过delete删除并重新定义**，是否可以**修改它的特性**，以及**是否可以把它改为数据属性**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**。
- **[​[Enumerable]​]**​：表示属性**是否可以通过for-in循环返回**。**默认**情况下，所有直接定义在对象上的属性的这个特性都是**true**。
- **[​[Get]​]​**：获取函数，在读取属性时调用。**默认值**为**undefined**。
- **[​[Set]​]​**：设置函数，在写入属性时调用。**默认值**为**undefined**

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

## 定义多个属性 Object.defineProperties()
ECMAScript提供了Object.defineProperties()方法。这个方法可以通过多个描述符**一次性定义多个属性**。它接收两个参数：要为之添加或修改属性的**对象**和另一个**描述符对象**，其属性与要添加或修改的属性一一对应。
``` javascript
let book = {};
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    },
    year: {
        get() {
            return this.year_;
        },
        set(newValue) {
            if (newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue -2017;
            }
        }
    }
});
```
这段代码在book对象上定义了两个数据属性year_和edition，还有一个访问器属性year。最终的对象跟上一节示例中的一样。唯一的区别是所有属性都是同时定义的，并且**数据属性的configurable、enumerable和writable特性值都是false**。

## 读取属性的特性 Object.getOwnPropertyDescriptor()
使用Object.getOwnPropertyDescriptor()方法可以**取得指定属性的属性描述符**。这个方法接收两个参数：属性所在的**对象**和要取得**其描述符的属性名**。**返回值是一个对象**，对于访问器属性包含configurable、enumerable、get和set属性，对于数据属性包含configurable、enumerable、writable和value属性。
``` javascript
let book = {};
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    },
    year: {
        get: function() {
            return this.year_;
        },
        set: function(newValue){
            if (newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue -2017;
            }
        }
    }
});
let descriptor = Object.getOwnPropertyDescriptor(book, "year_");
console.log(descriptor.value);             // 2017
console.log(descriptor.configurable);    // false
console.log(typeof descriptor.get);      // "undefined"
let descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor.value);             // undefined
console.log(descriptor.enumerable);      // false
console.log(typeof descriptor.get);      // "function"
```
对于数据属性year_, value等于原来的值，configurable是false, get是undefined。对于访问器属性year, value是undefined, enumerable是false, get是一个指向获取函数的指针。

- ECMAScript 2017新增了Object.getOwnPropertyDescriptors()静态方法。这个方法实际上会在每个自有属性上调用Object.getOwnPropertyDescriptor()并在一个新对象中返回它们。
``` javascript
let book = {};
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    },
    year: {
        get: function() {
            return this.year_;
        },
        set: function(newValue){
            if (newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue -2017;
            }
        }
    }
});
console.log(Object.getOwnPropertyDescriptors(book));
// {
//    edition: {
//      configurable: false,
//      enumerable: false,
//      value: 1,
//      writable: false
//    },
//    year: {
//      configurable: false,
//      enumerable: false,
//      get: f(),
//      set: f(newValue),
//    },
//    year_: {
//      configurable: false,
//      enumerable: false,
//      value: 2017,
//      writable: false
//    }
// }
```

## 合并对象 Object.assign()
JavaScript开发者经常觉得“合并”​（merge）两个对象很有用。更具体地说，就是把源对象所有的本地属性一起复制到目标对象上。有时候这种操作也被称为“混入”​（mixin）​，因为目标对象通过混入源对象的属性得到了增强。

ECMAScript 6专门为合并对象提供了Object.assign()方法。这个方法接收一个目标对象和一个或多个源对象作为参数，然后将每个源对象中可枚举（Object.propertyIsEnumerable()返回true）和自有（Object.hasOwnProperty()返回true）属性复制到目标对象。以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的[​[Get]​]取得属性的值，然后使用目标对象上的[​[Set]​]设置属性的值。
``` javascript
let dest, src, result;
/＊＊
＊ 简单复制
＊/
dest = {};
src = { id: 'src' };
result = Object.assign(dest, src);
// Object.assign修改目标对象
// 也会返回修改后的目标对象
console.log(dest === result); // true
console.log(dest ! == src);     // true
console.log(result);             // { id: src }
console.log(dest);               // { id: src }
/＊＊
＊ 多个源对象
＊/
dest = {};
result = Object.assign(dest, { a: 'foo' }, { b: 'bar' });
console.log(result); // { a: foo, b: bar }
/＊＊
＊ 获取函数与设置函数
＊/
dest = {
    set a(val) {
        console.log(`Invoked dest setter with param ${val}`);
    }
};
src = {
    get a() {
        console.log('Invoked src getter');
        return 'foo';
    }
};
Object.assign(dest, src);
// 调用src的获取方法
// 调用dest的设置方法并传入参数"foo"
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把值转移过来
console.log(dest); // { set a(val) {...} }
```

## 对象标识及相等判定 Object.is()
### 在ECMAScript 6之前，有些特殊情况即使是===操作符也无能为力
``` javascript
// 这些是===符合预期的情况
console.log(true === 1);   // false
console.log({} === {});    // false
console.log("2" === 2);    // false
// 这些情况在不同JavaScript引擎中表现不同，但仍被认为相等
console.log(+0 === -0);    // true
console.log(+0 === 0);     // true
console.log(-0 === 0);     // true
// 要确定NaN的相等性，必须使用极为讨厌的isNaN()
console.log(NaN === NaN); // false
console.log(isNaN(NaN));   // true
```
### ECMAScript 6规范新增了Object.is()
这个方法与===很像，但同时也考虑到了上述边界情形。这个方法必须接收两个参数：
``` javascript
console.log(Object.is(true, 1));   // false
console.log(Object.is({}, {}));    // false
console.log(Object.is("2", 2));    // false
// 正确的0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0));    // false
console.log(Object.is(+0, 0));     // true
console.log(Object.is(-0, 0));     // false
// 正确的NaN相等判定
console.log(Object.is(NaN, NaN)); // true
```
要检查超过两个值，递归地利用相等性传递即可
``` javascript
function recursivelyCheckEqual(x, ...rest) {
    return Object.is(x, rest[0]) &&
            (rest.length < 2 || recursivelyCheckEqual(...rest));
}
```

## 增强的对象语法
ECMAScript 6为定义和操作对象新增了很多极其有用的**语法糖特性**。这些特性都**没有改变现有引擎的行为**，但**极大地提升了处理对象的方便程度**。
本节介绍的所有对象语法**同样适用于ECMAScript 6的类**。
### 属性值简写
1. 简写属性名只要**使用变量名（不用再写冒号）就会自动被解释为同名的属性键**。如果没有找到同名变量，则会抛出ReferenceError。
``` javascript
let name = 'Matt';
let person = {
//   name: name, // 冗余
    name // 语法糖，可以简写为name
};
console.log(person); // { name: 'Matt' }
```
2. 代码压缩程序会在不同作用域间保留属性名，以防止找不到引用。
``` javascript
function makePerson(name) {
    return {
        name
    };
}
let person = makePerson('Matt');
console.log(person.name);   // Matt
```
在这里，即使参数标识符只限定于函数作用域，编译器也会保留初始的name标识符。如果使用Google Closure编译器压缩，那么函数参数会被缩短，而属性名不变
``` javascript
function makePerson(a) {
    return {
        name: a
    };
}
var person = makePerson("Matt");
console.log(person.name); // Matt
```

### 可计算属性
#### 在引入可计算属性之前
如果想**使用变量的值作为属性**，那么必须**先声明对象**，然后使用**中括号语法来添加属性**。换句话说，_不能在对象字面量中直接动态命名属性_。
``` javascript
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let person = {};
person[nameKey] = 'Matt';
person[ageKey] = 27;
person[jobKey] = 'Software engineer';
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }
```
#### 有了可计算属性之后
就可以在**对象字面量中完成动态属性赋值**。中括号包围的对象属性键告诉运行时将其作为JavaScript表达式而不是字符串来求值。
``` javascript
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let person = {
    [nameKey]: 'Matt',
    [ageKey]: 27,
    [jobKey]: 'Software engineer'
};
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }
```
#### 可计算属性本身可以是复杂的表达式
因为被当作JavaScript表达式求值，所以可计算属性本身可以是复杂的表达式，在实例化时再求值
``` javascript
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let uniqueToken = 0;
function getUniqueKey(key) {
    return `${key}_${uniqueToken++}`;
}
let person = {
    [getUniqueKey(nameKey)]: 'Matt',
    [getUniqueKey(ageKey)]: 27,
    [getUniqueKey(jobKey)]: 'Software engineer'
};
console.log(person);   // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
```
#### 注意
**可计算属性表达式**中**抛出任何错误**都会**中断对象创建**。如果计算属性的表达式有副作用，那就要小心了，因为如果表达式抛出错误，那么之前完成的计算是不能回滚的。

### 简写方法名
在给对象定义方法时，通常都要写一个方法名、冒号，然后再引用一个匿名函数表达式。
``` javascript
let person = {
    sayName: function(name) {
        console.log(`My name is ${name}`);
    }
};
person.sayName('Matt'); // My name is Matt
```
#### 有了简写方法名之后
新的简写方法的语法遵循同样的模式，但开发者要放弃给函数表达式命名。
``` javascript
let person = {
    sayName(name){
        console.log(`My name is ${name}`);
    }
};
person.sayName('Matt'); // My name is Matt
```
#### 简写方法名对获取函数和设置函数也是适用的
``` javascript
let person = {
    name_: '',
    get name() {
        return this.name_;
    },
    set name(name) {
        this.name_ = name;
    },
    sayName() {
        console.log(`My name is ${this.name_}`);
    }
};
person.name = 'Matt';
person.sayName(); // My name is Matt
```
#### 简写方法名与可计算属性键相互兼容
``` javascript
const methodKey = 'sayName';
let person = {
    [methodKey](name){
        console.log(`My name is ${name}`);
    }
}
person.sayName('Matt'); // My name is Matt
```
#### 注意
简写方法名对于本章后面介绍的ECMAScript 6的类更有用

## 对象解构
ECMAScript 6新增了**对象解构语法**，可以在**一条语句中使用嵌套数据实现一个或多个赋值操作**。简单地说，对象解构就是使用与对象匹配的结构来实现对象属性赋值。
### 认识解构赋值
``` javascript

let person = {
    name: 'Matt',
    age: 27
};
// 1. 不使用对象解构
// let personName = person.name,
//     personAge = person.age;
// 2. 使用对象解构
let { name: personName, age: personAge, job, address = 'earth' } = person;
console.log(personName); // Matt
console.log(personAge);   // 27
console.log(job);   // undefined
console.log(address);   // earth
```
- 解构赋值不一定与对象的属性匹配。赋值的时候可以忽略某些属性，而如果**引用的属性不存在**，则该变量的值就是**undefined**。
- 也可以在**解构赋值**的同时**定义默认值**，这适用于前面刚提到的引用的属性不存在于源对象中的情况。
- 解构在内部使用函数ToObject()（不能在运行时环境中直接访问）把源数据结构转换为对象。这意味着**在对象解构的上下文中**，**原始值会被当成对象**。这也意味着（根据ToObject()的定义）, **null和undefined不能被解构，否则会抛出错误**。
``` javascript
let { length } = 'foobar';
console.log(length);          // 6
let { constructor: c } = 4;
console.log(c === Number);   // true
let { _ } = null;              // TypeError
let { _ } = undefined;        // TypeError
```
- 解构并不要求变量必须在解构表达式中声明。不过，如果是**给事先声明的变量赋值**，则**赋值表达式必须包含在一对括号中**。
``` javascript
let personName, personAge;
let person = {
    name: 'Matt',
    age: 27
};
({name: personName, age: personAge} = person);
console.log(personName, personAge); // Matt, 27
```
### 嵌套解构
1. 解构对于**引用嵌套的属性或赋值目标没有限制**。为此，可以通过解构来复制对象属性
``` javascript
let person = {
    name: 'Matt',
    age: 27,
    job: {
        title: 'Software engineer'
    }
};
let personCopy = {};
({
    name: personCopy.name,
    age: personCopy.age,
    job: personCopy.job
} = person);
// 因为一个对象的引用被赋值给personCopy，所以修改
// person.job对象的属性也会影响personCopy
person.job.title = 'Hacker'
console.log(person);
// { name: 'Matt', age: 27, job: { title: 'Hacker' } }
console.log(personCopy);
// { name: 'Matt', age: 27, job: { title: 'Hacker' } }
```
2. 解构赋值可以使用**嵌套结构**，以匹配嵌套的属性：
``` javascript
let person = {
    name: 'Matt',
    age: 27,
    job: {
        title: 'Software engineer'
    }
};
// 声明title变量并将person.job.title的值赋给它
let { job: { title } } = person;
console.log(title); // Software engineer
```
3. 在**外层属性没有定义**的情况下**不能使用嵌套解构**。无论源对象还是目标对象都一样
``` javascript
let person = {
    job: {
        title: 'Software engineer'
    }
};
let personCopy = {};
// foo在源对象上是undefined
({
    foo: {
        bar: personCopy.bar
    }
} = person);
// X TypeError: Cannot destructure property 'bar' of 'undefined' or 'null'.
// job在目标对象上是undefined
({
    job: {
    title: personCopy.job.title
    }
} = person);
// TypeError: Cannot set property 'title' of undefined
```
### 部分解构
需要注意的是，涉及**多个属性的解构赋值**是一个**输出无关的顺序化**操作。如果**一个解构表达式涉及多个赋值**，**开始的赋值成功而后面的赋值出错**，则整个解构赋值**只会完成一部分**
``` javascript
let person = {
    name: 'Matt',
    age: 27
};
let personName, personBar, personAge;
try {
    // person.foo是undefined，因此会抛出错误
    ({name: personName, foo: { bar: personBar }, age: personAge} = person);
} catch(e) {}
console.log(personName, personBar, personAge);
// Matt, undefined, undefined
```
### 参数上下文匹配
在函数参数列表中也可以进行解构赋值。对**参数的解构赋值不会影响arguments对象**，但**可以在函数签名中声明在函数体内使用局部变量**
``` javascript
let person = {
    name: 'Matt',
    age: 27
};
function printPerson(foo, {name, age}, bar) {
    console.log(arguments);
    console.log(name, age);
}
function printPerson2(foo, {name: personName, age: personAge}, bar) {
    console.log(arguments);
    console.log(personName, personAge);
}
printPerson('1st', person, '2nd');
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
printPerson2('1st', person, '2nd');
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
```
