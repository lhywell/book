var path = require('path')
var express = require('express')
var app = express()

/**
 * app.locals属性
 */
 console.log(app.locals)
/*
{ settings:
   { 'x-powered-by': true,
     etag: 'weak',
     'etag fn': [Function: generateETag],
     env: 'development',
     'query parser': 'extended',
     'query parser fn': [Function: parseExtendedQueryString],
     'subdomain offset': 2,
     'trust proxy': false,
     'trust proxy fn': [Function: trustNone],
     view: [Function: View],
     views: 'E:\\ixuexi\\http\\views',
     'jsonp callback name': 'callback' } }
*/

/**
 * app.mountpath属性
 */

var admin = express(); // the sub app

admin.get('/', function (req, res) {
  //Get 'http://www.example.com/admddin'
  console.log(111,req.baseUrl); // 111 '/admddin'
  console.log(222,admin.mountpath); // 222 '/adm*in'
  res.send('Admin Homepage');
})

app.use('/adm*in', admin); // mount the sub app

/**
 * app.settings属性
 */
console.log(app.settings)

/**
 * app.engines属性
 */
console.log(app.engines)
//{}

/**
 * app._router属性
 */
console.log(app._router)
/*
{ [Function: router]
  params: {},
  _params: [],
  caseSensitive: false,
  mergeParams: undefined,
  strict: false,
  stack:
   [ Layer {
       handle: [Function: query],
       name: 'query',
       params: undefined,
       path: undefined,
       keys: [],
       regexp: /^\/?(?=\/|$)/i,
       route: undefined },
     Layer {
       handle: [Function: expressInit],
       name: 'expressInit',
       params: undefined,
       path: undefined,
       keys: [],
       regexp: /^\/?(?=\/|$)/i,
       route: undefined },
     Layer {
       handle: [Function: mounted_app],
       name: 'mounted_app',
       params: undefined,
       path: undefined,
       keys: [Object],
       regexp: /^\/adm(.*)in\/?(?=\/|$)/i,
       route: undefined } ] }
*/

/**
 * app.set()方法
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


/**
 * app.Method()方法
 */
app.get('/', function(req, res) {
    res.end('home')
})
app.get('/work', function(req, res) {
	res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.end('工作')
})

//post
app.post('/', function(req, res) {
    res.end('post')
})


/**
 * app.param()方法
 */
app.get('/office/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

app.get('/office/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
app.param('id', function (req, res, next, value) {
  console.log('CALLED ONLY ONCE with', value);
  next();
}).param('id', function (req, res, next, value) {
  console.log('2CALLED ONLY ONCE with', value);
  next();
})

/**
 * app.render()方法
 * res.render内部是调用的app.render，渲染的是index.ejs模板
 */
app.get('/render',function(req,res,next){
	res.render('index',{
		title:'hello world!'
	})	
})


/**
 * app.route()方法
 */
app.route('/events')
.all(function(req, res, next) {
	console.log('all')
	next()
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
})
.get(function(req, res, next) {
	console.log('get')
	next()
})
.post(function(req, res, next) {
  // maybe add a new event...
  console.log('post')
  next()
})


/**
 * app setting table
 */
// console.log('case sensitive routing:',app.get('case sensitive routing'))
// console.log('env:',app.get('env'))
// console.log('etag:',app.get('etag'))
// console.log('jsonp callback name:',app.get('jsonp callback name'))
// console.log('json replacer:',app.get('json replacer'))
// console.log('json spaces:',app.get('json spaces'))
// console.log('query parser:',app.get('query parser'))
// console.log('strict routing:',app.get('strict routing'))
// console.log('subdomain offset:',app.get('subdomain offset'))
// console.log('trust proxy:',app.get('trust proxy'))
// console.log('views:',app.get('views'))
// console.log('view cache:',app.get('view cache'))
// console.log('view engine:',app.get('view engine'))
// console.log('x-powered-by:',app.get('x-powered-by'))



/**
 * app.use()方法
 */
app.use(function(req, res, next) {
    console.log(req.method + ' ' + req.originalUrl)
    next()
})

app.use('/products',require('./router/product'))
app.use('/users',require('./router/user'))


var router = express.Router();
router.get('/', function(req, res, next) {
    next();
})
app.use(router);

/**
 * 链式调用
 */
app.use('/link',function(req,res,next){
	console.log(1)
	next()
}).use('/nnn',function(req,res,next){
	console.log(2)
	next()
})

app.get('/ui',function(req,res,next){
	console.log(11)
	next()
}).get('/io',function(req,res,next){
	console.log(22)
	next()
})


app.listen(3000)