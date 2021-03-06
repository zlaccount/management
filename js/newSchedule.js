/**
 * Created by Administrator on 2017/7/21.
 */
/**
 * Created by Administrator on 2017/7/13.
 */
//加载动态时间

var baseUrl = 'http://www.51edoctor.cn/';
 // var baseUrl = 'http://192.168.1.51:8333/';


function time() {
    var date = new Date();
    var year = date.getFullYear();
    var month=date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var data=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentTime = year + "-" + month + "-" + data + "&nbsp;&nbsp;" + hour + ":" + minute + ":" +second;
    $(".schedule_time_down").html(currentTime);
    $("caption span").html("("+year + "-" + month + "-" + data+")");
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

function getorderStatus(code){
    switch (code){
          case 0:
          return '待支付';
          break;
          case 1:
          return '已支付';
          break;
          case 2:
          return '已取号(未改签订单)';
          break;
          case 3:
          return '已取号(改签后的订单)';
          break;
          case 5:
          return '改签生成的订单（已支付差额）';
          break;
          case -1:
          return '用户未支付手动取消';
          break;
          case -2:
          return '用户未支付超时取消';
          break;
          case -3:
          return '已支付退单成功';
          break;
          case -4:
          return '申请改签成功（旧订单不展示）';
          break;
          case -5:
          return '改签生成的新订单（未支付差额）';
          break;
          case -6:
          return '改签生成的新订单超时未支付';
          break;
          default:
          return '';
          break;
        }
}

 function getbankCode(code){
        switch (code){
                  case "工商银行":
                  return '1002';
                  break;
                  case "农业银行":
                  return '1005';
                  break;
                  case "中国银行":
                  return '1026';
                  break;
                  case "建设银行":
                  return '1003';
                  break;
                  case "招商银行":
                  return '1001';
                  break;
                  case "邮储银行":
                  return '1066';
                  break;
                  case "交通银行":
                  return '1020';
                  break;
                  case "浦发银行":
                  return '1004';
                  break;
                  case "民生银行":
                  return '1006';
                  break;
                  case "兴业银行":
                  return '1009';
                  break;
                  case "平安银行":
                  return '1010';
                  break;
                  case "宁波银行":
                  return '1056';
                  break;
                  case "中信银行":
                  return '1021';
                  break;
                  case "华夏银行":
                  return '1025';
                  break;
                  case "广发银行":
                  return '1027';
                  break;
                  case "光大银行":
                  return '1022';
                  break;
                  case "北京银行":
                  return '1032';
                  break;
                  default:
                  return '';
                  break;
                }
 }
//修改
$(".urgent_make").click(function () {
    console.log($(".doc_mess .schedule_num b").css("display")=='none');
    if($(".doc_mess .schedule_num b").css("display")=="none"){
        $(".doc_mess .schedule_num b").show();
        $(".doc_mess .schedule_num img").hide();
    }else{
        $(".doc_mess .schedule_num b").hide();
        $(".doc_mess .schedule_num img").show();
    }
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

      function formatFee(fee){
          return (fee/100).toFixed(2);
       };
//新建
function build(){
    $('.alertMask').show();
    $('.alertBox').show();
    $("#doctor_btn").show();
    $("#remark_btn").show();
    $("#doctor_remark").hide();
    //   重置弹框内容
    $(".doc_name").val(" ");
    $(".doc_tell").val("");
    $(".doc_job").val("");
    $(".img_content ").html("");
    $("#duty option[value='1']").attr('selected',true);
    $("#doc_sex option[value='0']").attr('selected',true);
    $(".doc_age").val(" ");
    $(".skill textarea").val(" ");
    $(".self_mess textarea").val(" ");
}
//修改排班
function modify(e,id,name,duty,type,num) {
    if($(e).siblings(".doc_state").val()=="1"){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("已提交,不能修改");
        $(".btn_return").hide();
        $(".btn_sure").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
        })
        return false;
    }
    $('.alertMask').show();
    $('.alertBox').show();
    $("#remark_btn").show();
    $("#alert_id").val(id);
    $("#alert_name").val(name);
    $("#alert_duty").val(duty);
    $("#alert_num").val(num-1);
    if(type){
        $("#outpatientType").val(type);
    }else{
        $("#outpatientType").val(0);
    }
    for(var i=0;i<7;i++){
        var time=$(".table_week").eq(i).html();
        var week=$(".table_day").eq(i).html();
        var data='<b style="font-weight: normal">'+week+'</b>'+"&nbsp;&nbsp;"+''+time+'';
        $(".alert_day").eq(i).html(data);
    }
    var am=$(e).parents(".schedule_detail_up").find(".detail_top td");
    var pm=$(e).parents(".schedule_detail_up").find(".detail_bot td");
    console.log(am);
    console.log($("#alert_table .schedule_detail_up .alert_source input"))
    for(var i=0;i<7;i++){
        $("#alert_table .schedule_detail_up .alert_source input").eq(i).val(am.eq(i).children("span").html());
        $("#alert_table .schedule_detail_down .alert_source input").eq(i).val(pm.eq(i).children("span").html());
    }
}

$("#remark_btn").bind("click").click(function () {
    var doctorID_i=$("#alert_id").val();
    var type=$("#outpatientType").val();
    var list={};
    var dataRow;
    dataRow={doctorId:doctorID_i,outpatientType:type,hospitalId:sessionStorage.getItem('hospitalId'),subjectId:sessionStorage.getItem('subjectId')};
    var sourceAM={};
    var sourceAMDate;
    var am=$("#alert_table .schedule_detail_up .alert_source input");
    var time=$("#alert_table .schedule_detail_up .alert_day b");
    for(var j=0;j<7;j++){
        sourceAMDate={sourceDate:time.eq(j).html(),totalNum_am:am.eq(j).val()};
        sourceAM[j]=sourceAMDate;
    }
    dataRow.sourceAM=sourceAM;
    var sourcePM={};
    var sourcePMDate;
    var pm=$("#alert_table .schedule_detail_down .alert_source input");
    for(var j=0;j<7;j++){
        sourcePMDate={sourceDate:time.eq(j).html(),totalNum_pm:pm.eq(j).val()};
        sourcePM[j]=sourcePMDate;
    }
    dataRow.sourcePM=sourcePM;
    list[0]=dataRow;
    console.log(list);
    console.log(JSON.stringify(list));
    $.ajax({
        url:baseUrl+'eht/admin/scheduling/CurrentSchedulingUpdate',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        success: function (data) {
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("修改成功");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
                $('.alertMask').hide();
                $('.alertBox').hide();
            })

            var num=parseInt($("#alert_num").val());
            var tNum='';
            var dNum='';
            $(".schedule_text").eq(num).html($("#outpatientType option:selected").text());
            for(var i=0;i<7;i++){
                var aNum=parseInt(am.eq(i).val());
                console.log(aNum);
                if(aNum=="NaN"||aNum==NaN){
                    tNum='';
                }
                if(aNum>10){
                    tNum='<span class="bac_blue">'+aNum+'</span>';
                }else if(aNum<10&&aNum>0){
                    tNum='<span class="bac_red">'+aNum+'</span>';
                }
                var pNum=parseInt(pm.eq(i).val());
                if(pNum=="NaN"||pNum==NaN){
                    dNum='';
                }
                if(pNum>10){
                    dNum='<span class="bac_blue">'+pNum+'</span>';
                }else if(pNum<10&&pNum>0){
                    dNum='<span class="bac_red">'+pNum+'</span>';
                }
                $(".doc_mess>.schedule_detail_up").eq(num).find(".detail_top>td").eq(i).html(tNum);
                $(".doc_mess>.schedule_detail_up").eq(num).find(".detail_bot>td").eq(i).html(dNum);
            }
        },
        error: function () {
            alert("cuowu");
        }
    })
})

function schedule_list(page,na,du,da) {
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
//    console.log(list);
//    console.log(JSON.stringify(list));
    $.ajax({
        url:baseUrl+'eht/admin/scheduling/CurrentSchedulingQuery',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        async:false,
        success: function (data) {
            console.log(data);
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
            $(".doc_mess").empty();
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
                switch(parseInt(type)){
                    case 0:
                        text='普通门诊';
                        break;
                    case 1:
                        text='专家门诊';
                        break;
                    case 2:
                        text='特需门诊';
                        break;
                    default :
                        text='';
                }
                console.log(text);

                var result;
                switch(parseInt(val.state)){
                    case 0:
                        result='<button onclick="refer(this)" class="btn_ready">提交</button>';
                        break;
                    case 1:
                        result='<button class="btn_refer">已提交</button>';
                        break;
                    default :
                        result='<button onclick="refer(this)" class="btn_ready">提交</button>';
                }

                html='<tr class="schedule_detail_up"><td  class="schedule_num"><input class="doc_state" type="hidden" value="'+val.state+'"/><input class="doctorID" type="hidden" value="'+val.doctorID+'"/><b>'+i+'</b><img onclick="modify(this,\''+val.doctorID+'\',\''+val.doctorname+'\',\''+duty+'\',\''+type+'\',\''+i+'\')" src="images/mess_08.png" alt=""></td><td  class="schedule_name">'+val.doctorname+'</td><td  class="schedule_title">'+duty+'</td><td  class="schedule_title schedule_text">'+text+'</td><td  class="schedule_time"><p>上午</p><p>下午</p></td><td colspan="7"><table class="schedule_detail_table table-striped table-responsive"><tr class="detail_top"><td  class="time_tus"></td><td  class="time_wed"></td><td  class="time_thu"></td><td  class="time_fri"></td><td  class="time_sat"></td><td  class="time_sun"></td><td  class="time_mon"></td></tr><tr class="detail_bot"><td  class="time_tus"></td><td  class="time_wed"></td><td  class="time_thu"></td><td  class="time_fri"></td><td  class="time_sat"></td><td  class="time_sun"></td><td  class="time_mon"></td></tr></table></td><td class="schedule_button">'+result+'</td></tr>'
                i++;
                var num=index;
                $(".doc_mess").append(html);
                $.each(list,function (index,time){
                    for(var i=0;i<$(".table_day").length;i++){
                        if($(".table_day").eq(i).html()==time.sourcedate){
                            var count='';
                            var inventorynum=parseInt(time.inventorynum);
                            console.log(inventorynum,typeof (inventorynum));
                            if(inventorynum<10){
                                count='<span class="bac_red">'+inventorynum+'</span>';
                            }else{
                                count='<span class="bac_blue">'+inventorynum+'</span>';
                            }
                            if(time.sourcetime=="am"){
                                $('.doc_mess>.schedule_detail_up:eq('+num+') .detail_top>td:eq('+i+')').html(count);
                            }else if(time.sourcetime=="pm"){
                                $('.doc_mess>.schedule_detail_up:eq('+num+') .detail_bot>td:eq('+i+')').html(count);
                            }
                        }
                    }
                })
            })
            $(document.documentElement).animate({ scrollTop: 0 }, 300);
            //支持chrome
            $(document.body).animate({ scrollTop: 0 }, 300);
            schedulepage(page,na,du,da,count);
            outTable(page,na,du,da);
        }
    })

}
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
                    var date=$(".schedule_tr_table>tbody>tr>td:first-child .table_day").html();
                    console.log(typeof (date));
                    var val = Date.parse(date);
                    var newDate = new Date(val);
                    var date1 = new Date();
                    var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
                    var time=newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate();//time1表示当前时间
                    time==""?time=time1:time;
                    var getday=DateDiff(time,time1);
                    listTop(page,getday,na,du,da);
                }
            }
        });
    } else {
        $('.schedule_page').hide();
    }
}

