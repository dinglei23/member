// pages/memberZ/memberZ.js
const app = getApp();
var urlData = app.url.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payIsShow: true,
    name: '',//姓名
    sid: '',//身份证
    weixin: '',//微信
    iphone: 0,//手机号
    password: '',//申请密码
    accountname: '支付宝',//返款方式
    account: '',//收款账户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  hhrzhuce:function(){  //合伙人注册
    if (!this.isData()) {
      return
    }
    app.getData(urlData + '/addIntermediary', this.getData(), function (data) {  //会员注册
      wx.showToast({
        title: '合伙人注册成功',
        icon: 'none',
        duration: 2000
      });
      wx.navigateBack({
        delta: 1
      })
    })
  },
  getData:function(){  //获取合伙人注册参数
    return{
      uid: wx.getStorageSync('userId'),//用户id
      name: this.data.name,//姓名
      sid: this.data.sid,//身份证
      weixin: this.data.weixin,//微信
      iphone: this.data.iphone,//手机号
      password: this.data.password,//申请密码
      accountname: this.data.accountname,//返款方式
      account: this.data.account,//收款账户
    }
  },
  isData: function () {//判断参数
    if (!this.data.name) {
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

    if (this.data.password != 13127871827) {  //申请密码
      wx.showToast({
        title: '申请密码有误，请联系管理员',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (!this.data.account) {
      wx.showToast({
        title: '收款账户不能为空',
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
  getiphone: function (e) {  //手机号
    this.setData({
      iphone: e.detail.value
    })
  },
  getpass: function (e) {  //申请密码
    this.setData({
      password: e.detail.value
    })
  },
  getfkzh: function (e) {  //付款账户
    this.setData({
      account: e.detail.value
    })
  },
  getzfb: function () {//支付宝支付方式
    this.setData({
      accountname: '支付宝'
    })
  },
  getwx: function () {//微信支付方式
    this.setData({
      accountname: '微信'
    })
  },
  getyhk: function () {//银行卡支付方式
    this.setData({
      accountname: '银行卡'
    })
  },
  tabPay: function () {  //支付方式下拉显示
    this.setData({
      payIsShow: false
    })
  },
  tabpayHide: function () {  //点击隐藏支付方式
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