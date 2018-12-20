if(!window.sessionStorage && /MSIE/.test(navigator.userAgent)){
    var hospitalId = storage.getItem("hospitalId")
    var username = storage.getItem("username")
    if(!username || !hospitalId){
        window.location.href = "login.html"
    }
}else{
    var hospitalId= sessionStorage.getItem("hospitalId");
    var username = sessionStorage.getItem('username');
    if(!username || !hospitalId){
        window.location.href = "login.html"
    }
}

   var baseUrl = 'http://www.51edoctor.cn/';
  // var baseUrl = 'http://192.168.1.51:8333/';
    
function showMes(){
  
    laydate.render({
      elem: '#offworkTime',
      type: 'time',
      min:'12:00:00',
      max:'23:59:00'
    });
    laydate.render({
      elem: '#beginWorkTime',
      type: 'time',
      min:'00:00:00',
      max:'12:00:00'
    });
    laydate.render({
      elem: '#morningWorkTime',
      type: 'time',
      min:'00:00:00',
      max:'12:00:00'
    });

    $.ajax({
        type: "post",
        url: baseUrl+"eht/admin/Information/selectById",
        data: {hospitalId:hospitalId},
        dataType: "json",
        success: function(data){
            // console.log(data);
//            医院图片
            var imgList='';
            if(data[0].hospitalImage==""||data[0].hospitalImage==" "){
                imgList="";
            }else{
                var commentImage =data[0].hospitalImage.split(",");
                // console.log(commentImage)
                for(var i=0;i<commentImage.length;i++){
                    imgList+='<div class="img_act f_l"><input class="img_way" type="hidden" value="'+commentImage[i]+'"/><img class="img_pic" src="/E2306'+commentImage[i]+'" alt=""/><img class="pic_del" src="images/shanchu.png" onclick="delimg(this)" alt="" style="width:20px;height:20px"/></div>';
                }
                // console.log(imgList)
            }
//            医院logo
            var logo='';
            if(data[0].hospitalLOGO==""||data[0].hospitalLOGO==" "){
                logo="";
            }else{
                var logo='<div class="img_act f_l"><input type="hidden" value="'+data[0].hospitalLOGO+'"/><img class="img_pic" src="/E2306'+data[0].hospitalLOGO+'" alt=""><img onclick="delimg(this)" class="pic_del" src="images/shanchu.png" alt="" style="width:20px;height:20px"></div>';
            }
            var imgBack="";
            if(data[0].backgroundImage==""||data[0].backgroundImage==" "){
                imgBack = "";
            }else{
                imgBack = '<div class="img_act f_l"><input type="hidden" value="'+data[0].backgroundImage+'"/><img class="img_pic" src="/E2306'+data[0].backgroundImage+'" alt=""><img onclick="delimg(this)" class="pic_del" src="images/shanchu.png" alt="" style="width:20px;height:20px"></div>'
            }

            $(".latitude").val(data[0].latitude);
            $("#hos_send").val(data[0].hospitalReferred);
            $("#hos_grade").val(data[0].hospitalGrade);
            $(".hos_pep").val(data[0].contact);
            $(".longitude").val(data[0].longitude);
            $(".img_back").html(imgBack);
            $(".img_logo").html(logo);
            $("#offworkTime").val(data[0].offWorkTime)
            $(".img_list").html(imgList);
            $("#morningWorkTime").val(data[0].morningWorkTime)
            $("#beginWorkTime").val(data[0].beginWorkTime)
            $("#hos_all").val(data[0].hospitalName);
            $("#hos_lit").val(data[0].abbreviation);
            $("#hos_leve").val(data[0].hospitalLevel);
            $("#introduce").val(data[0].introduce);
            $("#hos_natu").val(data[0].hospitalNature);
            $("#address").val(data[0].hospitalAddress);
            $(".hos_tel").val(data[0].hospitalTel);
            $('.img_back .img_pic').css("margin-left","20px")
            var code=data[0].city;
            var province=data[0].province;
            queryCtiy(province,"root",3);//省
            queryCtiy(code,province,2);//市
            queryCtiy(data[0].country,code,1);//县/区
             if($('.img_list .img_act').length==5){
                 $('.hos_img .img_5hid').hide();
             }
             if($('.img_logo .img_act').length==1){
                 $('.hos_img .img_hid').hide();
             }
             if($('.img_back .img_act').length==1){
                $('.hos_img .img_backHid').hide();
             }
        }
    });
}



function queryCtiy(code,province,type){
    $.ajax({
        type:"post",
        url:baseUrl+"eht/admin/Information/queryParent",
        data: {province:province,type:type},
        dataType: "json",
        success: function(data){
            if(data[data.length-1] == "1"){
                document.getElementById("country").options.length=0;
                for(var i = 0 ; i < data.length-1;i++){
                    html='<option value="'+data[i].code+'">'+data[i].name+'</option>';
                    if(code ==data[i].code ){
                        html='<option value="'+data[i].code+'" selected="selected">'+data[i].name+'</option>';
                    }
                    $("#country").append(html);
                }
            }
            if(data[data.length-1] == "2"){
                document.getElementById("city").options.length=0;
                for(var i = 0 ; i < data.length-1;i++){
                    html='<option value="'+data[i].code+'">'+data[i].name+'</option>';
                    if(code ==data[i].code ){
                        html='<option value="'+data[i].code+'" selected="selected">'+data[i].name+'</option>';
                    }
                    $("#city").append(html);
                }
            }
            if(data[data.length-1] == "3"){
                document.getElementById("provice").options.length=0;
                for(var i = 0 ; i < data.length-1;i++){
                    html='<option value="'+data[i].code+'">'+data[i].name+'</option>';
                    if(code ==data[i].code ){
                        html='<option value="'+data[i].code+'" selected="selected">'+data[i].name+'</option>';
                    }
                    $("#provice").append(html);
                }
            }
        }
    });

}

