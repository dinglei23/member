var urlList='http://localhost:8000';
var member={
    addmember:function(){  //添加会员
        $('.addmember').on('click',function(){  
            comment.listAjax(urlList+'/addMember',member.getAddMemberData(),function(data){
                console.log(data,123)
                if(data.status == 'success'){
                    alert('会员添加成功');
                    $('.addInfo').css({
                        display:'none'
                    });
                    member.showMember();//请求用户列表数据
                }
            })
        })
    },
    getAddMemberData:function(){  //获取增加会员参数
        return{
            name:$('.addname').val(),//姓名
            sid:$('.addsid').val(),//身份证
            weixin:$('.addweixin').val(),//微信
            fkfs:$('.addfkfs').val(),//返款方式
            fkzh:$('.addfkzh').val(),//返款账号
            xfxm:$('.addxfxm').val(),//消费项目
            xfdz:$('.addxfdz').val(),//消费地址
            xfje:$('.addxfje').val(),//消费金额
            fkqs:$('.addxfqs').val(),//返款期数
            yqm:$('.addyqm').val()//邀请码
        }
    },
    showMember:function(){  //展示会员列表
        $('.contain-right-list').empty();
        comment.listAjax(urlList+'/searchMember',{},function(data){
            console.log(data)
            member.showMemberList(data)
        })
    },
    showMemberList:function(result){
        $.each(result,function(index,item){
            var str='';
            if(item.idMember == 3){
                str+='<ul style="opacity:0.5">';
            }else{
                str+='<ul>';
            }
            
            str+='<li class="contain-right-title-1">'+(index+1)+'</li>';
            str+='<li class="contain-right-title-2">'+item.username+'</li>';
            str+='<li class="contain-right-title-3">'+item.Mlist[0].member_name+'</li>';
            str+='<li class="contain-right-title-4">'+item.Mlist[0].member_id+'</li>';
            str+='<li class="contain-right-title-5">'+item.Mlist[0].member_consumption_amount+'</li>';
            str+='<li class="contain-right-title-6">'+item.Mlist[0].member_number+'</li>';
            str+='<li class="contain-right-title-7">'+item.Mlist[0].member_refunds+'</li>';
            str+='<li class="contain-right-title-8">'+item.Mlist[0].member_consumption_ye+'</li>';
            str+='<li class="contain-right-title-9">'+item.Mlist[0].member_num+'</li>';
            str+='<li class="contain-right-title-10">'+item.Mlist[0].member_code+'</li>';
            if(item.idMember == 0 || item.idMember == 1){
                str+='<li class="contain-right-title-13">';
                str+='<button class="agree"  _id="'+item._id+'" _mid="'+item.Mlist[0]._id+'" code="'+item.Mlist[0].member_code+'">同意</button>';
                str+='<button class="noagree"  _id="'+item._id+'">拒绝</button>';
                str+='</li>';
            }else if(item.idMember == 2){
                str+='<li class="contain-right-title-13">已是会员</li>';
            }else if(item.idMember == 3){
                str+='<li class="contain-right-title-13">会员申请被拒绝</li>';
            }
            str+='<li class="contain-right-title-14">';
            str+='<button class="send" _uid="'+item._id+'">点击发送</button>';
            str+='</li>';
            str+='<li class="contain-right-title-11">';
            str+='<button class="look" _uid="'+item._id+'">点击查看</button>';
            str+='</li>';
            str+='<li class="contain-right-title-12">';
            str+='<button class="updata" _id="'+item.Mlist[0]._id+'" _uid="'+item._id+'">编辑</button>';
            str+='<button class="delete" _id="'+item.Mlist[0]._id+'" _uid="'+item._id+'">删除</button>';
            str+='</li>';
            str+='</ul>';
            $('.contain-right-list').prepend(str)
        });

        $('.delete').on('click',function(){  //删除会员
            comment.alert('确定删除会员？');
            var _id=$(this).attr('_id');
            var _uid=$(this).attr('_uid');
            $('.alert-bt-1').on('click',function(){
                comment.listAjax(urlList+'/deleteMember',{_id:_id,_uid:_uid},function(data){
                    $('.alert').css({
                        display:'none'
                    })
                    alert('删除成功');
                    member.showMember(); //展示会员列表
                })
            })
        });

        $('.look').on('click',function(){  //点击查看会员信息
            $('.lookInfo').css({
                display:'block'
            });
            var _id=$(this).attr('_uid');
            comment.listAjax(urlList+'/searchOneMember',{_id:_id},function(data){
                console.log(data);
                var item=data[0].Mlist[0]
                $('.infoname').text(item.member_name);//会员姓名
                $('.infoid').text(item.member_id);//身份证号码
                $('.infoweixin').text(item.member_weixin);//微信
                $('.infoxfxm').text(item.member_project);//消费项目
                $('.infoxfdz').text(item.member_adress);//消费地址
                $('.infofkfs').text(item.member_account_name);//返款方式
                $('.infofkzh').text(item.member_account);//返款账户
                $('.infoxfje').text(item.member_consumption_amount);//消费金额
                $('.infozqs').text(item.member_number);//总期数
                $('.infomyfe').text(item.member_refunds);//下期返额
                $('.infosyzj').text(item.member_consumption_ye);//剩余资金
                $('.infosyqs').text(item.member_num);//剩余期数

            })
        });

        $('.updata').on('click',function(){  //更新会员信息

            $('.updataInfo').css({
                display:'block'
            });
            var _id=$(this).attr('_id');
            var _uid=$(this).attr('_uid');
            comment.listAjax(urlList+'/searchOneMember',{_id:_uid},function(data){
                console.log(data);
                var item=data[0].Mlist[0]
                $('.updataname').val(item.member_name);//姓名
                $('.updataid').val(item.member_id);//身份证
                $('.updataweixin').val(item.member_weixin);//微信
                $('.updatafkfs').val(item.member_account_name);//返款方式
                $('.updatafkzh').val(item.member_account);//返款账户
                $('.updataxfxm').val(item.member_project);//消费项目
                $('.updataxfdz').val(item.member_adress);//消费地址
            })


            
            $('.updatabt').on('click',function(){  //点击用户编辑按钮
                comment.alert('确定更新吗');
                $('.alert-bt-1').on('click',function(){
                    comment.listAjax(urlList+'/updataMember',member.getUpdata(_id),function(data){
                        $('.alert').css({
                            display:'none'
                        })
                        alert('更新成功');
                        member.showMember(); //展示会员列表
                        $('.updataInfo').css({
                            display:'none'
                        });
                    })
                })
            });

        });

        $('.agree').on('click',function(){  //同意会员申请
            var _id=$(this).attr('_id');
            var _mid=$(this).attr('_mid');
            var code=$(this).attr('code');
            comment.alert('确定同意会员申请？');
            $('.alert-bt-1').on('click',function(){
                comment.listAjax(urlList+'/agreeMember',{_id:_id,_mid:_mid,code:code},function(data){
                    alert('会员同意成功');
                    $('.alert').css({
                        display:'none'
                    })
                    member.showMember(); //展示会员列表
                })
            });


            
        });
        $('.noagree').on('click',function(){  //拒绝会员申请
            var _id=$(this).attr('_id');

            comment.alert('确定拒绝会员申请？');
            $('.alert-bt-1').on('click',function(){
                comment.listAjax(urlList+'/noagreeMember',{_id:_id},function(data){
                    alert('会员申请拒绝成功');
                    $('.alert').css({
                        display:'none'
                    })
                    member.showMember(); //展示会员列表
                })
            });
           
        });

        $('.send').on('click',function(){  //点击账单发送
            $('.imgSend').css({
                display:'block'
            });
            $('.imgSend-contain-list ul').empty();
            var _uid=$(this).attr('_uid')
            $('.imgload').val(_uid);
            comment.listAjax(urlList+'/uploadImg',{_uid:_uid},function(data){
                console.log(data)
                $.each(data,function(index,item){
                    var str='';
                    var imgUrl=urlList+item.imgUrl
                    str='<li title="'+item.send_time+'"><div class="imgSend-contain-img-box"><img src="'+imgUrl+'"/></div></li>';
                    $('.imgSend-contain-list ul').append(str);
                })
            })
        })
    },
    getUpdata:function(_id){  //获取用户更新参数
        return{
            _id:_id,
            name:$('.updataname').val(),//姓名
            sfz:$('.updataid').val(),//身份证
            weixin:$('.updataweixin').val(),//微信
            fkfs:$('.updatafkfs').val(),//返款方式
            fkzh:$('.updatafkzh').val(),//返款账户
            xfxm:$('.updataxfxm').val(),//消费项目
            xfdz:$('.updataxfdz').val()//消费地址
        }
    }
}