//点击确认提交
function refer(e) {
    var id=$(e).parents(".schedule_detail_up").find(".doctorID").val();
    console.log(id);
    $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html("确认提交?");
    $(".btn_sure").click(function () {
        $.ajax({
            url:baseUrl+'eht/admin/scheduling/updateState',
            type:'post',
            data:{
                doctorId:id,
                state:"1",
                subjectId:sessionStorage.getItem('subjectId'),
                hospitalId:sessionStorage.getItem('hospitalId')
            },
            async:false,
            success: function (data) {
                $(e).parents(".schedule_detail_up").find(".doc_state").val("1");
                var html='<input type="hidden" value="1"/><button class="btn_refer">已提交</button>';
                $(e).parent().html(html);
                $('.smallMask').hide();
                $('.smallBox').hide();
            }
        })

    })

}

//获取年月日
function getYear(obj) {
    var date1 = new Date();
    var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate()+obj);
    var time2 = date2.getFullYear()+"-"+((date2.getMonth()+1)>9?(date2.getMonth()+1):"0"+(date2.getMonth()+1))+"-"+(date2.getDate()>9?date2.getDate():"0"+date2.getDate());
    return time2;
}
/*日期相隔的天数*/
function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays;
    aDate  =  sDate1.split("-");
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);    //转换为12-18-2002格式
    aDate  =  sDate2.split("-");
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
    iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24);  //把相差的毫秒数转换为天数
    return  iDays
}
//获取星期
function getWeek(aa) {
    var now = new Date();
    var day=now.getDay();
    day=day+aa;
    switch (day)
    {
        case 0:
        case 7:
        case -7:
            week="星期天";
            break;
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
    }
}
function listTop(page,a,na,du,da){
    $(".schedule_tr_table tr").html("");
    var aStart=a-a%7;
    for(var i=aStart;i<aStart+7;i++){
        getWeek(i%7);
        var html='<td style="width: 140px"><p class="table_week">'+week+'</p><p class="table_day">'+getYear(i)+'</p></td>'
        $(".schedule_tr_table tr").append(html);
    }
//    console.log(typeof(na));
    var name=$(".expert").val();
    var title=$(".doctor_title").val();
    var time=$(".doctor_time").val();
    name==""?name="undefined":name;
    title==""?title="undefined":title;
    time==""?time="undefined":time;
    if(a>6){
        var left="<a id='list_left' onclick='listTop("+page+","+(a-7)+",\""+name+"\",\""+title+"\",\""+getYear(i-35)+"\");'  href='javascript:void(0);'></a>";
        $(".schedule_tr_table tr td:first-child").addClass("point_left").prepend(left);
    }
    if(a<22){
        var right="<a id='list_right' onclick=' listTop("+page+","+(a+7)+",\""+name+"\",\""+title+"\",\""+getYear(i+35)+"\");' href='javascript:void(0);' ></a>";
        $(".schedule_tr_table tr td:last-child").addClass("point_right").append(right);
    }
//    加载排班信息
    schedule_list(page,name,title,getYear(i-7));
}
//http://www.51edoctor.cn/搜索
function searchBtn(page) {
    var name=$(".expert").val();
    var title=$(".doctor_title").val();
    var time=$(".doctor_time").val();
    var date1 = new Date();
    var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
    time==""?time=time1:time;
    var getday=DateDiff(time,time1);
    listTop(page,getday,name,title,time);
}

function searchSuggest() {
    $('.expert').bind('input propertychange', function(event) {
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
                    console.log(data);
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
                        $(".doctor_title").val($(this).find("input").val())
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
//http://www.51edoctor.cn/列表
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
    console.log(list);
    $.ajax({
        url:baseUrl+'eht/admin/baseDoctor/DoctorQueryList',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            console.log(data);
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
                html+='<tr id="doctor_list_'+i+'" class="doctor_list"><td class="doctor_num"><input class="doc_phone" type="hidden" value="'+val.doctorMobile+'"/><input class="doc_img" type="hidden" value="'+val.doctorImage+'"/><input class="doc_id" value="'+val.doctorId+'" type="hidden"/><span>'+i+'</span></td><td class="doctor_name">'+val.doctorName+'</td><td class="doctor_tit"><input type="hidden" value="'+val.duty+'"/><span>'+duty+'</span></td><td class="doctor_age"><span class="age_age">'+val.position+'</span></td><td class="doctor_mal"><input type="hidden" value="'+val.sex+'"/><span>'+sex+'</span></td><td class="doctor_skill">'+val.skilled+'</td><td class="doctor_act"><input class="Intro" value="'+val.intro+'" type="hidden" /><input class="doctorId" type="hidden" value="'+val.doctorId+'"><div class="pull-left"><img class="img_postion" src="images/mess_08.png" alt=""/><a onclick="repair(this)" href="javascript:void(0)">修改</a></div><div class="pull-left"><img class="img_postion" src="images/del_03.png" alt=""/><a class="color_ff" onclick="delDoctor(this,\''+val.doctorId+'\')" href="javascript:void(0)">删除</a></div></td></tr>';
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
    alert();
    $(".export_table").unbind('click').click(function () {
        $.ajax({
            url:baseUrl+'eht/admin/scheduling/CurrentSchedulingExcel',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
                alert("导出成功");
                console.log(data);
                window.location=data;
                // $(".modify_record").attr("href","C:\SchedulingExcl2017-08-03.xls");
                // window.location=data;
            }

        })
    })
}
//修改排班

//添加http://www.51edoctor.cn/
function addDoctor(){
    var regexEmpty = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
    var doctorName=$(".doc_name").val().replace(regexEmpty,'');
    var duty=$("#duty").val();
    var sex=$("#doc_sex").val();
    var doctorImage=$(".doc_head_way").val();
    var doctorMobile=$(".doc_tell").val().replace(regexEmpty,'');
    var position=$(".doc_job").val().replace(regexEmpty,'');
    var intro=$(".self_mess textarea").val().replace(regexEmpty,'');
    var skilled=$(".skill textarea").val().replace(regexEmpty,'');
    if(doctorName !=" "){
        var list=[{
            subjectId:sessionStorage.getItem('subjectId'),
            hospitalId:sessionStorage.getItem('hospitalId'),
            doctorName:doctorName,
            doctorImage:doctorImage?doctorImage:"",
            doctorMobile:doctorMobile,
            duty:duty,
            sex:sex,
            position:position,
            intro:intro,
            skilled:skilled
        }];
        console.log(list);
        $.ajax({
            url:baseUrl+'eht/admin/baseDoctor/DoctorInsert',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("添加成功");
                $(".btn_return").hide();
                $(".btn_sure").click(function () {
                    window.location.reload();
                })

            }
        })
    }else{
        if(doctorName==" "){
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("请填写姓名");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
        }
    }

}
//修改
function repair(e) {
    $('.alertMask').show();
    $('.alertBox').show();
    $("#doctor_btn").hide();
    $("#doctor_remark").show();
    var list= $(e).parents(".doctor_list");
    $(".list_id").val(list.attr("id"));
    $(".doc_tell").val(list.find(".doc_phone").val());
    if(list.find(".doc_img").val()){
        var html='<input type="hidden" class="doc_head_way" value="'+list.find(".doc_img").val()+'"><img class="doc_head" src="/E2306'+list.find(".doc_img").val()+'" alt=""/><img onclick="delHead(this);" class="doc_head_del" src="images/shanchu.png" alt=""/>';
        $(".img_content").html(html);
    }else{
        $(".img_content").html("");
    }
    $(".doctorId").val(list.find(".doc_id").val());
    $(".doc_name").val(list.find(".doctor_name").html());
    $("#duty").val(list.find(".doctor_tit input").val());
    $("#doc_sex ").val(list.find(".doctor_mal input").val());
    $(".doc_job").val(list.find(".age_age").html());
    $(".self_mess textarea").val(list.find(".Intro").val());
    $(".skill textarea").val(list.find(".doctor_skill").html());
}
function repairDoctor() {
    var regexEmpty = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
    var doctorName=$(".doc_name").val().replace(regexEmpty,'');
    var duty=$("#duty").val();
    var sex=$("#doc_sex").val();
    var position=$(".doc_job").val().replace(regexEmpty,'');
    var intro=$(".self_mess textarea").val().replace(regexEmpty,'');
    var skilled=$(".skill textarea").val().replace(regexEmpty,'');
    var doctorID=$(".doctorId").val();
//    var
    console.log(doctorName,duty,sex,intro,skilled,doctorID);
    var list=[{
        subjectId:sessionStorage.getItem('subjectId'),
        hospitalId:sessionStorage.getItem('hospitalId'),
        doctorName:doctorName,
        doctorImage:$(".doc_head_way").val()?$(".doc_head_way").val():"",
        doctorMobile:$(".doc_tell").val().replace(regexEmpty,''),
        duty:duty,
        sex:sex,
        position:position,
        intro:intro,
        skilled:skilled,
        doctorID:doctorID
    }];
    console.log(list);
    if(doctorName !=""){
        $.ajax({
            url:baseUrl+'eht/admin/baseDoctor/DoctorUpdate',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("修改成功");
                $(".btn_return").hide();
                $(".btn_sure").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                    $('.alertMask').hide();
                    $('.alertBox').hide();
                })
                var id=$(".list_id").val();
//            修改信息放页面上
                $("#"+id).find('.doctor_name').html($(".doc_name").val());

                $("#"+id).find('.doctor_tit input').val($("#duty option:selected").val());
                $("#"+id).find('.doctor_tit span').html($("#duty option:selected").text());

                $("#"+id).find('.doctor_mal input').val($("#doc_sex option:selected").val());

                $("#"+id).find('.doc_phone').val($(".doc_tell").val());

                $("#"+id).find('.doc_img').val($(".doc_head_way").val());

                $("#"+id).find('.doctor_mal span').html($("#doc_sex option:selected").text());

                $("#"+id).find('.age_age').html($(".doc_job").val());
                $("#"+id).find('.doctor_skill').html($(".skill textarea").val());
                $("#"+id).find('.Intro').val($(".self_mess textarea").val());
//        清空内容
                $(".doc_name").val(" ");
                $("#duty option[value='1']").attr('selected',true);
                $("#doc_sex option[value='0']").attr('selected',true);
                $(".doc_age").val(" ");
                $(".skill textarea").val(" ");
                $(".self_mess textarea").val(" ");
            }

        })
    }else{
        if(doctorName==""){
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("请填写姓名");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
        }
//        else if(skilled==""||intro==""){
//            $('.smallMask').show();
//            $('.smallBox').show();
//            $(".small_text").html("请填写http://www.51edoctor.cn/技能和描述");
//            $(".btn_return").hide();
//            $(".btn_sure").click(function () {
//                $('.smallMask').hide();
//                $('.smallBox').hide();
//            })
//        }
    }
}

