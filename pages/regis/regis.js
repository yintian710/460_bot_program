// pages/regis/regis.js
import Api from '../../utils/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        verify_code: '',
        openid: '',
        user_id: '',
        QQ:''
    },
    bindKeyQQ: function (e) {
        this.setData({
            QQ: e.detail.value
        })
        console.log(e.detail.value)
    },

    bindKeyCode: function (e) {
        this.setData({
            verify_code: e.detail.value
        })
        console.log(e.detail.value)
    },
    async verify(){
        let result = await Api.verify(this.data.QQ, this.data.verify_code, this.data.openid)
        console.log(result)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            openid: options.openid
        });
        console.log(this.data.openid)
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