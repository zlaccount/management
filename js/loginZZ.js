$(function(){

      var baseUrl = 'http://www.51edoctor.cn/';
        // var baseUrl = 'http://192.168.1.51:8333/';

        function MacInfo(){
             var locator =new ActiveXObject("WbemScripting.SWbemLocator");
             var service = locator.ConnectServer(".");
             var properties = service.ExecQuery("Select * from Win32_NetworkAdapterConfiguration Where IPEnabled =True");
             var e =new Enumerator (properties);
             {
                   var p = e.item();
                  var mac = p.MACAddress;
                  // alert(mac)
                  return mac
             }
       }

       function checkCookie(){
            var username=$.cookie('user');
            var upassword=$.cookie('pass');
            if (username!=null && username!=""&& upassword!=null && upassword!=""){
                $(".username").val(username);
                $(".password").val(upassword);
                setTimeout(login,1000);
            }
        }
        checkCookie();


          function login(){
            var username = $('.username').val(),
                psw = $('.password').val();
                // var mac = MacInfo()
                var mac = getSystemInfo("NetworkAdapter.1.PhysicalAddress");
                console.log(IPAddr)
                console.log(mac)

                if(username == ''){
                  $('.userTip').show();
                  $('.userTip').text('用户名不能为空');
                }
                if(psw == ''){
                  $('.pwdTip').show();
                  $('.pwdTip').text('密码不能为空');
                  return;
                }
                jQuery.support.cors = true;
              $.ajax({
                  type:"post",
                 // url:'http://192.168.1.51:8333/eht/admin/hospitalUser/login',
                  url:baseUrl + 'eht/admin/hospitalUser/login',
                  data:{
                    username:username,
                    password:psw,
                    mac:mac,
                    ip:IPAddr
                  },
                  success:function(data){
                      if(data.result=="登录成功！"||data.result == 1){
                        var user = document.getElementsByClassName("username")[0],
                        pass = document.getElementsByClassName("password")[0],
                        cked = document.getElementsByClassName("checkBox")[0];
                        if(cked.checked){
                          var userVal = $(user).val();
                          var passVal = $(pass).val();
                          $.cookie('user',userVal,{expires: 365,path:'/'});
                          $.cookie('pass',passVal,{expires: 365,path:'/'});
                        }
                        if(!window.sessionStorage && /MSIE/.test(navigator.userAgent)){
                          //IE
                          if(!window.UserData){
                            window.UserData = function(file_name){
                                var dom = document.createElement('input');
                                dom.type = 'hidden';
                                dom.addBehavior('#default#userData');
                                document.body.appendChild(dom);
                                dom.save(file_name);
                                this.file_name = file_name;
                                this.dom = dom;
                                return this;
                            };
                            window.UserData.prototype = {
                              setItem:function(k,v){
                                  this.dom.setAttribute(k,v);
                                  this.dom.save(this.file_name);
                              },
                              getItem:function(k){
                                this.dom.load(this.file_name);
                                return this.dom.getAttribute(k);
                              },
                              removeItem:function(k){
                                  this.dom.removeAttribute(k);
                                  this.dom.save(this.file_name);
                              }
                            };
                          }
                         // var storage = new window.UserData('storage_files'); 
                           window.storage = new window.UserData('storage_files'); 
                            storage.setItem('username',data.name);  
                            storage.setItem('hospitalName',data.hospitalName); 
                            storage.setItem('hospitalId',data.hospitalId); 
                            storage.setItem('roleId',data.roleId);
                            storage.setItem('subjectId',data.departmentId);
                            storage.setItem('subjectName',data.departmentName);  
                            // alert(storage.getItem('username'));
                            // alert(storage.getItem('hospitalName'));
                            //   alert(storage.getItem('roleId'));
                            //     alert(storage.getItem('subjectId'));
                            //       alert(storage.getItem('subjectName'));
                        }else{
                            sessionStorage.setItem('username',data.name);
                            sessionStorage.setItem('hospitalName',data.hospitalName); 
                            sessionStorage.setItem('hospitalId',data.hospitalId); 
                            sessionStorage.setItem('roleId',data.roleId);
                             sessionStorage.setItem('userId',data.userId);
                            sessionStorage.setItem('subjectId',data.departmentId);
                            sessionStorage.setItem('subjectName',data.departmentName);
                        }
                      if(($(".welcome>span").text()=="自助取号系统"&&data.roleId!=="自助终端")){
                          $('.pwdTip').show();
                          $('.pwdTip').text('用户名不存在, 请重新输入');
                          return false;
                      }
                      window.location.href="../takeNumber.html";
                      }
                       else if(data.result == 0||data.result == -1){
                            $('.pwdTip').show();
                            $('.pwdTip').text('用户名或密码错误 请重新输入');
                      }
                          else if(data.result == -2){
                             $('.pwdTip').show();
                            $('.pwdTip').text('该排班员无对应科室，请联系管理员添加科室');
                      }
                  },
                    error:function(data){
                      $('.pwdTip').show();
                      $('.pwdTip').text('服务器无响应');
                    }
            });  
        };

        $('.enter').click(function(){
    
              login();    
      });

    
      $('.loginInner input').on('input',function(){
          $('.loginInner .userTip').hide();
          $('.loginInner .pwdTip').hide();
      })
     
   
    $('.loginInner input').keydown(function(e){
      var event = e || window.event;
      if(event.keyCode == 13){
     
              login();
          }
    });

    $('.loginInner .eyesTip').click(function(){
      if($(this).prev().attr('type') == 'password'){
          $('.grayeyes').css({'display':'none'});
          $('.eyes').css({'display':'block'});
          $(this).prev().attr('type','text');
      }else{
        $('.grayeyes').css({'display':'block'});
          $('.eyes').css({'display':'none'});
        $(this).prev().attr('type','password'); 
      }
    });
});
      

    
  