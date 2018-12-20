/**
 * Created by Administrator on 2017/7/21.
 */
/**
 * Created by Administrator on 2017/7/13.
 */

//格式化费用
 function formatFee(fee){
    return (fee/100).toFixed(2);
 };
 var baseUrl = 'http://www.51edoctor.cn/';
 // var baseUrl = 'http://192.168.1.51:8333/';
//加载动态时间
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
    // $("caption span").html("("+year + "-" + month + "-" + data+")");
}
      //已知医生职称类型文本输出数字
       var doctorTitle_text = function(doctortitle){
           switch (doctortitle){
                case '其他':
                return '0';
                break;
                case '教授':
                return '1';
                break;
                case '副教授':
                return '2';
                break;
                case '博士生导师':
                return '3';
                break;
                case '硕士生导师':
                return '4';
                break;
                default:
                return '';
                break;
              }
       };

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
    doctor(1);
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
    $('.alertFeeBox').hide();
    // 获取弹窗宽高
    var width=$('.alertBox').width();
    var height=$('.alertBox').height();
    var width1=$('.alertFeeBox').width();
    var height1=$('.alertFeeBox').height();
    // 获取浏览器窗口宽高
    var h=document.documentElement.clientHeight;
    var w=document.documentElement.clientWidth;
    $('.alertBox').css({ 'top': (h-height) / 2 + 'px', 'left': (w-width) / 2 + 'px' });
    $('.alertFeeBox').css({ 'top': (h-height1) / 2 + 'px', 'left': (w-width1) / 2 + 'px' });
    $('.alert-close').click(function(){
        $('.alertMask').hide();
        $('.alertBox').hide();
         $('.alertFeeBox').hide();
    })
})
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
//排班
function build(){
    $('.alertMask').show();
    $('.alertFeeBox').hide();
    $('.alertBox').show();
    $("#doctor_btn").show();
    $(".doc_tellTip").hide();
    // $("#remark_btn").show();
    $("#doctor_remark").hide();
    $('.imgDiv').show();
    $('.doc_name').val("");
    $(".doc_tell").val("");
    $(".doc_job").val("");
    $(".img_content ").html("");
    // $("#duty option[value='1']").attr('selected',true);
        duty_default();
        duty_change();
        //查询诊疗费 有就展示 没有就为空
        showFee('4');
    $("#duty option[value='4']").attr('selected',true);
    $("#doc_sex option[value='0']").attr('selected',true);
    $(".doc_age").val(" ");
    $(".skill>textarea").val("");
    $(".self_mess>textarea").val("");
    // $(".skill textarea").val(" ");
   
}


//增加医生信息弹窗设置
    function duty_default(){
        if($('#duty option:selected').val()<= 2){
            // alert($('#duty option:selected').val())
            $('.money_doctor .expert_money').prev().css({'color':'#b2b2b2'});
             $('.money_doctor .expert_money').attr('disabled',true);
             $('.money_doctor .expert_money').val("0").parent().hide();
             $('.money_doctor .special_money').prev().css({'color':'#b2b2b2'});
             $('.money_doctor .special_money').attr('disabled',true);
             $('.money_doctor .special_money').val("0").parent().hide();
        }else{
            // alert($('#duty option:selected').val())
            $('.money_doctor .expert_money').prev().css({'color':'#000'});
             $('.money_doctor .expert_money').attr('disabled',false);
             $('.money_doctor .special_money').prev().css({'color':'#000'});
             $('.money_doctor .special_money').attr('disabled',false);
        }     
    }
    function duty_change(){
        $('#duty').on('change',function(){
            if($('#duty option:selected').val()<= 2){
                $('.money_doctor .expert_money').prev().css({'color':'#b2b2b2'});
                 $('.money_doctor .expert_money').attr('disabled',true);
                 $('.money_doctor .expert_money').val("0").parent().hide();
                 $('.money_doctor .special_money').prev().css({'color':'#b2b2b2'});
                 $('.money_doctor .special_money').attr('disabled',true);
                 $('.money_doctor .special_money').val("0").parent().hide();
            }else{
                $('.money_doctor .expert_money').prev().css({'color':'#000'});
                 $('.money_doctor .expert_money').attr('disabled',false);
                 $('.money_doctor .expert_money').parent().show();
                 $('.money_doctor .special_money').prev().css({'color':'#000'});
                 $('.money_doctor .special_money').attr('disabled',false);
                 $('.money_doctor .special_money').parent().show();
            }     
            showFee($('#duty option:selected').val()); //
        });
    };

function showFee(duty){
       $.ajax({
            url:baseUrl+'eht/admin/free/selectByHospitalId',
            type:'post',
            data:{
              hospitalId: sessionStorage.getItem('hospitalId'),
             departmentId:sessionStorage.getItem('subjectId'),
             duty:duty,
            },
            success:function(data){
                 // alert(duty)
                  for(var i=0;i<data.length;i++){
                    $('.alertBox .normal_money').val(formatFee(data[i].plainMoney));
                    $('.alertBox .expert_money').val(formatFee(data[i].expertMoney));
                    $('.alertBox .special_money').val(formatFee(data[i].specialMoney));
                  }
            }
       });
 
}

//点击弹出地址设置框
function setAddress(){
  $('.alertMask').show();
  $(".alertAddrBox").show();
  // $(".address_set").val('');
  $(".addressTop>.alert-close").click(function(){
      $('.alertMask').hide();
      $(".alertAddrBox").hide();
  });
  $.ajax({
    url:baseUrl+'eht/admin/scheduling/getWorkStorey',
    // url:'http://192.168.1.92:8333/eht/admin/scheduling/getWorkStorey',
    type:'get',
    data:{
      hospitalId:sessionStorage.getItem("hospitalId"),
      departmentId:sessionStorage.getItem("subjectId")
    },
    success:function(data){
        $(".address_set").val(data.workStorey)
    }
  })
}


$(".addressBottom>button").click(function(){
      var address = $(".address_set").val();
      if(!address || address==""){
        return;
      }
      $.ajax({
        url:baseUrl+'eht/admin/scheduling/setWorkStorey',
        type:"get",
        data:{
          hospitalId:sessionStorage.getItem('hospitalId'),
          subjectcontents:sessionStorage.getItem('subjectId'),
          workStorey:address
        },
        success:function(data){
          if(data == 1){
              $('.smallMask').show();
              $('.smallBox').show();
              $(".small_text").html("保存成功");
              $(".btn_return").hide();
              $(".btn_sure").click(function () {
                 $('.smallMask').hide();
                 $('.smallBox').hide();
                 $('.alertMask').hide();
                 $(".alertAddrBox").hide();
              })
           }else{
              $('.smallMask').show();
              $('.smallBox').show();
              $(".small_text").html("科室地址添加失败");
              $(".btn_return").hide();
              $(".btn_sure").click(function () {
                 $('.smallMask').hide();
                 $('.smallBox').hide();
                 $('.alertMask').hide();
                 $(".alertAddrBox").hide();
              })
            }
        },
        error:function(){
          alert("网络错误");
        }
      })
  });

function clearFee(){
  $(".fee_table tr:eq(1)").find(".normal_money").val('');
  $(".fee_table tr:eq(1)").find(".expert_money").val('');
  $(".fee_table tr:eq(1)").find(".special_money").val('');
  $(".fee_table tr:eq(2)").find(".normal_money").val('');
  $(".fee_table tr:eq(2)").find(".expert_money").val('');
  $(".fee_table tr:eq(2)").find(".special_money").val('');
  $(".fee_table tr:eq(3)").find(".normal_money").val('');
  $(".fee_table tr:eq(4)").find(".normal_money").val('');
  $(".fee_table tr:eq(5)").find(".normal_money").val('');
}

