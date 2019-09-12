var urlList='http://localhost:3000';
intermediary={
    addIntermediary:function(){  //添加合伙人
        $('.addIntermediary').on('click',function(){
            comment.listAjax(urlList+'/addIntermediary',intermediary.addIntermediaryData(),function(data){
                    console.log(data,123)
                    if(data.status == 'success'){
                        alert('用户添加成功');
                        $('.addInfo').css({
                            display:'none'
                        });
                        intermediary.searchIntermediaryList();//请求用户列表数据
                    }else if(data.status == '0'){
                        alert('该用户已经存在')
                    }
                })
        })
    },
    addIntermediaryData:function(){//获取合伙人参数
        var name=$('.addInfo-name').val(); //姓名
        var sid=$('.addInfo-id').val(); //身份证
        var iphone=$('.addInfo-iphone').val(); //手机号码
        var password=$('.addInfo-mm').val(); //申请密码
        var weixin=$('.addInfo-weixin').val(); //微信
        var account=$('.addInfo-zh').val(); //收款账户
        var accountname=$('.addInfo-qd').val(); //收款方式
        return{
            name:name,
            sid:sid,
            iphone:iphone,
            password:password,
            weixin:weixin,
            account:account,
            accountname:accountname
        }

    },
    searchIntermediaryList:function(){  //展示合伙人列表
        $('.contain-right-list').empty();
        comment.listAjax(urlList+'/searchIntermediary',{},function(data){
            console.log(data)
            intermediary.searchIntermediaryListShow(data)
            })
    },
    searchIntermediaryListShow:function(result){
        $.each(result,function(index,item){
            var str='';
            str+='<ul>';
            str+='<li class="contain-right-title-1">1</li>';
            str+='<li class="contain-right-title-3">'+item.username+'</li>';
            str+='<li class="contain-right-title-4">'+item.list[0].intermediary_name+'</li>';
            str+='<li class="contain-right-title-5">待定</li>';
            str+='<li class="contain-right-title-6">'+item.list[0].invitation_total+'</li>';
            str+='<li class="contain-right-title-7">'+item.list[0].invitation_income+'</li>';
            str+='<li class="contain-right-title-8">'+item.list[0].invitation_balance+'</li>';
            str+='<li class="contain-right-title-9">'+item.list[0].invitation_code+'</li>';
            str+='<li class="contain-right-title-10">'+item.list[0].register_time+'</li>';
            if(item.isIntermediary == 0 || item.isIntermediary == 1){
                str+='<li class="contain-right-title-13"><button class="agree" _id="'+item._id+'">同意</button><button class="noagree" _id="'+item._id+'">拒绝</button></li>';
            }else if(item.isIntermediary == 2){
                str+='<li class="contain-right-title-13">已同意会员申请</li>';
            }else if(item.isIntermediary == 3){
                str+='<li class="contain-right-title-13">已拒绝会员申请</li>';
            }
            
            str+='<li class="contain-right-title-11">';
            str+='<button class="look"  _id="'+item._id+'">点击查看</button>';
            str+='</li>';
            str+='<li class="contain-right-title-12">';
            str+='<button class="updata" _id="'+item.list[0]._id+'" _uid="'+item._id+'">编辑</button>';
            str+='<button class="delete" _id="'+item.list[0]._id+'" _uid="'+item._id+'">删除</button>';
            str+='</li>';
            str+='</ul> ';
            $('.contain-right-list').prepend(str);
        })

        $('.agree').on('click',function(){  //同意合伙人申请
            var _id=$(this).attr('_id');
            comment.alert('确定同意合伙人申请？');
            $('.alert-bt-1').on('click',function(){
                comment.listAjax(urlList+'/agreeIntermediary',{_id:_id},function(data){
                    alert('合伙人同意成功')
                    intermediary.searchIntermediaryList(); //展示合伙人列表
                })
            });


            
        });
        $('.noagree').on('click',function(){  //拒绝会员申请
            var _id=$(this).attr('_id');

            comment.alert('确定拒绝合伙人申请？');
            $('.alert-bt-1').on('click',function(){
                comment.listAjax(urlList+'/noagreeIntermediary',{_id:_id},function(data){
                    alert('合伙人申请拒绝成功')
                    intermediary.searchIntermediaryList(); //展示合伙人列表
                })
            });
           
        });
        $('.look').on('click',function(){  //点击查看详情
            $('.lookInfo').css({
                display:'block'
            });
            var _id=$(this).attr('_id');
            comment.listAjax(urlList+'/searchOneIntermediary',{_id:_id},function(data){
                console.log(data);
                var item=data[0].list[0]
                $('.infoname').text(item.intermediary_name); //姓名
                $('.infoid').text(item.intermediary_id); //身份证号码
                $('.infoweixin').text(item.intermediary_weixin); //微信
                $('.infoyhk').text(item.intermediary_account_name); //返款渠道
                $('.infozffs').text(item.intermediary_account); //返款账号
                if(data[0].isIntermediary == 0){
                    $('.infostatus').text('未申请合伙人'); //合伙人状态
                }else if(data[0].isIntermediary == 1){
                    $('.infostatus').text('合伙人申请中'); //合伙人状态
                }else if(data[0].isIntermediary == 2){
                    $('.infostatus').text('已是合伙人'); //合伙人状态
                }else if(data[0].isIntermediary == 3){
                    $('.infostatus').text('合伙人申请被拒绝'); //合伙人状态
                }
                
                $('.infozyj').text(item.invitation_total); //会员总业绩
                $('.infozyjye').text(item.invitation_balance); //会员总业绩余额
                $('.infogrsr').text(item.invitation_income); //个人收入
                $('.infoyqm').text(item.invitation_code); //邀请码
            })
        });

        $('.updata').on('click',function(){  //合伙人信息编辑
            $('.updataInfo').css({
                display:'block'
            });
            var _id=$(this).attr('_id');
            var _uid=$(this).attr('_uid');
            comment.listAjax(urlList+'/searchOneIntermediary',{_id:_uid},function(data){
                console.log(data);
                var item=data[0].list[0]
                $('.updataname').val(item.intermediary_name);//姓名
                $('.updataid').val(item.intermediary_id);//身份证
                $('.updataweixin').val(item.intermediary_weixin);//微信
                $('.updatafkqd').val(item.intermediary_account_name);//返款渠道
                $('.updatafkzh').val(item.intermediary_account);//返款账户
            })


            
            $('.updatabt').on('click',function(){  //点击用户编辑按钮
                comment.alert('确定更新吗');
                $('.alert-bt-1').on('click',function(){
                    comment.listAjax(urlList+'/updataIntermediary',intermediary.getUpdata(_id),function(data){
                        $('.alert').css({
                            display:'none'
                        })
                        alert('更新成功');
                        intermediary.searchIntermediaryList(); //展示合伙人列表
                        $('.updataInfo').css({
                            display:'none'
                        });
                    })
                })
            });

            
            
        });
        $('.delete').on('click',function(){  //删除合伙人
            comment.alert('确定删除合伙人？');
            var _id=$(this).attr('_id');
            var _uid=$(this).attr('_uid');
            $('.alert-bt-1').on('click',function(){
                comment.listAjax(urlList+'/deleteIntermediary',{_id:_id,_uid:_uid},function(data){
                    $('.alert').css({
                        display:'none'
                    })
                    alert('删除成功');
                    intermediary.searchIntermediaryList(); //展示合伙人列表
                })
            })
        })

    },
    getUpdata:function(_id){  //获取数据更新参数
        return{
            _id:_id,
            name:$('.updataname').val(),//姓名
            sfz:$('.updataid').val(),//身份证
            weixin:$('.updataweixin').val(),//微信
            fkfs:$('.updatafkqd').val(),//返款方式
            skzh:$('.updatafkzh').val() //返款账户
        }
    }
}