var baseUrl = 'http://www.51edoctor.cn/';

// 点击重置
function reset_set(){
    $(".set_user").val("")
    $(".set_name").val("")
    $(".set_contact").val("")
    $(".set_subject").val("")
}
// 点击新增
$(".new_schedule").on('click',function(){
    $(".alert-title span").text("新增账号信息")
    $(".alertMask,.alertBox").show()
    $("#set_check,.set_remove").hide()
    $(".set_btn").show()
})
$(".set_check").on('click',function(){
    $(".alert-title span").text("编辑账号信息")
    $(".alertMask,.alertBox").show()
    $("#set_check,.set_remove").hide()
    $(".set_btn").show()
})
// 点击查看
$(".set_watch").on('click',function(){
    $(".alert-title span").text("查看账号信息")
    $(".alertMask,.alertBox").show()
    $(".set_btn").hide()
})

// 删除
$(".delete_btn").on('click',function(){
    swal({
        title:"温馨提示",
        text:"确认删除该账号？",
        showCancelButton:true,
        confirmButtonColor:"#43a0ea",
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        closeOnConfirm:false,
        closeOnCancel:false
        },
        function(isConfirm){
            if(isConfirm){
                $(".sweet-overlay,.sweet-alert").hide()
            }else{
                $(".sweet-overlay,.sweet-alert").hide()
            }
        })
})