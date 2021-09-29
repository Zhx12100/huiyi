// app.js
App({
  onLaunch() {
    var that = this
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // return false
    // 登录
    console.log(1)
    // return false
    wx.login({
      success: res => {
        console.log('wx.login', res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId applet/mock_login
        var code = res.code
        wx.request({
          url: that.globalData.baseUrl + '/applet/login',
          method: "post",
          data: {
            code
          },
          success: function (res) {
            console.log('openId', res.data.data);
            wx.setStorageSync('userInfo', res.data.data)
            if (res.data.data.is_new == false) {//如果登陆过
              if (res.data.data.freeze_flag == true) {//如果该账号已被冻结  phone
                that.globalData.phoneNumber = res.data.data.phone
                return false
              } else { //如果未冻结
                
                if(!res.data.data.user_info.nick_name){//如果登陆过但未绑定信息
                  console.log('如果登陆过但未绑定信息')
                  // wx.redirectTo({
                  //   url: '/pages/login/index',
                  // })
                  // return false
                }
                that.globalData.token = res.data.data.token
                if(res.data.data.role==0){//未绑定角色
                  // wx.redirectTo({
                  //   url: '/pages/login/index',
                  // })
                }else{//已绑定角色
                  // wx.redirectTo({
                  //   url: '/pages/guide/guide?type='+(res.data.data.role==1?2:1),
                  // })
                }
                // wx.switchTab({
                //   url: '/pages/index/index',
                // })
              }
              that.globalData.freeze_flag = res.data.data.freeze_flag
              that.globalData.userInfo = res.data.data.user_info
            } else {
              wx.redirectTo({
                url: '/pages/login/index',
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    // baseUrl: 'https://freight.coschat.com',
    baseUrl: 'https://meet.coschat.com',
    token: '',
    freeze_flag: '',
    pageStatus: true,
    phoneNumber: false,
  }
})