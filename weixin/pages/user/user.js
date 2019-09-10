//index.js
//获取应用实例
const app = getApp();
var urlData = 'http://localhost:3000';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerWidth:0,//banner宽度
    height:0,//屏幕高度
    userData:{},//用户数据
    infoStorage: '',//缓存中的id
  },
  //事件处理函数
  
  onLoad: function () {
    this.getLogin();//获取用户登陆头像
    this.getSystem();//获取屏幕信息
    this.login();//用户登陆
  },
  login:function(){  //用户登陆
    console.log(wx.getStorageSync('userId'),'ttt')
    var that=this
    if (wx.getStorageSync('userId')) {
      app.getData(urlData + '/getUser', { _id: wx.getStorageSync('userId') }, function (data) {
        console.log(data,111)
        that.setData({
          userData: data.data[0],
          infoStorage: data.data[0]._id
        })
      })
    } else {
      console.log(wx.getStorageSync('userId'),222)
    }
  },
  toIntermediary:function(){  //去用户注册页面
    wx.navigateTo({
      url: '../intermediary/intermediary'
    })
  },
  toLogin:function(){  //去登陆页面
    wx.navigateTo({
      url: '../login/login'
    })
  },
  getSystem: function () { //获取屏幕信息
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight;
        // 获取可使用窗口高度
        let clientWidth = res.windowWidth;

        // 设置高度
        that.setData({
          bannerWidth: clientWidth,
          height: clientHeight
        });
      }
    });

  },
  getLogin:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.login();//用户登陆
  },
})