//删除
function delDoctor(e,id) {
    console.log(id);
//    debugger
    var i=$(e).parents(".doctor_list").find(".doctor_num span").html();
    i=parseInt(i);

    $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html("是否确认删除");
    $(".btn_return").show();
    $(".btn_sure").unbind("click").click(function () {
        $.ajax({
            url:baseUrl+'eht/admin/baseDoctor/DoctorDelete',
            type:'post',
            data:{
                doctorID:id,
                subjectId:sessionStorage.getItem('subjectId'),
                hospitalId:sessionStorage.getItem('hospitalId')
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('.smallMask').hide();
                $('.smallBox').hide();
                for(var t=i+1;t<7;t++){
                    var j=t-1;
                    console.log(t-1);
                    $("#doctor_list_"+t).find(".doctor_num>span").html(j);
                }
                $(e).parents(".doctor_list").remove();
                if($(".doctor_list").length<1){
                    window.location.reload();
                }
            }
        })

    })
//    if(confirm("确定删除?")){
//
//    }
}

//上传头像
function doctorImg(){
    if($('.img_content .doc_head').length==1){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("只能上传1张图片");
        $(".btn_return").hide();
        $(".btn_sure").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
        })
        return false;
    }
    var obj=document.getElementsByClassName('doctor_img_input')[0];
    //上传了文件
    if (obj.value) {
        //获取文件对象
        var image = obj.files[0];
        //获取文件名
        var name = image.name;
        //文件的大小单位为B
        var size = image.size;
        console.log(size);
        console.log(image.width);
        console.log(image.height);
        //截取出文件后缀
        var suffix = name.substring(name.indexOf("."));
        //图片匹配正则表达式
        var reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
        //如果不是图片
        if (!reg.test(suffix)) {
            // $('.cateWarning').html("<font style='color:red;font-weight:border;font-size:12px;'>请上传符合格式的图片</font>");
            //清空上传文件框
            $(obj)[0].outerHTML = $(obj)[0].outerHTML;
            console.log(obj.value);
            return false;
        }
        if (size > 2048000) {
            // $('.cateWarning').html("<font style='color:red;font-weight:border;font-size:12px;'>请上传小于2m的图片</font>");
            //清空上传文件框
            $(obj)[0].outerHTML = $(obj)[0].outerHTML;
//            hospitalFlag = false;
            return false;
        }
//        hospitalFlag = true;
        logoFiles(obj);
    } else {
        return false;
    }
}
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
//        console.log(this.result);

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
    // 接收上传文件的后台地址
    var FileController = "http://www.51edoctor.cn/eht/admin/Information/upload?uploadType=doctorImg"; // FormData 对象
    var form = new FormData();
    //form.append("author", "hooyes");                        // 可以增加表单数据
    form.append("file", fileObj); // 文件对象
    // XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();
    xhr.open("post", FileController, true);
    xhr.onload = function(data) {
        var json = xhr.responseText;
        var obj = $.parseJSON(json);
        var abox='<input type="hidden" class="doc_head_way" value="'+obj.imagePath+'"><img class="doc_head" src="/E2306'+obj.imagePath+'" alt=""/><img onclick="delHead(this);" class="doc_head_del" src="images/shanchu.png" alt=""/>';
        $('.img_content').html(abox);
    };
    xhr.send(form);
}

function delHead(e) {
    $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html("是否确认删除");
    $(".btn_return").show();
    $(".btn_sure").unbind("click").click(function () {
        $(e).parent().html("");
        $('.smallMask').hide();
        $('.smallBox').hide();
    })
}



//挂号员费用统计
function moneyList(time){
    $.ajax({
        url:baseUrl+'eht/admin/HospitalCount/selectMoneyByRegistrar',
        type:'get',
        data:{
            hospitalId:sessionStorage.getItem('hospitalId'),
            date:time
        },
        async:false,
        success:function(data){
            if(data.length==0){
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("未查找到信息");
                $(".btn_return").hide();
                $(".btn_sure").unbind("click").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                })
                return false;
            }
            var html='';
            var num1=0;
            var num2=0;
            var num3=0;
            var num4=0;
            var num5=0;
            var num6=0;
            for(var i=0;i<data.length;i++){
                 num1 += data[i].num;
                 num2 += data[i].money;
                 num3 += data[i].changeNum;
                 num4 += data[i].changeMoney;
                 num5 += data[i].returnNum;
                 num6 += data[i].returnMoney;
                 var totalMoney = parseInt(data[i].money)+parseInt(data[i].changeMoney)-parseInt(data[i].returnMoney);
                 html+='<tr><td class="table_depart bgcolor_f2">'+data[i].userName+'</td><td class="register_num"><span class="num_count">'+data[i].num+'</span><span class="money_count" style="color:blue;">'+(data[i].money/100).toFixed(2)+'</span></td><td class="change_num"><span class="num_count">'+data[i].changeNum+'</span><span class="money_count" style="color:blue;">'+(data[i].changeMoney/100).toFixed(2)+'</span></td><td class="back_num"><span class="num_count">'+data[i].returnNum+'</span><span class="money_count" style="color:blue;">'+(data[i].returnMoney/100).toFixed(2)+'</span></td><td class="operation" style="color:red;">'+(totalMoney/100).toFixed(2)+'</td></tr>';
            }

            
           
            $(".money_main").empty().html(html);
            var sum = 0;
            for(var i = 0;i<data.length;i++){
                var a=Number($('.money_main tr:eq('+i+') td:last-child').text())
                sum+=a
                // console.log(sum)
            }
            // console.log(sum)
            var total='<tr><td class="table_depart bgcolor_f2">总计</td><td class="register_num"><span class="num_count">'+num1+'</span><span class="money_count" style="color:blue;">'+(num2/100).toFixed(2)+'</span></td><td class="change_num"><span class="num_count">'+num3+'</span><span class="money_count" style="color:blue;">'+(num4/100).toFixed(2)+'</span></td><td class="back_num"><span class="num_count">'+num5+'</span><span class="money_count" style="color:blue;">'+(num6/100).toFixed(2)+'</span></td><td class="operation" style="color:red">'+sum.toFixed(2)+'</td></tr>';
            $(".money_total").empty().html(total);
        }
    })
}
// 财务结算
function accounts(e){
    if(e=='0'){
        return '待结算'
    }else if(e=='1'){
        return '已结算'
    }
}
function account(beginDate,endDate){
    beginDate=beginDate+" "+"00:00:00";
    endDate=endDate+" "+"23:59:59";
    $.ajax({
        url:baseUrl+'eht/account/getAccountMoney',
        type:'get',
        data:{
            beginDate:beginDate,
            endDate:endDate,
            hospitalId:sessionStorage.getItem("hospitalId")
        },
        success:function(data){
            var totalInfo;
            for(var i = 0;i<data.length;i++){
                totalInfo+='<tr><td><a href="account_detail.html?beginDate='+beginDate+'&endDate='+endDate+'&id='+data[i].id+'&index='+i+'">查看详情</a></td><td>'+data[i].startCountDate.substr(0,11)+'</td><td>'+formatFee(data[i].appMoney)+'</td><td>'+data[i].appNum+'</td><td>'+accounts(data[i].accountsType)+'</td><td>'+data[i].orderNum+'</td><td>'+formatFee(data[i].orderNumMoney)+'</td><td>'+data[i].changeNum+'</td><td>'+formatFee(data[i].changeNumMoney)+'</td><td>'+data[i].returnNum+'</td><td>'+formatFee(data[i].returnNumMoney)+'</td><td>'+data[i].startCountDate+'</td><td>'+data[i].endCountDate+'</td><td>'+data[i].createTime+'</td></tr>'
              // var  totalInfo=$('<tr><td><a href=\"account_detail.html?beginDate='+beginDate+'&endDate='+endDate+'\">查看详情</a></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>1</td><td>2</td><td>3</td><td>4</td>')
             // $("#totalInfo").html(totalInfo)
             
            }
            $("#totalInfo").html(totalInfo)
            for(var i = 0;i<$("#totalInfo tr").length;i++){
                var accounts_Type = $('#totalInfo tr:eq('+i+') td:eq(4)').text()
                if(accounts_Type=="已结算"){
                    $('#totalInfo tr:eq('+i+') td:eq(4)').css("color","green")
                }else{
                    $('#totalInfo tr:eq('+i+') td:eq(4)').css("color","red")
                }
            }
            
        }
    })
}

