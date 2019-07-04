// pages/main/index.js
import QR from '../../utils/qrCode.js'

Page({
  data: {
    imagePath: '',
    // 存储定时器
    setInter:'',
    tip: 'null',
    st: null,  //记录每次自动刷新的开始时间
    expireTime: 20,  //过期时间，这里设置为20秒
  },
  onLoad: function (options) {
    var size = this.setCanvasSize();//动态设置画布大小
    let ct = Date.parse(new Date())
    let url = 'current_time=' + ct
    this.setData({
      st: ct
    })
    this.autoRefresh()
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 300;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  // 生成二维码
  createQrCode: function (canvasId, cavW, cavH) {
    let that = this
    let ct = Date.parse(new Date())
    if ((ct - that.data.st) > that.data.expireTime * 1000 ) { //超时，停止刷新
      this.setData({
        tip: that.data.expireTime + '秒超时，停止刷新'
      })
      clearInterval(that.data.setInter)
    } else {
      let url = 'current_time=' + ct
      console.log('当前生成时间是。。。。', ct)
      //调用插件中的draw方法，绘制二维码图片
      QR.api.draw(url, canvasId, cavW, cavH);
      setTimeout(() => { this.canvasToTempImage(); }, 500);
    }
    
  },

  // 自动刷新二维码，5秒刷新一次，先生成一次，再5秒后执行一次
autoRefresh: function() {
  let that = this;
  that.setData({
    st: Date.parse(new Date()),
    tip: '正在刷新'
  })
  let size = that.setCanvasSize();//动态设置画布大小
  that.createQrCode("mycanvas", size.w, size.h) //先生成一次
  that.data.setInter = setInterval(function () {
    console.log('定时一次', Date.parse(new Date()))
    that.createQrCode("mycanvas", size.w, size.h)
  }, 5000);
},
  // 取消自动刷新
  stopRefresh: function() {
    let that = this
    this.setData({
      tip: '已停止自动刷新'
    })
    console.log('点击取消自动刷新')
    clearInterval(that.data.setInter)
  },
  // 手动刷新一次，先清除定时器，再重新开启一个定时器
  manuRefresh: function() {
    let that = this
    console.log('手动刷新')
    clearInterval(that.data.setInter)
    that.autoRefresh()
  },

  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log('生成临时图片路径。。。。',tempFilePath);
        that.setData({
          imagePath: tempFilePath,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  // formSubmit: function (e) {
  //   var that = this;
  //   var url = e.detail.value.url;
  //   that.setData({
  //     maskHidden: false,
  //   });
  //   wx.showToast({
  //     title: '生成中...',
  //     icon: 'loading',
  //     duration: 2000
  //   });
  //   var st = setTimeout(function () {
  //     wx.hideToast()
  //     var size = that.setCanvasSize();
  //     //绘制二维码
  //     that.createQrCode(url, "mycanvas", size.w, size.h);
  //     that.setData({
  //       maskHidden: true
  //     });
  //     clearTimeout(st);
  //   }, 2000)
  // }

})