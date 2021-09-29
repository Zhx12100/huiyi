// pages/Administration/roomManagementDetail/roomManagementDetail.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		formData: {
			phone: '',
			pic_list: [],
			note: '',
		},
		preview : [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	//会议室名称
	bindPhone: function (e) {
		this.setData({
			['formData.phone']: e.detail.value
		})
	},
	bindNote: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			['formData.note']: e.detail.value
		})
	},

	//预览图片
	goPreview(event){
		let that = this
		//预览图片，放大预览
		console.log(event.currentTarget.dataset.src)
		let currentUrl = event.currentTarget.dataset.src
		wx.previewImage({
			current: currentUrl, // 当前显示图片的http链接
			urls: that.data.preview // 需要预览的图片http链接列表
		})
	},

	//删除图片
	delImg(event){
		let that = this
		let index = event.currentTarget.dataset.index
		let pic_list = that.data.formData.pic_list
		let preview = that.data.preview
		pic_list.splice(index,1)
		preview.splice(index,1)
		that.setData({
			['formData.pic_list']: pic_list,
			preview: preview,
		})
	},

	addImage() {
		let that = this
		if(that.data.formData.pic_list.length==5){
			wx.showToast({
        title: '最多上传五张',
        icon: 'error',
        duration: 2000
			});
			return false
		}
		wx.chooseImage({
			count: 5, //最多可以选择的图片总数  
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
			success: function (res) {
				var tempFilePaths = res.tempFilePaths
				console.log('选择的图片', tempFilePaths)
				wx.showToast({
					title: '正在上传...',
					icon: 'loading',
					mask: true,
					duration: 10000
				})
				var uploadImgCount = 0
				for (var i = 0, h = tempFilePaths.length; i < h; i++) {
					console.log(tempFilePaths[i])
					wx.uploadFile({
						// url: app.globalData.baseUrl + '/system/upload',
						url: app.globalData.baseUrl + '/system/upload',
						header: {
							'token': app.globalData.token,
							"Content-Type": "multipart/form-data",
							'accept': 'application/json',
						},
						filePath: tempFilePaths[i],
						name: 'file',
						formData: {
							// 'token': app.globalData.token  
						},
						success: function (res) {
							uploadImgCount++;
							var data = JSON.parse(res.data);
							console.log('上传的图片', data)

							//如果是最后一张,则隐藏等待中  
							if (uploadImgCount == tempFilePaths.length) {
								wx.hideToast();
							}
							let pic_list = that.data.formData.pic_list
							let preview = that.data.preview
							if(pic_list.length==5){
								return false
							}
							pic_list.push(data.data.file_path)
							preview.push(app.globalData.baseUrl + data.data.file_path)
							that.setData({
								['formData.pic_list']: pic_list,
								preview: preview,
							})
						},
						fail: function (res) {
							wx.hideToast();
							wx.showModal({
								title: '错误提示',
								content: '上传图片失败',
								showCancel: false,
								success: function (res) {}
							})
						}
					});
				}
			}
		})
	},

	goSubmit() {
		let that = this
		let data = that.data.formData
		if (data.phone == ''||data.note == '') {
			wx.showToast({
				title: '请填写完整信息',
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
			url: app.globalData.baseUrl + "/applet/user/save_feedback",
			method: "POST",
			header: {
				'token': app.globalData.token
			},
			data: data,
			success: function (res) {
				if (res.data.code == 0) {
					wx.redirectTo({
						url: '/pages/feedBackResult/feedBackResult',
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