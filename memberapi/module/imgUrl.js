var mongoose=require('mongoose');
var moment = require("moment");
mongoose.connect('mongodb://127.0.0.1:27017/member',{userNewUrlParser:true},function(err){
        console.log('用户数据库连接成功');
});
var time=moment().format("YYYY-MM-DD HH:mm:ss").toString();
var Schema=mongoose.Schema;
var imgSchema=new mongoose.Schema({
        uid:{  //用户id
            type:Schema.Types.ObjectId
        },
        imgUrl:{  //图片地址
            type:String,
            require:true
        },
        send_time:{  //注册时间
            type:String,
            default:time
        }
    })
    
module.exports=mongoose.model('imgUrl',imgSchema,'imgUrl')