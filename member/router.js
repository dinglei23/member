var express=require('express');
var mongoose=require('mongoose');
var moment = require("moment");
var router=express.Router();
var User=require('./module/user');//引入用户表
var Intermediary=require('./module/intermediary');//引入合伙人表
var Member=require('./module/member');//引入会员表

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
var lastUuid = 0;
 
function uuid() {
	return (new Date()).getTime() * 1000 + (lastUuid++) % 1000;
}
router.get('/addIntermediary', (req, res) => {  //注册合伙人
            var query=req.query;
            var intermediary=new Intermediary({
                uid:'5d77a88326602f37f011a443',  //关联用户表id
            
                intermediary_name:query.name,  //合伙人姓名
                   
                intermediary_id:query.sid,  //合伙人身份证
                   
                intermediary_iphone:query.iphone,  //合伙人手机号码
                    
                intermediary_password:query.password,  //合伙人审核密码
                    
                intermediary_weixin:query.weixin,  //微信
                   
                intermediary_account:query.account,  //合伙人收款账户
                    
                intermediary_account_name:query.accountname,  //合伙人收款方式
                    
                invitation_code:uuid(),  //合伙人邀请码
                   
                invitation_total:0,  //合伙人总业绩
                    
                invitation_balance:0,  //合伙人会员余额
                    
                invitation_income:0  //个人收入
                    
            })
            intermediary.save(function(err,result){
                if(err) return res.status(500).json({"status":'fail'});
                User.updateOne({_id:'5d77a88326602f37f011a443'},{isIntermediary:1},function(err,doc){  //申请合伙人中
                    if(err)  return res.status(500).json({"status":'fail'});
                    return res.status(200).json({"status":"success"});
                })
                
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
        if(err) return res.status(500).json({"status":'fail'});
        console.log(doc)
        var result=[];
        for(var i=0;i<doc.length;i++){
            if(doc[i].list.length !=0){
                result.push(doc[i])
            }
        }
        return res.status(200).json(result);
    }) 
    
});

router.get('/agreeIntermediary',function(req,res){  //同意合伙人审核
    var _id=req.query._id;
    User.updateOne({_id:_id},{isIntermediary:2},function(err,doc){
        if(err)  return res.status(500).json({"status":'fail'});
        return res.status(200).json({"status":"success"});
    })
      
});
router.get('/noagreeIntermediary',function(req,res){  //拒绝合伙人审核
    var _id=req.query._id;
    User.updateOne({_id:_id},{isIntermediary:3},function(err,doc){
        if(err)  return res.status(500).json({"status":'fail'});
        return res.status(200).json({"status":"success"});
    })
      
});

router.get('/searchOneIntermediary',function(req,res){  //查询一条合伙人信息
    var _id=req.query._id;
    User.aggregate([{
        $lookup:{
            from:'intermediary',
            localField:'_id',
            foreignField:'uid',
            as:'list'
        }
    },{
        $match:{"_id":mongoose.Types.ObjectId(_id)}
    }],function(err,doc){
        if(err) return res.status(500).json({"status":'fail'});
        console.log(doc)
        var result=[];
        for(var i=0;i<doc.length;i++){
            if(doc[i].list.length !=0){
                result.push(doc[i])
            }
        }
        return res.status(200).json(result);
    }) 
      
});

router.get('/updataIntermediary',function(req,res){  //编辑合伙人信息
    var _id=req.query._id;
    var updata={
        intermediary_name:req.query.name,  //姓名
        intermediary_id:req.query.sfz,  //身份证
        intermediary_weixin:req.query.weixin,//用户微信
        intermediary_account_name:req.query.fkfs,//返款方式
        intermediary_account:req.query.skzh,//返款账户
    }
    
    Intermediary.updateOne({_id:_id},updata,function(err,doc){
        if(err)  return res.status(500).json({"status":'fail'});
        return res.status(200).json({"status":"success"});
    })
});

router.get('/deleteIntermediary',function(req,res){  //删除合伙人
    var _id=req.query._id;
   
    Intermediary.remove({_id:_id},function(err,doc){
        if(err) return res.status(500).json([{"status":'fail'}]);
        User.updateOne({_id:req.query._uid},{isIntermediary:0},function(err,doc){
            if(err)  return res.status(500).json({"status":'fail'});
            return res.status(200).json({"status":"success"});
        })
    });
});

