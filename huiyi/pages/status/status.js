// pages/status/status.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide: false,
    phoneNumber:'',
    setInter:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ title: '加载中', icon: 'loading', duration: 100000 });
    let that = this
    console.log(1)

    that.data.setInter = setInterval(function () {
      console.log(app.globalData.freeze_flag)
      if(app.globalData.freeze_flag!==''){
        if (app.globalData.freeze_flag == true) {
          that.setData({
            isHide: true,
            phoneNumber:app.globalData.phoneNumber,
          })
        }else{
          console.log('app.globalData.userInf',app.globalData.userInfo)
          if(app.globalData.userInfo.role==0){//未绑定角色
            if(app.globalData.userInfo.nick_name==''){
              wx.reLaunch({
                url: '/pages/login/index',
              })
            }else{
              wx.reLaunch({
                url: '/pages/bindingInfo/bindingInfo',
              })
            }
          }else{//已绑定角色
            wx.reLaunch({
              url: '/pages/guide/guide?type='+(app.globalData.userInfo.role==1?2:1),
            })
          }
          console.log(2)
          clearInterval(that.data.setInter)
        }
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})