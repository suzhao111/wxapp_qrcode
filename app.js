//app.js
App({
    globalData: {
        userInfo: null
    },
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },


    //   检查有没有授权相应的功能
    // getSetting: function (authName, onSuccess) {
    //     wx.getSetting({
    //         success: res => {
    //             if (res.authSetting[authName]) {
    //                 onSuccess(res);
    //             } else {
    //                 this.modalToSetting(authName, onSuccess)
    //             }
    //         }
    //     })
    // },
    //   检查有没有授权相应的功能
    getSetting: function (authName, onSuccess, onFail = {}) {
        wx.getSetting({
            success: res => {
                const authCheck = res.authSetting[authName];
                if (typeof authCheck === 'undefined' || authCheck) {
                    onSuccess()
                } else {
                    console.log('没有授权，使用modal调起授权===========')
                    this.modalToSetting(authName, onSuccess, onFail)
                }
            },
            fail: res => {
                console.log('appgetsettin    失败=======', res)
            }
        })
    },

    // 使用modal再次唤起授权提示
    modalToSetting: function (authName, onSuccess, onFail) {
        let tip = '需要您的授权'
        if (authName.indexOf('writePhotosAlbum') > -1) {
            tip = '需要您授权相册'
        } else if (authName.indexOf('userLocation') > -1) {
            tip = '需要您授权位置信息'
        }
        wx.showModal({
            title: '授权提示',
            content: tip,
            success: res => {
                if (res.confirm) {
                    wx.openSetting({
                        success: res => {
                            if (res.authSetting[authName]) {
                                console.log('授权成功，执行回调')
                                onSuccess && onSuccess();
                            } else {
                                wx.showToast({
                                    title: '获取权限失败',
                                    icon: 'none',
                                });
                                // console.log('授权失败')
                                // util.layer('授权失败！')
                            }
                        }
                    })
                } else {
                    onFail && onFail();
                    console.log('二次授权拒绝');
                }
            }
        })
    },

    // 使用modal再次唤起授权提示
    // modalToSetting: function (authName, onSuccess, onFail) {
    //     wx.showModal({
    //         title: '授权提示',
    //         content: '需要您的授权',
    //         success: res => {
    //             if (res.confirm) {
    //                 wx.openSetting({
    //                     success: res => {
    //                         if (res.authSetting[authName]) {
    //                             console.log('二次授权成功，执行回调======')
    //                             onSuccess(res);
    //                         } else {
    //                             console.log('二次授权失败=====', res)
    //                         }
    //                     }
    //                 })
    //             }else{
    //                 console.log('二次授权拒绝=====', res);
    //             }
    //         }
    //     })
    // }
})