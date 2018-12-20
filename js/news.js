/**
 * Created by Administrator on 2017/8/22.
 */
/**
 * Created by Administrator on 2017/7/21.
 */
/**
 * Created by Administrator on 2017/7/13.
 */
var baseUrl = 'http://www.51edoctor.cn/';
//var baseUrl = 'http://192.168.1.51:8333/';
// if(!localStorage.getItem("sourceList")){
//     localStorage.setItem("sourceList","[]");
// }
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

//查看是否开启排班提醒
function hasOpenTime(){
    $.ajax({
        url:baseUrl+'eht/admin/hospitalUser/getRemindTime',
        type:"get",
        data:{
            userId:sessionStorage.getItem("userId")
        },
        success: function(data){
            if(data==""){
                return;
            }
            $("#remind").val(data.sendTime);
            if(data.isRemind=="1"){
                $(".openTime").hide();
                $(".closeTime").show();
                $(".setTime i").css("background-position","-30px 0px");
            }else if(data.isRemind=="0"){
                $(".openTime").show();
                $(".closeTime").hide();
                $(".setTime i").css("background-position","0px 0px");
            }
        }
    })
}

//返回当天日期
function getCurrentDay(){
    var date = new Date();
    var month =  (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1)
    day = date.getDate()<10?'0'+date.getDate():date.getDate();
    var currentDay = date.getFullYear()+ '-' + month + '-' + day;  //显示当天日期
    return currentDay;
}

//数组对象sourceId属性去重复
function clearRepeat(arr){
    var hash={};
    for(var i=arr.length-1;i>=0;i--){
        var sourceId = arr[i].sourceId;
        if(!hash[sourceId]){
            hash[sourceId]=true;
        }else{
            arr.splice(i,1);
        }
    }
    return arr;
}
//数组去除指定sourceId对象
function removeSourceId(arr,sourceId){
    for(var i=0;i<arr.length;i++){
        if(arr[i].sourceId===sourceId){
            arr.splice(i,1);
        }
    }
    return arr;
}

// 医院排班员获得所有科室信息
function getAllSub(){
    if(sessionStorage.getItem("roleId")==="医院排班员"){
        $(".select_box").show();
    }else if(sessionStorage.getItem("roleId")==="科室排班员"){
        $(".select_box").hide();
        return false;
    }
    $.ajax({
        url:baseUrl+'eht/admin/hospitalUser/selectSub',
        async:false,
        type:"post",
        data:{
            hospitalId:sessionStorage.getItem("hospitalId")
        },
        success: function(data){
            if(data.length>0){
                var html="";
                for(var i=0;i<data.length;i++){
                    html+='<option value="'+data[i].departmentId+'">'+data[i].subName+'</option>';
                }
                $("#sub_select").html(html);
                if(sessionStorage.getItem("subjectName")&&sessionStorage.getItem("subjectId")){
                    var id = sessionStorage.getItem("subjectId");
                    $("#sub_select").val(id);
                }else{
                    sessionStorage.setItem("subjectName",data[0].subName);
                    sessionStorage.setItem("subjectId",data[0].departmentId);
                }
            }
        }
    })
}

