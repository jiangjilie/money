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
					$setting = $_POST['setting'];
					$date = $setting['date'];
					$nd = substr($date,0,4);
					$yf = substr($date,5,2);
					$yf=intval($yf);
					$jx=$setting['xz']+$setting['sc']+$setting['xm']+$setting['zl']+$setting['rj']+$setting['sj']+$setting['jc']+$setting['jt'];
					$jj=$jx+$setting['qy']+$setting['jl'];
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
				$fields=array('date','name','dept','xz','sc','xm','zl','rj','sj','jc','jt','qy','jl','bz');//这个是特意设置校验字典，校验提交的字段是否存在
				   	// $sql = '';
				   foreach($setting as $k=>$v) {
				            if(in_array($k, $fields)) $sql .= ",$k='$v'";
				        }
				 $sql = substr($sql, 1);
				 $sql="UPDATE bonus SET $sql,date='{$date}',yf='{$yf}',nd='{$nd}',jx='{$jx}',jj='{$jj}' WHERE id=$id";
				 mysql_query($sql);
				
				 
				 ?>
	</body>
</html>