function dicussImg(){
    if($('.img_list .img_act').length==5){
         $('.hos_img .img_5hid').hide();
        $('.smallMask').show();
        $('.smallBox').show();
        
        $(".small_text").html("最多只能上传5张图片");
        $(".btn_return").hide();
        $(".btn_sure").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
            $('.hos_img .img_5hid').hide();
        })
        return false;
    }
    var obj=document.getElementsByClassName('file_allow')[0];
    //上传了文件
    if (obj.value) {
        //获取文件对象
        var image = obj.files[0];
        //获取文件名
        var name = image.name;
        //文件的大小单位为B
        var size = image.size;
        // console.log(size);
        // console.log(image.width);
        // console.log(image.height);
        //截取出文件后缀
        var suffix = name.substring(name.indexOf("."));
        //图片匹配正则表达式
        var reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
        //如果不是图片
        if (!reg.test(suffix)) {
            // $('.cateWarning').html("<font style='color:red;font-weight:border;font-size:12px;'>请上传符合格式的图片</font>");
            //清空上传文件框
            
            $(obj)[0].outerHTML = $(obj)[0].outerHTML;
            // console.log(obj.value);
            return false;
        }
        if (size > 3072000) {
            // $('.cateWarning').html("<font style='color:red;font-weight:border;font-size:12px;'>请上传小于3m的图片</font>");
            //清空上传文件框
            $(obj)[0].outerHTML = $(obj)[0].outerHTML;
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("上传图片不能超过3M");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
//            hospitalFlag = false;
            return false;
        }
//        hospitalFlag = true;
        dicussFiles(obj);
    } else {
        return false;
    }
}
if($('.img_list .img_act').length==5){
     $('.hos_img .img_5hid').hide();
}


function dicussFiles(obj) {
    var fileObj = obj.files[0]; // 获取文件对象
    var reader = new FileReader(); // Browser API :http://caniuse.com/#search=FileReader
    reader.onload = function(theFile) {
        var image = new Image();
        image.src = this.result;
        dicussUpload(fileObj);
        // };
    }
    reader.onerror = function(stuff) {
        console.log("error", stuff);
        console.log(stuff.getMessage());
    }
    reader.readAsDataURL(fileObj);
}
function dicussUpload(fileObj) {
    // 接收上传文件的后台地址
    var FileController = "http://www.51edoctor.cn/eht/admin/Information/upload?uploadType=img"; // FormData 对象
    var form = new FormData();
    // console.log(form)
    //form.append("author", "hooyes");                        // 可以增加表单数据
    form.append("file", fileObj); // 文件对象
    // console.log(form)
    // XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();
    xhr.open("post", FileController, true);
    xhr.onload = function(data) {
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("图片正在上传中，请稍等...");
        $(".btn_return").hide();
        $(".btn_sure").hide();
        var json = xhr.responseText;
        var obj = $.parseJSON(json);
        var abox='<div class="img_act f_l"><input class="img_way" type="hidden" value="'+obj.imagePath+'"/><img class="img_pic" src="/E2306'+obj.imagePath+'" alt=""/><img class="pic_del" src="images/shanchu.png" onclick="delimg(this)" alt="" style="width:20px;height:20px"/></div>';
        $('.img_list').append(abox);
        // $('.img_5hid').hide();
        if($('.img_list .img_act').length==5){
             $('.hos_img .img_5hid').hide();
        }
        $('.smallMask').hide();
        $('.smallBox').hide();
        $(".btn_sure").show();
    };
    xhr.send(form);    
}

function dicussLogo(){
        // alert('logo');
       if($('.img_logo .img_act').length==1){
           $('.smallMask').show();
           $('.smallBox').show();
           $(".small_text").html("只能上传1张图片");
           $(".btn_return").hide();
           $('.hos_img .img_hid').hide();
           $(".btn_sure").click(function () {
               $('.smallMask').hide();
               $('.smallBox').hide();
               $('.hos_img .img_hid').hide();
           })
           return false;
       }
    var obj=document.getElementsByClassName('file_logo')[0];
    //上传了文件
    if (obj.value) {
        //获取文件对象
        var image = obj.files[0];
        //获取文件名
        var name = image.name;
        //文件的大小单位为B
        var size = image.size;
        // console.log(size);
        // console.log(image.width);
        // console.log(image.height);
        //截取出文件后缀
        var suffix = name.substring(name.indexOf("."));
        //图片匹配正则表达式
        var reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
        //如果不是图片
        if (!reg.test(suffix)) {
           //  $('.cateWarning').html("<font style='color:red;font-weight:border;font-size:12px;'>请上传符合格式的图片</font>");
            //清空上传文件框
            // $('.hos_img .img_hid').hide();
            $(obj)[0].outerHTML = $(obj)[0].outerHTML;
            // console.log(obj.value);
            return false;
        }
        if (size > 3072000) {
            // $('.cateWarning').html("<font style='color:red;font-weight:border;font-size:12px;'>请上传小于2m的图片</font>");
            //清空上传文件框
            $(obj)[0].outerHTML = $(obj)[0].outerHTML;
//            hospitalFlag = false;
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("上传图片不能超过3M");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
            return false;
        }
//        hospitalFlag = true;
        logoFiles(obj);
    } else {
        return false;
    }
}

