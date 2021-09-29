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
    items: [],
    winHeight: 528,
    triggered: true,
    searchText: '',
    page: 0,
    page_len: 5,
    list: [],
    isHideLoadMore: true,
  },
  
  lifetimes: {
    // console.log('kpl')
    attached: function () {
      // this.onShows()
    },
    moved: function () {
      console.log('moved')
    },
    detached: function () {
      console.log('detached')
    },
  },
  pageLifetimes : {
    show: function() {
      // 页面被展示  初始化数据的时候操作
      // this.onShows()
    },
  },
  onLoad: function (options) {

  },
  methods: {
    onShows() {
      let that = this
      var myDate = new Date();
      that.setData({
        page: 0,
        list: [],
        defaultTime: `${myDate.getFullYear()}/${myDate.getMonth()+1}/${myDate.getDate()}`
      })
      console.log('onshow')
      that.getDataList(that.data.defaultTime)
    },
    onRefresh() {
      console.log('下拉刷新')
      // return false
      let that = this
      that.setData({
        triggered: true,
        isHideLoadMore:false
      })
      that.claerData()
    },
    scrollHandler() {
      console.log('上拉加载')
      // return false
      let that = this
      console.log('上拉加载')
      that.getDataList()
    },

    getSwitchStatus(status) {
      switch (status) {
        case '已关闭':
          return 'ygb';
        case '审核通过':
          return 'ytg';
        case '已完成':
          return 'ywc';
        case '已关闭':
          return 'ygb';
      }
    },
    claerData() {
      let that = this
      that.setData({
        page: 0,
        list: [],
        isHideLoadMore: true
      })
      that.getDataList()
    },

    //获取地址列表
    getDataList(date) {
      let that = this
      // return false
      
      that.setData({
        page: that.data.page + 1
      })
      let data
      data = {
        page: that.data.page,
        page_len: that.data.page_len,
        name: that.data.searchText
      }
      console.log('that.data.defaultTime',that.data.defaultTime)
      if(date){
        data.date = date
      }else{
        data.date = that.data.defaultTime
      }
      data.date = data.date.split('/').join('-')

      wx.showNavigationBarLoading() //在标题栏中显示加载
      // return false
      wx.request({
        url: app.globalData.baseUrl + '/applet/meet/list_meet',
        method: "post",
        header: {
          'token': app.globalData.token
        },
        data: data,
        success: function (res) {
          console.log('获取订单列表', res.data.data)
          let arr = []
          arr = that.data.list
          res.data.data.result.forEach((v, i) => {
            arr.push(v)
          })
          that.setData({
            isHideLoadMore: res.data.data.result.length === 0 || res.data.data.result.length < that.data.page_len ? false : true,
            triggered: false
          })
          that.setData({
            list: arr
          })
          console.log('list',arr)
          // console.log(that.data.isHideLoadMore)
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
    },
    //搜索内容
    bindSearch: function (e) {
      this.setData({
        searchText: e.detail.value
      })
    },

    //跳转下单页面
    goWayDetail(e) {
      console.log(e)
      wx.navigateTo({
        url: "/pages/Administration/auditDetail/auditDetail?id=" + e.currentTarget.dataset.id
      })
    },

    //回车搜索
    onConfirms() {
      let that = this
      that.claerData()
    },

    dateChange(e) {
      console.log("选中日期变了,现在日期是", e.detail.dateString)
      this.setData({
        page: 0,
        list: [],
        isHideLoadMore: true
      })
      console.log('日期改变')
      this.getDataList(e.detail.dateString)
      this.setData({
        defaultTime: e.detail.dateString
      })
    },

    //跳转下单页面
    goAddEdit(e) {
      console.log(e)
      if(e.currentTarget.dataset.type==1){
        wx.navigateTo({
          url: `/pages/User/arrangeDetail/arrangeDetail?id=${e.currentTarget.dataset.id}&type=${e.currentTarget.dataset.type}&date=${this.data.defaultTime.split('/').join('-')}`
        })
      }else{
        wx.navigateTo({
          url: `/pages/User/arrangeDetail/arrangeDetail?type=${e.currentTarget.dataset.type}&date=${this.data.defaultTime.split('/').join('-')}`
        })
      }
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
    that.onShows()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})