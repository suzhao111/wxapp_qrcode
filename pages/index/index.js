//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello 银河系小前端',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        location: null
    },
        //事件处理函数
        bindViewTap: function() {
            wx.navigateTo({
                url: '../logs/logs'
            })
        },
        onLoad: function () {
            if (app.globalData.userInfo) {
                this.setData({
                    userInfo: app.globalData.userInfo,
                    hasUserInfo: true
                })
            } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
            } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                }
            })
            }
        },

    

        // 获取用户信息
        getUserInfo: function(e) {
            console.log(e)
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })
        },

        // 检查授权情况
        checkSetting: function() {
            const that = this
            app.getSetting('scope.userLocation', 
                function() {
                    console.log('--------------检查地理位置授权，成功，开始获取定位-----------');
                    that.getLocation();
                    that.chooseLocation();
                },
                function(){

                }
            )
        },
        // 调用微信接口，获取当前坐标
        getLocation: function() {
            let that = this
            wx.getLocation({
                success: res => {
                    console.log('当前位置坐标：',res)
                    this.setData({
                        latitude: res.latitude,
                        longitude: res.longitude
                    })
                },
                fail: res => {
                    console.log('getlocation接口调用失败：')
                    that.checkSetting()
                }
            })
        },

        // 在地图上选择位置
        chooseLocation: function() {
            let that = this
            wx.chooseLocation({
                success: function(res){
                    console.log('商家选择的地址=======', res)
                    that.setData({
                        location: res
                    })
                },
                fail: function(res) {
                    console.log('选择地图失败===', res)
                    that.checkSetting()
                }
            })
        },

})