//医院排班员选择切换科室
function changeSub(){
    var id = $("#sub_select>option:selected").val();
    var name = $("#sub_select>option:selected").text();
    sessionStorage.setItem("subjectName",name);
    sessionStorage.setItem("subjectId",id);
    listTop(1,0,'undefined','undefined','undefined');
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

//schedule_list(page,na,du,getYear(i-7));
function schedule_list(page,na,du,da){
    var list=[{}];
    getYear(1);
    list[0].CurrentPage=page;
    list[0].totalPages="8";
    list[0].hospitalId=sessionStorage.getItem('hospitalId');
    list[0].subjectId=sessionStorage.getItem('subjectId');
//  list[0].dateTime=getYear(1);
    na=="undefined"||na==undefined?list[0].doctor_name="":list[0].doctor_name=na;
    du=="undefined"||du==undefined||du==" "?list[0].doctor_duty="":list[0].doctor_duty=du;
    da=="undefined"||da==undefined?list[0].sourceDate="":list[0].sourceDate=da;
   // console.log(list);
//    console.log(JSON.stringify(list));
//http://192.168.1.51:8333/
    $.ajax({
        url:baseUrl+'eht/admin/scheduling/CurrentSchedulingQuery',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        async:false,
        success: function (data) {
            $("caption p").html(sessionStorage.getItem('subjectName')+"门诊排班表");
           //  $("caption span").html("("+da+"~"+AddDays(da,6)+")");
            $("#doc_ques").attr("title","");
            $("#doc_ques").html("");
            $(".doc_mess").empty();
//            console.log(JSON.parse(data[7].objSource).length);
            if (data == [] || data.length == 0) {
                // $('.smallMask').show();
                // $('.smallBox').show();
                // $(".small_text").html("未查找到信息");
                // $(".btn_return").hide();
                // $(".btn_sure").click(function () {
                //     $('.smallMask').hide();
                //     $('.smallBox').hide();
                // })
                return false;
            }
            var num=data[0].num;
            var count = Math.ceil(num / 8);
            var html;
            var i=1;
            $.each(data, function (index,val) {
                var list=JSON.parse(val.objSource);
//                职称转变
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
                }

//                console.log();
                var text;
                var type=val.outpatientType;
                if(val.doctorname=="普通门诊"){
                    text='<select style="height: 60px" class="sle_type"><option  value="0">普通门诊</option></select>';
                }else{
                    switch(parseInt(val.duty)){
                    case 0:
                        text='<select style="height: 30px" class="sle_type"><option  value="0">普通门诊</option></select>';
                        break;
                    case 1:
                        text='<select style="height: 30px" class="sle_type"><option  value="0">普通门诊</option></select>';
                        break;
                    case 2:
                        text='<select style="height: 30px" class="sle_type"><option  value="0">普通门诊</option></select>';
                        break;
                    case 3:
                        text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option><option value="1">专家门诊</option><option value="2">特需门诊</option></select>';
                        break;
                    case 4:
                        text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option><option value="1">专家门诊</option><option value="2">特需门诊</option></select>';
                        break;

//                      var x = index;
//                      alert(x)     
//                      $('.common_on input[value="1"]').click(function(){
//                      //debugger;
//                      //  $(".doc_mess").click().empty(".inpuy_text");
//                      //var add = $('.schedule_detail_up');
//                      //alert(add)
//                      //console.log($('.schedule_detail_up').get(0).outerHTML)
//                      //$(".doc_mess").append(add.clone());
//                      alert(i)
//                      text='<div class="common_on">专家门诊<input type="submit" value="1" class="specialist"></input><input type="submit" value="2" name="2" class="special"></input></div>';
//                      html='<tr class="schedule_detail_up"><td class="schedule_num"><input class="input_type" type="hidden" value="'+val.outpatientType+'"/><input class="doc_state" type="hidden" value="'+val.state+'"/><input class="doctorID" type="hidden" value="'+val.doctorID+'"/><b>'+i+'</b><img onclick="modify(this,\''+val.doctorID+'\',\''+val.doctorname+'\',\''+duty+'\',\''+type+'\',\''+i+'\')" src="images/mess_08.png" alt=""></td><td  class="schedule_name">'+val.doctorname+'</td><td  class="schedule_title">'+duty+'</td><td  class="schedule_title schedule_text">'+text+'</td><td  class="schedule_time"><p>上午</p><p>下午</p></td><td colspan="7"><table class="schedule_detail_table table-responsive"><tr class="detail_top"><td  class="time_tus"><input maxlength="2" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr><tr class="detail_bot"><td  class="time_tus"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr></table></td><td class="schedule_button"><div id="doc_ques" title=""></div></td></tr>'
//                      $(".doc_mess").append(html);
//                      //alert(11)
//                       });
//                      
                       
//                    de ault :
//                        text='<select style="height: 30px" class="sle_type"><option value="0">普通门诊</option><option value="1">专家门诊</option><option value="2">特需门诊</option></select>';
                }
                //text='<div class="common_on">专家门诊<input type="submit" value="1" class="specialist"></input><input type="submit" value="2" name="2" class="special"></input></div>';
//              html='<tr class="schedule_detail_up"><td class="schedule_num"><input class="input_type" type="hidden" value="'+val.outpatientType+'"/><input class="doc_state" type="hidden" value="'+val.state+'"/><input class="doctorID" type="hidden" value="'+val.doctorID+'"/><b>'+i+'</b><img onclick="modify(this,\''+val.doctorID+'\',\''+val.doctorname+'\',\''+duty+'\',\''+type+'\',\''+i+'\')" src="images/mess_08.png" alt=""></td><td  class="schedule_name">'+val.doctorname+'</td><td  class="schedule_title">'+duty+'</td><td  class="schedule_title schedule_text">'+text+'</td><td  class="schedule_time"><p>上午</p><p>下午</p></td><td colspan="7"><table class="schedule_detail_table table-responsive"><tr class="detail_top"><td  class="time_tus"><input maxlength="2" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr><tr class="detail_bot"><td  class="time_tus"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr></table></td><td class="schedule_button"><div id="doc_ques" title=""></div></td></tr>'
//              $(".doc_mess").append(html);
            }
                //console.log(parseInt(val.duty));
//              var aa = $(this).parents(".schedule_detail_up").find(".common_on input").val()
//              alert(aa);
//              if () {
//                  
//              }
//              text='<div class="common_on">专家门诊<input type="hidden" value="1" class="specialist"></input><input type="hidden" value="2" name="2" class="special"></input></div>';
                if(val.recordRemindTime!=""){
                    var limitDay = val.recordRemindTime;
                }else{
                    var limitDay = "未排班";
                }
                html='<tr class="schedule_detail_up"><td class="schedule_num"><input class="input_type" type="hidden" value="'+val.outpatientType+'"/><input class="doc_state" type="hidden" value="'+val.state+'"/><input class="doctorID" type="hidden" value="'+val.doctorID+'"/><b>'+i+'</b><img onclick="modify(this,\''+val.doctorID+'\',\''+val.doctorname+'\',\''+duty+'\',\''+type+'\',\''+i+'\')" src="images/mess_08.png" alt=""></td><td  class="schedule_name">'+val.doctorname+'</td><td  class="schedule_title" duty='+val.duty+'>'+duty+'</td><td  class="schedule_time"><p>上午</p><p>下午</p></td><td colspan="7"><table class="schedule_detail_table table-responsive"><tr class="detail_top"><td  class="time_tus"><input maxlength="2" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr><tr class="detail_bot"><td  class="time_tus"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr></table></td><td>'+limitDay+'</td><td><button class="btn_repeat">排班复制</button></td><td class="schedule_button"><div id="doc_ques" title=""></div></td></tr>'
//              text='<div class="common_on">专家门诊<input type="hidden" value="1" class="specialist"></input><input type="hidden" value="2" name="2" class="special"></input></div>';
//              html='<tr class="schedule_detail_up"><td class="schedule_num"><input class="input_type" type="hidden" value="'+val.outpatientType+'"/><input class="doc_state" type="hidden" value="'+val.state+'"/><input class="doctorID" type="hidden" value="'+val.doctorID+'"/><b>'+i+'</b><img onclick="modify(this,\''+val.doctorID+'\',\''+val.doctorname+'\',\''+duty+'\',\''+type+'\',\''+i+'\')" src="images/mess_08.png" alt=""></td><td  class="schedule_name">'+val.doctorname+'</td><td  class="schedule_title">'+duty+'</td><td  class="schedule_title schedule_text">'+text+'</td><td  class="schedule_time"><p>上午</p><p>下午</p></td><td colspan="7"><table class="schedule_detail_table table-responsive"><tr class="detail_top"><td  class="time_tus"><input maxlength="2" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr><tr class="detail_bot"><td  class="time_tus"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_wed"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_thu"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_fri"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sat"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_sun"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td><td  class="time_mon"><input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" readonly class="input_text"  type="text"/></td></tr></table></td><td class="schedule_button"><div id="doc_ques" title=""></div></td></tr>'
                i++;

              
                // document.onclick = function(W3CEvent){
                // var rowIndex = W3CEvent.srcElement.parentNode;
                // var currentrow = W3CEvent.srcElement.parentNode;
                // var parentnode = currentrow.parentNode;
                // var newrow = currentrow.cloneNode(true);
                // parentnode.appendChild(newrow);
                // }
                var num=index;
                $(".doc_mess").append(html);
                $.each(list,function (index,time){
                    for(var i=0;i<$(".table_day").length;i++){
                        if($(".table_day").eq(i).html()==time.sourcedate){
                            var count='';
                            var inventorynum=parseInt(time.totalNum)+parseInt(time.newNum?time.newNum:0);
                            var state=time.state;
                            var auditState=time.auditState;
//                            console.log(inventorynum,typeof (inventorynum));
                            if(state==1){
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
                                 
//                                count='<span class="color_red">'+inventorynum+'</span>';
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
                                
//                                count='<span class="color_blue">'+inventorynum+'</span>';
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
                                
                            }else if(state==3){
                                var dutyNum = '';
                                if(time.outpatientType==0){
                                    if(inventorynum==0){
                                        var txt="无";
                                    }else{
                                        var txt="有";
                                    }
                                   
                                    dutyNum='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')"   readonly class="input_text color_black" value="'+txt+'" type="text"/>'
                                }
                                if(time.outpatientType==1){
                                    
                                        dutyNum='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')"   readonly class="input_text color_blue" value="'+inventorynum+'" type="text"/>'
                                    
                                    
                                }
                                if(time.outpatientType==2){
                                    
                                        dutyNum='<input maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')"   readonly class="input_text color_red" value="'+inventorynum+'" type="text"/>'
                                    
                                    
                                }
                                count='<input type="hidden" class="sourceId" value="'+time.sourceId+'"><input  class="input_outType" value="'+time.outpatientType+'" type="hidden"  ><input  class="input_state" value="'+state+'" type="hidden">'+dutyNum;
                            }
                            //2018/1/11  应急确诊样式修改  P264
                            if(time.sourcetime=="am"){
                                if(state==1||state==2){
//                                    $('.doc_mess>.schedule_detail_up:eq('+num+') .detail_top>td:eq('+i+')').css("background-color","#f2f2f2");
                                }
                                $('.doc_mess>.schedule_detail_up:eq('+num+') .detail_top>td:eq('+i+')').html(count);
                            }else if(time.sourcetime=="pm"){
                                if(state==1||state==2){
//                                    $('.doc_mess>.schedule_detail_up:eq('+num+') .detail_bot>td:eq('+i+')').css("background-color","#f2f2f2");
                                }
                                $('.doc_mess>.schedule_detail_up:eq('+num+') .detail_bot>td:eq('+i+')').html(count);
                            }
                        }
                    }
                })
            })
//            鼠标放上去变为输入框
            $('.input_text').keyup(function(){
                if (!(/(^[1-9]\d*$)/.test($(this).val()))) {
        　　　　　//　alert(‘输入的不是正整数’); 
        　　　　　　//return false; 
                    $(this).val('');
                }
            });
            $(".input_text").bind("click").click(function () {
                var type=$(".schedule_mess").find("input[type='radio']:checked").val();
                //已提交或临时缺诊不能点击
                if($(this).siblings(".input_state").val()=="1"||$(this).siblings(".input_state").val()=="2"){
                    return;
                }
                //专家门诊和特需门诊只能由主任医师和副主任医师接诊
                var doc_name=$(this).parents(".schedule_detail_up").find(".schedule_title").text();
                if(type=="1"||type=="2"){
                    if(doc_name!=="主任医师"&&doc_name!=="副主任医师"){
                        return;
                    }
                }
                //获取日期下标
                var index=$(this).parent().index();
//                获取日期
                var date=$(".schedule_tr_table tr>td").eq(index).find(".table_day").html();
                var currentDay = getYear(0);
                if(new Date(date).getTime()<new Date(currentDay).getTime()){
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("排班日期已过期,请排当天或以后的号源!");
                    $(".btn_return").hide();
                    $(".btn_sure").unbind("click").click(function () {
                        $('.smallMask').hide();
                        $('.smallBox').hide();
                    })
                    return;
                }
                if($(this).val()=="有"){
                    $(this).val("1");
                }else if($(this).val()=="无"){
                    $(this).val("0");
                }
                // if($(this).val() ==0 ||$(this).val() ==00) {
                //     $(this).val("");
                // }
                $(this).removeAttr("readonly");
                $(this).removeClass("color_blue").removeClass("color_red");
                $(this).css("color","#333");
                var text=$(this).val();
                var id=$(this).parents(".schedule_detail_up").find(".doctorID").val();
//                获取上下午
                if($(this).parents().hasClass("detail_top")){
                    var timeDay="am";
                }else{
                    var timeDay="pm";
                }
//                获取门诊类别 
//              var type=$(this).parents(".schedule_detail_up").find(".sle_type option:selected").val();
                
                    // $(function(){
                    //     $(':checkbox[type="checkbox"]').each(function(){
                    //         $(this).click(function(){
                    //             if($(this).attr('checked')){
                    //                 $(':checkbox[type="checkbox"]').removeAttr('checked');
                    //                 $(this).attr('checked','checked');
                    //                 alert(this.id);
                    //             }
                    //         });
                    //     });
                    // });
            //     $(document).ready(function(){
            //     var idsstr = "";
            //     var isc = "";
            //     $("input[name=chkId]").each(function(){ //遍历table里的全部checkbox
            //         idsstr += $(this).val() + ","; //获取所有checkbox的值
            //         if($(this).attr("checked")) //如果被选中
            //             isc += $(this).val() + ","; //获取被选中的值
            //     });
            //     if(idsstr.length > 0) //如果获取到
            //         idsstr = idsstr.substring(0, idsstr.length - 1); //把最后一个逗号去掉
            //     // if(isc.length > 0) //如果获取到
            //     //     isc = isc.substring(0, isc.length - 1); //把最后一个逗号去掉
            //     alert("所有checkbox的值：" + idsstr);
            //     alert(isc);
            // });

                // console.log(type);
                // alert(type)
                $(this).focus();
                $(this).off('blur');
                $(this).on('blur',function() {
                    console.log("haha")
                    var num=$(this).val();
                    $(this).val(num);
                   // console.log(num);
                    $(this).attr("readonly","readonly");
//                    $(this).css("color","white");
//                    if($(this).val()<10&&$(this).val()!=0){
//                        $(this).addClass("color_red");  
//                    }
//                    if($(this).val()>0){
//                        $(this).addClass("color_blue");
//                    }
                    if(text){
                        var sourceId =$(this).siblings(".sourceId").val();
                        if(type==0){
                            $(this).removeClass("color_blue color_black color_red").addClass("color_black");
                            // if(num==""||num==" "||num==0 || num == 00){
                            //     num=0;
                            //     $(this).val("无");
                            // }else{
                            //     num=100;
                            //     $(this).val("有");
                            // }
                            if(num>0){
                                num=100;
                               $(this).val("有");
                            }
                        }
                        if(type==1){
                            $(this).removeClass("color_blue color_black color_red").addClass("color_blue");
                        }
                        if(type==2){
                            $(this).removeClass("color_blue color_black color_red").addClass("color_red");
                        }
                        if(num==""||num==" " ||num==0 || num == 00){
                            num=0;
                            $(this).val("");
                            $(this).parent().find(".input_state").remove();
                            $(this).parent().find(".input_outType").remove();
                            $(this).parent().find(".sourceId").remove();
                            $(this).removeClass("color_blue color_black color_red");
                        }
//                        修改
                        revise(num,id,sourceId,date,timeDay,type);


                    }
                    if(!text){
                        if(num==""||num==" "||num=="0"){
                            $(this).val("");
                            return;
                        }
                        if(num!=""&&num!=" "){
//                        
//                            $(this).parents(".schedule_detail_up").find(".schedule_button").html('<button onclick="refer(this)" class="btn_ready">提交</button>');
                            if(!$(this).siblings().hasClass("input_state")){
                                $(this).parent().prepend('<input class="input_state" value="0" type="hidden">');
                            }
                        }
                        if(type==0){
                            $(this).removeClass("color_blue color_black color_red").addClass("color_black");
                            $(this).parent().prepend('<input class="input_outType" value="0" type="hidden">');
                                num=100;
                                $(this).val("有");

                        }
                        if(type==1){
                            $(this).removeClass("color_blue color_black color_red").addClass("color_blue");
                            $(this).parent().prepend('<input class="input_outType" value="1" type="hidden">');
                        }
                        if(type==2){
                            $(this).removeClass("color_blue color_black color_red").addClass("color_red");
                            $(this).parent().prepend('<input class="input_outType" value="2" type="hidden">');
                        }
//                        添加
                        addWork(this,id,type,timeDay,num,date);
                    }
                })
            })
            // if($(".raido_type>span.active")){
            //     var radioclass = $(".raido_type>span.active").prev().children(".radioclass").val();
            //     //doctor_duty是医生职称duty值   主任医师 4, 副主任医师 3, 主治医师 2, 医师 1, 其他 0
            //     if($(radioclass).val()=="1"||$(radioclass).val()=="2"){
            //         du="3,4";
            //     }else{
            //         du="0,1,2,3,4";
            //     }
            // }

            //选择门诊类别显示医生数据 专家门诊和特需门诊只显示主任医师和副主任医师
            $(".radioclass").unbind("click").click(function(){
                if($(".radioclass:checked").val()==""){
                    du="";
                }else if($(".radioclass:checked").val()=="0"){
                    du="0,1,2,3,4";
                }else if($(".radioclass:checked").val()=="1"||$(".radioclass:checked").val()=="2"){
                   //schedule_list(page,na,"3,4",getYear(i-7));
                    du="3,4";
                }
                radioChange($(this),1,na,du,da);
                if($(".raido_type>span.active")){
                    $(".back_all").text("当前为"+$(".raido_type>span.active").text()+"排班操作");
                }
            });
            // //排班复制点击 进入设置周期页面
            // $(".doc_mess").on("click",".btn_repeat",function(){
            //     btnRepeat($(this),page,na,du,da);
            // });
            // alert(html);
            //$(document.documentElement).animate({ scrollTop: 0 }, 300);
            //支持chrome
            //$(document.body).animate({ scrollTop: 0 }, 300);
            //schedulepage(page,na,du,da,count);
            outTable(page,na,du,da);
        }

    })

}

