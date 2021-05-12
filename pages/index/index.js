// index.js
// 获取应用实例
const app = getApp()

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
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
    getOpenIdTap:function(){
    var that=this;
    wx.login({
      success:function(res){
        // console.log(res.code)
        wx.request({
            //获取openid接口
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid:app.data.APP_ID,
            secret:app.data.APP_SECRET,
            js_code:res.code,
            grant_type:'authorization_code'
          },
          method:'GET',
          success:function(res){
            // console.log(res.data)
            app.data.OPEN_ID = res.data.openid;//获取到的openid
            app.data.SESSION_KEY = res.data.session_key;//获取到session_key
            that.setData({
              openid: res.data.openid,
              session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
            })
            // console.log(that.data.openid)
            wx.setStorageSync('openid', that.data.openid)
          }
        })
      }
    })
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
