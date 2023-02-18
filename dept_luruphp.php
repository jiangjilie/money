<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/jquery-1.10.2.min.js"></script>
		
	</head>
	<body>
				<?php
				//声明变量并接受form表单发送过来的数据
					$company=$_POST['company'];
					$dept = $_POST['dept']; 
					$bz=$_POST['bz'];
					
					// $date=date('Y-m-d', time());  //获取系统时间年月日
				//连接数据库
					$con = mysql_connect("localhost","root","123456");
					if(!$con){
					echo "<br/>数据库连接失败".mysql_error();
					}
				//选择数据库
					mysql_select_db("money");
					//设置mysql字符编码
					mysql_query("set names utf8;");
			
				// insert语句（插入income数据，新增）
					$insert2 = "insert into dept (company,name,bz) values('$company','$dept','$bz')";
					$res_insert = mysql_query($insert2);
					// if($res_insert){
					//  echo "<script>
					//   window.location.href='income_php.php?user=$user';
					//  </script>";
					// }
					// echo $htbh;
				 ?>
	</body>
	
</html>