// function imgehid(imgurl) {  
//     var ImgObj = new Image(); 
//     ImgObj.src = imgurl;  
//     if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
//        $(".img_file").hidden();
//     }
// }

function logoFiles(obj) {
    var fileObj = obj.files[0]; // 获取文件对象
    var reader = new FileReader(); // Browser API :http://caniuse.com/#search=FileReader
    reader.onload = function(theFile) {
        var image = new Image();
//        获取图片流
//        var x=this.result;
//        获取图片名称
//        var name=fileObj.name;
        image.src = this.result;

//        var text=upImg(name,x);
//        var abox='<div class="img_act f_l"><input class="img_way" type="hidden" value="'+text+'"/><img class="img_pic" src="'+x+'" alt=""/><img class="pic_del" src="images/shanchu.png" onclick="delimg(this)" alt=""/></div>';
//        $('.img_list').append(abox);
        // 现在图片宽高
        /*if (image.width > 600 || image.height > 600) {
         alert('长宽都不能超过600px');
         } else {*/
        logoUpload(fileObj);
        // };
    }
    reader.onerror = function(stuff) {
        console.log("error", stuff);
        console.log(stuff.getMessage());
    }
    reader.readAsDataURL(fileObj);
}

function logoUpload(fileObj) {

    var FileController = "http://www.51edoctor.cn/eht/admin/Information/upload?uploadType=LOGO"; // FormData 对象
    var form = new FormData();
    //form.append("author", "hooyes");                        // 可以增加表单数据
    form.append("file", fileObj); // 文件对象
    // XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();
    xhr.open("post", FileController, true);
    xhr.onload = function(data) {
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("图片正在上传中，请稍等...");
        $(".btn_return").hide();
        $(".btn_sure").hide();
        var json = xhr.responseText;
        var obj = $.parseJSON(json);
        var abox='<div class="img_act f_l"><input type="hidden" value="'+obj.imagePath+'"/><img class="img_pic" src="/E2306'+obj.imagePath+'" alt=""><img onclick="delimg(this)" class="pic_del" src="images/shanchu.png" alt="" style="width:20px;height:20px"></div>';
        $('.img_logo').append(abox);
        $('.img_hid').hide();
        $('.smallMask').hide();
        $('.smallBox').hide();
        $(".btn_sure").show();
    };
    xhr.send(form);
}

//

function dicussBack(){
       if($('.img_back .img_act').length==1){
           $('.smallMask').show();
           $('.smallBox').show();
           $(".small_text").html("只能上传1张图片");
           $(".btn_return").hide();
           $(".btn_sure").click(function () {
               $('.smallMask').hide();
               $('.smallBox').hide();
               $('.hos_img .img_backHid').hide();
           })
           return false;
       }
    var obj=document.getElementsByClassName('file_back')[0];
    //上传了文件
    if (obj.value) {
        //获取文件对象
        var image = obj.files[0];
        //获取文件名
        var name = image.name;
        //文件的大小单位为B
        var size = image.size;
        // console.log(size);
        // console.log(image.width);
        // console.log(image.height);
        //截取出文件后缀
        var suffix = name.substring(name.indexOf("."));
        //图片匹配正则表达式
        var reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
        //如果不是图片
        if (!reg.test(suffix)) {
           //  $('.cateWarning').html("<font style='color:red;font-weight:border;font-size:12px;'>请上传符合格式的图片</font>");
            //清空上传文件框
            // $('.hos_img .img_back').hide();
            $(obj)[0].outerHTML = $(obj)[0].outerHTML;
            console.log(obj.value);
            return false;
        }
        if (size > 3072000) {
            // $('.cateWarning').html("<font style='color:red;font-weight:border;font-size:12px;'>请上传小于2m的图片</font>");
 
            $(obj)[0].outerHTML = $(obj)[0].outerHTML;
//            hospitalFlag = false;
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("上传图片不能超过3M");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
            return false;
        }
//        hospitalFlag = true;
        backFiles(obj);
    } else {
        return false;
    }
}

// function imgehid(imgurl) {  
//     var ImgObj = new Image(); 
//     ImgObj.src = imgurl;  
//     if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
//        $(".img_file").hidden();
//     }
// }

function backFiles(obj) {
    var fileObj = obj.files[0]; // 
    var reader = new FileReader(); //
    reader.onload = function(theFile) {
        var image = new Image();

        image.src = this.result;

//        var text=upImg(name,x);
//        var abox='<div class="img_act f_l"><input class="img_way" type="hidden" value="'+text+'"/><img class="img_pic" src="'+x+'" alt=""/><img class="pic_del" src="images/shanchu.png" onclick="delimg(this)" alt=""/></div>';
//        $('.img_list').append(abox);
        // 现在图片宽高
        /*if (image.width > 600 || image.height > 600) {
         alert('长宽都不能超过600px');
         } else {*/
        backUpload(fileObj);
        // };
    }
    reader.onerror = function(stuff) {
        console.log("error", stuff);
        console.log(stuff.getMessage());
    }
    reader.readAsDataURL(fileObj);
}

