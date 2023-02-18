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
				<option value="32">32</option>
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
			<?php
				$DAH = $_GET['DAH']; 
				$QZH = $_GET['QZH'];
				$ND = $_GET['ND'];
				$WH = $_GET['WH'];
				$TM = $_GET['TM'];
				$ZRZ = $_GET['ZRZ'];
				$BGQX = $_GET['BGQX'];
				$YS = $_GET['YS'];
				$RQ = $_GET['RQ'];
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
				$sql = "select * from wsda {$where} order by DAH";//查询语句	

//select语句
	//$select = "select * from wsdam";
	include'paging.php';//导入分页类
	$rs=mysql_paging_query($sql,100);//替代$result=mysql_query($sal,$link)
	mysql_paging_bar();				
	//$rs= mysql_query($sql);
	echo "<table width=70% align='center' border=1 >
	<tr>
	<td>档案号</td>
	<td>操作</td>
	<td>全宗号</td>
	<td>年度</td>
	<td>文号</td>
	<td>责任者</td>
	<td>题名</td>
	<td>日期</td>
	<td>保管期限</td>
	</tr>";
	while($row = mysql_fetch_assoc($rs)){
	echo "<tr>
	<td>{$row['DAH']}</td>
	<td><a href='wenshuluru.php?DAH={$row['DAH']}&QZH={$row['QZH']}&ND={$row['ND']}&WH={$row['WH']}&RQ={$row['RQ']}&TM={$row['TM']}&ZRZ={$row['ZRZ']}&BGQX={$row['BGQX']}&YS={$row['YS']}&path={$row['path']}' target='_blank'>录入</a></td>
	<td>{$row['QZH']}</td>
	<td>{$row['ND']}</td>
	<td>{$row['WH']}</td>
	<td>{$row['ZRZ']}</td>
	<td>{$row['TM']}</td>
	<td>{$row['RQ']}</td>
	<td>{$row['BGQX']}</td>
	</tr>";
	}
	echo "</table>";
?>

</body>
</html>
