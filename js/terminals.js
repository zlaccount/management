
$(function(){

  //没有登录就直接跳转到登录页面
  var username = sessionStorage.getItem('username');
    var hospitalId = sessionStorage.getItem('hospitalId');
    if(!username || !hospitalId){
        window.location.href = "zz/login.html"
    }
   var baseUrl = 'http://www.51edoctor.cn/';
   // var baseUrl = 'http://192.168.1.51:8333/';
   $(".alert_number .active_chose").text(0)
    //公用方法
      //已知门诊类型数字对应文本
    $(".hosipitalName").html(sessionStorage.getItem("hospitalName"))
    $(".idcard_hosipitalName").html(sessionStorage.getItem("hospitalName"))
      var outpatientType = function(outpatientTypeNum){
            switch (outpatientTypeNum){
                  case 0:
                  return '普通门诊';
                  break;
                  case 1:
                  return '专家门诊';
                  break;
                  case 2:
                  return '特需门诊';
                  break;
                  default:
                  return '';
                  break;
                }
      };
            //已知门诊类型文本输出数字
       var outpatientType_text = function(outpatientType_text){
           switch (outpatientType_text){
                case '普通门诊':
                return '0';
                break;
                case '专家门诊':
                return '1';
                break;
                case '特需门诊':
                return '2';
                break;
                default:
                return '';
                break;
              }
       };
var LODOP; //声明为全局变量 
function prn1_preview() { 
  CreateOneFormPage();  
  LODOP.PREVIEW();  
};

function CreateOneFormPage(){
		LODOP=getLodop();
    LODOP.PRINT_INIT("assx");
    if(sessionStorage.getItem("state")){
      // 设置打印报告的纸张大小  2100表示宽度 2100就是210mm 2970表示长度
      LODOP.SET_PRINT_PAGESIZE(1,2100,2970,"");
    }else{
      // 设置取号的纸张大小
      LODOP.SET_PRINT_PAGESIZE(1,800,1300,"");
    }
		
		var strHTML="<body style='margin:0;background-color: white'>"+document.getElementsByClassName("checkMes")[0].innerHTML+"</body>";
		// LODOP.ADD_PRINT_SETUP_BKIMG("<img style='width:20px;height:20px' src='images/ewm.png'>");
		// LODOP.SET_SHOW_MODE("BKIMG_LEFT","10mm")
		// LODOP.SET_SHOW_MODE("BKIMG_TOP","90mm")
		// LODOP.SET_SHOW_MODE("BKIMG_WIDTH","20px")
		// LODOP.SET_SHOW_MODE("BKIMG_HEIGHT","20px")
		// LODOP.ADD_PRINT_HTM(0,0,100%,100%,strHTML);
		// LODOP.ADD_PRINT_HTM("10mm","8mm","RightMargin:10mm","BottomMargin:10mm",strHTML);
		LODOP.ADD_PRINT_HTM("0","0","100%","100%",strHTML);
  };	           
  
  
        //查询是否挂过号,挂过的显示，没挂提示
        var hasGuahao = function(){
          if(!sessionStorage.getItem("state")){
            var name = $('.alert_mian .id_name').val(),
                // idCardNo = $('.alert_mian .id_card').val(),
                idCardNo = idCard,
                userid = $('.alert_mian .user_regisId').val();
            //判断身份信息不完整的重新扫描
            if(idCardNo==""){
                swal({
                    title: "温馨提示：",
                    text: "请输入身份证号",
                    timer: 2000,
                    showConfirmButton: false
                    });
                    return false;
            }
            $.ajax({
                    type:'GET',
                    url:baseUrl+'eht/admin/order/selectOrder2',
                    // url:"http://192.168.1.92:8333/eht/admin/order/selectOrder2",
                    data:{
                      // name:name,
                      idCardNo:idCardNo,
                      hospitalId:sessionStorage.getItem('hospitalId')
                      // hospitalId:"021bb3c756fe5f783357075d0a252572"
                    },
                    success:function(data){
                          //没挂号提示
                          if( data.length ==0){
                               swal({
                                   title: "温馨提示：",
                                   text: "您还未挂号，请先行挂号!",
                                   timer: 2000,
                                   showConfirmButton: false
                                 });
                               $('.alert_mian .saomiaoMes').css({'display':'none'}); 
                               $('.registerInfo').empty();  //要把之前出现的挂号信息清除
                               $('.alert_mian .subjectName').focus();
                              return;
                          } 
                      //挂过号出现扫描的表格并渲染表格信息
                            $('.saomiaoMes').css({'display':'block'}); 
                            $(".alert_l a").css("opacity","1")
                             $(".return,.phone_scan").hide()
                              $(".alert_l").show()
                            $(".alert_l").css({"bottom":"10px","opacity":"1"})
                            // 
//                          $('.alert_mian .identify').css({'display':'none'});
//                          $('.alert_mian .return_home').css({'display':'block'});
//                          $('#register_window .return_home').css({'display':'block'});
                            $('.registerInfo').empty();
                           var register_tds = '';                         
                          for(var i =0;i<data.length;i++){         
                                var item = data[i];
                                register_tds = '<tr>'
                                +'<td>'+(i+1)+'</td>'
                            +'<td>'+data[i].registrationId+'</td>'
                            +'<td>'+data[i].registrationDate+'&nbsp;&nbsp;'+(data[i].dateTime=='pm'?'下午':'上午')+'</td>'
                            +'<td>'+data[i].subjectName+'</td>' +'<td>'+(outpatientType(data[i].outpatientType))+'</td>' +'<td>'+data[i].doctorName+'</td><hr>'
                            +'<td idCard='+idCardNo+'>'+data[i].contactName+'</td>'
                            +'<td class="operate">'
                            +'<label><input type="checkbox" class="m_5" onclick="number()" index="0"><span></span></label>'
                            +'</td>'
                                  +'</tr>';  
                                     //不能无限append，如果有订单Id一样就提示重复
                                 $(".alert_number .active_all").text(i+1);
                                 if(item.registrationId ==  $('.registerInfo .operate').eq(i).children('button').attr('regisId')){
                                  //  alert('重复订单');
                                      swal({
                                        title: "温馨提示：",
                                        text: "您的信息已扫描成功，请勿重复扫描!",
                                        timer: 2000,
                                        showConfirmButton: false
                                      });
                                      return false;
                                 }  
                                $('.registerInfo').append(register_tds);      
                                  //给每条操作按钮都加上订单Id，每个科室td加上科室id
                                $('.registerInfo .operate').eq(i).children('button').attr('regisId',item.registrationId); 
                                $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',item.subjectId);   
                                $('.alert_mian .alert_mian_l').hide();
                                $('.alert_mian_r').hide();
                                $('#alert_two').css({'display':'block'});
                                $('.help_take').addClass('help_take_thr').removeClass('help_take_two');
//                              //根据订单状态显示按钮颜色
//                                if(item.orderStatus == '1'){
//                                 // alert(1)
//                                    $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
//                                    $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
//                                }else if(item.orderStatus == '2'){
//                                  //    alert(2)
//                                   $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //取过号再点击遮罩就打不开
//                                  } 
                          };
//                        alert("data[i]");
                   },
             });
            }else{
              $('.saomiaoMes').css({'display':'block'}); 
              $(".alert_l a").css("opacity","1")
              $(".alert_mian_l").hide()
              $(".return,.phone_scan").hide()
              $(".alert_l").show()
              $('#alert_two').css({'display':'block'});
              $(".alert_l").css({"bottom":"10px","opacity":"1"})
              $("#alert_two .alert_fot button").css("background","url(images/getreport.png)")
              var register_tds = '';
              $(".thead_list th:eq(1)").text("报告编号")
              register_tds = '<tr>'
                            +'<td>1</td>'
                            +'<td>120003315201</td>'
                            +'<td>2018-12-07  下午</td>'
                            +'<td>耳鼻喉科</td><td>普通门诊</td><td>王晓丽</td><hr>'
                            +'<td>小明</td>'
                            +'<td class="operate">'
                            +'<label><input type="checkbox" class="m_5" onclick="number()" index="0"><span></span></label>'
                            +'</td>'
                            +'</tr>';  
              $('.registerInfo').append(register_tds);      
            }
       };

       $('.alert_off').click(function(){
            sessionStorage.removeItem("state")
            if($('.saomiaoMes').css('display')=='none'){
              window.location.href = 'login.html'
            }else{
              window.location.href = 'takeNumber.html';
            }
       })

//     setInterval(hasGuahao,2000)
        //查询是否挂过号,挂过的显示，没挂提示
        var Guahao = function(){
            var name = $('.alert_mian .id_name').val(),
                idCardNo = $('.alert_mian .id_card').val();
                userid = $('.alert_mian .user_regisId').val();
            //判断身份信息不完整的重新扫描
            if(!name && !idCardNo && !userid){
                swal({
                    title: "温馨提示：",
                    text: "信息查询失败！请确认后重新输入。",
                    timer: 2000,
                    showConfirmButton: false
                    });
                    return false;
            }
            $.ajax({
                    type:'GET',
                    url:baseUrl+'eht/admin/order/selectOrder2',
                    data:{
                      name:name,
                      idCardNo:idCardNo,
                      hospitalId:sessionStorage.getItem('hospitalId')
                    },
                    success:function(data){
                          console.log(data);
                          //没挂号提示
                          if( data.length ==0){
                               swal({
                                   title: "温馨提示：",
                                   text: "您还未挂号，请先行挂号!",
                                   timer: 2000,
                                   showConfirmButton: false
                                 });
                                console.log('您还未挂号，请先行挂号!');
                               $('.alert_mian .saomiaoMes').css({'display':'none'}); 
                               $('.registerInfo').empty();  //要把之前出现的挂号信息清除
                               $('.alert_mian .subjectName').focus();
                              return;
                          } 
                      //挂过号出现扫描的表格并渲染表格信息
                            $('.saomiaoMes').css({'display':'block'}); 
//                          $('.alert_mian .identify').css({'display':'none'});
//                          $('.alert_mian .return_home').css({'display':'block'});
//                          $('#register_window .return_home').css({'display':'block'});
                            $('.registerInfo').empty();
                            var register_tds = '';                         
                          for(var i =0;i<data.length;i++){         
                                var item = data[i];
                                register_tds = '<tr>'
                                    +'<td>'+(i+1)+'</td>'
                          +'<td>'+data[i].registrationId+'</td>'
                          +'<td>'+data[i].registrationDate+'&nbsp;&nbsp;'+(data[i].dateTime=='pm'?'下午':'上午')+'</td>'
                          +'<td>'+data[i].subjectName+'</td>' +'<td>'+(outpatientType(data[i].outpatientType))+'</td>' +'<td>'+data[i].doctorName+'</td><hr>'
                          +'<td>'+data[i].contactName+'</td>'
                          +'<td class="operate">'
                          +'<label><input type="checkbox" class="m_5" onclick="number()" index="0"><span></span></label>'
                          +'</td>'
                                    +'</tr>';  
                                    $(".alert_number .active_all").text(i+1);
                                     //不能无限append，如果有订单Id一样就提示重复
                                 if(item.registrationId ==  $('.registerInfo .operate').eq(i).children('button').attr('regisId')){
                                  //  alert('重复订单');
                                      swal({
                                        title: "温馨提示：",
                                        text: "您的信息已扫描成功，请勿重复扫描!",
                                        timer: 2000,
                                        showConfirmButton: false
                                      });
                                      return false;
                                 }  
                                $('.registerInfo').append(register_tds);      
                                  //给每条操作按钮都加上订单Id，每个科室td加上科室id
                                $('.registerInfo .operate').eq(i).children('button').attr('regisId',item.registrationId); 
                                $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',item.subjectId);   
                                $('.alert_mian .alert_mian_l').hide();
                                $('.alert_mian_r').hide();
                                $('#alert_two').css({'display':'block'});
                                $('.help_take').addClass('help_take_thr').removeClass('help_take_two');
                                //根据订单状态显示按钮颜色
//                                if(item.orderStatus == '1'){
//                                 // alert(1)
//                                    $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
//                                    $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
//                                }else if(item.orderStatus == '2'){
//                                  //    alert(2)
//                                   $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //取过号再点击遮罩就打不开
//                                  }           
                        };  
                   },
             });
       };
       //取号机确认取号出票,挂号信息打勾则可以出票
       // function getTicket(){
       //    if($(".operate input[type=checkbox]").is(":checked")){
       //      console.log("OK");
       //      $(".mask").fadeIn(500);
       //    }
       // }
       // $(".checkBtn").click(function(){
       //    getTicket();
       // })
    //取票后，显示最新票源信息
    function guahaoAgain(){
      console.log(5);
      var idCard = $('.registerInfo tr').eq(0).children('td').eq(6).attr("idCard");
      var idName = $('.registerInfo tr').eq(0).children('td').eq(6).text();
      console.log(idCard,idName);
      $.ajax({
            type:'GET',
            async:false,
            url:baseUrl+'eht/admin/order/selectOrder2',
            data:{
              name:idName,
              idCardNo:idCard,
              hospitalId:sessionStorage.getItem('hospitalId')
            },
            success:function(data){
              //挂过号出现扫描的表格并渲染表格信息
                    $('.saomiaoMes').css({'display':'block'}); 
                    $('.registerInfo').empty();
                   var register_tds = '';   
                   console.log(6);
                  for(var i =0;i<data.length;i++){         
                        var item = data[i];
                        register_tds = '<tr>'
                        +'<td>'+(i+1)+'</td>'
                    +'<td>'+data[i].registrationId+'</td>'
                    +'<td>'+data[i].registrationDate+'&nbsp;&nbsp;'+(data[i].dateTime=='pm'?'下午':'上午')+'</td>'
                    +'<td>'+data[i].subjectName+'</td>' +'<td>'+(outpatientType(data[i].outpatientType))+'</td>' +'<td>'+data[i].doctorName+'</td><hr>'
                    +'<td idCard='+idCard+'>'+data[i].contactName+'</td>'
                    +'<td class="operate">'
                    +'<label><input type="checkbox" class="m_5" onclick="number()" index="0"><span></span></label>'
                    +'</td>'
                    +'</tr>';  
                             //不能无限append，如果有订单Id一样就提示重复
                         $(".alert_number .active_all").text(i+1);
                        $('.registerInfo').append(register_tds);   
                          //给每条操作按钮都加上订单Id，每个科室td加上科室id
                        $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',item.subjectId);   
                        $('.alert_mian .alert_mian_l').hide();
                        $('.alert_mian_r').hide();
                        $('#alert_two').css({'display':'block'});
                        $('.help_take').addClass('help_take_thr').removeClass('help_take_two');
//              
                  }
            }
     });
    }

    $('.alert_mian .btn_scan').click(function(){
             //如果扫描Ok，那么信息会自动填充到输入框,如果扫描信息失败，就要给出提示信息要自己手动输入
           hasGuahao();
    });
    $('.idcard_scan').click(function(){
      //如果扫描Ok，那么信息会自动填充到输入框,如果扫描信息失败，就要给出提示信息要自己手动输入
        hasGuahao();
    });

    //  $('.alert_mian .btn_seek').click(function(){
    //         //如查找信息
    //        Guahao();
    // });
    //按订单号查询挂号记录
    function hasRegisId(){
         var user_regisId =  $('.alert_mian .user_regisId').val();
         if(user_regisId==""||user_regisId==" "){
            swal({
                    title: "温馨提示：",
                    text: "请输入订单号！",
                    timer: 2000,
                    showConfirmButton: false
                    });
                    return false;
         }
        $.ajax({
            type:'GET',
            url:baseUrl+'/eht/admin/order/selectOrder2',
            data:{
                hospitalId:sessionStorage.getItem('hospitalId'),
                registrationId:user_regisId
            },
            success:function(data){
                for(var i = 0;i<data.length;i++){
                    if(!(data[i].registrationId)) return false;
                    $('.saomiaoMes').css({'display':'block'});
                   // $('.alert_mian .identify').css({'display':'none'});
                      $('#register_window .return_home').css({'display':'block'});
                    $('.registerInfo').empty();
                    var register_tds = $('<tr>'
                        +'<td>'+(i+1)+'</td>'
                        +'<td>'+data[i].registrationId+'</td>'
                        +'<td>'+data[i].registrationDate+'&nbsp;&nbsp;'+(data[i].dateTime=='pm'?'下午':'上午')+'</td>'
                        +'<td>'+data[i].subjectName+'</td>' +'<td>'+(outpatientType(data[i].outpatientType))+'</td>' +'<td>'+data[i].doctorName+'</td><hr>'
                        +'<td>'+data[i].contactName+'</td>'
                        +'<td class="operate">'
                        +'<label><input type="checkbox" class="m_5" onclick="number()" index="0"><span></span></label>'
                        +'</td>'
                        +'</tr>'); 
                        $(".alert_number .active_all").text(i+1);
                    $('.registerInfo').append(register_tds);      
                    //给每条操作按钮都加上订单Id，每个科室td加上科室id
                    $('.registerInfo .operate').eq(i).children('button').attr('input',data[i].registrationId); 
                    $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',data[i].subjectId);   
                    $('.alert_mian .alert_mian_l').hide();
                    $('.alert_mian_r').hide();
                //    $('.help_take > img').hide();
                    $('#alert_two').css({'display':'block'});
                    $('.help_take').addClass('help_take_thr').removeClass('help_take_two');
                //根据订单状态显示按钮颜色
//                  if(data[i].orderStatus == '1'){
//                  // alert(1)
//                      $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
//                      $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
//                  }else if(data[i].orderStatus == '2'){
//                  //   alert(2)
//                      $('.checkBtn').removeAttr('index'); //取过号再点击遮罩就打不开
//                  }
                }
            }
        });
            $.ajax({
                type:"GET",
                url:baseUrl+'/eht/admin/order/facilityTakeOrder',
                data:{registrationId:user_regisId},
                success:function(data){
                  // console.log(111)
                  if(data.result==1){
                    alert(111)
                  }
                }
            })
    };
      
  // 只要输入了内容就检测单号查询
    $('.alert_mian .btn_seek').click(function(){
           // hasRegisId(); 
           hasGuahao() 
    });
// 根据身份证号获取性别
function getSex(idCard){
  var sex=""
  if(idCard != null && idCard != ""){ 
    idCard.substring(6, 10) + "-" + idCard.substring(10, 12) + "-" + idCard.substring(12, 14); //获取出生日期
    if (parseInt(idCard.substr(16, 1)) % 2 == 1) {   //是男则执行代码 ...
      sex="男"
    } else { //是女则执行代码 ...
      sex="女"
    }
  }
  return sex;
}
       
   //alert_mian页面点击取号 
     $(".checkBtn").click(function(){
          $(this).attr("disabled",true)
      // hasGuahao();
          if($(".operate input[type=checkbox]").is(":checked")){
              // 打印报告
              if(sessionStorage.getItem("state")){
                var checkBtn_info='<img src="images/reportPic.png" style="width:790px;height:670px;" alt="">'//报告内容
                $('.checkBtn_ul').html(checkBtn_info);
                $(".wish").hide();
                $(".check").width("830px");
                $("#mask").show()
                CreateOneFormPage();
                LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
                var result = LODOP.PRINT();
                $('.help_take_thr').addClass('help_take_for').removeClass('help_take_thr');
                setTimeout(function(){
                  $("#mask").hide()
                },4000)
                return false;
              }
              //下面是打印挂号小票的
              var totalRegisId = $(".operate input[type=checkbox]")
              var regisIds= $("input[type=checkbox]:checked"); 
              var mac = getSystemInfo("NetworkAdapter.1.PhysicalAddress");
              //.parent().siblings().eq(1).text()
              for(var i=0;i<regisIds.length;i++){
                  var regisId = $(regisIds[i]).parent().parent().siblings().eq(1).text();
            //传入订单id返回订单数据 渲染
              $.ajax({
                  type:'GET',
                  url:baseUrl+'/eht/admin/order/selectTakeOrder',
                  data:{
                    registrationId: regisId,
                    mac:mac,//这是电脑的mac编号
                  },
                  async:false,
                  success:function(data){
                      $('.checkBtn_ul').html("");
//                    var checkBtn_info = $('<li><span class="smalltitle">武汉大学中南医院</span><br><span>挂号凭证</span></li><li>'+'就诊时间'+data.registrationDate + "&nbsp;&nbsp;&nbsp;" +(data.dateTime=='pm'?'下午':'上午')+'</li>'
//                        + '<li>' + "门诊类别 ：" + '<span>'+(outpatientType(data.outpatientType))+'</span>'+"&nbsp;&nbsp;&nbsp;" + '<span>'+data.subjectName+'</span>'+'<li>'
//                        + '<li>' + "主治医师 ：" + data.doctorName+'</li>'
//                        + '<li>' + "就诊人 ：" + data.contactName+"&nbsp;&nbsp;&nbsp;"+'<span>'+formatIdenticard(data.contactIdcard)+'</span>'
//                        +'<li class="hidden">'+data.registrationId+'</li>'
//                        +'</li>');
            // var checkBtn_info = $('<h2 style="text-align:center;list-style:none;"><span style="font-weight:bold;font-size:24px">'+sessionStorage.getItem("hospitalName")+'</span><br/><span>挂号凭证</span></h2>'
            //                   +'<li style="list-style:none;font-size:14px;">'+"就诊时间："+data.registrationDate + "&nbsp;&nbsp;&nbsp;" +(data.dateTime=='pm'?'下午':'上午')+'</li>'
            //                   +'<hr style="border-bottom:1px dashed #000;">'
            //                   +'<li style="list-style:none;font-size:14px;">'+"取号排序 ："+'<span>'+data.code+'</span></li>'
            //                   +'<li style="list-style:none;margin-top:10px;font-size:14px;">门诊号：<span style="padding-right:10px;">'+data.outpatientNo+'</span>就诊人：<span>'+data.contactName+'</span></li>'
            //                   +'<li style="list-style:none;margin-top:10px;font-size:14px;">'+"科室："+'<span style="padding-right:10px;">'+data.subjectName+'</span>号别：<span>'+(outpatientType(data.outpatientType))+'</span></li>'
            //                   +'<li style="list-style:none;margin-top:10px;font-size:14px;">诊查费/挂号费：<span>'+(data.totlePay/100).toFixed(2)+'</span></li>'
            //                   +'<hr style="border-bottom:1px dashed #000;">'
            //                   +'<li style="list-style:none;font-size:14px;">挂号时间：<span>'+data.createTime+'</span></li>'
            //                   +'<li style="list-style:none;font-size:14px;">收据号：<span style="margin-right:5px;">'+data.receiptId+'</span><li>'
            //                   +'<li style="list-style:none;font-size:14px;">机器编号：<span>'+data.machineId+'</span></li>'
            //                   +'<li style="list-style:none;font-size:14px;">' + "就诊地址："+(data.workStorey==null?' ':data.workStorey)+'</li>'
            //                   +'</li>')

              var checkBtn_info = $('<h2 style="text-align:center;list-style:none;"><span style="font-weight:bold;font-size:24px">'+sessionStorage.getItem("hospitalName")+'</span><br/><span style="font-size:20px;font-weight:700;">缴费凭证</span></h2>'
                            +'<li style="list-style:none;font-size:12px;">病人姓名： '+data.contactName+'&nbsp;&nbsp;&nbsp;性别： '+getSex(data.contactIdcard)+'</li>'
                            +'<li style="list-style:none;margin-top:10px;font-size:12px;">门诊号： <span>'+data.mzh+'</span></li>'
                            +'<li style="list-style:none;font-size:12px;">处方类型： <span>检查费</span></li>'
                            +'<li style="list-style:none;font-size:12px;">票据号： <span style="padding-right:10px;">'+data.registerNo+'</span></li>'
                            +'<li style="list-style:none;font-size:12px;">开单部门： <span style="padding-right:5px;">'+data.subjectName+'</span></li>'
                            +'<li style="list-style:none;font-size:12px;">开单医生： <span style="padding-right:10px;">'+(data.outpatientType=="0"?"普通门诊":data.doctorNames)+'</span></li>'
                            +'<li style="list-style:none;font-size:12px;">支付方式： <span>E号通</span></li>'
                            +'<li style="list-style:none;font-size:12px;">支付金额： '+(data.zfje*1).toFixed(2)+'元<li>'
                            +'<li style="list-style:none;font-size:12px;">就诊时间： '+data.registrationDate+'&nbsp;&nbsp;&nbsp;'+(data.dateTime=='pm'?'下午':'上午')+'<li>'
                            +'<li style="list-style:none;font-size:12px;">订单号： <span>'+data.registrationId+'</span></li>'
                            +'<li style="list-style:none;font-size:12px;">打印时间： '+data.jzTime+'</li>'
                            +'<li style="list-style:none;text-align:left;margin-top:30px;"><img src="http://www.51edoctor.cn/E2306'+data.codeImg+'" style="width:160px;height:50px;"/></li>'
                            +'<li style="list-style:none;font-size:12px;">凭此凭条去相关科室就诊</li>') 
                        $('.checkBtn_ul').html(checkBtn_info);
                        
                        var over = document.getElementById('mask');
                        over.style.display='block';
                        setTimeout(function(){
                            over.style.display='none';
                        },4000)
                        // 调用打印的方法打印
                         CreateOneFormPage();
                          LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
                          var result = LODOP.PRINT();
                        // 下面是判断打印机有没有纸的功能
                          setTimeout(function(){
                            var exist = LODOP.GET_VALUE("PRINT_STATUS_EXIST",result);//判断该打印任务是否还处在队列中
                            var busy = LODOP.GET_VALUE("PRINT_STATUS_BUSY",result);// 判断该打印机是否处于忙碌状态  根据这两个参数判断打印机是否没纸
                            console.log(i,exist,busy);
                            if(exist==1&&busy==1){ // 该打印任务还处在队列中并且打印机处于忙碌状态，就表明打印机没纸了
                              $('.bgMask').show();
                              LODOP.SET_PRINT_MODE("CONTROL_PRINTER","PURGE")
                              console.log("no1");
                              return false;
                              console.log("no2");
                            }else{
                                  console.log("no3");
                                  // 这个接口是用来改变号源的状态，调用这个接口号源就被取了
                                  $.ajax({
                                      type:"GET",
                                      async:false,
                                      url:baseUrl+'/eht/admin/order/facilityTakeOrder',
                                      data:{registrationId:regisId},
                                      success:function(data){
                                        console.log(111)
                                        if(data.result==1){
                                  
                                        }
                                      }
                                  })
                                  
                                }
                          },(i+1)*2000)
                        
                       $('.help_take_thr').addClass('help_take_for').removeClass('help_take_thr');
                        
                  }
            })
          }
            setTimeout(function(){
            	if($(".bgMask").is(':not(:hidden)')){
            		return false;
            	}
              if(totalRegisId.length==regisIds.length){
                 swal({
                   title: "温馨提示：",
                   text: "打印成功",
                   timer: 2000,
                   showConfirmButton: false,
                   },function(){
                   		 window.location.reload();
                   });
              }else{
               swal({
                   title: "温馨提示：",
                   text: "打印成功",
                   timer: 3000,
                   showConfirmButton: true,
                   showCancelButton:true,
                   confirmButtonText:"返回上一页",
                   cancelButtonText:"继续打印",
                   confirmButtonColor:"#12dbae",
                   cancelButtonColor:"#12dbae",
                   closeOnConfirm: false
                   },function(isConfirm){
                     if(isConfirm){
                        window.location.reload();
                     }
                   });
               setTimeout(function(){
                  $(".sweet-overlay").hide()
                  $('.sweet-alert').hide()
               },5000)
                   
              }
              guahaoAgain();
              number();
            },5500);
          }else{
            $(this).attr("disabled",false)
          }
     });
  
      //点击取号弹窗的确认取号按钮
      $('.mask .confirmCheck').click(function(){
          closeMask();
          var regId=$('.checkBtn_ul li').eq(6).text();
          $.ajax({
              type:"post",
              //url:'http://192.168.1.138:8333/eht/admin/order/takeOrder',
              url:baseUrl + 'eht/admin/order/takeOrder',
              data:{registrationId:$('.checkBtn_ul li').eq(6).text()},
              success:function(data){
                  if(data.result == 1){
                    swal({
                      title: "温馨提示：",
                      text: "您已取号成功!",
                      timer: 2000,
                      showConfirmButton: false
                    });
//                $(".check").print({
//                    globalStyles: true,
//                    mediaPrint: false,
//                    stylesheet: null,
//                    noPrintSelector: ".no-print",
//                    iframe: true,
//                    append: null,
//                    prepend: null,
//                    manuallyCopyFormValues: true,
//                    deferred: $.Deferred()
//                });
                    //取过号了的这条订单就不能再取或改了 遮罩也打不开 只有退
                    //alert('取号'); 
                      var checkBtns = $('.registerInfo').find('.checkBtn');
                      checkBtns.each(function(index,element){
                          if($(element).attr('regisId')==$('.checkBtn_ul li').eq(5).text()){
                            //alert('这条订单取过了');
                              $(element).removeClass('mainBg');
                              $(element).attr('disabled',true);
                              $(element).next().removeClass('blueBg');
                              $(element).next().attr('disabled',true);
                              return false;
                          }   
                      });
                  }
              },
              error:function(){
                 swal({
                    title: "温馨提示：",
                    text: "取号失败!",
                    timer: 2000,
                    showConfirmButton: false
                  });
              }
          });
      });

      $('.back').click(function(){
        window.location.reload()
      })



    //鼠标经过显示叉叉 移出影藏
    $('.check').on('mouseenter','.title',function(){
         $('.close_checkMask').fadeIn();
    });
     $('.check').on('mouseleave','.title',function(){
         $('.close_checkMask').fadeOut();
    });

      $('.takenum').on('mouseenter','.title',function(){
         $('.takenum .close_takenumMask').fadeIn();
    });
     $('.takenum').on('mouseleave','.title',function(){
         $('.takenum .close_takenumMask').fadeOut();
    });

    $('.takenum_gaiqian').on('mouseenter','.title',function(){
         $('.takenum_gaiqian .close_takenumMask').fadeIn();
    });
     $('.takenum_gaiqian').on('mouseleave','.title',function(){
         $('.takenum_gaiqian .close_takenumMask').fadeOut();
    });
    //点击右上角叉叉 关闭遮罩 重置样式
      $('.close_mask').click(function(){
            closeMask();
        });
       $('.close_checkMask').click(function(){
            closeMask();
        }); 
         $('.close_takenumMask').click(function(){
            close_takenumMask();
        }); 
        

    //关闭遮罩方法
      function closeMask(){
            $('.mask').hide();     
            var index = $(this).parent().parent().attr('index');
            $('.mask>div').eq(index).css('z-index',1);  
      }
    function close_takenumMask(){
            $('.takenumMask').hide();     
    };
});

