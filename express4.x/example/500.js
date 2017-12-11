var express = require('express')
var app = express()




app.get('/', function(req, res, next) {
    next(new Error('error'))
}, function(req, res, next) {
    console.log('normal');
    res.end('normal')
})

//500错误

app.use(function(err, req, res, next) {
    console.log(err)
    // res.status(500).send('else')
    res.status(500).send('<!DOCTYPE html><head></head><body><script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script></body></html>')
})

app.use(function(req, res) {
    res.end('finish')
})

app.listen(3000)