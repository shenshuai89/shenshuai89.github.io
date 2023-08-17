---
title: 你不知道的JavaScript上
date: 2020-05-18 16:14:20
categories: 前端开发
tags: 
  - 前端
  - 作用域、闭包
  - this对象、原型链
permalink: /pages/86cafb/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
# 作用域和闭包

## 1.作用域是什么

制定出的一套良好的规则用来存储变量，这套规则被称作**作用域**

### 编译原理

传统语言编译的三个步骤

1. 分词/词法分析

   将由字符组成的字符串分解成有意义的代码块，这些代码块被称为词法单元(token)

2. 解析/语法分析

   该过程是将词法单元流转化成一个由元素逐级嵌套所组成的代表程序语法结构的树，这个树被称为“抽象语法树”(Abstract Syntax Tree, AST)

3. 代码生成

   将AST转换为可执行代码的过程被称作代码生成。这个过程与语言、目标平台等息息相关

JavaScript编译过程发生在代码执行前的几微秒时间内。在讨论作用域的背后，JavaScript引擎用尽了各种办法(JIT来延迟编译)保证性能最佳。

### 作用域

* 引擎
  从头到尾负责整个JavaScript 程序的编译及执行过程。
* 编译器
  引擎的好朋友之一，**负责语法分析及代码生成**等脏活累活。
* 作用域
  引擎的另一位好朋友，负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

LHS查询(赋值操作的目标是谁)和RHS(谁是赋值操作的源头)查询，是赋值操作的左侧和右侧。当变量出现在赋值操作的左侧时进行LHS左侧查询，出现在右侧时进行RHS查询。

console.log(a)  // RHS查询，a是赋值操作的源头

a = 2   //  LHS查询，赋值操作的目标是a

### 作用域嵌套

作用域是根据名称查找变量的一套规则。

一个块或函数嵌套在另一个块或函数中，发生了作用域的嵌套。因此，在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，直到找到该变量，或抵达最外层的作用域（也就是全局作用域）为止。

### 异常

RHS 查询在所有嵌套的作用域中遍寻不到所需的变量，引擎就会抛出ReferenceError异常

*ReferenceError*(引用错误) 对象代表当一个不存在的变量被引用时发生的错误

如果RHS 查询找到了一个变量，但是你尝试对这个变量的值进行不合理的操作，比如试图对一个非函数类型的值进行函数调用，或着引用null 或undefined 类型的值中的属性，那么引擎会抛出另外一种类型的异常，叫作TypeError。

ReferenceError 同作用域判别失败相关，而TypeError 则代表作用域判别成功,但是对结果的操作是非法或不合理的。

## 2.词法作用域

作用域共有两种主要的工作模型，一种是词法作用域，另一种是动态作用域

词法作用域就是定义在词法阶段的作用域。换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法**分析器处理代码时会保持作用域不变**

### 欺骗词法

JavaScript有两种机制实现这个目的，欺负词法作用域会导致性能下降

#### eval

eval函数可以执行一段代码为参数，在执行eval()之后的代码，引擎并不知道前面的代码是以动态形式插入进来，并对词法作用域的环境进行修改。引擎只会正常的进行词法作用域查找

```js
function foo(str, a){
    eval(str)  //欺骗
    console.log(a,b)
}
var b = 8;
foo("var b = 100", 1)  // 1,100
```

在程序中动态生成代码的使用场景非常罕见，因为它所带来的好处无法抵消性能上的损失

#### with

JavaScript 中另一个难以掌握也不推荐使用的用来欺骗词法作用域的功能——with关键字

eval(..) 和with 会在运行时修改或创建新的作用域，以此来欺骗其他在书写时定义的词法作用域。

#### 性能

代码中大量使用eval(..) 或with，那么运行起来一定会变得非常慢。无论引擎多聪明，试图将这些悲观情况的副作用限制在最小范围内，也无法避免如果没有这些优化，代码会运行得更慢这个事实。

## 3.函数作用域和块作用域

JavaScript每声明一个函数，都会为自身创建一个作用域

> 函数作用域指属于这个函数的全部变量都可以在整个函数的范围内使用及复用。在函数外使用这些变量就会报错。

### 隐藏内部实现

把一部分需要隐藏起来的代码片段用函数声明对它进行包装，实际上就是把这些代码“隐藏”起来。

<u>为什么隐藏变量和函数是一个有用的技术？</u>

在软件设计中有一个最小暴露原则，指的是只暴露必要的内容，其他内容隐藏起来。这个原则可以延伸到如何选择作用域来包含函数和变量。

