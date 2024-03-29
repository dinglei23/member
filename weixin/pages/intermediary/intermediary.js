// pages/intermediary/intermediary.js
const app = getApp();
var urlData = app.url.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',//用户名
    password:'',//密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  intermediary:function(){  //点击注册按钮
    if (!this.isLogin()){
      return false
    }
    app.getData(urlData + '/addUser', this.getData(),function(data){
      console.log(data.data)
      if (data.data.status == "success"){
        wx.showToast({
          title: '用户注册成功',
          icon: 'none',
          duration: 2000
        });
        wx.setStorage({
          key: "userId",
          data: data.data.result._id
        })
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.showToast({
          title: '用户名已存在',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  getData:function(){
    return{
      username: this.data.username,
      password: this.data.password
    }
  },
  isLogin:function(){
    if (!this.data.username){
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.password){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    return true
  },
  getUserName:function(e){  //获取用户名
    this.setData({
      username: e.detail.value
    })
  },
  getUserPass:function(e){//获取用户密码
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.intermediary();
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