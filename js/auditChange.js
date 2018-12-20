
/*
2017-10-11
*/


/*
2017-10-11
*/

//加载动态时间
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
    //$("caption span").html("("+year + "-" + month + "-" + data+")");
}

//弹出框js
$(function(){

    var username = sessionStorage.getItem('username');
    var hospitalId = sessionStorage.getItem('hospitalId');
    if(!username || !hospitalId){
        window.location.href = "login.html"
    }
    
    $('.alertMask').hide();
    $('.alertBox').hide();
    // 获取弹窗宽高
    var width=$('.alertBox').width();
    var height=$('.alertBox').height();
    // 获取浏览器窗口宽高
    var h=document.documentElement.clientHeight;
    var w=document.documentElement.clientWidth;
    $('.alertBox').css({ 'top': (h-height) / 2 + 'px', 'left': (w-width) / 2 + 'px' });
    $('.alert-close').click(function(){
        $('.alertMask').hide();
        $('.alertBox').hide();
    })
})

  var baseUrl = 'http://www.51edoctor.cn/';
  //var baseUrl = 'http://192.168.1.51:8333/';

   $('.schedule_name .department').keyup(function(){
       querySubjects();
   });
   $('.schedule_name .department').on('focus',function(){
        querySubjects();
   })

    function querySubjects(){
       $.ajax({
           // url:baseUrl + 'eht/admin/Information/queryDepartment',
           url:baseUrl+"eht/admin/scheduling/getSubByname",
            type:'post',
            data:{
                 hospitalId:sessionStorage.getItem("hospitalId"),     
                // departmentName:$('.schedule_name .department').val()
                name:$('.schedule_name .department').val(),
                type:1,
                parentcode:''
            },
            success:function(data){
              console.log(data);
                if(data== [] || data.length == 0 ){
                        return false;
                    }
                var list = '';
                for(var i =0;i<data.length;i++){
                    list += '<li subjectId='+data[i].departmentId+'>'+data[i].subjectName+'</li>';
                }
                
                $('.schedule_name .queryDepart').html(list);
                $('.schedule_name .queryDepart').slideDown();
                $('.schedule_name .queryDepart').on('click','li',function(){
                    $('.schedule_name .department').val($(this).text());
                    $('.schedule_name .department').attr('subjectId',$(this).attr('subjectId'));
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


    var currentpage = 1;
   $('.audit_query').click(function(){
        var subjectName = $('.schedule_name .department').val();
        var time = $("#start").val();//获得排版日期里选择的时间
        var date1 = new Date();
        var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
        time==""?time=time1:time;
        var getday = DateDiff(time,time1); //获得排班日期时间和当前时间间隔天数
        if(!subjectName || subjectName =='' || subjectName ==' ' || subjectName == undefined){
             $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("请输入具体的科室名称");
                $(".btn_return").hide();
                $(".btn_sure").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                })
                return false;
        }
        if($('.schedule_name .department').attr('subjectId')){
        //    alert(11111);
              listTop(currentpage,getday,time);
            }
          if($('.schedule_name .department').attr('subjectId') == undefined || !($('.schedule_name .department').attr('subjectId'))){
  
             $.ajax({
                   // url:baseUrl + '/eht/admin/Information/queryDepartment',
                   url:baseUrl+"eht/admin/scheduling/getSubByname",
                    type:'post',
                    data:{
                         hospitalId:sessionStorage.getItem("hospitalId"),     
                        // departmentName:$('.schedule_name .department').val()
                        name:$('.schedule_name .department').val(),
                        type:1,
                        parentcode:''
                    },
                    beforeSend:function(XMLHttpRequest){

                    },
                    success:function(data){

                        if(data== [] || data.length == 0 ){
                                return false;
                            }
                        for(var i=0;i<data.length;i++){
                            if($('.schedule_name .department').val() === data[i].subjectName){
                             // alert($('.schedule_name .department').val());
                                $('.schedule_name .department').attr('subjectId',data[i].departmentId);
                                 listTop(currentpage,getday,time);  
                               // querySchedule(currentpage,$('.schedule_name .department').attr('subjectId'),startTime);
                            break;
                            }
                        }
                    },
             });
        }
   });
   
   function querySchedule(page,subID,startTime){
       var list=[{}];
        list[0].CurrentPage=page;
        list[0].totalPages="8";
        list[0].hospitalId = sessionStorage.getItem('hospitalId');  
        list[0].subjectId = $('.schedule_name .department').attr('subjectId');
        list[0].doctor_name = '';
        list[0].doctor_duty = '';
        startTime=="undefined"||startTime==undefined||startTime==''?list[0].sourceDate="":list[0].sourceDate=startTime;
        if(!list[0].subjectId || list[0].subjectId == undefined){
            return false;
        } 

        $.ajax({
            url:baseUrl + 'eht/admin/scheduling/CurrentSchedulingQuery',
            type:'get',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            async:false,
            success: function (data) {
                $('caption>p').text($('.schedule_name .department').val() +'门诊排班表');
            //  $("caption span").html("("+startTime+"~"+AddDays(startTime,6)+")");
                $(".doc_mess").empty();
                $("#doc_ques").attr("title","");
                $("#doc_ques").html("");
                var totalNum = data[0].num;
                var count = Math.ceil(totalNum/8);
      
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
                    } // 
                    var type=val.outpatientType;
                    var text;
                    if(val.doctorname=="普通门诊"){
                            text='<select style="height: 30px" class="sle_type"><option  value="0">普通门诊</option></select>';
                        }else{
                            switch(parseInt(val.duty)){
                                case 0:
                                    text='<select style="height: 30px" class="sle_type"><option  value="0">普通门诊</option></select>';
                                    break;
                                case 1:
                                    text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option></select>';
                                    break;
                                case 2:
                                    text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option></select>';
                                    break;
                                case 3:
                                    text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option><option value="1">专家门诊</option><option value="2">特需门诊</option></select>';
                                    break;
                                case 4:
                                    text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option><option value="1">专家门诊</option><option value="2">特需门诊</option></select>';
                                    break;
                            }
                        }
                    html='<tr class="schedule_detail_up"><td class="schedule_num"><input class="input_type" type="hidden" value="'+val.outpatientType+'"/><input class="doc_state" type="hidden" value="'+val.state+'"/><input class="doctorID" type="hidden" value="'+val.doctorID+'"/><b>'+i+'</b><img onclick="modify(this,\''+val.doctorID+'\',\''+val.doctorname+'\',\''+duty+'\',\''+type+'\',\''+i+'\')" src="images/mess_08.png" alt=""></td><td  class="schedule_name">'+val.doctorname+'</td><td  class="schedule_title">'+duty+'</td><td  class="schedule_time"><p>上午</p><p>下午</p></td><td colspan="7"><table class="schedule_detail_table table-responsive"><tr class="detail_top"><td  class="time_tus"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr><tr class="detail_bot"><td  class="time_tus"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr></table></td><td class="audit_button"></td><td class="schedule_button"><div id="doc_ques" title=""></div></td></tr>'
                     i++;
                     //2018/1/11  取消门诊类型 <td  class="schedule_title schedule_text">'+text+'</td>
                     var num = index;
                    $(".doc_mess").append(html);
                      
                     if(objList == [] || objList.length == 0){
     
                        //   alert('no audit');
                         $('.doc_mess .audit_button').eq(index).empty();
                      }
                      if(objList && objList.length > 0){
                              if(objList[0].auditState == 0){
                
                            //   alert(objList[0].auditState);
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').addClass('mainBg');
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').text('待审核');
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').attr('auditStatus',0);
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').css({'cursor':'pointer'});
                            }else if(objList[0].auditState == 1){
          
                                //    alert(objList[0].auditState);
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').removeClass('mainBg');
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').text('已审核');
                                //     $('.doc_mess .audit_button').eq(index).children('.auditBtn').attr('auditStatus',1);
                                // $('.doc_mess .audit_button').eq(index).children('.auditBtn').attr('disabled',true);
                            }
                      }  
                      $.each(objList,function(index,time){
                         for(var i=0;i<$(".table_day").length;i++){
                              if($(".table_day").eq(i).html()==time.sourcedate){
                                  var count='';
                                  var inventorynum=parseInt(time.totalNum)+parseInt(time.newNum?time.newNum:0);
                                  var state=time.state;
                                  if(state == 1){
                                      //排了的
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
                                  }else if(state==0){
                     
                                        var dutyNon='';
                                        if(time.outpatientType==0){
                                            if(inventorynum==0){
                                                var txt="无";
                                            }else{
                                                var txt="有";
                                            }
                                            dutyNon='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')"   readonly class="input_text color_black" value="'+txt+'" type="text"/>'
                                        }
                                        if(time.outpatientType==1){
                                            dutyNon='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')"   readonly class="input_text color_blue" value="'+inventorynum+'" type="text"/>'
                                        }
                                        if(time.outpatientType==2){
                                            dutyNon='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')"   readonly class="input_text color_red" value="'+inventorynum+'" type="text"/>'
                                        }
                                        count='<input type="hidden" class="sourceId" value="'+time.sourceId+'"><input  class="input_outType" value="'+time.outpatientType+'" type="hidden"  ><input  class="input_state" value="'+state+'" type="hidden"  >'+dutyNon;
                                    }else if(state==2){
                                        $('.doc_mess>.schedule_detail_up:eq('+num+')').find("#doc_ques").append('<p>'+time.sourcedate.substring(5)+(time.sourcetime=="am"?"上午":"下午")+'缺诊</p>');
                                        var attr=$('.doc_mess>.schedule_detail_up:eq('+num+')').find("#doc_ques").attr("title");
                                        $('.doc_mess>.schedule_detail_up:eq('+num+')').find("#doc_ques").attr("title",attr+' '+time.sourcedate.substring(5)+(time.sourcetime=="am"?"上午":"下午")+'缺诊');                                        
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
   
                   // $(document.documentElement).animate({ scrollTop: 0 }, 300);
                   //  //支持chrome
                   //  $(document.body).animate({ scrollTop: 0 }, 300);
                   //
                   //
                   //schedulepage(page,startTime,count);
                    outTable(page,$('.schedule_name .department').attr('subjectId'))
            }
         });
   };

function schedulepage(page,date,count){
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
                     listTop(page,getday,date);
                    }
            }
         });
    }else {
        $('.schedule_page').hide();
    }
};


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
        var left="<a id='list_left' onclick='listTop("+page+","+(day_interval-7)+","+getYear(i-35)+")' href='javascript:void(0);'></a>";
        $(".schedule_tr_table tr td:first-child").addClass("point_left").prepend(left);
    }
        var right="<a id='list_right' onclick='listTop("+page+","+(day_interval+7)+","+getYear(i+35)+")' href='javascript:void(0);'></a>";
        $(".schedule_tr_table tr td:last-child").addClass("point_right").append(right);
