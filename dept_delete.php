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
				$sql = "select * from dept where id='$id'";//查询语句
				$result=mysql_query($sql);
				$row = mysql_fetch_assoc($result);
				$dept=$row["name"];
				$company = $row["company"];
			//delete语句（删除数据）
				$del = "delete from user where dept='$dept' and company='$company' ";
				mysql_query($del);
				
				$del = "delete from attendance  where dept='$dept' and company='$company'";
				mysql_query($del);
				$del = "delete from bonus  where dept='$dept' and company='$company'";
				mysql_query($del);
				$del = "delete from salary  where dept='$dept' and company='$company'";
				mysql_query($del);
				$del = "delete from social  where dept='$dept' and company='$company'";
				mysql_query($del);
				$del = "delete from gjj  where dept='$dept' and company='$company'";
				mysql_query($del);
				$del = "delete from subsidy  where dept='$dept' and company='$company'";
				mysql_query($del);
				$del = "delete from tax  where dept='$dept' and company='$company'";
				mysql_query($del);
				
				
				$del = "delete from dept where id=$id";
				mysql_query($del);
							
				
			 ?>
	    </body>
</html>