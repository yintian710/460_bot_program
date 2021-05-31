// index.js
// 获取应用实例
import Api from '../../utils/api'
import show from '../../utils/print'

Page({
    data: {
        APPID: 'wx71b15a7c8a510fa4',
        AppSecret: '1d9576e9828c721540ae78294c1ef83a',
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        openid: '',
        user_id: '',
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
        login_codes: ''
    },
    async get_openid() {
        let result = await Api.getOPENID(this.data.login_codes);
        if (result.code) {
            wx.setStorageSync('openid', result.data.openid);
            this.setData({
                openid: result.data.openid
            });
        }
        return result.data.openid
    },
    async get_user_id() {
        let openid = wx.getStorageSync('openid');
        console.log(openid);
        let result = await Api.get_user_id(openid);
        console.log(result);
        console.log(111);
        if (result.code) {
            show('登陆失败');
            return
        }
        let user_id = result.data.user_id;
        show('登陆成功');
        if (user_id) {
            wx.setStorageSync('user_id', result.data.user_id);
            this.setData({
                user_id: result.data.user_id
            });
            wx.navigateTo({
                url: '/pages/home/home?user_id=' + user_id
            })
        } else {
            wx.navigateTo({
                url: '/pages/regis/regis?openid=' + openid
            })
        }
    },
    // 事件处理函数
    async getOpenIdTap() {

        // let user_id = wx.getStorageSync('user_id');
        wx.getStorage({
            key: 'user_id',
            success(res) {
                console.log(res.data);
                show('登陆成功');
                wx.navigateTo({
                    url: '/pages/home/home?user_id=' + res.data
                });
            }
        });
        let that = this;
        wx.login({
            success: function (res) {
                that.setData({
                    login_codes: res.code
                });
            }
        });
        let openid = await that.get_openid();
        if (!openid) {
            wx.showToast({
                title: '登陆失败',
                icon: 'none',
                duration: 1500
            });
        } else {
            wx.setStorageSync('openid', openid);
            let user_id = wx.getStorageSync('user_id');
            if (!user_id) {
                this.get_user_id();
            } else {

                wx.navigateTo({
                    url: '/pages/home/home?user_id=' + user_id
                })
            }

            console.log(user_id, 123)
        }
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
        // this._onload()
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res);
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        console.log(e);
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
});
