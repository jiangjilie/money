<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>更改</title>
		<script src="js/jquery-1.10.2.min.js"></script>		
	</head>
	<body>
				<?php
				//声明变量并接受form表单发送过来的数据
					$id = $_POST['id'];					
					$company = $_POST['company']; 					
					$ycompany = $_POST['ycompany']; 					
					$bz=$_POST['bz'];
				//连接数据库
					$con = mysql_connect("localhost","root","123456");
					if(!$con){
					echo "<br/>数据库连接失败".mysql_error();
					}
				//选择数据库
					mysql_select_db("money");
					//设置mysql字符编码
					mysql_query("set names utf8;");			
				//updat语句 （更新数据）
				$update="update user set company='$company' where company='$ycompany'";
				mysql_query($update);
				$update="update dept set company='$company' where company='$ycompany'";
				mysql_query($update);
				 $update="update company set name='$company',bz='$bz' where id=$id";
				 mysql_query($update);
				 
				 $update="update attendance set company='$company' where company='$ycompany'";
				 mysql_query($update);
				 $update="update bonus set company='$company' where company='$ycompany'";
				 mysql_query($update);
				 $update="update salary set company='$company' where company='$ycompany'";
				 mysql_query($update);
				 $update="update social set company='$company' where company='$ycompany'";
				 mysql_query($update);
				 $update="update subsidy set company='$company' where company='$ycompany'";
				 mysql_query($update);
				 $update="update tax set company='$company' where company='$ycompany'";
				 mysql_query($update);
				 ?>
	</body>
</html>
