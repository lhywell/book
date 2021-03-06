浏览器端debug模块工具
====================

### 简介
debug是个Javascript 的调试工具，应用在nodejs和浏览器中，本文主要阐述在浏览器端的调试。

引用：[debug](https://www.npmjs.com/package/debug)

npm中debug浏览器调试描述信息非常少，就寥寥几笔，意思是在webkit内核的浏览器开发者工具中，debug可以支持Colors功能，具体怎么运用没说，我也是探讨了一番。

![debug](https://pic3.zhimg.com/50/v2-6acae21a20b6cc7c198c4c0fb85f32ce_hd.jpg)

首先把github包下载到本地，执行npm install，运行node端调试，这个忽略并不是我们说的重点

![debug](https://pic1.zhimg.com/50/v2-fd9beb72981f58652050261bdb767748_hd.jpg)

然后打开examples下的browser文件夹，打开colors.html发现报错，寻找不到dist/debug.js，发现症结在这里，需要我们手动生成一个dist目录，还有debug.js文件

于是查看package.json,和bower.json文件，发现并没有scripts执行，那怎么生成dist/debug.js文件呢，在package.json中发现browserify,那说明他是用browserify打包的，这时候我自己建了一个dist目录，并且尝试把src文件下的browser.js，common.js，index.js，node.js合并在一起，并起名为debug.js，但是没有成功，并且报debug is undefined，说明debug不是一个全局变量，没有定义，这时候我理解应该是需要一个UMD版本

在看了debug包后，看到在Makefile文件里说明了要

执行mkdir，新建一个dist目录，并执行 browserify，

![debug](https://pic3.zhimg.com/50/v2-b567fd5fab9c46e82ad4778d08ef4c8e_hd.jpg)

执行browerify --standalone debug . > debug.js，并在colors.html中引用，最后成功

![debug](https://pic3.zhimg.com/50/v2-13f1b6a5782aae280edfb72df6c345a6_hd.jpg)

![debug](https://pic3.zhimg.com/50/v2-1c87844e44f09966f236e27caae5b71a_hd.jpg)

在这里设计到browserify的应用，browserify跟webpack都是打包工具，browserify需要全局安装，具体怎么应用可以执行下

browserify -h，可以看到一共就11个命令，对于--standalone 是这样阐释的，对外会导出一个UMD包，并且可以全局调用，这正是我们需要执行debug.enable('*')所需要的。

![debug](https://pic1.zhimg.com/50/v2-eb3ef1ebe654014f9acfcf347d597c24_hd.jpg)