//    加载排班信息
 querySchedule(page,$('.schedule_name .department').attr('subjectId'),getYear(i-7));
}

   //http://192.168.1.51:8333/eht/admin/scheduling/updateAudit
   //doctorIds=c06626b73fa801354176126c5cf637fd,c06671013fa801354176126cd76bcdf8&beginTime=2017-10-15&endTime=2017-10-17
$('.doc_mess').on('click','.auditBtn',function(){
    //alert($(this).attr('auditStatus') == '0')
    var self = this;
    if($(self).attr('auditStatus') == '0'){
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("确认审核？");
            $('.btn_return').click(function(){
                $('.smallMask').hide();
                $('.smallBox').hide();
            });
            $(".btn_sure").unbind('click').click(function () {
                //schedule_name
                //alert($(self).parent().siblings('.schedule_num').children('.doctorID').val() +'-'+$(self).parent().siblings('.schedule_name').text());
                $.ajax({
                  //  url:'http://192.168.1.51:8333/eht/admin/scheduling/updateAudit',
                  url:baseUrl+'eht/admin/scheduling/updateAudit',
                    type:'post',
                    data:{
                       doctorIds: $(self).parent().siblings('.schedule_num').children('.doctorID').val(),
                       beginTime: $(".schedule_tr_table>tbody>tr>td:first-child .table_day").html(),//获取起始时间
                       endTime:AddDays($(".schedule_tr_table>tbody>tr>td:first-child .table_day").html(),6)
                    },
                    success:function(data){
                       // console.log(data);
                        if(data.type == 1){
                             $('.smallMask').hide();
                            $('.smallBox').hide();
                            $(self).removeClass('mainBg');
                            $(self).text('已审核');
                            $(self).attr('auditStatus',1);
                            $(self).attr('disabled',true); 
                            $(self).css('cursor',none);  
                        }
                    }
                });
            });
    }
});

