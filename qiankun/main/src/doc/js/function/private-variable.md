# 私有变量
严格来讲，JavaScript没有私有成员的概念，**所有对象属性都公有的**。不过，倒是有私有变量的概念。任何定义在**函数或块中的变量**，都可以认为是**私有的**，因为在这个函数或块的外部无法访问其中的变量。私有变量包括**函数参数、局部变量，以及函数内部定义的其他函数**。
``` javascript
function add(num1, num2) {
    let sum = num1 + num2;
    return sum;
}
```
如果这个函数中**创建了一个闭包**，则这个闭包能**通过其作用域链访问其外部的这3个变量**。基于这一点，就可以创建出能够**访问私有变量的公有方法**。

## 特权方法
特权方法（privileged method）是能**够访问函数私有变量（及私有函数）**的**公有方法**。

在对象上有两种方式创建特权方法。
- 第一种是在构造函数中实现
- 第二种是在原型对象上实现

### 在构造函数中实现
``` javascript
function MyObject() {
    // 私有变量和私有函数
    let privateVariable = 10;
    function privateFunction() {
        return false;
    }
    // 特权方法
    this.publicMethod = function() {
        privateVariable++;
        return privateFunction();
    };
}
```
这个模式是把所有**私有变量**和**私有函数**都定义**在构造函数中**。然后，再创建一个**能够访问这些私有成员的特权方法**。这样做之所以可行，是因为定义在构造函数中的**特权方法其实是一个闭包**，它具有访问构造函数中定义的所有变量和函数的能力。

### 在原型对象上实现
``` javascript
function Person(name) {
    this.getName = function() {
        return name;
    };
    this.setName = function (value) {
        name = value;
    };
}
let person = new Person('Nicholas');
console.log(person.getName());   // 'Nicholas'
person.setName('Greg');
console.log(person.getName());   // 'Greg'
```
可以定义私有变量和特权方法，以隐藏不能被直接修改的数据。

这段代码中的构造函数定义了两个**特权方法**：getName()和setName()。每个方法都可以构造函数外部调用，并通过它们来读写私有的name变量。在Person构造函数外部，没有别的办法访问name。因为两个方法都定义在构造函数内部，所以它们都是**能够通过作用域链访问name的闭包**。**私有变量name**对每个Person实例而言都是独一无二的，因为**每次调用构造函数都会重新创建一套变量和方法**。

### 注意
不过这样也有个问题：必须通过构造函数来实现这种隔离。正如对象、类与面向对象编程章节所讨论的，**构造函数模式的缺点是每个实例都会重新创建一遍新方法**。使用**静态私有变量实现特权方法可以避免这个问题**。

## 静态私有变量
特权方法也可以通过使用私有作用域定义私有变量和函数来实现。
``` javascript
(function() {
    // 私有变量和私有函数
    let privateVariable = 10;
    function privateFunction() {
        return false;
    }
    // 构造函数
    MyObject = function() {};
    // 公有和特权方法
    MyObject.prototype.publicMethod = function() {
        privateVariable++;
        return privateFunction();
    };
})();
```
在这个模式中，匿名函数表达式创建了一个包含构造函数及其方法的私有作用域。首先定义的是私有变量和私有函数，然后又定义了构造函数和公有方法。公有方法定义在构造函数的原型上，与典型的原型模式一样。

注意，这个模式定义的构造函数**没有使用函数声明**，使用的是函数表达式。函数声明会创建内部函数，在这里并不是必需的。基于同样的原因（但操作相反）​，这里声明**MyObject并没有使用任何关键字**。因为不使用关键字声明的变量**会创建在全局作用域中**，所以MyObject变成了全局变量，可以在这个私有作用域外部被访问。注意在**严格模式下给未声明的变量赋值会导致错误**。

### 静态私有变量与在原型对象上实现特权方式的比较
主要区别就是，**私有变量和私有函数是由实例共享的**。因为特权方法定义在原型上，所以同样是由实例共享的。特权方法作为一个闭包，始终引用着包含它的作用域。
``` javascript
(function() {
    let name = '';
    Person = function(value) {
        name = value;
    };
    Person.prototype.getName = function() {
        return name;
    };
    Person.prototype.setName = function(value) {
        name = value;
    };
})();

let person1 = new Person('Nicholas');
console.log(person1.getName());   // 'Nicholas'
person1.setName('Matt');
console.log(person1.getName());   // 'Matt'
let person2 = new Person('Michael');
console.log(person1.getName());   // 'Michael'
console.log(person2.getName());   // 'Michael'
```
使用这种模式，name变成了**静态变量**，可**供所有实例使用**。这意味着在任何实例上**调用setName()**修改这个变量都会**影响其他实例**。**调用setName()**或**创建新的Person实例**都要把name变量**设置为一个新值**。而**所有实例都会返回相同的值**。

