<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width" />
		<meta charset="utf-8">
		<title>收入合同</title>
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
		<script src="js/jquery.treeview.js" type="text/javascript"></script>
		<style>
			.th-tr{
				text-align:center;
				background-color: #438eb9;
			}
		</style>
	</head>
	<?php
	 $name = $_GET['name'];
	 $dept = $_GET['dept'];
	 $phone = $_GET['phone'];
	
	 if($name=='' and  $dept=='' and $phone=='' ){
		 echo"
		 <center><h4 style='color:red;padding:5px5px;magin:2px;'>警告：此操作将清空表中所有数据，请谨慎操作</h4><br><h4>提示：若要删除指定数据，请在查询界面输入框中输入条件</center>
		 ";
		  return false;
	 }
	
	 ?>
	 <center><h4 style='color:red;padding:5px5px;magin:2px;'>确定删除以下</h4></center>
		<table  style="margin-left:28px ;border: 1px solid #ddd;" cellpadding="0"; cellspacing="1">
		<tr id="htbh">
			<td style='height:30px;width:65px;text-align:center'>姓名:</td>
			<td ><input type="text"  style="width: 400px;border: 0;" name="name" value="<?php echo $name;?>" readonly></td>
		</tr>
		<tr id="xmbh" style="display: ;">
		<td style='height:30px;width:65px;text-align:center'>部门:</td>
		<td ><input type="text"  style="width:  400px;border: 0;" name="dept" value="<?php echo $dept;?>" readonly></td>
		</tr>
		<tr id='xmmc'>
			<td style='height:30px;width:65px;text-align:center'>电话:</td>
			<td><textarea class='txtarea' name='phone' style="width:  400px;height: 24px;border: 0;"id='xmmc'readonly><?php echo $phone;?></textarea></td>
		</tr>
		
		</table>
		 <center><h4 style='color:red;padding:5px5px;magin:2px;'>在收入合同表中包含的数据吗？</h4></center>
		<?php
		if($name==''){
		 	echo" <script> document.getElementById('htbh').style.display='none';</script>";
		 }
		if($dept==''){
			echo" <script> document.getElementById('xmbh').style.display='none';</script>";
		}
		
		?>
		
</html>