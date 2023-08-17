---
title: js 运行过程分析
date: 2023-08-12 12:16:05
permalink: /pages/a38cdb/
categories:
  - front
  - javascript
  - js
tags:
  - 
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---
# js 运行过程分析
#### 程序运行的概念
JS可以在浏览器中运行，运行在V8引擎中执行过程
了解运行过程前，先弄清编程中的几个概念。
- 编译器（Compiler）：源代码在运行之前编译成计算机能执行的机器码，由于要编译完所有源代码后在执行，所以编译器需要更多的内存存储机器码，但执行快；如【java、c】等语言
- 解释器（Interpreter）：将源代码在运行时逐行解释执行，由于是一边解释一边执行，故启动快，执行慢；如【javascript、python】

1. 抽象语法树（AST）：解析器（Parser) 将源代码进行词法分析、语法分析后生成的抽象语法树，想要看生成的结果请戳：astexplorer.net/
2. 字节码（Bytecode）：又称作中间代码，在JS解析中就是从AST -> 字节码 -> 机器码，字节码是后面才被V8引擎引入的，主要目的是为了解决机器码带来的内存占用问题；
3. 即时编译器（JIT）：简单的理解就是一段代码被解释器执行多次之后就会变成热点代码（HotSpot），热点代码会被编译器直接编译成机器码，当代码再次执行时直接运行机器码，从而达到提高性能的目的，这种编译器和解释器混合使用的技术被叫做即时编译。
#### V8执行一段JS代码的过程图
![V8执行一段JS代码的过程图](/assets/images/article/image_2023-08-16_13-47-34.png)

#### JS即时编译器的运行过程
![JS即时编译器的运行过程](/assets/images/article/image_2023-08-16_14-12-09.png)

图片绘制参考来源：[极客时间-浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601)

#### 实现一个简易 Tree Shaking 脚本
ESM规范基于静态运行，可以实现tree shaking；commonjs【node环境】规范是动态运行，无法实现tree shaking；
通过 acorn 库，实现一个 treeShaking 的脚本。acorn 库实现解析 AST 的入口框架，可以将源代码parse为AST对象。
![](/assets/images/article/image_2023-08-16_18-47-09.png)
经过acorn的parse之后，body为生成的ast对象
![](/assets/images/article/image_2023-08-16_18-48-29.png)

- 1.首先设置一段要被treeShaking的代码，将这段代码添加到test.js文件中
```js
function add(a, b) {
  return a + b;
}

function multiple(a, b) {
  return a * b;
}

let firstOp = 9;

let secondOp = 10;
if (firstOp > 0) {
const aaa = 'AAA';
}

add(firstOp, secondOp);

```
看下图，了解整体架构流程
![](/assets/images/article/image_2023-08-16_18-50-29.png)

- 创建JSEmitter类，用于根据 AST 产出 JavaScript 代码
``` js
class JSEmitter {

  // 访问变量声明，以下都是工具方法

  visitVariableDeclaration(node) {

    let str = ''

    str += node.kind + ' '

    str += this.visitNodes(node.declarations)

    return str + '\n'

  }

  visitVariableDeclarator(node, kind) {

    let str = ''

    str += kind ? kind + ' ' : str

    str += this.visitNode(node.id)

    str += '='

    str += this.visitNode(node.init)

    return str + ';' + '\n'

  }

  visitIdentifier(node) {

    return node.name

  }

  visitLiteral(node) {

    return node.raw

  }

  visitBinaryExpression(node) {

    let str = ''

    str += this.visitNode(node.left)

    str += node.operator

    str += this.visitNode(node.right)

    return str + '\n'

  }

  visitFunctionDeclaration(node) {

    let str = 'function '

    str += this.visitNode(node.id)

    str += '('

    for (let param = 0; param < node.params.length; param++) {

      str += this.visitNode(node.params[param])

      str += ((node.params[param] == undefined) ? '' : ',')

    }

    str = str.slice(0, str.length - 1)

    str += '){'

    str += this.visitNode(node.body)

    str += '}'

    return str + '\n'

  }

  visitBlockStatement(node) {

    let str = ''

    str += this.visitNodes(node.body)

    return str

  }

  visitCallExpression(node) {

    let str = ''

    const callee = this.visitIdentifier(node.callee)

    str += callee + '('

    for (const arg of node.arguments) {

      str += this.visitNode(arg) + ','

    }

    str = str.slice(0, str.length - 1)

    str += ');'

    return str + '\n'

  }

  visitReturnStatement(node) {

    let str = 'return ';

    str += this.visitNode(node.argument)

    return str + '\n'

  }

  visitExpressionStatement(node) {

    return this.visitNode(node.expression)

  }

  visitNodes(nodes) {

    let str = ''

    for (const node of nodes) {

      str += this.visitNode(node)

    }

    return str

  }

  // 根据类型，执行相关处理函数

  visitNode(node) {

    let str = ''

    switch (node.type) {

      case 'VariableDeclaration':

        str += this.visitVariableDeclaration(node)

        break;

      case 'VariableDeclarator':

        str += this.visitVariableDeclarator(node)

        break;

      case 'Literal':

        str += this.visitLiteral(node)

        break;

      case 'Identifier':

        str += this.visitIdentifier(node)

        break;

      case 'BinaryExpression':

        str += this.visitBinaryExpression(node)

        break;

      case 'FunctionDeclaration':

        str += this.visitFunctionDeclaration(node)

        break;

      case 'BlockStatement':

        str += this.visitBlockStatement(node)

        break;

      case "CallExpression":

        str += this.visitCallExpression(node)

        break;

      case "ReturnStatement":

        str += this.visitReturnStatement(node)

        break;

      case "ExpressionStatement":

        str += this.visitExpressionStatement(node)

        break;

    }

        return str

    }

        // 入口

        run(body) {

        let str = ''

        str += this.visitNodes(body)

        return str

    }

    }

module.exports = JSEmitter
```

