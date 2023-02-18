<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width" />
		<meta charset="utf-8">
		<title>删除</title>	
		<script src="js/jquery-1.10.2.min.js"></script>
	</head>
	<body>
			<?php
			//声明变量并接受form表单发送过来的数据
			@$name = $_GET['name'];
			@$dept = $_GET['dept'];		
			@$company = $_GET['company'];
			
			
			//连接数据库
				$con = mysql_connect("localhost","root","123456");
				if(!$con){
				echo "<br/>数据库连接失败".mysql_error();
				}
			//选择数据库
				mysql_select_db("money");
				//设置mysql字符编码
				mysql_query("set names utf8;");	
				
				if($name=='' and  $dept=='' and $company=='' ){
						
						//从income中删除
						$del = "delete from user  ";
						$res_del =mysql_query($del);
						if($res_del){
							echo "<script>
							 window.location.href='user.php?user=$user';
							 </script>";
						}
				}
				
				$wherelist = array();//获取查询条件
					if(!empty($_GET['dept'])){
						$wherelist[] = "dept like '%{$_GET['dept']}%'";
					}
					if(!empty($_GET['name'])){
						$wherelist[] = "name like '%{$_GET['name']}%'";
					}
					if(!empty($_GET['company'])){
						$wherelist[] = "company like '%{$_GET['company']}%'";
					}
					
				if(count($wherelist) > 0){         //组装查询条件
					$where = " where ".implode(' AND ' , $wherelist); 
				}
				
			//从income 中删除
				$del = "delete from user $where";
				$res_del = mysql_query($del);
				if($res_del){
					echo "<script>
					 window.location.href='user.php?user=$user';
					 </script>";
				}
			
			 ?>
	    </body>
</html>