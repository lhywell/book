var path = require('path')
var express = require('express')
var app = express()


/**
 * res.type()方法
 */
app.get('/type', function(req, res) {
	res.type('html')
	res.send('Hello world')
})

/**
 * res.attachment()方法
 */
app.get('/att', function(req, res) {
    // res.attachment('./a.txt');
    // res.attachment('./img.jpg');
    // res.attachment('./wen.xlsx');
    res.attachment('./wen.pdf');
    res.end()
})

/**
 * res.download()方法
 */
app.get('/download', function (req, res) {
  // res.download('./a.txt');
  // res.download('./img.jpg');
  // res.download('./wen.xlsx');
  res.download('./wen.pdf');
})

/**
 * res.json()方法
 */
app.get('/s', function(req, res){
  res.json({err:1})
});


/**
 * res.jsonp()方法
 */
app.get('/jeep', function(req, res){
	//Get http://localhost:3000/jeep?callback=jingcha
  res.jsonp({err:1})
});

/**
 * res.send()方法
 */
app.get('/send', function(req, res) {
	var str = 'Hello World!';
	res.send(str)
})

app.get('/accept', function (req, res) {
  res.type('png');
  return res.send('dfsd')
})

app.get('/tii', function (req, res) {
  res.type('html');
  res.send('<p>dfsd</p>')
})

/**
 * res.sendFile()方法,打印到前台
 */
app.get('/file', function (req, res) {
  console.log(path.resolve(__dirname+'/a.txt'))
  return res.sendFile(path.resolve(__dirname+'/a.txt'));
})


/**
 * res.set()方法
 */
app.get('/user/:uid/name', function(req, res) {
    res.set('Content-Type', 'application/json;charset=utf-8');
    res.end('用户' + req.params.uid)
})
app.get('/user/*', function(req, res) {
    res.set('Content-Type', 'text/plain');
    res.end('用户' + req.params.uid)
})


/**
 * res.render()方法
 * res.render内部是调用的app.render，渲染的是index.ejs模板
 */

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/render',function(req,res,next){
	res.render('index',{
		title:'hello world!'
	})	
})

/**
 * res.end()方法
 */
app.get('/end', function(req, res){
  res.end('Hello World!')
});

/**
 * 链式调用
 */
app.get('/finish', function(req, res){
  res.status(404).end('404!')
});

app.get('/duo', function(req, res) {
    // res.attachment('./a.txt');
    // res.attachment('./img.jpg');
    res.attachment('./wen.xlsx').status(304)
    res.end()
})

app.get('/kang', function(req, res) {
    res.type('html').type('json').type('png')
    res.end()
})


app.listen(3000)