function number(){
  var checkedNum = $("input[type='checkbox']:checked").length;
  $(".alert_number .active_chose").text(checkedNum)
  $('.help_take_two').addClass('help_take_thr').removeClass('help_take_two');
}
$(".return").on('click',function(){
  if($(".getTicket").css("display")=="none"&&$(".getByIdCard").css("display")=="none"){
    $(".getTickitByidCard").hide()
    $(".getTickitByPhone").hide()
    $(".getByIdCard").show()
    $(".getByPhone").show()
    $(".zz_bottom").show()
    $(".morefunction").show()
     $(".appImg,.gzh").show()
     $(".appImg,.gzh").hide()
     $(".return").show()
     $(".phone_scan").hide()
    $(".phoneNumber").val("")
    $(".phone_number span").text("0")
    $(".ret").show()
    $(".id_card").val("")
    $(".idcardNum span").text("0")
  }else if($(".getTicket").css("display")=="none"&&$(".getByIdCard").css("display")=="block"){
    sessionStorage.removeItem("state")
    $(".getByIdCard,.getByPhone").hide()
    $(".getTicket,.printReport").show()
    $(".return").hide()
    $(".appImg,.gzh").show()
    $('.help_take_two').addClass('help_take').removeClass('help_take_two');
  }
  
  // $(".getTickitByidCard").hide()
  // $(".getTickitByPhone").hide()
  // $(".getByIdCard").show()
  // $(".getByPhone").show()
  // $(".zz_bottom").show()
  // $(".morefunction").show()
  //  $(".appImg,.gzh").show()
  //  $(".appImg,.gzh").hide()
  //  $(".return").show()
  //  $(".phone_scan").hide()
  // $(".phoneNumber").val("")
  // $(".phone_number span").text("0")
  // $(".ret").show()
  
  // $(".id_card").val("")
  // $(".idcardNum span").text("0")
  telephone=""
  idCard=""
})
$(".getByIdCard").on("click",function(){
  $(".getByIdCard").hide()
  $(".getByPhone").hide()
  $(".morefunction").hide()
  $(".return").show()
  $(".appImg,.gzh").hide()
  $(".getTickitByidCard").show()
  $(".ret").hide()
})

