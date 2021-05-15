// const pubUrl = "https://wx.yintian.vip:4399"
const pubUrl = "https://localhost:4399"
const promisic = function (func) {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        });
    };
};

class Http {
    // 同步Http请求
    static async asyncRequest(options) {
        let res = await promisic(wx.request)({
            url: pubUrl + options.url,
            method: options.method || 'post',
            data: options.data || {},
            header: options.header || {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
        return res
    }
}

async function _http(options) {
    let a = await Http.asyncRequest(options);
    console.log(a, ':', options);
    return a

}


export default _http
