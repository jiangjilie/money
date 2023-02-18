<?php
	   $date=$_POST['date'];
	   $company=$_POST['company'];
	   	//数据库配置信息(用户名,密码，数据库名，表前缀等)
	   	require("dbconfig.php");//导入配置文件
	   	$link = mysql_connect(HOST,USER,PASS)or die("数据库连接失败");//连接数据库
	   	mysql_select_db(DBNAME,$link);//选择数据库
	   	mysql_query("set names 'utf8'");//选择字符集
	   	
	   $sql="select *  from salary where date='$date' and company='$company'  ";
	   $result = mysql_query($sql);
	   if (!mysql_num_rows($result)){
	            echo "1";
	        }
	?>

