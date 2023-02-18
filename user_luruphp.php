<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>收入合同录入</title>
		<script src="js/jquery-1.10.2.min.js"></script>
		
	</head>
	<body>
				<?php
				//声明变量并接受form表单发送过来的数据
					$user = $_POST['user'];			
					$dept = $_POST['dept']; 
					$company = $_POST['company']; 
					$zw = $_POST['zw'];
					$sfz = $_POST['sfz'];
					$phone = $_POST['phone'];
					$bank = $_POST['bank'];
					$rzsj = $_POST['rzsj'];
					$rzsj = str_replace("-",".",$rzsj);
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
					$sql = "select * from dept where name='$dept' and company='$company' ";//查询语句   
					$result=mysql_query($sql);
					$row = mysql_fetch_assoc($result);
					if(!$row){
					$insert = "insert into dept (name,company) values('$dept','$company')";   //判断部门表中该公司有无所选部门，若没有则新增
					}
					mysql_query($insert);
				// insert语句（插入user数据，新增）
					$insert = "insert into user (name,dept,zw,sfz,phone,bank,rzsj,bz,company) values('$name','$dept','$zw','$sfz','$phone','$bank','$rzsj','$bz','$company')";
					 mysql_query($insert);
					// if($res_insert){
					//  echo "<script>
					//   window.location.href='user_php.php?user=$user';
					//  </script>";
					// }
					// echo $htbh;
				 ?>
	</body>
	
</html>
