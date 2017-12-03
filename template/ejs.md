EJS 语法
====================

1. ejs是嵌入式的Javascript模板引擎，服务器JS和浏览器都支持,官方文档http://ejs.co/

2. [语法](https://github.com/mde/ejs/blob/master/docs/syntax.md)

基本格式：用肩括号百分号模板标签，必须封闭起来，中间可以写Javascript语法，<% %>，

例如：
```js
<% for(var i = 0; i < fruits.length; ++i) {%>
```
输出有两种方式:<%= %> 和 <%- %> ，分别表示html转义，非转义

注释：<%#开头

可以换行结束，例如：
```js
<% random.forEach((c, i) => {
%>
```
<%_ _%>空格做截取

<%for(var i = 0; i < fruits.length; ++i) {%>支持，
<%               for(var i = 0; i < fruits.length; ++i) {                  %>这样也是支持的

自定义分隔符，可以使用<? ?><! !><# #>

3. ejs三种渲染方法

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

4. 自定义分隔符

```js
var users = ['zhangsan', 'lisi']
console.log(ejs.render('<!= user !>', { user: users }, { delimiter: '!' }))
console.log(ejs.render('<*= user *>', { user: users }, { delimiter: '*' }))
console.log(ejs.render('<@= user @>', { user: users }, { delimiter: '@' }))

//全局设置
ejs.delimiter = '$';
```

5. include其他文件
```js
include(filename) //支持一个文件名
include(variable) //支持一个变量，可以通过逻辑判断加载不同的文件
```

6. 与express结合使用

7. [ejs案例](https://github.com/mde/ejs/tree/master/examples)