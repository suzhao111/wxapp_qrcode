# 银河系小前端

### 1、微信小程序内生成二维码，自动刷新，停止刷新等

见pages/qrcode
引用了qrCode.js,见utils/qrCode.js

![小程序二维码](https://raw.githubusercontent.com/suzhao111/wxapp_qrcode/master/image/miniqrcode.jpg)

进入页面后，根据当前时间自动生成二维码（图片滞后500毫秒）

- data中存储一个定时器
- onload时，调用autoRefresh方法，在autoRefresh方法里，会首先先执行一次生成二维码的函数，再用定时任务每隔5秒钟执行一次，如果只用定时任务，那第一次执行会在5秒后
- 点击手动刷新，会执行manuRefresh方法，这个方法会首先清除autoRefresh里面的定时任务，再重新执行autoRefresh方法
- 点击“停止自动刷新”按钮，会执行stopRefresh方法，清除定时任务
- 如果要设置超时停止刷新，需要在调用autoRefresh方法时，保存当前时间，再在每次执行定时任务时，判断一下是否超时，如果超时，清除定时任务

### 2、卡片翻转
见pages/card
使用了小程序中的animation动画对象，原理是在一个框内放两张卡片，一个正面，一个背面，两张卡片重叠，初始状态下，背面卡片翻转180度。

- 先在data中声明两个动画，一个正面卡片的动画，一个背面卡片的动画；
- 创建一个动画实例animation;   <font color="#00dd00">this.animation = wx.createAnimation({})</font>
- 调用实例中的方法来描述动画;  <font color="#00dd00">this.animation.rotateY(180).step()</font> 
- 通过动画实例的export方法输出动画；  <font color="#00dd00">this.animation.rotateY(180).step().export()</font> 