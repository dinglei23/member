   user={
        addUser:function(){ //点击添加用户           
            $('.add-bt').on('click',function(){
                comment.listAjax('http://localhost:3000/addUser',user.addUserData(),function(data){
                    console.log(data,123)
                    if(data.status == 'success'){
                        alert('用户添加成功');
                        $('.addInfo').css({
                            display:'none'
                        });
                        user.searchUserList();//请求用户列表数据
                    }else if(data.status == '0'){
                        alert('该用户已经存在')
                    }
                })
            })
        },
        addUserData:function(){ //获取注册用户的参数
            var username=$('.addInfo-yhm').val();//获取用户名
            var pw=$('.addInfo-mm').val();//获取密码
            var weixin=$('.addInfo-wx').val();//获取微信号
            // var sex=$('input:radio:checked').val();//获取性别
            return {
                username:username,
                password:pw,
                weixin:weixin
            }
        },
        searchUserList:function(){  //请求用户接口
            $('.contain-right-list').empty();
            comment.listAjax('http://localhost:3000/searchUser',{},function(data){
                    user.searchUserListShow(data)
                })
        },
        searchUserListShow:function(result){//请求用户接口渲染到页面
            $.each(result,function(index,item){
                var str='';
                str+='<ul uid="'+item._id+'">';
                str+='<li class="contain-right-title-1">'+(index+1)+'</li>';
                str+='<li class="contain-right-title-3">'+item.username+'</li>';
                str+='<li class="contain-right-title-4">'+item.password+'</li>';
                if(item.idMember == 0){
                    str+='<li class="contain-right-title-5">未注册会员</li>';
                }else if(item.idMember == 1){
                    str+='<li class="contain-right-title-5">会员申请中</li>';
                }else if(item.idMember == 2){
                    str+='<li class="contain-right-title-5">已是会员</li>';
                }else if(item.idMember == 3){
                    str+='<li class="contain-right-title-5">会员申请被拒绝</li>';
                }

                if(item.isIntermediary == 0){
                    str+='<li class="contain-right-title-9">未注册合伙人</li>';
                }else if(item.isIntermediary == 1){
                    str+='<li class="contain-right-title-9">合伙人申请中</li>';
                }else if(item.isIntermediary == 2){
                    str+='<li class="contain-right-title-9">已是合伙人</li>';
                }else if(item.isIntermediary == 3){
                    str+='<li class="contain-right-title-9">合伙人申请被拒绝</li>';
                }
                
                str+='<li class="contain-right-title-6">'+item.weixin+'</li>';
                str+='<li class="contain-right-title-7">'+item.register_time+'</li>';
                str+='<li class="contain-right-title-8"><button class="updata" uid="'+item._id+'" result='+JSON.stringify(item)+'>编辑</button><button class="delete" uid="'+item._id+'">删除</button></li>';
                str+='</ul>';
                $('.contain-right-list').prepend(str);
            });
            $('.updata').on('click',function(){  //打开用户编辑弹框
                $('.updataInfo').css({
                    display:'block'
                });
                var result=JSON.parse($(this).attr('result'))
                $('.updataInfo-yhm').val(result.username);
                $('.updataInfo-mm').val(result.password);
                $('.updataInfo-wx').val(result.weixin)
                var _id=$(this).attr('uid');
                $('.undataUser').unbind('click').on('click',function(){  //点击请求更新用户接口
                    comment.listAjax('http://localhost:3000/updataUser',user.updataData(_id),function(data){
                        console.log(data)
                        if(data.status == 'success'){
                            alert('更改成功')
                            $('.updataInfo').css({
                                display:'none'
                            });
                            user.searchUserList();//请求用户列表数据
                        }else if(data.status == '1'){
                            alert('该用户已存在，换一个用户名！')
                        }
                    })
                });
                
            });
            $('.delete').on('click',function(){ //点击删除用户
                var _id=$(this).attr('uid');
                comment.alert('确定删除用户吗');
                $('.alert-bt-1').on('click',function(){
                    comment.listAjax('http://localhost:3000/deleteUser',{_id:_id},function(data){
                    console.log(data)
                    if(data.status == 'success'){
                        $('.alert').remove();
                        user.searchUserList();//请求用户列表数据
                    }
                })
                })
                
                
            })
        },
        updataData:function(_id){  //数据更新参数
            var username=$('.updataInfo-yhm').val();//获取用户名
            var pw=$('.updataInfo-mm').val();//获取密码
            var weixin=$('.updataInfo-wx').val();//获取微信号
            // var sex=$('input:radio:checked').val();//获取性别
            return {
                username:username,
                password:pw,
                weixin:weixin,
                _id:_id
            }
        },
        deleteUser:function(){ //删除用户

        }
    }
