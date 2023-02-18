<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width" />
		<meta charset="utf-8">
		<title>文书档案查询</title>
	<link type="text/css" rel="stylesheet" href="css/image.css" />
	<link href="css/bootstrap.min.css" rel="stylesheet" />
	
	<!-- <link type="text/css" rel="stylesheet" href="css/table.css" /> -->
	<script src="js/jquery-1.10.2.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/Common.js"></script>
	<script src="js/layer/layer.js"></script>
	<script src="js/jquery-migrate-1.1.0.js"></script>
	<script src="js/jquery.jqprint-0.3.js"></script>
	<script src="js/image.js"></script>
	 <link rel="stylesheet" href="css/jquery.treeview.css" type="text/css"/>
	    <script src="js/jquery.treeview.js" type="text/javascript"></script>
	
	<script type="text/javascript">
	    $(document).ready(function(){
	        $("#treeview").treeview({
	            toggle: function() {
	                console.log("%s was toggled.", $(this).find(">span").text());
	            }
	        });
	    });
	</script>
	</head>
	<body>
	<div class="alldiv" style="height:1892px;">
		<div class="image-list" >
				<div class="image-table-title">
					<span>卷内目录</span>
				</div>
				<div style="color:black">
					<ul id="treeview" class="filetree">
					<li><span class="folder">
					<?php 
					$path = $_GET['path'];
					$pathtitle = substr($path,10,18);
					echo $pathtitle;
					 ?>
					 </span>
					<?php 
					function createDir($path = '.') 
					{ 
					if ($handle = opendir($path)) 
					{ 
					echo "<ul>"; 
					while (false !== ($file = readdir($handle))) 
					{ 
					if (is_dir($path.$file) && $file != '.' && $file !='..') 
					printSubDir($file, $path, $queue); 
					else if ($file != '.' && $file !='..') 
					$queue[] = $file; 
					} 
					printQueue($queue, $path); 
					echo "</ul>"; 
					} 
					} 
					function printQueue($queue, $path) 
					{ 
					foreach ($queue as $file) 
					{ 
					printFile($file, $path); 
					} 
					} 
					function printFile($file, $path) 
					{
					$DAH = $_GET['DAH'];
					$ND = $_GET['ND'];
					$WH = $_GET['WH'];
					$ZRZ = $_GET['ZRZ'];
					$TM = $_GET['TM'];
					$RQ = $_GET['RQ'];
					$BGQX = $_GET['BGQX'];
					$BZ = $_GET['BZ'];
					$file=substr($file,0,3);
					$number=intval($file);
					$number=$number-1;
					echo "<li ><a href='?DAH=$DAH&path=$path&page=$number&ND=$ND&WH=$WH&ZRZ=$ZRZ&TM=$TM&RQ=$RQ&BGQX=$BGQX&BZ=$BZ' ><span class='file'>$file</span></a></li>"; 
					} 
					function printSubDir($dir, $path) 
					{ 
					echo "<li><span class=\"toggle\">$dir</span>"; 
					createDir($path.$dir."/"); 
					echo "</li>"; 
					} 
					createDir($path); 
					?> 
					</div>
				</div> 				
		<div class="imageShow">
			<div  id="imgdiv" class="dragAble"style="position:absolute;width:100%;height:100%;">
				<div style="position: absolute; width: 300px; height: 40px; z-index: 99; transform: rotate(30deg); font-family: 华文彩云; color: red; font-size: 36px; margin-left: 339.5px; margin-top: 462.31px;" id="sydiv"></div>
				<!--startprint1-->
				<!--打印内容开始-->
				<?php
				$page=isset($_GET['page'])?$_GET['page']:0;//获取当前页数
				$imgnums = 1;    //设置每页显示图片最大张数
				$path=$_GET['path']; 	//图片保存的目录
				$handle = opendir($path);
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
					echo "<img  style='position:absolute;height:960px;cursor:move;' id='imgpanel' src=".$path."/".$array[$j]." onmouseover='dragObj=imgpanel;drag=1;this.style.cursor='move';' onmouseout drag='0' onmousewheel='return rollImg(this)'><br />";
					}
				
				?>
				<!--打印内容结束-->
				<!--endprint1-->
			</div>
		</div>
		<div class="image-table">
			<div class="image-table-title">
				<span>案卷信息</span>
			</div>
			<table width=100% border=0 >
				<tr class="image-table-tr">
					 <th width="100px" class="image-table-th" >档案号</th>
				</tr>
				<tr align=center>
					 <td class="image-table-td"><?php echo"$DAH";?></td>
				</tr>
				<tr class="image-table-tr">
					 <th width="100px" class="image-table-th">年度</th>
				</tr>
				<tr align=center>
					 <td class="image-table-td"><?php echo"$ND";?></td>
				</tr>
				<tr class="image-table-tr">
					 <th width="200px" class="image-table-th">文号</th>
				</tr>
				<tr align=center>
					 <td class="image-table-td"><?php echo"$WH";?></td>
				</tr>
				<tr class="image-table-tr">
					 <th width="200px" class="image-table-th">责任者</th>
				</tr>
				<tr align=center>
					 <td class="image-table-td"><?php echo"$ZRZ";?></td>
				</tr>
				<tr class="image-table-tr">
					 <th width="300px" class="image-table-th">文件题名</th>
				</tr>
				<tr align=center>
					 <td class="image-table-td"><?php echo"$TM";?></td>
				</tr>
				<tr class="image-table-tr">
					 <th width="50px" class="image-table-th">日期</th>
				</tr>
				<tr align=center>
					 <td class="image-table-td"><?php echo"$RQ";?></td>	
				</tr>
				<tr class="image-table-tr">
					 <th width="50px" class="image-table-th">保管期限</th>
				 </tr>
				 <tr align=center>
					 <td class="image-table-td"><?php echo"$BGQX";?></td>	
				  </tr>
				</table>
				<div class="pagechange">	
						<?php
						 $realpage = @ceil($i / $imgnums) - 1;
						 $Prepage = $page-1;
						 $Nextpage = $page+1;
						  if($Prepage<0){   //首页
							// echo "<a href=?DAH=$DAH&path=$path&XMMC=$XMMC&WH=$WH&ZRZ=$ZRZ&TM=$TM&RQ=$RQ&MJ=$MJ&BZ=$BZ class='imageHref'>上一页</a> ";
							echo "<a href='javascript:void(0);' class='imageHref'>上一页</a> ";
							echo "<a href=?DAH=$DAH&path=$path&page=$Nextpage&ND=$ND&WH=$WH&ZRZ=$ZRZ&TM=$TM&RQ=$RQ&BGQX=$BGQX&BZ=$BZ class='imageHref'>下一页</a> ";
						}elseif($Nextpage>$realpage){  //最末页
							echo "<a href=?DAH=$DAH&path=$path&page=$Prepage&ND=$ND&WH=$WH&ZRZ=$ZRZ&TM=$TM&RQ=$RQ&BGQX=$BGQX&BZ=$BZ class='imageHref'>上一页</a> ";
							// echo "<a href=?DAH=$DAH&path=$path&XMMC=$XMMC&WH=$WH&ZRZ=$ZRZ&TM=$TM&RQ=$RQ&MJ=$MJ&BZ=$BZ class='imageHref'>下一页</a> ";
							echo "<a href='javascript:void(re0);' class='imageHref'>下一页</a> ";
						}else{	//中间页
							echo "<a href=?DAH=$DAH&path=$path&page=$Prepage&ND=$ND&WH=$WH&ZRZ=$ZRZ&TM=$TM&RQ=$RQ&BGQX=$BGQX&BZ=$BZ class='imageHref'>上一页</a> ";
							echo "<a href=?DAH=$DAH&path=$path&page=$Nextpage&ND=$ND&WH=$WH&ZRZ=$ZRZ&TM=$TM&RQ=$RQ&BGQX=$BGQX&BZ=$BZ class='imageHref'>下一页</a> ";
						}
						?>
						<!-- <input type=button name='button_export' title='打印' onclick=preview(1) value=打印> -->
						<button type="button" class="btn btn-primary" onclick="imgToSize(50)"><span class="fa fa-search"></span>&nbsp;放大</button>
						<button type="button" class="btn btn-primary" onclick="imgToSize(-50)"><span class="fa fa-search"></span>&nbsp;缩小</button>
						<button type="button" class="btn btn-primary" onclick="Rotate()"><span class="fa fa-search"></span>&nbsp;旋转</button>
					</div>
					<div style="width=100%;height: 20%; position:relative;">
						<button type="button" class="btn btn-primary" onclick=preview(1)><span class="fa fa-search"></span>&nbsp;打印</button>
						<!-- <button type="button" class="btn btn-primary" id="print" onclick="window.open('image_pldy.php?<?php echo"DAH=$DAH&path=$path&ND=$ND&WH=$WH&ZRZ=$ZRZ&TM=$TM&RQ=$RQ&BGQX=$BGQX&BZ=$BZ";?>')"><span class="fa fa-search"></span>&nbsp;批量打印</button> -->
						<button type="button" class="btn btn-primary" id="print"><span class="fa fa-search"></span>&nbsp;批量打印</button>
					 </div>
	
		</div>
	</div>
	</body>
	<script>
		window.onload=function(){
			document.getElementById("print").onclick=function(){
				layer.open({
				  type: 2,
				  title: '批量打印界面',
				  shadeClose: true,
				  border: [0], //去掉默认边框
				  shade: false,
				  maxmin: false, //开启最大化最小化按钮
				  area: ['0px', '0px'],
				  content: 'image_pldy.php?<?php echo"DAH=$DAH&path=$path&ND=$ND&WH=$WH&ZRZ=$ZRZ&TM=$TM&RQ=$RQ&BGQX=$BGQX&BZ=$BZ";?>',
				  offset:"rb", //设置弹窗位置为右下
				});
			}
		}
	</script>
</html>