$('.table_submit').click(function(){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("确认审核全部信息吗？");
        $('.btn_return').click(function(){
            $('.smallMask').hide();
            $('.smallBox').hide();
        });
        $(".btn_sure").unbind('click').click(function () {
            var doctorIdsArr = $('.doctorID');
            var doctorIds = '';
            $.each(doctorIdsArr,function(index,doctorId){
                doctorIds += $(doctorId).val() +',';
            });
              // console.log(doctorIds.split(','));
              var arr = [];
              for(var i=0;i<doctorIds.split(',').length-1;i++){
                arr.push(doctorIds.split(',')[i])
              }
         //  console.log(arr +'---' +doctorIds)
           doctorIds = arr.join(',');
             $.ajax({
                  //  url:'http://192.168.1.51:8333/eht/admin/scheduling/updateAudit',
                   url:baseUrl + 'eht/admin/scheduling/updateAudit',
                    type:'post',
                    data:{
                       doctorIds:doctorIds,
                       beginTime: $(".schedule_tr_table>tbody>tr>td:first-child .table_day").html(),//获取起始时间
                       endTime:AddDays($(".schedule_tr_table>tbody>tr>td:first-child .table_day").html(),6)
                    },
                    success:function(data){
                        //console.log(data);
                        if(data.type == 1){
                             $('.smallMask').hide();
                            $('.smallBox').hide();
                            $('.auditBtn').removeClass('mainBg');
                            $('.auditBtn').text('已审核');
                            $('.auditBtn').attr('auditStatus',1);
                            $('.auditBtn').attr('disabled',true);  
                        }
                    }
             });  
        });
});


