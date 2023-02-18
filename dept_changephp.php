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
					$dept = $_POST['dept']; 					
					$ydept = $_POST['ydept']; 					
					$ycompany = $_POST['ycompany']; 					
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
				$update="update user set dept='$dept',company='$company' where dept='$ydept' and company='$ycompany' ";
				mysql_query($update);
				 $update="update dept set name='$dept',company='$company',bz='$bz' where id=$id";
				 mysql_query($update);
				 
				$update="update attendance set dept='$dept',company='$company' where dept='$ydept' and company='$ycompany' ";
				mysql_query($update);
				$update="update bonus set dept='$dept',company='$company' where dept='$ydept' and company='$ycompany' ";
				mysql_query($update);
				$update="update salary set dept='$dept',company='$company' where dept='$ydept' and company='$ycompany' ";
				mysql_query($update);
				$update="update social set dept='$dept',company='$company' where dept='$ydept' and company='$ycompany' ";
				mysql_query($update);
				$update="update subsidy set dept='$dept',company='$company' where dept='$ydept' and company='$ycompany' ";
				mysql_query($update);
				$update="update tax set dept='$dept',company='$company' where dept='$ydept' and company='$ycompany' ";
				mysql_query($update);
				 ?>
	</body>
</html>
