const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
    AuthorizedLogin: '授权登录',
    UserPhone: '手机号授权',
    lee: "",
    flag: true,
    userInfo: {
      openid: '',
      nick_name: '',
      avatar_url: '',
      gender: '',
      country: '',
      province: '',
      city: '',
      phone: '',
      role:0
    },
    storageInfo:{}
  },
  onLoad: function () {
    var that = this;
    
    // 查看是否授权
  },
  getInfo: function (e) {
    var that = this
    wx.showToast({title: '加载中', icon: 'loading', duration: 1000});
    wx.getUserProfile({
      lang: "zh_CN",
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (file) => {
        console.log('获取缓存里的info', wx.getStorageSync('userInfo'))
        that.setData({
          storageInfo:wx.getStorageSync('userInfo')
        })
        console.log('展示用户信息', file)
        this.setData({
          'userInfo.openid': that.data.storageInfo.openid,
          'userInfo.nick_name': file.userInfo.nickName,
          'userInfo.avatar_url': file.userInfo.avatarUrl,
          'userInfo.gender': file.userInfo.gender,
          'userInfo.country': file.userInfo.country,
          'userInfo.province': file.userInfo.province,
          'userInfo.city': file.userInfo.city,
        })
        //暂时跳过手机号
        console.log('shoujihao',that.data.storageInfo)
        wx.request({
          url: app.globalData.baseUrl + '/applet/user/save_info',
          method: "post",
          data: that.data.userInfo,
          success: function (ress) {
            console.log('登陆',ress)
            that.setData({
              'storageInfo.token':ress.data.data.tokeng,
              'storageInfo.userInfo':that.data.userInfo
            })
            wx.setStorageSync('userInfo',that.data.storageInfo)
            app.globalData.token = ress.data.data.token
            wx.redirectTo({
              url: '/pages/bindingInfo/bindingInfo',
            })
          }
        })
        return false
        this.setData({
          flag: false
        })
        wx.showToast({
          title: '请授权允许获得您的手机号码',
          icon: 'none',
          duration: 1500
        })
      },
      fail: function (err) {
        console.log("获取失败: ", err)
      }
    })
  },
  getNumber: function (e) {
    var that = this
    console.log('e用户授权手机号', e)
    wx.showToast({title: '加载中', icon: 'loading', duration: 1000});
    // return false
    wx.request({
      url: app.globalData.baseUrl + '/applet/user/get_phone',
      method: "post",
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        session_key: that.data.storageInfo.session_key
      },
      success: function (res) {
        console.log('后台返回手机号',res)
        that.setData({
          'userInfo.phone':res.data.data.phoneNumber
        })
        that.setData({
          'storageInfo.userInfo':that.data.userInfo
        })
        // return false
        wx.request({
          url: app.globalData.baseUrl + '/applet/user/save_info',
          method: "post",
          data: that.data.storageInfo.userInfo,
          success: function (ress) {
            console.log('登陆',ress)
            that.setData({
              'storageInfo.token':ress.data.data.token
            })
            wx.setStorageSync('userInfo',that.data.storageInfo)
            app.globalData.token = ress.data.data.token
            wx.redirectTo({
              url: '/pages/bindingInfo/bindingInfo',
            })
          }
        })
      }
    })
  }
})