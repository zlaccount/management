
/*
2017-10-11 
*/

 var baseUrl = 'http://www.51edoctor.cn/';
 //var baseUrl = 'http://192.168.1.51:8333/';

function time(){
    var date = new Date();
    var year = date.getFullYear();
    var month=date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var data=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentTime = year + "-" + month + "-" + data + "&nbsp;&nbsp;" + hour + ":" + minute + ":" +second;
    $(".schedule_time_down").html(currentTime);
    //$("caption span").html("("+year + "-" + month + "-" + data+")" +'~' + getYear(6));
}

$(function(){
    var username = sessionStorage.getItem('username');
    var hospitalId = sessionStorage.getItem('hospitalId');
    if(!username || !hospitalId){
        window.location.href = "login.html"
    }
    
    $('.alertMask').hide();
    $('.alertBox').hide();
    $('.schedule_search>.schedule_name').eq(1).hide();
    var width=$('.alertBox').width();
    var height=$('.alertBox').height();

    var h=document.documentElement.clientHeight;
    var w=document.documentElement.clientWidth;
    $('.alertBox').css({ 'top': (h-height) / 2 + 'px', 'left': (w-width) / 2 + 'px' });
    $('.alert-close').click(function(){
        $('.alertMask').hide();
        $('.alertBox').hide();
    })
})


   $('.schedule_name .department').keyup(function(){
      if($(".table_schedule_list").is(":visible")&&$(".table_schedule_user").is(":hidden")&&$(".table_schedule_doc").is(":hidden")){
          selectBySubName();
      }else if($(".table_schedule_list").is(":hidden")&&$(".table_schedule_user").is(":visible")&&$(".table_schedule_doc").is(":hidden")){
          selectByUserName();
      }else if($(".table_schedule_list").is(":hidden")&&$(".table_schedule_user").is(":hidden")&&$(".table_schedule_doc").is(":visible")){
          selectByDoctorName();
      }
   });
    //科室模糊查询
    function selectBySubName(){
        $.ajax({
            url:baseUrl+'eht/admin/scheduling/selectBySubName',
            type:'post',
            data:{
                 hospitalId:sessionStorage.getItem("hospitalId"),
                subName:$('.schedule_name .department').val(),
            },
            success:function(data){
                if(data== [] || data.length == 0 ){
                        return false;
                }
                var list = '';
                for(var i =0;i<data.length;i++){
                    list += '<li subjectId='+data[i].subjectcontents+'>'+data[i].subName+'</li>';
                }
                $('.schedule_name .queryDepart').slideDown();
                $('.schedule_name .queryDepart').html(list);
                $('.schedule_name .queryDepart').on('click','li',function(){
                    $('.schedule_name .department').val($(this).text());
                    $('.schedule_name .department').attr('subjectId',$(this).attr('subjectId'));
                    //getSubSchdulingBySubId($(this).attr('subjectId'));
                     $('.schedule_name .queryDepart').slideUp();
                    // renderList();
                });
                $('.schedule_name .department').on('blur',function(){
                       // renderList();
                    $('.schedule_name .queryDepart').slideUp();
                });
            },
        });
    };

    //排班员模糊查询
    function selectByUserName(){
      $.ajax({
            url:baseUrl+'/eht/admin/scheduling/selectByUserName',
            type:'post',
            data:{
                 hospitalId:sessionStorage.getItem("hospitalId"),
                 userName:$('.schedule_name .department').val(),
                 subjectcontents:$(".user_mess").find(".recordId").eq(0).attr("subject")
            },
            success:function(data){
                if(data== [] || data.length == 0 ){
                        return false;
                }
                var list = '';
                for(var i =0;i<data.length;i++){
                    list += '<li userId='+data[i].submituserid+'>'+data[i].userName+'</li>';
                }
                $('.schedule_name .queryDepart').slideDown();
                $('.schedule_name .queryDepart').html(list);
                $('.schedule_name .queryDepart').on('click','li',function(){
                    $('.schedule_name .department').val($(this).text());
                    $('.schedule_name .department').attr('userId',$(this).attr('userId'));
                    //getSubSchdulingBySubId($(this).attr('subjectId'));
                    $('.schedule_name .queryDepart').slideUp();
                    // renderList();
                });
                $('.schedule_name .department').on('blur',function(){
                       // renderList();
                    $('.schedule_name .queryDepart').slideUp();
                });
            },
        });
    }
    //医生模糊查询
    function selectByDoctorName(){
        $.ajax({
          url:baseUrl+'/eht/admin/scheduling/selectByDoctorName',
          type:'post',
          data:{
            hospitalId:sessionStorage.getItem("hospitalId"),
            doctorName:$('.schedule_name .department').val(),
            subId:$("caption>input.subId").val()
          },
          success:function(data){
              if(data== [] || data.length == 0 ){
                      return false;
              }
              var list = '';
              for(var i =0;i<data.length;i++){
                  list += '<li doctorId='+data[i].doctorId+'>'+data[i].doctorName+'</li>';
              }
              $('.schedule_name .queryDepart').slideDown();
              $('.schedule_name .queryDepart').html(list);
              $('.schedule_name .queryDepart').on('click','li',function(){
                  $('.schedule_name .department').val($(this).text());
                  $('.schedule_name .department').attr('doctorId',$(this).attr('doctorId'));
                  //getSubSchdulingBySubId($(this).attr('subjectId'));
                   $('.schedule_name .queryDepart').slideUp();
                  // renderList();
              });
              $('.schedule_name .department').on('blur',function(){
                     // renderList();
                  $('.schedule_name .queryDepart').slideUp();
              });
          },
        });
    }

    var currentpage = 1;

   $('.audit_query').unbind('click').click(function(){
      if($(".table_schedule_list").is(":visible")&&$(".table_schedule_user").is(":hidden")&&$(".table_schedule_doc").is(":hidden")){
          selectBysubId();
      }else if($(".table_schedule_list").is(":hidden")&&$(".table_schedule_user").is(":visible")&&$(".table_schedule_doc").is(":hidden")){
          selectByUserId();
      }else if($(".table_schedule_list").is(":hidden")&&$(".table_schedule_user").is(":hidden")&&$(".table_schedule_doc").is(":visible")){
          selectByDoctorId();
      }
       //  var subjectName = $('.schedule_name .department').val();
       //  //alert(subjectName)
       //  var time=$("#start").val();//
       //  var date1 = new Date();
       //  var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//
       //  time==""?time=time1:time;
       //  var getday = DateDiff(time,time1); //
       // // alert(getday);
       //  if(!subjectName || subjectName =='' || subjectName ==' ' || subjectName == undefined){
       //       $('.smallMask').show();
       //          $('.smallBox').show();
       //          $(".small_text").html("请输入具体的科室名称");
       //          $(".btn_return").hide();
       //          $(".btn_sure").click(function () {
       //              $('.smallMask').hide();
       //              $('.smallBox').hide();
       //          })
       //          return false;
       //  }
       //  $(".table_schedule_list").hide();
       //  $(".table_schedule_user").hide();
       //  $(".table_backToList").hide();
       //  $(".table_submit_one").hide();
       //  $(".table_schedule_doc").show();
       //  $(".table_backToUser").show();
       //  $(".table_submit").show();
       //  if($('.schedule_name .department').attr('subjectId')){
       //      //querySchedule(currentpage,$('.schedule_name .department').attr('ids'),time);
       //      getSubByname(subjectName,$(".department").attr("ids"));
       //      $("caption>input.subId").val($('.schedule_name .department').attr('subjectId'));
       //     //  querySchedule(currentpage,$('.schedule_name .department').attr('subjectId'),startTime);
       //  }
       //  if($('.schedule_name .department').attr('subjectId') == undefined || !($('.schedule_name .department').attr('subjectId'))){
       //       $.ajax({
       //             url:baseUrl+'eht/admin/scheduling/getSubByname',
       //              type:'post',
       //              data:{
       //                   hospitalId:sessionStorage.getItem("hospitalId"),
       //                  // departmentName:$('.schedule_name .department').val()
       //                  name:$('.schedule_name .department').val(),
       //                  type:1,
       //                  parentcode:''
       //              },
       //              beforeSend:function(XMLHttpRequest){

       //              },
       //              success:function(data){
       //                  if(data== [] || data.length == 0 ){
       //                          return false;
       //                  }
       //                  for(var i=0;i<data.length;i++){
       //                      if($('.schedule_name .department').val() === data[i].subjectName){
       //                       // alert($('.schedule_name .department').val());
       //                          $('.schedule_name .department').attr('subjectId',data[i].departmentId);
       //                          getSubSchdulingBySubId(data[i].departmentId);
       //                          getSubByname(data[i].subjectName,$(".department").attr("ids"));
       //                          $("caption>input.subId").val(data[i].departmentId);
       //                         // querySchedule(currentpage,$('.schedule_name .department').attr('subjectId'),startTime);
       //                          break;
       //                      }
       //                  }
       //              },
       //       });
       //  }
   });
   
   $('.audit_reset').unbind('click').click(function(){
      if($(".table_schedule_list").is(":visible")&&$(".table_schedule_user").is(":hidden")&&$(".table_schedule_doc").is(":hidden")){
          location.reload();
      }else if($(".table_schedule_list").is(":hidden")&&$(".table_schedule_user").is(":visible")&&$(".table_schedule_doc").is(":hidden")){
          $(".department").val("").attr("userid","");
          $("#start").val(laydate.now());
          userMessDetail(1,$(".user_mess .recordId").eq(0).attr("subject"));
      }else if($(".table_schedule_list").is(":hidden")&&$(".table_schedule_user").is(":hidden")&&$(".table_schedule_doc").is(":visible")){
          $(".department").val("").attr("doctorid","");
          $("#start").val(laydate.now());
          var date = new Date();
          var time=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();//
          var id = $(".record_Id").val();
          listTop1(1,0,time,id,'undefined');
      }
   })




   function selectBysubId1(){
        $.ajax({
          url:baseUrl+'/eht/admin/scheduling/selectBysubId',
          type:'post',
          data:{
              hospitalId:sessionStorage.getItem("hospitalId"),
              subjectcontents:$('.schedule_name .department').attr('subjectId')
          },
          success:function(data){
              $(".list_mess").empty();
             if(data.length==0){
                return;
              }
              var html="";
              //后台暂时未设置排班员用户名
                var checkState;
                switch(parseInt(data.auditState)){
                  case 1:
                    checkState="已审核";
                    //审核按钮添加class=checkSucc
                    html+=`
                      <tr><td subject="${data.subjectcontents}" ids="${data.id}" class="subjectId">1</td><td class="subName">${data.subName}</td><td>${data.createtime.slice(0,-3)}</td><td style="color:#2bd1c7;">${checkState}</td><td><button class="audit_detail">查看详情</button><button class="checkState checkSucc">一键全部审核</button></td></tr>
                    `;
                    break;
                  case 0:
                    //审核按钮添加class=checkFail
                    checkState="未审核";
                    html+=`
                      <tr><td subject="${data.subjectcontents}" ids="${data.id}" class="subjectId">1</td><td class="subName">${data.subName}</td><td>${data.createtime.slice(0,-3)}</td><td style="color:red;">${checkState}</td><td><button class="audit_detail">查看详情</button><button class="checkState checkFail">一键全部审核</button></td></tr>
                    `;
                    break;
                }
              $(".list_mess").html(html);
          }
        })
   }
   //一级界面点击查询搜索
   function selectBysubId(){
        var subjectName = $('.schedule_name .department').val();
        //alert(subjectName)
        var time=$("#start").val();//
        var date1 = new Date();
        var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//
        time==""?time=time1:time;
        var getday = DateDiff(time,time1); //
        if(!subjectName || subjectName =='' || subjectName ==' ' || subjectName == undefined){
             // $('.smallMask').show();
             //    $('.smallBox').show();
             //    $(".small_text").html("请输入具体的科室名称");
             //    $(".btn_return").hide();
             //    $(".btn_sure").click(function () {
             //        $('.smallMask').hide();
             //        $('.smallBox').hide();
             //    })
             //    return false;
             location.reload();
             return false;
        }
        if($('.schedule_name .department').attr('subjectId')){
            selectBysubId1();
        }
        if($('.schedule_name .department').attr('subjectId') == undefined || !($('.schedule_name .department').attr('subjectId'))){
             $.ajax({
                url:baseUrl+'eht/admin/scheduling/selectBySubName',
                type:'post',
                data:{
                     hospitalId:sessionStorage.getItem("hospitalId"),
                     subName:$('.schedule_name .department').val(),
                },
                success:function(data){
                    if(data== [] || data.length == 0 ){
                          return false;
                    }
                    for(var i=0;i<data.length;i++){
                        if($('.schedule_name .department').val() === data[i].subName){
                            $('.schedule_name .department').attr('subjectId',data[i].subjectcontents);
                            selectBysubId1();
                            break;
                        }
                    }
                },
             });
        }
   }

   function selectByUserId1(userId){
      var time=$("#start").val();//
      var date1 = new Date();
      var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//
      time==""?time=time1:time;
      $.ajax({
        url:baseUrl+'/eht/admin/scheduling/selectByUserId',
        type:'post',
        data:{
            hospitalId:sessionStorage.getItem("hospitalId"),
            time:time,
            subjectcontents:$(".sub_Id").val(),
            userId:userId
        },
        success:function(data){
          if(data== [] || data.length == 0 ){
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("此时间段无提交记录");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
            return false;
          }
          $(".user_mess").empty();
          var html;
          for(var i=0;i<data.length;i++){
              var checkState;
              var color;
              if(data[i].auditState==1){
                  html+='<tr><td subject='+data[i].subjectcontents+' ids='+data[i].id+' class="recordId"><input type="hidden" value="'+data[i].subName+'" /><span>'+(i+1)+'</span></td><td>'+data[i].subName+'</td><td>'+data[i].userName+'</td><td>'+data[i].userMobileno+'</td><td>'+data[i].createtime.slice(0,-3)+'</td><td style="color:#2bd1c7;">已审核</td><td><button class="audit_detail_list">查看详情</button><button class="checkSucc1">审核</button></td></tr>';
              }else if(data[i].auditState==0){
                  html+='<tr><td subject='+data[i].subjectcontents+' ids='+data[i].id+' class="recordId"><input type="hidden" value="'+data[i].subName+'" /><span>'+(i+1)+'</span></td><td>'+data[i].subName+'</td><td>'+data[i].userName+'</td><td>'+data[i].userMobileno+'</td><td>'+data[i].createtime.slice(0,-3)+'</td><td style="color:red;">未审核</td><td><button class="audit_detail_list">查看详情</button><button class="checkFail1">审核</button><button class="reject">拒绝</button></td></tr>';
              }else if(data[i].auditState==2){
                  html+='<tr><td subject='+data[i].subjectcontents+' ids='+data[i].id+' class="recordId"><input type="hidden" value="'+data[i].subName+'" /><span>'+(i+1)+'</span></td><td>'+data[i].subName+'</td><td>'+data[i].userName+'</td><td>'+data[i].userMobileno+'</td><td>'+data[i].createtime.slice(0,-3)+'</td><td style="color:red;">已拒绝</td><td><button class="audit_detail_list">查看详情</button><button class="reject" style="background-color:#ccc;">已拒绝</button></td></tr>';

              }
          }
          $(".user_mess").html(html);
          $(".user_page").hide();
        }
      })
   }

   //二级界面点击查询搜索
   function selectByUserId(){
      var userName = $('.schedule_name .department').val();
      var time=$("#start").val();//
        var date1 = new Date();
        var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//
        time==""?time=time1:time;
        var getday = DateDiff(time,time1); //
        if(!userName || userName =='' || userName ==' ' || userName == undefined){
           // $('.smallMask').show();
           //    $('.smallBox').show();
           //    $(".small_text").html("请输入具体的排班员姓名");
           //    $(".btn_return").hide();
           //    $(".btn_sure").click(function () {
           //        $('.smallMask').hide();
           //        $('.smallBox').hide();
           //    })
           //    return false;
           $(".department").val("").attr("userid","");
            selectByUserId1($('.schedule_name .department').attr('userId'));
            return false;
        }
        if($('.schedule_name .department').attr('userId')){
            selectByUserId1($('.schedule_name .department').attr('userId'));
            $(".department").val("").attr("userid","");
        }
        if($('.schedule_name .department').attr('userId') == undefined || !($('.schedule_name .department').attr('userId'))){
           $.ajax({
              url:baseUrl+'/eht/admin/scheduling/selectByUserName',
              type:'post',
              data:{
                   hospitalId:sessionStorage.getItem("hospitalId"),
                   userName:$('.schedule_name .department').val(),
                   subjectcontents:$(".user_mess").find(".recordId").eq(0).attr("subject")
              },
              success:function(data){
                  if(data== [] || data.length == 0 ){
                          return false;
                  }
                  for(var i =0;i<data.length;i++){
                      if($('.schedule_name .department').val() === data[i].userName){
                          $('.schedule_name .department').attr('userId',data[i].submituserid);
                          selectByUserId1($('.schedule_name .department').attr('userId'));
                          $(".department").val("").attr("userid","");
                          break;
                      }
                  }
              }
            })
        }
   }

   //审核三级界面 选择查出的医生id 所有排班记录 三级界面点击查询搜索
   function selectByDoctorId(){
      var doctorName = $('.schedule_name .department').val();
      var time=$("#start").val();//
      var date1 = new Date();
      var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//
      time==""?time=time1:time;
      var getday = DateDiff(time,time1); //
      var id = $(".record_Id").val();
      if(!doctorName || doctorName =='' || doctorName ==' ' || doctorName == undefined){
          // $('.smallMask').show();
          // $('.smallBox').show();
          // $(".small_text").html("请输入医生姓名");
          // $(".btn_return").hide();
          // $(".btn_sure").click(function () {
          //     $('.smallMask').hide();
          //     $('.smallBox').hide();
          // })
          // return false;
          $(".department").val("").attr("doctorid","");
          //var date = new Date();
          // var time=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();//
          listTop1(1,getday,time,id,'undefined');
          return;
      }
      if($('.schedule_name .department').attr('doctorid')){
          listTop1(1,getday,time,id,$('.schedule_name .department').attr('doctorid'));
      }
      if($('.schedule_name .department').attr('doctorid') == undefined || !($('.schedule_name .department').attr('doctorid'))){
          $.ajax({
            url:baseUrl+'/eht/admin/scheduling/selectByDoctorName',
            type:'post',
            data:{
              hospitalId:sessionStorage.getItem("hospitalId"),
              doctorName:$('.schedule_name .department').val(),
              //id:$("caption>input.record_Id").val()
              subId:$("caption>input.subId").val()
            },
            success:function(data){
                  if(data== [] || data.length == 0 ){
                        return false;
                  }
                  for(var i=0;i<data.length;i++){
                      if($('.schedule_name .department').val() === data[i].doctorName){
                          $('.schedule_name .department').attr('doctorid',data[i].doctorId);
                          listTop1(1,getday,time,id,$('.schedule_name .department').attr('doctorid'));
                          break;
                      }
                  }
              },
          });
      }
   }
   

   function querySchedule(page,ID,doctorId,startTime){
        // if(!ID||ID=='undefined'||ID==''){
        //     return false;
        // }
       // var list=[{}];
       //   getYear(1);
       //  list[0].CurrentPage=page;
       //  list[0].totalPages="8";
       //  list[0].hospitalId = sessionStorage.getItem('hospitalId');  
       //  list[0].subjectId = subID;
       //  //list[0].subjectId = $('.schedule_name .department').attr('subjectId');
       //  //doctor_name doctor_duty
       //  list[0].doctor_name ='';
       //  list[0].doctor_duty ='';
       //  startTime=="undefined"||startTime==undefined||startTime==''?list[0].sourceDate="":list[0].sourceDate=startTime;
       //  if(!list[0].subjectId || list[0].subjectId == undefined){
       //      return false;
       //  } 
       // $('.schedule_table').show();
        if(doctorId=="undefined"||doctorId==undefined){
            doctorId="";
        }
        $.ajax({
            //url:baseUrl+'eht/admin/scheduling/CurrentSchedulingQuery',
            url:baseUrl+'eht/admin/scheduling/selectByDoctorId',
            type:'post',
            data:{
                id:ID,
                doctorId:doctorId,
                sourceDate:startTime,
                pageNum:page,
                pageSize:8
            },
            dataType: "json",
            async:false,
            success: function (data) {
                if(data=="[]"||data.length==0){
                    return;
                }
               // alert($('.schedule_name .department').val());
                //$('caption>p').text($('.schedule_name .department').val() +'门诊排班表');
                //$("caption span").html("("+startTime+"~"+AddDays(startTime,6)+")");
                $("#doc_ques").attr("title","");
                $("#doc_ques").html("");
                $(".doc_mess").empty();
                var totalNum = data[0].num;
                var count = Math.ceil(totalNum/8);
                //展示是否有排班的表格信息
                var html;
                var i =1;
                $.each(data,function(index,val){
                    var objList = JSON.parse(val.objSource);
                    var duty;
                    switch(parseInt(val.duty)){
                        case 0:
                            duty='其他';
                            break;
                        case 1:
                            duty='医师';
                            break;
                        case 2:
                            duty='主治医师';
                            break;
                        case 3:
                            duty='副主任医师';
                            break;
                        case 4:
                            duty='主任医师';
                            break;
                    } // 转变职称
                    var type=val.outpatientType;
                    var text;
                    if(val.doctorname=="普通门诊"){
                            text='<select style="height: 30px" class="sle_type"><option  value="0">普通门诊</option></select>';
                        }else{
                            switch(parseInt(val.duty)){
                                case 0:
                                    //text='<select style="height: 30px" class="sle_type"><option  value="0">普通门诊</option></select>';
                                    text='<div>普通门诊</div>';
                                    break;
                                case 1:
                                    //text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option></select>';
                                    text='<div>普通门诊</div>';
                                    break;
                                case 2:
                                    //text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option></select>';
                                    text='<div>普通门诊</div>';
                                    break;
                                case 3:
                                    //text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option><option value="1">专家门诊</option><option value="2">特需门诊</option></select>';
                                    text='<div>专家门诊</div>';
                                    break;
                                case 4:
                                    //text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option><option value="1">专家门诊</option><option value="2">特需门诊</option></select>';
                                    text='<div>专家门诊</div>';
                                    break;
                            }
                      }
                     html='<tr class="schedule_detail_up"><td class="schedule_num"><input class="input_type" type="hidden" value="'+val.outpatientType+'"/><input class="doc_state" type="hidden" value="'+val.state+'"/><input class="doctorID" type="hidden" value="'+val.doctorID+'"/><b>'+i+'</b><img onclick="modify(this,\''+val.doctorID+'\',\''+val.doctorname+'\',\''+duty+'\',\''+type+'\',\''+i+'\')" src="images/mess_08.png" alt=""></td><td  class="schedule_name">'+val.doctorname+'</td><td  class="schedule_title">'+duty+'</td><td  class="schedule_title schedule_text">'+text+'</td><td  class="schedule_time"><p>上午</p><p>下午</p></td><td colspan="7"><table class="schedule_detail_table table-responsive"><tr class="detail_top"><td  class="time_tus"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr><tr class="detail_bot"><td  class="time_tus"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr></table></td><td class="audit_button"></td></tr>'
                     //<button class="auditBtn"></button>
                     i++;
                     var num = index;
                      $(".doc_mess").append(html);
                      if(val.objSource==""){
                         $('.doc_mess .audit_button').eq(index).empty();
                      }
                      if(objList && objList.length > 0){
                              //if(objList[0].auditState == 0){
                              if(val.auditState == 0){
                            //   alert(objList[0].auditState);
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').addClass('mainBg');
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').text('待审核');
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').attr('auditStatus',0);
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').css({'cursor':'pointer'});
                                  $('.doc_mess .audit_button').eq(index).text('待审核');
                                  $('.doc_mess .audit_button').eq(index).attr('auditStatus',0);
                                  $('.doc_mess .audit_button').eq(index).css("color","red");
                            //}else if(objList[0].auditState == 1){
                              }else if(val.auditState == 1){
                                //    alert(objList[0].auditState);
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').removeClass('mainBg');
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').text('已审核');
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').attr('auditStatus',1);
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').attr('disabled',true);
                                $('.doc_mess .audit_button').eq(index).text('已审核');
                                $('.doc_mess .audit_button').eq(index).attr('auditStatus',1);
                                $('.doc_mess .audit_button').eq(index).css("color","#2bd1c7");
                              }
                      }  
                      $.each(objList,function(index,time){
                         for(var i=0;i<$(".table_day").length;i++){
                              if($(".table_day").eq(i).html()==time.sourcedate){
                                  var count='';
                                  var inventorynum=parseInt(time.totalNum)+parseInt(time.newNum?time.newNum:0);
                                  var state=time.state;
                                  if(state == 1){
                                        var duty='';
                                        if(time.outpatientType==0){
                                            if(inventorynum==0){
                                                var txt="无";
                                            }else{
                                                var txt="有";
                                            }
                                            duty='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')"   readonly class="input_text back_ddd color_black" value="'+txt+'" type="text"/>'
                                        }
                                         if(time.outpatientType==1){
                                            duty='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')"   readonly class="input_text back_ddd color_blue" value="'+inventorynum+'" type="text"/>'
                                        }
                                        if(time.outpatientType==2){
                                            duty='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')"   readonly class="input_text back_ddd color_red" value="'+inventorynum+'" type="text"/>'
                                        }
                                        count='<input type="hidden" class="sourceId" value="'+time.sourceId+'"><input  class="input_outType" value="'+time.outpatientType+'" type="hidden"  ><input  class="input_state" value="'+state+'" type="hidden"  >'+duty;
                                  }else if(state == 2){
                                      if(time.outpatientType==0){
                                            if(inventorynum==0){
                                                var txt="无";
                                            }else{
                                                var txt="有";
                                            }
                                            var  dutyCan='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" style="background-color:#ccc;border-radius:0px;"  readonly class="input_text color_black" value="'+txt+'" type="text"/>'
                                        }
                                        if(time.outpatientType==1){
                                            var  dutyCan='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" style="background-color:#ccc;border-radius:0px;"  readonly class="input_text color_blue" value="'+inventorynum+'" type="text"/>'
                                        }
                                        if(time.outpatientType==2){
                                            var  dutyCan='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" style="background-color:#ccc;border-radius:0px;"  readonly class="input_text color_red" value="'+inventorynum+'" type="text"/>'
                                        }
                                        count='<input type="hidden" class="sourceId" value="'+time.sourceId+'"><input  class="input_outType" value="'+time.outpatientType+'" type="hidden"  ><input  class="input_state" value="'+state+'" type="hidden">'+dutyCan;
                                  }
                                 if(time.sourcetime=="am"){
                                      $('.doc_mess>.schedule_detail_up:eq('+num+') .detail_top>td:eq('+i+')').html(count);
                                 }else if(time.sourcetime=="pm"){
                                      $('.doc_mess>.schedule_detail_up:eq('+num+') .detail_bot>td:eq('+i+')').html(count);
                                 }
                              }
                         }
                      });
                });
                   //$(document.documentElement).animate({ scrollTop: 0 }, 300);
                    //支持chrome
                    //$(document.body).animate({ scrollTop: 0 }, 300);
                    //schedulepage(page,startTime,count,ID, doctorId);
                   //  outTable(page,subId,time)
                    outTable(page,$('.schedule_name .department').attr('subjectId'))
            }
         });
   }; 
  

