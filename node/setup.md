# nvm安装node8.9.4

@(笔记)[node模块]

-------------------

安装最新的nodeLTS（长期支持版本） 8.9.4 版本，
安装环境win10，64位

### 步骤一
```node
nvm install 8.9.4
```

### 步骤二

![npm](https://github.com/lhywell/book/blob/master/node/img/500.png)

报错的话，重新安装会提示安装成功，但是打印下node -v,还是报错，说明node没安装成功，可以执行卸载命令nvm uninstall 8.9.4，但是卸载不干静，需要把nvm root下的node 8.9.4删除后，重新安装

![npm](https://github.com/lhywell/book/blob/master/node/img/501.png)

![npm](https://github.com/lhywell/book/blob/master/node/img/505.png)

如下图删掉v8.9.4文件夹，重新执行nvm install 8.9.4

![npm](https://github.com/lhywell/book/blob/master/node/img/502.png)

如果安装还不成功，多试几次，由于node和npm是先后下载，两个都要安装成功才可以

### 成功

如下图，安装成功，如果安装过程没有报错，忽略步骤二

![npm](https://github.com/lhywell/book/blob/master/node/img/503.png)

```node
nvm use 8.9.4
```
验证成功

![npm](https://github.com/lhywell/book/blob/master/node/img/504.png)