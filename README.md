# wxapp_qrcode

###微信小程序内生成二维码，自动刷新，停止刷新等

见pages/qrcode
引用了qrCode.js,见utils/qrCode.js

![小程序二维码](https://raw.githubusercontent.com/suzhao111/wxapp_qrcode/master/image/miniqrcode.jpg){:height="50px" width="50px"}

进入页面后，根据当前时间自动生成二维码（图片滞后500毫秒）
data中存储一个定时器：

```js
data: {
	// 存储定时器
	setInter:''
},
```

onload时，调用autoRefresh方法，在autoRefresh方法里，会首先先执行一次生成二维码的函数，再用定时任务每隔5秒钟执行一次，如果只用定时任务，那第一次执行会在5秒后

```js
autoRefresh: function() {
    let that = this;
    let size = that.setCanvasSize();//动态设置画布大小
    that.createQrCode("mycanvas", size.w, size.h) //先生成一次
    //定义定时器
    that.data.setInter = setInterval(function () {
      console.log('定时一次', Date.parse(new Date()))
      that.createQrCode("mycanvas", size.w, size.h)
    }, 5000);
  },
```

点击手动刷新，会执行manuRefresh方法，这个方法会首先清除autoRefresh里面的定时任务，再重新执行autoRefresh方法

```js
manuRefresh: function() {
    let that = this
    console.log('手动刷新')
    clearInterval(that.data.setInter)
    that.autoRefresh()
},
```

点击“停止自动刷新”按钮，会执行stopRefresh方法，清除定时任务

```js
stopRefresh: function() {
    let that = this
    console.log('点击取消自动刷新')
    clearInterval(that.data.setInter)
},
```
### 卡片翻转

见pages/card
使用了小程序中的animation动画对象，原理是在一个框内放两张卡片，一个正面，一个背面，两张卡片重叠，初始状态下，背面卡片翻转180度。

- 先在data中声明两个动画，一个正面卡片的动画，一个背面卡片的动画；
- 创建一个动画实例animation;   <font color="#00dd00">this.animation = wx.createAnimation({})</font>
- 调用实例中的方法来描述动画;  <font color="#00dd00">this.animation.rotateY(180).step()</font> 
- 通过动画实例的export方法输出动画；  <font color="#00dd00">this.animation.rotateY(180).step().export()</font> 