function setFee(){
   //   $('.doctor_table table>tbody tr.doctor_tr').hide();
   // $('.doctor_table table>tbody tr.fee_tr').show();
   // $('#doctor_amount').empty();
   clearFee();
    $('.alertMask').show();
     $('.alertBox').hide();
    $('.alertFeeBox').show();
    //如果之前保存过费用要显示在表格里
     $.ajax({
            url:baseUrl+'eht/admin/free/selectByHospitalId',
            type:'post',
            data:{
              hospitalId: sessionStorage.getItem('hospitalId'),
             departmentId:sessionStorage.getItem('subjectId'),
             // duty:duty,
            },
            success:function(data){
                  // for(var i=0;i<data.length;i++){
                  //    $(self).attr('changeId',data[i].id);
                  // }  
                  if(data == [] || data.length == 0){
                        return false;
                  }
                  for(var i=0;i<data.length;i++){
                    if(data[i].duty == 4){
                        $('.fee_table tbody').find('tr').eq(1).attr("dutyid",data[i].id);
                        $('.fee_table tbody').find('tr').eq(1).find('.normal_money').val(formatFee(data[i].plainMoney)==0.00?"":formatFee(data[i].plainMoney));
                        $('.fee_table tbody').find('tr').eq(1).find('.expert_money').val(formatFee(data[i].expertMoney)==0.00?"":formatFee(data[i].expertMoney));
                        $('.fee_table tbody').find('tr').eq(1).find('.special_money').val(formatFee(data[i].specialMoney)==0.00?"":formatFee(data[i].specialMoney));
                    }
                    if(data[i].duty == 3){
                        $('.fee_table tbody').find('tr').eq(2).attr("dutyid",data[i].id);
                        $('.fee_table tbody').find('tr').eq(2).find('.normal_money').val(formatFee(data[i].plainMoney)==0.00?"":formatFee(data[i].plainMoney));
                        $('.fee_table tbody').find('tr').eq(2).find('.expert_money').val(formatFee(data[i].expertMoney)==0.00?"":formatFee(data[i].expertMoney));
                        $('.fee_table tbody').find('tr').eq(2).find('.special_money').val(formatFee(data[i].specialMoney)==0.00?"":formatFee(data[i].specialMoney));
                    }
                     if(data[i].duty == 2){
                        $('.fee_table tbody').find('tr').eq(3).attr("dutyid",data[i].id);
                        $('.fee_table tbody').find('tr').eq(3).find('.normal_money').val(formatFee(data[i].plainMoney)==0.00?"":formatFee(data[i].plainMoney));
                    }
                     if(data[i].duty == 1){
                        $('.fee_table tbody').find('tr').eq(4).attr("dutyid",data[i].id);
                        $('.fee_table tbody').find('tr').eq(4).find('.normal_money').val(formatFee(data[i].plainMoney)==0.00?"":formatFee(data[i].plainMoney));
                    }
                     if(data[i].duty == 0){
                        $('.fee_table tbody').find('tr').eq(5).attr("dutyid",data[i].id);
                        $('.fee_table tbody').find('tr').eq(5).find('.normal_money').val(formatFee(data[i].plainMoney)==0.00?"":formatFee(data[i].plainMoney));
                    }
                  }
            }
       });

};
//保存挂号费用
$('.btn_saveFee').click(function(){
    var duty =$(this).parent().parent().find('td').eq(0).attr('duty');
  //  alert(duty);
    if(duty == '4'){
        //主任医师
       var plainMoney = $('.fee_table tr').eq(1).find('.normal_money').val().trim();
        var expertMoney = $('.fee_table tr').eq(1).find('.expert_money').val().trim();
         var specialMoney = $('.fee_table tr').eq(1).find('.special_money').val().trim();
         console.log(plainMoney +'-'+expertMoney+'-'+specialMoney);
        if(!plainMoney||!expertMoney||!specialMoney){
            $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("请填写完整的费用");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
            return false;
       } 
       $.ajax({
            url:baseUrl+'eht/admin/free/regFreeInsert',
            type:'post',
            data:{
              hospitalId: sessionStorage.getItem('hospitalId'),
             departmentId:sessionStorage.getItem('subjectId'),
             duty:duty,
             plainMoney:plainMoney,
             expertMoney:expertMoney,
             specialMoney:specialMoney
            },
            success:function(data){
               //    console.log(data);
               if(data == 1){
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("保存成功");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                       $('.smallBox').hide();
                        
                    })
               }else{
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("该科室已添加过就诊费,您可以修改");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
               }
            }
       });
    }
    if(duty == '3'){
        //副主任医生
       var plainMoney = $('.fee_table tr').eq(2).find('.normal_money').val().trim();
        var expertMoney = $('.fee_table tr').eq(2).find('.expert_money').val().trim();
         var specialMoney = $('.fee_table tr').eq(2).find('.special_money').val().trim();
         console.log(plainMoney +'-'+expertMoney+'-'+specialMoney);
        if(!plainMoney||!expertMoney||!specialMoney){
            $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("请填写完整的费用");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
            return false;
       } 
       $.ajax({
            url:baseUrl+'eht/admin/free/regFreeInsert',
            type:'post',
            data:{
              hospitalId: sessionStorage.getItem('hospitalId'),
             departmentId:sessionStorage.getItem('subjectId'),
             duty:duty,
             plainMoney:plainMoney,
             expertMoney:expertMoney,
             specialMoney:specialMoney
            },
            success:function(data){
               // alert('保存ok');
               //    console.log(data);
               if(data == 1){
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("保存成功");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
               }else{
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("该科室已添加过就诊费,您可以修改");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
               }
            }
       });
    }
    if(duty == '2'){
        //主治医生
       var plainMoney = $('.fee_table tr').eq(3).find('.normal_money').val().trim();
        if(!plainMoney){
            $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("请填写完整的费用");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
            return false;
       } 
       $.ajax({
            url:baseUrl+'eht/admin/free/regFreeInsert',
            type:'post',
            data:{
              hospitalId: sessionStorage.getItem('hospitalId'),
             departmentId:sessionStorage.getItem('subjectId'),
             duty:duty,
             plainMoney:plainMoney,
             // expertMoney:expertMoney,
             // specialMoney:specialMoney
            },
            success:function(data){
               // alert('保存ok');
               //    console.log(data);
               if(data == 1){
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("保存成功");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
               }else{
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("该科室已添加过就诊费,您可以修改");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
               }
            }
       });
    }
    if(duty == '1'){
        //医师
       var plainMoney = $('.fee_table tr').eq(4).find('.normal_money').val().trim();
        if(!plainMoney){
            $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("请填写完整的费用");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
            return false;
       } 
       $.ajax({
            url:baseUrl+'eht/admin/free/regFreeInsert',
            type:'post',
            data:{
              hospitalId: sessionStorage.getItem('hospitalId'),
             departmentId:sessionStorage.getItem('subjectId'),
             duty:duty,
             plainMoney:plainMoney,
             // expertMoney:expertMoney,
             // specialMoney:specialMoney
            },
            success:function(data){
               // alert('保存ok');
               //    console.log(data);
               if(data == 1){
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("保存成功");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
               }else{
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("该科室已添加过就诊费,您可以修改");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
               }
            }
       });
    }
    if(duty == '0'){
        //医师
       var plainMoney = $('.fee_table tr').eq(5).find('.normal_money').val().trim();
        if(!plainMoney){
            $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("请填写完整的费用");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
            return false;
       } 
       $.ajax({
             url:baseUrl+'eht/admin/free/regFreeInsert',
            type:'post',
            data:{
              hospitalId: sessionStorage.getItem('hospitalId'),
             departmentId:sessionStorage.getItem('subjectId'),
             duty:duty,
             plainMoney:plainMoney,
             // expertMoney:expertMoney,
             // specialMoney:specialMoney
            },
            success:function(data){
               // alert('保存ok');
               //    console.log(data);
               if(data == 1){
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("保存成功");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
                        
                    })
               }else{
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("该科室已添加过就诊费,您可以修改");
                    $(".btn_return").hide();
                    $(".btn_sure").click(function () {
                       $('.smallMask').hide();
                        $('.smallBox').hide();
            
                        $('.alertBox').hide();
                    })
               }
            }
       });
    }
});

//点击保存群体提交所有挂号费用;
$(".alertBox_bottom>button").click(function(){
  var tr =$(".fee_table tr");
  var list=[];
  for(var i=1;i<tr.length;i++){
    var obj={};
    obj.duty=$(tr[i]).children().first().attr("duty");
    obj.hospitalId=sessionStorage.getItem('hospitalId');
    obj.departmentId=sessionStorage.getItem('subjectId');
    if($(tr[i]).find(".normal_money").val()==0||$(tr[i]).find(".normal_money").val()==""){
      obj.plain_money=0
    }else{
      obj.plain_money=$(tr[i]).find(".normal_money").val()
    }
    if($(tr[i]).find(".expert_money").val()==0||$(tr[i]).find(".expert_money").val()==""){
      obj.expert_money=0
    }else{
      obj.expert_money=$(tr[i]).find(".expert_money").val()
    }
    if($(tr[i]).find(".special_money").val()==0||$(tr[i]).find(".special_money").val()==""){
      obj.special_money=0
    }else{
      obj.special_money=$(tr[i]).find(".special_money").val()
    }
    // obj.plain_money=$(tr[i]).find(".normal_money").val();
    // obj.expert_money=$(tr[i]).find(".expert_money").val();
    // obj.special_money=$(tr[i]).find(".special_money").val();
    list.push(obj);
  }
  for(var i=0;i<list.length;i++){
    if(list[i].plain_money==0&&list[i].expert_money==0&&list[i].special_money==0){
      return false;
    }else{
          $.ajax({
          url:baseUrl+'eht/admin/free/regFreeInsert',
          type:'post',
          data:{
            jsonObj:JSON.stringify(list)
          },
          success:function(data){
            if(data == 1){
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("保存成功");
                $(".btn_return").hide();
                $(".btn_sure").unbind("click").click(function () {
                   $('.smallMask').hide();
                    $('.smallBox').hide();
                    $('.alertMask').hide();
                    $(".alertFeeBox").hide();
                })
            }else{
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("保存失败");
                $(".btn_return").hide();
                $(".btn_sure").unbind("click").click(function () {
                   $('.smallMask').hide();
                    $('.smallBox').hide();
                    $('.alertMask').hide();
                    $(".alertFeeBox").hide();
                })
            }
          }
        })
      break;
    }
  }

});

//修改挂号费
$('.btn_changeFee').click(function(){
      var self = this;
       var duty =$(self).parent().parent().find('td').eq(0).attr('duty');
       //alert(duty);
       var plainMoney = $(self).parent().parent().find('.normal_money').val();
       var expertMoney = $(self).parent().parent().find('.expert_money').val();
       var special_money = $(self).parent().parent().find('.special_money').val();
       //拿到修改的Id
        $.ajax({
            url:baseUrl+'eht/admin/free/selectByHospitalId',
            type:'post',
            async:false,
            data:{
              hospitalId: sessionStorage.getItem('hospitalId'),
             departmentId:sessionStorage.getItem('subjectId'),
             duty:duty,
            },
            success:function(data){
                console.log(data);
                  //console.log(data);
                 // alert('get id');
                  for(var i=0;i<data.length;i++){
                     $(self).attr('changeId',data[i].id);
                  } 
            },
       });
         $.ajax({
             url:baseUrl+'eht/admin/free/updatereGistrationMoney',
            type:'post',
            data:{
             //  hospitalId: sessionStorage.getItem('hospitalId'),
             // departmentId:sessionStorage.getItem('subjectId'),
             // duty:duty,
             id:$(self).attr('changeId'),
             plainMoney:plainMoney,
             expertMoney:expertMoney,
             specialMoney:special_money
            },
            success:function(data){
                //alert('参数id');
                    if(data == 1){
                        $('.smallMask').show();
                        $('.smallBox').show();
                        $(".small_text").html("修改成功");
                        $(".btn_return").hide();
                        $(".btn_sure").unbind("click").click(function () {
                           $('.smallMask').hide();
                            $('.smallBox').hide();
                            
                        })
                   }else{
                        $('.smallMask').show();
                        $('.smallBox').show();
                        $(".small_text").html("修改失败");
                        $(".btn_return").hide();
                        $(".btn_sure").unbind("click").click(function () {
                           $('.smallMask').hide();
                            $('.smallBox').hide();
                            
                        })
                   }
            }
       });
});


// function saveFee(){
//   //  var duty = $('.duty_set option:selected').val();
//     //console.log(duty + '---' + typeof duty);
//     var plainMoney = $('.alertFeeBox .normal_money').val();
//     var expertMoney = $('.alertFeeBox .expert_money').val();
//     var specialMoney = $('.alertFeeBox .special_money').val();
//     // var moneyList = {
//     //     [{duty:'4'},{plainMoney:plainMoney,expertMoney:expertMoney,specialMoney:specialMoney}],
//     //     [{duty:'3'},{plainMoney:plainMoney,expertMoney:expertMoney,specialMoney:specialMoney}],
//     //     [{duty:'2'},{plainMoney:plainMoney}],
//     //     [{duty:'1'},{plainMoney:plainMoney}],
//     //     [{duty:'0'},{plainMoney:plainMoney}]
//     // };
    
