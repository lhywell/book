EJS 语法
====================

#### ejs是嵌入式的Javascript模板引擎，服务器JS和浏览器都支持,官方文档http://ejs.co/

#### [语法](https://github.com/mde/ejs/blob/master/docs/syntax.md)

1. 基本格式：用肩括号百分号模板标签，必须封闭起来，中间可以写Javascript语法，<% %>，

例如：
```js
<% for(var i = 0; i < fruits.length; ++i) {%>
```
2. 输出有两种方式:<%= %> 和 <%- %> ，分别表示html转义(对一些非法字符比如<,&等,会转义成\&lt;\&amp;)，非转义

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
5. 空格 <%_ _%>空格做截取

ejs
```js
<ul>
	 <%_ users.forEach(function(user){ _%>	 
    <li><%= user.name %></li>
 	<%_ }) _%> 	
</ul>
```
html
```html
<ul>
    <li>geddy</li>
    <li>neil</li>
    <li>alex</li>
</ul>
```

#### Options

@property {Boolean} [debug=false]

@property {Boolean} [compileDebug=true]

@property {Boolean} [_with=true]

@property {Boolean} [rmWhitespace=false]

@property {Boolean} [client=false]

@property {EscapeCallback} [escape={@link module:utils.escapeXML}]

@property {String} [filename=undefined]

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
console.log(ejs.render('<$= user $>', { user: users }, { delimiter: '$' }))
console.log(ejs.render('<@= user @>', { user: users }, { delimiter: '@' }))

//全局设置
ejs.delimiter = '$';
```

#### 视图渲染方法等等
| date_tag | form_tag | form_tag_end | hidden_field_tag | input_field_tag | is_current_page | link_to | submit_link_to | link_to_if | link_to_unless | link_to_unless_current | password_field_tag | select_tag | single_tag_for | start_tag_for | submit_tag | tag | tag_end | text_area_tag | text_tag | text_field_tag | url_for | img_tag |


img_tag
```js
img_tag('/some.png', 'something') => "<img src='/some.png' alt='something' />"
```

link_to

```js
link_to('hello world', '/something/here') => "<a href='/something/here' >hello world</a>"
```

 ```js
 var choices = [ {value: 1, text: 'First Choice' }, {value: 2, text: 'Second Choice'}, {value: 3, text: 'Third Choice'} ]
 select_tag('mySelectElement', 2, choices) =>
"<select id='mySelectElement' value='2' name='mySelectElement'>
   <option value='1' >First Choice</option>
   <option value='2' selected='selected'>Second Choice</option>
   <option value='3'>Third Choice</option>
</select>"

```

#### include其他文件
```js
include(filename) //支持一个文件名
include(variable) //支持一个变量，可以通过逻辑判断加载不同的文件
```

#### 与express结合使用

```js
var express = require('express')
var ejs = require('ejs')
var app = express()
var path = require('path')

app.get('/', function(req, res) {
    ejs.renderFile('./views/index.ejs', {
        title: 'test',
        body: '<h1>dddd</h1>'
    }, function(err, str) {
        console.log(str)
        res.send(str)
    })

    // res.render(path.join(__dirname, './views/index.ejs'),{
    //     title: 'ejs test',
    //     body: '<h1>ddfdf</h1>'
    // })
})
app.listen(3000)
```
可以看出ejs.renderFile和res.render功能是一样的，都是渲染

#### [ejs案例](https://github.com/mde/ejs/tree/master/examples)