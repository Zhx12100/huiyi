// pages/bindingInfo/bindingInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaData: {
      real_name: '',
      organize_id: ''
    }

  },

  //姓名
  bindName: function (e) {
    this.setData({
      ['areaData.real_name']: e.detail.value
    })
  },
  //组织ID
  bindID: function (e) {
    this.setData({
      ['areaData.organize_id']: e.detail.value
    })
  },

  //跳转估价页面
  goGuide() {
    let that = this
    let data = that.data.areaData
    console.log(data)
    if (data.organize_id == '') {
      wx.showToast({
        title: '请填写组织ID',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    if (data.real_name == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    data.openid = wx.getStorageSync('userInfo').openid
    console.log(data)
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 100000
    });
    wx.request({
      url: app.globalData.baseUrl + '/applet/user/save_organize',
      method: "post",
      header: {
        'token': app.globalData.token
      },
      data: data,
      success: function (res) {
        console.log('绑定组织', res)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.message,
            icon: 'error',
            duration: 5000
          })
          return false
        }
        wx.hideToast()
        wx.navigateTo({
          url: "../guide/guide?type=" + (res.data.data.role == 1 ? 2 : 1)
        })
      }
    })

    return false

    wx.navigateTo({
      url: "../transportMode/transportMode"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    wx.hideHomeButton()
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