*如果所有变量和函数都在全局作用域中，当然可以在所有的内部嵌套作用域中访问到它们。但这样会破坏前面提到的最小特权原则，因为可能会暴漏过多的变量或函数，而这些变量或函数本应该是私有的，正确的代码应该是可以阻止对这些变量或函数进行访问的。*

```js
function doSomething(a) {
    b = a + doSomethingElse( a * 2 );
    console.log( b * 3 );
}
function doSomethingElse(a) {
	return a - 1;
}
var b;
doSomething( 2 ); // 15
```

*变量b 和函数doSomethingElse(..) 应该是doSomething(..) 内部具体实现的“私有”内容。给予外部作用域对b 和doSomethingElse(..) 的“访问权限”不仅没有必要，而且可能是“危险”的，因为它们可能被有意或无意地以非预期的方式使用，从而导致超出了 doSomething(..) 的适用条件。更“合理”的设计会将这些私有的具体内容隐藏在doSomething(..) 内部*

```js
function doSomething(a) {
function doSomethingElse(a) {
return a - 1;
}
var b;
b = a + doSomethingElse( a * 2 );
console.log( b * 3 );
}
doSomething( 2 ); // 15
```

b 和doSomethingElse(..) 都无法从外部被访问，而只能被doSomething(..) 所控制。

### 规避冲突

“隐藏”作用域中的变量和函数所带来的另一个好处，是可以避免同名标识符之间的冲突，两个标识符可能具有相同的名字但用途却不一样，无意间可能造成命名冲突

```js
// 命名冲突造成死循环
function foo() {
    function bar(a) {
        i = 3; // 修改for 循环所属作用域中的i
        console.log( a + i );
    }
    for (var i=0; i<10; i++) {
    	bar( i * 2 ); // 糟糕，无限循环了！
    }
}
foo();
```

#### 全局命名空间

一些库(比如jquery)在全局作用域中声明一个名字足够独特的变量，通常是一个对象。这个对象被用作库的命名空间，所有需要暴露给外界的功能都会成为这个对象（命名空间）的属性，而不是将自己的标识符暴漏在顶级的词法作用域中。

```js
var MyReallyCoolLibrary = {
awesome: "stuff",
doSomething: function() {
// ...
},
doAnotherThing: function() {
// ...
}
};
```

#### 模块化

另一种避免冲突的办法和现代的模块机制很接近，就是从众多模块管理器中挑选一个来使用。使用这些工具，任何库都无需将标识符加入到全局作用域中，而是通过依赖管理器的机制将库的标识符显式地导入到另外一个特定的作用域中。

### 函数作用域-立即执行函数表达式

```js
var a = 2;
(function foo() {
    var a = 3;
    console.log( a ); // 3
})();
console.log( a ); // 2
```

由于函数被包含在一对( ) 括号内部，因此成为了一个表达式，通过在末尾加上另外一个( ) 可以立即执行这个函数，比如(function foo(){ .. })()。**第一个( ) 将函数变成表达式**，第二个( ) **执行了这个函数**。

IIFE，代表立即执行函数表达式

IIFE 的另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去。

```js
var a = 2;
(function IIFE( global ) {
    var a = 3;
    console.log( a ); // 3
    console.log( global.a ); // 2
})( window );
console.log( a ); // 2
```

将window 对象的引用传递进去，将参数命名为global，因此在代码风格上对全局对象的引用变得比引用一个没有“全局”字样的变量更加清晰。

IIFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位,这种模式在UMD（Universal Module Definition）项目中被广泛使用。

```js
var a = 2;
(function IIFE( def ) {
	def( window );
})(function def( global ) {
    var a = 3;
    console.log( a ); // 3
    console.log( global.a ); // 2
});
```

函数表达式def 定义在片段的第二部分，然后当作参数被传递进IIFE 函数定义的第一部分中。最后，参数def被调用，并将window 传入当作global 参数的值。

### 块级作用域

由于JavaScript没有块作用域，在for和if语句中var声明的变量通常是全局变量，会造成变量冲突引起很多意外的bug。

```js
for(var i=0;i<10;i++){
    console.log(i)
}
```

在for 循环的头部直接定义了变量i，通常是因为只想在for 循环内部的上下文中使用i，但是这个方法定义的i是全局的变量。i 会被绑定在外部作用域（函数或全局）中的事实。

**使用var 声明变量时，它写在哪里都是一样的，因为它们最终都会属于外部作用域。**

#### with

用with 从对象中创建出的作用域仅在with 声明中而非外部作用域中有效。

#### try/catch

try/catch 的catch 分句会创建一个块作用域，其中声明的变量仅在catch 内部有效。

#### let

ES6引入新的let关键字，let为其声明的变量隐藏所在块作用域，在块外部引用会报错

```js
var foo =true
if(foo){
    let bar = foo * 2;
    bar = something(bar)
}
console.log(bar)  // ReferenceError
```