$(".getByPhone").on("click",function(){
  $(".getByIdCard").hide()
  $(".getByPhone").hide()
  $(".morefunction").hide()
   $(".return").show()
  $(".appImg,.gzh").hide()
  $(".phone_scan").show()
  $(".getTickitByPhone").show()
  $(".ret").hide()
 
})
function formatNumber(n){
	n = n.toString()
	  return n[1] ? n : '0' + n
  }

var date=new Date()
var year=date.getFullYear()
var month=date.getMonth()+1
var day=date.getDate()
var hour=date.getHours()
var minute=date.getMinutes()
var week=date.getDay()
var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
var createDate=[year,month,day].map(this.formatNumber).join('-') //
$(".zz_date p:first-child").text(year+"年"+month+"月"+day+"日")
$(".zz_date p:last-child").text(weekday[week])
var timer=setInterval(function(){
  date=new Date()
  hour=date.getHours()
  minute=date.getMinutes()
  $(".zz_time").html(formatNumber(hour)+":"+formatNumber(minute))
},1000)
$(".zz_time").html(formatNumber(hour)+":"+formatNumber(minute))
var telephone=""
var idCard=""
$(".phone_right button").on('click',function(){
  if($(this).text()=="删除"){
    $(".phoneNumber").val($(".phoneNumber").val().substr(0,$(".phoneNumber").val().length-1))
    $(".phone_number span").text($(".phoneNumber").val().length)
    telephone=telephone.substr(0,telephone.length-1)
  }else{
    if($(".phoneNumber").val().length<3){
      $(".phoneNumber").val($(".phoneNumber").val()+$(this).text())
    }else if($(".phoneNumber").val().length<7){
      $(".phoneNumber").val($(".phoneNumber").val()+"*")
    }else{
      $(".phoneNumber").val($(".phoneNumber").val()+$(this).text())
    }
    if($(".phoneNumber").val().length>11){
      $(".phoneNumber").val($(".phoneNumber").val().substr(0,11))
    }
    $(".phone_number span").text($(".phoneNumber").val().length)
    telephone=telephone+$(this).text()
  }
  console.log(telephone)
})

