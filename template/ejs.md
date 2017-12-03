EJS 语法
====================

#### ejs是嵌入式的Javascript模板引擎，服务器JS和浏览器都支持,官方文档http://ejs.co/

#### [语法](https://github.com/mde/ejs/blob/master/docs/syntax.md)

1. 基本格式：用肩括号百分号模板标签，必须封闭起来，中间可以写Javascript语法，<% %>，

例如：
```js
<% for(var i = 0; i < fruits.length; ++i) {%>
```
2. 输出有两种方式:<%= %> 和 <%- %> ，分别表示html转义(对一些非法字符比如<,&等,会转义成&lt;&amp;)，非转义

3. 注释：<%#开头

```html
<li><a href="foo"><% // double-slash comment %>foo</li>
<li><a href="bar"><% /* C-style comment */ %>bar</li>
<li><a href="baz"><% // double-slash comment with newline
    %>baz</li>
<li><a href="qux"><% var x = 'qux'; // double-slash comment @ end of line %><%= x %></li>
<li><a href="fee"><%# ERB style comment %>fee</li>
<li><a href="bah"><%= 'not a ' + '//' + ' comment' %></a></li>
```

4. 可以换行结束，例如：
```js
<% random.forEach((c, i) => {
%>
```
5. 空格
<%_ _%>空格做截取
```js
<%for(var i = 0; i < fruits.length; ++i) {%>
```
支持，
```js
<%_               for(var i = 0; i < fruits.length; ++i) {                  -%>
```
这样也是支持的

#### Options

@property {Boolean} debug=false

@property {Boolean} compileDebug=true

@property {Boolean} _with=true

@property {Boolean} rmWhitespace=false

@property {Boolean} client=false

@property {EscapeCallback} escape={@link module:utils.escapeXML}

@property {String} filename=undefined

@property {String}  [root=undefined]

@property {String}  [delimiter='%']

@property {Boolean} [cache=false]

@property {Object}  [context=this]

@property {Object}  [scope=this]


#### ejs三种渲染方法

```js
ejs.compile(str, options)
ejs.render(str, data, options)
ejs.renderFile(filename, data, options, function(err, str){
    // str => Rendered HTML string 
})
```
```js
var express = require('express')
var ejs = require('ejs')
var app = express()
var path = require('path')


var str = 'hello,<%= name %>'
var template = ejs.compile(str)
console.log(template({
    name: 'zhangsan'
}))
console.log(2,ejs.render(str,{
    name: 'zhangsan'
}))

ejs.renderFile('./views/index.ejs', {
    title: 'dfdf',
    body: '<h1>ddfdf</h1>'
}, function(err, str) {
    res.send(str)
})
```

#### 自定义分隔符

自定义分隔符，默认是%，也可以设置为其他符号<? ?><! !><# #>

```js
var users = ['zhangsan', 'lisi']
console.log(ejs.render('<!= user !>', { user: users }, { delimiter: '!' }))
console.log(ejs.render('<*= user *>', { user: users }, { delimiter: '*' }))
console.log(ejs.render('<@= user @>', { user: users }, { delimiter: '@' }))

//全局设置
ejs.delimiter = '$';
```

#### include其他文件
```js
include(filename) //支持一个文件名
include(variable) //支持一个变量，可以通过逻辑判断加载不同的文件
```

#### 与express结合使用

#### [ejs案例](https://github.com/mde/ejs/tree/master/examples)