// };


//修改排班
function modify(e,id,name,duty,type,num) {
    if($(e).siblings(".doc_state").val()=="1"){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("已提交,不能修改");
        $(".btn_return").hide();
        $(".btn_sure").unbind("click").click(function () {
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
            $(".btn_sure").unbind("click").click(function () {
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
            if (data ==[] || data.length == 0) {
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
    $(".btn_sure").unbind("click").click(function () {
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
    for(var i=a;i<a+7;i++){
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

//排班页面的医生信息页面 医生姓名模糊查询
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
                   // console.log(data);
                    if(data.length>0){
                        $('.name_suggest').show();
                        var html = '';
                        for (var i = 0; i < data.length; i++) {
                            html += '<li><span>'+data[i].doctorName+'</span><input value="'+data[i].duty+'" type="hidden"/></li>';
                        }
                        $('.name_suggest>ul').html(html);
                    }
                },
                // complete: function () {
                //     $(".name_suggest li").click(function () {
                //         alert($(this).find("span").html());
                //         $(".expert").val($(this).find("span").html());
                //         $(".doctor_title").val($(this).find("input").val())
                //         $('.name_suggest').hide();
                //     })
                // }
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
    $('.name_suggest').on('click','li',function(){
       // alert($(this).find('input').val());
        $('.expert').val($(this).find('span').html());

    });

}


$('.queryDocs').click(function(){
    $(this).attr('query','yes');
    doctor('1');
});
//http://www.51edoctor.cn/列表
//排班员权限的医生信息页面 点击查询的按钮搜索医生
function doctor(page) {
    // $('.doctor_table table>tbody tr.fee_tr').hide();
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
   // console.log(list);
    $.ajax({
        url:baseUrl+'eht/admin/baseDoctor/DoctorQueryList',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            $("#doctor_amount").empty();
            $('caption>p').text(sessionStorage.getItem('subjectName')+"医生信息");
            if (data == [] || data.length == 0) {
                if($('.queryDocs').attr('query') == 'yes'){
                    $('.smallMask').show();
                    $('.smallBox').show();
                    $(".small_text").html("未查找到医生信息");
                    $(".btn_return").hide();
                    $(".btn_sure").unbind("click").click(function () {
                        $('.smallMask').hide();
                        $('.smallBox').hide();
                    });
                }
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
                if(val.doctorName=="普通门诊"){
                    html+='<tr id="doctor_list_'+i+'" class="doctor_list"><td class="doctor_num"><input type="hidden" class="expertMoney" value="'+val.expertMoney/100+'"/><input type="hidden" class="plainMoney" value="'+val.plainMoney/100+'"/><input type="hidden" class="specialMoney" value="'+val.specialMoney/100+'"/><input class="doc_phone" type="hidden" value="'+val.doctorMobile+'"/><input class="doc_img" type="hidden" value="'+val.doctorImage+'"/><input class="doc_id" value="'+val.doctorId+'" type="hidden"/><span>'+i+'</span></td><td class="doctor_name">'+val.doctorName+'</td><td class="doctor_mal"><input type="hidden" value="'+val.sex+'"/><span>'+sex+'</span></td><td class="doctor_age"><span class="age_age">'+val.position+'</span></td><td class="doctor_mal"><input type="hidden" value="'+val.sex+'"/><span>'+sex+'</span></td><td class="doctor_skill">'+val.skilled+'</td><td class="doctor_act"><input class="Intro" value="'+val.intro+'" type="hidden" /><input class="doctorId" type="hidden" value="'+val.doctorId+'"><div class="pull-left">普通门诊排班用</div></td></tr>';
                    i++;
                }else{
                    html+='<tr id="doctor_list_'+i+'" class="doctor_list"><td class="doctor_num"><input type="hidden" class="expertMoney" value="'+val.expertMoney/100+'"/><input type="hidden" class="plainMoney" value="'+val.plainMoney/100+'"/><input type="hidden" class="specialMoney" value="'+val.specialMoney/100+'"/><input class="doc_phone" type="hidden" value="'+val.doctorMobile+'"/><input class="doc_img" type="hidden" value="'+val.doctorImage+'"/><input class="doc_id" value="'+val.doctorId+'" type="hidden"/><span>'+i+'</span></td><td class="doctor_name">'+val.doctorName+'</td><td class="doctor_mal"><input type="hidden" value="'+val.sex+'"/><span>'+sex+'</span></td><td class="subject_neme"><span>'+sessionStorage.getItem('subjectName')+'</span></td><td class="doctor_tit"><input type="hidden" value="'+val.duty+'"/><span>'+duty+'</span></td><td class="doctor_age"><span class="age_age">'+val.position+'</span></td><td class="doctor_skill">'+val.skilled+'</td><td>'+formatFee(val.plainMoney)+'</td><td>'+formatFee(val.expertMoney)+'</td><td>'+formatFee(val.specialMoney)+'</td><td class="doctor_act"><input class="Intro" value="'+val.intro+'" type="hidden" /><input class="doctorId" type="hidden" value="'+val.doctorId+'"><div class="pull-left"><img class="img_postion" src="images/mess_08.png" alt=""/><a onclick="repair(this)" href="javascript:void(0)">修改</a></div><div class="pull-left"><img class="img_postion" src="images/del_03.png" alt=""/><a class="color_ff" onclick="delDoctor(this,\''+val.doctorId+'\')" href="javascript:void(0)">删除</a></div></td></tr>';
                    i++;
                }
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

function reset_set(){
    $('.set_name').val('');
    $('.set_user').val('');
     setUp(1,$('.set_name').val(),$('.set_user').val());
}


function resetSearch(){
    $('#doctor_name').val('');
    // alert($('.doctor_title option:first').text());
    // alert($('.doctor_sex option:first').text());
    $('.doctor_title option:first').prop('selected','true');
    $('.doctor_sex option:first').prop('selected','true');
    // $('.doctor_title option:first').attr('selected','true');
    // $('.doctor_sex option:first').attr('selected','true');
    doctor('1');
};

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
  //  alert();
    $(".export_table").unbind('click').click(function () {
        $.ajax({
            url:baseUrl+'eht/admin/scheduling/CurrentSchedulingExcel',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
              //  alert("导出成功");
                console.log(data);
               window.location=data;
                // $(".modify_record").attr("href","C:\SchedulingExcl2017-08-03.xls");
                // window.location=data;
            }

        })
    })
}

function doctorTip(txt){
     $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html(txt);
    $(".btn_return").hide();
    $(".btn_sure").unbind("click").click(function () {
        $('.smallMask').hide();
        $('.smallBox').hide();
        $('.alertBox').show();
    })
};

function addDoctor(){
    var regexEmpty = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
    var doctorName=$(".doc_name").val().replace(regexEmpty,'');
    var duty=$("#duty").val();
    var sex=$("#doc_sex").val();
    var doctorImage=$(".doc_head_way").val();
    var doctorMobile=$(".doc_tell").val().replace(regexEmpty,'');
    var title = $('#position option:selected').val();
    var position=$(".doc_job").val().replace(regexEmpty,''); //职务
    var intro=$(".self_mess textarea").val().replace(regexEmpty,'');
    var skilled=$(".skill textarea").val().replace(regexEmpty,'');
    // var expertMoney=$(".expert_money").val()*100 || 0.00;
    // var specialMoney=$(".special_money").val()*100 || 0.00;
    // var plainMoney=$(".normal_money").val()*100 || 0.00;
     var expertMoney=$(".alertBox .expert_money").val().trim()*100;
    var specialMoney=$(".alertBox .special_money").val().trim()*100;
    var plainMoney=$(".alertBox .normal_money").val().trim()*100;
    var txt;
        if(doctorName==" " || doctorName ==''){
             txt = '请填写医生姓名';
            doctorTip(txt);
            return false;
        }
        // if(doctorImage==""||doctorImage==" "||!doctorImage){
        //   txt = '请上传本人头像';
        //   doctorTip(txt);
        //   return false;
        // }
        // if(duty > 2){
            //可以看专家和特需门诊的 除了职务 其他都是必填
            // if($('.img_content').html() == '' || !($('.img_content').html() )){
            //      txt = '请上传您的个人头像';  //如果没上传头像给默认头像
            //     doctorTip(txt);
            //     return false;
            // }
            // if(doctorMobile == '' || doctorMobile == ' ' || !doctorMobile){
            //     txt = '请填写您的对外联络电话';
            //     doctorTip(txt);
            //       return false;
            // }
            // 验证手机
            //  var isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|170[0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            //  if(doctorMobile == '' || doctorMobile == ' ' || !doctorMobile){
            //     $('.doc_tellTip').show();
            //     $('.doc_tellTip').html('手机号不能为空');
            //          txt = '请填写您的对外联络电话';
            //     doctorTip(txt);
            //      $('.doc_tellTip').addClass('color_fe'); 
            //       return false; 
            // }else if(doctorMobile){
            //       if(!isMob.test(doctorMobile)){
            //          $('.doc_tellTip').show();
            //          $('.doc_tellTip').html('格式有误');
            //          txt = '请正确填写对外联络电话';
            //         doctorTip(txt);
            //         $('.doc_tellTip').addClass('color_fe')
            //          return false;
            //         }
            // }  
            if(duty > 2){
                if(!plainMoney||!expertMoney||!specialMoney){
                        txt = '请填写完整诊疗费或在挂号费设置里添加费用';
                     doctorTip(txt);
                   return false;
                }
            }else if(duty <= 2){
                if(!plainMoney){
                        txt = '请填写完整诊疗费或在挂号费设置里添加费用';
                     doctorTip(txt);
                   return false;
                }
            }

               //验证个人简介或擅长领域
            if(intro =='' || intro==' '||!intro || skilled==''||skilled==' '||!skilled){
                txt = '请填写您的个人简介或擅长领域';
                doctorTip(txt);
                   return false;
            }
             if(intro&&skilled&&(intro.length >= 200||skilled.length >= 200)){
                txt = '个人简介或擅长领域字数不超过200字';
                doctorTip(txt);
                   return false;
            }
        // }
        var list=[{
            subjectId:sessionStorage.getItem('subjectId'),
            hospitalId:sessionStorage.getItem('hospitalId'),
            doctorName:doctorName,
            //doctorImage:doctorImage?doctorImage:"",
            doctorImage:doctorImage,
            doctorMobile:doctorMobile,
            duty:duty,
            aptitude:title,
            sex:sex,
            position:position,
            intro:intro,
            skilled:skilled,
            expertMoney:expertMoney,
            specialMoney:specialMoney,
            plainMoney:plainMoney

        }];
        $.ajax({
           url:baseUrl+'eht/admin/baseDoctor/DoctorInsert',
             // url:'http://192.168.1.92:8333/eht/admin/baseDoctor/DoctorInsert',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("添加成功");
                $(".btn_return").hide();
                $(".btn_sure").unbind("click").click(function () {
                   // alert('后台数据增加了一个');
                    window.location.reload();
                })
            }
        })
    
}

//添加医生的验证
//验证手机
function test_mob(){
    // var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    var isMob=/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
     if(!$('.doc_tell').val() || $('.doc_tell').val()=='' || $('.doc_tell').val()==' '){
        $('.doc_tellTip').show();
        $('.doc_tellTip').html('手机号不能为空');
         $('.doc_tellTip').addClass('color_fe'); 
          return false; 
    }
     if($('.doc_tell').val() &&$('.doc_tell').val().length != 11){
            $('.doc_tellTip').show();
             $('.doc_tellTip').html('手机号长度不符');
             $('.doc_tellTip').addClass('color_fe');
             return false;
     }
    // if($('.doc_tell').val()){
    //       if(!isMob.test($('.doc_tell').val())){
    //          // $('.doc_tell').val('格式有误');
    //          // $('.doc_tell').addClass('color_fe');
    //          $('.doc_tellTip').show();
    //          $('.doc_tellTip').html('格式有误');
    //     // $('.doc_tell').addClass('color_fe'); 
    //      $('.doc_tellTip').addClass('color_fe')
    //          return false;
    //         }
    // }
    // else if( $('.set_tel').val()&& $('.set_tel').val().length <11){
    //    if(!isPhone.test($('.set_tel').val())){
    //         $('.set_tel').val('');
    //          $('.tel_tip').html('输入格式有误，请重新输入');
    //          $('.tel_tip').addClass('color_fe');
    //            return false;
    //         }
    // }
   //  $('.doc_tell').html('对外联络电话');
   $('.doc_tellTip').hide();
};

// //检测擅长领域
// function limit_skill(){
//     console.log($('.skill textarea').val().length); //两行字是86个 
//     var skill_length = $('.skill textarea').val().length;
//     if(skill_length>86){
//        var html = $('.skill textarea').val().slice(0,87) +'...';
//        $('.skill textarea').val(html);
//     }
// };
// //检测个人简介limit_intro
// function limit_intro(){
//     console.log($('.self_mess textarea').val().length); //两行字是86个 
//     var intro_length = $('.self_mess textarea').val().length;
//     if(intro_length>86){
//        var html = $('.self_mess textarea').val().slice(0,87) +'...';
//        $('.self_mess textarea').val(html);
//     }
// };
//检测擅长领域
function limit_skill(){
    console.log($('.skill textarea').val().length); //两行字是86个 
    var skill_length = $('.skill textarea').val().length;
    if(skill_length>86){
       var html = $('.skill textarea').val().slice(0,87) +'...';
       $('.skill textarea').val(html);
    }
};
//检测个人简介limit_intro
function limit_intro(){
    console.log($('.self_mess textarea').val().length); //两行字是86个 
    var intro_length = $('.self_mess textarea').val().length;
    if(intro_length>86){
       var html = $('.self_mess textarea').val().slice(0,87) +'...';
       $('.self_mess textarea').val(html);
    }
};
//检测擅长领域
function limit_skill(){
    var skill_length = $('.skill textarea').val().length;
    if(skill_length>200){
       var html = $('.skill textarea').val().slice(0,201) +'...';
       $('.skill textarea').val(html);
    }
};
//检测个人简介limit_intro
function limit_intro(){
    var intro_length = $('.self_mess textarea').val().length;
    if(intro_length>200){
       var html = $('.self_mess textarea').val().slice(0,201) +'...';
       $('.self_mess textarea').val(html);
    }
};

//排班的医生信息部分  修改
function repair(e) {
    $('.alertMask').show();
    $('.alertBox').show();
    $("#doctor_btn").hide();
    $("#doctor_remark").show();
    if($(".alert-img .img_content .doc_head")){
      $('.imgDiv').hide();
    }else{
      $('.imgDiv').show();
    }
    $('.doc_tellTip').hide();
    var list= $(e).parents(".doctor_list");
    $(".list_id").val(list.attr("id"));
    $(".doc_tell").val(list.find(".doc_phone").val());
    if(list.find(".doc_img").val()){
          var html='<input type="hidden" class="doc_head_way" value="'+list.find(".doc_img").val()+'"><img class="doc_head" src="/E2306'+list.find(".doc_img").val()+'" alt=""/><img onclick="delHead(this);" class="doc_head_del" src="images/shanchu.png" alt=""/>';
        $(".img_content").html(html);
    }else{
        $(".img_content").html("");
    }
    $(".money_doctor .normal_money").val(list.children().eq(7).html());
    $(".money_doctor .expert_money").val(list.children().eq(8).html());
    $(".money_doctor .special_money").val(list.children().eq(9).html());
    $(".doctorId").val(list.find(".doc_id").val());
    $(".doc_name").val(list.find(".doctor_name").html());
    $("#duty").val(list.find(".doctor_tit input").val());
    $("#doc_sex ").val(list.find(".doctor_mal input").val());
    $(".doc_job").val(list.find(".age_age").html());
    $(".self_mess textarea").val(list.find(".Intro").val());
    $(".skill textarea").val(list.find(".doctor_skill").html());
    duty_default();
    duty_change();
}
//修改的确认
//
function repairDoctor() {
    var regexEmpty = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
    var doctorName=$(".doc_name").val().replace(regexEmpty,'');
    var duty=$("#duty").val();
    var sex=$("#doc_sex").val();
    var position=$(".doc_job").val().replace(regexEmpty,'');
    var intro=$(".self_mess textarea").val().replace(regexEmpty,'').replace('<','').replace('>','');
    var skilled=$(".skill textarea").val().replace(regexEmpty,'').replace('<','').replace('>','');
    var doctorID=$(".doctorId").val();
    // var expertMoney=parseInt($(".expert_money").val())*100;
    // var specialMoney=parseInt($(".special_money").val())*100;
    // var plainMoney=parseInt($(".normal_money").val())*100;
    var expertMoney=parseInt($(".expert_money").val()*100) || 0.00;
    var specialMoney=parseInt($(".special_money").val()*100) || 0.00;
    var plainMoney=parseInt($(".normal_money").val()*100) || 0.00;
  //  console.log(doctorName,duty,sex,intro,skilled,doctorID,expertMoney,specialMoney,plainMoney);
    var doctorMobile = $(".doc_tell").val();
    // if($(".doc_head").length==0){
    //     txt = '请添加头像';
    //     doctorTip(txt);
    //     return false;
    // }
    // var isMob=/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|170[0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    //  if(doctorMobile == '' || doctorMobile == ' ' || !doctorMobile){
    //     $('.doc_tellTip').show();
    //     $('.doc_tellTip').html('手机号不能为空');
    //          txt = '请填写您的对外联络电话';
    //     doctorTip(txt);
    //      $('.doc_tellTip').addClass('color_fe'); 
    //       return false; 
    // }else if(doctorMobile){
    //       if(!isMob.test(doctorMobile)){
    //          $('.doc_tellTip').show();
    //          $('.doc_tellTip').html('格式有误');
    //          txt = '请正确填写对外联络电话';
    //         doctorTip(txt);
    //         $('.doc_tellTip').addClass('color_fe')
    //          return false;
    //         }
    // }   
      if($(".skill>textarea").val()==""||$(".skill>textarea").val()==" "||$(".self_mess>textarea").val()==""||$(".self_mess>textarea").val()==" "){
          txt = '请填写您的个人简介或擅长领域';
          doctorTip(txt);
          return false;
       }
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
        doctorID:doctorID,
        expertMoney:expertMoney,
        specialMoney:specialMoney,
        plainMoney:plainMoney
    }];
  //  console.log(list);
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
                $(".btn_sure").unbind("click").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                    $('.alertMask').hide();
                    $('.alertBox').hide();
                })
                var id=$(".list_id").val();
//            修改信息放页面上
                $("#"+id).find('.doctor_name').html($(".doc_name").val());

                $("#"+id).children().eq(8).html(formatFee(expertMoney));
                $("#"+id).children().eq(7).html(formatFee(plainMoney));
                $("#"+id).children().eq(9).html(formatFee(specialMoney));

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
            $(".btn_sure").unbind("click").click(function () {
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
function clearNoNum(obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
       //alert(obj.value)
        obj.value= parseFloat(obj.value);
    }
}

//删除
function delDoctor(e,id) {
    console.log(id);
//    debugger
    var i=$(e).parents(".doctor_list").find(".doctor_num span").html();
    i=parseInt(i);
    // alert(i)
    $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html("删除医生号源也会被删除,确认删除？");
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

//医生信息上传医生头像
function doctorImg(){
    if($('.img_content .doc_head').length==1){
        //如果点击的是修改 按钮是修改
        // if($('#doctor_btn').css('display') == 'none'){
        //     console.log('点的是修改医生');
        //         $('.smallMask').show();
        //     $('.smallBox').show();
        //     // $(".small_text").html("只能上传1张图片");
        //     // $(".small_text").html("只能上传1张图片");
        //     $(".btn_return").hide();
        //     $(".btn_sure").click(function () {
        //         $('.smallMask').hide();
        //         $('.smallBox').hide();
        //     })
        //     return false; 
        // }
        // $('.smallMask').show();
        //     $('.smallBox').show();
        //     $(".small_text").html("只能上传1张图片");
        //     $(".btn_return").hide();
        //     $(".btn_sure").click(function () {
        //         $('.smallMask').hide();
        //         $('.smallBox').hide();
        //     })
        //     return false; 
    }
    var obj=document.getElementsByClassName('doctor_img_input')[0];
    //上传了文件
    if (obj.value) {
        console.log(obj.value);
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
        if (size > 3072000) {
            // $('.cateWarning').html("<font style='color:red;font-weight:border;font-size:12px;'>请上传小于2m的图片</font>");
            //清空上传文件框
            $(obj)[0].outerHTML = $(obj)[0].outerHTML;
//            hospitalFlag = false;
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("上传图片不能超过3M");
            $(".btn_return").hide();
            $(".btn_sure").unbind("click").click(function () {
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
    var FileController = baseUrl+"eht/admin/Information/upload?uploadType=doctorImg"; // FormData 对象
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
        $(".btn_sure").unbind("click").hide();
        var json = xhr.responseText;
        var obj = $.parseJSON(json);
        var abox='<input type="hidden" class="doc_head_way" value="'+obj.imagePath+'"><img class="doc_head" src="/E2306'+obj.imagePath+'" alt=""/><img onclick="delHead(this);" class="doc_head_del" src="images/shanchu.png" alt=""/>';
        $('.img_content').html(abox);
        $('.imgDiv').hide();
        $('.smallMask').hide();
        $('.smallBox').hide();
        $(".btn_sure").show();
    };
    xhr.send(form);
}




function delHead(e) {
    $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html("是否确认删除");
    $(".btn_return").show();
    $(".btn_sure").unbind("click").click(function () {
         $('.imgDiv').show();
        $(e).parent().html("");
        $('.smallMask').hide();
        $('.smallBox').hide();
    })
}






//统计信息
function countList(startDate,endDate) {
    startDate=startDate+" "+"00:00:00";
    endDate=endDate+" "+"23:59:59";
    $.ajax({
        url:baseUrl+'eht/admin/HospitalCount/countBySub',
        type:'get',
        data:{
            startDate:startDate,
            endDate:endDate
//           hospitalId:"27e48616c057fec700f2818dd0201992"
        },
        async:false,
        success: function (data) {
          console.log(data)

            $("#count_start").val(startDate.substring(0,10));
            $("#count_end").val(endDate.substring(0,10));
            console.log(data);

// 加载导出的按钮
        var set='<img src="images/mess_01.png" alt=""><span onclick="setOut(\''+startDate+'\',\''+endDate+'\')">导出表格</span>'

            $(".count_tit>div").html(set);


//            这里是假数据
            var html='';
                for(var j=0;j<15;j++){
                    html+='<tr><td class=\"table_depart bgcolor_f2\">医药</td><td class=\"register_num\">365</td><td class=\"visit_num\">358</td><td class=\"change_num\">368</td><td class=\"back_num\">357</td><td class=\"count_money color_fe\">2586.20</td><td class=\"operation\"><a href="detail.html">查看</a></td></tr>';
//                    num1+=data[i].ORDERNUM;
//                    num2+=data[i].VISITNUM;
//                    num3+=data[i].CHANGENUM;
//                    num4+=data[i].RETURNNUM;
//                    num5+=data[i].MONEY;
                }
            var total='<tr><td class="table_depart">总计</td><td class="register_num">10000</td><td class="visit_num">3698</td><td class="change_num">3697</td><td class="back_num">1597</td><td class="count_money">368569.00</td><td class="operation"></td></tr>';
            $(".count_total").html(total);
            $(".count_main").html(html);

        return;

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
            for(var i=0;i<data.length;i++){
                for(var j=0;j<10;j++){
                    html+='<tr><td class=\"table_depart bgcolor_f2\">'+data[i].SUBJECTNAME+'</td><td class=\"register_num\">'+data[i].ORDERNUM+'</td><td class=\"visit_num\">'+data[i].VISITNUM+'</td><td class=\"change_num\">'+data[i].CHANGENUM+'</td><td class=\"back_num\">'+data[i].RETURNNUM+'</td><td class=\"count_money color_fe\">'+data[i].MONEY.toFixed(2)+'</td><td class=\"operation\"><a href=\"detail.html?name='+data[i].SUBJECTNAME+'&start='+startDate+'&end='+endDate+'&id='+data[i].DEPARTMENT_ID+'\">查看</a></td></tr>';
                    num1+=data[i].ORDERNUM;
                    num2+=data[i].VISITNUM;
                    num3+=data[i].CHANGENUM;
                    num4+=data[i].RETURNNUM;
                    num5+=data[i].MONEY;
                }
            }
            var total='<tr><td style="width: 135px">总计</td><td style="width: 125px">'+num1+'</td><td style="width: 125px">'+num2+'</td><td style="width: 105px">'+num3+'</td><td style="width: 105px">'+num4+'</td><td style="width: 125px">'+num5.toFixed(2)+'</td><td style="width: 105px"></td></tr>';
            $(".count_total").html(total);
            $(".count_main").html(html);
        }
    })
    $.ajax({
        url:baseUrl+'eht/admin/HospitalCount/countByAll',
        type:'get',
        data:{
            startDate:startDate,
            endDate:endDate
//          hospitalId:"27e48616c057fec700f2818dd0201992"
        },
        async:false,
        success: function (data) {
            console.log(data);
            var  html='<td>'+(data[0].am?data[0].am:0)+'</td><td>'+(data[0].male?data[0].male:0)+'</td><td>'+(data[0].APP_TYPE_0?data[0].APP_TYPE_0:0)+'</td><td>'+(data[0].TAKE_TYPE_0?data[0].TAKE_TYPE_0:0)+'</td><td>'+(data[0].RETURNNUM?data[0].RETURNNUM:0)+'</td>';
            var  html2='<td>'+(data[0].pm?data[0].pm:0)+'</td><td>'+(data[0].female?data[0].female:0)+'</td><td>'+(data[0].APP_TYPE_1?data[0].APP_TYPE_1:0)+'</td><td>'+(data[0].TAKE_TYPE_1?data[0].TAKE_TYPE_1:0)+'</td><td>'+(data[0].CHANGENUM?data[0].CHANGENUM:0)+'</td>';
            $(".info_tr_1").html(html);
            $(".info_tr_2").html(html2);
        }
    })
}

//按时间搜索
$("#count .search_btn").bind("click").click(function () {
    var start=$("#count_start").val();
    var end=$("#count_end").val();
    console.log(start,end);
    if(start==""||end==""||start==" "||end==" "){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("请选择时间");
        $(".btn_return").hide();
        $(".btn_sure").unbind("click").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
        })
    }else{
        countList(start,end);
    }
})

//筛选方式
function selChange(){
    var nowYear=new Date().getFullYear();
    picNum(nowYear,1);
   $("#choice").change(function () {
       var val=$("#choice option:selected").val();
       var data=$("#year option:selected").val();
       picNum(data,val);
    })
    $("#year").change(function () {
        var val=$("#choice option:selected").val();
        var data=$("#year option:selected").val();
        picNum(data,val);
    })
}
//获取柱状图数据
// function picNum(year,code) {
//     console.log(year,code);
//     $.ajax({
//         url:baseUrl+'eht/admin/HospitalCount/countByCirAll',
//         type:"post",
//         data:{
// //            hospitalId:"27e48616c057fec700f2818dd0201992",
//             year:year,
//             code:code
//         },
//         success: function (data) {
//             console.log(data);

//            完成后需要更改的

//            var female=data[0].down;
//            var male=data[0].up;
//            var num1=[];
//            var num2=[];
////            if(female.length<male.length){
////                var t=female.length
////            }else{
////                var t=male.length
////            }
////            for(var i=0;i<t;i++){
////                num1.push(female[i].ORDERNUM);
////                num2.push(male[i].ORDERNUM);
////            }


//            假数据
//             var num1=[200,300,524,658,547,687,15,369,258,687,148,369];
//             var num2=[300,20,24,68,147,487,185,369,488,487,638,669];
//             console.log(num1,num2);
//             echart(num1,num2,code);
//         }
//     })
// }
//柱状图
// function echart(Number1,Number2,mode) {
//     var appList=Number1;
//     var winList=Number2;
//     var name1="上午";
//     var name2="下午";
//     console.log(typeof(mode));
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
//              name1="男性";
//              name2="女性";
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
//     console.log(appList,winList);
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
//    console.log(url,name,subjectId,start,end);
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
            // console.log(data);
            //没有挂号的情况
             if(data == [] || data.length ==0){
             //   alert('无数据');
                var text=name+'挂号饼状图('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
                var txt=name+'挂号数据情况('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
                $("#detail_left_chart>p").html(text);
                $(".detail_left>p").html(txt);
                var html1='<td class="dateAM">0</td><td class="man">0</td><td class="appType">0</td><td class="selfTake">0</td><td>0</td>';
                var html2='<td class="datePM">0</td><td class="woman">0</td><td class="windowType">0</td><td class="windowTake">0</td><td>0</td>';
                $(".tr_top").html(html1);
                $(".tr_down").html(html2);
                return false;
            }
            //有数据返回
                var html='';
                var html1 = '';
                 var html2= '';
                var text=name+'挂号数据情况(天)';
                var text_data=name+'挂号饼状图('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
                var txt=name+'挂号数据情况('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
                $("#detail_head>p").html(text);
                 $("#detail_left_chart>p").html(text_data);
                $(".detail_left>p").html(txt);
                for(var i=0;i<data.length;i++){
                    html+='<tr><td class="bgcolor_f2 detail_data">'+data[i].statisticalDate+'</td><td class="detail_app"><span class="num_count">'+data[i].appType+'</span><span class="money_count">'+formatFee(data[i].appTypeMoney)+'</span><span class="num_count">'+data[i].appchangeNum+'</span><span class="money_count">'+formatFee(data[i].appchangeNumMoney/100)+'</span><span class="num_count">'+data[i].appreturnNum+'</span><span class="money_count">'+formatFee(data[i].appreturnNumMoney)+'</span><span class="color_fe money_count">'+formatFee(data[i].appmoney)+'</span></td><td class="detail_app"><span class="num_count">'+data[i].windowType+'</span><span class="money_count">'+formatFee(data[i].windowTypeMoney)+'</span><span class="num_count">'+data[i].windowchangeNum+'</span><span class="money_count">'+formatFee(data[i].windowchangeNumMoney)+'</span><span class="num_count">'+data[i].windowreturnNum+'</span><span class="money_count">'+formatFee(data[i].windowreturnNumMoney)+'</span><span class="color_fe money_count">'+formatFee(data[i].windowmoney)+'</span></td><td class="color_fe detail_money">'+formatFee(data[i].allmoney)+'</td></tr>';                  
                 }
                  html1 += '<td class="dateAM">'+data[0].dateAM+'</td><td class="man">'+data[0].man+'</td><td class="appType">'+data[0].appType+'</td><td class="selfTake">'+data[0].selfTake+'</td><td>'+data[0].returnNum+'</td>';
                  html2 += '<td class="datePM">'+data[0].datePM+'</td><td class="woman">'+data[0].woman+'</td><td class="windowType">'+data[0].windowType+'</td><td class="windowTake">'+data[0].windowTake+'</td><td>'+data[0].changeNum+'</td>';
                 // console.log(html)
               $("#detail_body").html(html);
                 $(".tr_top").html(html1);
                 $(".tr_down").html(html2);
                resize();             
         }         
    })
   
    // $.ajax({
    //     url:'http://www.51edoctor.cn/eht/admin/HospitalCount/countByDayAll',
    //     type:'get',
    //     data:{
    //         hospitalId:sessionStorage.getItem('hospitalId'),
    //         subjectId:subjectId,
    //         startDate:start,
    //         endDate:end
    //     },
    //     async:false,
    //     success: function (data) {
    //         console.log(data[0]==null);
    //         if(data[0]==null){
    //             var text=name+'挂号饼状图('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
    //             var txt=name+'挂号数据情况('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
    //             $("#detail_left_chart>p").html(text);
    //             $(".detail_left>p").html(txt);
    //             var  html1='<td class="dateAM">0</td><td class="man">0</td><td class="appType">0</td><td class="selfTake">0</td><td>0</td>';
    //             var  html2='<td class="datePM">0</td><td class="woman">0</td><td class="windowType">0</td><td class="windowTake">0</td><td>0</td>';

    //             $(".tr_top").html(html1);
    //             $(".tr_down").html(html2);
    //             return
    //         }
    //         var text_data=name+'挂号饼状图('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
    //         var txt=name+'挂号数据情况('+(start.substring(0,10))+'&nbsp;--&nbsp;'+(end.substring(0,10))+')';
    //         $("#detail_left_chart>p").html(text_data);
    //         $(".detail_left>p").html(txt);
    //         var  html1='<td class="dateAM">'+data[0].dateAM+'</td><td class="man">'+data[0].man+'</td><td class="appType">'+data[0].appType+'</td><td class="selfTake">'+data[0].selfTake+'</td><td>'+data[0].returnNum+'</td>';
    //         var  html2='<td class="datePM">'+data[0].datePM+'</td><td class="woman">'+data[0].woman+'</td><td class="windowType">'+data[0].windowType+'</td><td class="windowTake">'+data[0].windowTake+'</td><td>'+data[0].changeNum+'</td>';

    //         $(".tr_top").html(html1);
    //         $(".tr_down").html(html2);

    //     }
    // })
}


function resize() {
    var _width=$('#detail').width();
    // console.log(_width)
    if(_width>1650){
        $('.detail_data').width(_width*0.1);
        $('.detail_app').width(_width*0.12);
        $('.detail_window').width(_width*0.12);
        $('.detail_self').width(_width*0.1);
        $('.detail_get').width(_width*0.1);
        $('.detail_back').width(_width*0.1);
        $('.detail_change').width(_width*0.1);
        $(".detail_money").width(_width*0.1);

        $("#detail_head").width($("#detail_main").width());
        $("#detail_bottom").width($("#detail_main").width())
        $(".detail_left").width("40%");
        $("#detail_left_chart").width($(".detail_left").width()).css("padding-left","0");

        $("#detail_left_chart").addClass("pull-right").removeClass("pull-left");
//                    $("#count_right #echarts>div").width(_width*0.4);
//                    $("#count_right #echarts>div>canvas").width(_width*0.4);
    }
    if(_width<1650){
        $('.detail_data').width(_width*0.08);
        $('.detail_app').width(_width*0.1);
        $('.detail_window').width(_width*0.1);
        $('.detail_self').width(_width*0.1);
        $('.detail_get').width(_width*0.1);
        $('.detail_back').width(_width*0.1);
        $('.detail_change').width(_width*0.1);
        $(".detail_money").width(_width*0.11);
        $("#detail_head").width($("#detail_main").width());

        $(".detail_left").width($("#detail_main").width());
        $("#detail_left_chart").width($(".detail_left").width());
        $("#detail_left_chart").removeClass("pull-right").addClass("pull-left");
        $(".detail_bottom").width($(".detail_left").width());
//                    $("#detail_left_chart").width(_width);
//                    $("#detail_left_chart canvas").width("100%");
//                    $("#count_right #echarts>div").width(_width);
//                    $("#count_right #echarts>div>canvas").width(_width);
    }

    if(_width<1240){
        $('.detail_data').width(_width*0.08);
        $('.detail_app').width(_width*0.1);
        $('.detail_window').width(_width*0.1);
        $('.detail_self').width(_width*0.08);
        $('.detail_get').width(_width*0.08);
        $('.detail_back').width(_width*0.08);
        $('.detail_change').width(_width*0.08);
        $(".detail_money").width(_width*0.1);
        $("#detail_head").width($("#detail_main").width());

        $(".detail_left").width($("#detail_main").width());
        $("#detail_left_chart").width($(".detail_left").width());
        $("#detail_left_chart").removeClass("pull-right").addClass("pull-left");
        $(".detail_bottom").width($(".detail_left").width());
//                    $("#detail_left_chart").width(_width);
//                    $("#detail_left_chart canvas").width("100%");
//                    $("#count_right #echarts>div").width(_width);
//                    $("#count_right #echarts>div>canvas").width(_width);
    }

}










//饼状图
// function piePic(obj) {
//     var myChart = echarts.init(document.getElementById('pie_table'));
//     var data1=['上午','下午'];
//     var name1="上/下午";
//     var data2=[{value:parseInt($(".dateAM").html()), name:'上午'},{value:parseInt($(".datePM").html()), name:'下午'}];
//     switch(parseInt(obj)){
//         case 1:
//             data1=['上午','下午'];
//             name1="上/下午";
//             data2=[{value:parseInt($(".dateAM").html()), name:'上午'},{value:parseInt($(".datePM").html()), name:'下午'}];
//             break;
//         case 2:
//              data1=['男性','女性'];
//              name1="性别";
//              data2=[{value:parseInt($(".man").html()), name:'男性'},{value:parseInt($(".woman").html()), name:'女性'}];
//             break;
//         case 3:
//             data1=['APP挂号','窗口挂号'];
//             name1="挂号";
//             data2=[{value:parseInt($(".appType").html()), name:'APP挂号'},{value:parseInt($(".windowType").html()), name:'窗口挂号'}];
//             break;
//         case 4:
//             data1=['自助取号','窗口取号'];
//             name1="取号方式";
//             data2=[{value:parseInt($(".selfTake").html()), name:'自助取号'},{value:parseInt($(".windowTake").html()), name:'窗口取号'}];
//             break;
//     }
//     console.log(data2);
//   var option = {
//         tooltip: {
//             trigger: 'item',
//             formatter: "{a} <br/>{b}: {c} ({d}%)"
//         },
//         legend: {
//             orient: 'vertical',
//             x: 'left',
//             data:data1
//         },
//         color:["#06a0f8","#fe5252"],
//         series: [
//             {
//                 name:name1,
//                 type:'pie',
//                 radius: ['40%', '80%'],
//                 avoidLabelOverlap: false,
//                 label: {
//                     normal: {
//                         show: false,
//                         position: 'center'
//                     },
//                     emphasis: {
//                         show: true,
//                         textStyle: {
//                             fontSize: '16',
//                             fontWeight: 'bold'
//                         }
//                     }
//                 },
//                 labelLine: {
//                     normal: {
//                         show: false
//                     }
//                 },
//                 data:data2
//             }
//         ]
//     };
//     myChart.clear();
//     myChart.setOption(option);
// }



//筛选
// function pieChange(){
//     piePic(1);
//     $("#pie_method").change(function () {
//         var val=$("#pie_method option:selected").val();
//         console.log(val);
//         piePic(val);
//     })
// }
//用户信息界面获取用户管理信息
function setUp(page,name,username){
    var list=[{}];
    list[0].CurrentPage=page;
    list[0].totalPages="10";
    list[0].hospitalId=sessionStorage.getItem('hospitalId');
    name==""||name==" "||name=="undefined"||name==undefined?list[0].name="":list[0].name=name;
    list[0].roleIds="";
    username==""||username==" "||username=="undefined"||username==undefined?list[0].username="":list[0].username=username;
    // console.log(JSON.stringify(list));
    $.ajax({
        url:'http://www.51edoctor.cn/eht/admin/hospitalUser/QueryList',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            // console.log(data);
            if(data.length<1){
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("未查找到相应信息");
                $(".btn_return").hide();
                $(".btn_sure").unbind("click").click(function () {
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
//                data[i].roleIds=="11"?orderId="排班员":( data[i].roleIds=="13")?orderId="统计员":orderId="挂号员";
//                if( data[i].roleIds=="11"){
//                    orderId="排班员";
//                }else if(data[i].roleIds=="12"){
//                    orderId="挂号员";
//                }else if(data[i].roleIds=="13"){
//                    orderId="统计员";
//                }else if(data[i].roleIds=="14"){
//                    orderId="自助取号";
//                }
//                if(i==0){
//                    html='<tr><td>'+(i+1)+'</td><td><input type="hidden" value="'+data[0].id+'"/><span class="username">'+data[0].username+'</span></td><td>'+data[0].name+'</td><td>'+orderId+'</td><td></td></tr>';
//                }else{
                  if(data[i].subName==''){
                    html+='<tr><td>'+(i+1)+'</td><td><input class="departmentId" type="hidden" value="'+data[i].departmentId+'"/><input class="password" type="hidden" value="'+data[i].password+'"/><input class="mobileno" type="hidden" value="'+data[i].mobileno+'"/><input class="id" type="hidden" value="'+data[i].id+'"/><span class="username">'+data[i].username+'</span></td><td class="uname">'+data[i].name+'</td><td><input class="roleIds" type="hidden" value="'+data[i].roleIds+'"/>'+data[i].roleIds+'</td><td><button  class="set_watch set_dele bgcolor_2f">查看</button><button class="set_check set_remove set_dele delete">编辑</button></td></tr>';
                  }else{
                    html+='<tr><td>'+(i+1)+'</td><td><input class="departmentId" type="hidden" value="'+data[i].departmentId+'"/><input class="password" type="hidden" value="'+data[i].password+'"/><input class="mobileno" type="hidden" value="'+data[i].mobileno+'"/><input class="id" type="hidden" value="'+data[i].id+'"/><span class="username">'+data[i].username+'</span></td><td class="uname">'+data[i].name+'</td><td><input class="roleIds" type="hidden" value="'+data[i].roleIds+'"/>'+data[i].roleIds+' ('+data[i].subName+')</td><td><button  class="set_watch set_dele bgcolor_2f">查看</button><button class="set_check set_remove set_dele delete">编辑</button></td></tr>';
                  }
             }
            $(".set_content").html(html);
              // var roleIds = $(".set_content").find(".roleIds");
             // for(var i = 0;i<roleIds.length;i++){
                // if($(roleIds[i]).val() == '医院管理员'){
                   // alert('医院管理员');
                    // $(".set_content").find(".roleIds").eq(i).parent().next().find('.set_remove').hide();
                // }
                
             // }
             //只能查看信息
              
              $(".set_watch").click(function () {
                $('.paperlength').attr('disabled',true)
                $('.alertMask').show();
                $('.alertBox').show();
                $("#set_btn").hide();
                $(".set_new").hide();
                $("#set_check").hide();
                $(".set_id").val($(this).parents("tr").find(".id").val());
                $("#psd_error").removeClass("color_fe").text("密码必须由6-21大小写字母和数字组成");
                $(".set_username").val($(this).parents("tr").find(".username").html());
                $(".set_username").attr("disabled","disabled");
                $(".set_username").next().html("");
                // $(".set_psd").attr("placeholder","输入需要修改的密码");
                $(".setPsd").hide();
                $('.setPsdagain').hide();
                // $("#psd_error_again").html("再次输入密码");
                // $("#psd_error_again").removeClass("color_fe");
                $(".set_Uname").val($(this).parents("tr").find(".uname").html());
                $(".set_Uname").attr("disabled","disabled");
                $(".name_tip").html("只能输入中文");
                $(".name_tip").removeClass("color_fe");
                $(".set_tel").val($(this).parents("tr").find(".mobileno").val());
                $(".set_tel").attr("disabled","disabled");
                $(".tel_tip").html("输入手机号或者座机号码");
                $(".tel_tip").removeClass("color_fe");
                $(".set_power").val($(this).parents("tr").find(".roleIds").val());
                $(".set_power").attr("disabled","disabled");
                $(".set_title").attr("disabled","disabled");

                if($(this).parents("tr").find(".roleIds").val()=="医院挂号员"||$(this).parents("tr").find(".roleIds").val()=="医院排班员"||$(this).parents("tr").find(".roleIds").val()=="医院统计员"||$(this).parents("tr").find(".roleIds").val()=="自助终端"||$(this).parents("tr").find(".roleIds").val()=="门办审核员"||$(this).parents("tr").find(".roleIds").val()=="医院财务员"){
                    $(".setBox_title>lable").hide();
                    $(".setBox_title select").hide();
                    $(".setBox_title").css('height',"0px")
                 }
                else{
                    $(".setBox_title>lable").show();
                    $(".setBox_title select").show();
                    $(".setBox_title").css('height',"35px")
                    $(".set_title").val($(this).parents("tr").find(".departmentId").val());
                    $(".set_power").val("科室排班员")
                }
                if($(this).parents("tr").find(".roleIds").val()=="医院管理员"){
                    $(".setBox_title").hide();
                    $(".setBox_power").hide();
                } else {
                    $(".setBox_title").show();
                    $(".setBox_power").show();
                }
            });
          
            //对信息进行操作
            $(".set_check").click(function () {
              $('.paperlength').attr('disabled',false)
                $('.set_psd').unbind("blur")
                $('.alertMask').show();
                $('.alertBox').show();
                $("#set_btn").hide();
                $("#set_check").show();
                $(".set_new").show();
                $(".set_id").val($(this).parents("tr").find(".id").val());
                $("#psd_error").removeClass("color_fe").text("密码必须由6-21大小写字母和数字组成");
                $(".set_username").val($(this).parents("tr").find(".username").html());
                $(".set_username").attr("disabled","disabled");
                $(".set_username").next().html("");
                $(".setPsd").show();
                $('.setPsdagain').show();
                $(".set_psd").val("******");
                $(".set_psd").attr("disabled", false);
                $(".sePsd_again").val("******");
                $(".sePsd_again").attr("disabled", false);
                $(".set_Uname").val($(this).parents("tr").find(".uname").html());
                $(".set_Uname").attr("disabled",false);
                $("#psd_error_again").html("再次输入密码");
                $("#psd_error_again").removeClass("color_fe");
                $('.name_tip').html('只能输入中文');
                $('.name_tip').removeClass('color_fe'); 
                $(".set_tel").val($(this).parents("tr").find(".mobileno").val());
                $(".set_tel").attr("disabled",false);

                $(".set_power").val($(this).parents("tr").find(".roleIds").val());
                $(".set_power").attr("disabled",false);
                $(".set_title").attr("disabled",false);
                if($(".set_tel").val()!==""){
                  $(".tel_tip").text("输入手机号或者座机号码")
                  $(".tel_tip").removeClass('color_fe')
                }
                if($(this).parents("tr").find(".roleIds").val()=="医院挂号员"||$(this).parents("tr").find(".roleIds").val()=="医院排班员"||$(this).parents("tr").find(".roleIds").val()=="医院统计员"||$(this).parents("tr").find(".roleIds").val()=="自助终端"||$(this).parents("tr").find(".roleIds").val()=="门办审核员"||$(this).parents("tr").find(".roleIds").val()=="医院财务员"){
                    $(".setBox_title>lable").hide();
                    $(".setBox_title select").hide();
                    $('.set_btn').css("margin-top","50px")
                    
                 }
                else{
                    $(".setBox_title>lable").show();
                    $(".setBox_title select").show();
                    $(".set_title").val($(this).parents("tr").find(".departmentId").val());
                    $(".set_power").val("科室排班员")
                    $('.set_btn').css("margin-top","0px")
                   
                }
                if($(this).parents("tr").find(".roleIds").val()=="医院管理员"){
                    $(".setBox_title").hide();
                    $(".setBox_power").hide();
                    $('.set_btn').css("margin-top","140px")
                } else {
                    $(".setBox_title").show();
                    $(".setBox_power").show();
                    $('.set_btn').css("margin-top","50px")

                }

                // $(".set_psd").on('focus',function(){
                //     $(this).val('');
                // });
            })


            $(document.documentElement).animate({ scrollTop: 0 }, 300);
            //支持chrome
            $(document.body).animate({ scrollTop: 0 }, 300);
            setPage(page,count);
        }
    })
   $("#set .new_schedule").bind("click").click(function () {
        $('.set_psd').blur(function(){
          newPw()
        })
        $('.paperlength').attr('disabled',false)
       $('.set_btn').css("margin-top","50px")
       $(".user_tip").html("只能输入数字和英文");
       $(".user_tip").removeClass("color_fe");
       $(".set_username").next().html("只能输入数字和英文");
       $(".set_username").attr("disabled",false);
       $(".set_username").val("");
       $(".set_psd").val("");
       $(".setPsd").show();
       $('.setPsdagain').show();
       $(".set_psd").attr("disabled", false);
       $("#psd_error").removeClass("color_fe").text("密码必须由6-21大小写字母和数字组成");
      // $(".set_psd").attr("placeholder","输入新建用户登录密码")
       $(".sePsd_again").val("")
       $(".sePsd_again").attr("disabled",false)
       $(".set_Uname").val("");
       $(".set_Uname").attr("disabled",false);
       $(".name_tip").html("只能输入中文");
       $(".name_tip").removeClass("color_fe");
       $("#psd_error_again").html("再次输入密码");
       $("#psd_error_again").removeClass("color_fe")
       $(".set_tel").val("");
       $(".set_tel").attr("disabled",false)
       $(".set_power").attr("disabled",false);
       $(".set_title").attr("disabled",false);
       $(".set_title").val('')
       $('.alertMask').show();
       $('.alertBox').show();
       $("#set_btn").show();
        $('.set_new').hide();
       $("#set_check").hide();
       $(".setBox_title").show();
        $(".setBox_power").show();
        // if($('.set_power').val()=="科室排班员"){
        //   $('.setBox_title').css('height','35px')
        //   $('.set_btn').css("margin-top","50px")
        // }else{
        //   $('.setBox_title').css('height','0px')
        // }
        // $(".set_power").change(function(){
        //   if($('.set_power').val()=="科室排班员"){
        //   $('.setBox_title').css('height','35px')
        //   $('.set_btn').css("margin-top","50px")
        // }else{
        //   $('.setBox_title').css('height','0px')
        //   $('.set_btn').css("margin-top","100px")
        // }
        // })

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
    var name=$(".set_name").val().trim();
    var id=$(".set_user").val().trim();
    setUp(1,name,id);
})

//帐号验证 是否空和已有重复帐号
function test_user(){
    //console.log('检测用户名');
       var val=$(".set_username").val().trim();
    if(!val || val=="" || val ==' '){
        $(".user_tip").html("帐号不能为空");
        $(".user_tip").addClass("color_fe");
        return false;
    }
    $.ajax({
        url:'http://www.51edoctor.cn/eht/admin/hospitalUser/selectByUserName',
        type:'post',
        data:{
            username :val,
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        success: function (data) {
           // console.log(data.NUM);
            if(data.NUM=="1"){
                //console.log('张浩存在')
               $(".set_username").next().addClass("color_fe")//.html("该账号已存在");
               $(".set_username").next().html("该账号已存在,请重新输入");
               // $(".set_username").val("");
               return false;
            }else{
                $(".set_username").next().html("只能输入数字和英文").removeClass("color_fe");
            }
        }
    })
};

//密码验证
function newPw(){
    // console.log('检测密码');
   var reg=/^(?![A-Z]+$)(?![0-9]+$)(?![a-z]+$)[0-9A-Za-z]{6,20}$/;
    if(!$(".set_psd").val() || $(".set_psd").val()=="" || $(".set_psd").val() ==' '){
        $("#psd_error").html("密码不能为空");
        $("#psd_error").addClass("color_fe");
        return false;
    }else if(!reg.test($(".set_psd").val())){
        $("#psd_error").html("密码格式错误");
        $("#psd_error").addClass("color_fe");
        return false;
    }
    else{
        $("#psd_error").html("密码必须由6-21大小写字母和数字组成");
        $("#psd_error").removeClass("color_fe");
    }
}

//二次密码验证
function newPw_again(){
    // console.log('检测密码2');
   // var reg=/^(?![A-Z]+$)(?![0-9]+$)(?![a-z]+$)[0-9A-Za-z]{6,20}$/;
    if(!$(".sePsd_again").val() || $(".sePsd_again").val()=="" || $(".sePsd_again").val() ==' '){
        $("#psd_error_again").html("密码不能为空");
       $("#psd_error_again").addClass("color_fe");
        return false;
    }
    //  if(!reg.test($(".sePsd_again").val())){
    //     $("#psd_error_again").html("密码格式错误");
    //    $("#psd_error_again").addClass("color_fe");
    //     return false;
    // }
    if($('.setPsd_old').val()){
        if($(".sePsd_again").val() != $('.setPsd_old').val()){
            $("#psd_error_again").html("密码前后输入不一致，请再次确认");
             $("#psd_error_again").addClass("color_fe");  
             return false;
        }
    }
       $("#psd_error_again").html("密码必须由6-21大小写字母和数字组成");
        $("#psd_error_again").removeClass("color_fe");
}

//用户名中文验证
function username_test(){
     // console.log('检测姓名');
    if(!$('.set_Uname').val() || $('.set_Uname').val()=='' || $('.set_Uname').val()==' '){
        $('.name_tip').html('姓名不能为空');
       $('.name_tip').addClass('color_fe'); 
       return false;
    }
    var reg=/^[\u4e00-\u9fa5]+$/;
       //alert(!reg.test('12'))
    if($('.set_Uname').val()){
           if(!reg.test($('.set_Uname').val())){
           $('.set_Uname').val(''); 
           $('.name_tip').html('输入格式有误，只能输入中文');
           $('.name_tip').addClass('color_fe');
            return false;
        }else{
            $('.name_tip').html('只能输入中文');
            $('.name_tip').removeClass('color_fe'); 
        } 
    }
  
};

//手机号验证 set_tel
function tel_test(){
     // console.log('检测手机');
    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    // var isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
     if(!$('.set_tel').val() || $('.set_tel').val()=='' || $('.set_tel').val()==' '){
        $('.tel_tip').html('手机号不能为空');
       $('.tel_tip').addClass('color_fe'); 
          return false;
    }
    if($('.set_tel').val()&& $('.set_tel').val().length ==11){
    //       // if(!isMob.test($('.set_tel').val())){
    //       //   // $('.set_tel').val('');
    //       //    $('.tel_tip').html('输入格式有误，请重新输入');
    //       //    $('.tel_tip').addClass('color_fe');
    //       //    return false;
    //       //   }
    // }else 
    if( $('.set_tel').val()&& $('.set_tel').val().length <11){
       if(!isPhone.test($('.set_tel').val())){
           // $('.set_tel').val('');
             $('.tel_tip').html('输入格式有误，请重新输入');
             $('.tel_tip').addClass('color_fe');
               return false;
            }
    }
  }
     $('.tel_tip').html('输入手机号或者座机号码');
       $('.tel_tip').removeClass('color_fe');
};

//编辑里的修改

function setCheck() {
  //  debugger;
    
    test_user();
    username_test();
    tel_test();                     
    if($('.user_tip').hasClass(('color_fe'))||$('#psd_error').hasClass(('color_fe'))||$('#psd_error_again').hasClass(('color_fe'))||$('.name_tip').hasClass(('color_fe'))||$('.tel_tip').hasClass(('color_fe'))){
        // console.log('信息有误2115');
         $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html("请按要求的格式输入完整信息");
        $(".btn_return").hide();
        $(".btn_sure").unbind("click").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
        })
        return false;
    }
    var username=$(".set_username").val().trim();
    var password=$(".set_psd").val().trim();
    var name=$(".set_Uname").val().trim();
    var phone=$(".set_tel").val().trim();
    var roleIds=$(".set_power option:selected").val();
    var id=$(".set_id").val();
    var depart=$(".set_title option:selected").val();
    if(!depart||$('.set_power option:selected').val() != '科室排班员'){
       // alert('只要角色不是排班的就让科室id传空');
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
    
    if($(".set_psd").val()=="******"&& $(".sePsd_again").val()=="******"){
      if($(".setBox_power").css("display")=="none"){
      var list = [{
        id:id,
        username:username,
        name:name,
        hospitalId:sessionStorage.getItem('hospitalId'),
        roleIds:"医院管理员",
        mobileno:phone,
        departmentId:depart
      }]
      $.ajax({
        url:'http://www.51edoctor.cn/eht/admin/hospitalUser/UpdateById',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            // console.log(data);
            $('.alertBox').hide();
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("修改成功");
            $(".btn_return").hide();  
            $(".btn_sure").unbind("click").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
                $('.alertMask').hide();
                $('.alertBox').hide();
                   location.reload();
            })
        }
    })
    }
    if($(".setBox_power").css("display")=="block"&&$('.setBox_title').css("display")=="block"){
      var list=[{
        id:id,
        username:username,
        name:name,
        hospitalId:sessionStorage.getItem('hospitalId'),
        roleIds:roleIds,
        mobileno:phone,
        departmentId:depart
    }];
     $.ajax({
        url:'http://www.51edoctor.cn/eht/admin/hospitalUser/UpdateById',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            // console.log(data);
            $('.alertBox').hide();
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("修改成功");
            $(".btn_return").hide();  
            $(".btn_sure").unbind("click").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
                $('.alertMask').hide();
                $('.alertBox').hide();
                   location.reload();
            })
        }
    })
    }

    }else{
      if($(".setBox_power").css("display")=="none"){
      var list = [{
        id:id,
        username:username,
        password:password,
        name:name,
        hospitalId:sessionStorage.getItem('hospitalId'),
        roleIds:"医院管理员",
        mobileno:phone,
        departmentId:depart
      }]
      $.ajax({
        url:'http://www.51edoctor.cn/eht/admin/hospitalUser/UpdateById',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            // console.log(data);
            $('.alertBox').hide();
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("修改成功");
            $(".btn_return").hide();  
            $(".btn_sure").unbind("click").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
                $('.alertMask').hide();
                $('.alertBox').hide();
                   location.reload();
            })
        }
    })
    }
    if($(".setBox_power").css("display")=="block"&&$('.setBox_title').css("display")=="block"){
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
     $.ajax({
        url:'http://www.51edoctor.cn/eht/admin/hospitalUser/UpdateById',
        type:'post',
        data:{jsonObj:JSON.stringify(list)},
        dataType: "json",
        success: function (data) {
            // console.log(data);
            $('.alertBox').hide();
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("修改成功");
            $(".btn_return").hide();
            $(".btn_sure").unbind("click").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
                $('.alertMask').hide();
                $('.alertBox').hide();
                   location.reload();
            })
        }
    })
    }
    }
}

