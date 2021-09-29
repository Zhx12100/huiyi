const app = getApp()
Component({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    // winHeight: 196,
    winHeight: 328,
    currentTab: '',
    triggered: true,

    searchText: '',
    page: 0,
    page_len: 5,
    list: [],
    isHideLoadMore: true,
    myScrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    /**
     * 获取当前设备的宽高
     */
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       winWidth: res.windowWidth,
    //       winHeight: res.windowHeight
    //     });
    //   }
    // });
  },


  //下拉刷新
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    that.onShows()
  },
  lifetimes: {
    // console.log('kpl')
    attached: function () {
      this.onShows()
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
      this.onShows()
    },
  },
  methods: {
    onShows() {
      let that = this
      that.setData({
        page: 0,
        list: [],
      })
      that.getDataList()
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
        isHideLoadMore: true,
        myScrollTop: 0
      })
      that.getDataList()
    },

    //获取地址列表
    getDataList() {
      let that = this
      // return false
      that.setData({
        page: that.data.page + 1
      })
      let data
      data = {
        page: that.data.page,
        page_len: that.data.page_len,
        status: that.data.currentTab,
        name: that.data.searchText
      }

      wx.showNavigationBarLoading() //在标题栏中显示加载
      // return false
      wx.request({
        url: app.globalData.baseUrl + '/applet/meet/manager/list_order',
        method: "post",
        header: {
          'token': app.globalData.token
        },
        data: data,
        success: function (res) {
          console.log('获取订单列表', res.data.data)
          let arr = []
          arr = that.data.list
          console.log(that.data.currentTab)
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
    //  tab切换逻辑
    swichNav: function (e) {
      var that = this;
      console.log(e.target.dataset.current)
      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        if (e.target.dataset.current == '') {
          that.setData({
            currentTab: e.target.dataset.current,
          })
        } else {
          that.setData({
            currentTab: e.target.dataset.current,
          })
        }
      }
      that.claerData()
    },

    //回车搜索
    onConfirms() {
      let that = this
      that.setData({
        page: 0,
        list: []
      })
      that.getDataList()
    },
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉触底')
    // return false
    let that = this
    that.getDataList()
  },

  onShow: function () {

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})