//选择门诊类别显示医生数据 专家门诊和特需门诊只显示主任医师和副主任医师
function radioChange(shelf,page,na,du,da){
    $(shelf).parent().next().addClass("active").siblings("span").removeClass("active");
    if($(shelf).val()==""|| !$(shelf).val()){
        return;
    }
    var firstDate = $(".table_day");
    var date=$(".schedule_tr_table>tbody>tr>td:first-child .table_day").html();//获取起始时间
    var val = Date.parse(date);
    var newDate = new Date(val);
    var date1 = new Date();
    var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
    var time=newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate();//
    time==""?time=time1:time;
    var getday=DateDiff(time,time1);
    listTop(page,getday,na,du,da);
}
//});

function schedulepage(page,na,du,da,count) {
    if (count > 1) {
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
            ajax: {
                on: false,
                onClick: function(page) {
//                    schedule_list(page,na,du,da);
                    var date=$(".schedule_tr_table>tbody>tr>td:first-child .table_day").html();//获取起始时间
                    // console.log(typeof (date));
                    var val = Date.parse(date); 
                    var newDate = new Date(val);
                    var date1 = new Date();
                    var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
                    var time=newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate();//
                    time==""?time=time1:time;
                    var getday=DateDiff(time,time1);
                 //   alert(getday+'-------'+page); //查询的起始时间和当前时间的间隔天数
                    // alert(na)
                    listTop(page,getday,na,du,da);
                }
            }
        });
    } else {
        $('.schedule_page').hide();
    }
}

