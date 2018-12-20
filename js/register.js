
$(function(){
   var baseUrl = 'http://www.51edoctor.cn/';
   // var baseUrl = 'http://192.168.1.51:8333/';
    var username = sessionStorage.getItem('username');
    var hospitalId = sessionStorage.getItem('hospitalId');
    if(!username || !hospitalId){
        window.location.href = "login.html"
    }
    
    $('#register_window').height()<600? $('#register_window').height('auto'):$('#register_window').css('overflow','scroll');
    
    var now = new Date();
    var hours = now.getHours();
    if(hours >= 12){
      
      for( var i =0;i<$('.sourceTime option').length;i++){
        if($('.sourceTime option').eq(i).text() == '上午'){
          $('.sourceTime option').eq(i).remove();
          break;
        }
      }
    }

    function CreateOneFormPage(){
        LODOP=getLodop();
        LODOP.PRINT_INIT("assx");
        //LODOP.SET_PRINT_STYLE("FontSize",18);
        //LODOP.SET_PRINT_STYLE("Bold",1);
        //LODOP.ADD_PRINT_TEXT(50,231,260,39,"");
        LODOP.SET_PRINT_PAGESIZE(1,800,1000,"");
        var strHTML="<body>"+document.getElementById("getTitle").innerHTML+"</body>";
        // LODOP.ADD_PRINT_HTM(0,0,100%,100%,strHTML);
        // LODOP.ADD_PRINT_HTM("10mm","8mm","RightMargin:10mm","BottomMargin:10mm",strHTML);
        LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHTML);
      };   
 


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

             //格式化费用
       function formatFee(fee){
          return (fee/100).toFixed(2);
       };


           $('.step1 .user_regisId').focus();
      function keyCaozuo(){
          if($('.step1 .user_regisId').is(':focus')){
              $('.step1 .user_regisId').keydown(function(e){
                if(event.keyCode == 39){ //->键盘右键
                 // console.log('跳到姓名');
                  $('.step1 .user_name').focus();
                }
                if(event.keyCode == 40){ //键盘下键
                     // console.log('跳到上下午');
                  $('.step1 .sourceTime').focus();
                }
              })
          }
         // console.log(document.activeElement);
           if($('.step1 .user_name').is(':focus')){
               $('.step1 .user_name').keydown(function(e){
                    if(event.keyCode == 39){
                     // console.log('跳到sfz');
                      $('.step1 .user_id').focus();
                         
                    }
                    if(event.keyCode == 37){//键盘左键
                      //  console.log('跳到订单');
                        $('.step1 .user_regisId').focus();
                    }
                  });
           }

           if($('.step1 .user_id').is(':focus')){
              $('.step1 .user_id').keydown(function(e){
                    if(event.keyCode == 39 ||event.keyCode == 40 ){
                      //console.log('跳到上下午');
                      $('.step1 .sourceTime').focus();
                      
                    }
                    if(event.keyCode == 37){
                      // 跳到姓名
                      $('.step1 .user_name').focus();
                    }
                 });
           }

           if($('.step1 .sourceTime').is(':focus')){
              var orderTime = $('.sourceTime option:selected').text()
               $('.step1 .sourceTime').keydown(function(e){
                        if(event.keyCode == 38){ // 键盘上键
                           // console.log('跳到订单');
                            $('.step1 .user_regisId').focus();
                        }
                        if(event.keyCode == 37){
                          $(".step1 .user_id").focus()
                        }
                        if(event.keyCode == 39){ //
                           // console.log('跳到科室');
                            $('.step1 .subjectName').focus();
                        }
                });
           }

           if($('.step1 .subjectName').is(':focus')){
                 $('.step1 .subjectName').keydown(function(e){
                      if(event.keyCode == 39){
                       // console.log('跳到科室');
                         $('.step1 .patientType').focus();              
                      }
                      if(event.keyCode == 37){
                        //  console.log('跳到订单');
                          $('.step1 .sourceTime').focus();
                      }
                      if(event.keyCode == 38){ // up
                           // console.log('跳到订单');
                            $('.step1 .user_regisId').focus();
                        }
                 });       
           }

         if($('.step1 .patientType').is(':focus')){
             $('.step1 .patientType').keydown(function(e){
                 if(event.keyCode == 39){
                       $('.step1 .queryDoc').focus();
                       
                 }
                 if(event.keyCode == 37){
                  $('.step1 .subjectName').focus();
                }
                if(event.keyCode == 38){ // up
                           // console.log('跳到订单');
                            $('.step1 .user_regisId').focus();
                  }
              });
         }    

         if($('.step1 .queryDoc').is(':focus')){
             $('.step1 .queryDoc').keydown(function(e){
                    if(event.keyCode == 37){
                      $('.step1 .patientType').focus();
                    }
                    
                    if(event.keyCode == 38){ // up
                           // console.log('跳到订单');
                            $('.step1 .user_regisId').focus();
                     }
              });
         }
      };


      function keyCaozuo_gaiqian(){ 
           if($('.step2 .sourceTime').is(':focus')){
               $('.step2 .sourceTime').keydown(function(e){
                        if(event.keyCode == 39){
                            $('.step2 .subjectName').focus();
                        }
                });
           }

           if($('.step2 .subjectName').is(':focus')){
                 $('.step2 .subjectName').keydown(function(e){
                      if(event.keyCode == 39){
                         $('.step2 .patientType').focus();              
                      }
                      if(event.keyCode == 37){
                          $('.step2 .sourceTime').focus();
                      }
                 });       
           }

         if($('.step2 .patientType').is(':focus')){
             $('.step2 .patientType').keydown(function(e){
                 if(event.keyCode == 39){
                       $('.step2 .queryDoc').focus();            
                 }
                 if(event.keyCode == 37){
                  $('.step2 .subjectName').focus();
                }
              });
         }    

         if($('.step2 .queryDoc').is(':focus')){
             $('.step2 .queryDoc').keydown(function(e){
                    if(event.keyCode == 37){
                      $('.step2 .patientType').focus();
                    }
              });
         }
      };

      setInterval(keyCaozuo,100);


      // setInterval(getNum,100);

    //    function emptyGuahaoSelect(){
    //         $('.step1 .sourceTime option:selected').val('上午');
    //         $('.step1 .subjectName option:first-child').nextAll().remove();
    //         $('.step1 .patientType option:first-child').nextAll().remove();
    //         $('.step1 .queryDoc').val('');
    //    };
    function isCardNo(card){ 
            // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
        if(reg.test(card) === false){ 
            $(".idcard_tip").show()
            return false; 
        }else{
          $(".idcard_tip").hide()
        }
      }


    $(".user_id").on('blur',function(){
      var idCardNo = $('.step1 .user_id').val();
      if($('.step1 .user_id').val()){
        isCardNo(idCardNo)
      }
    })


       function renderguahaoRes(list){

              if(list == [] || list.length == 0){
                    swal({
                        title: "温馨提示：",
                        text: "查询失败，请重新选择就诊信息。",
                        timer: 2000,
                        showConfirmButton: false
                        });
                    return false;
              }
            var guahao_info = ''; 
            for(var i=0;i<list.length;i++){
                //出现表格信息 
                if(list[i].outpatientType=="0"){
                  guahao_info += '<tr>'
                    + '<td>'+(i+1)+'</td>'
                    + '<td>'+$('.step1 .defaultTime').val() + '(' +$('.step1 .sourceTime option:selected').text()+ ')'+'</td>'
                    + '<td>'+list[i].subjectName+'</td>'
                    + '<td>'+outpatientType(list[i].outpatientType)+'</td>'
                    + '<td> </td>'
                    + '<td>'+formatFee(list[i].totalMoney)+'</td>'
                    + '<td>'+'<button class="guahaoBtn mainBg">挂号</button>'+'</td>'
                    +'</tr>';
                }else{
                  guahao_info += '<tr>'
                    + '<td>'+(i+1)+'</td>'
                    + '<td>'+$('.step1 .defaultTime').val() + '(' +$('.step1 .sourceTime option:selected').text()+ ')'+'</td>'
                    + '<td>'+list[i].subjectName+'</td>'
                    + '<td>'+outpatientType(list[i].outpatientType)+'</td>'
                    + '<td>'+list[i].doctorName+'</td>'
                    + '<td>'+formatFee(list[i].totalMoney)+'</td>'
                    + '<td>'+'<button class="guahaoBtn mainBg">挂号</button>'+'</td>'
                    +'</tr>'; 
                }              
                 

            };
            $('.step1 .saomiaoMes').hide();      
            $('.step1 .guahaoMes').show();
            // $('.addSourse_box').show();
            $('.step1 .guahaoInfo').html(guahao_info);


                //无号源的和医生临时有变是灰色（sourceState=2不正常，=1正常）,同时加上号源id
            for(var j=0;j<list.length;j++){
                $('.step1 .guahaoInfo tr').eq(j).find('.guahaoBtn').attr('sourceState',list[j].sourceState)
                 $('.step1 .guahaoInfo tr').eq(j).find('.guahaoBtn').attr(
                        {'sourceId':list[j].sourceId}
                    ); 
                
                // if( list[j].sourceState == 2){
                //   $('.step1 .guahaoInfo tr').eq(j).find('.guahaoBtn').removeClass('mainBg').addClass('grayBg')
                //   $('.step1 .guahaoInfo tr').eq(j).find('.guahaoBtn').attr("disabled",true)
                // }    
                if(list[j].inventoryNum==0){
                  $('.step1 .guahaoInfo tr').eq(j).find('.guahaoBtn').removeClass('mainBg').addClass('grayBg')
                  $('.step1 .guahaoInfo tr').eq(j).find('.guahaoBtn').attr("disabled",true)
                }
            }
       };


       function rendergaiqianRes(list,oldMoney){
             if(list == [] || list.length == 0){
                    swal({
                        title: "温馨提示：",
                        text: "查询失败，请重新选择就诊信息。",
                        timer: 2000,
                        showConfirmButton: false
                        });
                    return false;
              }
            var gaiqian_info = '';  
            for(var i=0;i<list.length;i++){
                    var xianjia = list[i].totalMoney;      
                    var difference = formatFee(xianjia - oldMoney);  

                    //出现表格信息 
                    if(list[i].outpatientType=='0'){
                      gaiqian_info += '<tr>'
                    + '<td>'+(i+1)+'</td>'
                    + '<td>'+$('.step2 .changeDate').val() + '(' +$('.step2 .sourceTime option:selected').text()+ ')'+'</td>'
                    + '<td>'+list[i].subjectName+'</td>'
                    + '<td>'+outpatientType(list[i].outpatientType)+'</td>'
                    + '<td> </td>'
                    + '<td>'+'改签差价:'+difference+ '('+ '现价：'+formatFee(xianjia) +')'+'</td>'
                    + '<td>'+'<button class="gaiqianBtn blueBg">改签</button>'+'</td>'
                    +'</tr>'; 
                    $(".gaiqianBtn:eq("+i+")").attr("sourceId",list[i].sourceId)
                    }else{
                       gaiqian_info += '<tr>'
                    + '<td>'+(i+1)+'</td>'
                    + '<td>'+$('.step2 .changeDate').val() + '(' +$('.step2 .sourceTime option:selected').text()+ ')'+'</td>'
                    + '<td>'+list[i].subjectName+'</td>'
                    + '<td>'+outpatientType(list[i].outpatientType)+'</td>'
                    + '<td>'+list[i].doctorName+'</td>'
                    + '<td>'+'改签差价:'+difference+ '('+ '现价：'+formatFee(xianjia) +')'+'</td>'
                    + '<td>'+'<button class="gaiqianBtn blueBg">改签</button>'+'</td>'
                    +'</tr>'; 
                    $(".gaiqianBtn:eq("+i+")").attr("sourceId",list[i].sourceId)   
                    }         
                            
            };
            $('.step2 .table_info').show();
            
            $('.step2 .gaiqianMes').html(gaiqian_info);
    
            for(var j=0;j<list.length;j++){
              $('.step2 .gaiqianMes tr').eq(j).find('.gaiqianBtn').attr("sourceState",list[j].sourceState)
                $('.step2 .gaiqianMes tr').eq(j).children('td').eq(5).attr('xianjia',formatFee(list[j].totalMoney));
                 $('.step2 .gaiqianMes tr').eq(j).find('.gaiqianBtn').attr('sourceId',list[j].sourceId); //每条可以挂号的信息标记号源Id
                 if(list[j].inventoryNum = 0 ){
                    // $('.step2 .gaiqianMes tr').eq(j).find('.gaiqianBtn').removeClass('blueBg');  
                    // $('.step2 .gaiqianMes tr').eq(j).find('.gaiqianBtn').addClass('grayBg');
                    // $('.step2 .gaiqianMes tr').eq(j).find('.gaiqianBtn').attr('disabled',true);       
                    
                } 
            }
       };


        var restoreSelect = function(){      
             $('.step1 .subjectName option:first-child').nextAll().attr('selected',false);  
            $('.step1 .subjectName option:first-child').attr('selected',true);
             $('.step1 .patientType option:first-child').nextAll().attr('selected',false);;
            $('.step1 .patientType option:first-child').attr('selected',true);;
            $('.step1 .queryDoc').val(''); 
        };


        var emptyChange = function(){
            $(".step2 .sourceTime option:first-child").nextAll().remove();       
            $('.step2 .subjectName option:first-child').nextAll().remove();
            $('.step2 .patientType option:first-child').nextAll().remove();
            $('.step2 .queryDoc').val('');
        };


        var hasGuahao = function(){
            var name = $('.step1 .user_name').val(),
                idCardNo = $('.step1 .user_id').val();
                isCardNo(idCardNo)
            if(!name || !idCardNo){
                swal({
                    title: "温馨提示：",
                    text: "信息扫描失败！请重新扫描。",
                    timer: 2000,
                    showConfirmButton: false
                    });
                    return false;
            }
            $('.step1 .sourceTime').focus(); //
            $.ajax({
                    type:'GET',
                    url:baseUrl+'eht/admin/order/selectOrder',
                    data:{
                      name:name,
                      idCardNo:idCardNo,
                      hospitalId:sessionStorage.getItem('hospitalId')
                    },
                    success:function(data){
        
                          if( data.length ==0){
                            swal({
                                title: "温馨提示:",
                                text: "您还未挂号，请先行挂号!",
                                timer: 2000,
                                showConfirmButton: false
                              });
     
                             $('.step1 .saomiaoMes').css({'display':'none'}); 
                               $('.registerInfo').empty();  //
                              // $('.step1 .subjectName').focus();
                              return;
                          } 
             
                          $('.step1 .saomiaoMes').css({'display':'block'}); 
                          $('.step1 .guahaoMes').css({'display':'none'}); 
                          //$('.addSourse_box').hide();
                            $('.registerInfo').empty();
                           var register_tds = '';                         
                          for(var i =0;i<data.length;i++){         
                                var item = data[i];
                                register_tds = '<tr>'
                                    +'<td>'+(i+1)+'</td>'
                                  +'<td>'+item.registrationId+'</td>'
                                  +'<td>'+item.registrationDate+'</td>'+'<td>'+(item.dateTime=='pm'?'下午':'上午')+'</td>'
                                  +'<td>'+item.subjectName+'</td>' +'<td>'+(outpatientType(item.outpatientType))+'</td>' +'<td>'+item.doctorName+'</td>'
                                  +'<td>'+formatFee(item.totlePay)+'</td>' +'<td>'+item.contactName+'</td>' +'<td>'+(item.appointmentType==0?'APP':'窗口')+'</td>'
                                  +'<td class="operate">'
                                  + '<button class="checkBtn m_5" index="0" code="'+i+'" outpatientType="'+item.outpatientType+'">取号</button>' 
                                  + '<button class="changeBtn m_5" index="1">改签</button>'
                                  + '<button class="quitBtn m_5" index="2">退号</button>'
                                  +'</td>'
                                  +'</tr>';  
                                   
                                 if(item.registrationId ==  $('.registerInfo .operate').eq(i).children('button').attr('regisId')){
                           
                                      swal({
                                        title: "温馨提示：",
                                        text: "您的信息已扫描成功，请勿重复扫描!",
                                        timer: 2000,
                                        showConfirmButton: false
                                      });
                                      return false;
                                 }  
                                $('.registerInfo').append(register_tds);      
                     
                                $('.registerInfo .operate').eq(i).children('button').attr('regisId',item.registrationId); 
                                $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',item.subjectId); 
                                  if(item.sourceState=='2'){
                                    $('.registerInfo .operate').eq(i).children('.checkBtn').attr("sourceState",item.sourceState)
                                    $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
                                    $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                    $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');
                                  }  
                  
                                  if(item.orderStatus == '1'){
                                        if(item.appointmentType == '0'){
                                            // $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg')
                                            $('.registerInfo .operate').eq(i).children('.changeBtn').removeClass('blueBg').addClass('grayBg')
                                            $('.registerInfo .operate').eq(i).children('.changeBtn').attr('disabled',true)
                                        }
                                   // alert(1)
                                      $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
                                      $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');//已支
                                  }else if(item.orderStatus == '2'){
                                    //    alert(2)
                                      if(item.appointmentType == '0'){
                                            $('.registerInfo .operate').eq(i).children('.changeBtn').removeClass('blueBg').addClass('grayBg')
                                            $('.registerInfo .operate').eq(i).children('.changeBtn').attr('disabled',true)
                                            $('.registerInfo .operate').eq(i).children('.checkBtn').removeClass('mainBg').addClass('grayBg');
                                            $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); //
                                        }else{
                                            $('.registerInfo .operate').eq(i).children('.checkBtn').removeClass('mainBg').addClass('grayBg');
                                            $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                            $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                                            $('.registerInfo .operate').eq(i).children('.checkBtn').attr('disabled',true);
                                            $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); //
                                            $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //
                                            $('.registerInfo .operate').eq(i).children('.changeBtn').removeAttr('index');
                                      }
                                    } else if(item.orderStatus == '5'){
                                      
                                        if(item.appointmentType == '1'){  
                                          //  alert('ck')
                                             $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index');     
                                        }
                                        if(item.appointmentType == '0'){
                                            //alert('app')
                                            $('.registerInfo .operate').eq(i).children('.changeBtn').removeClass('blueBg').addClass('grayBg')
                                             $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
                                             $('.registerInfo .operate').eq(i).children('.changeBtn').attr("disabled",true)
                                        }
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
                                         $('.registerInfo .operate').eq(i).children('.changeBtn').removeAttr('index');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');
                                    }else if(item.orderStatus == '3'){
                                      $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                      $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); 
                                      $('.registerInfo .operate').eq(i).children('.checkBtn').removeClass('mainBg').addClass('grayBg')
                                      $('.registerInfo .operate').eq(i).children('.changeBtn').attr("orderStatus",item.orderStatus);
                                    } 

                                if($(".defaultTime").val()!==item.registrationDate){
                                  $('.registerInfo .operate').eq(i).children('.checkBtn').removeClass("mainBg").addClass("grayBg")
                                  $('.registerInfo .operate').eq(i).children('.checkBtn').attr('disabled',true)
                                }    

                        };  
                   },
             });
       };



    $('.step1 .btn_scan').click(function(){
         
          hasGuahao();
           // emptyGuahaoSelect();
    });


    function hasRegisId(){
         var user_regisId =  $('.step1 .user_regisId').val();
        $.ajax({
            type:'GET',
            url:baseUrl + 'eht/admin/order/selectOrder',
            data:{
                hospitalId:sessionStorage.getItem('hospitalId'),
                registrationId:user_regisId
            },
            success:function(data){
                for(var i = 0;i<data.length;i++){
                    if(!(data[i].registrationId)) return false;
                    $('.step1 .saomiaoMes').css({'display':'block'}); 
                    $('.step1 .guahaoMes').css({'display':'none'}); 
                    $('.registerInfo').empty();          
                    var register_tds = $('<tr>'
                        +'<td>'+(i+1)+'</td>'
                        +'<td>'+data[i].registrationId+'</td>'
                        +'<td>'+data[i].registrationDate+'</td>'+'<td>'+(data[i].dateTime=='pm'?'下午':'上午')+'</td>'
                        +'<td>'+data[i].subjectName+'</td>' +'<td>'+(outpatientType(data[i].outpatientType))+'</td>' +'<td>'+data[i].doctorName+'</td>'
                        +'<td>'+formatFee(data[i].totlePay)+'</td>' +'<td>'+data[i].contactName+'</td>' +'<td>'+(data[i].appointmentType==0?'APP':'窗口')+'</td>'
                        +'<td class="operate">'
                        + '<button class="checkBtn m_5" index="0">取号</button>' 
                        + '<button class="changeBtn m_5" index="1">改签</button>'
                        + '<button class="quitBtn m_5" index="2">退号</button>'
                        +'</td>'
                        +'</tr>');  
                    $('.registerInfo').append(register_tds); 

                    $('.registerInfo .operate').eq(i).children('button').attr('regisId',data[i].registrationId); 
                    $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',data[i].subjectId);   
                    if(data[i].sourceState=="2"){
                      $('.registerInfo .operate').eq(i).children('.checkBtn').attr("sourceState",data[i].sourceState)
                      $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
                      $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                      $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');//已支付
                    }
                    if(data[i].orderStatus == '1'){
                    // alert(1)
                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');//已支付
                        if(data[i].appointmentType == '0'){
                          
                                $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg')
                            }
                    }else if(data[i].orderStatus == '3'){
                    //   alert(2)
                        
                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg')
                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); //已取号 
                        $('.checkBtn').removeAttr('index'); //取
                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                         $('.registerInfo .operate').eq(i).children('.changeBtn').attr("orderStatus",data[i].orderStatus)
                    }else if(data[i].orderStatus == '5'){

                            if(data[i].appointmentType == '1'){  
                            //  alert('ck')
                                $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index');     
                            }
                            if(data[i].appointmentType == '0'){
                                //alert('app')
                                $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
                            }
                            $('.registerInfo .operate').eq(i).children('.changeBtn').removeAttr('index');
                            $('.registerInfo .operate').eq(i).children('.changeBtn').removeClass('blueBg').addClass('grayBg')
                            $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');
                    }else if(data[i].orderStatus == '2'){
                        $('.registerInfo .operate').eq(i).children('.checkBtn').removeClass('mainBg').addClass('grayBg');
                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');
                    }else if(data[i].orderStatus == '-3'){
                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('grayBg');
                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('grayBg');
                    }   
                }
            }
        });
    };
      

    $('.step1 .user_regisId').keyup(function(){
           hasRegisId();
           $('.user_name').val('') ;
           $('.user_id').val('')
    });

      $(".registerInfo").on('click','.operate .checkBtn',function(){
              // clearTimeout(timer)
               var self = this;
              if(!$(".checkBtn").hasClass("mainBg")){
                  return false;
              }
              if($(self).attr("outpatientType")=="1"){
                $(".payNum").hide()
                $(".change").hide()
              }else{
                $(".payNum").show()
                $(".changeNum").html(0)
              }

            
              // $(".mask .check").show()
             
              if($(self).attr("sourceState")=="2"){
                swal({
                  title: "温馨提示：",
                  text: "该医生因故停诊,请选择改签或者退号!",
                  timer: 4000,
                  showConfirmButton: false
                });
                return false;
              }
              var index = $(self).attr('index');
             // alert(index);
             console.log(index)
              var zIndex = 1;
                    zIndex ++; 
      
              $.ajax({
                  type:'GET',
                  url:baseUrl + 'eht/admin/order/selectTakeOrder',
                  data:{registrationId: $(self).attr('regisId')},
                  success:function(data){
                      var checkBtn_info = $('<h2 style="text-align:center;list-style:none;"><span style="font-weight:bold;font-size:24px">'+sessionStorage.getItem("hospitalName")+'</span><br/><span>挂号凭证</span></h2>'
                        // +'<li style="list-style:none;padding-left:5px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                        +'<li style="list-style:none;font-size:14px;">'+"就诊时间："+data.registrationDate + "&nbsp;&nbsp;&nbsp;" +(data.dateTime=='pm'?'下午':'上午')+'</li>'
                        +'<hr style="border-bottom:1px dashed #000;">'
                        +'<li style="list-style:none;font-size:14px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                        +'<li style="list-style:none;margin-top:10px;font-size:14px;">门诊号：<span style="padding-right:10px;">'+data.outpatientNo+'</span>就诊人：<span>'+data.contactName+'</span></li>'
                        // +'<li style="list-style:none;padding-left:5px;">' + "门诊类别 ：" + '<span>'+(outpatientType(data.outpatientType))+'</span>'+'<li>'
                        +'<li style="list-style:none;margin-top:10px;font-size:14px;">'+"科室："+'<span style="padding-right:10px;">'+data.subjectName+'</span>号别：<span>'+(outpatientType(data.outpatientType))+'</span></li>'
                        +'<li style="list-style:none;margin-top:10px;font-size:14px;">诊查费/挂号费：<span>'+(data.totlePay/100).toFixed(2)+'</span></li>'
                        +'<hr style="border-bottom:1px dashed #000;">'
                        +'<li style="list-style:none;font-size:14px;">挂号时间：<span>'+data.createTime+'</span></li>'
                        +'<li style="list-style:none;font-size:14px;">收据号：<span>'+data.receiptId+'</span><li>'
                        // +'<li style="list-style:none;padding-left:5px;">' + "主治医师 ：" + data.doctorName+'</li>'
                        // +'<li style="list-style:none;padding-left:5px;">' + "就诊人 ：" + data.contactName+'</li>'
                        // +'<li style="list-style:none;padding-left:5px;">' + "身份证号 ："+'<span>'+formatIdenticard(data.contactIdcard)+'</span></li>'
                        +'<li style="list-style:none;font-size:14px;">' + "就诊地址："+(data.workStorey==null?' ':data.workStorey)+'</li>'
                        // +'<li style="list-style:none;padding-left:5px;">收据号：<span>'+data.receiptId+'</span><li>'
                        // +'<li class="hidden">'+data.registrationId+'</li>'
                        +'</li>')
                        $('.checkBtn_ul').html(checkBtn_info);   
                          // data.HospitalLogo?$('.check .hospi_logo').attr('src',baseUrl+'E2306'+data.HospitalLogo):$('.check .hospi_logo').css({'display':'none'});
                        
                        if(!($(self).hasClass('mainBg'))){
                            return false;
                        }
                          $('.mask>div').eq(index).show();
                          $('.mask>div').eq(index).siblings().hide();   
                          $('.mask>div').eq(index).css('z-index',zIndex);
                          $(".confirmCheck").attr("code",$(self).attr("code"))
                          $('.mask').css({'display':'block',"z-index":2});
                          $(".confirmCheck").css({"background-color":"#00cdb1","margin-top":"-40px","margin-left":"10px"})
                          $(".checkMes_box .change").css({"margin-top":"210px","margin-left":"-110px"})
                          $(".payNum").css("margin-top","10px")
                          $(".mask .check .checkMes").css("padding","0px 25px 90px 25px")


                          // var timer = setInterval(function(){
                              // $(".mask").css({'display':'none'})
                          // },10000)
                         
                  },
            });         
     });

    function getInfo(){
     $(".registerInfo").on('click','.operate .checkBtn',function(){
              if(!$(".checkBtn").hasClass("mainBg")){
                  return false;
              }
              
              // $(".mask .check").show()
              var self = this;
              var index = $(self).attr('index');
             // alert(index);
              var zIndex = 1;
                    zIndex ++; 
      
              $.ajax({
                  type:'GET',
                  url:baseUrl + 'eht/admin/order/selectTakeOrder',
                  data:{registrationId: $(self).attr('regisId')},
                  success:function(data){
                      var checkBtn_info =$('<h2 style="text-align:center;list-style:none;"><span style="font-weight:bold;font-size:24px">'+sessionStorage.getItem("hospitalName")+'</span><br/><span>挂号凭证</span></h2>'
                        // +'<li style="list-style:none;padding-left:5px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                        +'<li style="list-style:none;font-size:14px;">'+"就诊时间："+data.registrationDate + "&nbsp;&nbsp;&nbsp;" +(data.dateTime=='pm'?'下午':'上午')+'</li>'
                        +'<hr style="border-bottom:1px dashed #000;">'
                        +'<li style="list-style:none;font-size:14px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                        +'<li style="list-style:none;margin-top:10px;font-size:14px;">门诊号：<span style="padding-right:10px;">'+data.outpatientNo+'</span>就诊人：<span>'+data.contactName+'</span></li>'
                        // +'<li style="list-style:none;padding-left:5px;">' + "门诊类别 ：" + '<span>'+(outpatientType(data.outpatientType))+'</span>'+'<li>'
                        +'<li style="list-style:none;margin-top:10px;font-size:14px;">'+"科室："+'<span style="padding-right:10px;">'+data.subjectName+'</span>号别：<span>'+(outpatientType(data.outpatientType))+'</span></li>'
                        +'<li style="list-style:none;margin-top:10px;font-size:14px;">诊查费/挂号费：<span>'+(data.totlePay/100).toFixed(2)+'</span></li>'
                        +'<hr style="border-bottom:1px dashed #000;">'
                        +'<li style="list-style:none;font-size:14px;">挂号时间：<span>'+data.createTime+'</span></li>'
                        +'<li style="list-style:none;font-size:14px;">收据号：<span>'+data.receiptId+'</span><li>'
                        // +'<li style="list-style:none;padding-left:5px;">' + "主治医师 ：" + data.doctorName+'</li>'
                        // +'<li style="list-style:none;padding-left:5px;">' + "就诊人 ：" + data.contactName+'</li>'
                        // +'<li style="list-style:none;padding-left:5px;">' + "身份证号 ："+'<span>'+formatIdenticard(data.contactIdcard)+'</span></li>'
                        +'<li style="list-style:none;font-size:14px;">' + "就诊地址："+(data.workStorey==null?' ':data.workStorey)+'</li>'
                        // +'<li style="list-style:none;padding-left:5px;">收据号：<span>'+data.receiptId+'</span><li>'
                        // +'<li class="hidden">'+data.registrationId+'</li>'
                        +'</li>')
                        $('.checkBtn_ul').html(checkBtn_info);   
                          // data.HospitalLogo?$('.check .hospi_logo').attr('src',baseUrl+'E2306'+data.HospitalLogo):$('.check .hospi_logo').css({'display':'none'});
                        
                        if(!($(self).hasClass('mainBg'))){
                            return false;
                        }
                          $('.mask>div').eq(index).show();
                          $('.mask>div').eq(index).siblings().hide();   
                          $('.mask>div').eq(index).css('z-index',zIndex);
                          $('.mask').css({'display':'block'});
                  },
            });         
     });
     }


      $('.mask .confirmCheck').click(function(){
          var code = $(this).attr("code")
          console.log(code)
          // closeMask();
          LODOP=getLodop();
        LODOP.PRINT_INIT("assx");
        //LODOP.SET_PRINT_STYLE("FontSize",18);
        //LODOP.SET_PRINT_STYLE("Bold",1);
        //LODOP.ADD_PRINT_TEXT(50,231,260,39,"");
        LODOP.SET_PRINT_PAGESIZE(1,800,1000,"");
        var strHTML="<body>"+document.getElementById("getInfo").innerHTML+"</body>";
        // LODOP.ADD_PRINT_HTM(0,0,100%,100%,strHTML);
        // LODOP.ADD_PRINT_HTM("10mm","8mm","RightMargin:10mm","BottomMargin:10mm",strHTML);
        LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHTML);
                LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
                var result = LODOP.PRINT();
                setTimeout(function(){
                  var exist = LODOP.GET_VALUE("PRINT_STATUS_EXIST",result);
                  var busy = LODOP.GET_VALUE("PRINT_STATUS_BUSY",result);
                  console.log(exist,busy)
                  if(exist==1&&busy==1){
                    $('.takenumMask').css({'display':'none'});
                    return false;
                  }else{ 
                        //支付
                      localStorage.clear()
                      // console.log($('.registerInfo tr:eq('+code+') td:eq(1)').text())
                      $.ajax({
                          type:"post",
                           //url:'http://192.168.1.138:8333/eht/admin/order/takeOrder',
                          url:baseUrl + 'eht/admin/order/takeOrder',
                          data:{
                            registrationId:$('.registerInfo tr:eq('+code+') td:eq(1)').text()
                          },
                          success:function(data){
                            console.log(data)
                              if(data.result == 1){
                                  swal({
                                  title: "温馨提示：",
                                  text: "您已取号成功!",
                                  timer: 2000,
                                  showConfirmButton: false
                                });
                                  $('.registerInfo tr:eq('+code+') td:eq(10) .checkBtn').removeClass('mainBg').addClass('grayBg')
                              
                                  var checkBtns = $('.registerInfo').find('.checkBtn');
                                  checkBtns.each(function(index,element){
                                      if($(element).attr('regisId')==$('.user_regisId').val()){
                                          
                                          $(element).removeClass('mainBg');
                                          $(element).addClass('grayBg');
                                          $(element).attr('disabled',true);
                                          $(element).next().removeClass('blueBg');
                                          $(element).next().addClass('grayBg');
                                          $(element).next().attr('disabled',true);
                                           return false;
                                      }   
                                  });
                              }
                               getNum();
                               guahaoOver()
                           //    calculateMoney();
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
                      $('.mask').css({'display':'none'});
                      }
                    },2000)

      });
  

     $(".registerInfo").on('click','.operate .changeBtn',function(){
            if(!$(".changeBtn").hasClass("blueBg")){
              return false;
            }
            var self = this;
            if($(self).attr("orderStatus")=='3'){
                  swal({
                      title: "温馨提示：",
                      text: "您已改签过,请勿重复改签",
                      timer: 2000,
                      showConfirmButton: false
                    });
                  return false;
            }
            $.ajax({
                  type:'GET',
                  url:baseUrl + 'eht/admin/order/selectTakeOrder',
                  data:{
                    registrationId: $(self).attr('regisId')
                  },
                  success:function(data){
                  // console.log(data);
                      if(!($(self).hasClass('blueBg'))){
                          return false;
                      }
                        $('.step1').hide();
                        $('.step2').show();
                        $('#register_window>.divider').css({'top':'165px'});
                        $('.step2 .table_info').hide();
                        $('.step2 .changeDate').val(data.registrationDate);
                        $('.step2 .sourceTime option:selected').text(data.dateTime=='pm'?'下午':'上午');
                        $('.step2 .sourceTime option:selected').attr('contactName',data.contactName)
                        // $('.step2 .subjectName option:selected').text(data.subjectName); 
                        $('.step2 .subjectName option:selected').attr('subjectId',data.subjectId);   
                        // $('.step2 .patientType option:selected').text(outpatientType(data.outpatientType));
                        $('.step2 .changeDate').attr('contactIdcard',data.contactIdcard)
                        //  $('.step2 .queryDoc').val(data.doctorName);
   
                        $('.step2 .hiddenRegisId').val($(self).attr('regisId')); //
                        $('.step2 .hiddenRegisId').attr('oldMoney',data.totlePay);
                        showAllChange(); //                
                  },
            });
     });
       
      
     $(".registerInfo").on('click','.operate .quitBtn',function(){
            if(!$(".quitBtn").hasClass("redBg")){
              return false;
            }
            var self = this;
              var index = $(self).attr('index');
              var zIndex = 1;
                    zIndex ++; 
            $.ajax({
                  type:'GET',
                  url:baseUrl + 'eht/admin/order/selectTakeOrder',
                  data:{registrationId: $(self).attr('regisId')},
                  success:function(data){
    
                      if(!($(self).hasClass('redBg'))){
                          return false;
                      }
                        $('.mask>div').eq(index).show();
                        $('.mask>div').eq(index).siblings().hide();   
                        $('.mask>div').eq(index).css('z-index',zIndex);
                        $('.mask').css({'display':'block'});
                        $('.mask').css('z-index',999);
                        var bookMes_info =
                          $('<li class="col-xs-6">'+ "科室名称 ：" + '<span>' + data.subjectName + '</span>' + '</li>'
                              + '<li class="col-xs-6">' + "门诊类别 ：" + '<span>'+(outpatientType(data.outpatientType))+'</span>' +'</li>'
                              + '<li class="col-xs-6">' + "医生姓名 ：" + data.doctorName+'</li>'
                              + '<li class="col-xs-6">'+ "就诊时间 ：" +data.registrationDate + "&nbsp;&nbsp;&nbsp;" +(data.dateTime=='pm'?'下午':'上午')+'</li>'
                              + '<li class="col-xs-6">' + "挂号途径 ：" + (data.appointmentType==0?'APP':'窗口')+'</li>'  
                              + '<li class="col-xs-6">' + "退款金额 ：" + formatFee(data.totlePay)+"元"+'</li>'
                            );
                        $('.quitMes_box .bookMes').html(bookMes_info);
                        $('.mask .confirmQuit').attr('registrationId',data.registrationId);
                  }
            });    
     });
    
  
      $('.mask .confirmQuit').click(function(){
          var self = this;
          closeMask();
          $.ajax({
              type:'post',
              url:baseUrl + 'eht/admin/order/returnOrder',
              data:{
                registrationId:$(self).attr('registrationId'),
                registrarUserId:sessionStorage.getItem('userId')
              },
              success:function(data){
                    if(data.result == 1){
                      swal({
                      title: "温馨提示：",
                      text: "您已退号成功!",
                      timer: 2000,
                      showConfirmButton: false
                    });
                 
                      var quitBtns = $('.registerInfo').find('.quitBtn');
                      quitBtns.each(function(index,element){
                          if($(element).attr('regisId')==$(self).attr('registrationId')){
                            //alert('这条订单要退号');
                              $(element).parent('.operate').children('.checkBtn').removeClass('mainBg');
                              $(element).parent('.operate').children('.checkBtn').addClass('grayBg');
                              $(element).parent('.operate').children('.changeBtn').removeClass('blueBg');
                              $(element).parent('.operate').children('.changeBtn').addClass('grayBg');
                              $(element).removeClass('redBg');
                              $(element).addClass('grayBg');
                              $(element).parent('.operate').children('button').attr('disabled','true');
                              return false;
                          }   
                      });
                      getNum();
                   //   calculateMoney();
                    }
              },
              error:function(){
                swal({
                    title: "温馨提示：",
                    text: "退号失败，请重新操作!",
                    timer: 2000,
                    showConfirmButton: false
                  });
            }
      });
    });



    // $('.check').on('mouseenter','.title',function(){
    //      $('.close_checkMask').fadeIn();
    // });
    //  $('.check').on('mouseleave','.title',function(){
    //      $('.close_checkMask').fadeOut();
    // });

    //   $('.takenum').on('mouseenter','.title',function(){
    //      $('.takenum .close_takenumMask').fadeIn();
    // });
    //  $('.takenum').on('mouseleave','.title',function(){
    //      $('.takenum .close_takenumMask').fadeOut();
    // });

    // $('.takenum_gaiqian').on('mouseenter','.title',function(){
    //      $('.takenum_gaiqian .close_takenumMask').fadeIn();
    // });
    //  $('.takenum_gaiqian').on('mouseleave','.title',function(){
    //      $('.takenum_gaiqian .close_takenumMask').fadeOut();
    // });

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
           // var index = $(this).parent().parent().attr('index');
          //  $('.mask>div').eq(index).css('z-index',1);  
      }

 //预约挂号 条件搜索step1
        $('.defaultTime').val(currentDay); 
        //  $('.defaultTime').val('2017-08-23'); 
        var currentPage_subject = 1,
            currentPage_patient = 1,
            currentPage_doctor = 1;
          var pageNum = 8;
        function selectGuahao(){
             var defaultDate = $('.step1 .defaultTime').val(); //
              // var defaultDate = '2017-08-23';
              renderSubject();
              //进入页面就把所有科室选项渲染进来
              function renderSubject(){
                 // alert('渲染科室');
                   $.ajax({
                        type:'post',
                       // url:'http://192.168.1.202:8110/eht/admin/source/getSourceByDateTime',
                        url:baseUrl + 'eht/admin/source/getSourceByDateTime',
                        data:{
                          hospitalId:sessionStorage.getItem('hospitalId'),   
                          sourceDate:defaultDate,
                          sourceTime: $(".step1 .sourceTime option:selected").text() == '上午'?'am':'pm' 
                        },  
                        success:function(data){
                            //console.log(data);
                            for(var i=0;i<data.length;i++){
                                //拿到挂号科室值
                              if(data[i].subjectName){
                              var subject_option = $('<option>'+data[i].subjectName+'</option>');
                                subject_option.attr('departID',data[i].departmentId); //
                              $('.step1 .subjectName').append(subject_option);  
                            }
                          }
                        }
                  });
              };
              
   
              $('.step1 .sourceTime').on('change',function(){
                  $('.step1 .subjectName option:first-child').nextAll().remove(); //
                  renderSubject();
               
              });


              $('.step1 .subjectName').on('change',function(){
                // $(".registerInfo").hide()
                  currentPage_subject = 1;
                   renderSubjectMes();
                   addPatientType();
              });
            
   
              function renderSubjectMes(){
                    var doctorName = $('.step1 .queryDoc').val();
                     doctorName =doctorName?doctorName:'';
                   $.ajax({
                        type:'post',
                         url:baseUrl + 'eht/admin/source/getSourceByParams',
                        data:{
                          hospitalId:sessionStorage.getItem('hospitalId'),   
                          sourceDate:defaultDate,
                          sourceTime:$(".step1 .sourceTime option:selected").text() == '上午'?'am':'pm',
                          departmentId:$('.step1 .subjectName option:selected').attr('departID'),
                          doctorName:doctorName,
                          pageNum:currentPage_subject,
                          pageSize:pageNum
                        },  
                        success:function(data){     
                            // console.log(data);
                             var dId = $('.step1 .subjectName option:selected').attr('departID');  //
                             if(!dId ||dId == undefined ){
                                    swal({
                                        title: "温馨提示：",
                                        text: "请选择具体科室",
                                        timer: 2000,
                                        showConfirmButton: false
                                        });
                                     return false;
                             }
                            var totalPage = data.count; // 获取总页数
                            hasguahaoPage_subject(currentPage_subject,totalPage);
                            renderguahaoRes(data.list);                  
                        }
                  });
              };

         
            function hasguahaoPage_subject(nowPage,totalPageNum){
                if(totalPageNum > 1){
                    $('#guahaoPage').show();
                    $('#guahaoPage').myPagination({
                        currPage:nowPage,
                        pageCount:totalPageNum,
                        pageSize:pageNum,
                            panel: {
                            tipInfo_on: true,
                            tipInfo: '&nbsp;&nbsp;跳转至{input}/{sumPage}页',
                            prev:'上一页',
                            next:'下一页',
                            prev_on:true,
                            next_on:true,
                            tipInfo_css: {
                                width: '25px',
                                height: "20px",
                                border: "2px solid #f0f0f0",
                                padding: "0 0 0 5px",
                                margin: "0 5px 0 5px",
                                color: "#01cdb2"
                            }
                        },
                        ajax:{
                            onClick:function(pageNo){
                               // alert('分页返回当前的页数'+pageNo);
                                currentPage_subject = pageNo;
                                renderSubjectMes();
                            }
                        }
                    });
                }else{
                    $('#guahaoPage').hide();
                }
            };


              function addPatientType(){
                   $.ajax({
                        type:'post',
                        // url:'http://192.168.1.138:8333/eht/admin/source/getSourceByDepartment',
                         url:baseUrl + 'eht/admin/source/getSourceByDepartment',
                        data:{
                          hospitalId:sessionStorage.getItem('hospitalId'),   
                          sourceDate:defaultDate,
                          sourceTime:$(".step1 .sourceTime option:selected").text() == '上午'?'am':'pm',
                          departmentId:$('.step1 .subjectName option:selected').attr('departID'),
                        },  
                        success:function(data){     
             
                            // console.log(data);
                             var dId = $('.step1 .subjectName option:selected').attr('departID');  //
                             if(!dId ||dId == undefined ){
                                    swal({
                                        title: "温馨提示：",
                                        text: "请选择具体科室",
                                        timer: 2000,
                                        showConfirmButton: false
                                        });
                                     return false;
                             }
                             var patient_option = '';  
                            for(var i=0;i<data.length;i++){
                                //渲染门诊类别
                                 patient_option += '<option>'+outpatientType(data[i])+'</option>';                                    
                            };
                              $('.step1 .patientType option:first-child').nextAll().remove();
                            $('.step1 .patientType').append(patient_option);
                        }
                  });
              };          
   
              $('.step1 .patientType').on('change',function(){
                  currentPage_patient = 1;
                   changePatientType();
              });

              function changePatientType(){

                   var doctorName = $('.step1 .queryDoc').val();
                     doctorName = doctorName?doctorName:'';
                  $.ajax({
                        type:'post',
                      //  url:'http://192.168.1.138:8333/eht/admin/source/getSourceByParams',
                        url:baseUrl + 'eht/admin/source/getSourceByParams',
                        data:{
                          hospitalId:sessionStorage.getItem('hospitalId'),   
                          sourceDate:defaultDate,
                          sourceTime:$(".step1 .sourceTime option:selected").text() == '上午'?'am':'pm',
                          departmentId:$('.step1 .subjectName option:selected').attr('departID'),
                          outpatientType:outpatientType_text($('.step1 .patientType option:selected').text()),
                          doctorName:doctorName,
                          pageNum:currentPage_patient,
                          pageSize:pageNum
                        },  
                        success:function(data){
      
                            var totalPage = data.count; // 获取总页数
                             hasguahaoPage_patient(currentPage_patient,totalPage);
                            renderguahaoRes(data.list);
                        }
                  });
              };

    
            function hasguahaoPage_patient(nowPage,totalPageNum){
                if(totalPageNum > 1){
                    $('#guahaoPage').show();
                    $('#guahaoPage').myPagination({
                        currPage:nowPage,
                        pageCount:totalPageNum,
                        pageSize:pageNum,
                            panel: {
                            tipInfo_on: true,
                            tipInfo: '&nbsp;&nbsp;跳转至{input}/{sumPage}页',
                            prev:'上一页',
                            next:'下一页',
                            prev_on:true,
                            next_on:true,
                            tipInfo_css: {
                                width: '25px',
                                height: "20px",
                                border: "2px solid #f0f0f0",
                                padding: "0 0 0 5px",
                                margin: "0 5px 0 5px",
                                color: "#01cdb2"
                            }
                        },
                        ajax:{
                            onClick:function(pageNo){
                               // alert('分页返回当前的页数'+pageNo);
                                currentPage_patient = pageNo;
                                changePatientType();

                            }
                        }
                    });
                }else{
                    $('#guahaoPage').hide();
                }
            };

                $('.step1 .queryDoc').keyup(function(){
                      currentPage_doctor = 1;
                    queryDoctor();
                    renderDoctors();
                    
              });   


            $('.step1 .queryDoc').keydown(function(e){
                var event = e || window.event;
                if(event.keyCode == 13){
                    //  alert('点击了回车键')
                         var doctorName = $('.step1 .queryDoc').val();
                        var departmentId = $('.step1 .subjectName option:selected').attr('departID');
                        departmentId?departmentId:'';
                        var outpatientType = outpatientType_text($('.step1 .patientType option:selected').text());
                        outpatientType?outpatientType:'';
                        $.ajax({
                            type:'post',
                            //  url:'http://192.168.1.138:8333/eht/admin/source/getSourceByParams',
                                url:baseUrl + 'eht/admin/source/getSourceByParams',
                                data:{
                                hospitalId:sessionStorage.getItem('hospitalId'),  
                                sourceDate:defaultDate,
                                sourceTime:$(".step1 .sourceTime option:selected").text() == '上午'?'am':'pm',
                                departmentId: departmentId,
                                outpatientType:outpatientType,
                                doctorName:doctorName, 
                                },  
                                success:function(data){
                                    if(data.count == 0|| data.list == [] || data.list.length == 0){
                                            swal({
                                                title: "温馨提示：",
                                                text: "没有查询到您搜索的医生",
                                                timer: 2000,
                                                showConfirmButton: false
                                            });
                                        return false;
                                    }
                                    var doctors ='';
                                    var list = data.list;
                                    for(var i=0;i<list.length;i++){
                                        doctors += '<li>'+list[i].doctorName+'</li>';
                                    }
                                    $('.step1 .queryDoc_list').slideDown();
                                    $('.step1 .queryDoc_list').css('zIndex','1');
                                    $('.step1 .queryDoc_list').html(doctors);
                                }
                         });
                }
            });
                    
             $('.step1 .queryDoc').on('focus',function(){
                 
                  renderDoctors();
                 $('.step1 .queryDoc_list').slideDown();
             });
             $('.step1 .queryDoc').on('blur',function(){
                  $('.step1 .queryDoc_list').slideUp();
             })

             //
              function queryDoctor(){
                    var doctorName = $('.step1 .queryDoc').val();
                    var departmentId = $('.step1 .subjectName option:selected').attr('departID');
                    departmentId?departmentId:'';
                    var outpatientType = outpatientType_text($('.step1 .patientType option:selected').text());
                    outpatientType?outpatientType:'';
                    $.ajax({
                        type:'post',
                      //  url:'http://192.168.1.138:8333/eht/admin/source/getSourceByParams',
                        url:baseUrl + 'eht/admin/source/getSourceByParams',
                        data:{
                          hospitalId:sessionStorage.getItem('hospitalId'),  
                          sourceDate:defaultDate,
                          sourceTime:$(".step1 .sourceTime option:selected").text() == '上午'?'am':'pm',
                          departmentId: departmentId,
                          outpatientType:outpatientType,
                          doctorName:doctorName, 
                        },  
                        success:function(data){
                            if(data.count == 0|| data.list == [] || data.list.length == 0){
                                    // swal({
                                    //     title: "温馨提示：",
                                    //     text: "没有查询到您搜索的医生",
                                    //     timer: 2000,
                                    //     showConfirmButton: false
                                    // });
                                return false;
                            }
                             var doctors ='';
                             var list = data.list;
                             for(var i=0;i<list.length;i++){
                                 doctors += '<li>'+list[i].doctorName+'</li>';
                             }
                             $('.step1 .queryDoc_list').html(doctors);
                            $('.step1 .queryDoc_list').slideDown();
                             $('.step1 .queryDoc_list').css('zIndex','1');
                            
                        }
                  });
              
              };
   
            //
            $('.step1 .queryDoc_list').on('click','li',function(){
                $('.step1 .queryDoc').val($(this).text());
                $('.step1 .queryDoc_list').slideUp();
                renderDoctors();        
            });
            function renderDoctors(){
                var doctorName = $('.step1 .queryDoc').val();
                 var departmentId = $('.step1 .subjectName option:selected').attr('departID');
                    departmentId?departmentId:'';
                    var outpatientType = outpatientType_text($('.step1 .patientType option:selected').text());
                    outpatientType?outpatientType:''; 
                $.ajax({
                    type:'post',
                   // url:'http://192.168.1.138:8333/eht/admin/source/getSourceByParams',
                    url:baseUrl + 'eht/admin/source/getSourceByParams',
                    data:{
                      hospitalId:sessionStorage.getItem('hospitalId'),   
                      sourceDate:defaultDate,
                      sourceTime:$(".step1 .sourceTime option:selected").text() == '上午'?'am':'pm',
                      doctorName:doctorName, 
                      departmentId: departmentId,
                      outpatientType:outpatientType,
                      pageNum:currentPage_doctor,
                      pageSize:pageNum
                    }, 
                    success:function(data){
                  
                         if(data.count == 0|| data.list == [] || data.list.length == 0){
                           
                            return false;
                         }
                         var totalPage = data.count; // 获取总页数
                         hasguahaoPage_doctor(currentPage_doctor,totalPage);
                         renderguahaoRes(data.list);
                    } 
                });
            };

       
            function hasguahaoPage_doctor(nowPage,totalPageNum){
                if(totalPageNum > 1){
                    $('#guahaoPage').show();
                    $('#guahaoPage').myPagination({
                        currPage:nowPage,
                        pageCount:totalPageNum,
                        pageSize:pageNum,
                            panel: {
                            tipInfo_on: true,
                            tipInfo: '&nbsp;&nbsp;跳转至{input}/{sumPage}页',
                            prev:'上一页',
                            next:'下一页',
                            prev_on:true,
                            next_on:true,
                            tipInfo_css: {
                                width: '25px',
                                height: "20px",
                                border: "2px solid #f0f0f0",
                                padding: "0 0 0 5px",
                                margin: "0 5px 0 5px",
                                color: "#01cdb2"
                            }
                        },
                        ajax:{
                            onClick:function(pageNo){
                               // alert('分页返回当前的页数'+pageNo);
                                currentPage_doctor = pageNo;
                               // alert(currentPage);
                                renderDoctors();
                            }
                        }
                    });
                }else{
                    $('#guahaoPage').hide();
                }
            };


        };

        selectGuahao();


    function guahaoCaozuo(){

        function getSourceText(sourceBtn){
            var sourceText_obj;
            var sourceId=  sourceBtn.attr('sourceId'); //
            // var departId = sourceBtn.attr('departId');

            var tr = sourceBtn.parent().parent(); 
            var time = tr.children('td').eq(1).text();
                time = time.substring(0,time.length-1);
            var timeArr = time.split('(');
                sourceText_obj = {
                    sourceTime:timeArr[1],
                  //  departmentId:departId,
                    subjectName:tr.children('td').eq(2).text(),
                    outPatient: tr.children('td').eq(3).text(),  //outpatientType_text
                    doctorName: tr.children('td').eq(4).text(),
                    fee:tr.children('td').eq(5).text()
                }    
            return sourceText_obj;                 
        };

        //渲染此条号源信息
        function renderSourceMes(ele){
            //重新渲染表格信息
              var guahao_info = '';     
                guahao_info += '<tr>'
                + '<td>'+1+'</td>'
                + '<td>'+$('.step1 .defaultTime').val() + '(' +getSourceText(ele).sourceTime+ ')'+'</td>'
                + '<td>'+getSourceText(ele).subjectName+'</td>'
                + '<td>'+getSourceText(ele).outPatient+'</td>'
                + '<td>'+getSourceText(ele).doctorName+'</td>'
                + '<td>'+getSourceText(ele).fee+'</td>'
                + '<td>'+'<button class="guahaoBtn mainBg">挂号</button>'+'</td>'
                +'</tr>';                
            
            $('.step1 .guahaoInfo').html(guahao_info); 
            $('.step1 .guahaoInfo').find('.guahaoBtn').attr('sourceId',ele.attr('sourceId'));
        };
        //将点击的该条号源信息给搜索框
        function replaceSelectText(ele){
            var sourceTime_option = $('.step1 .sourceTime option');
            sourceTime_option.each(function(index,element){
                if(getSourceText(ele).sourceTime == $(element).text()){
                     $(element).attr('selected',true);
                }
            });
             var subject_option = $('.step1 .subjectName option');
            subject_option.each(function(index,element){
                if(getSourceText(ele).subjectName == $(element).text()){
                    $(element).attr('selected',true);
                }
            });
            var patientType_option = $('.step1 .patientType option');
            var addPatient_option = $('<option>'+getSourceText(ele).outPatient+'</option>');
            $('.step1 .patientType').append(addPatient_option);
             addPatient_option.attr('selected',true);
            patientType_option.each(function(index,element){
                if(addPatient_option.text() == $(element).text()){
                    addPatient_option.remove();
                    $(element).attr('selected',true);
                    return false;
                }
            });    
            $('.step1 .queryDoc').val(getSourceText(ele).doctorName);      
        };

   
         var guahaoTimer;
        $('.guahaoInfo').on('click','.guahaoBtn',function(){
          if($(this).attr('sourceState')==2){
              swal({
                  title: "温馨提示：",
                  text: "该医生因故缺诊,您可以选择其他医生",
                  timer: 2000,
                  showConfirmButton: false
                });
                  return false;
            } 

          var ip = getSystemInfo("NetworkAdapter.1.IPAddress")
          var mac = getSystemInfo("NetworkAdapter.1.PhysicalAddress")
          console.log(mac)
          console.log(ip)
           var idCardNo = $('.step1 .user_id').val();
           var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
          if(reg.test(idCardNo) === false){ 
            $(".idcard_tip").show()
            return false; 
          }
            $(".changeNum").html(0)
            $('.pay').val('')
            $(".payNum").show()
            $(".change").show()
            $(".change").css("margin-top","0px")
            $(".payNum").css("margin-top","10px")
            var self = this;
            var subjectName = $(self).parent().parent().find('td').eq(2).text();
            // console.log(subjectName)  当前选择的挂号科室
            if(!($('.user_name').val())|| !($('.user_id').val())){
                swal({
                        title: "温馨提示：",
                        text: "挂号前请先扫描身份证信息",
                        timer: 2000,
                        showConfirmButton: false
                    });
                        return false;
            }
            

            $.ajax({
                    type:'GET',
                    url:baseUrl+'eht/admin/order/selectOrder',
                    data:{
                      name:$('.user_name').val(),
                      idCardNo:$('.user_id').val(),
                      hospitalId:sessionStorage.getItem('hospitalId')
                    },
                    success:function(data){
                      //挂过号拿到挂过的科室                       
                          // for(var i =0;i<data.length;i++){         
                          //       var item = data[i];
                          //       if(subjectName == item.subjectName){
                   
                          //           swal({
                          //               title: "温馨提示：",
                          //               text: "该科室您已经挂过号了，同一科室不能重复挂号",
                          //               timer: 2000,
                          //               showConfirmButton: false
                          //           });
                          //           return false;
                          //       }
                          // }   
                            // alert('buzaizou');
                           renderSourceMes($(self));
                            $('#guahaoPage').hide();
                            replaceSelectText($(self));   
                            //新增挂号订单 拿到此订单data
                            $('.queryDoc').val('')
                            $.ajax({
                                type:'post',
                            // url:baseUrl + 'eht/admin/order/addOrder',
                                url:baseUrl + 'eht/admin/order/clickAddOrder',
                                data:{
                                    contactName:$('.step1 .user_name').val(),
                                    contactIdcard:$('.step1 .user_id').val(),
                                    sourceId:  $(self).attr('sourceId'),
                                    registrarUserId:sessionStorage.getItem('userId')
                                },
                                success:function(data){ 
                                // console.log(data); // 返回所需要的数据
                                  localStorage.setItem("subjectName",data.subjectName)
                                  localStorage.setItem("registrationDate",data.registrationDate)
                                  localStorage.setItem("contactName",data.contactName)
                                  localStorage.setItem("doctorName",data.doctorName)
                                  localStorage.setItem("totlePay",data.totlePay)
                                  localStorage.setItem("dateTime",data.dateTime)
                                  localStorage.setItem("contactIdcard",data.contactIdcard)
                                  localStorage.setItem("code",data.code)
                                  localStorage.setItem("outpatientType",data.outpatientType)
                                  var hospitalName = sessionStorage.getItem('hospitalName')
                                  localStorage.setItem("hospitalName",hospitalName)

                                    $('.takenumMask').css({'display':'block','z-index':1});
                                    $('.takenumMask .takenum').css({'display':'block'});
                                    $('.takenumMask .takenum_gaiqian').css({'display':'none'});
                                    data.addStatus==1?$('.takenum .jiahao').show():$('.takenum .jiahao').hide();
                                   
                                    var takenum_info =$('<h2 style="text-align:center;list-style:none;"><span style="font-weight:bold;font-size:24px">'+sessionStorage.getItem("hospitalName")+'</span><br/><span>挂号凭证</span></h2>'
                                            // +'<li style="list-style:none;padding-left:5px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                                            +'<li style="list-style:none;font-size:14px;">'+"就诊时间："+data.registrationDate + "&nbsp;&nbsp;&nbsp;" +(data.dateTime=='pm'?'下午':'上午')+'</li>'
                                            +'<hr style="border-bottom:1px dashed #000;">'
                                            +'<li style="list-style:none;font-size:14px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                                            +'<li style="list-style:none;margin-top:10px;font-size:14px;">门诊号：<span style="padding-right:10px;">'+data.outpatientNo+'</span>就诊人：<span>'+data.contactName+'</span></li>'
                                            // +'<li style="list-style:none;padding-left:5px;">' + "门诊类别 ：" + '<span>'+(outpatientType(data.outpatientType))+'</span>'+'<li>'
                                            +'<li style="list-style:none;margin-top:10px;font-size:14px;">'+"科室："+'<span style="padding-right:10px;">'+data.subjectName+'</span>号别：<span>'+(outpatientType(data.outpatientType))+'</span></li>'
                                            +'<li style="list-style:none;margin-top:10px;font-size:14px;">诊查费/挂号费：<span>'+(data.totlePay/100).toFixed(2)+'</span></li>'
                                            +'<hr style="border-bottom:1px dashed #000;">'
                                            +'<li style="list-style:none;font-size:14px;">挂号时间：<span>'+data.createTime+'</span></li>'
                                            +'<li style="list-style:none;font-size:14px;">收据号：<span>'+data.receiptId+'</span><li>'
                                            // +'<li style="list-style:none;padding-left:5px;">' + "主治医师 ：" + data.doctorName+'</li>'
                                            // +'<li style="list-style:none;padding-left:5px;">' + "就诊人 ：" + data.contactName+'</li>'
                                            // +'<li style="list-style:none;padding-left:5px;">' + "身份证号 ："+'<span>'+formatIdenticard(data.contactIdcard)+'</span></li>'
                                            +'<li style="list-style:none;font-size:14px;">' + "就诊地址："+(data.workStorey==null?' ':data.workStorey)+'</li>'
                                            // +'<li style="list-style:none;padding-left:5px;">收据号：<span>'+data.receiptId+'</span><li>'
                                            // +'<li class="hidden">'+data.registrationId+'</li>'
                                            +'</li>')
                                    $('.takenum .takenum_ul').html(takenum_info);
                                    // console.log(takenum_info) 
                                    $('.jiahao').hide()
                                    var sourceId = $(self).attr('sourceId')
                                    // console.log(sourceId)
                                   // data.HospitalLogo?$('.takenum .hospi_logo').attr('src',baseUrl+'E2306'+data.HospitalLogo):$('.takenum .hospi_logo').css({'display':'none'}); 
                                     $('.takenum .confirmTakenum').attr('sourceId',sourceId);
                                     // console.log( $('.takenum .confirmTakenum').attr('sourceId'))
                                     
                                },
                                error:function(data){
                                    swal({
                                        title: "温馨提示：",
                                        text: "挂号失败",
                                        timer: 2000,
                                        showConfirmButton: false
                                        });
                                }
                            });

                   },
             });
   
        });
      $('.takenumMes .pay').keyup(function(){
        var payNum = $('.takenumMes .pay').val()
        var guahaoMoney = $(".guahaoMes .table_info tbody tr td:eq(5)").html()
        var changeNum = payNum-guahaoMoney;
        $(".changeNum").html(changeNum)
        if(payNum==''||payNum==' '){
          $(".changeNum").html(0)
        }
      })

      $('.mask .pay').keyup(function(){
        var payNum = $('.takenumMes .pay').val()
        var guahaoMoney = $(".guahaoMes .table_info tbody tr td:eq(5)").html()
        var changeNum = payNum-guahaoMoney;
        $(".changeNum").html(changeNum)
        if(payNum==''||payNum==' '){
          $(".changeNum").html(0)
        }
      })
                
      var LODOP; 
      function CreateOneFormPage(){
            LODOP=getLodop();
            LODOP.PRINT_INIT("assx");
            //LODOP.SET_PRINT_STYLE("FontSize",18);
            //LODOP.SET_PRINT_STYLE("Bold",1);
            //LODOP.ADD_PRINT_TEXT(50,231,260,39,"");
            LODOP.SET_PRINT_PAGESIZE(1,800,1000,"");
            var strHTML="<body>"+document.getElementById("getTitle").innerHTML+"</body>";
            // LODOP.ADD_PRINT_HTM(0,0,100%,100%,strHTML);
            // LODOP.ADD_PRINT_HTM("10mm","8mm","RightMargin:10mm","BottomMargin:10mm",strHTML);
            LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHTML);
          };   




        $('.takenum .confirmTakenum').click(function(){
          var self = this;
          $('.takenumMask').css({'display':'none'});
              // localStorage.setItem("subjectName","")
              // localStorage.setItem("registrationDate","")
              // localStorage.setItem("contactName","")
              // localStorage.setItem("doctorName","")
              // localStorage.setItem("totlePay","")
              // localStorage.setItem("dateTime","")
              // localStorage.setItem("contactIdcard","")
              // localStorage.setItem("code","")
              // localStorage.setItem("outpatientType","")
              // // var hospitalName = sessionStorage.getItem('hospitalName')
              // localStorage.setItem("hospitalName","")
              
              
              getInfo()
             CreateOneFormPage();
                LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
                var result = LODOP.PRINT();
                setTimeout(function(){
                  var exist = LODOP.GET_VALUE("PRINT_STATUS_EXIST",result);
                  var busy = LODOP.GET_VALUE("PRINT_STATUS_BUSY",result);
                  console.log(exist,busy)
                  if(exist==1&&busy==1){
                  	// $('.takenumMask').css({'display':'none'});
                    return false;
                  }else{ 
                        //支付
                      localStorage.clear()
                      console.log(sessionStorage.getItem('userId'))
                      $.ajax({
                          type:'post',
                          //url:baseUrl + 'eht/admin/payment/finishPayByAddOrder',
                          url:baseUrl +'eht/admin/order/addTakeOrder',
                          data:{
                              contactName:$('.step1 .user_name').val(),
                              contactIdcard:$('.step1 .user_id').val(),
                              sourceId:  $(self).attr('sourceId'),
                              registrarUserId:sessionStorage.getItem('userId')
                          },
                          async:false,
                          success:function(data){
                              console.log(data)
                              if(data.result == 'succeed'){
                                setTimeout(function(){
                                  swal({
                                      title: "温馨提示：",
                                      text: "您已取号成功!",
                                      timer: 2000,
                                      showConfirmButton: false
                                  });
                                })
                                  guahaoOver();
                                  restoreSelect();
                                  getNum();
                              }
                          }
                              
                      }); 
                      // $('.takenumMask').css({'display':'none'});
                      }
                    },2000)
                     });

 
        var guahaoOver = function(){
                var name = $('.step1 .user_name').val(),
                    idCardNo = $('.step1 .user_id').val();
                $.ajax({
                        type:'GET',
                        url:baseUrl+'eht/admin/order/selectOrder',
                        data:{
                            name:name,
                            idCardNo:idCardNo,
                            hospitalId:sessionStorage.getItem('hospitalId')
                        },
                        success:function(data){
                            $('.step1 .saomiaoMes').css({'display':'block'}); 
                            $('.step1 .guahaoMes').css({'display':'none'});     
                            $('.registerInfo').empty();                              
                            for(var i =0;i<data.length;i++){         
                                    var item = data[i];
                                    var register_tds = $('<tr>'
                                        +'<td>'+(i+1)+'</td>'
                                    +'<td>'+item.registrationId+'</td>'
                                    +'<td>'+item.registrationDate+'</td>'+'<td>'+(item.dateTime=='pm'?'下午':'上午')+'</td>'
                                    +'<td>'+item.subjectName+'</td>' +'<td>'+(outpatientType(item.outpatientType))+'</td>' +'<td>'+item.doctorName+'</td>'
                                    +'<td>'+formatFee(item.totlePay)+'</td>' +'<td>'+item.contactName+'</td>' +'<td>'+(item.appointmentType==0?'APP':'窗口')+'</td>'
                                    +'<td class="operate">'
                                    + '<button class="checkBtn m_5" index="0">取号</button>' 
                                    + '<button class="changeBtn m_5" index="1">改签</button>'
                                    + '<button class="quitBtn m_5" index="2">退号</button>'
                                    +'</td>'
                                    +'</tr>');   
                                    $('.registerInfo').append(register_tds); 
                       
                                    $('.registerInfo .operate').eq(i).children('button').attr('regisId',item.registrationId); 
                                    $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',item.subjectId);     
                                    //
                                    if(item.orderStatus == '1'){
                                    //  alert(1)
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');//
                                    }else if(item.orderStatus == '3'){
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');//
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').attr("orderStatus",item.orderStatus)

                                    }else if(item.orderStatus == '2'){
                                        //   alert(2)
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg')
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); //已
                                       $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //
                                       $('.registerInfo .operate').eq(i).children('.changeBtn').removeAttr('index');
                                        }else if(item.orderStatus == '5'){
                                        //  alert(5)
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg')
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); //已
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').removeAttr('index');
                                        }           
                                };                  
                    },
                });
        };

         $('body').keydown(function(e){
            var event = e || window.event;
            if(event.keyCode == 13){
                // alert('点击的是挂号的确认取号');
                  
                }
          });
    };
    guahaoCaozuo();

    var add;

    $('.addSourse_box').on('click','#add_sourse',function(){
        var dot_name = $('.step1 .queryDoc').val();
        if(!dot_name){
            swal({
                title: "温馨提示：",
                text: "请填写增加号源的医生姓名。",
                timer: 3000,
                showConfirmButton: false
                });
            return false;
        }
         add = true;
        // alert('cancel');
        addSourse($(this));
        $('.guahaoInfo .guahaoBtn').hide();
        $('.guahaoInfo .guahaoBtn').parent().append('<button class="jiahaoBtn redBg">加号</button>');
        $('.guahaoInfo .jiahaoBtn').attr('sourceId', $('.guahaoInfo .guahaoBtn').attr('sourceId'));
    });
    function addSourse(e){
        if(add){
             e.parent().append('<a id="cancel_sourse" class="new_add" href="javascript:void(0);">取消增加</a>');
            e.remove();
        }
    };
    //
    $('.addSourse_box').on('click','#cancel_sourse',function(){
        // alert('add it')
        cancelSourse($(this));
    });
    function cancelSourse(e) {
        add=false;
        if(!add){
            //<a id="add_sourse" class="new_add" href="javascript:void(0);">应急增加</a>
            e.parent().append('<a id="add_sourse" class="new_add" href="javascript:void(0);">应急加号</a>');
            e.remove();
            // $('.guahaoInfo .guahaoBtn').addClass("mainBg")
            $('.guahaoInfo .guahaoBtn').parent().append('<button class="guahaoBtn mainBg">挂号</button>');
            $('.guahaoInfo .guahaoBtn').next().remove();
            if(!$('.guahaoInfo .guahaoBtn')){
            $('.guahaoInfo .guahaoBtn').parent().append('<button class="guahaoBtn mainBg">挂号</button>');
            }
        }
    }

    //
    function jiahaoCaozuo(){

            function getJiahaoText(sourceBtn){
                var sourceText_obj;
                var sourceId=  sourceBtn.attr('sourceId'); //
                // var departId = sourceBtn.attr('departId');

                var tr = sourceBtn.parent().parent(); 
                var time = tr.children('td').eq(1).text();
                    time = time.substring(0,time.length-1);
                var timeArr = time.split('(');
                    sourceText_obj = {
                        sourceTime:timeArr[1],
                    //  departmentId:departId,
                        subjectName:tr.children('td').eq(2).text(),
                        outPatient: tr.children('td').eq(3).text(),  //outpatientType_text
                        doctorName: tr.children('td').eq(4).text(),
                        fee:tr.children('td').eq(5).text()
                    }    
                return sourceText_obj;                 
            };
  
            function replaceSelect(ele){
                var sourceTime_option = $('.step1 .sourceTime option');
                sourceTime_option.each(function(index,element){
                    if(getJiahaoText(ele).sourceTime == $(element).text()){
                        $(element).attr('selected',true);
                    }
                });
                var subject_option = $('.step1 .subjectName option');
                subject_option.each(function(index,element){
                    if(getJiahaoText(ele).subjectName == $(element).text()){
                        $(element).attr('selected',true);
                    }
                });
                var patientType_option = $('.step1 .patientType option');
                var addPatient_option = $('<option>'+getJiahaoText(ele).outPatient+'</option>');
                $('.step1 .patientType').append(addPatient_option);
                addPatient_option.attr('selected',true);
                patientType_option.each(function(index,element){
                    if(addPatient_option.text() == $(element).text()){
                        addPatient_option.remove();
                        $(element).attr('selected',true);
                        return false;
                    }
                });    
            // $('.step1 .queryDoc').val(getSourceText(ele).doctorName);      
            };


        var jiahaoTimer;
        $('.guahaoInfo').on('click','.jiahaoBtn',function(){
                $('.changeNum').html(0)
                $('.pay').val('')
                var self = this;
                $(self).parent().parent().siblings().remove()
                var subjectName = $(self).parent().parent().find('td').eq(2).text();
                if(!($('.user_name').val())|| !($('.user_id').val())){
                    swal({
                            title: "温馨提示：",
                            text: "挂号前请先扫描身份证信息",
                            timer: 2000,
                            showConfirmButton: false
                        });
                            return false;
                } 
                
             
                $.ajax({
                        type:'GET',
                        url:baseUrl+'eht/admin/order/selectOrder',
                        data:{
                        name:$('.user_name').val(),
                        idCardNo:$('.user_id').val(),
                        hospitalId:sessionStorage.getItem('hospitalId')
                        },
                        success:function(data){
                        //挂过号拿到挂过的科室                       
                            // for(var i =0;i<data.length;i++){         
                            //         var item = data[i];
                            //         if(subjectName == item.subjectName){
            
                            //             swal({
                            //                 title: "温馨提示：",
                            //                 text: "该科室您已经挂过号了，同一科室不能重复挂号",
                            //                 timer: 2000,
                            //                 showConfirmButton: false
                            //             });
                            //             return false;
                            //         }
                            // }  
                           replaceSelect($(self));   
            
                                $.ajax({
                                    type:'post',
                                    url:baseUrl + 'eht/admin/order/clickAddOrder',
                                    data:{
                                        contactName:$('.step1 .user_name').val(),
                                        contactIdcard:$('.step1 .user_id').val(),
                                        sourceId:  $(self).attr('sourceId'),
                                        registrarUserId:sessionStorage.getItem('userId')
                                    },
                                    success:function(data){ 
                                      console.log(data)
          
                                        $('.takenumMask').css({'display':'block'});
                                        $('.takenumMask .takenum').css({'display':'block'});
                                        $('.takenumMask .takenum_gaiqian').css({'display':'none'});
                                        data.addStatus==1?$('.takenum .jiahao').show():$('.takenum .jiahao').hide();
                                        // jiahaoTimer = setTimeout(function(){
                                            $('.takenumMask').css({'z-index':'2'});
                                        // },5000)
                                        var takenum_info = $('<h2 style="text-align:center;list-style:none;"><span style="font-weight:bold;font-size:24px">'+sessionStorage.getItem("hospitalName")+'</span><br/><span>挂号凭证</span></h2>'
                                            // +'<li style="list-style:none;padding-left:5px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                                            +'<li style="list-style:none;font-size:14px;">'+"就诊时间："+data.registrationDate + "&nbsp;&nbsp;&nbsp;" +(data.dateTime=='pm'?'下午':'上午')+'</li>'
                                            +'<hr style="border-bottom:1px dashed #000;">'
                                            +'<li style="list-style:none;font-size:14px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                                            +'<li style="list-style:none;margin-top:10px;font-size:14px;">门诊号：<span style="padding-right:10px;">'+data.outpatientNo+'</span>就诊人：<span>'+data.contactName+'</span></li>'
                                            // +'<li style="list-style:none;padding-left:5px;">' + "门诊类别 ：" + '<span>'+(outpatientType(data.outpatientType))+'</span>'+'<li>'
                                            +'<li style="list-style:none;margin-top:10px;font-size:14px;">'+"科室："+'<span style="padding-right:10px;">'+data.subjectName+'</span>号别：<span>'+(outpatientType(data.outpatientType))+'</span></li>'
                                            +'<li style="list-style:none;margin-top:10px;font-size:14px;">诊查费/挂号费：<span>'+(data.totlePay/100).toFixed(2)+'</span></li>'
                                            +'<hr style="border-bottom:1px dashed #000;">'
                                            +'<li style="list-style:none;font-size:14px;">挂号时间：<span>'+data.createTime+'</span></li>'
                                            +'<li style="list-style:none;font-size:14px;">收据号：<span>'+data.receiptId+'</span><li>'
                                            // +'<li style="list-style:none;padding-left:5px;">' + "主治医师 ：" + data.doctorName+'</li>'
                                            // +'<li style="list-style:none;padding-left:5px;">' + "就诊人 ：" + data.contactName+'</li>'
                                            // +'<li style="list-style:none;padding-left:5px;">' + "身份证号 ："+'<span>'+formatIdenticard(data.contactIdcard)+'</span></li>'
                                            +'<li style="list-style:none;font-size:14px;">' + "就诊地址："+(data.workStorey==null?' ':data.workStorey)+'</li>'
                                            // +'<li style="list-style:none;padding-left:5px;">收据号：<span>'+data.receiptId+'</span><li>'
                                            // +'<li class="hidden">'+data.registrationId+'</li>'
                                            +'</li>')
                                        $('.takenumMes .jiahao').show();
                                        $('.takenum .takenum_ul').html(takenum_info); 
                                        // data.HospitalLogo?$('.takenum .hospi_logo').attr('src',baseUrl+'E2306'+data.HospitalLogo):$('.takenum .hospi_logo').css({'display':'none'});
                                       $('.takenum .confirmTakenum').hide();
                                      $('.takenum .confirmTakegaiqiannum').hide();
                                     $('.takenum .confirmTakejiahaonum').show();
                                    $('.takenum .confirmTakejiahaonum').attr({'sourceId':$(self).attr('sourceId')}); 
                                        //  $('.takenum .confirmTakenum').attr({'sourceId':$(self).attr('sourceId')});  
                                        $(".payNum").show()
                                        $(".takenumMes .change").show()
                                    },
                                    error:function(data){
                                        swal({
                                            title: "温馨提示：",
                                            text: "挂号失败",
                                            timer: 2000,
                                            showConfirmButton: false
                                            });
                                    }
                                });     
                    },
                });
        });
        

        $('.takenum .confirmTakejiahaonum').click(function(){
             clearTimeout(jiahaoTimer);
            $('.takenumMask').css({'display':'none'});
            var self = this;
            //支付
            CreateOneFormPage();
                LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
                var result = LODOP.PRINT();
                setTimeout(function(){
                  var exist = LODOP.GET_VALUE("PRINT_STATUS_EXIST",result);
                  var busy = LODOP.GET_VALUE("PRINT_STATUS_BUSY",result);
                  console.log(exist,busy)
                  if(exist==1&&busy==1){
                    $('.takenumMask').css({'display':'none'});
                    return false;
                  }else{ 
                        //支付
                      localStorage.clear()
                    $.ajax({
                            type:'post',
                            //url:baseUrl + 'eht/admin/payment/finishPayByAddOrder',
                            url:baseUrl +'eht/admin/order/addTakeOrder',
                            data:{
                                contactName:$('.step1 .user_name').val(),
                                contactIdcard:$('.step1 .user_id').val(),
                                sourceId:  $(self).attr('sourceId'),
                                registrarUserId:sessionStorage.getItem('userId')
                            },
                            success:function(data){
                              //  console.log(data)         
                                if(data.result == 'succeed'){
                                    swal({
                                        title: "温馨提示：",
                                        text: "您已取号成功!",
                                        timer: 3000,
                                        showConfirmButton: false
                                    });
                             
                                    jiahaoOver();
                                    restoreSelect();
   
                            if($('.addSourse_box').find('a').text() == '取消增加'){
                              $('.addSourse_box').find('a').remove();
                              $('.addSourse_box').append('<a id="add_sourse" class="new_add" href="javascript:void(0);">应急加号</a>');
                            }
                            getNum();
                           // calculateMoney();
                        }
                    }
            });
            // $('.takenumMask').css({'display':'none'});
                      }
                    },2000)

        });

   
        var jiahaoOver = function(){
                var name = $('.step1 .user_name').val(),
                    idCardNo = $('.step1 .user_id').val();
                $.ajax({
                        type:'GET',
                        url:baseUrl+'eht/admin/order/selectOrder',
                        data:{
                            name:name,
                            idCardNo:idCardNo,
                            hospitalId:sessionStorage.getItem('hospitalId')
                        },
                        success:function(data){
                            $('.step1 .saomiaoMes').css({'display':'block'}); 
                            $('.step1 .guahaoMes').css({'display':'none'});     
                            $('.registerInfo').empty();                              
                            for(var i =0;i<data.length;i++){         
                                    var item = data[i];
                                    var register_tds = $('<tr>'
                                        +'<td>'+(i+1)+'</td>'
                                    +'<td>'+item.registrationId+'</td>'
                                    +'<td>'+item.registrationDate+'</td>'+'<td>'+(item.dateTime=='pm'?'下午':'上午')+'</td>'
                                    +'<td>'+item.subjectName+'</td>' +'<td>'+(outpatientType(item.outpatientType))+'</td>' +'<td>'+item.doctorName+'</td>'
                                    +'<td>'+formatFee(item.totlePay)+'</td>' +'<td>'+item.contactName+'</td>' +'<td>'+(item.appointmentType==0?'APP':'窗口')+'</td>'
                                    +'<td class="operate">'
                                    + '<button class="checkBtn m_5" index="0">取号</button>' 
                                    + '<button class="changeBtn m_5" index="1">改签</button>'
                                    + '<button class="quitBtn m_5" index="2">退号</button>'
                                    +'</td>'
                                    +'</tr>');   
                                    $('.registerInfo').append(register_tds); 
                                    //给每条操作按钮都加上订单Id，每个科室td加上科室id
                                    $('.registerInfo .operate').eq(i).children('button').attr('regisId',item.registrationId); 
                                    $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',item.subjectId);     
                                    //
                                    if(item.orderStatus == '1'){
                                    //  alert(1)
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');//已支
                                    }else if(item.orderStatus == '3'){
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').attr("orderStatus",item.orderStatus)
                                    }else if(item.orderStatus == '2'){
                                        //   alert(2)
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); //已
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //取
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').removeAttr('index');
                                        }else if(item.orderStatus == '5'){
                                        //  alert(5)
                                         $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); //已
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //取过号
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').removeAttr('index');
                                        }           
                                };                  
                    },
                });
        };
    };
    jiahaoCaozuo();

        var showDepart= function(){
                //alert('展示对应科室');
                $.ajax({
                    type:'post',
                    url:baseUrl + 'eht/admin/source/getSourceByDateTime',
                    data:{
                        hospitalId:sessionStorage.getItem('hospitalId'),   
                        sourceDate:$('.step2 .changeDate').val(),
                        sourceTime:$(".step2 .sourceTime option:selected").text() == '上午'?'am':'pm'  
                    },
                    success:function(data){ 
                        $('.step2 .subjectName option:first-child').nextAll().remove(); //
                        for(var i= 0;i<data.length;i++){
            
                            var subject_option = $('<option>'+data[i].subjectName+'</option>')[0];
                            subject_option.setAttribute('subjectId',data[i].departmentId); 
                    
                            if($(subject_option).text() ==  $('.step2 .subjectName option:selected').text()){
                                continue; 
                            }
                            $('.step2 .subjectName').append(subject_option);    
                        }
                    }
                });  
        };

    function showAllChange(){
           //展示上下午
           $('.step2 .sourceTime option:first-child').nextAll().remove();//
           var showGaiqianTime = function(){
             var sourceTime = $('.step2 .sourceTime option:selected').text();
             if(sourceTime == '上午'){
                //  alert('出现下午')
                 $('.step2 .sourceTime').append($('<option value="">下午</option>'));
             }else{
                  // $('.step2 .sourceTime').append($('<option value="">上午</option>'));
             }
           };
            showGaiqianTime();
            showDepart();


            var showPatientType = function(){
                 $.ajax({
                    type:'post',
                  //  url:'http://192.168.1.138:8333/eht/admin/source/getSourceByDepartment',
                    url:baseUrl+'eht/admin/source/getSourceByDepartment',
                    data:{
                      hospitalId:sessionStorage.getItem('hospitalId'),   
                      sourceDate:$('.step2 .changeDate').val(),
                      sourceTime:$(".step2 .sourceTime option:selected").text() == '上午'?'am':'pm',
                      departmentId:$('.step2 .subjectName option:selected').attr('subjectId')
                    },
                    success:function(data){
                           // alert('移除之前门诊');
                            $('.step2 .patientType option:selected').nextAll().remove(); 
                            for(var i= 0; i< data.length; i++){   
                                //渲染门诊类别
                                   var patient_option = '<option>'+outpatientType(data[i])+'</option>';  
                                    if($(patient_option).text() ==  $('.step2 .patientType option:selected').text()){
                                      continue;
                                    } //每个和当前显示去重
                                    $('.step2 .patientType').append(patient_option);        
                            };                            
                    }
                });
            };
             showPatientType();

        $('.step2 .sourceTime').focus();
              setInterval(keyCaozuo_gaiqian,100);
    };


   var currentGaiqianPage_subject = 1,
        currentGaiqianPage_patient = 1,
        currentGaiqianPage_doctor = 1;
   function changeSearch(){ 
      
             $('.step2 .sourceTime').on('change',function(){
                  $('.step2 .subjectName').empty();
                  $('.step2 .subjectName').append($('<option value="">-请选择</option>'));
                   showDepart();
             });         

  
          $('.step2 .subjectName').on('change',function(){
              currentGaiqianPage_subject = 1;
                changeSubject();
                $('.step2 .patientType option:first-child').text('-不限');
                addPatientType();
          });
          //按分页出现科室对应号源
          function changeSubject(){
                var doctorName = $('.step2 .queryDoc').val();
                doctorName?doctorName:'';
                $.ajax({
                    type:'post',
                   // url:'http://192.168.1.138:8333/eht/admin/source/getSourceByParams',
                    url:baseUrl + 'eht/admin/source/getSourceByParams',
                    data:{
                      hospitalId:sessionStorage.getItem('hospitalId'),   
                      sourceDate:$('.step2 .changeDate').val(),
                      sourceTime:$('.step2 .sourceTime option:selected').text()=='上午'?'am':'pm',
                      departmentId:$('.step2 .subjectName option:selected').attr('subjectId'),
                      doctorName:doctorName,
                      pageNum:currentGaiqianPage_subject,
                      pageSize:pageNum
                    },  
                    success:function(data){
                        var totalPage = data.count; // 
                        hasgaiqianPage_subject(currentGaiqianPage_subject,totalPage);
                        var oldMoney = $('.step2 .hiddenRegisId').attr('oldMoney');
                          rendergaiqianRes(data.list,oldMoney);
                    }
              });
          };

 
          function addPatientType(){
                $.ajax({
                    type:'post',
                       // url:'http://192.168.1.138:8333/eht/admin/source/getSourceByDepartment',
                     url:baseUrl + 'eht/admin/source/getSourceByDepartment',
                    data:{
                        hospitalId:sessionStorage.getItem('hospitalId'),   
                        sourceDate:$('.step2 .changeDate').val(),
                        sourceTime:$(".step2 .sourceTime option:selected").text() == '上午'?'am':'pm',
                        departmentId:$('.step2 .subjectName option:selected').attr('subjectId'),
                    },  
                    success:function(data){     
                      
                        // console.log(data);
                            var dId = $('.step2 .subjectName option:selected').attr('subjectId');  //
                            if(!dId ||dId == undefined ){
                                swal({
                                    title: "温馨提示：",
                                    text: "请选择具体科室",
                                    timer: 2000,
                                    showConfirmButton: false
                                    });
                                    return false;
                            }
                            var patient_option = '';  
                        for(var i=0;i<data.length;i++){
                            //
                                patient_option += '<option>'+outpatientType(data[i])+'</option>';                                    
                        };
                         $('.step2 .patientType option:first-child').nextAll().remove();
                        $('.step2 .patientType').append(patient_option);
                    }
                });
        };  

           
        function hasgaiqianPage_subject(nowPage,totalPageNum){
            if(totalPageNum > 1){
                $('#gaiqianPage').show();
                $('#gaiqianPage').myPagination({
                    currPage:nowPage,
                    pageCount:totalPageNum,
                    pageSize:10,
                        panel: {
                        tipInfo_on: true,
                        tipInfo: '&nbsp;&nbsp;跳转至{input}/{sumPage}页',
                        prev:'上一页',
                        next:'下一页',
                        prev_on:true,
                        next_on:true,
                        tipInfo_css: {
                            width: '25px',
                            height: "20px",
                            border: "2px solid #f0f0f0",
                            padding: "0 0 0 5px",
                            margin: "0 5px 0 5px",
                            color: "#00cdb1"
                        }
                    },
                    ajax:{
                        onClick:function(pageNo){
            
                            currentGaiqianPage_subject = pageNo;
                            changeSubject();
                        }
                    }
                });
            }else{
                $('#gaiqianPage').hide();
            }
        };  
 


          $('.step2 .patientType').on('change',function(){
              currentGaiqianPage_patient = 1;
                changePatientType();
          });
        
          function changePatientType(){

                var doctorName = $('.step2 .queryDoc').val();
                doctorName?doctorName:'';
                $.ajax({
                    type:'post',
                  //  url:'http://192.168.1.138:8333/eht/admin/source/getSourceByParams',
                    url:baseUrl + 'eht/admin/source/getSourceByParams',
                    data:{
                      hospitalId:sessionStorage.getItem('hospitalId'),   
                      sourceDate:$('.step2 .changeDate').val(),
                      sourceTime:$('.step2 .sourceTime option:selected').text()=='上午'?'am':'pm',
                      departmentId:$('.step2 .subjectName option:selected').attr('subjectId'),
                      outpatientType:outpatientType_text($('.step2 .patientType option:selected').text()),
                      doctorName:doctorName,
                      pageNum:currentGaiqianPage_patient,
                      pageSize:pageNum
                    },  
                    success:function(data){
                        var totalPage = data.count; // 
                        hasgaiqianPage_patient(currentGaiqianPage_patient,totalPage);
                        var oldMoney = $('.step2 .hiddenRegisId').attr('oldMoney');
                         rendergaiqianRes(data.list,oldMoney);
                    }
              });
          };


        function hasgaiqianPage_patient(nowPage,totalPageNum){
            if(totalPageNum > 1){
                $('#gaiqianPage').show();
                $('#gaiqianPage').myPagination({
                    currPage:nowPage,
                    pageCount:totalPageNum,
                    pageSize:pageNum,
                        panel: {
                        tipInfo_on: true,
                        tipInfo: '&nbsp;&nbsp;跳转至{input}/{sumPage}页',
                        prev:'上一页',
                        next:'下一页',
                        prev_on:true,
                        next_on:true,
                        tipInfo_css: {
                            width: '25px',
                            height: "20px",
                            border: "2px solid #f0f0f0",
                            padding: "0 0 0 5px",
                            margin: "0 5px 0 5px",
                            color: "#00cdb1"
                        }
                    },
                    ajax:{
                        onClick:function(pageNo){
                        // alert('当前页是：'+pageNo);
                            currentGaiqianPage_patient = pageNo;
                            changePatientType();
                        }
                    }
                });
            }else{
                $('#gaiqianPage').hide();
            }
        };   




        $('.step2 .queryDoc').keyup(function(){
            currentGaiqianPage_doctor =1;
                queryDoctor();
                renderDoctors();
        });

        $('.step2 .queryDoc').on('blur',function(){
                renderDoctors();
                $('.step2 .queryDoc_list').slideUp();
            });


        function queryDoctor(){
            var doctorName = $('.step2 .queryDoc').val();
            var departmentId = $('.step2 .subjectName option:selected').attr('subjectId');
                departmentId?departmentId:'';
                var outpatientType = outpatientType_text($('.step2 .patientType option:selected').text());
                outpatientType?outpatientType:''; 
            $.ajax({
                type:'post',
               // url:'http://192.168.1.138:8333/eht/admin/source/getSourceByParams',
                url:baseUrl + 'eht/admin/source/getSourceByParams',
                data:{
                    hospitalId:sessionStorage.getItem('hospitalId'),  
                    sourceDate:$('.step2 .changeDate').val(),
                    sourceTime:$('.step2 .sourceTime option:selected').text()=='上午'?'am':'pm',
                    departmentId: departmentId,
                    outpatientType:outpatientType,
                    doctorName:doctorName, 
                },  
                success:function(data){
                    if(data.count == 0|| data.list == [] || data.list.length == 0){
                        return false;
                    }
                   // console.log(data);
                        var doctors ='';
                        var list = data.list;
                        for(var i=0;i<list.length;i++){
                            doctors += '<li>'+list[i].doctorName+'</li>';
                        }
                    $('.step2 .queryDoc_list').slideDown();
                    $('.step2 .queryDoc_list').html(doctors);
                }
            });
        };


            $('.step2 .queryDoc_list').on('click','li',function(){
                $('.step2 .queryDoc').val($(this).text());
                $('.step2 .queryDoc_list').slideUp();
                renderDoctors();
            });

            function renderDoctors(){
                var doctorName = $('.step2 .queryDoc').val();
                var departmentId = $('.step2 .subjectName option:selected').attr('subjectId');
                    departmentId?departmentId:'';
                var outpatientType = outpatientType_text($('.step2 .patientType option:selected').text());
                        outpatientType?outpatientType:''; 
                    $.ajax({
                        type:'post',
                        //url:'http://192.168.1.138:8333/eht/admin/source/getSourceByParams',
                        url:baseUrl +'eht/admin/source/getSourceByParams',
                        data:{
                        hospitalId:sessionStorage.getItem('hospitalId'),  
                        sourceDate:$('.step2 .changeDate').val(),
                        sourceTime:$('.step2 .sourceTime option:selected').text()=='上午'?'am':'pm',
                        doctorName:doctorName, 
                        departmentId:departmentId,
                        outpatientType:outpatientType,
                        pageNum:currentGaiqianPage_doctor,
                        pageSize:pageNum
                        }, 
                        success:function(data){
                            if(data.count == 0|| data.list == [] || data.list.length == 0){
                                return false;
                            }
                            var totalPage = data.count; // 
                            hasgaiqianPage_doctor(currentGaiqianPage_doctor,totalPage);
                            var oldMoney = $('.step2 .hiddenRegisId').attr('oldMoney');
                            rendergaiqianRes(data.list,oldMoney);
                        } 
                    });
            };


            function hasgaiqianPage_doctor(nowPage,totalPageNum){
                if(totalPageNum > 1){
                    $('#gaiqianPage').show();
                    $('#gaiqianPage').myPagination({
                        currPage:nowPage,
                        pageCount:totalPageNum,
                        pageSize:pageNum,
                            panel: {
                            tipInfo_on: true,
                            tipInfo: '&nbsp;&nbsp;跳转至{input}/{sumPage}页',
                            prev:'上一页',
                            next:'下一页',
                            prev_on:true,
                            next_on:true,
                            tipInfo_css: {
                                width: '25px',
                                height: "20px",
                                border: "2px solid #f0f0f0",
                                padding: "0 0 0 5px",
                                margin: "0 5px 0 5px",
                                color: "#00cdb1"
                            }
                        },
                        ajax:{
                          onClick:function(pageNo){
                            // alert('当前页是：'+pageNo);
                             currentGaiqianPage_doctor = pageNo;
                             renderDoctors();
                          }
                        }
                    });
                }else{
                  $('#gaiqianPage').hide();
                }
            };   

   };
   changeSearch();

    function gaiqianCaozuo(){
        var gaiqianTimer;
            function getSourceText(sourceBtn){
                    var sourceText_obj;
                    var sourceId=  sourceBtn.attr('sourceId'); //拿
  
                    var tr = sourceBtn.parent().parent(); 
                    var time = tr.children('td').eq(1).text();
                        time = time.substring(0,time.length-1);
                    var payMoney  =tr.children('td').eq(5).text();
                    var payMoneyArr = payMoney.split('(');
                    var payDifference = payMoneyArr[0].substring(5,payMoneyArr[0].length);
                    var timeArr = time.split('(');
                        sourceText_obj = {
                            sourceTime:timeArr[1],
                            subjectName:tr.children('td').eq(2).text(),
                            outPatient: tr.children('td').eq(3).text(),  //outpatientType_text
                            doctorName: tr.children('td').eq(4).text(),
                            fee:tr.children('td').eq(5).text()
                        }    
                    return sourceText_obj;                 
            };


            function renderSourceMes(ele){

                var gaiqian_info = '';     
                    gaiqian_info += '<tr>'
                    + '<td>'+1+'</td>'
                    + '<td>'+$('.step1 .defaultTime').val() + '(' +getSourceText(ele).sourceTime+ ')'+'</td>'
                    + '<td>'+getSourceText(ele).subjectName+'</td>'
                    + '<td>'+getSourceText(ele).outPatient+'</td>'
                    + '<td>'+getSourceText(ele).doctorName+'</td>'
                    + '<td>'+getSourceText(ele).fee+'</td>'
                    + '<td>'+'<button class="gaiqianBtn blueBg">改签</button>'+'</td>'
                    +'</tr>';                
                $('.step2 .gaiqianMes').html(gaiqian_info); 
                $('.step2 .gaiqianMes').find('.gaiqianBtn').attr('sourceId',ele.attr('sourceId'));
            };

            function replaceSelectText(ele){
                var sourceTime_option = $('.step2 .sourceTime option');
                sourceTime_option.each(function(index,element){
                    if(getSourceText(ele).sourceTime == $(element).text()){
                        $(element).attr('selected',true);
                    }
                });
                var subject_option = $('.step2 .subjectName option');
                subject_option.each(function(index,element){
                    if(getSourceText(ele).subjectName == $(element).text()){
                        $(element).attr('selected',true);
                    }
                });
                var patientType_option = $('.step2 .patientType option');
                var addPatient_option = $('<option>'+getSourceText(ele).outPatient+'</option>');
                $('.step2 .patientType').append(addPatient_option);
                addPatient_option.attr('selected',true);
                patientType_option.each(function(index,element){
                    if(addPatient_option.text() == $(element).text()){
                        addPatient_option.remove();
                        $(element).attr('selected',true);
                        return false;
                    }
                });    
                $('.step2 .queryDoc').val(getSourceText(ele).doctorName);      
            };


            $('.gaiqianMes').on('click','.gaiqianBtn',function(){
                    var self = this;
                if($(this).attr("sourceState")==2){
                  swal({
                      title: "温馨提示：",
                      text: "该医生因故缺诊,您可以选择其他医生",
                      timer: 2000,
                      showConfirmButton: false
                      });
                    return false;
                }
                renderSourceMes($(self));
                replaceSelectText($(self));
                $('.queryDoc').val('')
                $('#gaiqianPage').hide();
                // console.log($('.step2 .changeDate').attr('contactIdcard'))
                
                $.ajax({
                    type:"post",
                    //url:baseUrl + 'eht/admin/order/updateOrder',
                    url:baseUrl + 'eht/admin/order/clickAddOrder',
                    data:{
                    // registrationId: $('.step2 .regis_details .hiddenRegisId').val(), //
                        // contactName:$('.step1 .user_name').val(),
                        contactName:$('.step2 .sourceTime option:selected').attr('contactName'),
                        // contactIdcard:$('.step1 .user_id').val(),
                        contactIdcard: $('.step2 .changeDate').attr('contactIdcard'),

                        sourceId: $(self).attr('sourceId'),
                        registrarUserId:sessionStorage.getItem('userId')
                        },
                    success:function(data){
                        // alert('click gaiqianBtn');
                        // console.log(data);
                        $('.takenumMask').css({'display':'block'});
                        $('.takenum').css({'display':'none'});
                        $('.takenumMask').css("z-index",2)
                        $('.takenum_gaiqian').css({'display':'block'});
                        data.addStatus==1?$('.takenum_gaiqian .jiahao').show():$('.takenum_gaiqian .jiahao').hide();
                        // gaiqianTimer = setTimeout(function(){
                        //     $('.takenumMask').css({'display':'none'});
                        // },10000);
                        var takenum_info = $('<h2 style="text-align:center;list-style:none;"><span style="font-weight:bold;font-size:24px">'+sessionStorage.getItem("hospitalName")+'</span><br/><span>挂号凭证</span></h2>'
                            // +'<li style="list-style:none;padding-left:5px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                            +'<li style="list-style:none;font-size:14px;">'+"就诊时间："+data.registrationDate + "&nbsp;&nbsp;&nbsp;" +(data.dateTime=='pm'?'下午':'上午')+'</li>'
                            +'<hr style="border-bottom:1px dashed #000;">'
                            +'<li style="list-style:none;font-size:14px;">'+"取号排序 ："+'<span>'+data.code+'</span>'+"(窗)"+'</li>'
                            +'<li style="list-style:none;margin-top:10px;font-size:14px;">门诊号：<span style="padding-right:10px;">'+data.outpatientNo+'</span>就诊人：<span>'+data.contactName+'</span></li>'
                            // +'<li style="list-style:none;padding-left:5px;">' + "门诊类别 ：" + '<span>'+(outpatientType(data.outpatientType))+'</span>'+'<li>'
                            +'<li style="list-style:none;margin-top:10px;font-size:14px;">'+"科室："+'<span style="padding-right:10px;">'+data.subjectName+'</span>号别：<span>'+(outpatientType(data.outpatientType))+'</span></li>'
                            +'<li style="list-style:none;margin-top:10px;font-size:14px;">诊查费/挂号费：<span>'+(data.totlePay/100).toFixed(2)+'</span></li>'
                            +'<hr style="border-bottom:1px dashed #000;">'
                            +'<li style="list-style:none;font-size:14px;">挂号时间：<span>'+data.createTime+'</span></li>'
                            +'<li style="list-style:none;font-size:14px;">收据号：<span>'+data.receiptId+'</span><li>'
                            // +'<li style="list-style:none;padding-left:5px;">' + "主治医师 ：" + data.doctorName+'</li>'
                            // +'<li style="list-style:none;padding-left:5px;">' + "就诊人 ：" + data.contactName+'</li>'
                            // +'<li style="list-style:none;padding-left:5px;">' + "身份证号 ："+'<span>'+formatIdenticard(data.contactIdcard)+'</span></li>'
                            +'<li style="list-style:none;font-size:14px;">' + "就诊地址："+(data.workStorey==null?' ':data.workStorey)+'</li>'
                            // +'<li style="list-style:none;padding-left:5px;">收据号：<span>'+data.receiptId+'</span><li>'
                            // +'<li class="hidden">'+data.registrationId+'</li>'
                            +'</li>')
                        $('.takenum_gaiqian .takenum_ul').html(takenum_info); 
                        // data.HospitalLogo?$('.takenum_gaiqian .hospi_logo').attr('src',baseUrl+'E2306'+data.HospitalLogo):$('.takenum_gaiqian .hospi_logo').css({'display':'none'});
                    // $('.takenum_gaiqian .hospi_logo').attr('src',data.HospitalLogo);
                        $('.takenum .confirmTakenum').show();
                        $('.takenum .confirmTakejiahaonum').hide();
                        $('.takenum .confirmTakegaiqiannum').hide();
                        $('.takenum_gaiqian .confirmTakenum').attr({'sourceId':$(self).attr('sourceId')});
                     //   $('.takenum_gaiqian .confirmTakenum').attr({'sourceId':$(self).attr('sourceId')});
                    },
                });
                
            })
              

            $('.takenum_gaiqian .confirmTakenum').click(function(){
                // clearInterval(gaiqianTimer);
                // $('.takenumMask').hide();
                $('.takenumMask').css({'display':'none'});
                var self = this;
                // console.log($(self).attr("sourceId"))
                 LODOP=getLodop();
                  LODOP.PRINT_INIT("assx");
                  //LODOP.SET_PRINT_STYLE("FontSize",18);
                  //LODOP.SET_PRINT_STYLE("Bold",1);
                  //LODOP.ADD_PRINT_TEXT(50,231,260,39,"");
                  LODOP.SET_PRINT_PAGESIZE(1,800,1000,"");
                  var strHTML="<body>"+document.getElementById("getTitle1").innerHTML+"</body>";
                  // LODOP.ADD_PRINT_HTM(0,0,100%,100%,strHTML);
                  // LODOP.ADD_PRINT_HTM("10mm","8mm","RightMargin:10mm","BottomMargin:10mm",strHTML);
                  LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHTML);
                LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
                var result = LODOP.PRINT();
                setTimeout(function(){
                  var exist = LODOP.GET_VALUE("PRINT_STATUS_EXIST",result);
                  var busy = LODOP.GET_VALUE("PRINT_STATUS_BUSY",result);
                  console.log(exist,busy)
                  if(exist==1&&busy==1){
                    $('.takenumMask').css({'display':'none'});
                    return false;
                  }else{ 
                        //支付
                      localStorage.clear()
                      $.ajax({
                          type:"post",
                          url:baseUrl +'eht/admin/order/updateTakeOrder',
                          data:{
                                  registrationId: $('.step2 .regis_details .hiddenRegisId').val(), //
                                  // contactName:$('.step1 .user_name').val(),
                                  contactName:$('.step2 .sourceTime option:selected').attr('contactName'),
                                  // contactIdcard:$('.step1 .user_id').val(),
                                  contactIdcard: $('.step2 .changeDate').attr('contactIdcard'),
                                  // sourceId: $(self).attr('sourceId')
                                  sourceId:$(self).attr("sourceId"),

                                  registrarUserId:sessionStorage.getItem('userId')
                          },
                          success:function(data){
                                  // console.log(data);
                               
                                  swal({
                                      title: "温馨提示：",
                                      text: "您已改签成功!",
                                      timer: 2000,
                                      showConfirmButton: false
                                  });
                                  // console.log(data.registrationId)
                                  $(".user_regisId").val(data.registrationId)

                                  $('.step2 .gaiqianMes').find('.gaiqianBtn').removeClass('blueBg')
                                  $('.step2 .gaiqianMes').find('.gaiqianBtn').addClass('grayBg'); 
                                  $('.step2 .gaiqianMes').find('.gaiqianBtn').attr('disabled',true);
                                  $('.step2').hide();
                                  emptyChange(); //把step2页面的搜索框信息清空
                                  $('.step1').css({'display':'block'});
                              $('.registerInfo .operate').children('.checkBtn').addClass('grayBg');
                              $('.registerInfo .operate').children('.changeBtn').addClass('blueBg');
                              $('.registerInfo .operate').children('.quitBtn').addClass('redBg');
                                  
                                  hasRegisId();
                                  
                                // var register_tds = $('<tr>'
                                //     +'<td>'+(i+1)+'</td>'
                                // +'<td>'+data.registrationId+'</td>'
                                // +'<td>'+data.registrationDate+'</td>'+'<td>'+(data.dateTime=='pm'?'下午':'上午')+'</td>'
                                // +'<td>'+data.subjectName+'</td>' +'<td>'+(outpatientType(data.outpatientType))+'</td>' +'<td>'+data.doctorName+'</td>'
                                // +'<td>'+formatFee(data.totlePay)+'</td>' +'<td>'+data.contactName+'</td>' +'<td>'+(data.appointmentType==0?'APP':'窗口')+'</td>'
                                // +'<td class="operate">'
                                // + '<button class="checkBtn m_5" index="0">取号</button>' 
                                // + '<button class="changeBtn m_5" index="1">改签</button>'
                                // + '<button class="quitBtn m_5" index="2">退号</button>'
                                // +'</td>'
                                // +'</tr>');  
                                // console.log(register_tds)

                                // $('.registerInfo').append(register_tds); 
                                    

                                  $('#register_window>.divider').css({'top':'225px'}); 
                                  gaiqianOver();
                                  getNum();
                                 // calculateMoney();
                         
                          }
                      });
                      $('.takenumMask').css({'display':'none'});
                      }
                    },2000)
            });

 
            var gaiqianOver = function(){
                var name = $('.step1 .user_name').val(),
                    idCardNo = $('.step1 .user_id').val();
                $.ajax({
                        type:'GET',
                        url:baseUrl+'eht/admin/order/selectOrder',
                        data:{
                            name:name,
                            idCardNo:idCardNo,
                            hospitalId:sessionStorage.getItem('hospitalId')
                        },
                        success:function(data){   
                            $('.registerInfo').empty();               
                            for(var i =0;i<data.length;i++){         
                                    var item = data[i];
                                    var register_tds = $('<tr>'
                                        +'<td>'+(i+1)+'</td>'
                                    +'<td>'+item.registrationId+'</td>'
                                    +'<td>'+item.registrationDate+'</td>'+'<td>'+(item.dateTime=='pm'?'下午':'上午')+'</td>'
                                    +'<td>'+item.subjectName+'</td>' +'<td>'+(outpatientType(item.outpatientType))+'</td>' +'<td>'+item.doctorName+'</td>'
                                    +'<td>'+formatFee(item.totlePay)+'</td>' +'<td>'+item.contactName+'</td>' +'<td>'+(item.appointmentType==0?'APP':'窗口')+'</td>'
                                    +'<td class="operate">'
                                    + '<button class="checkBtn m_5" index="0">取号</button>' 
                                    + '<button class="changeBtn m_5" index="1">改签</button>'
                                    + '<button class="quitBtn m_5" index="2">退号</button>'
                                    +'</td>'
                                    +'</tr>');   
                                    $('.registerInfo').append(register_tds); 
      
                                    $('.registerInfo .operate').eq(i).children('button').attr('regisId',item.registrationId); 
                                    $('.registerInfo tr').eq(i).children('td').eq(4).attr('subjectId',item.subjectId);     
                                    //
                                    if(item.orderStatus == '1'){
                                    //  alert(1)
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('mainBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');//已
                                    }else if(item.orderStatus == '2'){
                                        //   alert(2)
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); //已
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').removeAttr('index');
                                        }else if(item.orderStatus == '5'){
                                        //  alert(5)
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg'); //已
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').removeAttr('index'); //
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').removeAttr('index');
                                        }else if(item.orderStatus == '3'){
                                        $('.registerInfo .operate').eq(i).children('.checkBtn').addClass('grayBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').addClass('blueBg');
                                        $('.registerInfo .operate').eq(i).children('.quitBtn').addClass('redBg');
                                        $('.registerInfo .operate').eq(i).children('.changeBtn').attr("orderStatus",item.orderStatus)
                                        }
                                        
                                };                  
                    },
                });
            };
    };
    gaiqianCaozuo();


    $('.btn_back').click(function(){
        $('.step2').hide();
        $('#register_window>.divider').css({'top':'225px'});
        $('#gaiqianPage').hide();
        emptyChange();
        $('.step1').show();
    });


      function getNum(){
          $.ajax({
            type:'get',
            //url:'http://192.168.1.202:8110/eht/admin/order/getNumBydate',
           // url: 'http://192.168.1.51:8333/eht/admin/order/getNumBydate',
            url: baseUrl + 'eht/admin/order/getNumBydate',
            data:{hospitalId:sessionStorage.getItem('hospitalId')},
            success:function(data){
              // console.log(data)
                var regis_mesHtml = 
                  $('<li class="fl">'+"当天窗口挂号"+'<span class="orange">'+data.orderNumWindow+'</span>'+"&nbsp;张 ; "+'</li>'
                    + '<li class="fl">'+"改签"+'<span class="red">'+data.changeNumWindow+'</span>&nbsp;张 ; '+'</li>'
                    + '<li class="fl">'+"退号"+'<span class="blue">'+data.returnNumWindow+'</span>&nbsp;张 ; '+'</li>'	 	
                    + '<li class="fl">'+"费用"+'<span class="red">'+formatFee(data.windowPay)+'</span>&nbsp;元 ; '+'</li>');	 					
                $('.regis_num').html(regis_mesHtml);
                var app_mesHtml = 
                  $('<li class="fl">'+"当天app挂号"+'<span class="orange">'+data.orderNumApp+'</span>'+"&nbsp;张 ;"+'</li>'
                    + '<li class="fl">'+"改签"+'<span class="red">'+data.changeNumApp+'</span>&nbsp;张 ; '+'</li>'
                    + '<li class="fl">'+"退号"+'<span class="blue">'+(data.returnNumApp==null?0.00:data.returnNumApp)+'</span>&nbsp;张 ; '+'</li>'	
                    + '<li class="fl">'+"费用"+'<span class="red">'+formatFee(data.appPay)+'</span>&nbsp;元 ; '+'</li>');	 		
                $('.app_num').html(app_mesHtml);
                 $('.regis_pay>span').text(formatFee(data.windowPay+data.appPay));
              }
          });
          $.ajax({
            type:'get',
            url:baseUrl+'eht/admin/HospitalCount/selectMoneyByRegistrar',
            data:{
              hospitalId:sessionStorage.getItem('hospitalId'),
              registrarUserId:sessionStorage.getItem('userId')
            },
            success:function(data){
              var username = sessionStorage.getItem('username')
              var gauhaoInfo = $('<li class="fl">'+username+"当天挂号"+'<span class="orange">'+data.num+'</span>'+"&nbsp;张 ; "+'</li>'
                    + '<li class="fl">'+"挂号金额"+'<span class="red">'+formatFee(data.money)+'</span>&nbsp;元 ; '+'</li>'
                    + '<li class="fl">'+"改签"+'<span class="blue">'+data.changeNum+'</span>&nbsp;张 ; '+'</li>'   
                    + '<li class="fl">'+"改签金额"+'<span class="red">'+formatFee(data.changeMoney)+'</span>&nbsp;元 ; '+'</li>'
                    +'<li class="fl">'+"退号"+'<span class="red">'+data.returnNum+'</span>&nbsp;张; '+'</li>'
                    +'<li class="fl">'+"退号金额"+'<span class="red">'+formatFee(data.returnMoney)+'</span>&nbsp;元 ;'+'</li>'
                    +'<li class="fl">'+"总金额"+'<span class="red">'+formatFee(data.money+data.changeMoney-data.returnMoney)+'</span>&nbsp;元 ;'+'</li>');
              $(".gauhaoInfo").html(gauhaoInfo);
            }
          })
      };
      // getNum();

     setInterval(getNum,2000)
     // 
//    


      //底部收款显示
//       function calculateMoney(){
//         $.ajax({
//             type:'get',
//            //  http://192.168.1.51:8333/
//             //url:'http://192.168.1.51:8333/eht/admin/payment/getMoneyBydate',
//              url:baseUrl +'eht/admin/payment/getMoneyBydate',
//              data:{hospitalId:sessionStorage.getItem('hospitalId')},
//             success:function(data){
//               $('.regis_pay>span').text(formatFee(data.totalPay));
//             }
//         });
//       };
//       calculateMoney();
// });
      // function calculateMoney(){
      //   $.ajax({
      //       type:'get',
      //      //  http://192.168.1.51:8333/
      //       //url:'http://192.168.1.51:8333/eht/admin/payment/getMoneyBydate',
      //        url:baseUrl +'eht/admin/order/getNumBydate',
      //        data:{hospitalId:sessionStorage.getItem('hospitalId')},
      //       success:function(data){
      //        // $('.regis_pay>span').text(formatFee(data.windowPay));
      //       }
      //   });
      // };
      // calculateMoney();
});