使用let 进行的声明不会在块作用域中进行提升。

```js
{
    console.log( bar ); // ReferenceError!
    let bar = 2;
}
```

for 循环头部的let 不仅将i 绑定到了for 循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值。

```js
{
let j;
for (j=0; j<10; j++) {
    let i = j; // 每个迭代重新绑定！
    console.log( i );
}
}
```

#### const

除了let 外，ES6 还引入const，同样可以用来创建块作用域变量，但其值是固定的,不能重新赋值

## 4.提升

引擎会在解释JavaScript 代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的(变量或函数)声明，并用合适的作用域将它们关联起来

变量和函数在内的所有声明都会在任何代码被执行前首先被处理(编译)。

>当你看到var a = 2; 时，可能会认为这是一个声明。但JavaScript 实际上会将其看成两个
>声明：var a; 和a = 2;。第一个定义声明是在编译阶段进行的。第二个赋值声明会被留在
>原地等待执行阶段。

**只有声明本身会被提升，而赋值或其他运行逻辑会留在原地。**

``` js
function foo() {
    console.log( a ); // undefined
    var a = 2;
}
foo();
// 和下面的代码等同
function foo() {
    var a;
    console.log( a ); // undefined
    a = 2;
}
foo();
```

**函数声明会被提升，但是函数表达式却不会被提升。**

```js
foo(); // 不是ReferenceError, 而是TypeError!
var foo = function bar() {
// ...
};
```

```js
foo()
// 函数声明可以被提升
function foo(){
    // ....
}
```

### 函数声明优先原则

一个实际的问题，当函数声明和变量声明时同一个名称，谁会先被提升，或者说提升到最前面

**函数首先被提升，然后是变量**

```js
foo(); // 1
var foo;
function foo() {
	console.log( 1 );
}
foo = function() {
	console.log( 2 );
};
```

这代码片段会被引擎理解为如下形式

```js
function foo() {
	console.log( 1 );
}
foo(); // 1
foo = function() {
	console.log( 2 );
};
```

function > var 的声明权重

普通块内部的函数声明通常会被提升到所在作用域的顶部，这个过程不会像下面的代码暗示的那样可以被条件判断所控制：

```js
foo(); // "b"
var a = true;
if (a) {
	function foo() { console.log("a"); }
}
else {
    //函数声明会变量提升，后边的覆盖前边的
	function foo() { console.log("b"); }
}
```

## 5.作用域闭包

函数在它本身的词法作用域以为执行，但是还保留着函数定义时作用域的引用，对这个作用域的引用就是闭包。

**回调函数多数都是闭包。**

闭包示例：

``` js
function foo(){
    var a=2;
    function bar(){
        console.log(a)
    }
    return bar
}
var bax = foo()
bax()  // 2,这里相当于执行bar(),bar在定义的作用域外执行，并保留着定义是的作用域的引用，这就是闭包
```

由于bar()声明的位置，它拥有涵盖foo函数内部作用，使得该作用域能够一直存在，供bar函数在任何时间引用

**当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。**

#### 循环和闭包

```js
for(var i=1;i<5;i++){
    setTimeout(function timer(){
      console.log(i)  
    },i*1000)
}
```

~~我们预期分别输出1-5，每秒一个，每次一个。但是实际上这段代码会以每秒一次的频率输出五次6.~~

首先解释6的来源，这个循环的终止条件是i不小于等于5，条件首次成立时i的值是6。输出显示的是循环结束时i的最终值。

缺陷是我们预想循环中每个迭代在运行时会给自己“捕获”一个i 的副本。但是根据作用域的工作原理，实际是循环中的五个函数是在各个迭代中分别定义，它们都被封闭在一个**共享的全局作用域**中，因此实际上只有一个i。

解决这个问题需要更多的闭包作用域，特别是在循环的过程中每次循环迭代都创建个闭包作用域，使用立即执行函数创建作用域

```js
for(var i=0;i<=5;i++){
    (function(){
       setTimeout(fucntion timer(){
           console.log(i)
       }, i*1000) 
    })()
}
```

以上这段代码还是不行，现在虽然拥有了多个词法作用域，每个延时函数都会将IIFE在迭代中创建的作用域封闭起来，但是作用域是空的，仅仅封闭起来是不够的。

每个封闭的词法作用域需要有自己的变量，用来存储每个迭代中i的值

```js
for(var i=0;i<=5;i++){
    (function(x){
       setTimeout(fucntion timer(){
           console.log(x)
       }, x*1000) 
    })(i)
}
```

#### 用块作用域解决

let本质上是将一个块转换成一个可以被关闭的作用域