//获取医院所有有排班的科室信息
// /admin/scheduling/getAllSubSchduling
  function getAllSchduling(page){
    $(".list_mess").html("");
     $.ajax({
            url:baseUrl+'eht/admin/scheduling/getAllSubSchduling',
            type:'post',
            dataType: "json",
            data:{
              hospitalId:sessionStorage.getItem('hospitalId'),
              pageNum:page,
              pageSize:8
            },
            success: function (data) {
              if(data.length==0){
                return;
              }
              var count = Math.ceil(data[0].num/8);
              var html="";
              //后台暂时未设置排班员用户名
              for(var i=0;i<data.length;i++){
                var checkState;
                switch(parseInt(data[i].auditState)){
                  case 1:
                    checkState="已审核";
                    //审核按钮添加class=checkSucc
                    html+=`
                      <tr><td subject="${data[i].subjectcontents}" ids="${data[i].id}" class="subjectId">${i+1}</td><td class="subName">${data[i].subName}</td><td>${data[i].createtime.slice(0,-3)}</td><td style="color:#2bd1c7;">${checkState}</td><td><button class="audit_detail">查看详情</button><button class="checkState checkSucc">一键全部审核</button></td></tr>
                    `;
                    /*html+=`
                      <tr><td subject="${data[i].subjectcontents}" ids="${data[i].id}" class="subjectId">${i+1}</td><td class="subName">${data[i].subName}</td><td>${data[i].createtime.slice(0,-3)}</td><td style="color:#2bd1c7;">${checkState}</td><td><button class="audit_detail">查看详情</button></td></tr>
                    `;*/
                    break;
                  case 0:
                    //审核按钮添加class=checkFail
                    checkState="未审核";
                    html+=`
                      <tr><td subject="${data[i].subjectcontents}" ids="${data[i].id}" class="subjectId">${i+1}</td><td class="subName">${data[i].subName}</td><td>${data[i].createtime.slice(0,-3)}</td><td style="color:red;">${checkState}</td><td><button class="audit_detail">查看详情</button><button class="checkState checkFail">一键全部审核</button></td></tr>
                    `;
                    /*html+=`
                      <tr><td subject="${data[i].subjectcontents}" ids="${data[i].id}" class="subjectId">${i+1}</td><td class="subName">${data[i].subName}</td><td>${data[i].createtime.slice(0,-3)}</td><td style="color:red;">${checkState}</td><td><button class="audit_detail">查看详情</button></td></tr>
                    `;*/
                    break;
                }
              }
              $(".list_mess").html(html);
              //listpage(page,count);
            }
      });
  };
  //查看排班员排班信息 
