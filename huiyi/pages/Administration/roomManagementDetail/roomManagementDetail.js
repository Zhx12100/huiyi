// pages/Administration/roomManagementDetail/roomManagementDetail.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		formData: {
			status: true,
			name: '',
			people_count: '',
			start_time: '',
			end_time: '',
			device: ''
		},
		type: 0,
		meet_id: '',
		items: ['投影仪', '话筒', '饮用水']
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			type: options.type
		})
		console.log(options)
		if (options.id) {
			this.setData({
				meet_id: options.id
			})
			wx.setNavigationBarTitle({
				title: '编辑会议室'
			})
			this.getDetail()
		} else {
			wx.setNavigationBarTitle({
				title: '新增会议室'
			})
		}
	},
	//容纳人数
	bindName: function (e) {
		this.setData({
			['formData.name']: e.detail.value
		})
	},
	bindPeople: function (e) {
		this.setData({
			['formData.people_count']: e.detail.value * 1
		})
	},
	bindDevice: function (e) {
		this.setData({
			['formData.device']: e.detail.value
		})
	},
	bindStartTimeChange: function (e) {
		console.log(`switch发生change事件，携带值为`, e.detail.value)
		this.setData({
			['formData.start_time']: e.detail.value
		})
	},
	bindEndTimeChange: function (e) {
		console.log(`switch发生change事件，携带值为`, e.detail.value)
		this.setData({
			['formData.end_time']: e.detail.value
		})
	},

	changeStatus(e) {
		console.log(`switch发生change事件，携带值为`, e.detail.value)
		this.setData({
			['formData.status']: e.detail.value
		})
	},

	bindNote: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			['formData.device']: e.detail.value
		})
	},

	addTab(e) {
		let that = this
		this.setData({
			['formData.device']: that.data.formData.device + e.currentTarget.dataset.tab + '、'
		})
	},

	goSubmit() {
		let that = this
		let data = that.data.formData
		if (that.data.meet_id != '') {
			data.meet_id = that.data.meet_id
		}
		// name: '',
		// people_count: '',
		// device: '',
		if (data.name == '') {
			wx.showToast({
				title: '请填写请填写会议室名称',
				icon: 'none',
				duration: 1500
			})
			return false
		}
		if (data.people_count == '') {
			wx.showToast({
				title: '请填写可容纳人数',
				icon: 'none',
				duration: 1500
			})
			return false
		}
		if (data.start_time == '' || data.end_time == '') {
			wx.showToast({
				title: '请选择时间段',
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
			url: app.globalData.baseUrl + "/applet/meet/save_meet",
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
					setTimeout(() => {
						wx.navigateBack({ //返回
							delta: 1
						})
					}, 1000)
				} else {
					wx.hideToast({})
					wx.showModal({
						title: '错误提示',
						content: res.data.message,
						showCancel: false,
						success: function (res) {}
					})
				}
			}
		})
	},

	getDetail() {
		let that = this
		wx.request({
			url: app.globalData.baseUrl + "/applet/meet/detail_meet",
			method: "POST",
			header: {
				'token': app.globalData.token
			},
			data: {
				meet_id: that.data.meet_id
			},
			success: function (res) {
				console.log('会议室详情', res)
				that.setData({
					formData: res.data.data,
					meet_id: res.data.data.meet_id
				})
			}
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