function accountdetail(){
     account($("#count_start").val(),$("#count_end").val())
}


// 结算详情
function idcard(e){
    if(e=='1'){
        return "是"
    }else if(e=="0"){
        return "否"
    }
}

function accountDetail(beginDate,endDate){
    var url = decodeURI(location.href);
    // var name=decodeURIComponent(url.split("name=")[1].split("&")[0]);
    var beginDate=url.split("beginDate=")[1].split("&")[0];
    var endDate=url.split("endDate=")[1].split("&")[0];
    var id=url.split("id=")[1].split("&")[0];
    var index=url.split("index=")[1];
    var hospitalName = sessionStorage.getItem('hospitalName');
    $.ajax({
        url:baseUrl+'eht/account/getAccountMoney',
        type:"get",
        data:{
            hospitalId:sessionStorage.getItem("hospitalId"),
            beginDate:beginDate,
            endDate:endDate
        },
        success:function(data){
            // console.log(data)
            $(".hospitalName").val(hospitalName)
            $("#appNum").val(data[index].appNum)
            $("#accounts_Date").val(data[index].startCountDate.substr(0,11))
            // $("#accountsDate").val("2018-3-2")
            $("#appMoney").val(formatFee(data[index].appMoney))
            $("#accountsType").val(accounts(data[index].accountsType))
            $("#checkNum").html(data[index].orderNum)
            $("#checkMoney").html("+"+formatFee(data[index].orderNumMoney))
            $("#changeNum").html(data[index].changeNum)
            $("#changeMoney").html("+"+formatFee(data[index].changeNumMoney))
            $("#quitNum").html(data[index].returnNum)
            $("#quitMoney").html("-"+formatFee(data[index].returnNumMoney))
            var totalNum = data[index].orderNum+data[index].changeNum-data[index].returnNum
            var totalMoney = data[index].orderNumMoney+data[index].changeNumMoney-data[index].returnNumMoney
            $("#totalNum").html(totalNum)
            $("#totalMoney").html(formatFee(totalMoney))
            $("#startCountDate").val(data[index].startCountDate)
            $("#endCountDate").val(data[index].endCountDate)
            $("#account_checking_id").html(data[index].name)
            $("#account_checking_time").val(data[index].createTime)
            var info = data[index].startCountDate+"至"+data[index].endCountDate+",需结算订单信息详情列表"
            $("#remark").html(info)
            $(".hospitalName").attr("id",data[index].id);
            if(data[index].accountsType=="0"){
                $("#account .accountBtn").show()
            }

        }
    })
    $.ajax({
        url:baseUrl+'eht/account/getAccountInfoList',
        type:'get',
        data:{
            id:id
        },
        success:function(data){
            // console.log(data)
            var orderdetail
            for(var i = 0;i<data.length;i++){
                 orderdetail += '<tr><td>'+(i+1)+'</td><td>'+data[i].departmentName+'</td><td>'+data[i].registrationDate+'</td><td>'+(data[i].dateTime=='pm'?'下午':'上午')+'</td><td>'+outpatientType(data[i].outpatientType)+'</td><td>'+data[i].doctorName+'</td><td>'+formatFee(data[i].registrationMoney)+'</td><td>'+data[i].contactName+'</td><td>'+getorderStatus(data[i].orderStatus)+'</td>'
            }
            $("#order_detail").html(orderdetail)
        }
    })

   }
 // 医院银行卡信息
 function idcardInfo(){
      $.ajax({
        url:baseUrl+'eht/account/getHospitalProceeds',
        type:'get',
        data:{
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        success:function(data){
            // console.log(data)
            var idcardNo
            for(var i = 0;i<data.length;i++){
                idcardNo+='<tr><td id="'+data[i].id+'">'+data[i].bankname+'</td><td>'+data[i].bankno+'</td><td>'+data[i].bankaddress+'</td><td>'+data[i].accountName+'</td><td>'+idcard(data[i].type)+'</td><td><button class="DefaultId" onclick="setDefaultId(event);" id="'+data[i].id+'" index="'+i+'">设置为默认收款银行卡</button><button class="deleteId" id="'+data[i].id+'" onclick="deleteIdcard(event)" index="'+i+'">删除银行卡</button></td></tr>'

            }

            $(".idcardNo").html(idcardNo)
            for(var i = 0;i<data.length;i++){
                if($('.idcardNo tr:eq('+i+') td:eq(4)').html()=="是"){
                    $('.idcardNo tr:eq('+i+') td:eq(4)').css("color","red")
                }
            }
            // console.log($(".idcard tbody tr:eq(0) td:first-child").attr("id"))
        }
    })
 }

 function addIdcard(){
    $('.alertMask').show();
    $('.alertBox').show();
    $("#set_btn").show();
    $(".set_new").hide();
    $("#set_check").hide();
    $(".set_bankname").val('');
    $(".set_bankaddress").val('');
    $('.set_bankno').val();
    $(".set_accountName").val();
 }


 function setIc(){
    var bankname = $(".set_bankname").val();
    var bankaddress = $(".set_bankaddress").val();
    var bankno = $('.set_bankno').val();
    var accountName = $(".set_accountName").val();
    var bankCode = getbankCode($(".set_bankname").val())
    // $('.alertBox').hide();
    // $('.alertMask').hide();
    $.ajax({
        url:baseUrl+'eht/account/insetHospitalProceeds',
        type:'get',
        data:{
            bankname:bankname,
            bankaddress:bankaddress,
            bankno:bankno,
            accountName:accountName,
            bankCode:bankCode,
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        success:function(data){
            console.log(data)
            var newIdcard ='<tr><td>'+bankname+'</td><td>'+bankno+'</td><td>'+bankaddress+'</td><td>'+accountName+'</td><td>否</td><td><button class="DefaultId" onclick="setDefaultId(event);" >设置为默认收款银行卡</button><button class="deleteId" onclick="deleteIdcard(event)">删除银行卡</button></td></tr>'
            $(".idcardNo").append(newIdcard)
            $('.alertMask').hide();
            $('.alertBox').hide();
            $("#set_btn").hide();
            $(".set_new").hide();
            $("#set_check").hide();
            window.location.reload()
        }
    })
 }

function deleteIdcard(event){
    var el = event.target||event.srcElement
    var code = $(el).attr('index')
    $('.smallAlert').show()
    $('.btn_return').show()
    $('.smallMask').show();
    $('.small_Box').show();
    $(".small_text").html("确认删除?");
    $(".btnreturn").show();
    $(".btnreturn").click(function () {
        $('.smallMask').hide();
        $('.small_Box').hide();
        $('.alertMask').hide();
        $(".alertAddrBox").hide();
  })
    $(".btnsure").click(function () {
        $.ajax({
            url:baseUrl+'eht/account/deleteHospitalProceeds',
            type:'get',
            data:{
                id:$('.idcardNo .deleteId:eq('+code+')').attr('id')
            },
            success:function(data){
                // console.log(data)
                $('.smallMask').hide();
                $('.small_Box').hide();
                $('.alertMask').hide();
                $(".alertAddrBox").hide();
                window.location.reload()
            }
        })
  })
}
function setDefaultId(event){
    var el = event.target||event.srcElement
    var code = $(el).attr('index')
    $.ajax({
        url:baseUrl+'eht/account/setHospitalProceedsDefaultNo',
        type:'get',
        data:{
            id:$('.idcardNo .DefaultId:eq('+code+')').attr('id'),
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        success:function(data){
            
            window.location.reload()
        }
    })
}

$("#account .accountBtn").click(function(){
    $("#account .accountBtn").attr("disabled","disabled")
    $.ajax({
        url: baseUrl+'eht/account/accountTransfer',
        type:'get',
        data:{
            id: $(".hospitalName").attr("id")
        },
        success:function(data){
            // console.log(data)
            if(data.result=='1'){
                $('.smallAlert').show()
                $('.btn_return').hide()
                $('.btn_sure').show()
                $('.smallMask').show();
                $('.smallBox').show();
                $("#account .accountBtn").hide()
                $(".small_text").html("结算成功");
                $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
                $('.alertMask').hide();
                $(".alertAddrBox").hide();
                $("#account .accountBtn").removeAttr("disabled")
          })
            }else{
                $('.smallAlert').show()
                $('.btn_return').hide()
                $('.btn_sure').show()
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("结算失败,请核对您的银行卡信息");
                $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
                $('.alertMask').hide();
                $(".alertAddrBox").hide();
                $("#account .accountBtn").removeAttr("disabled")
          })
            }
        }

    })
})