function userMessDetail(page,subjectId){
    $(".user_mess").empty();
    if(subjectId!==""&&subjectId!==undefined&&subjectId!=="undefined"){
      $(".user_mess").empty();
      $(".table_schedule_list").hide();
      $(".table_submit_one").hide();
      $(".table_schedule_user").show();
      $(".table_backToList").show();
      $('.schedule_search>.schedule_name').eq(1).show();
      $('.schedule_search>.schedule_name').eq(0).children("lable").html("排班搜索:");
      $('.schedule_search>.schedule_name').eq(0).children("input").val("").attr("placeholder","请填写排班员姓名").removeAttr("userid").removeAttr("subjectid").removeAttr("doctorid");
      $.ajax({
          url:baseUrl+'eht/admin/scheduling/getSubSchdulingList',
          type:"get",
          data:{
              hospitalId:sessionStorage.getItem("hospitalId"),
              subjectcontents:subjectId,
              pageNum:page,
              pageSize:8
          },
          beforeSend:function(XMLHttpRequest){

          },
          success:function(data){
              if(data== [] || data.length == 0 ){
                  return;
              }
              $(".sub_Id").val("").val(subjectId);
              var count = Math.ceil(data[0].num/8);
              var html;
              for(var i=0;i<data.length;i++){
                  var checkState;
                  var color;
                  // switch(parseInt(data[i].state)){
                  //  case 4:
                     //   checkState="已审核";
            //               color='#2bd1c7';
                     //   break;
                     //  case 1:
                     //   checkState="未审核";
            //               color='red';
                     //   break;
                  // }
                  if(data[i].auditState==1){
                      html+='<tr><td subject='+data[i].subjectcontents+' ids='+data[i].id+' class="recordId"><input type="hidden" value="'+data[i].subName+'" /><span>'+(i+1)+'</span></td><td>'+data[i].subName+'</td><td>'+data[i].userName+'</td><td>'+data[i].userMobileno+'</td><td>'+data[i].createtime.slice(0,-3)+'</td><td style="color:#2bd1c7;">已审核</td><td><button class="audit_detail_list">查看详情</button><button class="checkSucc1">审核</button></td></tr>';
                  }else if(data[i].auditState==0){
                      html+='<tr><td subject='+data[i].subjectcontents+' ids='+data[i].id+' class="recordId"><input type="hidden" value="'+data[i].subName+'" /><span>'+(i+1)+'</span></td><td>'+data[i].subName+'</td><td>'+data[i].userName+'</td><td>'+data[i].userMobileno+'</td><td>'+data[i].createtime.slice(0,-3)+'</td><td style="color:red;">未审核</td><td><button class="audit_detail_list">查看详情</button><button class="checkFail1">审核</button><button class="reject">拒绝</button></td></tr>';
                  }else if(data[i].auditState==2){
                      html+='<tr><td subject='+data[i].subjectcontents+' ids='+data[i].id+' class="recordId"><input type="hidden" value="'+data[i].subName+'" /><span>'+(i+1)+'</span></td><td>'+data[i].subName+'</td><td>'+data[i].userName+'</td><td>'+data[i].userMobileno+'</td><td>'+data[i].createtime.slice(0,-3)+'</td><td style="color:red;">已拒绝</td><td><button class="audit_detail_list">查看详情</button><button class="reject" style="background-color:#ccc;">已拒绝</button></td></tr>';

                  }
              }
              $(".user_mess").html(html);
              //userpage(page,count,subjectId);
          }
      });
    }
}

  //一级界面科室点击查看详情 查看排班员排班信息 
  $(".list_mess").on("click","button.audit_detail,button.checkFail",function(){
      var subName=$(this).parent().siblings(".subName").text();
      var subjectId = $(this).parent().siblings(".subjectId").attr("subject");
      if($(this).attr("class")=="audit_detail"){
          userMessDetail(1,subjectId);
      }else{
            //一级界面科室点击审核全部记录通过
            var id = $(this).parent().siblings(".subjectId").attr("ids");
            var subId = $(this).parent().siblings(".subjectId").attr("subject"); 
            //$("caption>input.subId").val(subId);
            $('.smallMask').show();
            $('.smallBox').show();
            $(".btn_return").show();
            $(".btn_sure").show();
            $(".small_text").html("确认审核吗？");
            $('.btn_return').click(function(){
                $('.smallMask').hide();
                $('.smallBox').hide();
            });
            $(".btn_sure").unbind('click').click(function () {
              $.ajax({
                  url:baseUrl+'eht/admin/scheduling/auditSubSchduling',
                  type:'post',
                  data:{
                     hospitalId:sessionStorage.getItem("hospitalId"),
                     userId:sessionStorage.getItem("userId"),
                     type:1,
                     subjectcontentsList:subId
                  },
                  beforeSend:function(XMLHttpRequest){
                      $('.smallMask').show();
                      $('.waitingBox').show();
                  },
                  success:function(data){
                      if(data >= 1){
                          $(".small_text").html("审核通过！");
                          $(".btn_return").hide();
                          $(".btn_sure").hide();
                          setTimeout(function(){
                                 $('.smallMask').hide();
                                  $('.smallBox').hide();
                                  $('.waitingBox').hide();
                          },2000);
                          getAllSchduling(1);
                      }else if(data == 0){
                          $(".small_text").html("审核失败 请重新审核！");
                          $(".btn_return").hide();
                          $(".btn_sure").hide();
                          setTimeout(function(){
                                 $('.smallMask').hide();
                                  $('.smallBox').hide();
                                  $('.waitingBox').hide();
                          },2000);

                      }
                  }
              }); 
            });
        }
    });

  //通过科室id获取 最新记录id   2018/1/17停用
  function getSubSchdulingBySubId(subjectcontents){
    if(!subjectcontents){
        return false;
    }
    $.ajax({
        url:baseUrl+'eht/admin/scheduling/getNewestSubSchdulingBySubId',
        type:'get',
        data:{
            hospitalId:sessionStorage.getItem("hospitalId"),
            subjectcontents:subjectcontents
        },
        success:function(data){
            if(data==""){
                alert("系统获取记录失败!")
                return false;
            }
            $('.schedule_name .department').attr('ids',data);
        }
    })
  }

  //点击查看详情 查看排班信息  //调用
  function getSubByname(subName,Id){
      $(".doc_mess").empty();
      var time=$("#start").val();//
      var date1 = new Date();
      var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//
      //time==""?time=time1:time;
      time = time1;
      var getday = DateDiff(time,time1);
      if(subName !== ""&&subName !== undefined&&subName!=="undefined"){
        $(".table_schedule_user").hide();
        $(".table_schedule_list").hide();
        $(".table_backToList").hide();
        $(".table_submit_one").hide();
        $(".table_schedule_doc").show();
        $(".table_submit").show();
        $(".table_backToUser").show();
        $('.schedule_search>.schedule_name').eq(1).show();
        $('.schedule_search>.schedule_name').eq(0).children("lable").html("医生搜索:");
        $('.schedule_search>.schedule_name').eq(0).children("input").val("").attr("placeholder","请填写排班员姓名").removeAttr("userid").removeAttr("subjectid").removeAttr("doctorid");
        start.min=laydate.now();
        $("#start").val(laydate.now());
        var time=$("#start").val();
        var date1 = new Date();
        var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//
        time==""?time=time1:time;
        var getday = DateDiff(time,time1); //
        if(Id){
            listTop1(currentpage,getday,time,Id,'undefined');
           //  querySchedule(currentpage,$('.schedule_name .department').attr('subjectId'),startTime);
            $('caption>p').text(subName +'门诊排班表');
            $('caption>input.record_Id').val(Id);
        }
        if(Id =="undefined" || Id == undefined || !Id){
            var subName=$(this).parent().siblings(".subName").text();
            $.ajax({
                    url:baseUrl+'eht/admin/scheduling/getSubByname',
                    type:'post',
                    data:{
                         hospitalId:sessionStorage.getItem("hospitalId"),
                        // departmentName:$('.schedule_name .department').val()
                        name:subName,
                        type:1,
                        parentcode:''
                    },
                    beforeSend:function(XMLHttpRequest){

                    },
                    success:function(data){
                        if(data== [] || data.length == 0 ){
                            return;
                        }
                        for(var i=0;i<data.length;i++){
                            if($('.schedule_name .department').val() === data[i].subjectName){
                             // alert($('.schedule_name .department').val());
                                $('.schedule_name .department').attr('subjectId',data[i].departmentId);
                                 listTop1(currentpage,getday,time,Id,'undefined');
                               // querySchedule(currentpage,$('.schedule_name .department').attr('subjectId'),startTime);
                                $('caption>p').text(subName +'门诊排班表');
                                $('caption>input.record_Id').val(Id);
                                $('caption>input.subId').val(data[i].departmentId);
                                break;
                            }
                        }
                    }
             });
        }
      }
  }
  //二级界面排班员信息点击查看详情 查看医生排班信息
  $(".user_mess").on("click","button.audit_detail_list,button.checkFail1",function(){
      var subName=$(this).parent().siblings(".recordId").children("input[type=hidden]").val();
      var ids = $(this).parent().siblings(".recordId").attr("ids");
      var subId = $(this).parent().siblings(".recordId").attr("subject");
      if($(this).attr("class")=="audit_detail_list"){
          $("caption>input.subId").val("")
          getSubByname(subName,ids);
          $("caption>input.subId").val(subId);
      }else{
          $('.smallMask').show();
          $('.smallBox').show();
          $(".btn_return").show();
          $(".btn_sure").show();
          $(".small_text").html("确认审核吗？");
          $('.btn_return').click(function(){
              $('.smallMask').hide();
              $('.smallBox').hide();
          });
          $(".btn_sure").unbind('click').click(function () {
            $.ajax({
                url:baseUrl+'eht/admin/scheduling/auditSubSchduling',
                // url:'192.168.1.92:8333/eht/admin/scheduling/auditSubSchduling',
                type:'post',
                data:{
                    auditState:1,
                   ids:ids,
                   hospitalId:sessionStorage.getItem("hospitalId"),
                   userId:sessionStorage.getItem("userId")
                },
                beforeSend:function(XMLHttpRequest){
                    $('.smallMask').show();
                    $('.waitingBox').show();
                },
                success:function(data){
                    if(data >= 1){
                        $(".small_text").html("审核通过！");
                        $(".btn_return").hide();
                        $(".btn_sure").hide();
                        setTimeout(function(){
                               $('.smallMask').hide();
                                $('.smallBox').hide();
                                $('.waitingBox').hide();
                        },2000);
                        userMessDetail(1,subId);
                    }else if(data == 0){
                        $(".small_text").html("审核失败 请重新审核！");
                        $(".btn_return").hide();
                        $(".btn_sure").hide();
                        setTimeout(function(){
                               $('.smallMask').hide();
                                $('.smallBox').hide();
                                $('.waitingBox').hide();
                        },2000);

                    }
                }
            }); 
          });
      }
  });

  $(".user_mess").on("click","button.reject",function(){
        var self=this
        var ids = $(this).parent().siblings(".recordId").attr("ids");
        $.ajax({
          url:'http://192.168.1.92:8333/eht/admin/scheduling/auditSubSchduling',
          // url:baseUrl+'eht/admin/scheduling/auditSubSchduling',
          type:'post',
          data:{
             auditState:2,
             ids:ids,
             hospitalId:sessionStorage.getItem("hospitalId"),
             userId:sessionStorage.getItem("userId")
          },
          success:function(data){
            if(data=="1"){
              $(self).text("已拒绝")
              $(self).css("background-color","#ccc")
            }
          }
        })
  })