function backUpload(fileObj) {

    var FileController = "http://www.51edoctor.cn/eht/admin/Information/upload?uploadType=background"; // F
    var form = new FormData();
    //form.append("author", "hooyes");                       
    form.append("file", fileObj); // 文

    var xhr = new XMLHttpRequest();
    xhr.open("post", FileController, true);
    xhr.onload = function(data) {
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("图片正在上传中，请稍等...");
        $(".btn_return").hide();
        $(".btn_sure").hide();
        var json = xhr.responseText;
        var obj = $.parseJSON(json);
        var abox='<div class="img_act f_l"><input type="hidden" value="'+obj.imagePath+'"/><img class="img_pic" src="/E2306'+obj.imagePath+'" alt=""><img onclick="delimg(this)" class="pic_del" src="images/shanchu.png" alt="" style="width:20px;height:20px"></div>';
        $('.img_back').append(abox);
        $('.img_backHid').hide();
        $('.smallMask').hide();
        $('.smallBox').hide();
        $(".btn_sure").show();
    };
    xhr.send(form);
}



var filePath=[];

function delimg(e) {
    // $('.hos_img .img_hid').show();
    $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html("确认删除?");
    $(".btn_return").show();
    $(".btn_sure").click(function () {
        filePath.push($(e).siblings("input").val());
        $(e).parent().remove();
        $('.smallMask').hide();
        $('.smallBox').hide();
      //  $('.hos_img .img_hid').show();
      //  $('.hos_img .img_5hid').show();
      //  $('.hos_img .img_backHid').show();
      if($('.img_list .img_act').length<5){
        $('.hos_img .img_5hid').show();
      }
      if($('.img_logo .img_act').length<1){
        $('.hos_img .img_hid').show();
      }
      if($('.img_back .img_act').length<1){
        $('.hos_img .img_backHid').show();
      }
    })
}

//复制功能
function copyUrl2(){
    var address=$("#provice option:selected").text()+$("#city option:selected").text()+$("#country option:selected").text()+$("#address").val();
    $("#copyName").val(address);
    var e=document.getElementById("copyName");//对象是contents
    e.select(); //选择对象
    document.execCommand("Copy"); //执行浏览器复制命令
    // $('.smallMask').show();
    // $('.smallBox').show();
   // $(".small_text").html("复制成功");
    // $(".btn_return").hide();
    // $(".btn_sure").click(function () {
    //     $('.smallMask').hide();
    //     $('.smallBox').hide();
    // })
}



function dutyList() {
    $.ajax({
        url:baseUrl+'eht/admin/scheduling/getSubByname',
       //  url:'http://192.168.1.51:8333/eht/admin/scheduling/getSubByname',
        type:'post',
        data:{
            hospitalId:sessionStorage.getItem("hospitalId"),     
            name:'',
            type:2,
            parentcode:''
        },
        success: function (data) {
            // console.log(data);
            //type=2显示一级科室 
            var html='';
            // var firstSubLists = data.firstSubList;
            // for(var i=0;i<firstSubLists.length;i++){
            //     html+='<div class="list_name f_l"><input class="duty_id" type="hidden" value="'+firstSubLists[i].firstSubId+'"/><span>'+firstSubLists[i].firstSubName+'</span></div>'
            // }
            for(var i=0;i<data.length;i++){
                html+='<div class="list_name"><input class="duty_id" type="hidden" value="'+data[i].id+'"/><span code='+data[i].code+'>'+data[i].name+'</span></div>'
            //       html+='<div class="list_name f_l"><input class="duty_id" type="hidden" value="'+data[i].id+'"/><span code='+data[i].code+'>'+data[i].name+'</span></div>'
            // }
            }
            $(".list_main").html(html);
        }

    });
    $.ajax({
         url:baseUrl+'eht/admin/scheduling/getSubByname',
         //url:'http://192.168.1.51:8333/eht/admin/scheduling/getSubByname',
        type:'post',
        data:{
            hospitalId:sessionStorage.getItem("hospitalId"),     
            name:'',
            type:1,
            parentcode:''
        },
        success: function (data) {
           // console.log(data);
            //type=1显示科室 
              var next='';
            // var hospitalDeparts = data.hospitalDepartment;
            for(var j=0;j<data.length;j++){
                next+='<div class="list_choose f_l"><input class="duty_id" type="hidden" value="'+data[j].departmentId+'"/><span>'+data[j].subjectName+'</span><img class="del_img" src="images/shanchu.png" onclick="delDuty(this)" alt=""/></div>'
            }
            $(".sure_box").html(next);
             $(".sure_div").append('<div class="addSub_box"><div></div></div>');
              $('.addSub_box').mouseover(function(){
              //  alert('mouseover');
                $(this).attr('title','点击加号可添加自定义科室');
            });
              $('.addSub_box').click(function(){
                add_subject();
            });
        //    clickHas();
        //    clickNon();
           clickDuty();
           
        }

    })
     

}

