# wxapp_qrcode

微信小程序内生成二维码，自动刷新，停止刷新等

见pages/qrcode
引用了qrCode.js,见utils/qrCode.js

![小程序二维码](https://raw.githubusercontent.com/suzhao111/wxapp_qrcode/master/image/miniqrcode.jpg)



进入页面后，根据当前时间自动生成二维码（图片滞后500毫秒）
data中存储一个定时器：

```data: {
data: {
	// 存储定时器
	setInter:''
},
```

