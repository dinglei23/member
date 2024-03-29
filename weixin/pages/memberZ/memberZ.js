// pages/memberZ/memberZ.js
const app = getApp();
var urlData = app.url.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payIsShow:true,
    
    name: '',//姓名
    sid: '',//身份证
    weixin: '',//微信
    xfxm: '',//消费项目
    xfdz: '',//消费地址
    xfje: 0,//消费金额
    fkqs: 0,//返款期数
    yqm:'',//邀请码
    fkfs: '支付宝',//返款方式
    fkzh: '',//返款账号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  memberzhuce:function(){  //会员注册
    if (!this.isData()){
      return
    }
    app.getData(urlData + '/addMember', this.getData(), function (data) {  //会员注册
      wx.showToast({
        title: '会员注册成功',
        icon: 'none',
        duration: 2000
      });
      wx.navigateBack({
        delta: 1
      })
    })
  },
  getData:function(){  //获取会员注册参数
    return{
      uid: wx.getStorageSync('userId'),//用户id
      name: this.data.name,//姓名
      sid: this.data.sid,//身份证
      weixin: this.data.weixin,//微信
      xfxm: this.data.xfxm,//消费项目
      xfdz: this.data.xfdz,//消费地址
      xfje: this.data.xfje,//消费金额
      fkqs: this.data.fkqs,//返款期数
      yqm: this.data.yqm,//邀请码
      fkfs: this.data.fkfs,//返款方式
      fkzh: this.data.fkzh,//返款账号
    }
  },
  isData:function(){  //判断参数
    if (!this.data.name){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (!this.data.sid) {
      wx.showToast({
        title: '身份证不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (!this.data.weixin) {
      wx.showToast({
        title: '微信不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (!this.data.xfxm) {
      wx.showToast({
        title: '消费项目不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (!this.data.xfdz) {
      wx.showToast({
        title: '消费地址不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (!this.data.fkqs) {
      wx.showToast({
        title: '消费期数不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (!this.data.yqm) {
      wx.showToast({
        title: '邀请码不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (!this.data.fkzh) {
      wx.showToast({
        title: '返款账号不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
      return true;
  },
  getname: function (e) {  //姓名
    this.setData({
      name: e.detail.value
    })
  },
  getid: function (e) {  //身份证
    this.setData({
      sid: e.detail.value
    })
  },
  getweixin: function (e) {  //微信
    this.setData({
      weixin: e.detail.value
    })
  },
  getxfxm: function (e) {  //消费项目
    this.setData({
      xfxm: e.detail.value
    })
  },
  getxfdz: function (e) {  //消费地址
    this.setData({
      xfdz: e.detail.value
    })
  },
  getxfje: function (e) {  //消费金额
    this.setData({
      xfje: e.detail.value
    })
  },
  getfkqs: function (e) {  //返款期数
    this.setData({
      fkqs: e.detail.value
    })
  },
  getyqm: function (e) {  //邀请码
    this.setData({
      yqm: e.detail.value
    })
  },
  getfkzh: function (e) {  //返款账户
    this.setData({
      fkzh: e.detail.value
    })
  },
  getzfb: function () {//支付宝支付方式
    this.setData({
      fkfs: '支付宝'
    })
  },
  getwx: function () {//微信支付方式
    this.setData({
      fkfs: '微信'
    })
  },
  getyhk: function () {//银行卡支付方式
    this.setData({
      fkfs: '银行卡'
    })
  },
  tabPay:function(){  //银行卡方式下拉显示
    this.setData({
      payIsShow:false
    })
  },
  tabpayHide:function(){  //点击隐藏支付方式
    this.setData({
      payIsShow: true
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})