//排班复制点击 进入设置周期页面
$(".doc_mess").on("click",".btn_repeat",function(){
    var self = this;
    // 判断排班日期是否过期
    var date=$(".table_day").eq(0).text();
    var currentDay = getYear(0);
    if(new Date(date).getTime()<new Date(currentDay).getTime()){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("排班日期已过期,请排当天或以后的号源!");
        $(".btn_return").hide();
        $(".btn_sure").unbind("click").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
        })
        return;
    }
    var doctorId=$(self).parents(".schedule_detail_up").find(".doctorID").val();
    var tableText = $(self).parents(".schedule_detail_up").find(".schedule_detail_table");
    $(".repeatMask").fadeIn();
    $(".repeatBox").fadeIn();
    $(".btn_sure1").unbind("click").click(function(){
        $(".repeatMask").fadeOut();
        $(".repeatBox").fadeOut();
        var date = new Date();
        var year = date.getFullYear();
        var month=date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var dayTime=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var first=year+'-'+month+'-'+dayTime;
        //var day_num= Math.ceil(DateDiff(sourcedate,first)/7);
        var day_num = 1;
        if ($(".half_year").html()=="周排班") {
            var txt=2-day_num;
            var type=1;
        }if ($(".half_year").html()=="月排班") {
            var txt=5-day_num;
            var type=2;
        }if ($(".half_year").html()=="半年排班"){
            var txt=27-day_num;
            var type=3;
        }if ($(".half_year").html()=="一年排班"){
            var txt=53-day_num;
            var type=4;
        }
        var jsonObj = [];
        var sevenDays = $(".table_day");
        //获取7天日期信息
        for(var j=0;j<sevenDays.length;j++){
            //sourcedate为下周开始的同星期的日期(开始复制的日期)
            var sourcedate = AddDays($(sevenDays[j]).text(),7);
            var con='';
            for(var i=0;i<txt;i++){
                con=AddDays(sourcedate,7*i)
                // if(i<txt-1){
                //     con+=AddDays(sourcedate,7*i)+',';
                // }else{
                //     con+=AddDays(sourcedate,7*i);
                // }
                //上午  下午
                for(var k=0;k<2;k++){
                    var obj = {};
                    var outpatientType=0;
                    var sourceTime;
                    var num = $(tableText).find("tr").eq(k).children().eq(j).children().last().val();
                    var state = $(tableText).find("tr").eq(k).children().eq(j).children(".input_state").val();
                    obj.sourceDate = con;
                    if(num === "有"){
                        num =100;
                    }else if(num === "无"){
                        num =0;
                    }else if(num === ""){
                        continue;
                    }
                    obj.num = num;
                    if(state === "0"){
                        obj.state = 0;
                    }else if(state === "1"){
                        //obj.state = 1;
                        continue;
                    }else{
                        continue;
                    }
                    if($(tableText).find("tr").eq(k).children().eq(j).children().last().hasClass("color_red")){
                        outpatientType = 2;
                    }else if($(tableText).find("tr").eq(k).children().eq(j).children().last().hasClass("color_blue")){
                        outpatientType = 1;
                    }else if($(tableText).find("tr").eq(k).children().eq(j).children().last().hasClass("color_black")){
                        outpatientType = 0;
                    }
                    obj.outpatientType = outpatientType;
                    if(k===0){
                        sourceTime = "am";
                    }else{
                        sourceTime = "pm";
                    }
                    obj.sourceTime = sourceTime;
                    jsonObj.push(obj);
                }
            }
        }
        if(jsonObj.length==0||!jsonObj){
            return false;
        }
        var list={
              doctorId:doctorId,
              hospitalId:sessionStorage.getItem("hospitalId"),
              subjectId:sessionStorage.getItem("subjectId"),
              userId:sessionStorage.getItem("userId"),
              jsonObj:JSON.stringify(jsonObj)
        }
        $.ajax({
            url:baseUrl+'eht/admin/scheduling/CurrentSchedulingInsert',
            type:'post',
            data:list,
            dataType: "json",
            beforeSend:function(XMLHttpRequest){
                $(".smallMask").show();
                $(".waitingBox").show();
            },
            success: function (data) {
                $(".smallMask").hide();
                $(".waitingBox").hide();
                if(data ==""|| data.length==0){
                    return false;
                }else if(data==1){
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("复制成功");
                    $(".btn_return").hide();
                    $(".btn_sure").unbind("click").click(function () {
                        $('.smallMask').hide();
                        $('.smallBox').hide();
                    })
                }

                // var source = JSON.parse(localStorage.sourceList);
                // for(var i=0;i<jsonObj.length;i++){
                //     var id ={};
                //     id.firstday = first;
                //     id.lastday = AddDays(first,(txt*7));
                //     id.type = jsonObj[i].outpatientType;
                //     id.periodofvalidity = AddDays(first,(txt*7-7));
                //     id.sourceId = data[i];
                //     source.push(id);
                // }
                // localStorage.sourceList=JSON.stringify(clearRepeat(source));
                
                // var date=$(".schedule_tr_table>tbody>tr>td:first-child .table_day").html();//获取起始时间
                // var val = Date.parse(date); 
                // var newDate = new Date(val);
                // var date1 = new Date();
                // var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
                // var time=newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate();//
                // time==""?time=time1:time;
                // var getday=DateDiff(time,time1);
                // var du;
                // if($(".raido_type>span.active")){
                //     var radioclass = $(".raido_type>span.active").prev().children(".radioclass").val();
                //     //doctor_duty是医生职称duty值   主任医师 4, 副主任医师 3, 主治医师 2, 医师 1, 其他 0
                //     if($(radioclass).val()=="1"||$(radioclass).val()=="2"){
                //         du="3,4";
                //     }else{
                //         du="0,1,2,3,4";
                //     }
                // }
                // listTop(1,getday,'undefined',du,'undefined');
            }
       })
    });
    $(".btn_return1").click(function(){
        $(".repeatMask").fadeOut();
        $(".repeatBox").fadeOut();
    });
    $(".repeatBox>.alert-close").click(function(){
        $(".repeatMask").fadeOut();
        $(".repeatBox").fadeOut();
    });
    $(self).unbind("click");
    $(".choose_time").children().removeClass("half_year").eq(0).addClass("half_year");
})
//}


