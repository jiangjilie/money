<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<link href="css/easyui.css" rel="stylesheet"/>
		<link href="css/icon.css" rel="stylesheet"/>	
		<script src="js/jquery-1.10.2.min.js"></script>
		<script src="js/image.js"></script>
		<script src="js/layer/layer.js"></script>
	</head>
	<body>
 <div id="tb" style="padding:5px;height:auto;background-color:#438eb9;color: white;" class="datagrid-toolbar">
 	<div id="divtoolbar" style="margin-bottom:5px">
		<form action="up_gjj.php" method="post" enctype="multipart/form-data" id='Form'>
			<div class="control-group">
				<label>Excel表格：</label>
				<input type="file"  name="file"  />			
				<input type="button" onclick="subForm();"  value="导入" />
				<input type="button" onclick="bback();"  value="退出" />
				<label>请选择数据所属时间：</label>
				<input type="month"  name="date" id="date"/>
				<label>请选择所属公司：</label>
				<select name="company" class="form-control" id="company" style="height:26px;outline:0;margin-top: -5px;color:black">
					<option value="<?php echo $company;?>"><?php echo $company;?></option>			              		            
				</select>
				</div>
		</form>
		</div>
		</div>
		<div style="margin: 8px;padding:2px;border:2px;background-color: ;">
		<center>步骤一：请严格将Excel按如图顺序排列顺序,<span style="color: red;">注意A,B,C,······,Q 各列的顺序</span>，有效数据是从<span style="color: red;">第A列第二行</span>开始读取</center>
		</div>
		<img title=''  style="width: 1200px;"src='images/gjj.png'>	
		</div>
		<div style="margin: 8px;padding:2px;border:2px;background-color: ;">
		<center>步骤二：若Excel格式不是.xls格式，请另存为<span style="color: red;">.xls格式</span>，如图所示，图片可拖拽，可鼠标滚轮放大查看<input type='button' onclick="wps()" value='WPS office'/><input type='button' onclick="ms()"value='MS office'/></center>
		</div>
		
		<div  id="imgdiv" class="dragAble"style="position:absolute;width:100%;height:100%;">
			<div style="position: absolute; width: 300px; height: 40px; z-index: 99; transform: rotate(30deg); font-family: 华文彩云; color: red; font-size: 36px; margin-left: 339.5px; margin-top: 462.31px;" id="sydiv"></div>		
		<img title=''    style='position:absolute;width: 1200px;;cursor:move;' id='imgpanel' onmouseover='dragObj=imgpanel;drag=1;this.style.cursor='move';' onmouseout drag='0' onmousewheel='return rollImg(this)' src='images/WPS.png'>	
			</div>
		</div>
		<script>
			$.ajax({
			type:"post",
			url:"company_data.php",
			data:"",
			cache: false,
			success: function (msg) {
				var data = eval("("+msg+")");
				var contents="";
				for(var i=0;i<data.length;i++){
					var keywords = data[i].keywords;
					// contents=contents+"<option>"+keywords+"</option>";	
					// contents=contents+"<option value='"+keywords+"'>"+keywords+"</option>";	
					$("#company").append("<option value='"+keywords+"'>"+keywords+"</option>");
				}
				// $("#company").html(contents);
			 },
			});
			function wps(){
			document.getElementById('imgpanel').src="images/WPS.png";
			
			}
			function ms(){
			document.getElementById('imgpanel').src="images/MS.png";
			}
			function bback(){
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);// 关闭子窗口
			}
		</script>
	</body>
	<script>
		function subForm(){
			var company = document.getElementById("company").value;
			if(company==''){
			layer.alert('请选择所属公司！', {
			icon: 5,
			title: '提示',
			end:function(){
				$('#company').focus();
				// return false;
			}
			});
			return false;
			}
			var date = document.getElementById("date").value;
			if(date==''){
			layer.alert('请选择数据所属时间！', {
			icon: 5,
			title: '提示',
			end:function(){
				$('#date').focus();
				// return false;
			}
			});
			return false;
			}
			$.ajax({
				type:"post",
				url:"isdate.php",
				data:"date="+date+"&company="+company,
				// dataType:"text",
				cache: false, 
				// dataType: "json",
				success: function(data){
					if(data==1){
						layer.alert('所选时间所选公司未导入工资表，请先导入工资表！', {
						icon: 5,
						title: '提示',
						end:function(){
							layer.closeAll();
							// return false;
						}
						});
						return false;
						}
					},
			})
		layer.open({
			 type: 1,
			 area: ['250px', '150px'],
			 skin: 'layui-layer-demo',
			 closeBtn: 1,
			 anim: 2,
			 shadeClose: true,
			 content: '<center><h4 style="padding:5px5px;magin:2px;">确定将数据导入到<span style="color:red;">公积金表</span>吗</h4></center>',
			 btn: ["确定", "取消"],
			 yes: function () {
			                    $("#Form").submit();
			                 },
			});
		}
	</script>
