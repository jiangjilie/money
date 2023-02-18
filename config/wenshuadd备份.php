<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width" />
<meta charset="utf-8">
	<title>档案录入</title>
</head>
<body>
	<center>
	<h3>文书录入</h3>
	<h4>
	<form method="get" action="wenshuaddphp.php">
		档案号<input type="text" name="DAH" value="<?php echo $DAH;?>">		
		年度<input type="text" name="ND" value="<?php echo $ND;?>">
		责任者<input type="text" name="ZRZ" value="<?php echo $ZRZ;?>">
		文号<input type="text" name="WH" value="<?php echo $WH;?>"><br>
		题名<input type="text" name="TM" value="<?php echo $TM;?>" size=60>		
		全宗号<select name="QZH">
				<option></option>
				<option value="32">032</option>
				<option value="226">226</option>
				<option value="391">391</option>
			  </select>
		保管期限<select name="BGQX">
					<option></option>
					<option value="永久">永久</option>
					<option value="长期">长期</option>
					<option value="短期">短期</option>
					<option value="30年">30年</option>
					<option value="10年">10年</option>
				</select>
		<input type="submit" value="查询并录入">
		</form>
		</h4>
		<table  width="70%" border="1" cellpadding="2" cellspacing="1">
			<tr>
				<th width="150px">档案号</th>
				<th width="50px">全宗号</th>
				<th width="50px">年度</th>
				<th width="150px">责任者</th>				
				<th width="150px">文号</th>
				<th nowrap>题名</th>
				<th width="50px">日期</th>
				<th width="50px">保管期限</th>
				<th width="40px">操作</th>
			</tr>
			<?php/*
				$DAH = $_GET['DAH']; 
				$QZH = $_GET['QZH'];
				$ND = $_GET['ND'];
				$WH = $_GET['WH'];
				$TM = $_GET['TM'];
				$ZRZ = $_GET['ZRZ'];
				$BGQX = $_GET['BGQX'];
				$YS = $_GET['YS'];
				$link = mysql_connect(localhost,root,123456)or die("数据库连接失败");//连接数据库
				mysql_select_db(dagl,$link);//选择数据库
				mysql_query("set names 'utf8'");//选择字符集
				$wherelist = array();//获取查询条件
					if(!empty($_GET['DAH'])){
						$wherelist[] = "DAH like '%{$_GET['DAH']}%'";
					}
					if(!empty($_GET['QZH'])){
						$wherelist[] = "QZH like '%{$_GET['QZH']}%'";
					}
					if(!empty($_GET['TM'])){
						$wherelist[] = "TM like '%{$_GET['TM']}%'";
					}
					if(!empty($_GET['ND'])){
						$wherelist[] = "ND like '%{$_GET['ND']}%'";
					}
					if(!empty($_GET['ZRZ'])){
						$wherelist[] = "ZRZ like '%{$_GET['ZRZ']}%'";
					}
					if(!empty($_GET['BGQX'])){
						$wherelist[] = "BGQX like '%{$_GET['BGQX']}%'";
					}
					if(!empty($_GET['WH'])){
						$wherelist[] = "WH like '%{$_GET['WH']}%'";
					}
				if(count($wherelist) > 0){         //组装查询条件
					$where = " where ".implode(' AND ' , $wherelist); 
				}
				$sql = "select * from wsdam {$where} order by DAH";//查询语句	

//select语句
	//$select = "select * from wsdam";
	//include'paging.php';//导入分页类
	//$rs=mysql_paging_query($sql,10);//替代$result=mysql_query($sal,$link)
	//mysql_paging_bar();				
	$res_select = mysql_query($sql);
	echo "<table width=70% align='center' border=1 >
	<tr>
	<td>档案号</td>
	<td>操作</td>
	<td>全宗号</td>
	<td>年度</td>
	<td>文号</td>
	<td>题名</td>
	<td>责任者</td>
	<td>保管期限</td>
	<td>页数</td>
	</tr>";
	while($row = mysql_fetch_row($res_select)){
	echo "<tr>
	<td>".$row[0]."</td>
	<td><a href='luru.php?DAH=$row[0]&QZH=$row[1]&ND=$row[2]&BGQX=$row[6]&YS=$row[7]&path=$row[8]'>录入</a></td>
	<td>".$row[1]."</td>
	<td>".$row[2]."</td>
	<td>".$row[3]."</td>
	<td>".$row[4]."</td>
	<td>".$row[5]."</td>
	<td>".$row[6]."</td>
	<td>".$row[7]."</td>
	</tr>";
	}
	echo "</table>";*/
?>

</body>
</html>
