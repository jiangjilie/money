<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width" />
		<meta charset="utf-8">
		<title>数据统计</title>
		<link href="css/bootstrap.min.css" rel="stylesheet" />
		<link href="css/font-awesome.min.css" rel="stylesheet"/>
		<link href="css/font-awesom.min.css" rel="stylesheet"/>
		<link href="css/sidebar-menu.css" rel="stylesheet"/>
		<link href="css/ace-rtl.min.css" rel="stylesheet"/>
		<link href="css/ace-skins.min.css" rel="stylesheet"/>
		<link href="css/common.css" rel="stylesheet"/>
		<link href="css/easyui.css" rel="stylesheet"/>
		<link href="css/icon.css" rel="stylesheet"/>
		<script src="js/jquery-1.10.2.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/Common.js"></script>
		<script src="js/layer/layer.js"></script>
		<script src="js/jquery-migrate-1.1.0.js"></script>
		<script src="js/jquery.jqprint-0.3.js"></script>
		<script src="js/image.js"></script>
		<link rel="stylesheet" href="css/jquery.treeview.css" type="text/css"/>
		<link rel="stylesheet" href="css/scrollbox.css" type="text/css"/>
		<script src="js/jquery.treeview.js" type="text/javascript"></script>
	</head>
		<body marginwidth="0" marginheight="0">			
			 <h2 style='font-size:20px;text-align:center;color:black'>年度月份统计表	</h2>					
						 <table id="dg" style="word-break:break-all; word-wrap:break-all" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%">
							<thead>
							  <tr style="background-color:#438eb9;color: #FFF;">
								<th class="tr-th" style="text-align:center;">年度</th>
								<th class="tr-th" style="text-align:center;">月份</th>
								<th class="tr-th" style="text-align:center;">基础工资</th>
								<th class="tr-th" style="text-align:center;">浮动工资</th>
								<th class="tr-th" style="text-align:center;">绩效总额</th>
								<th class="tr-th" style="text-align:center;">缺薪总额</th>
								<th class="tr-th" style="text-align:center;">考核总额</th>
								<th class="tr-th" style="text-align:center;">补贴总额</th>
								<th class="tr-th" style="text-align:center;">应发合计</th>
								<th class="tr-th" style="text-align:center;">公积金总额</th>
								<th class="tr-th" style="text-align:center;">养老总额</th>
								<th class="tr-th" style="text-align:center;">医疗总额</th>
								<th class="tr-th" style="text-align:center;">失业总额</th>
								<th class="tr-th" style="text-align:center;">个税总额</th>
								<th class="tr-th" style="text-align:center;">实发合计</th>
								<th class="tr-th" style="text-align:center;">操作</th>
							  </tr>
							 </thead>
							<tbody>
							<?php
							$con = mysql_connect("localhost","root","123456");
								if(!$con){
								echo "<br/>数据库连接失败".mysql_error();
								}
							//选择数据库
								mysql_select_db("money");
								//设置mysql字符编码
								mysql_query("set names utf8;");			
								
								
							
								
								$sql = "select nd,yf,sum(jc) as jc,sum(fd) as fd,sum(jx) as jx,sum(qx) as qx,sum(kh) as kh,sum(bt) as bt,sum(gjj) as gjj,sum(yal) as yal,sum(yil) as yil,sum(sy) as sy,sum(se) as se from salary group by date order by date ";//查询语句	;
								
								$result = mysql_query($sql);
								if (!mysql_num_rows($result)){
								 echo "<tr align='center'>";
								echo "<td  colspan='18' >表中无数据存在!</td>";
								// return false;					
								}
						 while($row = mysql_fetch_assoc($result)){
							$yfhj=$row['jc']+$row['fd']+$row['jx']-$row['qx']-$row['kh']+$row['bt'];
							$sfhj=$yfhj-$row['gjj']-$row['yal']-$row['yil']-$row['sy']-$row['se'];
							$yfhj=number_format($yfhj,2);
							$sfhj=number_format($sfhj,2);
							$yf=intval($row['yf']);	
							echo "<tr align='center'>";
							echo "<td  width='100px'>{$row['nd']}</td>";
							echo "<td  width='100px'>$yf</td>";
							echo "<td  width='150px'>{$row['jc']}</td>";
							echo "<td  width='150px'>{$row['fd']}</td>";
							echo "<td  width='150px'>{$row['jx']}</td>";
							echo "<td  width='150px'>{$row['qx']}</td>";
							echo "<td  width='150px'>{$row['kh']}</td>";
							echo "<td  width='150px'>{$row['bt']}</td>";
							echo "<td  width='150px'>$yfhj</td>";
							echo "<td  width='150px'>{$row['gjj']}</td>";
							echo "<td  width='150px'>{$row['yal']}</td>";
							echo "<td  width='150px'>{$row['yil']}</td>";
							echo "<td  width='150px'>{$row['sy']}</td>";
							echo "<td  width='150px'>{$row['se']}</td>";
							echo "<td  width='150px'>$sfhj</td>";			
							echo "<td  width='100px'>
							<a href='excel_data.php?date={$row['date']}' id='export' title='点击导出该年数据' onclick='('export')' class='easyui-menubutton l-btn l-btn-small l-btn-plain m-btn m-btn-small' data-options='menu:'#mmexport',iconCls:'icon-export'' group=''><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text' style='margin-right:15px'>导出</span><span class='l-btn-icon icon-export'>&nbsp;</span><span class='m-btn-line'></span></span></a>
							</td>";		
								echo "</tr>";
						 }					 
						 echo"</table>";
					?>	
					


</html>