function revise(num,doctorId,sourceId,sourceDate,SourceTime,type) {
    $.ajax({
        url:baseUrl+'eht/admin/scheduling/CurrentSchedulingUpdate',
        type:'post',
        data:{
            num:num,
            doctorId:doctorId,
            sourceDate:sourceDate,
            SourceTime:SourceTime,
            outpatientType:type
        },
        success: function (data){
            if(data =="" || data.length==0){
                return false;
            }
            // var source = JSON.parse(localStorage.sourceList);
            // if(num>0){
            //     var id ={};
            //     id.firstday = sourceDate;
            //     id.lastday = sourceDate;
            //     id.type = type;
            //     id.periodofvalidity = sourceDate;
            //     id.sourceId = sourceId;
            //     source.push(id);
            //     localStorage.sourceList=JSON.stringify(clearRepeat(source));
            // }else if(num==0){
            //     localStorage.sourceList=JSON.stringify(removeSourceId(source,sourceId));
            // }
        }
    })
}

function addWork(shelf,id,type,day,num,sourcedate){
    var date = new Date();
    var year = date.getFullYear();
    var month=date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var dayTime=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var first=year+'-'+month+'-'+dayTime;
    var day_num= Math.ceil(DateDiff(sourcedate,first)/7);

    //XX排班表标题下的  周，月，半年，年排班复制功能去掉  仅留下当前时间的数据添加
    // if ($(".half_year").html()=="周排班") {
    //     var txt=1-day_num;
    // }if ($(".half_year").html()=="月排班") {
    //     var txt=5-day_num;
    // }if($(".half_year").html()=="半年排班"){
    //     var txt=26-day_num;
    // }if($(".half_year").html()=="一年排班"){
    //     var txt=52-day_num;
    // }
    // var con='';
    // for(var i=0;i<txt;i++){
    //     if(i<txt-1){
    //         con+=AddDays(sourcedate,7*i)+',';
    //         console.log(AddDays(sourcedate,7*i));
    //     }else{
    //         con+=AddDays(sourcedate,7*i);
    //     }

    // }
    con=AddDays(sourcedate,0);
//    return false;

    var list=[{
          outpatientType:type,
          sourceTime:day,
          num:num,
          sourceDate:con
      }]

    $.ajax({
        url:baseUrl+'eht/admin/scheduling/CurrentSchedulingInsert',
        type:'post',
        data:{
              doctorId:id,
              hospitalId:sessionStorage.getItem("hospitalId"),
              subjectId:sessionStorage.getItem("subjectId"),
              userId:sessionStorage.getItem("userId"),
              jsonObj:JSON.stringify(list)
        },
        dataType: "json",
        success: function (data) {
            if(data =="" || data.length==0){
                return false;
            }
            $(shelf).parent().prepend('<input type="hidden" class="sourceId" value="'+data[0]+'">');
            // var source = JSON.parse(localStorage.sourceList);
            // var id ={};
            // id.firstday = con;
            // id.lastday = con;
            // id.type = type;
            // id.periodofvalidity = con;
            // id.sourceId = data[0];
            // source.push(id);
            // localStorage.sourceList=JSON.stringify(clearRepeat(source));
        }
    })

}
//点击确认提交
function refer(e) {
    var id=$(e).parents(".schedule_detail_up").find(".doctorID").val();
    var first=$(".schedule_tr_table tr>td:eq(0) .table_day").html();
    var last=$(".schedule_tr_table tr>td:eq(6) .table_day").html();
    $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html("确认提交?");
    $(".btn_return").show();
    $(".btn_sure").click(function () {
        $.ajax({
            url:baseUrl+'eht//admin/scheduling/updateState',
            type:'post',
            data:{
                doctorId:id,
                fristDate:first,
                lastDate:last,
                subjectId:sessionStorage.getItem('subjectId'),
                hospitalId:sessionStorage.getItem('hospitalId')
            },
            async:false,
            success: function (data) {
                $(e).parents(".schedule_detail_up").find(".doc_state").val("1");
                $(e).parents(".schedule_detail_up").find(".input_state").siblings(".input_text").addClass("back_ddd").parent().css("background-color","#f2f2f2");
                $(e).parents(".schedule_detail_up").find(".input_state").val("1");
                var html='<input type="hidden" value="1"/><button class="btn_refer">已提交</button>';
                $(e).parent().html(html);
                $('.smallMask').hide();
                $('.smallBox').hide();
            }
        })

    })
}

