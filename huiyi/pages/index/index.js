let app = getApp()

Page({
  data: {
    type:'',
    currentTab: 0,
    //这里只做tab名和显示图标
    PageItems1: [
      {
        "text": "首页",
        "iconPath": "/images/souye12x.png",
        "selectedIconPath": "/images/souye22x.png"
      },
      {
        "text": "审批",
        "iconPath": "/images/shenpi12x.png",
        "selectedIconPath": "/images/shenpi22x.png"
      },
      {
        "text": "管理",
        "iconPath": "/images/guanli12x.png",
        "selectedIconPath": "/images/guanli22x.png"
      },
      {
        "text": "我的",
        "iconPath": "/images/wod12x.png",
        "selectedIconPath": "/images/wode22x.png"
      },
    ],
    PageItems2: [
      {
        "text": "预约",
        "iconPath": "/images/yuyue12x.png",
        "selectedIconPath": "/images/yuyue22x.png"
      },
      {
        "text": "记录",
        "iconPath": "/images/jilu12x.png",
        "selectedIconPath": "/images/jilu22x.png"
      },
      {
        "text": "我的",
        "iconPath": "/images/wod12x.png",
        "selectedIconPath": "/images/wode22x.png"
      },
    ],
    items:[],
  },
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({ 
        currentTab: e.target.dataset.current
      })
      that.setNavigationBarTitles()
    }
  },
  setNavigationBarTitles(){
    let that = this
    console.log(that.data.type,that.data.currentTab)
    if(that.data.type==1){
      if(that.data.currentTab===0){
        wx.setNavigationBarTitle({
          title: '会议室安排'
        })
      }else if(that.data.currentTab===1){
        wx.setNavigationBarTitle({
          title: '会议室审批'
        })
      }else if(that.data.currentTab===2){
        wx.setNavigationBarTitle({
          title: '会议室管理'
        })
      }else if(that.data.currentTab===3){
        wx.setNavigationBarTitle({
          title: '我的'
        })
      }
    }else{
      if(that.data.currentTab===0){
        wx.setNavigationBarTitle({
          title: '会议室预约'
        })
      }else if(that.data.currentTab===1){
        wx.setNavigationBarTitle({
          title: '预约记录'
        })
      }else if(that.data.currentTab===3){
        wx.setNavigationBarTitle({
          title: '我的'
        })
      }
    }
  },
  onShow:function(){
    wx.hideHomeButton()
  },
  onLoad: function (options) {
    let that = this
    if(options.type){
      that.setData({
        type : options.type
      })
    }
    if(that.data.type==1){
      that.setData({
        items:that.data.PageItems1
      })
    }else{
      that.setData({
        items:that.data.PageItems2
      })
    }
    
    console.log(that.data.type,that.data.items)
    that.setNavigationBarTitles()
  }
})
