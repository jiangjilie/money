<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<title>更改</title>
		<link href='css/common.css' rel='stylesheet'/>
		<link href='css/easyui.css' rel='stylesheet'/>
		<link href='css/icon.css' rel='stylesheet'/>
		<script src='js/jquery-1.10.2.min.js'></script>
		<script src='js/layer/layer.js'></script>
		<script src="js/bootstrap-datepicker.js"></script>
		<script src="js/bootstrap-datepicker.zh-CN.js"></script>
		<script src="js/date.js" type="text/javascript"></script>
		<link href="css/datepicker3.css" rel="stylesheet"/>
		<link type="text/css" rel="stylesheet" href="css/image.css" />
		
		<link href="css/input/bootstrap.min.css" rel="stylesheet"/>
		<link href="css/input/font-awesome.min.css" rel="stylesheet"/>
		<link href="css/input/dataTables.bootstrap.css" rel="stylesheet"/>
		<link href="css/input/ionicons.min.css" rel="stylesheet"/>
		<link href="css/input/ace.min.css" rel="stylesheet"/>
		<link href="css/input/_all-skins.min.css" rel="stylesheet"/>
		<link href="css/input/toastr.min.css" rel="stylesheet"/>
		<link href="css/input/main.css" rel="stylesheet"/>
		<style>
			table {
			    width: 100%;
			}
			
			    table tr td {
			        /* border: 1.5px solid; */
			        height: 35px;
			        text-align: center;
			    }
			
			.datab-1 {
			    width: 10%;
				text-align:right;
			}
			
			.datab-2 {
			    width: 23%;
				/* border: 1.5px solid; */
			}
			
			h3 {
			    width: 100%;
			    text-align: center;
			}
		</style>
		 
		    <style>
		        .tdtitle {
		            color: black;
					font-size: 16px;
		        }
		
		        .txtarea {
		            width: 100%;
		            height: 60%;
		        }
		
		        .datafont {
		            font-family: 粗体;
		            font-size: 14px;
		        }
				.txtarea{
						border: 1px solid #95B8E7;
						color:black;
				}
		    </style>
		
			
	</head>
	<body>
		<div class="alldiv" style="height:500px;">
		<div class="imageShow" style="width:100%;border:1px solid #95B8E7">
		<div id='divinput' class='cyinputdiv' style='height:460px;'>
					<form method='post' action='dept_changephp.php' id='Form'>
		<?php
			//声明变量并接受form表单发送过来的数据
				$user= $_GET['user']; 
				$id = $_GET['id']; 
				$htbh = $_GET['htbh']; 
			echo"<input name='id' value='$id' id='_easyui_textbox_input9' type='text' style='display:none'>";
			// echo"<input name='user' value='$user' id='_easyui_textbox_input9' type='text' style='display:none'>";
			//连接数据库
				require("dbconfig.php");//导入配置文件
				$link = mysql_connect(HOST,USER,PASS)or die("数据库连接失败");//连接数据库
				mysql_select_db(DBNAME,$link);//选择数据库
				mysql_query("set names 'utf8'");//选择字符集							
				$sql = "select * from dept where id='$id'";//查询语句	
				$result=mysql_query($sql,$link);
				$row = mysql_fetch_assoc($result);
			
				echo"<section class='content'>
					<div class='row'>
						<!-- left column -->
						<div class='col-md-12'>
							<!-- general form elements -->
							<div class='box box-primary'>
								<!-- /.box-header -->
								<h3><span>部门信息修改表</span></h3>
								<table>
								   <tr>
									   <td class='datab-1 tdtitle'>所属公司</td>
										<td class='datab-2'>
											<select name='company' class='form-control' id='company' style='height:36px;outline:0;margin-top: -5px;color:black'>
												<option value='{$row['company']}'>{$row['company']}</option>			              		            
											</select>
										</td>
									   <td class='datab-1 tdtitle'>部门名称</td>
									   <td class='datab-2'><textarea class='txtarea' id='dept'name='dept'>{$row['name']}</textarea></td>
										<textarea class='txtarea' id=''name='ydept' style='display:none'>{$row['name']}</textarea>  
										<textarea class='txtarea' id=''name='ycompany' style='display:none'>{$row['company']}</textarea>  
								   </tr>
								   <tr>
								   <td class='datab-1 tdtitle'>备注</td>
								   <td colspan='3' class='datab-2'><textarea class='txtarea' id='bz'name='bz'>{$row['bz']}</textarea></td>
								   </tr>
									<tr>
										<td  colspan='7' style='text-align: center;'>
											<center>
										<a href='javascript:;' id='ok' class='easyui-linkbutton l-btn l-btn-small l-btn-plain' onclick='subForm();' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'>保存</span><span class='l-btn-icon icon-ok'>&nbsp;</span></span></a>
										<a href='javascript:;' id='exit' class='easyui-linkbutton l-btn l-btn-small l-btn-plain' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'>退出</span><span class='l-btn-icon icon-exit'>&nbsp;</span></span></a>
										</td>
									</tr>	
								</table>
								</form>
										</div>
										<!-- /.box -->
									</div>
									<!--/.col (left) -->
							
								</div>
								<!-- /.row -->
								</section>";
						if($row['kpmx']==''){
						 	echo" <script> document.getElementById('kpmx').style.display='none';</script>";
						 }
					
						?>
							</form>
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
						</script>
						<script>
							
							 $("ysk").blur(function() {
								  $("#Form").submit();
								 })
						function subForm(){
							var htbh = document.getElementById('dept').value;
									if(htbh==''){
									layer.alert('部门不能为空！', {
									icon: 5,
									title: '提示',
									end:function(){
										$('#htbh').focus();
										// return false;
									}
									});
									}
												
							if(htbh !='')
								$.ajax({					
								type:"post",			
								url:"dept_changephp.php",
								data: $('#Form').serialize(),
								cache: false,
								success: function (data) {
									 layer.alert('修改成功！', {
									 icon: 6,   //绿色笑脸
									 title: '提示',
									 end:function(){
									 					  var index = parent.layer.getFrameIndex(window.name);
									 					   parent.layer.close(index);
									 					 // layer.closeAll();
									 					 // window.location.href='dept.php';
									 }
									 });
							  }
							  });
						   }
						   $("#exit").click(function(){
							   var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
							   parent.layer.close(index); //
							   // window.location.reload();//刷新父页面
							   // layer.closeAll(); //关闭所有layer
							   })
						</script>
						<!-- <script>						
							var htze = document.getElementById("htze").value;
							var ysk = document.getElementById("ysk").value;
							var gsk = document.getElementById('gsk');   //获取元素div
							gsk.onclick = function(){   //给元素增加点击事件
								gsk.value=htze-ysk;
							};
							gsk.click(); 
							
							function money(){
							var htze = document.getElementById("htze").value;
							var ysk = document.getElementById("ysk").value;
							document.getElementById("gsk").value=htze-ysk;
									}
						</script> -->
						<script>
							/**
							 ** 减法函数，用来得到精确的减法结果
							 ** 说明:javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
							 ** 调用:accSub(arg1,arg2)
							 ** 返回值:arg1加上arg2的精确结果
							 **/
							function accSub (arg1, arg2) {
							  var r1, r2, m, n;
							  try {
							    r1 = arg1.toString().split('.')[1].length;
							  } catch (e) {
							    r1 = 0;
							  }
							  try {
							    r2 = arg2.toString().split('.')[1].length;
							  } catch (e) {
							    r2 = 0;
							  }
							  m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
							  n = (r1 >= r2) ? r1 : r2;
							  return ((arg1 * m - arg2 * m) / m).toFixed(n);
							}
							
							// 给Number类型增加一个mul方法，调用起来更加方便。
							Number.prototype.sub = function (arg) {
							  return accMul(arg, this);
							};
							
							
							function money(){
								
							var htze = document.getElementById("htze").value;
							var ysk = document.getElementById("ysk").value;
							var pattern = /\d/;
							if(!pattern.test(htze)&& htze!=""){
								layer.alert('请输入数字！', {
								icon: 5,
								title: '提示',
								end:function(){					
									$('#htze').focus();
									$('#htze').val("");
									
								}
								});
								return false
							}
							if(ysk!=""){
							if(!pattern.test(ysk)){
								layer.alert('请输入数字！', {
								icon: 5,
								title: '提示',
								end:function(){
									$('#ysk').focus();
									$('#ysk').val("");
								}
								});
								return false;
							}
							}
							document.getElementById("gsk").value=accSub(htze,ysk);
									}
						</script>
						<script>
							function add(){
								var htbh = document.getElementById("htbh").value;
								var xmbh = document.getElementById("xmbh").value;
								var xmmc = document.getElementById("xmmc").value;
								var dwmc = document.getElementById("dwmc").value;
								var htmc = document.getElementById("htmc").value;	
								layer.open({
								 type: 2,
								 area: ['1000px', '600px'],
								 skin: 'layui-layer-demo',
								 closeBtn: 1,
								 anim: 2,
								 shadeClose: true,
								 content: 'bill_dept.php?htbh='+htbh+'&xmbh='+xmbh+'&xmmc='+xmmc+'&dwmc='+dwmc+'&htmc='+htmc,
								// end:function(){
								// 	window.location.href="dept_change.php?id=<?php echo $id; ?>"
								// }
								});
							}
						</script>
						
				
	</body>

</html>