// 合伙人结束操作

// 会员操作开始
router.get('/addMember', (req, res) => {  //注册会员
    var query=req.query;
    var member=new Member({
        uid:'5d77a89226602f37f011a444',  //关联用户表id
    
        member_name:query.name,  //会员姓名
           
        member_id:query.sid,  //会员身份证
           
        member_weixin:query.weixin,  //会员微信
            
        member_account_name:query.fkfs,  //返款方式
            
        member_account:query.fkzh,  //返款账号
           
        member_project:query.xfxm,  //消费项目
            
        member_adress:query.xfdz,  //消费地址
            
        member_consumption_amount:query.xfje,  //消费金额

        member_consumption_ye:query.xfje,  //账户余额
           
        member_number:query.fkqs,  //返款期数
            
        member_num:query.fkqs,  //剩余期数

        member_refunds:(query.xfje/query.fkqs).toFixed(2),//每期返额

        member_code:query.yqm  //邀请码
            
    })
    member.save(function(err,result){
        if(err) return res.status(500).json({"status":'fail'});
        User.updateOne({_id:'5d77a89226602f37f011a444'},{idMember:1},function(err,doc){  //申请合伙人中
            if(err)  return res.status(500).json({"status":'fail'});
            return res.status(200).json({"status":"success"});
        })
        
        })

});

router.get('/searchMember',function(req,res){  //会员列表展示
    User.aggregate([{
        $lookup:{
            from:'member',
            localField:'_id',
            foreignField:'uid',
            as:'Mlist'
        }
    }],function(err,doc){
        if(err) return res.status(500).json({"status":'fail'});
        console.log(doc)
        var result=[];
        for(var i=0;i<doc.length;i++){
            if(doc[i].Mlist.length !=0){
                result.push(doc[i])
            }
        }
        return res.status(200).json(result);
    }) 
    
});

router.get('/deleteMember',function(req,res){  //删除会员
    var _id=req.query._id;
   
    Member.remove({_id:_id},function(err,doc){
        if(err) return res.status(500).json([{"status":'fail'}]);
        User.updateOne({_id:req.query._uid},{idMember:0},function(err,doc){
            if(err)  return res.status(500).json({"status":'fail'});
            return res.status(200).json({"status":"success"});
        })
    });
});

router.get('/searchOneMember',function(req,res){  //查询一条会员信息
    var _id=req.query._id;
    User.aggregate([{
        $lookup:{
            from:'member',
            localField:'_id',
            foreignField:'uid',
            as:'Mlist'
        }
    },{
        $match:{"_id":mongoose.Types.ObjectId(_id)}
    }],function(err,doc){
        if(err) return res.status(500).json({"status":'fail'});
        console.log(doc)
        var result=[];
        for(var i=0;i<doc.length;i++){
            if(doc[i].Mlist.length !=0){
                result.push(doc[i])
            }
        }
        return res.status(200).json(result);
    })  
});

router.get('/updataMember',function(req,res){  //编辑合伙人信息
    var _id=req.query._id;
    var updata={
        member_name:req.query.name,  //姓名
        member_id:req.query.sfz,  //身份证
        member_weixin:req.query.weixin,//用户微信
        member_account_name:req.query.fkfs,//返款方式
        member_account:req.query.fkzh,//返款账户
        member_project:req.query.xfxm,//消费项目
        member_adress:req.query.xfdz,//消费地址
    }
    
    Member.updateOne({_id:_id},updata,function(err,doc){
        if(err)  return res.status(500).json({"status":'fail'});
        return res.status(200).json({"status":"success"});
    })
});

router.get('/agreeMember',function(req,res){  //同意合伙人审核
    var _id=req.query._id;
    User.updateOne({_id:_id},{idMember:2},function(err,doc){
        if(err)  return res.status(500).json({"status":'fail'});
        return res.status(200).json({"status":"success"});
    })
      
});
router.get('/noagreeMember',function(req,res){  //拒绝合伙人审核
    var _id=req.query._id;
    User.updateOne({_id:_id},{idMember:3},function(err,doc){
        if(err)  return res.status(500).json({"status":'fail'});
        return res.status(200).json({"status":"success"});
    })
      
});
// 会员操作结束

module.exports=router;