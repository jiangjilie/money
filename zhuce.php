<!--注册页面，简易化的功能，只需要输入用户名和密码即可，但需要判断用户名是否已经存在-->
<meta charset="UTF-8">
<?php

/*需要连接数据库，将代码连接进来*/
include ('sql.php');
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <title>
        档案智能化管理平台
    </title>
    <link href="login/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <meta name="viewport" content="width=device-width" />
    <link href="login/bootstrap.min.css" rel="stylesheet"/>
	<link href="login/style.css" rel="stylesheet"/>
	<link href="login/login.css" rel="stylesheet"/>
	<script src="js/jquery-1.10.2.min.js"></script>
	<script src="js/layer/layer.js"></script>
</head>
<style>
    *{
        padding: 0;
        margin: 0;
        list-style: none;
        text-decoration: none;
    }
</style>
<body>
    <div>
         <img src="login/logo2.png"  style="height: 77px;width: 266px;" />
    </div>
    <div class="login" style="height: 420px;">
        <div class="message " style=" color:#00b7d6; font-size:30px; text-align:center; ">
            用户注册
        </div>      
      <div id="darkbannerwrap" ></div>
        <form id="formLogin" method="post">
			<fieldset>
            <input type="text" class="admin" id="username" placeholder="姓名" name="admin" value="<?php echo $admin;?>">
			</fieldset>
            <!-- <hr class="hr15"> -->
            <input type="password" class="passWord" id="password" name="password1" placeholder="密码" value="<?php echo $password;?>" >
            <input type="password" class="passWord" id="password" name="password" placeholder="确认密码" value="<?php echo $password;?>" >
            <input type="hidden" name="pw" id="pw" />
            <!-- <hr class="hr15"> -->
            <input type="submit" id="btnLogin" value="注册" class="btn btn-primary" style="width:100%;"><input type="button" style="background-color: white;color: #000000;" value="返回登录" class="btn btn-primary" id="dl">
            <!-- <hr class="hr20"> -->
        </form>
    </div>
	<!-- <div class="copyright" style="font-size: 20px" >技术支持：石柱项目组</div> -->
	<!-- <div class="copyright" style="font-size: 20px" ><img src="login/logo3.png"  style="height: 95px;width: 65px;" /></div> -->
	 
<script>
		  window.onload=function(){
			  document.getElementById('btnLogin').onclick=function(){
					$un = document.getElementById('username').value;
					$pw = document.getElementById('password').value;
					if($un==""){
				   layer.alert('用户名不能为空');
				   return false;
					}
					if($pw==""){
					layer.alert('密码不能为空');
					return false;
										}
					
					
			  }
		  }
	  </script>
<?php
if ($_POST){
    $admin = $_POST['admin'];
    $password1 = $_POST['password1'];
    $password = $_POST['password'];
    if ($password1 == $password){
        /*输入没有逻辑问题，开始判断用户名是否已经存在于数据库*/
        $select = "select * from admin where admin = '$admin'";
        $query = $conn->query($select);
        $row = mysqli_fetch_assoc($query);
        /*如果存在，则说明数据库中有重名的*/
        if ($row){
            echo "<script>layer.msg('用户名已存在，请重新输入！')</script>";
        }else{
            $insert = "insert into admin(admin,password) value('$admin','$password')";
            $query1 = $conn->query($insert);
            /*将这语句执行后，就已经能够将数据存入数据库中，所以需要弹到登录页面进行登录*/
            echo "<script>alert('注册成功,请前往登录！') 
				  window.location.href='index.php';
				  </script>";			
        }
    }else{
        echo "<script>layer.msg('两次密码不一致，请重新输入！')</script>";
    }
}
?>
<!--点击返回登录后，需要跳转到登录页面，还是使用js来进行-->
<script>
    $('#dl').click(function () {
        window.location.href="index.php";
    });
</script>

