 var baseUrl = 'http://www.51edoctor.cn/';

// 点击添加
 $(".set_add,.set_add img").on("click",function(){
 	$(".alertMask,.alertBox").show()
	 $(".set_remove,#set_check").hide()
	 $(".set_btn").show()
 })
// 查看
$(".set_watch").on("click",function(){
	$(".alertMask,.alertBox").show()
	$(".set_btn").hide()
})
// 编辑
$(".set_check").on("click",function(){
	$(".alertMask,.alertBox").show()
	$(".set_remove,#set_check").hide()
	$(".set_btn").show()
})
 // 点击保存
function setAdd(){
	if($(".set_username").val()==""){
		$(".user_tip").addClass("color_fe")
		$(".user_tip").text("床位号不能为空")
		return false
	}
}

function test_user(){
	if($(".set_username").val()==""){
		$(".user_tip").addClass("color_fe")
		$(".user_tip").text("床位号不能为空")
	}else{
		$(".user_tip").removeClass("color_fe")
		$(".user_tip").text("请输入床位号")
	}
}

function newPw(){
	if($(".set_psd").val()==""){
		$("#psd_error").addClass("color_fe")
		$("#psd_error").text("陪护床编号不能为空")
	}else{
		$("#psd_error").removeClass("color_fe")
		$("#psd_error").text("请输入陪护床编号")
	}
}
// 点击重置
function reset_set(){
	$(".set_user").val("")
	$(".set_name").val("")
}