$(".keyBord button").on('click',function(){
  if($(this).text()=="删除"){
    $(".id_card").val($(".id_card").val().substr(0,$(".id_card").val().length-1))
    $(".idcardNum span").text($(".id_card").val().length)
    idCard=idCard.substr(0,idCard.length-1)
  }else{
    if($(".id_card").val().length<6){
      $(".id_card").val($(".id_card").val()+$(this).text())
    }else if($(".id_card").val().length<14){
      $(".id_card").val($(".id_card").val()+"*")
    }else{
      $(".id_card").val($(".id_card").val()+$(this).text())
    }
    if($(".id_card").val().length>18){
      $(".id_card").val($(".id_card").val().substr(0,18))
    }
    $(".idcardNum span").text($(".id_card").val().length)
    idCard=idCard+$(this).text()
  }
  console.log(idCard)
})

$(".deletePhone").on('click',function(event){
  event.stopPropagation()
  telephone=""
  $(".phoneNumber").val("")
  $(".phone_number span").text($(".phoneNumber").val().length)
})

$(".deleteIdcard").on('click',function(event){
  event.stopPropagation()
  idCard=""
  $(".id_card").val("")
  $(".idcardNum span").text($(".id_card").val().length)
})


var outpatientType = function(outpatientTypeNum){
  switch (outpatientTypeNum){
        case 0:
        return '普通门诊';
        break;
        case 1:
        return '专家门诊';
        break;
        case 2:
        return '特需门诊';
        break;
        default:
        return '';
        break;
      }
};
$(".phone_scan").on('click',function(){
  if(!sessionStorage.getItem("state")){
  if($(".phoneNumber").val()==""){
      swal({
            title: "温馨提示：",
            text: "请输入手机号",
            timer: 2000,
            showConfirmButton: false
          });
      return false;
  }
  $.ajax({
    type:'GET',
    url:'http://www.51edoctor.cn/eht/admin/order/selectOrder2',
    // url:"http://192.168.1.92:8333/eht/admin/order/selectOrder2",
    data:{
      mobileNo:telephone,
      hospitalId:sessionStorage.getItem('hospitalId')
    },
    success:function(data){
          //没挂号提示
          if( data.length ==0){
              swal({
                  title: "温馨提示：",
                  text: "您还未挂号，请先行挂号!",
                  timer: 2000,
                  showConfirmButton: false
                });
              $('.alert_mian .saomiaoMes').css({'display':'none'}); 
              $('.registerInfo').empty();  //要把之前出现的挂号信息清除
              $('.alert_mian .subjectName').focus();
              return;
          } 
      //挂过号出现扫描的表格并渲染表格信息
            $(".getTickitByPhone").hide()
            $('.saomiaoMes').css({'display':'block'}); 
            $(".alert_l a").css("opacity","1")
            $(".return,.phone_scan").hide()
            $(".alert_l").show()
            $(".alert_l").css({"bottom":"10px","opacity":"1"})
//                          $('.alert_mian .identify').css({'display':'none'});
//                          $('.alert_mian .return_home').css({'display':'block'});
//                          $('#register_window .return_home').css({'display':'block'});
            $('.registerInfo').empty();
          var register_tds = '';                         
          for(var i =0;i<data.length;i++){         
                var item = data[i];
                register_tds = '<tr>'
                +'<td>'+(i+1)+'</td>'
            +'<td>'+data[i].registrationId+'</td>'
            +'<td>'+data[i].registrationDate+'&nbsp;&nbsp;'+(data[i].dateTime=='pm'?'下午':'上午')+'</td>'
            +'<td>'+data[i].subjectName+'</td>' +'<td>'+(outpatientType(data[i].outpatientType))+'</td>' +'<td>'+data[i].doctorName+'</td><hr>'
            +'<td idCard='+data[i].contactIdcard+'>'+data[i].contactName+'</td>'
            +'<td class="operate">'
            +'<label><input type="checkbox" class="m_5" onclick="number()" index="0"><span></span></label>'
            +'</td>'
                  +'</tr>';  
                    //不能无限append，如果有订单Id一样就提示重复
                    $(".alert_number .active_all").text(i+1);
                if(item.registrationId ==  $('.registerInfo .operate').eq(i).children('button').attr('regisId')){
                  //  alert('重复订单');
                      swal({
                        title: "温馨提示：",
                        text: "您的信息已扫描成功，请勿重复扫描!",
                        timer: 2000,
                        showConfirmButton: false
                      });
                      return false;
                }  
                $('.registerInfo').append(register_tds);      
                  //给每条操作按钮都加上订单Id，每个科室td加上科室id
                $('.registerInfo .operate').eq(i).children('button').attr('regisId',item.registrationId); 
                $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',item.subjectId);   
                $('.alert_mian .alert_mian_l').hide();
                $('.alert_mian_r').hide();
                $('#alert_two').css({'display':'block'});
                $('.help_take').addClass('help_take_thr').removeClass('help_take_two');
//                              //根据订单状态显示按钮颜色
//                                if(item.orderStatus == '1'){
//                                 // alert(1)
//                                    $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
//                                    $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
//                                }else if(item.orderStatus == '2'){
//                                  //    alert(2)
//                                   $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //取过号再点击遮罩就打不开
//                                  } 
          };
  },
});
  }else{
      $('.saomiaoMes').css({'display':'block'}); 
      $(".alert_l a").css("opacity","1")
      $(".alert_mian_l").hide()
      $(".return,.phone_scan").hide()
      $(".alert_l").show()
      $('#alert_two').css({'display':'block'});
      $(".alert_l").css({"bottom":"10px","opacity":"1"})
      $("#alert_two .alert_fot button").css("background","url(images/getreport.png)")
      var register_tds = '';
      $(".thead_list th:eq(1)").text("报告编号")
      register_tds = '<tr>'
                        +'<td>1</td>'
                    +'<td>120003315201</td>'
                    +'<td>2018-12-07  下午</td>'
                    +'<td>耳鼻喉科</td>' +'<td>普通门诊</td>' +'<td>王晓丽</td><hr>'
                    +'<td >小明</td>'
                    +'<td class="operate">'
                    +'<label><input type="checkbox" class="m_5" onclick="number()" index="0"><span></span></label>'
                    +'</td>'
                          +'</tr>';  
      $('.registerInfo').append(register_tds);   
  }
  
})
$(".id_card").on("input",function(){
  idCard=$(".id_card").val()
  $(".idcardNum span").text(idCard.length)
  if($(".id_card").val().length==18){
    $(".id_card").val($(".id_card").val().substr(0,6)+"********"+$(".id_card").val().substr(14,18))
  }
})

$(".phoneNumber").on("input",function(){
  telephone=$(".phoneNumber").val()
  $(".phone_number span").text(telephone.length)
  if($(".phoneNumber").val().length==11){
    $(".phoneNumber").val($(".phoneNumber").val().substr(0,3)+"****"+$(".phoneNumber").val().substr(7,11))
  }
})

$(".getTicket").on("click",function(){
  sessionStorage.removeItem("state")
  $(".printReport,.getTicket").hide()
  $(".getByIdCard,.getByPhone").show()
  $(".appImg,.gzh").hide()
  $(".return").show()
  $(".ret").show()
  $('.help_take').addClass('help_take_two').removeClass('help_take');
})
$(".printReport").on("click",function(){
  sessionStorage.setItem("state","1")
  $(".printReport,.getTicket").hide()
  $(".getByIdCard,.getByPhone").show()
  $(".appImg,.gzh").hide()
  $(".return").show()
  $(".ret").show()
  $('.help_take').addClass('help_take_two').removeClass('help_take');
})

$(".ret").on('click',function(){
  window.location.href="takeNumber.html"
})