```js
for(let i=1;i<5;i++){
    setTimeout(function timer(){
      console.log(i)  
    },i*1000)
}
```

### 模块

模块模式需要具备两个必要条件。

1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

```js
function CoolModule() {
	var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log( something );
    }
    function doAnother() {
        console.log( another.join( " ! " ) );
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}
var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

模块模式另一个简单但强大的变化用法是，命名将要作为公共API 返回的对象：

```js
var foo = (function CoolModule(id) {
	function change() {
    // 修改公共API
    	publicAPI.identify = identify2;
    }
    function identify1() {
    	console.log( id );
    }
    function identify2() {
    	console.log( id.toUpperCase() );
    }
    var publicAPI = {
        change: change,
        identify: identify1
    };
    return publicAPI;
})( "foo module" );
foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```

**实现一个模块依赖加载器**

```js
var MyModules = (function Manager() {
    var modules = {};
    function define(name, deps, impl) {
        for (var i=0; i<deps.length; i++) {
        deps[i] = modules[deps[i]];
        }
        //代码的核心
    	modules[name] = impl.apply( impl, deps );
    }
    function get(name) {
    	return modules[name];
    }
    return {
        define: define,
        get: get
    };
})();
//下面展示了如何使用它来定义模块：
MyModules.define( "bar", [], function() {
    function hello(who) {
    	return "Let me introduce: " + who;
    }
    return {
    	hello: hello
    };
});
MyModules.define( "foo", ["bar"], function(bar) {
    var hm = "hippo";
    function awesome() {
    	console.log( bar.hello( hm ).toUpperCase() );
    }
    return {
    	awesome: awesome
    };
});
var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );
console.log(
	bar.hello( "hippo" )
); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO
```

#### 未来的ES6模块机制

import和export

```js
// bar.js
function hello(who) {
return "Let me introduce: " + who;
}
export default hello;
// foo.js
// 仅从"bar" 模块导入hello()
import hello from "bar";
var hungry = "hippo";
function awesome() {
    console.log(
    hello( hungry ).toUpperCase()
	);
}
```



# this和对象原型

## 1.关于this

this的绑定和函数声明的位置没有关系，只取决于函数的调用方式。当一个函数被调用时，创建一个执行上下文，这个记录会包含在哪里被调用（调用栈Call Stack）,函数的调用方法，传入的参数等信息。

```js
// 获取foo函数被执行的次数，改实例为错误的
function foo(num){
    console.log("foo: "+ num)
    this.count ++;
}
foo.count = 0;
for (var i=0;i<10;i++){
    if(i>5){
        foo(i)  //这样调用foo，foo内部的this是window，window.count是undefined，执行window.count++的结果是NaN
    }
}
console.log(foo.count)  // 0
```

```js
// 获取foo函数被执行的次数
function foo(num){
    console.log("foo: "+ num)
    this.count ++;
}
foo.count = 0;
for (var i=0;i<10;i++){
    if(i>5){
        // 使用call(...)可以确保this指向函数对象foo本身
        foo.call(foo, i) 
    }
}
console.log(foo.count) 
```

## 2. this全面解析

### 四种绑定规则

1. 默认绑定
2. 隐式绑定
3. 显式绑定
4. new 绑定

#### 默认绑定

最常用的函数调用类型：独立函数调用，把这条规则看作是无法应用其他规则时的默认规则

```js
function foo(){
    console.log(this.a)
}
var a = 2
foo()  //2
```

这段代码函数调用时应用了this的默认绑定，foo()是直接使用不带任何修饰的函数引用进行调用的。声明的全局作用域中的变量var a =2;就是全局对象window的一个同名属性。

但是这种情况只在非严格模式下，如果在严格 strict mode模式下，全局对象无法使用默认绑定，因此this是undefined

```js
function foo(){
    "use strict"
    console.log(this.a)
}
var a =2
foo()  // TypeError: this is undefined
```

#### 隐式绑定

该规则是：函数调用位置是否有上下文对象

```js
function foo(){
    console.log(this.a)
}
var obj = {
    a:2,
    foo:foo
}
obj.foo()  //2
```

此时调用位置会使用obj上下文来引用函数，可以说函数被调用是obj对象"拥有foo函数"

>当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this 绑定到这个上下文对象

对象属性引用链中只有最后一层会影响调用位置

```js
function foo(){
    console.log(this.a)
}
var obj2 = {
    a:42,
    foo:foo
}
var obj1 = {
    a :2,
    obj2:obj2
}
obj1.obj2.foo()  //42
```

下面的代码会隐式绑定丢失，而使用默认绑定规则

```js
function foo() {
	console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```

bar是 obj.foo 的一个引用，它引用的是foo函数本身，此时的bar()其实是一个不带任何修饰的函数foo()调用，因此使用了默认绑定。

另一种情况是回调函数会造成隐式绑定丢失

```js
function foo() {
	console.log( this.a );
}
function doFoo(fn) {
    // fn 其实引用的是foo
    fn(); // <-- 调用位置！
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
doFoo( obj.foo ); // "oops, global"
```

参数传递其实是一种隐式赋值，传入函数时会被隐式赋值，fn相当于对foo的引用，回调函数调用使用默认绑定。

JavaScript环境中内置的setTimeout()函数实现也是一样

```js
function setTimeout(fn,delay) {
    // 等待delay 毫秒
    fn(); // <-- 调用位置！
}
```

#### 显式绑定

call()和apply()方法绑定，它们的第一个参数是一个对象，它们会把这个对象绑定到this，接着在调用函数时指定这个this。因为可以直接指定this 的绑定对象，因此称之为显式绑定

```js
function foo() {
	console.log( this.a );
}
var obj = {
	a:2
};
foo.call( obj ); // 2
```

硬绑定可以解决丢失绑定

```js
function foo(){
    console.log(this.a)
}
var obj = {
	a:2
};
var bar  = function(){
    foo.call(obj)
}
setTimeout(bar, 1000)
```

创建bar函数，在内部手动调用foo.call(obj)。强制把foo的this绑定到了obj，之后无论怎么调用函数bar，总会手动绑定obj调用foo

也可以使用bind方法，bind不会立即执行，需要再次调用，call和apply会立即执行

```js
function foo(){
    console.log(this.a)
}
var obj = {
	a:2
};
var bar  = foo.bind(obj)
setTimeout(bar, 1000)
```

#### new 绑定规则

JavaScript中的构造函数只是一些使用new操作符时被调用的函数。js在ES5实际上并不存在所谓的构造函数，只有对函数的构造调用

使用new来调用函数，会执行以下操作

1. 创建一个新的对象obj

2. 这个对象obj会被执行原型连接

3. 新对象obj被绑定到函数调用的this

4. 如果函数没有返回其他对象，那么new调用的函数会自动返回这个新对象obj

```js
function foo(a) {
	this.a = a;
}
var bar = new foo(2);
console.log( bar.a ); // 2
```

使用new来调用foo()时，构造一个新对象并把它绑定到foo调用中的this上，称之为new绑定

### 四种绑定规则的优先级

**new》显式》隐式》默认**

  >bind(..) 的功能之一就是可以把除了第一个参数（第一个参数用于绑定this）之外的其他参数都传给下层的函数（这种技术称为“部分应用”，是“柯里化”的一种）。

```js
function foo(p1,p2) {
	this.val = p1 + " " + p2;
}
// 之所以使用null 是因为在本例中我们并不关心硬绑定的this 是什么
// 反正使用new 时this 会被修改
var bar = foo.bind( null, "p1" );
var baz = new bar( "p2" );
baz.val; // p1 p2
```

### 判断this的方法

现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则

1. 函数是否在new 中调用（new 绑定）？如果是的话this 绑定的是新创建的对象。var bar = new foo()
2. 函数是否通过call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是指定的对象。var bar = foo.call(obj2)
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。var bar = obj1.foo()
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到全局对象。var bar = foo()

### 绑定例外

间接引用时，使用默认绑定规则

```js
function foo(){
    console.log(this.a)
}
var a = 2
var o = {a:3, foo:foo}
var p = {a:4}
o.foo()  // 3
(p.foo = o.foo)()  // 2
```

赋值表达式p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是foo() 而不是p.foo() 或者o.foo()

>注意：对于默认绑定来说，决定this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到undefined，否则this 会被绑定到全局对象。

## 3.对象

> 对象的两种定义方法，文字声明和构造方法

```js
// 文字声明
var myObj = {
    key: value
}
// 构造形式
var myObj = new Object()
myObj.key = value
```

### JavaScript的基本类型

* string
* number
* boolean
* undefined
* null
* object
* symbol

简单基本类型本身并不是对象

JavaScript 中还有一些对象子类型，通常被称为**内置对象**。

* String  
* Number
* Boolean
* Object
* Array
* Function
* Date
* RegExp
* Error

内置函数可以当作构造函数来使用，可以构造一个对应子类型的新对象。

```js
var strPrimitive = "I am a string";
typeof strPrimitive; // "string"
strPrimitive instanceof String; // false

var strObject = new String( "I am a string" );
typeof strObject; // "object"
strObject instanceof String; // true
// 检查sub-type 对象
Object.prototype.toString.call( strObject ); // [object String]
```

### 对象的属性

对象的内容是由一些存储在特定命名位置的值组成的，这些值称为属性。存储在对象容器内部的是这些属性的名称，它们就像指针一样，指向这些值真正的存储位置。

```js
var myObject = {
a: 2
};
myObject.a; // 2
myObject["a"]; // 2
```

要访问myObject 中a 位置上的值，需要使用. 操作符或者[] 操作符。.a 语法通常被称为“**属性访问**”，["a"] 语法通常被称为“**键访问**”

两种语法的主要区别在于，属性房屋的属性名要满足标识符的命名规范，键访问可以接受任意UTF-8/Unicode 字符串作为属性名。如果要引用名称为"Super-Fun!" 的属性，那就必须使用["Super-Fun!"] 语法访问

#### 数组

数组也支持[] “**键访问**”访问形式，数组有一套更加结构化的值存储机制，数组期望的是数值下标，值存储的位置是整数。

数组也是对象，所以虽然每个下标都是整数，你仍然可以给数组添加属性：

```js
var myArray = [ "foo", 42, "bar" ];
myArray.baz = "baz";
myArray.length; // 3
myArray.baz; // "baz"
```

可以看到虽然添加了命名属性，数组的length 值并未发生变化。完全可以把数组当作一个普通的键/ 值对象来使用，并且不添加任何数值索引

>注意：如果你试图向数组添加一个属性，但是属性名“看起来”像一个数字，那它会变成一个数值下标（因此会修改数组的内容而不是添加一个属性）：

```js
var myArray = [ "foo", 42, "bar" ];
myArray["3"] = "baz";
myArray.length; // 4
myArray[3]; // "baz"
```

#### 复制对象

对于JSON 安全（也就是说可以被序列化为一个JSON 字符串并且可以根据这个字符串解析出一个结构和值完全一样的对象）的对象来说，有一种巧妙的深复制方法

var newObj = JSON.parse( JSON.stringify( oldObj ) );

> 这种方法需要保证对象是JSON 安全的，所以只适用于部分情况。该方法在以下情况会出现bug
>
> 1.如果oldObj 对象里面有时间对象，时间转换后只是字符串形式，不是时间对象
>
> 2.如果oldObj里有RegExp、Error对象，转换的结果只能得到空对象
>
> 3.如果oldObj里有函数、undefined，转换的结果会把函数和undefined丢失
>
> 4.如果oldObj有NaN、Infinity和-Infinity，转换后的结果变为null
>
> 5.JSON.stringify只能序列化对象的可枚举的自有属性，如果oldObj中的对象是由构造函数生成的，使用 JSON.parse( JSON.stringify( oldObj ) )深拷贝后会丢弃对象的constructor
>
> 6.如果对象中存在循环引用的情况也无法正确实现深拷贝

**自定义对象深copy的方法**

```js
// 为对象实现深copy
function deepClone(source) {
  if (source instanceof Date || source instanceof RegExp) return source;
  let target = Array.isArray(source) ? [] : {};
  for (let key in source) {
    // 判断属性是自身的，不是原型链的
    if (source.hasOwnProperty(key) && source !== null) {
      if (typeof source[key] === "object") {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
```

ES6 定义了Object.assign(..)方法来实现浅复制。Object.assign(..) 方法的第一个参数是目标对象，之后还可以跟一个或多个源对象。它会遍历一个或多个源对象的所有可枚举的自有键并把它们复制到目标对象，最后返回目标对象

```js
var myObject = {
    a: 2,
    b: anotherObject, // 引用，不是复本！
    c: anotherArray, // 另一个引用！
    d: anotherFunction
};
var newObj = Object.assign( {}, myObject );
newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true
```

#### 属性描述符

ES5之后一个普通的对象属性对应的属性描述符包含了三个重要特性：writable(可写)、enumerbale(可枚举)和configurable(可配置)

创建普通对象，可以使用Object.defineProperty(...),来添加一个新属性或修改一个已有属性(configurable为true)

```js
var obj = {}
Object.defineProperty(obj, "a",{
    value:2,
    writable: true,
    configurable: true,
    enumerable: true
})
obj.a;   //2
```

Object.seal()  密封一个对象，实质是设置了configurable:false

Object.freeze(..) 冻结一个对象，实质是设置了configurable:false 和 writable:false属性

#### getter和setter

在ES5 中可以使用getter 和setter 部分改写默认操作，但是只能应用在单个属性上，无法应用在整个对象上。

在给对象属性定义getter、setter或者两者时，这个属性会被定义为“访问描述符”。对访问描述符来说，js会忽略他们的value和writable特性，只关心set和get。

#### 检验对象属性的存在性

```js
var myObject = {
	a:2
};
("a" in myObject); // true
("b" in myObject); // false
myObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "b" ); // false
```

 **in操作符检查属性是否在对象及Prototype原型链上**

**hasOwnProperty只会检查属性是否在myObject对象上，不检查原型链**

>  **for in 和for of**
>
>  for in用来迭代对象的key值，for  of用来遍历数组
>
>  在数组上使用for in迭代会产生意外的结果，这种枚举不仅会包含数组的索引，还会包含所有可枚举属性。

### 遍历

for..in 循环可以用来遍历对象的可枚举属性列表（对象的键）,for..in 遍历对象是无法直接获取属性值

ES6 增加了一种用来遍历数组的for..of 循环语法,直接遍历数组的值

数组有内置的@@iterator，因此for..of 可以直接应用在数组上。我们使用内置的@@iterator 来手动遍历数组

```js
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();
it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }
```

> 和数组不同，普通的对象没有内置的@@iterator，所以无法自动完成for..of 遍历。之所以要这样做，有许多非常复杂的原因,为了避免影响未来的对象类型。

可以给任何想遍历的对象定义@@iterator

```js
var myObject = {
    a: 2,
    b: 3
};
Object.defineProperty( myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys( o );
        return {
            next: function() {
                return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                };
            }
        };
    }
} );
// 手动遍历myObject
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }
// 用for..of 遍历myObject
for (var v of myObject) {
	console.log( v );
}
// 2
// 3
```

## 混合对象和类

### 继承

定义一个父函数，然后一个子函数继承父函数，可以继承父函数的属性和方法

多态，重写继承父类的方法

### 混入

js方法的继承，多数使用混入

```js
function mixin( sourceObj, targetObj ) {
    for (var key in sourceObj) {
    // 只会在不存在的情况下复制
        if (!(key in targetObj)) {
        	targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
}
```

会遍历sourceObj（父对象）的属性，在targetObj（子对象）没有这个属性就会进行复制。

## 原型

js对象有一个特殊的Prototype内置属性，是对于其他对象的引用。几乎所有的对象在创建时[[Prototype]] 属性都会被赋予一个非空的值

```js
var anotherObject = {
a:2
};
// 创建一个原型链关联到anotherObject对象的myObject对象
var myObject = Object.create( anotherObject );
myObject.a; // 2
// in 操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链
("a" in myObject); // true
```

> Object.prototype是js中原型链的尽头，所有普通的[[Prototype]] 链最终都会指向内置的Object.prototype。

属性隐式屏蔽会产生一些错误意外

```js
var anotherObject = {
	a:2
};
var myObject = Object.create( anotherObject );
anotherObject.a; //
myObject.a; // 2
anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false
myObject.a++; // 隐式屏蔽！
anotherObject.a; // 2
myObject.a; // 3
myObject.hasOwnProperty( "a" ); // true
```

委托属性-》继承过来的属性

myObject.a++ 看起来查找并增加anotherObject.a 属性，但是++ 操作相当于myObject.a = myObject.a + 1。

++ 操作首先会通过[[Prototype]]查找属性a 并从anotherObject.a 获取当前属性值2，然后给这个值加1，接着将值3 赋给myObject 中新建的屏蔽属性a，**修改委托属性时一定要小心**

### “类”

所有的函数默认都会拥有一个名为prototype 的公有并且不可枚举的属性

```js
function Foo() {
// ...
}
Foo.prototype; // { }
```

prototype对象通常被称为Foo 的原型

### 构造函数

```js
function Foo() {
// ...
}
Foo.prototype.constructor === Foo; // true
var a = new Foo();
a.constructor === Foo; // true
```

Foo.prototype 默认有一个公有并且不可枚举的属性.constructor，这个属性引用的是对象关联的函数Foo.

实际上a 本身并没有.constructor 属性。而且，虽然a.constructor 确实指向Foo 函数，但是这个属性并不是表示a 由Foo“构造”,而是 通过a._ _proto _ _属性，实例对象的隐式原型,.constructor 引用同样被委托给了Foo.prototype

```js 
a.__proto__ === Foo.prototype
```

> Foo 和你程序中的其他函数没有任何区别。函数本身并不是构造函数，然而，当你在普通的函数调用前面加上new 关键字之后，就会把这个函数调用变成一个“构造函数调用”。实际上，new 会劫持所有普通函数并用构造对象的形式来调用它。

**在JavaScript 中对于“构造函数”最准确的解释是，所有带new 的函数调用。**

展示了另外两种“面向类”的技巧

```js
function Foo(name) {
	this.name = name;
}
Foo.prototype.myName = function() {
	return this.name;
};
var a = new Foo( "a" );
var b = new Foo( "b" );
a.myName(); // "a"
b.myName(); // "b"
```

1. this.name = name 给每个对象都添加了.name 属性，有点像类实例封装的数据值。
2. Foo.prototype.myName = ... 可能个更有趣的技巧，它会给Foo.prototype 对象添加一个属性（函数）

在这段代码中，看起来似乎创建a 和b 时会把Foo.prototype 对象复制到这两个对象中，然而事实并不是这样。

a 和b 的内部通过内部属性"_ _proto _ _"会关联到Foo.prototype 上，当属性不直接存在于对象中时会通过原型链在Foo.prototype上查找

.constructor === Foo为真实质是.constructor的引用被委托给了Foo.prototype，而Foo.prototype.constructor 默认指向Foo。

.constructor 并不是一个不可变属性。它是不可枚举，但值可写可修改，可以给任意prototype链中的任意对象添加一个名为constructor的属性或者对其进行修改。

### 原型继承

```js
function Foo(name) {
	this.name = name;
}
Foo.prototype.myName = function() {
	return this.name;
};
function Bar(name,label) {
    Foo.call( this, name );
    this.label = label;
}
// 我们创建了一个新的Bar.prototype 对象并关联到Foo.prototype
Bar.prototype = Object.create( Foo.prototype );
// 注意！现在没有Bar.prototype.constructor 了
// 如果你需要这个属性的话可能需要手动修复一下它
Bar.prototype.myLabel = function() {
	return this.label;
};
var a = new Bar( "a", "obj a" );
a.myName(); // "a"
a.myLabel(); // "obj a"
```

这段代码的核心语句Bar.prototype = Object.create( Foo.prototype )

这句话的意思：创建一个新的Bar.prototype 对象并把它关联到Foo.prototype

> 注意，下面这两种方式是常见的错误做法，实际上它们都存在一些问题

```js
// 和你想要的机制不一样！
Bar.prototype = Foo.prototype;
// 基本上满足你的需求，但是可能会产生一些副作用 :(
Bar.prototype = new Foo();
```

Bar.prototype = Foo.prototype  **并不会创建一个关联到Bar.prototype 的新对象**，它只是让Bar.prototype 直接引用Foo.prototype 对象。因此当你执行类似Bar.prototype.myLabel = ... 的赋值语句时会直接修改Foo.prototype 对象本身。显然这不是你想要的结果，否则你根本不需要Bar 对象，直接使用Foo 就可以了，这样代码也会更简单一些。
Bar.prototype = new Foo() 的确会创建一个关联到Bar.prototype 的新对象。但是它使用了Foo(..) 的“构造函数调用”，如果**函数Foo 有一些副作用**（比如写日志、修改状态、注册到其他对象、给this 添加数据属性，等等）的话，就会影响到Bar() 的“后代”，后果不堪设想。

绝大多数（不是所有！）浏览器也支持一种非标准的方法来访问内部[[Prototype]] 属性：
```a.__proto__ === Foo.prototype; // true```
这个奇怪的```.__proto__```（ 在ES6 之前并不是标准！） 属性“ 神奇地” 引用了内部的[[Prototype]] 对象，如果你想直接查找（甚至可以通过```.__proto__.__ptoto__```... 来遍历）原型链的话，这个方法非常有用。

```.__proto__ ```的实现大致上是这样的

```js
Object.defineProperty( Object.prototype, "__proto__", {
    get: function() {
    return Object.getPrototypeOf( this );
},
set: function(o) {
// ES6 中的setPrototypeOf(..)
    Object.setPrototypeOf( this, o );
        return o;
    }
});
```

### 对象关联

如果在对象上没有找到需要的属性或者方法引用，引擎就会继续在[[Prototype]] 关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的[[Prototype]]，以此类推。这一系列对象的链接被称为“原型链”。

```js
var foo = {
    something: function() {
    console.log( "Tell me something good..." );
}
};
var bar = Object.create( foo );
bar.something(); // Tell me something good...
```

Object.create(..) 会创建一个新对象（bar）并把它关联到我们指定的对象（foo），这样我们就可以充分发挥[[Prototype]] 机制的威力（委托）并且避免不必要的麻烦（比如使用new 的构造函数调用会生成.prototype 和.constructor 引用）。

> Object.create(null) 会创建一个拥有空（ 或者说null）[[Prototype]]链接的对象，这个对象无法进行委托。

**Object.create()的polyfill代码**

```js
if (!Object.create) {
    Object.create = function(o) {
        function F(){}
        F.prototype = o;
        return new F();
    };
}
```

JavaScript 机制和传统面向类语言中的“类初始化”和“类继承”很相似，但是JavaScript 中的机制有一个核心区别，那就是不会进行复制，对象之间是通过内部的[[Prototype]] 链关联的。

“委托”是一个更合适的术语，因为对象之间的关系不是复制而是委托。



