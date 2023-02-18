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
					$id = $_POST['id'];
					$name = $_POST['name'];
					$yname = $_POST['yname'];
					$dept = $_POST['dept']; 
					$ydept=$_POST['ydept'];
					$company = $_POST['company']; 
					$ycompany = $_POST['ycompany']; 
					$zw = $_POST['zw'];
					$sfz = $_POST['sfz'];
					$phone = $_POST['phone'];
					$bank = $_POST['bank'];
					$rzsj = $_POST['rzsj'];
					$rzsj = str_replace("-",".",$rzsj);
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
					$sql = "select * from dept where name='$dept' and company='$company' ";//查询语句
					$result=mysql_query($sql);
					$row = mysql_fetch_assoc($result);
					if(!$row){
					$insert = "insert into dept (name,company) values('$dept','$company')";   //判断部门表中该公司有无所选部门，若没有则新增
					}
					mysql_query($insert);
				//updat语句 （更新数据）

				 $update="update user set name='{$name}',dept='{$dept}',zw='{$zw}',sfz='{$sfz}',phone='{$phone}',bank='{$bank}',rzsj='{$rzsj}',bz='{$bz}',company='{$company}' where id=$id";
				 mysql_query($update);
				 
				$update="update attendance set dept='$dept',company='$company',name='$name' where dept='$ydept' and company='$ycompany' and name='$yname'  ";
				mysql_query($update);
				$update="update bonus set dept='$dept',company='$company',name='$name' where dept='$ydept' and company='$ycompany' and name='$yname'  ";
				mysql_query($update);
				$update="update salary set dept='$dept',company='$company',name='$name' where dept='$ydept' and company='$ycompany' and name='$yname'  ";
				mysql_query($update);
				$update="update social set dept='$dept',company='$company',name='$name' where dept='$ydept' and company='$ycompany' and name='$yname'  ";
				mysql_query($update);
				$update="update subsidy set dept='$dept',company='$company',name='$name' where dept='$ydept' and company='$ycompany' and name='$yname'  ";
				mysql_query($update);
				$update="update tax set dept='$dept',company='$company',name='$name' where dept='$ydept' and company='$ycompany' and name='$yname'  ";
				mysql_query($update);
				 
				 ?>
	</body>
</html>
