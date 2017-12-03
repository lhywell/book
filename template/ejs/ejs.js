var express = require('express')
var ejs = require('ejs')
var app = express()
var path = require('path')
//
//
var str = 'hello,<%= name %>'
// var str2 = 'hello,<%- name %>'
// var str3 = `
//     <% if(name != "zhangsan"){ %>
//     张三
//     <% }else{ %>
//         李四
//     <% } %>
// `
// var str4 = `
//     <ul>
//     <% names.forEach(function(item){%>
//     <li><%= item %></li>
//     <% }) %>
//     </ul>
// `
// var str5 = `
//     <% for(var i=0;i<names.length;i++){%>
//         <%= i %>.<%=names[i] %>
//     <%}%>
// `
//
var tem = ejs.compile(str)
var tem2 = ejs.compile(str, {
    filename: './views/index.ejs'
})

console.log(tem({
    name: 'zhangsan'
}))
// var tem2 = ejs.compile(str2)
// var tem3 = ejs.compile(str3)
// var tem4 = ejs.compile(str4)
// var tem5 = ejs.compile(str5)
//
//
//
var users = ['zhangsan', 'lisi']
console.log(ejs.render('<@= user @>', { user: users }, { delimiter: '@' }))

console.log(3333, tem2({
    name: 'zhangsan',
    title: 'options',
    body: '<h1>ddfdf</h1>'
}))

// console.log(tem2({
//     name: '<p>zhhhhhhh</p>'
// }))
//
//
// console.log(tem3({
//     name: '<p>vvvvv</p>'
// }))
//
// console.log(tem4({
//     names: ['a', 'b', 'c']
// }))
//
//
// console.log(tem5({
//     names: ['df', 'df2']
// }))

console.log(2, ejs.render(str, {
    name: 'zhangsan'
}))

app.get('/', function(req, res) {
    ejs.renderFile('./views/index.ejs', {
        title: 'dfdf',
        body: '<h1>ddfdf</h1>'
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