//统计信息
function countList(startDate,endDate) {
    startDate=startDate+" "+"00:00:00";
    endDate=endDate+" "+"23:59:59";
    $.ajax({
        url:baseUrl+'eht/admin/HospitalCount/countBySub',
        type:'get',
        data:{
            startDate:startDate,
            endDate:endDate,
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        async:false,
        success: function (data) {
            $("#count_start").val(startDate.substring(0,10));
            $("#count_end").val(endDate.substring(0,10));
            // console.log(data);

// 加载导出的按钮
            var set='<img src="images/mess_01.png" alt=""><span onclick="setOut(\''+startDate+'\',\''+endDate+'\')">导出表格</span>'

            // $(".count_tit>div").html(set);



            if(data.length==0){
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
            var html='';
            var num1=0;
            var num2=0;
            var num3=0;
            var num4=0;
            var num5=0;
            var num6=0;
            for(var i=0;i<data.length;i++){
//                for(var j=0;j<5;j++){
                 // alert(data[i].SUBJECTNAME)
                    html+='<tr><td class="table_depart bgcolor_f2">'+data[i].SUBJECTNAME+'</td><td class="register_num"><span class="num_count">'+data[i].ORDERNUM+'</span><span class="money_count">'+(data[i].OMONEY/100).toFixed(2)+'</span></td><td class="change_num"><span class="num_count">'+data[i].CHANGENUM+'</span><span class="money_count">'+(data[i].CMONEY/100).toFixed(2)+'</span></td><td class="back_num"><span class="num_count">'+data[i].RETURNNUM+'</span><span class="money_count">'+(data[i].RMONEY/100).toFixed(2)+'</span></td><td class="operation"><a href=\"new_detail.html?name='+data[i].SUBJECTNAME+'&start='+startDate+'&end='+endDate+'&id='+data[i].SUBJECTID+'\">查看</a></td></tr>';
                    num1+=data[i].ORDERNUM;
                    num2+=data[i].CHANGENUM;
                    num3+=data[i].RETURNNUM;
                    num4+=data[i].OMONEY;
                    num5+=data[i].CMONEY;
                    num6+=data[i].RMONEY;
//                }
            }
            var total='<tr><td class="table_depart bgcolor_f2">总计</td><td class="register_num"><span class="num_count">'+num1+'</span><span class="money_count">'+(num4/100).toFixed(2)+'</span></td><td class="change_num"><span class="num_count">'+num2+'</span><span class="money_count">'+(num5/100).toFixed(2)+'</span></td><td class="back_num"><span class="num_count">'+num3+'</span><span class="money_count">'+(num6/100).toFixed(2)+'</span></td><td class="operation"></td></tr>';

            $(".count_total").html(total);
            $(".count_main").html(html);
            resize();
        }
    })
    // $.ajax({
    //     url:baseUrl+'eht/admin/HospitalCount/countByAll',
    //     type:'get',
    //     data:{
    //         startDate:startDate,
    //         endDate:endDate,
    //         hospitalId:sessionStorage.getItem('hospitalId')
    //     },
    //     async:false,
    //     success: function (data) {
    //         // console.log(data);
    //         var  html='<td>'+(data[0].am?data[0].am:0)+'</td><td>'+(data[0].male?data[0].male:0)+'</td><td>'+(data[0].APP_TYPE_0?data[0].APP_TYPE_0:0)+'</td><td>'+(data[0].TAKE_TYPE_0?data[0].TAKE_TYPE_0:0)+'</td><td>'+(data[0].RETURNNUM?data[0].RETURNNUM:0)+'</td>';
    //         var  html2='<td>'+(data[0].pm?data[0].pm:0)+'</td><td>'+(data[0].female?data[0].female:0)+'</td><td>'+(data[0].APP_TYPE_1?data[0].APP_TYPE_1:0)+'</td><td>'+(data[0].TAKE_TYPE_1?data[0].TAKE_TYPE_1:0)+'</td><td>'+(data[0].CHANGENUM?data[0].CHANGENUM:0)+'</td>';
    //         $(".info_tr_1").html(html);
    //         $(".info_tr_2").html(html2);
    //     }
    // })
}

function countNum1(date){
    $.ajax({
        type:"get",
        // url:baseUrl+'eht/admin/HospitalCount/countTimeBucket',
        url:baseUrl+"/eht/admin/HospitalCount/countOverTimeBucket",
        // url:"http://192.168.1.92:8333/eht/admin/HospitalCount/countOverTimeBucket",
        data:{
            hospitalId:sessionStorage.getItem('hospitalId'),
            // date:date
            startDate:'2018-04-17'
        },
        success:function(data){
            var guahaoInfo;
            if(data==""){
              $("#count_table .table:eq(1) tbody").empty()
            }else{
            for(var i = data.length-1;i>=0;i--){
                guahaoInfo += '<tr><td>'+data[i].QUANTUMTIME+'</td><td>'+data[i].NUM+'</td><td><a class="subject" href="detail.html?date='+$('#countDate').val()+'$time='+data[i].QUANTUMTIME+'">查看详情</a></td></tr>'
                
            }
            $("#count_table .table:eq(1) tbody").html(guahaoInfo);
          }
        }
    })
}

function countNum(date){
    $.ajax({
        type:"get",
        url:baseUrl+'eht/admin/HospitalCount/countTimeBucket',
        data:{
            hospitalId:sessionStorage.getItem('hospitalId'),
            // date:date
            date:date
        },
        success:function(data){
            var guahaoInfo;
            if(data==""){
              $("#count_table .table:eq(1) tbody").empty()
            }else{
            for(var i = data.length-1;i>=0;i--){
                guahaoInfo += '<tr><td>'+data[i].QUANTUMTIME+'</td><td>'+data[i].NUM+'</td><td><a class="subject" href="detail.html?date='+$('#countDate').val()+'$time='+data[i].QUANTUMTIME+'">查看详情</a></td></tr>'
                
            }
            $("#count_table .table:eq(1) tbody").html(guahaoInfo);
          }
        }
    })
}
// $(".subject").click(function(){
//   var date = $(".searchBtn").val()
//   var time = $(this).parent().find("td").eq(0).text();
//   console.log(date)
//   console.log(time)
//   window.location.href = '../detail.html'
//   $.ajax({
//     url:baseUrl+'eht/admin/HospitalCount/countTimeBucketByTime',
//     type:'get',
//     data:{
//       hospitalId:sessionStorage.getItem('hospitalId'),
//       date:date,
//       time:time
//     },
//     success:function(data){
//       console.log(data)
//       var detail;
//       for(var i = 0;i<data.length;i++){
//           detail += '<tr><td>'+data[i].name+'</td><td>'+data[i].Num+'</td></tr>'
//       }
//       $(".detail").html(detail)
//     }
//   })
// })

function detail(){
    var url = decodeURI(location.href);
    // var name=decodeURIComponent(url.split("name=")[1].split("&")[0]);
    var date=url.split("date=")[1].split("&")[0].split("$")[0];
    var time=url.split("time=")[1].split("&")[0];
    var hospitalName = sessionStorage.getItem('hospitalName');
    $.ajax({
      url:baseUrl+'eht/admin/HospitalCount/countTimeBucketByTime',
      type:'get',
      data:{
        hospitalId:sessionStorage.getItem('hospitalId'),
        date:date,
        time:time
      },
      success:function(data){
        console.log(data)
         var detail;
        for(var i = 0;i<data.length;i++){
            detail += '<tr><td>'+data[i].NAME+'</td><td>'+data[i].NUM+'</td></tr>'
        }
        $(".detail").html(detail)
      }
    })
}
// countNum()

$("#count .searchBtn").bind("click").click(function () {
    var start=$("#countDate").val();
    countNum(start)

})


function appointmentType(startDate,endDate){
    startDate=startDate+" "+"00:00:00";
    endDate=endDate+" "+"23:59:59";
    var appointmentType = $('.appointmentType').val();
    var type = '';
    if(appointmentType=="app预约挂号"){
        type = "0";
        $('#count_table .count_tit:eq(0) p').text("app预约挂号统计数据汇总表")
    }else if(appointmentType=="窗口预约挂号"){
        type = "1";
        $('#count_table .count_tit:eq(0) p').text("窗口预约挂号统计数据汇总表")
    }
    if(appointmentType=="全部"){
        $('#count_table .count_tit:eq(0) p').text("挂号统计数据汇总表")
        $.ajax({
        url:baseUrl+'eht/admin/HospitalCount/countBySub',
        type:'get',
        data:{
            startDate:startDate,
            endDate:endDate,
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        async:false,
        success:function(data){
            if(data.length==0){
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
            var html='';
            var num1=0;
            var num2=0;
            var num3=0;
            var num4=0;
            var num5=0;
            var num6=0;
            for(var i=0;i<data.length;i++){
//                for(var j=0;j<5;j++){
                 // alert(data[i].SUBJECTNAME)
                    html+='<tr><td class="table_depart bgcolor_f2">'+data[i].SUBJECTNAME+'</td><td class="register_num"><span class="num_count">'+data[i].ORDERNUM+'</span><span class="money_count">'+(data[i].OMONEY/100).toFixed(2)+'</span></td><td class="change_num"><span class="num_count">'+data[i].CHANGENUM+'</span><span class="money_count">'+(data[i].CMONEY/100).toFixed(2)+'</span></td><td class="back_num"><span class="num_count">'+data[i].RETURNNUM+'</span><span class="money_count">'+(data[i].RMONEY/100).toFixed(2)+'</span></td><td class="operation"><a href=\"new_detail.html?name='+data[i].SUBJECTNAME+'&start='+startDate+'&end='+endDate+'&id='+data[i].SUBJECTID+'\">查看</a></td></tr>';
                    num1+=data[i].ORDERNUM;
                    num2+=data[i].CHANGENUM;
                    num3+=data[i].RETURNNUM;
                    num4+=data[i].OMONEY;
                    num5+=data[i].CMONEY;
                    num6+=data[i].RMONEY;
//                }
            }
            var total='<tr><td class="table_depart bgcolor_f2">总计</td><td class="register_num"><span class="num_count">'+num1+'</span><span class="money_count">'+(num4/100).toFixed(2)+'</span></td><td class="change_num"><span class="num_count">'+num2+'</span><span class="money_count">'+(num5/100).toFixed(2)+'</span></td><td class="back_num"><span class="num_count">'+num3+'</span><span class="money_count">'+(num6/100).toFixed(2)+'</span></td><td class="operation"></td></tr>';

            $(".count_total").html(total);
            $(".count_main").html(html);
            resize();
        }
    })
    }else{
    $.ajax({
        url:baseUrl+'eht/admin/HospitalCount/countBySub',
        type:'get',
        data:{
            type:type,
            startDate:startDate,
            endDate:endDate,
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        async:false,
        success:function(data){
            if(data.length==0){
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
            var html='';
            var num1=0;
            var num2=0;
            var num3=0;
            var num4=0;
            var num5=0;
            var num6=0;
            for(var i=0;i<data.length;i++){
//                for(var j=0;j<5;j++){
                 // alert(data[i].SUBJECTNAME)
                    html+='<tr><td class="table_depart bgcolor_f2">'+data[i].SUBJECTNAME+'</td><td class="register_num"><span class="num_count">'+data[i].ORDERNUM+'</span><span class="money_count">'+(data[i].OMONEY/100).toFixed(2)+'</span></td><td class="change_num"><span class="num_count">'+data[i].CHANGENUM+'</span><span class="money_count">'+(data[i].CMONEY/100).toFixed(2)+'</span></td><td class="back_num"><span class="num_count">'+data[i].RETURNNUM+'</span><span class="money_count">'+(data[i].RMONEY/100).toFixed(2)+'</span></td><td class="operation"><a href=\"new_detail.html?name='+data[i].SUBJECTNAME+'&start='+startDate+'&end='+endDate+'&id='+data[i].SUBJECTID+'\">查看</a></td></tr>';
                    num1+=data[i].ORDERNUM;
                    num2+=data[i].CHANGENUM;
                    num3+=data[i].RETURNNUM;
                    num4+=data[i].OMONEY;
                    num5+=data[i].CMONEY;
                    num6+=data[i].RMONEY;
//                }
            }
            var total='<tr><td class="table_depart bgcolor_f2">总计</td><td class="register_num"><span class="num_count">'+num1+'</span><span class="money_count">'+(num4/100).toFixed(2)+'</span></td><td class="change_num"><span class="num_count">'+num2+'</span><span class="money_count">'+(num5/100).toFixed(2)+'</span></td><td class="back_num"><span class="num_count">'+num3+'</span><span class="money_count">'+(num6/100).toFixed(2)+'</span></td><td class="operation"></td></tr>';

            $(".count_total").html(total);
            $(".count_main").html(html);
            resize();
        }
    })
}
}

$('.count_tit .appointmentType').on('change',function(){
    var start=$("#count_start").val();
    var end=$("#count_end").val();
    // console.log(start,end);
    if(start==""||end==""||start==" "||end==" "){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("请选择时间");
        $(".btn_return").hide();
        $(".btn_sure").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
        })
    }else{
        appointmentType(start,end);

    }
})



//按时间搜索
$("#count .search_btn").bind("click").click(function () {
    var start=$("#count_start").val();
    var end=$("#count_end").val();
    // console.log(start,end);
    if(start==""||end==""||start==" "||end==" "){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("请选择时间");
        $(".btn_return").hide();
        $(".btn_sure").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
        })
    }else{
        countList(start,end);

    }

})


function resize() {
    var _width=$('#count_table').width();
    // console.log(_width);
    if(_width>1500){
//                $('.table_depart').width(_width*0.06);
//                $('.register_num').width(_width*0.08);
//                $('.change_num').width(_width*0.06);
//                $('.back_num').width(_width*0.06);
//                $('.visit_num').width(_width*0.08);
//                $('.count_money').width(_width*0.08);
//                $('.operation').width(_width*0.06);
//                $("#count_right").width(_width*0.4);
//                $("#count_right").removeClass("pull-left").addClass("pull-right");
//                $("#count_right #echarts>div").width(_width*0.4);
//                $("#count_right #echarts>div>canvas").width(_width*0.4);

        $('.table_depart').width(_width*0.06);
        $('.register_num').width(_width*0.13);
        $('.change_num').width(_width*0.13);
        $('.back_num').width(_width*0.13);
//                $('.visit_num').width(_width*0.1);
//                $('.count_money').width(_width*0.18);
        $('.operation').width(_width*0.06);
        $("#count_right").width(_width*0.4);
        $("#count_right").removeClass("pull-left").addClass("pull-right");
        $("#count_right #echarts>div").width(_width*0.4);
        $("#count_right #echarts>div>canvas").width(_width*0.4);

    }
    if(_width<1500){
        $('.table_depart').width(_width*0.1);
        $('.register_num').width(_width*0.25);
        $('.change_num').width(_width*0.25);
        $('.back_num').width(_width*0.25);
//                $('.visit_num').width(_width*0.15);
//                $('.count_money').width(_width*0.15);
        $('.operation').width(_width*0.1);
        $("#count_right").removeClass("pull-right").addClass("pull-left");
        $("#count_right").width($(".count_head").width());
        $("#count_right #echarts>div").width($(".count_head").width());
        $("#count_right #echarts>div>canvas").width($(".count_head").width());
    }
//            if(_width<1165){
//                $('.table_depart').width(_width*0.1);
//                $('.register_num').width(_width*0.12);
//                $('.change_num').width(_width*0.1);
//                $('.back_num').width(_width*0.1);
////                $('.visit_num').width(_width*0.12);
////                $('.count_money').width(_width*0.12);
//                $('.operation').width(_width*0.1);
//                $("#count_right").removeClass("pull-right").addClass("pull-left");
//                $("#count_right").width($(".count_head").width());
//                $("#count_right #echarts>div").width($(".count_head").width());
//                $("#count_right #echarts>div>canvas").width($(".count_head").width());
//            }

}
//筛选方式
// function selChange(){
//     var nowYear=new Date().getFullYear();
//     picNum(nowYear,1);
//     $("#choice").change(function () {
//         var val=$("#choice option:selected").val();
//         var data=$("#year option:selected").val();
//         picNum(data,val);
//     })
//     $("#year").change(function () {
//         var val=$("#choice option:selected").val();
//         var data=$("#year option:selected").val();
//         picNum(data,val);
//     })
// }
//获取柱状图数据
// function picNum(year,code) {
//     // console.log(year,code);
//     $.ajax({
//         url:"http://www.51edoctor.cn/eht/admin/HospitalCount/countByCirAll",
//         type:"post",
//         data:{
//             hospitalId:sessionStorage.getItem('hospitalId'),
//             year:year,
//             code:code
//         },
//         success: function (data) {
//             // console.log(data);
// //            完成后需要更改的
//            var female=data[0].down;
//            var male=data[0].up;
//            var num1=[];
//            var num2=[];
//         if(!male||!female){
//           if(!male&&female){
//             var t = female.length
//             for(var i=0;i<t;i++){
//                num1.push(female[i].ORDERNUM);
//                // num2.push(male[i].ORDERNUM);
//            }
//             echart(num1,num2,code);
//         }else if(!female&&male){
//             var t = male.length;
//             for(var i=0;i<t;i++){
//                // num1.push(female[i].ORDERNUM);
//                num2.push(male[i].ORDERNUM);
//            }
//             echart(num1,num2,code);
//             }
//         }else{
//             if(female.length<male.length){
//                var t=female.length
//            }else{
//                var t=male.length
//            }
//             for(var i=0;i<t;i++){
//                num1.push(female[i].ORDERNUM);
//                num2.push(male[i].ORDERNUM);
//            }
//             echart(num1,num2,code);
//         }
        
        
//            // if(female.length<male.length){
//            //     var t=female.length
//            // }else{
//            //     var t=male.length
//            // }
//            // for(var i=0;i<t;i++){
//            //     num1.push(female[i].ORDERNUM);
//            //     // num2.push(male[i].ORDERNUM);
//            // }
// //            假数据
//             // var num1=[200,300,524,658,547,687,15,369,258,687,148,369];
//             // var num2=[300,20,24,68,147,487,185,369,488,487,638,669];
//             // console.log(num1,num2);
//             // echart(num1,num2,code);
//         }
//     })
// }
//柱状图
// function echart(Number1,Number2,mode) {
//     var appList=Number1;
//     var winList=Number2;
//     var name1="上午";
//     var name2="下午";
//     switch(parseInt(mode)){
//         case 1:
//             appList=Number1;
//             winList=Number2;
//             name1="上午";
//             name2="下午";
//             break;
//         case 2:
//             appList=Number1;
//             winList=Number2;
//             name1="男性";
//             name2="女性";
//             break;
//         case 3:
//             appList=Number1;
//             winList=Number2;
//             name1="app挂号";
//             name2="窗口挂号";
//             break;
//         case 4:
//             appList=Number1;
//             winList=Number2;
//             name1="自助取号";
//             name2="窗口取号";
//             break;
//     }
//     // console.log(appList,winList);
//     var myChart = echarts.init(document.getElementById('echarts'));
//     var option = {
//         title : {
//             text: '数量/位'
//         },
//         tooltip : {
//             trigger: 'axis'
//         },
//         legend: {
//             data:[name1,name2]
//         },
//         toolbox: {
//             show : true,
//             feature : {
//                 dataView : {show: true, readOnly: false},
//                 magicType : {show: true, type: ['line', 'bar']},
//                 restore : {show: true},
//                 saveAsImage : {show: true}
//             }
//         },
//         calculable : true,
//         xAxis : [
//             {
//                 type : 'category',
//                 data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
//             }
//         ],
//         yAxis : [
//             {
//                 type : 'value'
//             }
//         ],
//         series : [
//             {
//                 name:name1,
//                 type:'bar',
//                 data:appList,
//                 itemStyle:{
//                     normal:{
//                         color:"#06a0fa"
//                     }
//                 }
//             },
//             {
//                 name:name2,
//                 type:'bar',
//                 data:winList,
//                 itemStyle:{
//                     normal:{
//                         color:"#ef6d75"
//                     }
//                 }
//             }
//         ]
//     };
//     myChart.clear();
//     myChart.setOption(option);
// }

//年份
(function($){
    $.extend({
        ms_DatePicker: function (options) {
            var now=new Date().getFullYear();
            var defaults = {
                YearSelector: "#year",
                FirstText: now,
                FirstValue: now
            };
            var opts = $.extend({}, defaults, options);
            var $YearSelector = $(opts.YearSelector);
            var FirstText = opts.FirstText;
            var FirstValue = opts.FirstValue;
            // 初始化
            var str = "<option value=\"" + FirstValue + "\">" + FirstText + "</option>";
            $YearSelector.html(str);
            // 年份列表
            var yearNow = new Date().getFullYear();
            var yearSel = $YearSelector.attr("rel");
            for (var i = yearNow-1; i >=(yearNow-1); i--) {
                var sed = yearSel==i?"selected":"";
                var yearStr = "<option value=\"" + i + "\" " + sed+">" + i + "</option>";
                $YearSelector.append(yearStr);
            }
        }
    });
})(jQuery);

//统计详情
function countDetail() {
    var url = decodeURI(location.href);
    var name=decodeURIComponent(url.split("name=")[1].split("&")[0]);
    var start=url.split("start=")[1].split("&")[0];
    var end=url.split("end=")[1].split("&")[0];
    var subjectId=url.split("id=")[1];
    console.log(url,name,subjectId,start,end);
    $.ajax({
        url:baseUrl+'eht/admin/HospitalCount/countByDay',
        // url:'http://192.168.1.51:8333/eht/admin/HospitalCount/countByDay',
        type:'post',
        data:{
          hospitalId:sessionStorage.getItem('hospitalId'),
            subjectId:subjectId,
            startDate:start,
            endDate:end
        },
        async:false,
        success: function (data) {
            console.log(data);
            var html='';
            var text=name+'挂号数据情况(天)';
            $("#detail_head>p").html(text);
            for(var j=0;j<10;j++){
                for(var i=0;i<data.length;i++){
                    html+="<tr><td class=\"bgcolor_f2 detail_data\">"+data[i].statisticalDate+"</td><td class=\"detail_app\">"+data[i].appType+"</td><td class=\"detail_window\">"+data[i].windowType+"</td><td class=\"detail_self\">"+data[i].selfTake+"</td><td class=\"detail_get\">"+data[i].windowTake+"</td><td  class=\"detail_back\">"+data[i].returnNum+"</td><td  class=\"detail_change\">"+data[i].changeNum+"</td><td class=\"color_fe detail_money\">"+data[i].money+"</td></tr>";
                }
                console.log(html)
                $("#detail_body").html(html);
            }
        }
    })
    $.ajax({
        url:baseUrl+'eht/admin/HospitalCount/countByDayAll',
        type:'post',
        data:{
            hospitalId:sessionStorage.getItem('hospitalId'),
            subjectId:subjectId,
            startDate:start,
            endDate:end
        },
        async:false,
        success: function (data) {
            console.log(data)
            var text=name+'挂号饼状图('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
            var txt=name+'挂号数据情况('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
            $("#detail_left_chart>p").html(text);
            $(".detail_left>p").html(txt);
            var  html1='<td class="dateAM">'+data[0].dateAM+'</td><td class="man">'+data[0].man+'</td><td class="appType">'+data[0].appType+'</td><td class="selfTake">'+data[0].selfTake+'</td><td>'+data[0].returnNum+'</td><td rowspan="3" class="color_fe">'+data[0].money.toFixed(2)+'</td>';
            var  html2='<td class="datePM">'+data[0].datePM+'</td><td class="woman">'+data[0].woman+'</td><td class="windowType">'+data[0].windowType+'</td><td class="windowTake">'+data[0].windowTake+'</td><td>'+data[0].changeNum+'</td>';

            // for(var i = 0;i<data.analysisList.length;i++){
            //     var html1 ='<td class="dateAM">'+data.analysisList[i].dateAM+'</td><td class="man">'+data.analysisList[i].man+'</td><td class="appType">'+data.analysisList[i].appType+'</td><td class="selfTake">'+data.analysisList[i].selfTake+'</td><td>'+data.analysisList[i].returnNum+'</td><td rowspan="3" class="color_fe">'+data.analysisList[i].money.toFixed(2)+'</td>'
            //     var html2 ='<td class="datePM">'+data.analysisList[i].datePM+'</td><td class="woman">'+data.analysisList[i].woman+'</td><td class="windowType">'+data.analysisList[i].windowType+'</td><td class="windowTake">'+data.analysisList[i].windowTake+'</td><td>'+data.analysisList[i].changeNum+'</td>';

            // }

            $(".tr_top").html(html1);
            $(".tr_down").html(html2);

        }
    })
}

//饼状图
function piePic(obj) {
    var myChart = echarts.init(document.getElementById('pie_table'));
    var data1=['上午','下午'];
    var name1="上/下午";
    var data2=[{value:parseInt($(".dateAM").html()), name:'上午'},{value:parseInt($(".datePM").html()), name:'下午'}];
    switch(parseInt(obj)){
        case 1:
            data1=['上午','下午'];
            name1="上/下午";
            data2=[{value:parseInt($(".dateAM").html()), name:'上午'},{value:parseInt($(".datePM").html()), name:'下午'}];
            break;
        case 2:
            data1=['男性','女性'];
            name1="性别";
            data2=[{value:parseInt($(".man").html()), name:'男性'},{value:parseInt($(".woman").html()), name:'女性'}];
            break;
        case 3:
            data1=['APP挂号','窗口挂号'];
            name1="挂号";
            data2=[{value:parseInt($(".appType").html()), name:'APP挂号'},{value:parseInt($(".windowType").html()), name:'窗口挂号'}];
            break;
        case 4:
            data1=['自助取号','窗口取号'];
            name1="取号方式";
            data2=[{value:parseInt($(".selfTake").html()), name:'自助取号'},{value:parseInt($(".windowTake").html()), name:'窗口取号'}];
            break;
    }
    // console.log(data2);
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:data1
        },
        color:["#06a0f8","#fe5252"],
        series: [
            {
                name:name1,
                type:'pie',
                radius: ['40%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data2
            }
        ]
    };
    myChart.clear();
    myChart.setOption(option);
}

//筛选
function pieChange(){
    piePic(1);
    $("#pie_method").change(function () {
        var val=$("#pie_method option:selected").val();
        console.log(val);
        piePic(val);
    })
}
//获取管理信息
function setUp(page,name,username){
    var list=[{}];
    list[0].CurrentPage=page;
    list[0].totalPages="10";
    list[0].hospitalId=sessionStorage.getItem('hospitalId');
    name==""||name==" "||name=="undefined"||name==undefined?list[0].name="":list[0].name=name;
    list[0].roleIds="";
    username==""||username==" "||username=="undefined"||username==undefined?list[0].username="":list[0].username=username;
    console.log(JSON.stringify(list));
    $.ajax({
        url:baseUrl+'eht/admin/hospitalUser/QueryList',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.length<1){
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("未查找到相应信息");
                $(".btn_return").hide();
                $(".btn_sure").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                })
                return false;
            }
            var num=data[0].num;
            var count = Math.ceil(num / 10);
            var html='';
            var orderId;
            for(var i=0;i<data.length;i++){
                data[i].roleIds=="11"?orderId="医院排班员":( data[i].roleIds=="13")?orderId="医院统计员":orderId="医院挂号员";
//                if(i==0){
//                    html='<tr><td>'+(i+1)+'</td><td><input type="hidden" value="'+data[0].id+'"/><span class="username">'+data[0].username+'</span></td><td>'+data[0].name+'</td><td>'+orderId+'</td><td></td></tr>';
//                }else{
                html+='<tr><td>'+(i+1)+'</td><td><input class="departmentId" type="hidden" value="'+data[i].departmentId+'"/><input class="password" type="hidden" value="'+data[i].password+'"/><input class="mobileno" type="hidden" value="'+data[i].mobileno+'"/><input class="id" type="hidden" value="'+data[i].id+'"/><span class="username">'+data[i].username+'</span></td><td class="uname">'+data[i].name+'</td><td><input class="roleIds" type="hidden" value="'+data[i].roleIds+'"/>'+orderId+'</td><td><button  class="set_check set_dele bgcolor_2f">查看</button><button class="set_remove set_dele delete" onclick="setDel(this)">删除</button></td></tr>';
//                }
            }
            $(".set_content").html(html);
            //查看信息
            $(".set_check").click(function () {
                $('.alertMask').show();
                $('.alertBox').show();
                $("#set_btn").hide();
                $("#set_check").hide();
                $(".set_id").val($(this).parents("tr").find(".id").val());
                $("#psd_error").removeClass("color_fe").text("密码必须由6-21大小写字母和数字组成");
                $(".set_username").val($(this).parents("tr").find(".username").html());
                $(".set_username").attr("disabled","disabled");
                $(".set_username").next().html("");
                // $(".set_psd").attr("placeholder","输入需要修改的密码");
                // $(".set_psd").val("");
                $(".set_psd").attr("disabled","disabled");
                $(".set_Uname").val($(this).parents("tr").find(".uname").html());
                $(".set_tel").val($(this).parents("tr").find(".mobileno").val());
                $(".set_power").val($(this).parents("tr").find(".roleIds").val());
                if($(this).parents("tr").find(".roleIds").val()=="12"||$(this).parents("tr").find(".roleIds").val()=="13"){
                    $(".setBox_title>lable").hide();
                    $(".setBox_title select").hide();
                }else{
                    $(".setBox_title>lable").show();
                    $(".setBox_title select").show();
                    $(".set_title").val($(this).parents("tr").find(".departmentId").val());
                }
            })
            $(document.documentElement).animate({ scrollTop: 0 }, 300);
            //支持chrome
            $(document.body).animate({ scrollTop: 0 }, 300);
            setPage(page,count);
        }
    })
    $("#set .new_schedule").bind("click").click(function () {
        $(".set_username").next().html("只能输入数字和英文");
        $(".set_username").attr("disabled",false);
        $(".set_username").val("");
        $(".set_psd").val("");
        $("#psd_error").removeClass("color_fe").text("密码必须由6-21大小写字母和数字组成");
        $(".set_psd").attr("placeholder","输入新建用户登录密码")
        $(".set_Uname").val("");
        $(".set_tel").val("");
        $('.alertMask').show();
        $('.alertBox').show();
        $("#set_btn").show();
        $("#set_check").hide();
    })

}
function setPage(page,count) {
    if (count > 1) {
        $('.set_page').show();
        $('.set_page').myPagination({
            currPage: page,
            pageCount: count,
            pageSize: 10,
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
                    setUp(page);
                }
            }
        });
    } else {
        $('.set_page').hide();
    }
}
//查询
$("#set .search_btn").bind("click").click(function () {
    var name=$(".set_name").val();
    var id=$(".set_user").val();
    setUp(1,name,id);
})