function schedulepage(page,date,count,id,doctorId){
    if($(".table_schedule_list").is(":hidden")&&$(".table_schedule_user").is(":hidden")&&$(".table_schedule_doc").is(":visible")){
      $('.list_page').hide();
      $('.user_page').hide();
      if(count > 1){
           $('.schedule_page').show();
           $('.schedule_page').myPagination({
               currPage: page,
               pageCount: count,
               pageSize: 8,
               panel: {
                  tipInfo_on: true,
                  tipInfo: '&nbsp;&nbsp;跳转至{input}/{sumPage}页',
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
                  on: false,
                  onClick :function(pageNu){
                       var date=$(".schedule_tr_table>tbody>tr>td:first-child .table_day").html();//获取起始时间
                      var val = Date.parse(date); 
                      var newDate = new Date(val);
                      var date1 = new Date();
                      var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
                      var time=newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate();//
                      time==""?time=time1:time;
                      var getday=DateDiff(time,time1);//查询的起始时间和当前时间的间隔天数
                       page = pageNu;
                       listTop1(page,getday,date,id,doctorId);
                  }
              }
           });
      }else {
          $('.schedule_page').hide();
      }
    }
};

function listpage(page,count){
  if($(".table_schedule_list").is(":visible")&&$(".table_schedule_user").is(":hidden")&&$(".table_schedule_doc").is(":hidden")){
      $('.user_page').hide();
      $('.schedule_page').hide();
      if(count > 1){
           $('.list_page').show();
           $('.list_page').myPagination({
               currPage: page,
               pageCount: count,
               pageSize: 8,
               panel: {
                  tipInfo_on: true,
                  tipInfo: '&nbsp;&nbsp;跳转至{input}/{sumPage}页',
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
                  on: false,
                  onClick :function(pageNu){
                       getAllSchduling(pageNu);
                  }
              }
           });
      }else {
          $('.list_page').hide();
      }
  }
}