### 总结
像这样创建静态私有变量可以**利用原型更好地重用代码**，只是**每个实例没有了自己的私有变量**。最终，到底是把私有变量放在实例中，还是作为静态私有变量，都需要根据自己的需求来确定。

### 注意
使用闭包和私有变量会导致作用域链变长，作用域链越长，则查找变量所需的时间也越多。

## 模块模式
前面的模式通过自定义类型创建了私有变量和特权方法。而下面要讨论的Douglas Crockford所说的**模块模式**，则在**一个单例对象上实现了相同的隔离和封装**。

### 单例对象
单例对象（singleton）就是**只有一个实例的对象**。按照惯例，JavaScript是通过对象字面量来创建单例对象的。
``` javascript
let singleton = {
    name: value,
    method() {
        // 方法的代码
    }
};
```

### 模块模式
模块模式是在单例对象基础上加以扩展，使其通过作用域链来关联私有变量和特权方法。
``` javascript
let singleton = function() {
    // 私有变量和私有函数
    let privateVariable = 10;
    function privateFunction() {
        return false;
    }
    // 特权/公有方法和属性
    return {
        publicProperty: true,
        publicMethod() {
            privateVariable++;
            return privateFunction();
        }
    };
}();
```
模块模式使用了**匿名函数返回一个对象**。
- 在匿名函数内部，首先定义私有变量和私有函数。
- 之后，创建一个要通过匿名函数返回的对象字面量。

这个对象字面量中只包含可以公开访问的属性和方法。因为这个对象定义在匿名函数内部，所以它的所有公有方法都可以访问同一个作用域的私有变量和私有函数。本质上，对象字面量定义了单例对象的公共接口。

### 如果单例对象需要进行某种初始化，并且需要访问私有变量时，该怎么办？
``` javascript
// 创建了一个application对象用于管理组件
let application = function() {
    // 私有变量和私有函数
    let components = new Array();
    // 初始化
    components.push(new BaseComponent());
    // 公共接口
    return {
        getComponentCount() {
            return components.length;
        },
        registerComponent(component) {
            if (typeof component == 'object') {
                components.push(component);
            }
        }
    };
}();
```
在Web开发中，经常需要使用单例对象管理应用程序级的信息。上面这个简单的例子创建了一个application对象用于管理组件。
- 在创建这个对象之后，内部就会创建一个私有的数组components，
- 然后将一个BaseComponent组件的新实例添加到数组中。

​（BaseComponent组件的代码并不重要，在这里用它只是为了说明模块模式的用法。​）对象字面量中定义的getComponentCount()和register-Component()方法都是可以访问components私有数组的特权方法。前一个方法返回注册组件的数量，后一个方法负责注册新组件。

### 总结
**在模块模式中，单例对象作为一个模块，经过初始化可以包含某些私有的数据，而这些数据又可以通过其暴露的公共方法来访问**。以这种方式创建的**每个单例对象都是Object的实例**，因为最终单例都由一个对象字面量来表示。不过这无关紧要，因为**单例对象通常是可以全局访问的，而不是作为参数传给函数的，所以可以避免使用instanceof操作符确定参数是不是对象类型的需求**。

## 模块增强模式
另一个利用模块模式的做法是在返回对象之前先对其进行增强。这适合单例对象需要是某个特定类型的实例，但又必须给它添加额外属性或方法的场景。
``` javascript
let singleton = function() {
    // 私有变量和私有函数
    let privateVariable = 10;
    function privateFunction() {
        return false;
    }
    // 创建对象
    let object = new CustomType();
    // 添加特权/公有属性和方法
    object.publicProperty = true;
    object.publicMethod = function() {
        privateVariable++;
        return privateFunction();
    };
    // 返回对象
    return object;
}();
```
如果前一节的application对象必须是BaseComponent的实例，那么就可以使用下面的代码来创建它:
``` javascript
let application = function() {
    // 私有变量和私有函数
    let components = new Array();
    // 初始化
    components.push(new BaseComponent());
    // 创建局部变量保存实例
    let app = new BaseComponent();
    // 公共接口
    app.getComponentCount = function() {
        return components.length;
    };
    app.registerComponent = function(component) {
        if (typeof component == "object") {
            components.push(component);
        }
    };
    // 返回实例
    return app;
}();
```
在这个重写的application单例对象的例子中，首先定义了私有变量和私有函数，跟之前例子中一样。主要区别在于这里创建了一个名为app的变量，其中保存了BaseComponent组件的实例。这是最终要变成application的那个对象的局部版本。在给这个局部变量app添加了能够访问私有变量的公共方法之后，匿名函数返回了这个对象。然后，这个对象被赋值给application。