var express = require('express');
let multer = require('multer');
var schedule = require('node-schedule');
let https = require("https");
let http = require("http");
let fs = require("fs");
let path=require('path');
var app = express();
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

var Member=require('./module/member');//引入会员表
var Intermediary=require('./module/intermediary');//引入合伙人表
var ImgUrl=require('./module/imgUrl');//引入账单图片表

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/upload', express.static('./upload'));
app.use('/views', express.static('./views'));
var router=require('./router');

// const httpsOption = {
//     key : fs.readFileSync("./https/2811361_www.mmzhixing.com.key"),
//     cert: fs.readFileSync("./https/2811361_www.mmzhixing.com.pem")
// }
app.use(router);


router.post('/imgupload', multer({  //账单图片上传
    //设置文件存储路径
   dest: 'upload'   //upload文件如果不存在则会自己创建一个。
}).single('file'), function (req, res, next) {
  if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
      res.render("error", {message: "上传文件不能为空！"});
      return
  } else {
     let file = req.file;
     let fileInfo = {};
    //  console.log(file,req.body);
     var imgName=file.filename+'.'+file.originalname.split('.')[1];
     
     fs.renameSync('./upload/' + file.filename, './upload/' + imgName);//这里修改文件名字，比较随意。
     // 获取文件信息
     fileInfo.mimetype = file.mimetype;
     fileInfo.originalname = file.originalname;
     fileInfo.size = file.size;
     fileInfo.path = file.path;

     // 设置响应类型及编码
     res.set({
       'content-type': 'application/json; charset=utf-8'
    });
    console.log(imgName,req.body._id)
    var imgUrlLoad='/upload/' + imgName;
    var imgUrl=new ImgUrl({  //
        uid:req.body._id,  //用户id
        imgUrl:imgUrlLoad,  //图片地址
    })
    imgUrl.save(function(err,result){
        if(err) return res.status(500).json({"status":'fail'});
        console.log(result,123)
        res.redirect('./views/upload.html')
    })
    
  }
});




//app.listen(8000, () => console.log('Example app listening on port 3000!'));
http.createServer(app).listen(8000,function(){
    var rule = new schedule.RecurrenceRule();
    rule.minute = 50

    var j = schedule.scheduleJob(rule, function(){
        console.log(1123)
        var syqs=0;
        var ye=0;
        Member.find({member_status:1},function(err,doc){ 
            for(var i=0;i<doc.length;i++){
                if(doc[i].member_num == 0){
                    Member.updateOne({_id:doc[i]._id},{member_consumption_ye:0,member_num:0},function(err,up){
                        // return res.status(200).json({"status":"success"});
                    })
                    // Intermediary.updateOne({invitation_code:doc[i].member_code},{invitation_balance:0},function(err,up){   
                    // })
                }else{
                    console.log(doc[i].member_code)
                    syqs=doc[i].member_num-1;
                    ye=(doc[i].member_consumption_ye-doc[i].member_refunds).toFixed(2);
                    var code=doc[i].member_code;
                    var t=i;
                    Member.updateOne({_id:doc[i]._id},{member_consumption_ye:ye,member_num:syqs},function(err,up){
                        
                    });
                    
                    Member.find({member_status:1,member_code:doc[i].member_code},function(err,Mdata){
                        var yecount=0;
                        for(var j=0;j<Mdata.length;j++){
                            yecount+=Mdata[j].member_consumption_ye;
                        }
                        console.log(Mdata[0].member_code,yecount)
                        Intermediary.updateOne({invitation_code:Mdata[0].member_code},{invitation_balance:yecount.toFixed(2),invitation_refunds:(yecount*0.5/12).toFixed(2)},function(err,uI){

                        })
                    })
                }
            };
        });

        // Intermediary.find({invitation_status:1},function(err,doc){
        //     for(var i=0;i<doc.length;i++){

        //     }
        // })
        // Intermediary.aggregate([{
        //     $lookup:{
        //         from:'member',
        //         localField:'invitation_code',
        //         foreignField:'member_code',
        //         as:'list'
        //     }
        // }],function(err,doc){
            
        //     for(var i=0;i<doc.length;i++){

        //     }
        // }) 

    });
});
// https.createServer(httpsOption, app).listen(443);