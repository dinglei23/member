//index.js
//获取应用实例
const app = getApp()
var urlData = app.url.url;
Page({
  data: {
    imgUrls: [
      '../../img/banner.png',
      '../../img/banner.png',
      '../../img/banner.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    bannerWidth:0,//banner宽度
    height:0,//屏幕高度
    userData: {},//用户数据
    infoStorage: '',//缓存中的id
  },
  
  onLoad: function () {
    
    
    this.getSystem();
    this.loginStatu();
  },
  toMemberZ:function(){  //跳转到会员注册页面
    if (wx.getStorageSync('userId')){
      wx.navigateTo({
        url: '../memberZ/memberZ'
      });
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
    }
  },
  loginStatu:function(){   //用户登录状态
  var that=this;
    this.setData({
      infoStorage: wx.getStorageSync('userId')
    })
    if (wx.getStorageSync('userId')) {
      app.getData(urlData + '/getUser', { _id: wx.getStorageSync('userId') }, function (data) {  //用户登录
        that.setData({
          userData: data.data[0]
        });
      })
    } else {
      console.log(wx.getStorageSync('userId'), 222)
    }
  },
  getSystem:function(){ //获取屏幕信息
  var that=this;
    
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
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.loginStatu();
  },
})