</html>
<?php
require("dbconfig.php");//导入配置文件
					$link = mysql_connect(HOST,USER,PASS)or die("数据库连接失败");//连接数据库
					mysql_select_db(DBNAME,$link);//选择数据库
					mysql_query("set names 'utf8'");//选择字符集
$tmp = $_FILES['file']['tmp_name'];
$date=$_POST['date'];
$nd = substr($date,0,4);
$yf = substr($date,5,2);
$yf=intval($yf);
$company=$_POST['company'];
if (empty($tmp)) {
    echo '';
    exit;
}
$save_path = "uploads/";
$filename = $save_path . date('Ymdhis') . ".xls"; //导入后的文件保存路径和名称
$file_type = $_FILES['file']['type'];
if ($file_type!='application/vnd.ms-excel') {
echo "
<script>
 layer.alert('选择的Excel文件有误,请将Excel另存为.xls格式', {
 icon: 5,
 title: '提示'
 });
</script>";
exit();

}
if (copy($tmp, $filename)) {

 require_once 'PHPExcel.php';
 
 require_once 'PHPExcel/IOFactory.php';
 
 require_once 'PHPExcel/Reader/Excel5.php';
 
   $objReader = PHPExcel_IOFactory::createReader('excel5');  //use Excel5 for 2003 format
   
   $excelpath=$filename; //excel文件的名称
   
   $objPHPExcel = $objReader->load($excelpath);
   
   $sheet = $objPHPExcel->getSheet(0);
   
   $highestRow = $sheet->getHighestRow();           //取得总行数
   
   $highestColumn = $sheet->getHighestColumn(); //取得总列数
   
   
   
 
   //逐行循环读取excel，并加入分隔符。
   
   for($j=2;$j<=$highestRow;$j++)                        //从第二行开始读取数据
   
   {
   
   $str="";
   
   for($k='A';$k<=$highestColumn;$k++)            //从A列读取数据
   
   {
   
   $str .=$objPHPExcel->getActiveSheet()->getCell("$k$j")->getValue().'|*|';//读取单元格
   
   }
   
   $str=mb_convert_encoding($str,'utf-8','auto'); 
   
   $strs = explode("|*|",$str);
   
   //var_dump($strs);exit;
   $hj=$strs[2]+$strs[3];
   
   $sql = "insert into gjj (company,date,nd,yf,dept,name,gjja,gjjb,bz,hj) values ('{$company}','{$date}','{$nd}','{$yf}','{$strs[0]}','{$strs[1]}','{$strs[2]}','{$strs[3]}','{$strs[4]}','$hj')";
 
   if(!mysql_query($sql)){  
   echo "
<script>
 layer.alert('导入失败！', {
 icon: 2,
 title: '提示'
 });
</script>";
 exit();
   
   }else{
   
   echo "
<script>
 layer.alert('导入成功！', {
 icon: 1,
 title: '提示'
 });
</script>";
   
   }
  $sql = "update salary set dept='{$strs[0]}',gjj='$hj' where date='$date' and name='{$strs[1]}' and company='$company' ";
  mysql_query($sql);
   }
}
 
 
 
?>