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
    $("caption span").html("("+year + "-" + month + "-" + data+")")
    // console.log(data);
}




var count=0;
//自动填充列表
function addTable(){
	var html='<tr class="schedule_detail_up" id=schedule_detail_up_'+count+'>'+
'	    <td  class="schedule_num">'+
		(count+1)+
'</td>'+
' <td  class="schedule_name">'+
' 	<input type="text" class="expert" placeholder="输入专家姓名" id="doctorName_'+count+'"/>'+
' 	<input type="hidden" id="doctorId_'+count+'"    class="hiddenDoctorId"/>'+
' <div class="name_suggest name_suggest_'+count+'"><ul></ul></div></td>'+
' <td  class="schedule_title">'+
' 	<select disabled style="color:black;" id="duty_'+count+'">'+

' 		<option value="1">医师</option>'+
' 		<option value="2">主治医师</option>'+
' 		<option value="3">副主任医师</option>'+
' 		<option value="4">主任医师</option>'+
' 		<option value="0">其他</option>'+



' 	</select>'+
' </td><td><select id="depart_'+count+'"><option value="0">普通门诊</option><option value="1">专家门诊</option><option  value="2">特需门诊</option></select></td>'+
' <td  class="schedule_time"><p>上午</p><p>下午</p></td>'+
' <td colspan="7" class="doctor_main">';
    for(var k=0;k<5;k++){
            html+='     <table class="schedule_detail_table table-striped table-responsive registerTable_'+k+'">'+
                '         <tr>';
        for(var i = 0 ; i < 7 ; i++){
            html+='<td  >'+
                '    <input type="text" maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" id="totalNum_am_'+(count+1)+'_'+(i+7*k)+'"/>'+
                '</td>';
        }
        html+='</tr>'+
            '<tr>';
        for(var i = 0 ; i < 7 ; i++){
            html+='<td  >'+
                '		<input type="text" maxlength="2" onkeyup="value=value.replace(/[^\\d]/g,\'\')" id="totalNum_pm_'+(count+1)+'_'+(i+7*k)+'"/>'+
                '</td>';
        }

        html+='		</tr>'+
            '	</table>';
    }
	html+='</td>';
//	if(count>0){
		html+=' <td ><button class="schedule_btn delete" onclick="deleteRow('+count+')">删除</button></td>';
//	}
//	if(count==0){
//		html+=' <td ><button class="schedule_btn add">删除</button></td>';
//	}
	html+='</tr>';
	$('.doc_mess').append(html);
	count+=1;
    $(".registerTable_0").show();
    $(".registerTable_1,.registerTable_2,.registerTable_3,.registerTable_4").hide();
    searchSuggest();
}

