var express=require('express');
var mongoose=require('mongoose');
var moment = require("moment");
var router=express.Router();
var User=require('./module/user');//引入用户表
var Intermediary=require('./module/intermediary');//引入用户表

router.all('*', function(req, res, next) { //跨域设置
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 用户注册开始操作
router.get('/addUser', (req, res) => {  //注册用户
    var query=req.query;
    User.find({username:query.username},function(err,doc){
        if(err) return res.status(500).json([{"status":'fail'}]);
        if(doc.length>0){
            return res.status(200).json({"status":"0"});
        }else{
            var user=new User({
                username:query.username,  //用户名
                password:query.password,  //用户登陆密码
            })
            user.save(function(err,result){
                if(err) return res.status(500).json({"status":'fail'});
             
                return res.status(200).json({"status":"success",result:result});
                })
        }      
    })
});

router.get('/userLogin',function(req,res){  //用户登陆
    var query=req.query;
    User.find({username:query.username,password:query.password},function(err,doc){
        if(err) return res.status(500).json([{"status":'fail'}]);
        console.log(doc)
        if(doc.length>0){
            return res.status(200).json({"status":"0",result:doc});
        }else{
            return res.status(200).json({"status":"1"});
        }      
    })
    // User.aggregate([{
    //     $lookup:{
    //         from:'intermediary',
    //         localField:'_id',
    //         foreignField:'uid',
    //         as:'Ilist'
    //     }
    // },{
    //     $lookup:{
    //         from:'member',
    //         localField:'_id',
    //         foreignField:'uid',
    //         as:'Mlist'
    //     }
    // },{
    //     $match:{"_id":mongoose.Types.ObjectId(query._id)}
    // }],function(err,doc){
    //     console.log(doc);
    //     return res.status(200).json(doc);
    // }) 
    
});

router.get('/getUser',function(req,res){  //获取用户信息
    var query=req.query;
    
    User.aggregate([{
        $lookup:{
            from:'intermediary',
            localField:'_id',
            foreignField:'uid',
            as:'Ilist'
        }
    },{
        $lookup:{
            from:'member',
            localField:'_id',
            foreignField:'uid',
            as:'Mlist'
        }
    },{
        $match:{"_id":mongoose.Types.ObjectId(query._id)}
    }],function(err,doc){
        console.log(doc);
        return res.status(200).json(doc);
    }) 
    
});

router.get('/searchUser',function(req,res){  //后台用户列表展示
    User.find({},function(err,doc){
        if(err) return res.status(500).json([{"status":'fail'}]);
       
        return res.status(200).json(doc);
    })
    
});

router.get('/updataUser',function(req,res){  //编辑用户
    var _id=req.query._id;
    var updata={
        username:req.query.username,  //用户名
        password:req.query.password,  //用户登陆密码
        weixin:req.query.weixin,//用户微信
    }
    var query=req.query;
    User.find({username:query.username},function(err,doc){
        if(err) return res.status(500).json([{"status":'fail'}]);
      
        if(doc.length>0){
            return res.status(200).json({"status":"1"});
        }else{
            User.updateOne({_id:_id},updata,function(err,doc){
                if(err)  return res.status(500).json({"status":'fail'});
                return res.status(200).json({"status":"success"});
            })
        }
        
    })

    
});

router.get('/deleteUser',function(req,res){  //删除用户
    var _id=req.query._id;
   
    User.remove({_id:_id},function(err,doc){
        if(err) return res.status(500).json([{"status":'fail'}]);
        return res.status(200).json({"status":"success"});
    });
});
// 用户结束操作

// 合伙人开始操作

router.get('/addIntermediary', (req, res) => {  //注册用户
    var query=req.query;
    
   
            var intermediary=new Intermediary({
                uid:'5d65484edfe3a0213c1408b6',  //关联用户表id
            
                intermediary_name:query.name,  //合伙人姓名
                   
                intermediary_id:query.sid,  //合伙人身份证
                   
                intermediary_iphone:query.iphone,  //合伙人手机号码
                    
                intermediary_password:query.password,  //合伙人审核密码
                    
                intermediary_weixin:query.weixin,  //微信
                   
                intermediary_account:query.account,  //合伙人收款账户
                    
                intermediary_account_name:query.accountname,  //合伙人收款方式
                    
                invitation_code:654321,  //合伙人邀请码
                   
                invitation_total:0,  //合伙人总业绩
                    
                invitation_balance:0,  //合伙人会员余额
                    
                invitation_income:0  //个人收入
                    
            })
            intermediary.save(function(err,result){
                if(err) return res.status(500).json({"status":'fail'});
           
                return res.status(200).json({"status":"success"});
                })

});

router.get('/searchIntermediary',function(req,res){  //后台合伙人列表展示
    User.aggregate([{
        $lookup:{
            from:'intermediary',
            localField:'_id',
            foreignField:'uid',
            as:'list'
        }
    }],function(err,doc){
       
        return res.status(200).json(doc);
    }) 
    
});

// 合伙人结束操作


module.exports=router;