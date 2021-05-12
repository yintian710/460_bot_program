const pubUrl = "http://localhost:4399"//这是我要请求的数据接口的公共部分
const http = (options) =>{
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