$('.smallBox .btn_return').click(function(){
    $('.smallMask').hide();
     $('.smallBox').hide();
});

//全部提交
$(".table_submit").unbind("click").click(function () {
    if($(".schedule_num>.doctorID").length==0){
        return;
    }
    // var date = new Date();
    // var year = date.getFullYear();
    // var month=date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    // var day=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    // var first=year+'-'+month+'-'+day;
    // var last= AddDays(first,365);
    $('.smallMask').show();
    $('.smallBox').show();
    $(".alertBox_top>p").text("温馨提示");
    $(".small_text").html("确认提交?");
    $(".btn_return").show();
    $(".btn_sure").unbind("click").click(function () {
        $('.smallMask').hide();
        $('.smallBox').hide();
        $(".waitingBox").show();
        var flag=false;
        var list=[{}];
        var source=[];
        list[0].hospitalId=sessionStorage.getItem('hospitalId');
        list[0].subjectId=sessionStorage.getItem('subjectId');
        list[0].doctor_name="";
        list[0].doctor_duty="";
        list[0].sourceDate="";
        $.ajax({
            url:baseUrl+'eht/admin/scheduling/CurrentSchedulingQuery2',
            // url:'http://192.168.1.92:8333/eht/admin/scheduling/CurrentSchedulingQuery2',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            async:false,
            dataType: "json",
            success: function (data) {
                if(data==""||data=="[]"){
                    flag=true;
                }
                for(var i=0;i<data.length;i++){
                    var obj={};
                    obj.type=data[i].outpatientType;
                    obj.sourceId=data[i].sourceId;
                    obj.firstday=data[i].sourcedate;
                    obj.lastday=data[i].sourcedate;
                    obj.periodofvalidity=data[i].sourcedate;
                    source.push(obj);
                }
            }
        })
        if(flag){
            $(".waitingBox").hide();
            $(".smallBox").show();
            $(".alertBox_top>p").text("提交失败");
            $(".small_main>p").text("请添加排班数据");
            $(".small_btn>.btn_return").hide();
            $(".small_btn>.btn_sure").unbind("click").click(function(){
                $(".smallBox").hide();
            });
            return false;
        }
        var jsonObj = {};
        jsonObj.hospitalId=sessionStorage.getItem("hospitalId");
        jsonObj.subjectcontents=sessionStorage.getItem("subjectId");
        jsonObj.submituserid = sessionStorage.getItem("userId");
        jsonObj.sourceList = JSON.stringify(source);
        $.ajax({
            url:baseUrl+'eht/admin/scheduling/addScheduRecordAndupdateAudit',
            type:'post',
            data:{jsonObj:JSON.stringify(jsonObj)},
            dataType: "json",
            async:false,
            success: function (data) {
                if(data===1){
                    $(".waitingBox").hide();
                    window.location.reload();
                }
            },
            error:function(){
                alert("网络错误");
            }
        })

    })
})


//获取年月日
function getYear(obj) {
    var date1 = new Date();
    var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
    var date2 = new Date(date1);//当前标准时间
    date2.setDate(date1.getDate()+obj);
    var time2 = date2.getFullYear()+"-"+((date2.getMonth()+1)>9?(date2.getMonth()+1):"0"+(date2.getMonth()+1))+"-"+(date2.getDate()>9?date2.getDate():"0"+date2.getDate());
    return time2;
}

function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays;
    aDate  =  sDate1.split("-");
    // oDate1  =  new Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);    //转换为12-18-2002格式
    oDate1  =  new Date(aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]);
    aDate  =  sDate2.split("-");
    // oDate2  =  new Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
      oDate2  =  new Date(aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]);
    //console.log( parseInt((oDate1  -  oDate2) ))
    iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24);  //把相差的毫秒数转换为天数
    return  iDays;
}


 function AddDays(dates,days){
     var nd = new Date(dates);
//     console.log(nd);
        nd = nd.valueOf();
        nd = nd + days * 24 * 60 * 60 * 1000;
        nd = new Date(nd);
        //alert(nd.getFullYear() + "年" + (nd.getMonth() + 1) + "月" + nd.getDate() + "日");
        var y = nd.getFullYear();
        var m = nd.getMonth()+1;
        var d = nd.getDate();
        if(m <= 9) m = "0"+m;
        if(d <= 9) d = "0"+d;
        var cdate = y+"-"+m+"-"+d;
        return cdate;
}


// alert(getWeek(0));
function getWeek(aa) {
    var now = new Date();
    var day=now.getDay(); //拿到的当前周几的数字，如周四就是4
    day=day+aa;
    switch (day)
    {
        case 1:
        case 8:
        case -6:
            week="星期一";
            break;
        case 2:
        case 9:
        case -5:
            week="星期二";
            break;
        case 3:
        case 10:
        case -4:
            week="星期三";
            break;
        case 4:
        case 11:
        case -3:
            week="星期四";
            break;
        case 5:
        case 12:
        case -2:
            week="星期五";
            break;
        case 6:
        case 13:
        case -1:
            week="星期六";
            break;
        case 0:
        case 7:
        case -7:
            week="星期天";
            break;
    }
}
/*function getFirstDay(){
    var now = new Date();
    var day = now.getDay();
    if(day === 0){
        day = 7;
    }
    var firDay = 1 - day; // 获取当前距离本周第一天还有多少天  如 星期6 距离-5
    return firDay;
}*/

function listTop(page,a,na,du,da){
    $(".schedule_tr_table tr").html("");
    // var j = a-1
    for(var i=a;i<a+7;i++){
        getWeek(i%7);
        var html='<td><p class="table_week">'+week+'</p><p class="table_day">'+getYear(i)+'</p></td>'

        $(".schedule_tr_table tr").append(html);
    }
    if(a>6){
        var left="<a id='list_left' onclick='listTop("+page+","+(a-7)+",\""+na+"\",\""+du+"\",\""+getYear(i-30)+"\");'  href='javascript:void(0);'></a>";
        $(".schedule_tr_table tr td:first-child").addClass("point_left").prepend(left);
    }
//    if(a<22){
        var right="<a id='list_right' onclick='listTop("+page+","+(a+7)+",\""+na+"\",\""+du+"\",\""+getYear(i+30)+"\");' href='javascript:void(0);' ></a>";
        $(".schedule_tr_table tr td:last-child").addClass("point_right").append(right);
//    }

 //alert(getYear(i-30));
   //门诊类别判断显示状态 0  所有   1或者2显示主任医师和副主任医师
   // if($(".radioclass:checked").val()==""){
   //    schedule_list(page,na,du,getYear(i-7));
   // }else if($(".radioclass:checked").val()=="0"){
   //    schedule_list(page,na,"0,1,2,3,4",getYear(i-7));
   // }else if($(".radioclass:checked").val()=="1"||$(".radioclass:checked").val()=="2"){
   //    schedule_list(page,na,"3,4",getYear(i-7));
   // }
   schedule_list(page,na,du,getYear(i-7));
}

