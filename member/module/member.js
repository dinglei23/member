var mongoose=require('mongoose');
var moment = require("moment");
mongoose.connect('mongodb://127.0.0.1:27017/member',{userNewUrlParser:true},function(err){
        console.log('用户数据库连接成功');
});
var time=moment().format("YYYY-MM-DD HH:mm:ss");
var Schema=mongoose.Schema;
var memberSchema=new mongoose.Schema({
        uid:{  //关联用户表id
            type:Schema.Types.ObjectId
        },
        member_name:{  //会员名
            type:String,
            required:true
        },
        member_id:{  //会员身份证
            type:String,
            required:true
        },
        member_account:{//会员返款账户
            type:String,
            required:true
        },
        member_account_name:{  //返款方式
            type:String,
            required:true
        },
        member_weixin:{  //微信号
            type:String,
            default:'暂无'
        },
        member_project:{  //消费项目
            type:String,
            required:true
        },
        member_adress:{  //消费地址
            type:String,
            required:true
        },
        member_consumption_amount:{  //消费金额
            type:Number,
            default:0
        },
        member_consumption_ye:{  //账户余额
            type:Number,
            default:0
        },
        member_number:{  //返款总期数
            type:Number,
            default:0
        },
        member_num:{  //返款剩余期数
            type:Number,
            default:0
        },
        member_refunds:{  //下期返款金额
            type:Number,
            default:0
        },
        member_code:{  //邀请码
            type:String,
            require:true
        },
        register_time:{  //注册时间
            type:Date,
            default:time
        }
    })
    
module.exports=mongoose.model('member',memberSchema,'member')