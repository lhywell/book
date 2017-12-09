# Express

@(笔记)[node模块]

-------------------

### express基本概念 

#### express的定义

是基于Node.js平台，快速、开放、极简的 web 开发框架。

#### express核心

express核心是路由，中间件，模板引擎，通过一个express实例的一个引用来进行定义，var app = express()

#### express特点
1. 高性能
2. http封装
3. express generator快速的构建一个应用

#### express与nodejs什么关系
express:应用层的模块，基于node编写的web框架，封装http，js语法

Express 是一个简洁、灵活的 Node.js Web 应用开发框架, 它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

#### express路由有两种方式
1. app.route(),可以为路由路径创建链式路由句柄
2. express.Router，可以创建可挂载的模块化路由句柄。

#### express快速的构建一个应用
```bash
npm install -g express-generator@4
express xxx
```


#### express中间件类型
- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件 express4以上版本就一个内置中间件，express.static
- 第三方中间件

App对象表示express应用程序

- [express基本概念](https://github.com/lhywell/book/blob/master/express/README.md)

下一页：[express应用程序](https://github.com/lhywell/book/blob/master/express/1.1README.md)