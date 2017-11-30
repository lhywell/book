# web地图

@(笔记)[百度地图|高德地图|坐标系转换]

以下是我个人开发中的总结：
 


-------------------

[TOC]

## web端地图坐标系转换（涉及到百度，高德，WGS84，GCJ02）

> 首先说下经纬度，在工作中经常有同事搞混经纬度，调用方法的时候也经常写反，再加上一大堆坐标系，导致后续工作混乱
经度(Lng)：116.397428，在中国是经度大于维度
维度（Lat）:39.90923

注意：
国家测绘局规定，中国互联网地图必须使用至少加密一次的GCJ-02坐标。故高德不提供任何坐标系转换为GPS坐标的接口，请知晓。

### 百度API 
以下两种分别是JavaScript API 和 Android地图SDK API，说到的坐标系方面的知识，都是大同小异的，可以总结如下：
http://lbsyun.baidu.com/index.php?title=jspopular/guide/coorinfo
http://lbsyun.baidu.com/index.php?title=androidsdk/guide/tool/coordinate

坐标知识介绍
国内主流坐标系类型
主要有以下三种
1. WGS84：为一种大地坐标系，也是目前广泛使用的GPS全球卫星定位系统使用的坐标系；简称（WGS84坐标）
2. GCJ02：是由中国国家测绘局制订的地理信息系统的坐标系统，是由WGS84坐标系经加密后的坐标系；简称（国测局坐标）
3. BD09：百度坐标系，在GCJ02坐标系基础上再次加密。其中BD09ll表示百度经纬度坐标，BD09mc表示百度墨卡托米制坐标。简称（百度坐标）
在海外地区，统一使用WGS84坐标。开发者在使用百度地图相关服务时，请注意选择

百度提供的官方方法是Convertor构造函数，里面有一个translate方法，提供了from,to参数，意思就是从一个坐标系转到另一个坐标系，其中from，to的定义如下

其中，3代表google,soso地图、aliyun地图、mapabc地图和amap地图所用坐标，国测局坐标，看来百度对坐标的转换是把这几种归为一类，其实google坐标系是wgs84坐标，国测局是国测局坐标，两个压根不是一个东西，这种转换可能考虑到国家安全的层面，所以在转换上比较简单粗暴。

### 高德API
关于高德坐标转换，有各种问题请参考
http://lbs.amap.com/faq/web/javascript-api?wd=%E5%9D%90%E6%A0%87%E8%BD%AC%E6%8D%A2&cateId=&page=
转换方法参考：
http://lbsbbs.amap.com/forum.php?mod=viewthread&tid=724&extra=page%3D1
http://lbs.amap.com/api/javascript-api/reference/lnglat-to-address/#m_AMap.convertFrom
高德只提供了以下3种坐标转换到高德
gps:GPS原始坐标；
baidu：百度经纬度；
mapbar：图吧经纬度；