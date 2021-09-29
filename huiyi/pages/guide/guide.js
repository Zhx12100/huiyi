// pages/bindingInfo/bindingInfo.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		type: 1, //1 组织者 2 使用者
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		let that = this
		that.setData({
			type: options.type
		})
		console.log('options', that.data.type)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
	goIndex(event) {
		let that = this
		if (event.currentTarget.dataset.type == 'arrange') {
			wx.redirectTo({
				url: "/pages/index/index?type=1"
			})
		}else{
			wx.redirectTo({
				url: "/pages/index/index?type=2"
			})
		}
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