//密码验证
function newPw(){
    var reg=/^(?![A-Z]+$)(?![0-9]+$)(?![a-z]+$)[0-9A-Za-z]{6,20}$/;
    if($(".set_psd").val()==""){
        $("#psd_error").html("密码必须由6-21大小写字母和数字组成");
        $("#psd_error").removeClass("color_fe");
        return true;
    }else if(!reg.test($(".set_psd").val())){
        $("#psd_error").html("密码格式错误");
        $("#psd_error").removeClass("color_fe").addClass("color_fe");
        return false;
    }
    else{
        $("#psd_error").html("密码必须由6-21大小写字母和数字组成");
        $("#psd_error").removeClass("color_fe");
        return true;
    }
}



//添加
function setAdd() {
    var username=$(".set_username").val();
    var password=$(".set_psd").val();
    var name=$(".set_Uname").val();
    var phone=$(".set_tel").val();
    var roleIds=$(".set_power").val();
    var depart=$(".set_title option:selected").val();
    if(!depart){
        depart="";
    }
    var list=[{
        username:username,
        password:password,
        hospitalId:sessionStorage.getItem('hospitalId'),
        name:name,
        roleIds:roleIds,
        mobileno:phone,
        departmentId:depart
    }];
    console.log(list);
    console.log(Boolean(username&password&name&phone))
    if(username!=""&password!=""&name!=""&phone!=""&!$("#psd_error").hasClass("color_fe")){
        $.ajax({
            url:baseUrl+'eht/admin/hospitalUser/Insert',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("添加成功");
                $(".btn_return").hide();
                location.reload();
                $(".btn_sure").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                    $('.alertMask').hide();
                    $('.alertBox').hide();
                })
            }
        })
    }else{
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("请输入完整信息");
        $(".btn_return").hide();
        $(".btn_sure").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
        })
    }
}
//删除
function setDel(e){
    var id= $(e).parents("tr").find(".id").val();
    console.log(id);
    $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html("是否确认删除");
    $(".btn_sure").click(function () {
        $.ajax({
            url:baseUrl+'eht/admin/hospitalUser/deleteById',
            type:'post',
            data:{
                id:id,
                hospitalId:sessionStorage.getItem('hospitalId')
            },
            success: function (data) {
                $('.smallMask').hide();
                $('.smallBox').hide();
                window.location.reload();
            }
        })

    })
}

