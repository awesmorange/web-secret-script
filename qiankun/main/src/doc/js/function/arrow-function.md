# 箭头函数（ES6新增）
箭头函数实例化的函数对象与正式的函数表达式创建的函数对象行为是相同的。

箭头函数虽然语法简洁，但也有很多场合不适用。

箭头函数<b>不能使用arguments、super和new.target，也不能用作构造函数。此外，箭头函数也没有prototype属性。</b>

``` javascript
// 箭头函数
const fun1 = () => {
  return 'hello world'
}

const fun2 = () => 'hello world'

const fun3 = (a, b) => a + b
```

## 箭头函数中的参数
<b>不能使用arguments关键字，只能通过定义的命名参数访问</b>。
但可以在包装函数中把它提供给箭头函数。

``` javascript
function foo() {
  let bar = () => {
    console.log(arguments[0]) // 1
  };
  bar()
}
foo(1)
```
