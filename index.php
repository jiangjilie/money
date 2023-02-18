<meta charset="UTF-8">
<?php
/*因为需要链接数据库，所以先引入链接数据库的代码*/
include ('sql.php');
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <title>
        工资管理系统
    </title>
    <link href="login/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <meta name="viewport" content="width=device-width" />
    <link href="login/bootstrap.min.css" rel="stylesheet"/>
	<link href="login/style.css" rel="stylesheet"/>
	<link href="login/login.css" rel="stylesheet"/>
	<script src="js/jquery-1.10.2.min.js"></script>
	<script src="js/layer/layer.js"></script>

</head>
<body>
    <div>
        <!-- <img src="login/logo2.png"  style="height: 77px;width: 266px;" /> -->
    </div>
    <div class="login">
        <div class="message " style=" color:#00b7d6; font-size:30px; text-align:center; ">
            用户登录
        </div>      
      <div id="darkbannerwrap" ></div>
        <form id="formLogin" method="post">
			<fieldset>
            <input type="text" class="admin" id="username" placeholder="姓名" name="admin" value="<?php echo $admin;?>">
			</fieldset>
            <!-- <hr class="hr15"> -->
            <input type="password" class="passWord" id="password" name="password" placeholder="密码" value="<?php echo $password;?>" >
            <input type="hidden" name="pw" id="pw" />
            <hr class="hr15">
            <input type="submit" id="btnLogin" value="登录" class="btn btn-primary" style="width:100%;">
			<!-- <input type="button" style="background-color: white;color: #000000;"value="注册" class="btn btn-primary" id="zc"> -->
            <!-- <hr class="hr20"> -->
        </form>
    </div>
	<!-- <div class="copyright" style="font-size: 20px" >技术支持：石柱项目组</div> -->
	<!-- <div class="copyright"  ><img src="login/logo3.png"  style="height: 95px;width: 65px;float: right;" /></div> -->
	
	<script>
		  window.onload=function(){
			  document.getElementById('btnLogin').onclick=function(){
					$un = document.getElementById('username').value;
					$pw = document.getElementById('password').value;
					if($un==""||$$pw==""){
				   layer.alert('用户名不能为空');
				   return false;
					}
		  }
	  </script>
<!-- 	<script>	  
	  		  document.getElementById('btnLogin').onclick=function(){
	  				$un = document.getElementById('username').value;
	  				$pw = document.getElementById('password').value;
	  				if($un=='admin'&&$pw=='1'){
	  			    window.location.href = "index_admin/index.php";
	  				}
	  				
	  				
	  		  }
	  	  }
	  </script> -->
<?php
/*判断是否上面的表单是否有输入，有输入时才执行以下部分，不然打开页面的时候会报错*/
if ($_POST){
    /*获取表单传输过来的值*/
    $admin = $_POST['admin'];
    $password = $_POST['password'];
    /*echo $name;
    echo $password1;
    echo $password;*/
		// if($admin=='admin'){
		// 	echo "<script>
		// 	 window.location.href = 'index_contract.php?user=$admin';
		// 	 </script>";
		// }
        $select = "select * from admin where admin = '$admin' and password = '$password'";
        $query = $conn->query($select);
        $row = mysqli_fetch_assoc($query);
        /*判断数据库中是否存在传输过来的信息*/
        if ($row){
            echo "<script>
					 layer.msg('登录成功');
					window.location.href='index_money.php?id={$row['id']}&user={$row['admin']}';
				</script>";
        }else{
            echo "<script>layer.msg('用户名或密码错误！')</script>";
        }
}
?>
<!--在点击注册的时候，需要跳转到注册页面,使用js代码来实现-->
<script>
    $('#zc').click(function () {
        window.location.href="zhuce.php";
    });
</script>