//科室名称
function dapart() {
    $.ajax({
        url:baseUrl+'eht/admin/hospitalUser/selectSub',
        type:'post',
        data:{
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        success: function (data) {
            var html='';
            for(var i=0;i<data.length;i++){
                if(i==0){
                    html='<option value="'+data[i].departmentId+'">'+data[i].subName+'</option>';
                }else{
                    html+='<option value="'+data[i].departmentId+'">'+data[i].subName+'</option>';
                }

            }
            $(".set_title").html(html);
        }
    })
}
//查找是否有改用户
function leaveOf(){
    var val=$(".set_username").val();
    console.log(val);
    $.ajax({
        url:baseUrl+'eht/admin/hospitalUser/selectByUserName',
        type:'post',
        data:{
            username :val,
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        success: function (data) {
            console.log(data.NUM);
            if(data.NUM=="1"){
                $(".set_username").next().addClass("color_fe").html("该账号已存在");
                $(".set_username").val("");
            }else{
                $(".set_username").next().html("只能输入数字和英文").removeClass("color_fe");
            }
        }
    })
}
function setCheck() {
    var username=$(".set_username").val();
    var password=$(".set_psd").val();
    var name=$(".set_Uname").val();
    var phone=$(".set_tel").val();
    var roleIds=$(".set_power").val();
    var id=$(".set_id").val();
    var depart=$(".set_title option:selected").val();
    if(!depart){
        depart="";
    }

    var list=[{
        id:id,
        username:username,
        password:password,
        name:name,
        hospitalId:sessionStorage.getItem('hospitalId'),
        roleIds:roleIds,
        mobileno:phone,
        departmentId:depart
    }];


    // console.log(JSON.stringify(list));
//    return false;
    $.ajax({
        url:baseUrl+'eht/admin/hospitalUser/UpdateById',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("修改成功");
            $(".btn_return").hide();
            location.reload();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
                $('.alertMask').hide();
                $('.alertBox').hide();
            })
        }
    })

}