var handle;
function addHandle(e){
        handle = true;
       if(handle){
            $(e).parent().append('<a id="doctor_cancel" onclick="cancelHandle(this)" class="modify_record" href="javascript:void(0);">取消应急处理</a>');
            $(e).remove();
            
        }
};

function cancelHandle(e) {
    handle=false;
    if(!handle){
        $(e).parent().append('<a id="doctor_sourse" onclick="addHandle(this)" class="modify_record" href="javascript:void(0);">医生应急处理</a>');
        $(e).remove();
    }
   // console.log(handle);
}
//$(".detail_top>td>.back_ddd,.detail_bot>td>.back_ddd").bind('click').click(function(){
$(".doc_mess").on("click",".back_ddd",function(){
    if(!handle){
        return false;
    }
//    alert(11111111111111)
    // alert($(this).val());
    $('.smallMask').show();
    $('.smallBox').show();
    $(".btn_return").show();
    $('.smallBox .small_text').text('将短信通知已挂号人员改签?');
    var th=$(this);
    var index=$(this).parent().index();
    if(th.parents().hasClass("detail_top")){
        var time="am";
    }else{
        var time="pm";
    }
    var day=$(".table_day").eq(index).html().substring(5);
    var sourceId=th.siblings(".sourceId").val();
    $(".btn_sure").unbind("click").click(function(){
            $.ajax({
                //url:'http://www.51edoctor.cn/eht/admin/scheduling/MobileMsg',
                url:baseUrl + 'eht/admin/scheduling/MobileMsg',
                type:'post',
                data:{
                    sourceId:sourceId
                },
                success:function(data){
                 //   alert('change');
                    th.siblings(".input_state").val("2");
                    // th.removeClass("color_blue color_black color_red");
                    th.removeClass("back_ddd");
                    // th.css("color","#f2f2f2");
                    // th.css("background-color","#f2f2f2");
                    th.css("background-color","#ccc");
                    th.css("border-radius","0px");
                    th.parents(".schedule_detail_up").find("#doc_ques").append('<p>'+day+(time=="am"?"上午":"下午")+'缺诊</p>');
                    var attr=th.parents(".schedule_detail_up").find("#doc_ques").attr('title');
                    th.parents(".schedule_detail_up").find("#doc_ques").attr('title',attr+' '+day+(time=="am"?"上午":"下午")+'缺诊');
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                }
            })
    });
    $(".btn_return").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
    })
});

function outTable(page,subId) {
    var list = [{}];
    list[0].CurrentPage = page;
    list[0].totalPages = "6";
    list[0].subjectId = subId;
    list[0].hospitalId = sessionStorage.getItem('hospitalId'); 
    $(".export_table").unbind('click').click(function () {
          list[0].sourceDate = $(".schedule_tr_table>tbody>tr>td:first-child .table_day").html();
        $.ajax({
           // url:'http://192.168.1.51:8333/eht/admin/scheduling/CurrentSchedulingExcel',
            url:baseUrl + 'eht/admin/scheduling/CurrentSchedulingExcel',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
               // alert("导出成功");
                //console.log(data);
               window.location.href= baseUrl + "eht/uploadFile/"+data;
             //  window.location.href= "http://192.168.1.51:8333/eht/uploadFile/"+data;
//                $(".modify_record").attr("href","..\SchedulingExcl2017-08-03.xls");
            }
        });
    });
}