function userpage(page,count,subjectId){
  if($(".table_schedule_list").is(":hidden")&&$(".table_schedule_user").is(":visible")&&$(".table_schedule_doc").is(":hidden")){
      $('.list_page').hide();
      $('.schedule_page').hide();
      if(count > 1){
           $('.user_page').show();
           $('.user_page').myPagination({
               currPage: page,
               pageCount: count,
               pageSize: 8,
               panel: {
                  tipInfo_on: true,
                  tipInfo: '&nbsp;&nbsp;跳转至{input}/{sumPage}页',
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
                  on: false,
                  onClick :function(pageNu){
                      userMessDetail(pageNu,subjectId)
                  }
              }
           });
      }else {
          $('.user_page').hide();
      }
  }
}

function listTop(page,day_interval,date_start){
       //     $('.schedule_table').show();
    $(".schedule_tr_table tr").html("");
    for(var i=day_interval;i<day_interval+7;i++){
        getWeek(i%7);
      //  alert(i);
        var html='<td><p class="table_week">'+week+'</p><p class="table_day">'+getYear(i)+'</p></td>'
        $(".schedule_tr_table tr").append(html);
    }
    if(day_interval>6){
        var left="<a id='list_left' onclick='listTop("+page+","+(day_interval-7)+",\""+getYear(i-35)+"\")' href='javascript:void(0);'></a>";
        $(".schedule_tr_table tr td:first-child").addClass("point_left").prepend(left);
    }
        var right="<a id='list_right' onclick='listTop("+page+","+(day_interval+7)+",\""+getYear(i+35)+"\")' href='javascript:void(0);'></a>";
        $(".schedule_tr_table tr td:last-child").addClass("point_right").append(right);

   //alert(getYear(i-7))
    querySchedule(page,$('.schedule_name .department').attr('subjectId'),getYear(i-7));
}