function clickHas(ele){
        if(ele.hasClass('list_name')){
            // alert('has list')
             ele.removeClass("list_name").addClass("list_choose");
        }
        // else{
        //      ele.removeClass("list_choose").addClass("list_name");
        // }

}
// function clickNon(ele){
//     // $(".list_choose").click(function () {
//         if(ele.hasClass('list_choose')){
//             alert('has choose')
//               ele.removeClass("list_choose").addClass("list_name");
//         }
// }

function clickDuty() {
     // $('.list_main .list_name').click(function(){
        $(".list_main").on('click','.list_name',function () {
                 $(this).addClass('list_choose').siblings().removeClass('list_choose');
                 $(".check_input").prop("checked",false)
                var id=$(this).find(".duty_id").val();
                var name=$(this).find("span").text();
                var code = $(this).find("span").attr('code');
                if($(this).parent().hasClass('list_main')){
                     $.ajax({
                         //url:'http://www.51edoctor.cn/eht/admin/Information/queryDepartment',
                        url:baseUrl+'eht/admin/scheduling/getSubByname',
                        type:'post',
                        data:{
                               hospitalId:sessionStorage.getItem("hospitalId"),     
                                name:'',
                                type:3,
                                parentcode:code
                            },
                        success:function(data){
                            // console.log(data)
                                var html = '';
                             for(var i=0;i<data.length;i++){
                                html+='<div class="list_name f_l"><input class="duty_id" type="hidden" value="'+data[i].id+'"/><span>'+data[i].name+'</span></div>'
                             }
                                $('.secondSubList_main').html(html);
                                      //  clickDuty();
                                      clickSecondDuty();
                                      if($('.secondSubList_main .list_name')){
                                            for(var i = 0;i<$(".sure_box .list_choose").length;i++){
                                                for(var j = 0;j<$(".secondSubList_main .list_name").length;j++){
                                                    if($(".secondSubList_main .list_name:eq("+j+") span").html()==$(".sure_box .list_choose:eq("+i+") span").html()){
                                                         $(".secondSubList_main .list_name:eq("+j+")").removeClass("list_name").addClass("list_choose")
                                                    }
                                                }
                                            }
                                        }
                        }
                    });
                     
                    
                }
                // for(var i=0;i<$(".sure_div>.list_choose").length;i++){
                //     if(name==$(".sure_div>.list_choose").eq(i).find("span").text()){
                //         $('.smallMask').show();
                //         $('.smallBox').show();
                //         $(".small_text").html("该科室已选择，请勿重复勾选");
                //         $(".btn_return").hide();
                //         $(".btn_sure").click(function () {
                //             $('.smallMask').hide();
                //             $('.smallBox').hide();
                //         })
                //         return;
                //     }
                // }
                // var html='<div class="list_choose f_l"><input class="duty_id" type="hidden" value="'+id+'"/><span>'+name+'</span><img class="del_img" src="images/shanchu.png" onclick="delDuty(this)" alt=""/></div>';
                // $(".sure_div").append(html);
            })
}
function delDuty(e){
    $(e).parent().remove();
    for(var j = 0;j<$(".secondSubList_main .list_choose").length;j++){
        if($(e).siblings("span").html()==$(".secondSubList_main .list_choose:eq("+j+") span").html()){
             $(".secondSubList_main .list_choose:eq("+j+")").removeClass("list_choose").addClass("list_name")
            
        }
    }
}

function clickSecondDuty(){
   // alert('clcik 222');
    $('.secondSubList_main .list_name').click(function(){
      //  alert($(this).find("span").text())
         clickHas($(this));
            var id=$(this).find(".duty_id").val();
            var name=$(this).find("span").text();
            // console.log(id)
        for(var i=0;i<$(".sure_box>.list_choose").length;i++){
                if(name==$(".sure_box>.list_choose").eq(i).find("span").text()){
                    $('.smallBox').css('height','150px');
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $('.small_textInput').hide();
                    $(".btn_sure").show();
                    $(".small_text").html("该科室已选择，请勿重复勾选");
                    $(".btn_return").hide();
                    $(".btn_subsure").hide();
                    $(".btn_sure").click(function () {
                        $('.smallMask').hide();
                        $('.smallBox').hide();
                    })
                    return false;
                }
            }
            var html='<div class="list_choose f_l"><input class="duty_id" type="hidden" value="'+id+'"/><span>'+name+'</span><img class="del_img" src="images/shanchu.png" onclick="delDuty(this)" alt=""/></div>';
            // console.log(html)
            $(".sure_box").append(html);
        });

    $('.secondSubList_main .list_choose').click(function(){
      //  alert($(this).find("span").text())
         clickHas($(this));
            var id=$(this).find(".duty_id").val();
            var name=$(this).find("span").text();
            // console.log(id)
        for(var i=0;i<$(".sure_box>.list_choose").length;i++){
                if(name==$(".sure_box>.list_choose").eq(i).find("span").text()){
                    $('.smallBox').css('height','150px');
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $('.small_textInput').hide();
                    $(".btn_sure").show();
                    $(".small_text").html("该科室已选择，请勿重复勾选");
                    $(".btn_return").hide();
                    $(".btn_subsure").hide();
                    $(".btn_sure").click(function () {
                        $('.smallMask').hide();
                        $('.smallBox').hide();
                    })
                    return false;
                }
            }
            var html='<div class="list_choose f_l"><input class="duty_id" type="hidden" value="'+id+'"/><span>'+name+'</span><img class="del_img" src="images/shanchu.png" onclick="delDuty(this)" alt=""/></div>';
            // console.log(html)
            $(".sure_box").append(html);
        });
};

