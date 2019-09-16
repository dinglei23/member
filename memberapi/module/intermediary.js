var mongoose=require('mongoose');
var moment = require("moment");
mongoose.connect('mongodb://127.0.0.1:27017/member',{userNewUrlParser:true},function(err){
        console.log('合伙人数据库连接成功');
});
var time=moment().format("YYYY-MM-DD HH:mm:ss");
var Schema=mongoose.Schema;
var intermediarySchema=new mongoose.Schema({
        uid:{  //关联用户表id
            type:Schema.Types.ObjectId
        },
        
        intermediary_name:{  //合伙人姓名
            type:String,
            require:true
        },
        intermediary_id:{  //合伙人身份证
            type:String,
            require:true
        },
        intermediary_iphone:{  //合伙人手机号码
            type:Number,
            require:true,
            default:0
        },
        intermediary_password:{  //合伙人审核密码
            type:Number,
            required:true,
            default:13127871827
        },
        intermediary_weixin:{  //微信
            type:String,
            require:true
        },
        intermediary_account:{  //合伙人收款账户
            type:String,
            require:true
        },
        intermediary_account_name:{  //合伙人收款方式
            type:String,
            require:true
        },
        invitation_code:{  //合伙人邀请码
            type:String,
            require:true
        },
        invitation_member_count:{  //名下会员数量
            type:Number,
            default:0
        },
        invitation_status:{  //合伙人状态0非合伙人，1合伙人
            type:Number,
            enum:[0,1],
            default:0
        },
        invitation_total:{  //合伙人总业绩
            type:Number,
            require:true,
            default:0
        },
        invitation_balance:{  //合伙人会员余额
            type:Number,
            require:true,
            default:0
        },
        invitation_income:{  //个人收入
            type:Number,
            require:true,
            default:0
        },
        invitation_refunds:{  //下期返款金额
            type:Number,
            default:0
        },
        register_time:{  //注册时间
            type:Date,
            default:time
        }
    })
    
module.exports=mongoose.model('intermediary',intermediarySchema,'intermediary')