//模糊查询
function searchSuggest() {
    $('.expert').bind('input propertychange', function(event) {
        var ts=$(this);
        ts.next().val("");
        var k=ts.parent().prev().html()-1;
        var word = ts.val();

        if (word == '') {
            $(".name_suggest_"+k).hide();
            $('#duty_'+k).val(1);
            return false;
        }else{
            $.ajax({
                url:'http://www.51edoctor.cn/eht/admin/scheduling/DoctorQuery',
                type:'post',
                data:{
                    name:word,
                    subjectId:sessionStorage.getItem('subjectId'),
                    hospitalId:sessionStorage.getItem('hospitalId')
                },
                dataType: "json",
                async:false,
                success: function (data) {
//                    var i=ts.parent().prev().html()-1;
                    if(data.length>0){
                        $(".name_suggest_"+k).show();
                        var html = '';
                        for (var i = 0; i < data.length; i++) {
                        	if(data[i].doctorName == word ){
                        		ts.next().val(data[i].doctorId);
                                ts.parent().next().find("select").val(data[i].duty);
                        	}
                            html += '<li><span>'+data[i].doctorName+'</span><input class="doctor_duty" value="'+data[i].duty+'" type="hidden"/><input class="doctor_id" value="'+data[i].doctorId+'" type="hidden"/></li>';
                        }
                        $(".name_suggest_"+k).find("ul").html(html);

                        console.log($("#doctorId_0").val());
                        var id=ts.next().val();
                        if(id){
                            if(ifCan(id)>0){
                                $('.smallMask').show();
                                $('.smallBox').show();
                                $(".small_text").html("该医生已有排班,请前往排班信息修改");
                                $(".btn_return").hide();
                                $(".btn_sure").click(function () {
                                    $('.smallMask').hide();
                                    $('.smallBox').hide();
                                })
                                ts.val("");
                            }
                        }
                    }

                },
                complete: function () {
                    $(".name_suggest_"+k+" li").click(function () {
                        $("#doctorName_"+k).val($(this).find("span").html());
                        $('#duty_'+k).val($(this).find(".doctor_duty").val());
                        $('#doctorId_'+k).val($(this).find(".doctor_id").val())
                        $(".name_suggest_"+k).hide();
                        var id=ts.next().val();
                        if(ifCan(id)>0){
                            $('.smallMask').show();
                            $('.smallBox').show();
                            $(".small_text").html("该医生已有排班,请前往排班信息修改");
                            $(".btn_return").hide();
                            $(".btn_sure").click(function () {
                                $('.smallMask').hide();
                                $('.smallBox').hide();
                            })
                            ts.val("");
                        }
                    })

                }
            })
        }
    })
    $('.expert').bind('blur', function(event) {
        var ts=$(this);
        var k=ts.parent().prev().html()-1;
        setTimeout(function() {  //进行延时处理
            $(".name_suggest_"+k).hide();
        }, 120)
    })
    $('.expert').bind('focus', function(event) {
        var ts=$(this);
        var k=ts.parent().prev().html()-1;
        if(ts.val()==''){
            $(".name_suggest_"+k).hide();
        }else{
            $(".name_suggest_"+k).show();
        }
    })
}



//                        判断该医生是否能添加当前排班
function ifCan(id) {
    var text;
    $.ajax({
        url:'http://www.51edoctor.cn/eht/admin/scheduling/CurrentSchedulingState',
        type:'post',
        data:{
            doctorId:id,
            subjectId:sessionStorage.getItem('subjectId'),
            hospitalId:sessionStorage.getItem('hospitalId')
        },
        dataType: "json",
        async:false,
        success: function (data) {
           text= data;
        }
    })
    return text;
}



