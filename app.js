// app.js
App({
    data:{
      APP_ID :'wx71b15a7c8a510fa4',//输入小程序appid
      APP_SECRET :'5f7e8c95aff3d74ffb73fdf91a0b98af',//输入小程序app_secret
      openId:'',
      OPEN_ID: '',
      SESSION_KEY:''
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }})}});
