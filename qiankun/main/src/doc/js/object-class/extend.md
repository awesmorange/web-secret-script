# 继承
大多数面向对象都支持**接口继承**（只继承方法签名）和**实现继承**（继承实际的方法）。js 仅支持实现继承（主要通过原型继承），因为函数，没有签名。

## 1. 原型链
实现继承：通过原型继承多个引用类型的属性和方法。

构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，实例有一个内部指针指向原型。

🤔❓如果原型是另一个类型的实例呢？

那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。这就是原型链的基本构想
```javascript
// 以下代码定义了两个类型：SuperType和SubType。
// 这两个类型分别定义了一个属性和一个方法。
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function() {
  return this.property;
};
function SubType() {
  this.subproperty = false;
}
// 继承SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
  return this.subproperty;
};
// 这两个类型的主要区别是SubType通过创建SuperType的实例并将其赋值给自己的原型SubTtype. prototype实现了对SuperType的继承。
// 这个赋值重写了SubType最初的原型，将其替换为SuperType的实例。这意味着SuperType实例可以访问的所有属性和方法也会存在于SubType. prototype。这样实现继承之后，代码紧接着又给SubType.prototype，也就是这个SuperType的实例添加了一个新方法。最后又创建了SubType的实例并调用了它继承的getSuperValue()方法。
let instance = new SubType();
console.log(instance.getSuperValue()); // true
```