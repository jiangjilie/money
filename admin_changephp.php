<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>收入合同更改</title>
		<script src="js/jquery-1.10.2.min.js"></script>
		
	</head>
	<body>
				<?php
				//声明变量并接受form表单发送过来的数据
					$admin =  $_POST['admin'];
					$name =  $_POST['name'];
					$phone =  $_POST['phone'];
					$email =  $_POST['email'];
					$dept =  $_POST['dept'];
					$bz =  $_POST['bz'];
					$id =  $_POST['id'];
					$role = $_POST['role'];
					$password = $_POST['password'];
				
				//连接数据库
					$con = mysql_connect("localhost","root","123456");
					if(!$con){
					echo "<br/>数据库连接失败".mysql_error();
					}
				//选择数据库
					mysql_select_db("contract");
					//设置mysql字符编码
					mysql_query("set names utf8;");			

				//updat语句 （更新数据）
				 $update="update admin set admin='{$admin}',name='{$name}',password='{$password}',role='{$role}',phone='{$phone}',email='{$email}',dept='{$dept}',bz='{$bz}' where id=$id";
				 $res_update=mysql_query($update);
				 // if($res_update){
					//  echo "<script>					 
					//   window.location.href='user.php';
					//  </script>";
				 // } 
				 ?>
	</body>
</html>
	