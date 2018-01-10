# npx

@(笔记)[node模块]

-------------------
第一次接触npx是在webpack官网，里面用到npx webpack进行打包，Node 8.2+ 版本提供 npx 命令，

```js
npx webpack src/index.js dist/bundle.js
```

### 简介
运行本地项目命令

\<command\>来自本地node_modules/.bin文件或者来自缓存，以执行命令

默认情况下，npx将检查是否\<command\>存在于$PATH或在本地./node_module/.bin文件中，并执行该操作。如果\<command\>没有找到，它将在执行之前安装。

git:https://github.com/zkat/npx

### Cli

![npm](https://github.com/lhywell/book/blob/master/node/img/600.png)

```js
$ npx http-server
npx: 23 安装成功，用时 48.633 秒
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.5.14:8080
Hit CTRL-C to stop the server
```

```js
$ npx github:piuccio/cowsay hello
npx: 23 安装成功，用时 48.633 秒
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.5.14:8080
Hit CTRL-C to stop the server
```