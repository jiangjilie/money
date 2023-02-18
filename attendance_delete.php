<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width" />
		<meta charset="utf-8">
		<title>收入合同删除</title>	
		<script src="js/jquery-1.10.2.min.js"></script>
	</head>
	<body>
			<?php
			//声明变量并接受form表单发送过来的数据
				$user = $_POST['user'];
				$id = $_POST['id'];			
			//连接数据库
				$con = mysql_connect("localhost","root","123456");
				if(!$con){
				echo "<br/>数据库连接失败".mysql_error();
				}
			//选择数据库
				mysql_select_db("money");
				//设置mysql字符编码
				mysql_query("set names utf8;");	
				$sql = "select * from attendance where id='$id' ";//查询语句
				$result=mysql_query($sql);
				$row = mysql_fetch_assoc($result);
				$name=$row["name"];
				// $dept=$row["dept"];
				$company=$row["company"];
				$date=$row["date"];
				$del = "update salary set qx='' where company='$company' and name='$name' and date='$date' ";
				mysql_query($del);
			//delete语句（删除数据）
				$del = "delete from attendance where id=$id";
				$res_del = mysql_query($del);
				
			
			 ?>
	    </body>
</html>