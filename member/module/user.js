var mongoose=require('mongoose');
var moment = require("moment");
mongoose.connect('mongodb://127.0.0.1:27017/user',{userNewUrlParser:true},function(err){
        console.log('用户数据库连接成功');
});
var time=moment().format("YYYY-MM-DD HH:mm:ss");
var userSchema=new mongoose.Schema({
        username:{  //用户名
            type:String,
            required:true
        },
        password:{  //登陆密码
            type:String,
            required:true
        },
        idMember:{  ////会员状态，0未申请会员，1申请会员中，2会员，3申请被拒绝
            type:Number,
            default:0
        },
        isIntermediary:{//合伙人状态，0未申请合伙人，1申请合伙人中，2合伙人，3合伙人被拒绝
            type:Number,
            default:0
        },
        sex:{  //性别
            type:Number,
            enum:[0,1],
            default:0
        },
        weixin:{  //微信号
            type:String,
            default:'暂无'
        },
        register_time:{  //注册时间
            type:Date,
            default:time
        }
    })
    
module.exports=mongoose.model('user',userSchema,'user')