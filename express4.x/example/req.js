var path = require('path')
var express = require('express')
var bodyParser = require('body-parser');
var multer = require('multer'); 
var app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(multer()); // for parsing multipart/form-data

/**
 * req.baseUrl属性
 * req.originalUrl属性
 * req.path属性
 */
app.use('/admin', function(req, res, next) {
  // GET 'http://www.example.com/admin/new'
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
  next();
});

/**
 * req.body属性
 */
app.post('/body', function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
//{ id: '12' }



/**
 * req.params属性
 */
app.get('/user/:id', function (req, res) {
  // GET /user/7
  console.log(req.params.id);
  //7
});


/**
 * req.query属性
 */
app.get('/search', function (req, res) {
  // GET /search?q=知乎
  console.log(req.query.q);
  //知乎
});

/**
 * req.fresh属性
 */
app.get('/send', function(req, res) {
	console.log(req.fresh)
	res.send('Hello World!')
	console.log(req.fresh)//返回304状态码
})

app.get('/method', function (req, res) {
  console.log(req.method);
  next()
});


app.get('/accept', function (req, res) {
  console.log(req.accepts('html'))
  //html
  res.send('dfsd')
})

app.get('/apt', function (req, res,next) {
  console.log(req.acceptsEncodings())
  console.log(req.acceptsCharsets())
  console.log(req.acceptsLanguages())
  next()
  //[ 'gzip', 'deflate', 'br', 'identity' ]
  //[ '*' ]
  //[ 'zh-CN', 'zh' ]
});


app.listen(3000)