- 创建treeShaking.js文件
``` js
const acorn = require('acorn');

const l = console.log;

const JSEmitter = require('./js-emitter');

const fs = require('fs');

// 获取命令行参数

const args = process.argv[2]; // 被编译的文件

const buffer = fs.readFileSync(args).toString();

const body = acorn.parse(buffer, {
  ecmaVersion: 'latest',
  sourceType: 'module',
}).body;

const jsEmitter = new JSEmitter();

let decls = new Map();
// 添加被使用的代码
let calledDecls = [];

let code = [];

// 遍历处理

body.forEach(function (node) {
  if (node.type == 'FunctionDeclaration') {
    const code = jsEmitter.run([node]);

    decls.set(jsEmitter.visitNode(node.id), code);

    return;
  }

    // 是表达式类型
  if (node.type == 'ExpressionStatement') {
    // 是函数调用
    if (node.expression.type == 'CallExpression') {
      const callNode = node.expression;

      calledDecls.push(jsEmitter.visitIdentifier(callNode.callee));

      const args = callNode.arguments;

      for (const arg of args) {
        // 对调用参数进行设置
        if (arg.type == 'Identifier') {
          calledDecls.push(jsEmitter.visitNode(arg));
        }
      }
    }
  }

  if (node.type == 'VariableDeclaration') {
    const kind = node.kind;

    for (const decl of node.declarations) {
      decls.set(
        jsEmitter.visitNode(decl.id),
        jsEmitter.visitVariableDeclarator(decl, kind)
      );
    }

    return;
  }

  if (node.type == 'Identifier') {
    // Identifier标识符
    calledDecls.push(node.name);
  }
  // 上面 node.type == 'ExpressionStatement' 时，并没有return
  // 所以会将 node.type为ExpressionStatement的AST节点，添加到code中
  code.push(jsEmitter.run([node])); //会添加'add(firstOp,secondOp);\n'
});

// 生成 code
code = calledDecls
  .map((c) => {
    return decls.get(c);
  })
  .concat([code.filter(Boolean)])
  .join('');

fs.writeFileSync('test.shaked.js', code);

```

文件通过 process.argv 获取到目标文件，对于目标文件通过 fs.readFileSync() 方法读出字符串形式的内容 buffer，对于这个 buffer变量，我们使用 acorn.parse进行解析，并对产出body内容进行遍历。
* decls——Map 类型，存储所有的函数或变量声明类型节点
* calledDecls——数组类型，存储了代码中真正使用到的数或变量声明
* code——数组类型，存储了AST节点为ExpressionStatement或未被匹配到节点的的代码

- 经过treeShaking后的代码
``` js
function add(a,b){return a+b

}
let firstOp=9;
let secondOp=10;
add(firstOp,secondOp);
```

备注：在vscode中可以i添加调试debugger，launch.json 文件
``` json
{
    "version": "0.2.0",
    "configurations": [
        {
            "command": "npm start",
            "name": "断点调试",
            "request": "launch",
            "type": "node-terminal"
        }
    ]
}
```