<html>
	<head>
		<meta charset="utf-8">
		<title>档案信息管理</title>
	</head>
	<body>
		<center>
			<?php  
				include("menu.php"); //导入导航栏  
				//1.导入配置文件 
					require("dbconfig.php");
				//2. 连接数据库，并选择数据库
					$link = @mysql_connect(HOST,USER,PASS)or die("数据库连接失败");
					mysql_select_db(DBNAME,$link);
				
				//3. 获取要修改的商品信息
					$sql = "select * from wsda where DAH='{$_POST['DAH']}'";
					$result = mysql_query($sql,$link);
				
				//4. 判断是否获取到要编辑的商品信息
					if($result && mysql_num_rows($result)>0){
						$shop = mysql_fetch_assoc($result);//解析出要修改的商品信息 
					}else{
						die("没有找到要修改的商品信息");
					}
			
			
			
			?>
			<h3>编辑档案<h3>
			<form action="action.php?action=update" enctype="multipart/form-data" method="post">
				<input type="hidden" name="DAH" value="<?php echo $shop['DAH']; ?>"/>
				<input type="hidden" name="oldpic" value="<?php echo $shop['pic']; ?>"/>
			<table border="0" width="300">
				<tr>
					<td>档案号：</td>
					<td><input type="text" name="DAH" value="<?php echo $shop['DAH']; ?>"/></td>
				</tr>
				<tr>
					<td align="right">类别：</td>
					<td>
						<select name="typeid">
						<?php 
							include("dbconfig.php");
							foreach($typelist as $k=>$v){
								$sd = ($shop['typeid']==$k)?"selected":"";//是否是当前的类型
								echo "<option value='{$k}' {$sd}>{$v}</option>";
							}
						?>
						</select>
					</td>
				</tr>
				<tr>
					<td align="right">单价：</td>
					<td><input type="text" name="price"  value="<?php echo $shop['price']; ?>"/></td>
				</tr>
				<tr>
					<td align="right">库存：</td>
					<td><input type="text" name="total"  value="<?php echo $shop['total']; ?>"/></td>
				</tr>
				<tr>
					<td align="right">图片：</td>
					<td><input type="file" name="pic"/></td>
				</tr>
				<tr>
					<td align="right" valign="top">描述：</td>
					<td><textarea rows="5" cols="20" name="note"><?php echo $shop['note']; ?></textarea></td>
				</tr>
				<tr>
					
					<td colspan="2" align="center">
						<input type="submit" value="修改"/>&nbsp;&nbsp;&nbsp;
						<input type="reset" value="重置"/>
					</td>
				</tr>
				<tr>
					<td align="right" valign="top">&nbsp;</td>
					<td><img src="./uploads/<?php echo $shop['pic']; ?>"/></td>
				</tr>
			</table>
			</form>
		</center>
	</body>
</html>