function searchBtn(page) {
    var name=$(".expert").val();
    var title=$(".doctor_title").val();
    var time=$(".doctor_time").val();//获得排版日期里选择的时间
    var date1 = new Date();
    var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
    time==""?time=time1:time;
    var getday=DateDiff(time,time1); //获得排班日期时间和当前时间间隔天数
 // console.log(getday);
    $(".radioclass").val(0);
    $(".raido_type>span.active").removeClass("active");
    $(".back_all").text("当前为全部门诊号源显示");
    $(".doc_mess").empty();
    listTop(page,getday,name,title,time);
}

function resetPaiban(){
    $('#doctor_name').val('');
    $('.doctor_title option:first').prop('selected','true');
    $('#start').val(laydate.now(0, 'YYYY-MM-DD'));
    searchBtn(1);
    // searchdoc(1);
};

function searchSuggest() {
     // $('.expert').keyup(function() {
    $('.expert').bind('input propertychange', function(event) {
        //console.log($(this).val());
        var word = $('.expert').val();
        if (word == '') {
            $('.name_suggest').hide();
            $('.doctor_title').val(" ");
            return false;
        }else{
            $.ajax({
                url:baseUrl+'eht/admin/scheduling/DoctorQuery',
                type:'post',
                data:{
                    name:word,
                    subjectId:sessionStorage.getItem('subjectId'),
                    hospitalId:sessionStorage.getItem('hospitalId')
                },
                dataType: "json",
                success: function (data) {
                    if(data.length>0){
                        $('.name_suggest').show();
                        var html = '';
                        for (var i = 0; i < data.length; i++) {
                            html += '<li><span>'+data[i].doctorName+'</span><input value="'+data[i].duty+'" type="hidden"/></li>';
                        }
                        $('.name_suggest>ul').html(html);
                    }
                },
                complete: function () {
                    $(".name_suggest li").click(function () {
                        $(".expert").val($(this).find("span").html());
                        $(".doctor_title").val($(this).find("input").val());
                        $('.name_suggest').hide();
                    })
                }
            })
        }
    })
    $('.expert').bind('blur', function(event) {
        setTimeout(function() {  //进行延时处理
            $('.name_suggest').hide();
        }, 120)
    })
    $('.expert').bind('focus', function(event) {
        if($('.expert').val()==''){
            $('.name_suggest').hide();
        }else{
            $('.name_suggest').show();
        }
    })

}

//http://www.51edoctor.cn列表
function doctor(page) {
    var list=[{}];
    var name=$("#doctor_name").val();
    var duty=$("#doctor_duty").val();
    duty==" "?duty="":duty;
    var sex=$(".doctor_sex option:selected").val();
//    var age=$("#doctor_age").val();
    list[0].subjectId=sessionStorage.getItem('subjectId');
    list[0].hospitalId=sessionStorage.getItem('hospitalId');
    list[0].currentPage=page;
    list[0].totalPages="8";
    list[0].doctorName=name;
    list[0].duty=duty;
    list[0].position="";
    list[0].sex=sex;
    $.ajax({
        url:baseUrl+'eht/admin/baseDoctor/DoctorQueryList',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            if (data.length == 0) {
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("未查找到信息");
                $(".btn_return").hide();
                $(".btn_sure").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                })
                return false;
            }
            var num=data[0].num;
            var count = Math.ceil(num / 8);
            var html='';
            var i=1;
            $.each(data, function (index, val) {
                var age;
                if(val.age==" "||val.age==""){
                    age="";
                }else{
                    var year = new Date().getFullYear();
                    var bir=val.age.split("-")[0];
                    age=year-bir;
                }
                var duty;
                switch (val.duty){
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
                }
                var sex;
                if(val.sex==0){
                    sex='男';
                }else{
                    sex='女';
                }
                html+='<tr id="doctor_list_'+i+'" class="doctor_list"><td class="doctor_num"><input class="doc_id" value="'+val.doctorId+'" type="hidden"/><span>'+i+'</span></td><td class="doctor_name">'+val.doctorName+'</td><td class="doctor_tit"><input type="hidden" value="'+val.duty+'"/><span>'+duty+'</span></td><td class="doctor_age"><span class="age_age">'+val.position+'</span></td><td class="doctor_mal"><input type="hidden" value="'+val.sex+'"/><span>'+sex+'</span></td><td class="doctor_skill">'+val.skilled+'</td><td class="doctor_act"><input class="Intro" value="'+val.intro+'" type="hidden" /><input class="doctorId" type="hidden" value="'+val.doctorId+'"><div class="pull-left"><img class="img_postion" src="images/mess_08.png" alt=""/><a onclick="repair(this)" href="javascript:void(0)">修改</a></div><div class="pull-left"><img class="img_postion" src="images/del_03.png" alt=""/><a class="color_ff" onclick="delDoctor(this,\''+val.doctorId+'\')" href="javascript:void(0)">删除</a></div></td></tr>';
                i++;
            })
            $("#doctor_amount").html(html);
            doctorPagation(page,count);
        }
    })

}
function doctorPagation(page,count) {
    if (count > 1) {
        $('.doctor_page').show();
        $('.doctor_page').myPagination({
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
            ajax: {
                on: false,
                onClick: function(page) {
                    doctor(page);
                }
            }
        });
    } else {
        $('.doctor_page').hide();
    }
}
//导出列表
function outTable(page,na,du,da) {
    var list=[{}];
    list[0].CurrentPage=page;
    list[0].totalPages="6";
//  list[0].dateTime=getYear(1);
    list[0].subjectId=sessionStorage.getItem('subjectId');
    list[0].hospitalId=sessionStorage.getItem('hospitalId');
    na=="undefined"||na==undefined?list[0].doctor_name="":list[0].doctor_name=na;
    du=="undefined"||du==undefined||du==" "?list[0].doctor_duty="":list[0].doctor_duty=du;
    da=="undefined"||da==undefined?list[0].sourceDate="":list[0].sourceDate=da;
    $(".export_table").unbind('click').click(function () {
        // alert('daochubiaoge');
        $.ajax({
            url:baseUrl+'eht/admin/scheduling/CurrentSchedulingExcel',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
               // alert("导出成功");
              //  console.log(data);
                 window.location.href=baseUrl+"eht/uploadFile/"+data;
                 //window.location.href= "http://www.51edoctor.cn/eht/uploadFile/"+data;
//                $(".modify_record").attr("href","..\SchedulingExcl2017-08-03.xls");
            }

        });
    });
}

