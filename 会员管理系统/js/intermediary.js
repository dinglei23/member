intermediary={
    addIntermediary:function(){  //添加合伙人
        $('.addIntermediary').on('click',function(){
            comment.listAjax('http://localhost:3000/addIntermediary',intermediary.addIntermediaryData(),function(data){
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
        comment.listAjax('http://localhost:3000/searchIntermediary',{},function(data){
            console.log(data)
            intermediary.searchIntermediaryListShow(data)
            })
    },
    searchIntermediaryListShow:function(result){
        $.each(result,function(index,item){
            var str='';
            str+='<ul>';
            str+='<li class="contain-right-title-1">1</li>';
            str+='<li class="contain-right-title-3">丁磊</li>';
            str+='<li class="contain-right-title-4">137380018</li>';
            str+='<li class="contain-right-title-5">100</li>';
            str+='<li class="contain-right-title-6">15458</li>';
            str+='<li class="contain-right-title-7">5000</li>';
            str+='<li class="contain-right-title-8">5687</li>';
            str+='<li class="contain-right-title-9">5000</li>';
            str+='<li class="contain-right-title-10">2018-09-19 12:12:12</li>';
            str+='<li class="contain-right-title-11">';
            str+='<button class="look" onclick="comment.openLookInfo()">点击查看</button>';
            str+='</li>';
            str+='<li class="contain-right-title-12">';
            str+='<button class="updata" onclick="comment.openUpdataInfo()">编辑</button>';
            str+='<button class="delete">删除</button>';
            str+='</li>';
            str+='</ul> ';
            $('.contain-right-list').prepend(str);
        })
    }
}