//相对listTop  增加通过科室id获得排班信息
function listTop1(page,day_interval,date_start,Id,doctorId){
       //     $('.schedule_table').show();
    $(".doc_mess").html("");
    $(".schedule_tr_table tr").html("");
    for(var i=day_interval;i<day_interval+7;i++){
        getWeek(i%7);
      //  alert(i);
        var html='<td><p class="table_week">'+week+'</p><p class="table_day">'+getYear(i)+'</p></td>'
        $(".schedule_tr_table tr").append(html);
    }
    if(day_interval>6){
        var left="<a id='list_left' onclick='listTop1("+page+","+(day_interval-7)+",\""+getYear(i-35)+"\",\""+Id+"\",\""+doctorId+"\")' href='javascript:void(0);'></a>";
        $(".schedule_tr_table tr td:first-child").addClass("point_left").prepend(left);
    }
        var right="<a id='list_right' onclick='listTop1("+page+","+(day_interval+7)+",\""+getYear(i+35)+"\",\""+Id+"\",\""+doctorId+"\")' href='javascript:void(0);'></a>";
        $(".schedule_tr_table tr td:last-child").addClass("point_right").append(right);
   //alert(getYear(i-7))
    querySchedule(page,Id,doctorId,getYear(i-7));
}



function showDepart(){
    $.ajax({
        url:baseUrl+'eht/admin/hospitalUser/selectSub',
        type:'post',
        data:{
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        success:function(data){
           $('caption p').text(data[0].subName + '门诊排班表');
           $('caption p').attr('departId',data[0].departmentId);
          // alert($('caption p').attr('departId'))
           $('caption span').text('('+ $('#start').val()+'~'+nextTime(6)+')');
        },
        // complete:function(){
        //      schedule_list(1,$('#start').val());
        // }
    });
}

$('.doc_mess').on('click','.auditBtn',function(){
    //alert($(this).attr('auditStatus') == '0')
    var self = this;
    if($(self).attr('auditStatus') == '0'){
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("确认审核？");
              $(".btn_return").show();
             $(".btn_sure").show();
            $('.btn_return').click(function(){
                $('.smallMask').hide();
                $('.smallBox').hide();
               // return false; 
            });
            $(".btn_sure").unbind('click').click(function () {
                //schedule_name
                //alert($(self).parent().siblings('.schedule_num').children('.doctorID').val() +'-'+$(self).parent().siblings('.schedule_name').text());
                $.ajax({
                    url:baseUrl+'eht/admin/scheduling/updateAudit',
                    type:'post',
                    data:{
                       doctorIds: $(self).parent().siblings('.schedule_num').children('.doctorID').val(),
                       beginTime: $(".schedule_tr_table>tbody>tr>td:first-child .table_day").html(),//获取起始时间
                       endTime:AddDays($(".schedule_tr_table>tbody>tr>td:first-child .table_day").html(),6)
                    },
                    beforeSend:function(XMLHttpRequest){
                        $('.smallMask').show();
                        $('.waitingBox').show();
                    },
                    success:function(data){
                        if(data.type == 1){
                             $('.smallMask').hide();
                            $('.smallBox').hide();
                            $('.waitingBox').hide();
                            $(self).removeClass('mainBg');
                            $(self).text('已审核');
                            $(self).attr('auditStatus',1);
                            $(self).attr('disabled',true); 
                            $(self).css('cursor',none);
                        }else if(data.type == 0){
                            $(".small_text").html("审核失败 请重新审核！");
                            $(".btn_return").hide();
                            $(".btn_sure").hide();
                            setTimeout(function(){
                                   $('.smallMask').hide();
                                    $('.smallBox').hide();
                                    $('.waitingBox').hide();
                            },3000);

                        }
                    }
                });
            });
    }
});

$('.table_submit_one').click(function(){
    $('.smallMask').show();
    $('.smallBox').show();
    $(".btn_return").show();
    $(".btn_sure").show();
    $(".small_text").html("确认审核全部信息吗？");
    $('.btn_return').click(function(){
        $('.smallMask').hide();
        $('.smallBox').hide();
    });
    $(".btn_sure").unbind('click').click(function () {
        var trs = $(".list_mess>tr");
        var subIds = [];
        $.each(trs,function(index,tr){
            subIds.push($(tr).children().first().attr("subject"));
        });
        subIds = subIds.join(',');
         $.ajax({
                url:baseUrl+'eht/admin/scheduling/auditSubSchduling',
                type:'post',
                data:{
                   hospitalId:sessionStorage.getItem("hospitalId"),
                   userId:sessionStorage.getItem("userId"),
                   type:1,
                   subjectcontentsList:subIds
                },
                beforeSend:function(XMLHttpRequest){
                    $('.smallMask').show();
                    $('.waitingBox').show();
                },
                success:function(data){
                    if(data >= 1){
                        $(".small_text").html("审核通过！");
                        $(".btn_return").hide();
                        $(".btn_sure").hide();
                        setTimeout(function(){
                               $('.smallMask').hide();
                                $('.smallBox').hide();
                                $('.waitingBox').hide();
                        },2000);
                        location.reload();
                    }else if(data == 0){
                        $(".small_text").html("审核失败 请重新审核！");
                        $(".btn_return").hide();
                        $(".btn_sure").hide();
                        setTimeout(function(){
                               $('.smallMask').hide();
                               $('.smallBox').hide();
                               $('.waitingBox').hide();
                        },2000);
                    }
                }
             }); 

    })
})

$('.table_submit').click(function(){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".btn_return").show();
        $(".btn_sure").show();
        $(".small_text").html("确认审核全部信息吗？");
        $('.btn_return').click(function(){
            $('.smallMask').hide();
            $('.smallBox').hide();
        });
        $(".btn_sure").unbind('click').click(function () {
            // var doctorIdsArr = $('.doctorID');
            // var doctorIds = '';
            // $.each(doctorIdsArr,function(index,doctorId){
            //     doctorIds += $(doctorId).val() +',';
            // });
            //   // console.log(doctorIds.split(','));
            //   var arr = [];
            //   for(var i=0;i<doctorIds.split(',').length-1;i++){
            //     arr.push(doctorIds.split(',')[i])
            //   }
            // //  console.log(arr +'---' +doctorIds)
            // doctorIds = arr.join(',');
            if($("caption>input.record_Id").val()==""){
                alert("系统出错");
                return false;
            }
            var ids = $("caption>input.record_Id").val();
            var date = new Date();
            var time=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();//
             $.ajax({
                    url:baseUrl+'eht/admin/scheduling/auditSubSchduling',
                    type:'post',
                    data:{
                       ids:ids,
                       hospitalId:sessionStorage.getItem("hospitalId"),
                       userId:sessionStorage.getItem("userId")
                    },
                    beforeSend:function(XMLHttpRequest){
                        $('.waitingBox').show();
                    },
                    success:function(data){
                        if(data == 1){
                            $('.auditBtn').removeClass('mainBg');
                            $('.auditBtn').text('已审核');
                            $('.auditBtn').attr('auditStatus',1);
                            $('.auditBtn').attr('disabled',true);
                            $(".small_text").html("审核通过！");
                            $(".btn_return").hide();
                            $(".btn_sure").hide();
                            setTimeout(function(){
                                   $('.smallMask').hide();
                                    $('.smallBox').hide();
                                    $('.waitingBox').hide();
                                    listTop1(1,0,time,ids,'undefined');
                            },2000);

                        }else if(data == 0){
                            $(".small_text").html("审核失败 请重新审核！");
                            $(".btn_return").hide();
                            $(".btn_sure").hide();
                            setTimeout(function(){
                                   $('.smallMask').hide();
                                    $('.smallBox').hide();
                                    $('.waitingBox').hide();
                            },2000);
                        }
                    }
             });  
        });
});
$(".table_backToUser").click(function(){
    $(".user_mess").empty();
    $(".table_schedule_doc").hide();
    $(".table_schedule_list").hide();
    $(".table_schedule_user").show();
    $(".table_submit_one").hide();
    $(".table_submit").hide();
    $(".table_backToUser").hide();
    $(".table_backToList").show();
    $('.schedule_search>.schedule_name').eq(0).children("lable").html("排班搜索:");
    $('.schedule_search>.schedule_name').eq(0).children("input").val("").attr("placeholder","请填写排班员姓名").removeAttr("userid").removeAttr("subjectid").removeAttr("doctorid");
    start.min=undefined;
    var subjectId=$("caption>input.subId").val();
    $.ajax({
        url:baseUrl+'eht/admin/scheduling/getSubSchdulingList',
        type:"get",
        data:{
            hospitalId:sessionStorage.getItem("hospitalId"),
            subjectcontents:subjectId
        },
        beforeSend:function(XMLHttpRequest){

        },
        success:function(data){
            if(data== [] || data.length == 0 ){
                return;
            }
            $(".sub_Id").val("").val(subjectId);
            var count =Math.ceil(data[0].num/8);
            var html;
            for(var i=0;i<data.length;i++){
                var checkState;
                var color;
                // switch(parseInt(data[i].state)){
                //  case 4:
                   //   checkState="已审核";
          //               color='#2bd1c7';
                   //   break;
                   //  case 1:
                   //   checkState="未审核";
          //               color='red';
                   //   break;
                // }
                if(data[i].auditState==1){
                    html+='<tr><td subject='+data[i].subjectcontents+' ids='+data[i].id+' class="recordId"><input type="hidden" value="'+data[i].subName+'" /><span>'+(i+1)+'</span></td><td>'+data[i].subName+'</td><td>'+data[i].userName+'</td><td>'+data[i].userMobileno+'</td><td>'+data[i].createtime.slice(0,-3)+'</td><td style="color:#2bd1c7;">已审核</td><td><button class="audit_detail_list">查看详情</button><button class="checkSucc1">审核</button></td></tr>';
                }else if(data[i].auditState==0){
                    html+='<tr><td subject='+data[i].subjectcontents+' ids='+data[i].id+' class="recordId"><input type="hidden" value="'+data[i].subName+'" /><span>'+(i+1)+'</span></td><td>'+data[i].subName+'</td><td>'+data[i].userName+'</td><td>'+data[i].userMobileno+'</td><td>'+data[i].createtime.slice(0,-3)+'</td><td style="color:red;">未审核</td><td><button class="audit_detail_list">查看详情</button><button class="checkFail1">审核</button><button class="reject">拒绝</button></td></tr>';
                }else if(data[i].auditState==2){
                   html+='<tr><td subject='+data[i].subjectcontents+' ids='+data[i].id+' class="recordId"><input type="hidden" value="'+data[i].subName+'" /><span>'+(i+1)+'</span></td><td>'+data[i].subName+'</td><td>'+data[i].userName+'</td><td>'+data[i].userMobileno+'</td><td>'+data[i].createtime.slice(0,-3)+'</td><td style="color:red;">已拒绝</td><td><button class="audit_detail_list">查看详情</button><button class="reject" style="background-color:#ccc">已拒绝</button></td></tr>';

                }
            }
            $(".user_mess").html(html);
            //userpage(1,count,subjectId);
        }
    })
});
$(".table_backToList").click(function(){
    // $(".table_schedule_doc").hide();
    // $(".table_schedule_user").hide();
    // $(".table_schedule_list").show();
    // $(".table_submit_one").show();
    // $(".table_submit").hide();
    // $(".table_backToUser").hide();
    // $(".table_backToList").hide();
        window.location.reload();
});

function outTable(page,subId) {
    var list = [{}];
    list[0].CurrentPage = page;
    list[0].totalPages = "6";
    list[0].subjectId = subId;
    list[0].hospitalId = sessionStorage.getItem('hospitalId'); 
    list[0].sourceDate = $(".schedule_tr_table>tbody>tr>td:first-child .table_day").html();//获取起始时间
    $(".export_table").unbind('click').click(function () {
          list[0].sourceDate = $(".schedule_tr_table>tbody>tr>td:first-child .table_day").html();
        $.ajax({
            url:baseUrl+'eht/admin/scheduling/CurrentSchedulingExcel',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
               // alert("导出成功");
              //  console.log(data);
              window.location.href= baseUrl+"eht/uploadFile/"+data;
//                $(".modify_record").attr("href","..\SchedulingExcl2017-08-03.xls");
            }
        });
    });
}