function setChange(){
    if($(".set_power option:selected").val()=="12"||$(".set_power option:selected").val()=="13"){
        $(".setBox_title>lable").hide();
        $(".setBox_title select").hide();
    }
    if($(".set_power option:selected").val()=="11"){
        $(".setBox_title>lable").show();
        $(".setBox_title select").show();
    }
}


// 统计导出表格

function setOut(start,end){
    $.ajax({
        url:baseUrl+'eht/admin/HospitalCount/countExcle',
        type:'post',
        data:{
            startDate:start,
            endDate:end,
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        success:function(data) {
            alert("导出成功");
            window.location="http://www.51edoctor.cn/eht/uploadFile/"+data;
        }
    })

}



















//床位当前信息
function bedMess() {
    $.ajax({
        url:baseUrl+'eht/admin/bunkSource/QueryList',
        type:'post',
        success: function (data) {
            console.log(data);
            var i=1;
            var html='';
            $.each(data, function (index,val) {
                var bed=val.bunkType;
                var type;
                switch(parseInt(bed)){
                    case 0:
                        type="普通床位";
                        break;
                    case 1:
                        type="特需床位";
                        break;
                    case 2:
                        type="VIP床位";
                        break;
                    case 3:
                        type="其他(加床)";
                        break;
                }
                html+="<tr><td class='schedule_num'><input class='bunkId' type='hidden' value='"+val.bunkId+"'/><input class='updateNum' type='hidden' value='"+val.updateNum+"'/>"+i+"</td><td class='schedule_name'>"+type+"</td><td class='schedule_title'>"+(val.totalNum+val.updateNum)+"</td><td class='schedule_1'>"+val.inventoryNum+"</td><td class='schedule_2'>"+(val.totalNum+val.updateNum-val.inventoryNum)+"</td><td class='schedule_5'><button class='bed_plus' onclick='bedPlus(this,1)'>加床</button><button class='bed_reduce' onclick='bedPlus(this,-1);'>减床</button></td></tr>";
                i++;
            })
            $("#bed_body").html(html);
        }
    })
}


//加床
function bedPlus(e,type) {
    var list=[{}];
    console.log(typeof(type));
    list[0].bunkId=$(e).parents("tr").find(".bunkId").val();
    console.log(typeof ($(e).parents("tr").find(".updateNum").val()));
    list[0].updateNum=parseInt($(e).parents("tr").find(".updateNum").val())+type;
    list[0].inventoryNum=parseInt($(e).parents("tr").find(".schedule_1").html())+type;
    if(type=='1'){
        list[0].type="0";
    }
    if(type=='-1'){
        list[0].type="1";
    }
    console.log(list);
    $.ajax({
        url:baseUrl+'eht/admin/bunkSource/updateByPrimaryKey',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            console.log(data);
            $(e).parents("tr").find(".schedule_title").html(parseInt($(e).parents("tr").find(".schedule_title").html())+type);
            $(e).parents("tr").find(".schedule_1").html(parseInt($(e).parents("tr").find(".schedule_1").html())+type);
            $(e).parents("tr").find(".updateNum").val(parseInt($(e).parents("tr").find(".updateNum").val())+type);
        }
    })
}


//修改记录
function recordList() {
    var html='';
    for(var i=0;i<8;i++){
        html+='<tr><td>'+i+'</td><td>2017-06-24(星期二)</td><td>VIP床位</td><td>-</td><td>1</td><td>张三</td></tr>'
    }
    $(".record_main").html(html);
}
