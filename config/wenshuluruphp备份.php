<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
	<title>档案录入</title>
<!-- <script language="javascript">
function rollImg(o){
    /* 获取当前页面的缩放比
        若未设置zoom缩放比，则为默认100%，即1，原图大小
    */ 
    var zoom=parseInt(o.style.zoom)||100;
    /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom
        wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动
    */
    zoom+=event.wheelDelta/12;
    /* 如果缩放比大于0，则将缩放比加载到页面元素 */
    if (zoom>0) o.style.zoom=zoom+'%';
    /* 如果缩放比不大于0，则返回false，不执行操作 */
    return false;
}
</script> -->
</head>
<body>
	<center>
		<div style="text-align: center;">
		<div id="box1">
			<form action="wenshuluruphp.php" method="get">
				<b class="p1">档案号: </b><input type="text" name="DAH" value="<?php echo $_GET['DAH'];?>">
				<b class="p1">年度：<input type="text" name="ND" value="<?php echo $_GET['ND'];?>">
				<b class="p1">文号：</b><input type="text" name="WH" value="<?php echo $_GET['WH'];?>"><br>
				<b class="p1">责任者：<input type="text" name="ZRZ" value="<?php echo $_GET['ZRZ'];?>">
				<b class="p1">日期：</b><input type="text" name="RQ"  value="<?php echo $_GET['RQ'];?>">
				<b class="p1">保管期限：<input type="text" name="BGQX" value="<?php echo $_GET['BGQX'];?>"><br>
				<b class="p1">题名：</b><input type="text" name="TM" size=100 value="<?php echo $_GET['TM'];?>"><br>
				<b class="p1"><input type="hidden" name="YS" value="<?php echo $_GET['YS'];?>">
				<b class="p1"><input type="hidden" name="path" value="<?php echo $_GET['path'];?>">
				<input type="submit" value="保存" id="input1">
			</form>
		</div>
	</div>
	<?php
//声明变量并接受form表单发送过来的数据
	$DAH = $_GET['DAH']; 
	$QZH = $_GET['QZH'];
	$ND = $_GET['ND'];
	$WH = $_GET['WH'];
	$TM = $_GET['TM'];
	$ZRZ = $_GET['ZRZ'];
	$RQ = $_GET['RQ'];
	$BGQX = $_GET['BGQX'];
	$YS = $_GET['YS'];
	$path = $_GET['path'];

//连接数据库
	$con = mysql_connect("localhost","root","123456");
	if(!$con){
	echo "<br/>数据库连接失败".mysql_error();
	}
//选择数据库
	mysql_select_db("dagl");
	//设置mysql字符编码
	mysql_query("set names utf8;");
/*insert语句（插入数据，新增）
	$insert = "insert into wsda (DAH,QZH,ND,WH,TM,ZRZ,BGQX,YS,path) values ('$DAH','$QZH','$ND','$WH','$TM','$ZRZ','$BGQX','$YS','$path1')";
	$res_insert = mysql_query($insert);
	if($res_insert){
	echo "<br/>新增成功";
	}
*/

//updat语句 （更新数据）
 $update="update wsda set WH='{$WH}',TM='{$TM}',ZRZ='{$ZRZ}',RQ='{$RQ}',ND='{$ND}' where DAH='{$DAH}'";
 $res_update=mysql_query($update);
 if($res_update){
	 echo "<br/>保存成功";
 }

//echo "<a href='image2.php?path3=path2>查看图片</a>"



/*select语句
	$select = "select * from wsdam";
	$res_select = mysql_query($select);
	echo "<table width=70% align='center' border=1 ><tr><td>档案号</td><td>全宗号</td><td>年度</td><td>文号</td><td>题名</td><td>责任者</td><td>保管期限</td><td>页数</td></tr>";
	while($row = mysql_fetch_row($res_select)){
	echo "<tr><td>".$row[0]."</td><td>".$row[1]."</td><td>".$row[2]."</td><td>".$row[3]."</td><td>".$row[4]."</td><td>".$row[5]."</td><td>".$row[6]."</td><td>".$row[7]."</td></tr>";
	}
	echo "</table>";
*/
?>
<?php
	$page=isset($_GET['page'])?$_GET['page']:0;//获取当前页数
    $imgnums = 100;    //设置每页显示图片最大张数
    $path2=$_GET['path']; //图片保存的目录
    $handle = opendir($path2);
    $i=0;
    while (false !== ($file = readdir($handle))) {//遍历该图片所在目录 
       list($filesname,$ext)=explode(".",$file);//获取扩展名
       if($ext=="gif" or $ext=="jpg" or $ext=="JPG" or $ext=="GIF" ) {//文件过滤  
           if (!is_dir('./'.$file)) {//文件夹过滤
              $array[]=$file;//把符合条件的文件名存入数组
              ++$i;//记录图片总张数 
           }
       }
    }
    for($j=$imgnums*$page; $j<($imgnums*$page+$imgnums)&&$j<$i; ++$j){//循环条件控制显示图片张数
       echo '<div style="width:100%;hight:50%" >';
       //echo $array[$j],'<br />';
	   echo "<a href=".$path."/".$array[$j]."><br />";
       echo "<img src=".$path."/".$array[$j]."  style='height:960px'  onmousewheel='return rollImg(this)'><br />";
       echo '</div>';
    }

?>



</body>
</html>