// function delDuty(e){
//     $(e).parent().remove();
//     for(var j = 0;j<$(".secondSubList_main .list_choose").length;j++){
//         if($(e).siblings("span").html()==$(".secondSubList_main .list_choose:eq("+j+") span").html()){
//              $(".secondSubList_main .list_choose:eq("+j+")").removeClass("list_choose").addClass("list_name")
            
//         }
//     }
// }

function querySubjectsInput(){
    $('#duty_list').keyup(function(){
        if(!$('#duty_list').val() || $('#duty_list').val() !=='' || $('#duty_list').val() ==' '){
              $('.secondSubList_main').empty();
              $('.check_input').attr('checked',false)
        }
         querySubjects();
         renderList();
    });
};


function querySubjects(){
    $.ajax({
     url:baseUrl+'eht/admin/scheduling/getSubByname',
      //  url:'http://192.168.1.51:8333/eht/admin/scheduling/getSubByname',
        type:'post',
        data:{
            // hospitalId:sessionStorage.getItem("hospitalId"),   
           hospitalId:'',    
            name:$('#duty_list').val(),
            type:4,
            //parentcode:''

        },
        success:function(data){
             if(data == [] || data.length == 0 ){
                    return false;
                 }
            var list = '';
              for(var i=0;i<data.length;i++){
                 list += '<li>'+data[i].name+'</li>';
            }

            // $('.list_top .subject_list').slideDown();
            //  if($('.list_top .subject_list').height()>=320){
            //     alert('高度超过了');
            //     $('.list_top .subject_list').css('overflow-y','auto');
            // }
            $('.list_top-r .subject_list').html(list);   
            $('.list_top-r .subject_list').on('click','li',function(){
            $('#duty_list').val($(this).text());
                $('.subject_list').slideUp();
                renderList();
            });
        
            $('#duty_list').on('blur',function(){
                    renderList();
                $('.subject_list').slideUp();
            });     
        },
    });
};

function renderList(){
    $.ajax({
        url:baseUrl+'eht/admin/scheduling/getSubByname',
       // url:'http://192.168.1.51:8333/eht/admin/scheduling/getSubByname',
        type:'post',
        data:{
            // hospitalId:sessionStorage.getItem("hospitalId"), 
             hospitalId:'',     
            name:$('#duty_list').val() || '',
            type:4,
          //  parentcode:''
        },
        success:function(data){   
                 if(data== [] || data.length == 0 ){
                    return false;
                 }
                //  if(!$('#duty_list').val() || $('#duty_list').val() =='' || $('#duty_list').val() ==' '){
                //       //  console.log(1111111111111111);
                //       $('.secondSubList_main').empty();
                //       return false;
                // }
                 var html='';
            for(var i=0;i<data.length;i++){
                html+='<div class="list_name f_l"><input class="duty_id" type="hidden" value="'+data[i].id+'"/><span>'+data[i].name+'</span></div>'
            }
            // console.log(html);
           //$(".list_main").html(html);
           $('.secondSubList_main').html(html);

            for(var i = 0;i<$(".sure_box .list_choose").length;i++){
                for(var j = 0;j<$(".secondSubList_main .list_name").length;j++){
                    if($(".secondSubList_main .list_name:eq("+j+") span").html()==$(".sure_box .list_choose:eq("+i+") span").html()){
                         $(".secondSubList_main .list_name:eq("+j+")").removeClass("list_name").addClass("list_choose")
                    }
                }
            }
           clickSecondDuty();
        },
    });
    
};


function showSecond_sub(){
    if($('.showAll .check_input').is(':checked')){
     //  alert(1);
        $('#duty_list').val('')
        $('.secondSubList_main').empty();
        renderList();
    }else{
       // alert(2);
          $('.secondSubList_main').empty();
    }

};


function delImg(obj) {
    $.ajax({
        url:baseUrl+'eht/admin/Information/deleteImage',
        type:'post',
        data:{
            filePath: obj
        },
        async:false,
        success: function (data) {

        }
    })
}

function add_subject(){
    //http://192.168.1.51:8333/eht/admin/Information/customAddDepartmentInfo
     $('.smallMask').show();
    $('.smallBox').show();
    $(".btn_sure").hide();
    $('.smallBox').css('height','182px');
    // $(".small_text").hide();
    $('.btn_return').show()
    $(".small_text").html('请在输入框填入自定义科室');
    $('.small_textInput').show();
    $(".btn_subsure").show();
    $(".btn_subsure").unbind("click").click(function () {
         $('.smallMask').hide();
            $('.smallBox').hide();
            
            if(!($('.small_textInput').val()) ||$('.small_textInput').val() == '' || $('.small_textInput').val()== ' '){
                return false;
            }
         
            $.ajax({
               url:baseUrl+'eht/admin/Information/customAddDepartmentInfo',
               // url:'http://192.168.1.51:8333/eht/admin/Information/customAddDepartmentInfo',
                type:'post',
                data:{
                    secondSubName: $('.small_textInput').val()
                },
                async:false,
                success: function (data) {
                       //var addSubId = data[i].id;
                       // for(var i = 0;i<$('.sure_box .list_choose').length;i++){
                       //      if($('.sure_box .list_choose:eq('+i+') span').text() = $('.small_textInput').val()){
                       //          return false;
                       //      }
                       //  }
                        var add_html = '<div class="list_choose f_l"><input class="duty_id" type="hidden" value="'+data.id+'"/><span>'+data.name+'</span><img class="del_img" src="images/shanchu.png" onclick="delDuty(this)" alt=""/></div>';

                        for(var i = 0;i<$('.sure_box .list_choose').length;i++){
                            if($('.sure_box .list_choose:eq('+i+') span').text() == $('.small_textInput').val()){
                                $('.smallBox').css('height','150px');
                                $('.smallMask').show();
                                $('.smallBox').show();
                                $(".small_text").html("该科室已存在");
                                $(".btn_return").hide();
                                $('.small_textInput').hide();
                                $('.btn_subsure').hide();
                                $(".btn_sure").show();  
                                $(".btn_sure").unbind("click").click(function () {
                                    $('.smallMask').hide();
                                    $('.smallBox').hide();
                                })
                                return false;
                            }
                        }

                        $('.sure_box').append(add_html);
                       // alert(addSubId)
             
                }
            })
          

    })
};


