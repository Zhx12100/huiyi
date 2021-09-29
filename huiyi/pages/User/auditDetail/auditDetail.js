// pages/Administration/auditDetail/auditDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.baseUrl,
    id: '',
    detail: {},
    loadingHidden: true,
    detailTop: 100,
    items: [
      {
        index : 0,
        value: '设备损坏，暂无法使用',
        name: '设备损坏，暂无法使用',
        tips: ''
      },
      {
        index : 1,
        value: '当日临时清洁，暂无法使用',
        name: '当日临时清洁，暂无法使用',
        tips: ''
      },
      {
        index : 2,
        value: '其他原因',
        name: '其他原因',
        tips: ''
      }
    ],
    audit_index:'',
    audit_reason:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let that = this
    that.setData({
      id: options.id
    })
    that.getDetail()
    // that.showDetail()
  },

   //取消订单
   cancelOrder(event) {
    let that = this
    let order_id = that.data.id
    wx.showModal({
      title: '提示',
      content: '确认关闭该预约?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
          });
          wx.request({
            url: app.globalData.baseUrl + "/applet/meet/user/close_order",
            method: "POST",
            header: {
              'token': app.globalData.token
            },
            data: {
              order_id: order_id
            },
            success: function (res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'success',
                  duration: 1000
                })
                setTimeout(() => {
                  that.getDetail()
                }, 1000)
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'error',
                  duration: 2000
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  getDetail() {
    let that = this
    wx.pageScrollTo({
      scrollTop: 0
    })
    let url = '/applet/meet/user/detail_order'
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: app.globalData.baseUrl + url,
      method: "post",
      header: {
        'token': app.globalData.token
      },
      data: {
        order_id: that.data.id
      },
      success: function (res) {
        console.log('预约详情', res.data.data)
        wx.hideToast();
        that.setData({
          detail: res.data.data
        })
      }
    })
  },

  showDetail() {
    var that = this
    that.setData({
      detailTop: 0
    })
  },
  hideDetail(){
    let that = this
    that.setData({
      detailTop: 100
    })
  },

  bindReason: function (e) {
    this.setData({
      audit_reason: e.detail.value
    })
  },


  //审批不通过
  auditFalse() {
    let that = this
    that.setData({
      detailTop: 0
    })
  },

  //下载附件
  downLoadFile() {
    let that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000000
    });
    console.log('downloadFile', that.data.baseUrl + that.data.detail.meet_order.extra_file)
    wx.downloadFile({
      url: that.data.baseUrl + that.data.detail.meet_order.extra_file,
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(res)
        
        var index1 = filePath.lastIndexOf(".");
        var index2 = filePath.length;
        var postf = filePath.substring(index1, index2);//后缀名
        var postf1 = postf.replace(/\./g, '')
        console.log('postf1',postf1)
        //页面显示加载动画
        wx.openDocument({
          filePath: filePath,
          fileType: postf1,
          success: function (res) {
            console.log('打开文档成功')
            wx.hideToast();
          },
          fail: function (error) {
            console.log('error',error)
            wx.hideToast();
          },
        })
      }
    })
  },


  //其他原因
  radioChange(e) {
    var that = this
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = that.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    that.setData({
      audit_reason : e.detail.value,
      audit_index : e.detail.value=='其他原因'?2:1
    })
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