import Api from "../../utils/api"
import show from "../../utils/print";
// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        score: '',
        user_id: 0,
        openid: ''
    },

    async get_score() {
        let result = await Api.get_score(this.data.user_id);
        // console.log(result)
        this.setData({
            score: result.data.score
        });
        return result
    },

    async do_daily() {
        let result = await Api.daily(this.data.user_id);
        let msg = result.data.message.public;
        await this.get_score();
        wx.showToast({
            title: msg,
            icon: 'none',
            duration: 1500
        })
    },

    async go_card() {
        wx.navigateTo({
            url: '/pages/card/card?user_id=' + this.data.user_id,
        })
    },
    async delete_user() {
        Api.deleteUserId(this.data.user_id);
        wx.removeStorageSync('user_id');
        show('删除成功');
        wx.navigateBack({
            delta: 10
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            openid: wx.getStorageSync('openid'),
            user_id: options.user_id
        });
        this.get_score();
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res);
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
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
});