   comment={
        scrollWidth:function(ele1,ele2){ //计算滚动条宽度
            var scrollWidth=$(ele1)[0].offsetWidth-$(ele1)[0].scrollWidth;
            $(ele2).css({
                paddingRight:scrollWidth+'px'
            })
        },
        openIndexAdd:function(){ //打开首页增加用户弹框
            $('.addInfo').css({
                display:'block'
            })
        },
        closeIndexAdd:function(){ //关闭首页增加用户弹框
            $('.addInfo').css({
                display:'none'
            })
        },
        openAddMender:function(){ //打开添加会员弹框
            $('.addInfo').css({
                display:'block'
            })
        },
        closeAddMember:function(){ //关闭添加会员弹框
            $('.addInfo').css({
                display:'none'
            })
        },
        closeLookInfo:function(){ //关闭查看详情
            $('.lookInfo').css({
                display:'none'
            })
        },
        openLookInfo:function(){  //打开查看详情
            $('.lookInfo').css({
                display:'block'
            })
        },
        closeUpdataInfo:function(){  //关闭编辑弹框
            $('.updataInfo').css({
                display:'none'
            })
        },
        openUpdataInfo:function(){  //打开编辑弹框
            $('.updataInfo').css({
                display:'block'
            })
        },
        closeAddInfo:function(){  //关闭添加合伙人弹框
            $('.addInfo').css({
                display:'none'
            })
        },
        listAjax:function(url,data,fn){  //查询列表数据调研
            //url请求地址
            //请求参数
            //fn请求成功回调函数
            $.ajax({
                url:url,
                data:data,
                error:function(){
                    alert('查询失败');
                },
                success:function(data){
                    fn(data)
                }
            })
        },
        alert:function(text){ //弹框
            var str='';
            str+='<div class="alert">';
            str+='<div class="alert-box">';
            str+='<div class="alert-box-contain">';
            str+='<h2>提示框<span class="alert-close"></span></h2>';
            str+='<div class="isdelete">';
            str+=''+text+'';
            str+='</div>';
            str+='<div class="alert-bt">';
            str+='<button class="alert-bt-1">确定</button>';
            str+='<button class="alert-bt-2">取消</button>';
            str+='</div>';
            str+='</div>';
            str+='</div>';
            str+='</div>';
            $('.contain-right').append(str);
            $('.alert-close,.alert-bt-2').on('click',function(){
                $('.alert').remove();
            })
        }
    }