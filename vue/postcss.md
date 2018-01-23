# vue项目中postcss与webpack

@(笔记)[css]

-------------------
PostCSS 最强大之处在于它是模块化并且基于插件的架构，不过这也是个缺点。如果你之前在项目中使用 Sass/Less/Stylus (比如大多数的设计师和前端开发者)，你从不需要配置任何东西——它们内置了全部实用功能，开箱即用。然而，PostCSS 需要你做一些配置。你不得不从一眼看不到底的插件列表选择插件,

### 运行PostCSS
运行PostCSS的方法有很多种。你可以很容易地将它添加到 Gulp 或 Webpack 的构建过程中；但是这篇指南中，我们要让事情尽可能简单，我们将使用 PostCSS 的 CLI。大多数人需要像这样全局安装它：

```node
npm install -g postcss-cli
```

然而，我推荐安装在可运行的本地环境，让他位于你当前工作的项目：

```node
npm install --save-dev postcss-cli
```


### 示例PostCSS配置

如果你是从一个 Sass 项目迁移过来的，你可能想要有：

- CSS @imports
- CSS @extends
- $variables
- Nested classes
- Mixins
- Autoprefixing

为了获得这些功能，你需要安装相关的模块：

https://github.com/postcss/postcss-import

https://github.com/postcss/postcss-simple-vars

https://github.com/travco/postcss-extend

https://github.com/postcss/postcss-nested

https://github.com/postcss/postcss-mixins

https://github.com/postcss/autoprefixer

注意：插件提供了与 Sass 几乎相同的语法,但有一些语法略微不同(比如 postcss-mixins 更强大)，所以更多信息请在上面的页面中确认。

然后用一行命令安装它们：
```node
npm install --save-dev style-loader css-loader postcss-loader postcss-load-config postcss-import postcss-simple-vars postcss-extend postcss-nested
```

安装完后，你会发现在package.json中devDependencies字段增加了style-loader css-loader postcss-loader postcss-load-config postcss-import postcss-simple-vars postcss-extend postcss-nested这些内容

### PostCSS在webpack中的配置

通过vue-cli构建的vue应用集成了webpack的基础配置，你需要找到build/webpack.base.conf.js中module/rules增加

```js
{
	test: /\.css$/,
	use: [
	  'style-loader',
	  {
	    loader: 'css-loader',
	    options: { importLoaders: 1 }
	  },
	  'postcss-loader'
	]
},
```
postcss-loader有一个配置文件postcss.config.js，然后新建一个postcss.config.js文件,统一管理插件需要把之前安装的包放到plugins里面，并且采用默认配置，默认配置就是空对象，不使用某个插件就是false

```js
module.exports = {
  parser: false,
  map: false,
  from: '',
  to: '',
  plugins: {
    "autoprefixer": {},
    "postcss-import": {},
    "postcss-simple-vars": {},
    "postcss-extend": {},
    "postcss-nested": {},
    "postcss-mixins": {}
  }
}
```
postcss-loader会在文件中遍历查找这个配置文件，所以不需要手动配置路径查找，采用默认的方式就好，当然也支持指定路径，需要在webpack.base.config.js中配置，这个看![postcss-loader](https://github.com/postcss/postcss-loader)文档
```js
{
  loader: 'postcss-loader',
  options: {
    config: {
      path: 'path/to/postcss.config.js'
    }
  }
}
```

### 在vue组件中引用样式
之后需要在每个vue文件中引入相应的组件样式

```js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <HeadM></HeadM>
  </div>
</template>

<script>
import HeadM from './HeadM'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    HeadM
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './src/assets/css/map/map.css'
</style>

```
map.css

```css
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
  }
}

a {
  color: #42b983;
}

#content {
  display: flex;
}
```
在每个vue组件中，应用了独立的样式，这样可以做到组件间样式分离，彼此不影响，如果你之前用过Sass，一定知道Sass是实现不了样式分离的，比如说在一个组件样式里定义了a属性，会泛滥到全局，我通常的解决方案是为每个组件定义一个特殊不重复的id，然后所有的样式嵌套在id下，这样不会泛滥到全局，这是对于开发经验久的人比较管用，但是经常会碰到一个实习生，或者开发经验1年所有的新手，会在组件样式里写类似.content这种重名风险高的类名，会导致整个页面渲染失效，所以总结来说，PostCss在这方面处理的还是非常好的。

于是执行npm run dev，你会看到样式已经加载进了页面，当你改动css文件的内容，webpack也会实时进行监听，不需要重新编译。

### 更改引入路径
之前每个组件路径引入都是在根目录下，'./src/assets/css...',现在为了统一引入的方便，我们把入口改下，

```js
module.exports = {
  parser: false,
  map: false,
  from: './src/assets/css/main.css',
  to: '',
  plugins: {
    "autoprefixer": {},
    "postcss-import": {},
    "postcss-simple-vars": {},
    "postcss-extend": {},
    "postcss-nested": {},
    "postcss-mixins": {}
  }
}

```
看到from字段，改成一个'./src/assets/css/main.css'文件，这个文件可以作为所有样式文件的入口，相应的其他vue文件的引入也要改成

```js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <HeadM></HeadM>
  </div>
</template>

<script>
import HeadM from './HeadM'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    HeadM
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './map/map.css'
</style>

```
可以看到文件HelloWorld.vue组件引入样式文件，变更为'./map/map.css'

### 引入import
最重要的一点就是如果引用一个以上文件的话，尾部一定加上分号，否则解析不了

```css
@import "./common/variables.css";

@import './common/public.css';
```


### 引入嵌套
因为我们加入了postcss-nested插件，可以支持嵌套的样式，试下
```css
ul {
  list-style-type: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
  }
}
```
解析是可以执行的
```css
ul[data-v-656039f0] {
  list-style-type: none;
  padding: 0;
}
ul li[data-v-656039f0] {
    display: inline-block;
    margin: 0 10px;
}
```

### 引入变量
因为我们加入了postcss-simple-vars插件，可以支持变量的，试下
```css
$dir:    top;
$blue:   #056ef0;
$column: 200px;

.menu_link {
    background: $blue;
    width: $column;
}
.menu {
    width: calc(4 * $column);
    margin-$(dir): 10px;
}
```
### 引入mix
### 引入继承
### 引入autoprefix