const app = getApp();
Component({
  /**
   * 页面的初始数据
   */
  data: {
    dateString: "",
    //   spot: ["2021-8-6", "2021-8-9", "2021-8-20", "2021-9-12"]
    spot: [],
    defaultTime: '',
    items: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  lifetimes: {
    // console.log('kpl')
    attached: function () {
      this.showGet()
    },
    moved: function () {
      console.log('moved')
    },
    detached: function () {
      console.log('detached')
    },
  },
  onLoad: function (options) {

  },
  methods: {
    showGet(){
      let that = this
      var myDate = new Date();
      that.setData({
        defaultTime: `${myDate.getFullYear()}/${myDate.getMonth()+1}/${myDate.getDate()}`
      })
      that.getData(that.data.defaultTime)
    },
    getData(dates) {
      dates = dates.split('/').join('-')
      console.log('dates',dates)
      let that = this
      wx.request({
        url: app.globalData.baseUrl + '/applet/meet/manager_index',
        method: "post",
        header: { 'token': app.globalData.token },
        data: {
          date: dates
        },
        success: function (res) {
          console.log('首页数据', res)
          if(res.data.code==0){
            res.data.data.result.forEach((v,i)=>{
              v.indexLists = 3
            })
            that.setData({
              items:res.data.data.result
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'error',
              duration: 2000
            })
          }
        }
      })
    },
    showMore(event){
      let that = this
      var json = that.data.items
      var index = event.currentTarget.dataset.index
      json[index].indexLists==3?json[index].indexLists=1000:json[index].indexLists = 3
      that.setData({
        items:json
      })
    },
    dateChange(e) {
      console.log("选中日期变了,现在日期是", e.detail.dateString)
      this.getData( e.detail.dateString)
      this.setData({
        dateString: e.detail.dateString
      })
    },
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