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
    audit_reason: '',
    timeText: '',
    formData: {
      date: '',
      time_ids: [],
      name: '',
      phone: '',
      brand_note: '',
      reserve_note: '',
      extra_file: '',
    },
    extra_file_name: '',
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({
      id: options.id,
      ['formData.date']: options.date
    })
    that.getDetail()
    // that.showDetail()
  },

  getDetail() {
    let that = this
    wx.pageScrollTo({
      scrollTop: 0
    })
    let url = '/applet/meet/user/detail_meet'
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
        meet_id: that.data.id,
        date: that.data.formData.date
      },
      success: function (res) {
        console.log('预约详情', res.data.data)
        wx.hideToast();
        that.setData({
          detail: res.data.data
        })
        // console.log('detaile', that.data.detail.meet_order.time_list)
      }
    })
  },

  showDetail() {
    var that = this
    let status = false
    let time_list = that.data.detail.time_list
    time_list.forEach((v, i) => {
      if (v.use_flag == false) {
        status = true
      }
    })
    if (!status) {
      wx.showToast({
        title: '暂无时段可选',
        icon: 'error',
        duration: 2000
      });
      return false
    }
    that.setData({
      detailTop: 0
    })
  },
  //拒绝审核
  refuseAudit() {
    var that = this
    if (that.data.audit_reason == '') {
      wx.showToast({
        title: '请选择姻缘',
        icon: 'error',
        duration: 2000
      });
      return false
    }
    wx.showModal({
      title: '提示',
      content: '请确认是否要拒绝审核?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
          });
          wx.request({
            url: app.globalData.baseUrl + "/applet/meet/manager/audit_order",
            method: "POST",
            header: {
              'token': app.globalData.token
            },
            data: {
              order_id: that.data.id,
              audit_flag: true,
              audit_reason: that.data.audit_reason
            },
            success: function (res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'success',
                  duration: 1000
                })
                setTimeout(() => {
                  that.setData({
                    detailTop: 100
                  })
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
  hideDetail() {
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

  bindName: function (e) {
    this.setData({
      ['formData.name']: e.detail.value
    })
  },
  bindPhone: function (e) {
    this.setData({
      ['formData.phone']: e.detail.value
    })
  },
  bindReserveNote: function (e) {
    this.setData({
      ['formData.reserve_note']: e.detail.value
    })
  },
  bindBrandNote: function (e) {
    this.setData({
      ['formData.brand_note']: e.detail.value
    })
  },

  //提交预约
  auditTure() {
    let that = this
    let data = that.data.formData
    data.meet_id = that.data.id
    // let id = that.data.id
    // time_ids:[],
    //   name:'',
    //   phone:'',
    if (data.name == '' || data.time_ids.length == 0 || data.phone == '') {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'error',
        duration: 1000
      });
      return false
    }
    if (!(/^1[3456789]\d{9}$/.test(data.phone))) {
			wx.showToast({
				title: '手机号码格式有误',
				icon: 'none',
				duration: 1500
			})
			return false
		}
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: app.globalData.baseUrl + "/applet/meet/save_order",
      method: "POST",
      header: {
        'token': app.globalData.token
      },
      data: data,
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1000
          })
          wx.requestSubscribeMessage({
            tmplIds: ['uOj5pyHNBNAce4bvnAQgCs4nPQ_b-VOxwe8imH7-sSc', '7n5pJBcyrGtbNNSB4ouh8Xf58BJFXXFjwYNXRQma29U'],
            success(dingy) {
              console.log('成功订阅', dingy)
              wx.showToast({
                title: '成功订阅',
                icon: 'success',
                duration: 2000
              })
              setTimeout(() => {
                // that.getDetail()
                wx.navigateBack({ //返回
                  delta: 1
                })
              }, 1000)
            },
            fail(res) { // 接口调用失败的回调函数
              if (res.errCode === 20004) {
                wx.showModal({
                  title: "温馨提示",
                  content: "您已拒绝授权，将无法在微信中收到回复通知！",
                  showCancel: false,
                  success: res => {
                    if (res.confirm) {
                      setTimeout(() => {
                        // that.getDetail()
                        wx.navigateBack({ //返回
                          delta: 1
                        })
                      }, 1000)
                    }
                  }
                });
              }
            }
          })


        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },

  //上传附件
  goFiles() {
    let that = this
    console.log('gggg')
    // return false
    wx.chooseMessageFile({
      count: 1, //最多可以选择的文件总数  
      type: 'all', // 可以指定是原图还是压缩图，默认二者都有  
      success: function (res) {
        var tempFilePaths = res.tempFiles
        if (tempFilePaths.length == 0) {
          wx.showModal({
            title: '错误提示',
            content: '文件损坏或过期,请重新选择',
            showCancel: false,
            success: function (res) {}
          })
          return false
        }
        console.log('选择的文件', res)
        let types = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt', 'jpg', 'png', 'gif', 'mp4']
        const fileType = types.find(i => tempFilePaths[0].path.endsWith(i))
        if (types.indexOf(fileType) == -1) {
          wx.showModal({
            title: '错误提示',
            content: '文件类型不符合要求，请重新上传',
            showCancel: false,
            success: function (res) {}
          })
          return false
        }
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        wx.uploadFile({
          // url: app.globalData.baseUrl + '/system/upload',
          url: app.globalData.baseUrl + '/system/upload',
          header: {
            'token': app.globalData.token,
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
          },
          filePath: tempFilePaths[0].path,
          name: 'file',
          formData: {
            // 'token': app.globalData.token  
          },
          success: function (ress) {
            var data = JSON.parse(ress.data);
            console.log('上传的文件', data)
            wx.hideToast();
            that.setData({
              ['formData.extra_file']: data.data.file_path,
              extra_file_name: tempFilePaths[0].name
            })
          },
          fail: function (res) {
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '上传文件失败',
              showCancel: false,
              success: function (res) {}
            })
          }
        });
      }
    })
  },

  //删除文件
  deleteFiles() {
    let that = this
    that.setData({
      ['formData.extra_file']: '',
      extra_file_name: ''
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
      duration: 10000
    });
    console.log('downloadFile', that.data.baseUrl + that.data.detail.meet_order.extra_file)
    wx.downloadFile({
      url: that.data.baseUrl + that.data.detail.meet_order.extra_file,
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(res)
        //页面显示加载动画
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
            wx.hideToast();
          },
          fail: function (error) {
            console.log('error', error)
          },
        })
      }
    })
  },


  //其他原因
  checkboxChange(e) {
    var that = this
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    // const items = that.data.items
    // for (let i = 0, len = items.length; i < len; ++i) {
    //   items[i].checked = items[i].value === e.detail.value
    // }
    var time_lists = e.detail.value
    console.log(time_lists)
    let arr = []
    that.data.detail.time_list.forEach((v, i) => {
      time_lists.forEach((vs, is) => {
        if (vs == v.time_id) {
          arr.push(v.time)
        }
      })
    })
    console.log(arr)
    that.setData({
      ['formData.time_ids']: time_lists.map((item) => {
        return item * 1
      }),
      timeText: arr
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