//应急增加
var add;
function addSourse(e){

    if(!handle){
        add=true;
    }
    if(add){
        $(e).parent().append('<a id="cancel_sourse" onclick="cancelSourse(this)" class="new_schedule" href="javascript:void(0);">取消增加</a>');
        $(e).remove();
        $(".detail_top>td>.back_ddd,.detail_bot>td>.back_ddd").click(function () {
            // debugger
            if(!add||$(this).siblings(".input_outType").val()=="0"){
                return false;
            }
            $('.addMask').show();
            $('.messBox').show();
            var th=$(this);
            var txt=parseInt(th.val());
            var sourceId=th.siblings(".sourceId").val();
            $(".add_sure").click(function () {
                $.ajax({
                    url:baseUrl+'eht/admin/scheduling/updateNewNum',
                    type:'post',
                    data:{
                        sourceId:sourceId,
                        num:$(".add_num").val()
                    },
                    success: function (data) {
                        $('.addMask').hide();
                        $('.messBox').hide();
                        th.val(parseInt($(".add_num").val())+txt);
                    }
                })
            })
            $(".add_btn .add_return ").click(function () {
                $('.addMask').hide();
                $('.messBox').hide();
            })
        })
    }
}

function cancelSourse(e) {
    add=false;
    if(!add){
        $(e).parent().append('<a id="add_sourse" onclick="addSourse(this)" class="new_schedule" href="javascript:void(0);">应急增加</a>');
        $(e).remove();
    }
}


var handle;
function addHandle(e){
    if(!add){
        handle=true;
    }
    if(handle){
        $(e).parent().append('<a id="doctor_cancel" onclick="cancelHandle(this)" class="modify_record" href="javascript:void(0);">取消应急处理</a>');
        $(e).remove();
        $(".detail_top>td>.back_ddd,.detail_bot>td>.back_ddd").click(function () {
            if(!handle){
                return false;
            }
            $('.smallMask').show();
            $('.smallBox').show();
            var th=$(this);
            var index=$(this).parent().index();
            if(th.parents().hasClass("detail_top")){
                var time="am";
            }else{
                var time="pm";
            }
            var day=$(".table_day").eq(index).html().substring(5);
            var sourceId=th.siblings(".sourceId").val();
            $(".btn_sure").unbind("click").click(function () {
                $.ajax({
                    url:baseUrl+'eht/admin/scheduling/MobileMsg',
                    type:'post',
                    data:{
                        sourceId:sourceId
                    },
                    success: function (data) {
                        th.siblings(".input_state").val("2");
                        th.removeClass("color_blue color_black color_red");
                        th.removeClass("back_ddd");
                        th.css("color","#f2f2f2");
                        th.css("background-color","#f2f2f2");

                       //console.log(th.parents(".schedule_detail_up").find("#doc_ques").html());
                        th.parents(".schedule_detail_up").find("#doc_ques").append('<p>'+day+(time=="am"?"上午":"下午")+'缺诊</p>');
                        //console.log(th.parents(".schedule_detail_up").find("#doc_ques").html());

                        var attr=th.parents(".schedule_detail_up").find("#doc_ques").attr('title');
                        //console.log(attr,"1111",attr+' '+day+time+'缺诊');
                        th.parents(".schedule_detail_up").find("#doc_ques").attr('title',attr+' '+day+(time=="am"?"上午":"下午")+'缺诊');

                        $('.smallMask').hide();
                        $('.smallBox').hide();

                    }
                })
            })
            $(".btn_return").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
        })
    }
}

function cancelHandle(e) {
    handle=false;
    if(!handle){
        $(e).parent().append('<a id="doctor_sourse" onclick="addHandle(this)" class="modify_record" href="javascript:void(0);">医生应急处理</a>');
        $(e).remove();
    }
    //console.log(handle);
}

function setTime(){
    $(".remindMask").show();
    $(".remindBox").show();
    $.ajax({
        url:baseUrl+'eht/admin/hospitalUser/getRemindTime',
        type:"get",
        async:false,
        data:{
            userId:sessionStorage.getItem("userId")
        },
        success: function(data){
            if(data==""){
                return;
            }
            $("#remind").val(data.sendTime);
        }
    })
    $(".remind_btn>.btn_sure2").unbind("click").click(function(){
        $.ajax({
            url:baseUrl+'eht/admin/hospitalUser/setRemindTime',
            type:"get",
            data:{
                userId:sessionStorage.getItem("userId"),
                remindTime:$("#remind").val(),
                isRemind:1
            },
            success: function(data){
                if(data==""){
                    return false;
                }
                if(data=="1"){
                    $(".smallBox").show();
                    $(".alertBox_top>p").text("成功提示");
                    $(".small_main>p").text("保存成功");
                    $(".small_btn>.btn_return").hide();
                    $(".openTime").hide();
                    $(".closeTime").show();
                    $(".setTime i").css("background-position","-30px 0px");
                }else{
                    $(".smallBox").show();
                    $(".alertBox_top>p").text("失败提示");
                    $(".small_main>p").text("保存失败");
                    $(".small_btn>.btn_return").hide();
                }
                $(".small_btn>.btn_sure").unbind("click").click(function(){
                    $(".smallBox").hide();
                    $(".waitingBox").hide();
                    $(".remindMask").hide();
                    $(".remindBox").hide();
                });
            }
        })
    });
    $(".remindBox>.alert-close").click(function(){
        $(".remindMask").hide();
        $(".remindBox").hide();
    });
    $(".remind_btn>.btn_return2").click(function(){
        $(".remindMask").hide();
        $(".remindBox").hide();
    });
}

function closeTime(){
    $.ajax({
        url:baseUrl+'eht/admin/hospitalUser/setRemindTime',
        type:"get",
        data:{
            userId:sessionStorage.getItem("userId"),
            remindTime:$("#remind").val(),
            isRemind:0
        },
        success: function(data){
            if(data==""){
                return;
            }
            if(data=="1"){
                $(".openTime").show();
                $(".closeTime").hide();
                $(".setTime i").css("background-position","0px 0px");
            }else{
                $(".smallBox").show();
                $(".alertBox_top>p").text("失败提示");
                $(".small_main>p").text("设置失败");
                $(".small_btn>.btn_return").hide();
                $(".small_btn>.btn_sure").unbind("click").click(function(){
                    $(".smallBox").hide();
                });
            }
        },
        error:function(){
            $(".smallBox").show();
            $(".alertBox_top>p").text("失败提示");
            $(".small_main>p").text("网络错误,请检查网络!");
            $(".small_btn>.btn_return").hide();
            $(".small_btn>.btn_sure").unbind("click").click(function(){
                $(".smallBox").hide();
            });
        }
    })
}


//修改门诊
//function changeDuty() {
//    $(".sle_type").change(function () {
//        var val=$(this).children("option:selected").val();
//        var id=$(this).parents(".schedule_detail_up").find(".doctorID").val();
//        console.log(val);
//
//        $.ajax({
//            url:'http://www.51edoctor.cn/eht/admin/scheduling/updateOutpatient',
//            type:'post',
//            data:{
//                doctorId:id,
//                outpatientType:val
////                subjectId:sessionStorage.getItem('subjectId'),
////                hospitalId:sessionStorage.getItem('hospitalId')
//            },    
//            success: function (data) {
//
//            }
//        })
//    })
//}