function subMess() {
       // alert('提交医院');
    var hospitalName=$("#hos_all").val();
    var hospitalId=sessionStorage.getItem("hospitalId");
    var hospitalAddress=$("#address").val();
    var hospitalTel=$(".hos_tel").val();
    var hospitalLevel=$("#hos_leve").val();
    var hospitalNature=$("#hos_natu").val();
    var province=$("#provice").val();
    var provinceName=$("#provice option:selected").text();
    var city=$("#city").val();
    var country=$("#country").val();
    var introduce=$("#introduce").val();
    var longitude=$(".longitude").val();
    var latitude=$(".latitude").val();
    var hospitalGrade=$("#hos_grade").val();
    var contact=$(".hos_pep").val();
    var hospitalReferred=$("#hos_send").val();
    var offWorkTime = $("#offworkTime").val();
    var beginWorkTime = $("#beginWorkTime").val();
    var morningWorkTime = $("#morningWorkTime").val()
// 
    var img="";
    for(var j=0;j<$(".img_act .img_way").length;j++){
        var way=$('.img_act:eq('+j+') .img_way').val();
        if(j==0){
            img+=way;
        }else{
            img+=','+way;
        }
    }
    // console.log(img);


    var logo=$(".img_logo>.img_act>input").val();
    if(logo){
        logo=logo;
    }else{
        logo="";
    }

    var back=$(".img_back>.img_act>input").val();
    if(back){
        back=back;
    }else{
        back="";
    }


//    console.log(hospitalName,hospitalId,hospitalAddress,hospitalTel,hospitalLevel,hospitalNature,province,city,country,introduce);
    var list=[{
        hospitalGrade:hospitalGrade,
        contact:contact,
        hospitalReferred:hospitalReferred,
        hospitalName:hospitalName,
        hospitalId:hospitalId,
        hospitalAddress:hospitalAddress,
        hospitalTel:hospitalTel,
        provinceName:provinceName,
        hospitalLevel:hospitalLevel,
        hospitalNature:hospitalNature,
        province:province,
        city:city,
        country:country,
        introduce:introduce,
        // srouce:duty,
        hospitalImage:img,
        hospitalLOGO:logo,
        backgroundImage:back,
        longitude:longitude,
        latitude:latitude,
        offWorkTime:offWorkTime,
        beginWorkTime:beginWorkTime,
        morningWorkTime:morningWorkTime
    }];
    // console.log(JSON.stringify(list));
    //必填信息效验
    if(!hospitalName || hospitalName =='' || hospitalName ==' ' ){
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("医院名称必填");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
        $('#hos_all').parent().next().show();
        return false;
    }
    if(!longitude || longitude =='' || !latitude || latitude == ''){
             $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("经纬度必填");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
        $('.lati_long span.redColor').show();
        return false;
    }

    $.ajax({
       url:baseUrl+'eht/admin/Information/updateHospital',
        //url:'http://192.168.1.51:8333/eht/admin/Information/updateHospital',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
//        async:false,
        success: function (data) {
            // console.log(data);
//            if(filePath.length>0){
//                for(var i=0;i<filePath.length;i++){
//                    delImg(filePath[i]);
//                }
//            }
            if(data=="1"){
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("输入时间不合法");
                $(".btn_return").hide();
                $(".btn_sure").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                })
            }else if(data=="0"){
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("保存成功");
                $(".btn_return").hide();
                $(".btn_sure").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                })
            }
          
        }
    })
}


