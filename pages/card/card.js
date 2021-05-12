// pages/card/card.js
import Api from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: '',
    user_id: 1327960105,
    openid: '',
    cardList:'',
    card_name:'',
    base64ImgUrl:''
  },

  async get_score(){
    let result = await Api.get_score(this.data.user_id)
    // console.log(result)
    this.setData({
      score: result.data.score
    })
    return result
  },
  async search_card(){
    let result = await Api.searchCard(this.data.user_id)
    let msg = result.data.message.public
    this.setData({
      cardList: msg
    })
  },
  async get_card_data(){
    let result = await Api.GetCardData(this.data.user_id, this.data.card_name)
    console.log(result.data)
    this.setData({
      Base64ImageUrl: this.getBase64ImageUrl(result.data)
    })
    console.log(this.data.base64ImgUrl)
  },
  async draw_card(){
    let result = await Api.drawCard(this.data.user_id)
    this.get_score()
    this.search_card()
    let msg = result.data.message.public
    this.setData({
      card_name:result.data.card
    })
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500
    })
    await this.get_card_data()
  },
   //把base64转换成图片
   getBase64ImageUrl: function(data) {
    /// 获取到base64Data
    var base64Data = data;
    /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
    base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
    /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
    const base64ImgUrl = "data:image/png;base64," + base64Data;
    /// 刷新数据
    return base64ImgUrl.replace(/[\r\n]/g, '');
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_score()
    this.search_card()
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