//添加用户
function setAdd() {
    test_user();
    newPw();
    newPw_again();
    username_test();
    tel_test(); 
    var username=$(".set_username").val();
    var password=$(".set_psd").val();
    var psd_again = $('.sePsd_again').val();
    var name=$(".set_Uname").val();
    var phone=$(".set_tel").val();
    var roleIds=$(".set_power option:selected").val();
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
    // sessionStorage.setItem("password",list[0].password)
    // console.log(list);
    // console.log(Boolean(username&password&name&phone));
    if(roleIds == '科室排班员'){
        if(!depart || depart == ''){
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("该排班员对应科室为空，请联系管理员");
            $('.small_btn').on('click','button',function(){
                 $('.smallMask').hide();
                    $('.smallBox').hide();
                    $('.alertMask').hide();
                    $('.alertBox').hide();
            });
            //  $(".btn_sure").click(function () {
            //         $('.smallMask').hide();
            //         $('.smallBox').hide();
            //         $('.alertMask').hide();
            //         $('.alertBox').hide();
            //     })
            return false;
        }
    }

    if($('.user_tip').hasClass(('color_fe'))||$('#psd_error').hasClass(('color_fe'))||$('#psd_error_again').hasClass(('color_fe'))||$('.name_tip').hasClass(('color_fe'))||$('.tel_tip').hasClass(('color_fe'))||password!=psd_again){
            console.log('信息有误保存');
             $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("请按要求的格式输入完整信息");
            $(".btn_return").hide();
            $(".btn_sure").unbind("click").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
            return false;
    }
    // if(username!=""&password!=""&name!=""&phone!=""&!$("#psd_error").hasClass("color_fe")){
        $.ajax({
            url:'http://www.51edoctor.cn/eht/admin/hospitalUser/Insert',
            type:'post',
            data:{jsonObj:JSON.stringify(list)},
            dataType: "json",
            success: function (data) {
                // console.log(data);
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("添加成功");
                $(".btn_return").hide();
                location.reload();
                // var trs = $('.set_content').find('tr');
                // console.log(trs)    
                // $.each(trs,function(tr,index){
                //     if($(tr).eq(1).find('.username') == username){
                //         alert('找到了新加的用户名');
                //         $(tr).eq(1).find('.password').val(password);
                //         return false;
                //     }
                // });
                // alert('新加用户密码：'+password);
                       // $('.set_psd').attr('psd',password);
                $(".btn_sure").unbind("click").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                    $('.alertMask').hide();
                    $('.alertBox').hide();
                       
                })
            }
        });
}
//删除
function setDel(){
  // var id= $(e).parents("tr").find(".id").val();
  var id = $(".set_id").val();
 //   console.log(id);
    $('.smallMask').show();
    $('.smallBox').show();
    $(".small_text").html("是否确认删除");
    $(".btn_sure").unbind("click").click(function () {
        $.ajax({
            url:'http://www.51edoctor.cn/eht/admin/hospitalUser/deleteById',
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
        url:'http://www.51edoctor.cn/eht/admin/hospitalUser/selectSub',
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


function setChange(){
    if($(".set_power option:selected").val()=="医院挂号员"||$(".set_power option:selected").val()=="医院排班员"||$(".set_power option:selected").val()=="门办审核员"||$(".set_power option:selected").val()=="自助终端"||$(".set_power option:selected").val()=="医院财务员"){
        $(".setBox_title>lable").css({'display':'none'});
        $(".setBox_title select").css({'display':'none'});
    }
    if($(".set_power option:selected").val()=="科室排班员"){
        $(".setBox_title>lable").show();
        $(".setBox_title select").show();
    }
    // if ($(".set_power option:selected").val()=="医院管理员") {
    //     $(".setBox_title>lable").css({'display':'none'});
    //     $(".setBox_title select").css({'display':'none'});
    // }
}


// 统计导出表格

function setOut(start,end){
    $.ajax({
        url:'http://www.51edoctor.cn/eht/admin/HospitalCount/countExcle',
        type:'post',
        data:{
            startDate:start,
            endDate:end,
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        success:function(data) {
          //  alert("导出成功");
            window.location="http://www.51edoctor.cn/eht/uploadFile/"+data;
        }
    })

}


