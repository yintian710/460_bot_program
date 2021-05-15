// index.js
// 获取应用实例
import Api from '../../utils/api'
const app = getApp();

Page({
  data: {
    APPID: 'wx71b15a7c8a510fa4',
    AppSecret: '1d9576e9828c721540ae78294c1ef83a',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    openid:'',
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    login_codes:''
  },
  async get_openid(){
    let result = await Api.getOPENID(this.data.login_codes)
    console.log(result.data)
    this.setData({
      openid: result.openid
    })
  },
  // 事件处理函数
    getOpenIdTap:function(){
    var that=this;
    wx.login({
      success:function(res){
            that.setData({
              login_codes: res.code
            })
            that.get_openid()
            wx.setStorageSync('openid', that.data.openid)
          }
        }),
    wx.navigateTo({
      url: '/pages/home/home?openid='+this.data.openid
    })
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
