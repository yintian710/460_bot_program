const pubUrl = "https://wxbot.yintian.vip:4399";
// const pubUrl = "https://localhost:4399"
const http = (options) =>{
  // console.log(options)
  return new Promise((resolve,reject) => {
    wx.request({
      url: pubUrl+options.url,
      method:options.method || 'post',
      data:options.data || {},
      header: options.header || {
        'content-type':'application/x-www-form-urlencoded'
      },
      success:resolve,
      fail:reject
    })
  })
}
export default http