//删除行
function deleteRow(counts){
	$('#schedule_detail_up_'+counts).remove();
    count--;
}
//自动加载日期列表
function addDate(data){
	var html='';
   for(var k=0;k<5;k++){
       for(var i = 0;i<7;i++){
           var date=new Date();
           //传入开始时间转换成日期格式
           if(typeof(data) != 'undefined'){
               date=new Date(data);
           }
           //首次进入获取当前日期
           if(typeof(data) == 'undefined'){
               date=new Date();
           }

           date.setDate(date.getDate()+(7*k+i+1));
           date=date.getFullYear()+'-'+((date.getMonth()+1)>9?(date.getMonth()+1):"0"+(date.getMonth()+1))+'-'
                +(date.getDate()>9?date.getDate():"0"+date.getDate());
           var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
           var myDate = new Date(Date.parse(date.replace(/-/g, "/")));

           if(i==0){//开头
               html+='<td colspan="7" class="registerTable_'+k+'">'+
                   '	<table  class="schedule_tr_table">'+
                   '		<tr>'+
                   '			<td class="point_left" style="width: 140px">';
               //以当天为开始时不可添加往日排班信息
               if(k !=0){
                   html+='<a href="###" onclick="showLeft('+(k-1)+')" value="0" id="showLeft"></a>';
               }
               html+='<p>'+weekDay[myDate.getDay()]+'</p>'+
                   '		<p id="sourceDate_'+(i+7*k)+'">'+date+'</p>'+
                   '</td>';
           }
           if(i==6){//结尾
               html+='			<td class="point_right" style="width: 140px">'+
                   '				<p>'+weekDay[myDate.getDay()]+'</p>'+
                   '				<p id="sourceDate_'+(i+7*k)+'">'+date+'</p>';
               if(k != 4){
                   html+='				<a href="javascript:void(0)" onclick="showRight('+(k+1)+')"></a>';
               }
                    html+='			</td>'+
                   '		</tr>'+
                   '	</table>'+
                   '</td>'+
                   '<td class="registerTable_'+k+'" style="width: 90px" >操作</td>';
           }
           if(i!=0&&i!=6){
               html+='			<td style="width: 140px">'+
                   '				<p>'+weekDay[myDate.getDay()]+'</p>'+
                   '				<p id="sourceDate_'+(i+7*k)+'">'+date+'</p>'+
                   '			</td>';
           }
       }

   }
    $('.schedule_tr').append(html);


//    dateCount+=7;
}
//后推一个星期的排班号源
function showRight(num){
    $(".registerTable_"+(num-1)).hide();
    $(".registerTable_"+num).show();
}
function showLeft(num) {
    $(".registerTable_"+(num+1)).hide();
    $(".registerTable_"+num).show();
}
/*//根据日期判断为星期几
function weekDay(day){
	var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var myDate = new Date(Date.parse(day.replace(/-/g, "/")));
    weekDay[myDate.getDay()];
}*/
//保存
function submit(type){
	var idCount=0;
    var num=[];
	$('.hiddenDoctorId').each(function(){
		if($("#doctorId_"+idCount).val() ==""){
           num.push($("#doctorName_"+idCount).val()) ;
		}
		idCount++;
	});
    if(num.length>0){
        $('.smallMask').show();
        $('.smallBox').show();
        $(".small_text").html(num+"&nbsp;&nbsp;&nbsp;姓名输入错误");
        $(".btn_return").hide();
        $(".btn_sure").click(function () {
            $('.smallMask').hide();
            $('.smallBox').hide();
        })
        return;
    }
	var data={};
	var dataRow;
	for(var i=0;i<count;i++){
		dataRow={hospitalId:sessionStorage.getItem('hospitalId'),subjectId:sessionStorage.getItem('subjectId'),"doctorId":$("#doctorId_"+i).val(),"outpatientType":$("#depart_"+i).val(),state:type};
		//上午时段
		var sourceAM={};
		var sourceAMDate;
		for(var j=0;j<35;j++){
			sourceAMDate={sourceDate:$("#sourceDate_"+j).text(),totalNum_am:$("#totalNum_am_"+(i+1)+"_"+j).val()};
			sourceAM[j]=sourceAMDate;
		}
		dataRow.sourceAM=sourceAM;
		//下午时段
		var sourcePM={};
		var sourcePMDate;
		for(var j=0;j<35;j++){
			sourcePMDate={sourceDate:$("#sourceDate_"+j).text(),totalNum_pm:$("#totalNum_pm_"+(i+1)+"_"+j).val()};
			sourcePM[j]=sourcePMDate;
		}
		dataRow.sourcePM=sourcePM;
		data[i]=dataRow;
        console.log(!$("#doctorName_"+i).val());
        if(!$("#doctorName_"+i).val()){
            $('.smallMask').show();
            $('.smallBox').show();
            $(".small_text").html("请输入第"+(i+1)+"行医生姓名");
            $(".btn_return").hide();
            $(".btn_sure").click(function () {
                $('.smallMask').hide();
                $('.smallBox').hide();
            })
            return;
        }
	}
    console.log(dataRow);
	 $.ajax({
	        url:'http://www.51edoctor.cn/eht/admin/scheduling/CurrentSchedulingInsert',
	        type:'post',
	        data:{jsonObj:JSON.stringify(data)},
	        success: function (data) {
                console.log(data);
                $('.smallMask').show();
                $('.smallBox').show();
                $(".small_text").html("添加成功");
                $(".btn_return").hide();
                $(".btn_sure").click(function () {
                    $('.smallMask').hide();
                    $('.smallBox').hide();
                })
	        },
            error: function () {
             alert("添加cuowu ")
         }
	 });
}