function subMess_sub(){   
  //  alert('提交科室');
     var hospitalId=sessionStorage.getItem("hospitalId");   
//  
    var duty="";
    var long=$(".sure_box .list_choose");
    for(var i=0;i<long.length;i++){
        var text=$('.sure_box .list_choose:eq('+i+') .duty_id').val();
        if(i==0){
           duty+=text;
        }else{
            duty+=','+text;
        }
    }

    $.ajax({
         url:baseUrl+'eht/admin/Information/updateHospitalSub',
       // url:'http://192.168.1.51:8333/eht/admin/Information/updateHospitalSub',
        type:'post',
        data:{ 
            hospitalId:hospitalId,
            srouce:duty
            },
        // dataType: "json",
       // async:false,
        success: function (data) {
            // console.log(data);
            $('.smallBox').css('height','150px');
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("保存成功");
            $(".btn_return").hide();
            $('.small_textInput').hide();
            $('.btn_subsure').hide();
            $(".btn_sure").show();  
            $(".btn_sure").unbind("click").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
            $(".smallMask").click(function(){
                $('.smallBox').hide();
                $('.smallMask').hide();
            })
        },
        error:function(){
            $('.smallMask').show();
            $('.smallBox').css('height','150px');
            $('.smallBox').show();
            $(".small_text").html("服务器无响应,请稍后再试");
            $(".btn_return").hide();
            $('.small_textInput').hide();
            $('.btn_subsure').hide();
            $(".btn_sure").show();  
            $(".btn_sure").unbind("click").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
        }
    })
    // clickSecondDuty()

};


var dutyMoney=function(){
    $.ajax({
        url:baseUrl+'eht/admin/free/selectByHospitalId',
        type:'get',
        data:{
            hospitalId:sessionStorage.getItem("hospitalId")
        },
        success: function (data) {
            console.log(data);
            if(data.length==0){
                return
            }
            var html='';
            for(var i=0;i<data.length;i++){
                html='<tr><td rowspan="3">'+data[i].DepartmentName+' <input class="duty_tit_id" type="hidden" value="'+data[i].departmentId+'"/> </td><td class="'+data[i].departmentId+'">普通门诊 <input class="money_duty" type="hidden" value="0"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="0" duty="4" class="my_id_all my_id_0_4" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="0" duty="3"  class="my_id_all my_id_0_3"  type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="0" duty="2"  class="my_id_all my_id_0_2" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="0" duty="1"  class="my_id_all my_id_0_1" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="0" duty="0" class="my_id_all my_id_0_0" type="text"/></td></tr><tr><td class="'+data[i].departmentId+'">专家门诊<input class="money_duty" type="hidden" value="1"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="1" duty="4" class="my_id_all my_id_1_4" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="1" duty="3" class="my_id_all my_id_1_3" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="1" duty="2" class="my_id_all my_id_1_2" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="1" duty="1" class="my_id_all my_id_1_1" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="1" duty="0" class="my_id_all my_id_1_0" type="text"/></td></tr><tr><td class="'+data[i].departmentId+'">特需门诊<input class="money_duty" type="hidden" value="2"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="2" duty="4" class="my_id_all my_id_2_4" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="2" duty="3" class="my_id_all my_id_2_3" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="2" duty="2" class="my_id_all my_id_2_2" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="2" duty="1" class="my_id_all my_id_2_1" type="text"/></td><td><input onkeyup="clearNoNum(this)" cid="'+data[i].departmentId+'" out="2" duty="0" class="my_id_all my_id_2_0" type="text"/></td></tr>';
                $(".money_table>tbody").append(html);
                    var list=data[i].list;
                    for(var j=0;j<list.length;j++){
                        var id=data[i].departmentId;
                        var duty=list[j].Duty;
                        var outType=list[j].OutpatientType;
                        $("."+id).parent().find(".my_id_"+outType+"_"+duty).val((list[j].RegistrationMoney)/100);
                    }

            }

    //
            $(".money_table>tbody>tr>td>input.my_id_all").focus( function () {
                var num=$(this).val();
                $(this).on('blur', function () {
                    var blurNum=$(this).val()*100;
                    console.log(blurNum);
                    var duty=$(this).attr("duty");
                    var out=$(this).attr("out");
                    var id=$(this).attr("cid");
                    if(num){
    //                num有值修改
                       if(blurNum==""||blurNum==" "){
                           blurNum=0;
                       }
                      recordMoney(id,duty,out,blurNum);
                    }
                    if(!num){
    //                num无值添加
                        if(blurNum==""||blurNum==" "){
                            return
                        }
                        addMoney(id,duty,out,blurNum);
                    }
                });
            });
       }
    });
}



var addMoney= function (id,duty,out,money) {
//    var list=[{
//        hospitalId:sessionStorage.getItem("hospitalId"),
//        departmentId:id,
//        duty:duty,
//        outpatientType:out,
//        registrationMoney:money
//    }];
    $.ajax({
        url:baseUrl+'eht/admin/free/regFreeInsert',
        type:'post',
        data:{
            hospitalId:sessionStorage.getItem("hospitalId"),
            departmentId:id,
            duty:duty,
            outpatientType:out,
            registrationMoney:money
        },
        success: function (data) {
//            alert("添加成功");
        },
        error: function () {
//            alert("error");
        }
    })
}

var recordMoney= function(id,duty,out,money){
    $.ajax({
        url:baseUrl+'eht/admin/free/updatereGistrationMoney',
        type:'post',
        data:{
            hospitalId:sessionStorage.getItem("hospitalId"),
            departmentId:id,
            duty:duty,
            outpatientType:out,
            registrationMoney:money
        },
//        async:false,
        success: function (data) {
//            alert("修改成功");
        },
        error: function () {
            alert("error");
        }
    });
}


function query(code,type){
    if(type=="2"){
        document.getElementById("city").options.length=0;
        document.getElementById("country").options.length=0;
        queryCtiy("",code,2);
    }
    if(type=="1"){
        document.getElementById("country").options.length=0;
        queryCtiy("",code,1);
    }
}


