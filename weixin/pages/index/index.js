//index.js
//获取应用实例
const app = getApp()

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
  },
  
  onLoad: function () {
    this.getSystem();
  },
  toMemberZ:function(){  //跳转到会员注册页面
    wx.navigateTo({
      url: '../memberZ/memberZ'
    })
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
  
  }
})
