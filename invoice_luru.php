<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>发票录入</title>
		<link href="css/input/bootstrap.min.css" rel="stylesheet"/>
		<link href="css/input/font-awesome.min.css" rel="stylesheet"/>
		<link href="css/input/dataTables.bootstrap.css" rel="stylesheet"/>
		<link href="css/input/ionicons.min.css" rel="stylesheet"/>
		<link href="css/input/ace.min.css" rel="stylesheet"/>
		<link href="css/input/_all-skins.min.css" rel="stylesheet"/>
		<link href="css/input/toastr.min.css" rel="stylesheet"/>
		<link href="css/input/main.css" rel="stylesheet"/>
		   <!-- <link href="css/input/DaDetail.css" rel="stylesheet" /> -->
		   <link href="css/easyui.css" rel="stylesheet"/>
		   <link href="css/icon.css" rel="stylesheet"/>
		   		<script src="js/jquery-1.10.2.min.js"></script>
				<script src="js/layer/layer.js"></script>
		   <script src="js/bootstrap-datepicker.js"></script>
		   <script src="js/bootstrap-datepicker.zh-CN.js"></script>
		   <script src="js/date.js" type="text/javascript"></script>
		   <link href="css/datepicker3.css" rel="stylesheet"/>
		   
		   <link href="ajax-php/css/searchSuggest.css" type="text/css" rel="stylesheet" />
		   <script type="text/javascript" src="ajax-php/js/searchSuggest.js"></script>
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
		<?php $user = $_GET['user']; ?>
		<form method="get" action="invoice_luruphp.php" id="Form">
		  <section class="content">
				  <div class="row">
					  <!-- left column -->
					  <div class="col-md-12">
						  <!-- general form elements -->
						  <div class="box box-primary">
							  <!-- /.box-header -->
							  <h3><span>发票录入表</span></h3>
							 <table>
							   <tr>
							 	  <!-- <td class="datab-1 tdtitle">开票申请</td>
							 	  <td class="datab-2"><textarea class="txtarea" name="setting[kpsq]"></textarea></td> -->
							 	  <td class="datab-1 tdtitle">类别</td>
							 <td class="datab-2"><select name="setting[lb]" style="width: 100%;height: 60%;color:black" value="<?php echo $lb;?>">
							 				  <option><?php echo $lb;?></option>
							 				  <option value="软件">软件</option>
							 				  <option value="数据">数据</option>
							 				  <option value="运营">运营</option>
							 				  <option value="集成">集成</option>
							 				  <option value="其他">其他</option>
							 				</select></td>
							 	  <td class="datab-1 tdtitle">凭证号</td>
							 	  <td class="datab-2"><textarea class="txtarea" name="setting[pzh]"></textarea></td>
							 							
							 	  <td class="datab-1 tdtitle">开票日期</td>
							 	  <td class="datab-2"><span class="ace-calendar-picker" style="width:100%;">
							 					<div>
							 						<input  id="dpStart" placeholder="" autocomplete='off' name="kprq"  type="text" class="ace-calendar-picker-input ace-input"style="width: 100%;height: 60%;">
							 						<span class="ace-calendar-picker-icon">							
							 						</span>
							 						</div>
							 						</span></td>
								</tr>
								<tr>
							 	  <td class="datab-1 tdtitle">分管领导</td>
							 	  <td class="datab-2"><textarea class="txtarea" name="setting[fgld]"></textarea></td>
							 	  <td class="datab-1 tdtitle">开票申请人</td>
							 	  <td class="datab-2"><textarea class="txtarea" name="setting[sqr]"></textarea></td>
							  
							 	  <td class="datab-1 tdtitle">发票种类</td>
							 	  <td class="datab-2"><select name="setting[fpzl]" style="width: 100%;height: 60%;color:black" value="<?php echo $fpzl;?>">
							 				  <option><?php echo $fpzl;?></option>
							 				  <option value="普票">普票</option>
							 				  <option value="专票">专票</option>	 				
							 				</select></td>
								  </tr>
								  <tr>
							 	  <td class="datab-1 tdtitle">税率</td>
							 	  <td class="datab-2"><textarea class="txtarea" id='sl' onkeyup="slc()" name="setting[sl]"></textarea></td>
							 	  <td class="datab-1 tdtitle">发票号码</td>
							 	  <td class="datab-2"><textarea class="txtarea" name="setting[fphm]"></textarea></td>
							  
							 	  <td class="datab-1 tdtitle">开票单位</td>
							 	  <td class="datab-2"><textarea class="txtarea" name="setting[kpdw]"></textarea></td>
								  </tr>
								  <tr>
							 	  <td class="datab-1 tdtitle">开票内容</td>
							 	  <td  class="datab-2"><textarea class="txtarea" name="setting[kpnr]"></textarea></td>
							 	  <td class="datab-1 tdtitle">发票内容</td>
							 	  <td  class="datab-2"><textarea class="txtarea" name="setting[fpnr]"></textarea></td>
								  <td class="datab-1 tdtitle">金额</td>
								  <td class="datab-2"><textarea class="txtarea" id="je" onkeyup="money()" name="setting[je]"></textarea></td>
								  </tr>
								  <tr>
									
							 		<td class="datab-1 tdtitle">税额</td>
							 		<td class="datab-2"><textarea class="txtarea"id="se" onkeyup="money()" name="setting[se]"></textarea></td>
							 		<td class="datab-1 tdtitle">价税合计</td>
							 		<td class="datab-2"><textarea class="txtarea" id="jshj"   name="setting[jshj]"></textarea></td> 
									 <td class="datab-1 tdtitle">合同编号</td>
									 <td class="datab-2"><input style="width: 100%;height: 60%;color:black"type="text"name="setting[htbh]" autocomplete='off' value="" id="htbh" onblur="close()" />
									 					<ul class="datab-2" id="suggest_ul">
									 					</ul>
									 </td>
								 </tr>
								 <tr>
							 	 
							 	  <td class="datab-1 tdtitle">项目编号</td>
							 	  <td class="datab-2"><input style="width: 100%;height: 60%;color:black"type="text"name="setting[xmbh]" autocomplete='off' value="" id="xmbh" onblur="close()" /></td>
							
							 	<!--  <td class="datab-1 tdtitle">项目名称</td>
							 	  <td class="datab-2"><textarea class="txtarea" id='xmmc'name="setting[xmmc]"></textarea></td> -->
							 	<!--  <td class="datab-1 tdtitle">甲方单位</td>
							 	  <td class="datab-2"><textarea class="txtarea" id='jfdw'name="setting[jfdw]"></textarea></td>
							 	  <td class="datab-1 tdtitle">合同名称</td>
							 	  <td class="datab-2"><textarea class="txtarea" id='htmc'name="htmc"></textarea></td> -->
							 	  <td class="datab-1 tdtitle">备注</td>
							 	  <td class="datab-2"colspan=""><textarea class="txtarea" name="setting[bz]"></textarea></td>
							   </tr>  
								<tr>
									<td  colspan="7" style="text-align: center;">
										<center>
									<a href="javascript:;" id="ok" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" onclick="subForm();" ><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">保存</span><span class="l-btn-icon icon-ok">&nbsp;</span></span></a>
									<a href="javascript:;" id="exit" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" ><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">退出</span><span class="l-btn-icon icon-exit">&nbsp;</span></span></a>
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
			  </section>
			  <script>
				  function slc(){
				  	
				  var sl = document.getElementById("sl").value;
				  // alert("nihao");
				  	document.getElementById("sl").value=sl+"%";
				  }
			</script>
			  <script>
			
			  function close()	{
			  	setTimeout("$('#suggest_ul').hide();", 100);
			  }
				  
			  $("#suggest_ul").click(function(){   //选择合同编号自动补齐项目编号
				var htbh = $("#htbh").val();
				 $.ajax({
					 type:"post",
					 url:"getdata_xmbh.php",
					 data:"htbh="+htbh,
					 // dataType:"text",
					 cache: false, 
					 // dataType: "json",
					 success: function(data){
						 $("#xmbh").val(data);
						 }
					 });
				  })
			  </script>
			  <script>
				  /**
				   ** 加法函数，用来得到精确的加法结果
				   ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
				   ** 调用：accAdd(arg1,arg2)
				   ** 返回值：arg1加上arg2的精确结果
				   **/
				  function accAdd (arg1, arg2) {
				    var r1, r2, m, c;
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
				    c = Math.abs(r1 - r2);
				    m = Math.pow(10, Math.max(r1, r2));
				    if (c > 0) {
				      var cm = Math.pow(10, c);
				      if (r1 > r2) {
				        arg1 = Number(arg1.toString().replace('.', ''));
				        arg2 = Number(arg2.toString().replace('.', '')) * cm;
				      } else {
				        arg1 = Number(arg1.toString().replace('.', '')) * cm;
				        arg2 = Number(arg2.toString().replace('.', ''));
				      }
				    } else {
				      arg1 = Number(arg1.toString().replace('.', ''));
				      arg2 = Number(arg2.toString().replace('.', ''));
				    }
				    return (arg1 + arg2) / m;
				  }
				  
				  // 给Number类型增加一个add方法，调用起来更加方便。
				  Number.prototype.add = function (arg) {
				    return accAdd(arg, this);
				  };
			  	function money(){		
			  	var je = document.getElementById("je").value;
			  	var se = document.getElementById("se").value;
				var pattern = /\d/;
				if(!pattern.test(je)&& je!=""){
					layer.alert('请输入数字！', {
					icon: 5,
					title: '提示',
					end:function(){					
						$('#je').focus();
						$('#je').val("");
						
					}
					});
					return false
				}
				if(se!=""){
				if(!pattern.test(se)){
					layer.alert('请输入数字！', {
					icon: 5,
					title: '提示',
					end:function(){
						$('#se').focus();
						$('#se').val("");
					}
					});
					return false;
				}
				}
				document.getElementById("jshj").value=accAdd(je,se);
			  			}
			  </script>
		  <script src="js/input/jquery.dataTables.min.js"></script>
		  <script src="js/input/dataTables.bootstrap.min.js"></script>
		  <script src="js/input/layer.js"></script>
		  <script src="js/input/toastr.min.js"></script>
		  <script src="js/input/Common.js"></script>
				
	</body>
	<script>
		function subForm(){
			var htbh = document.getElementById('htbh').value;
					if(htbh==''){
					layer.alert('合同编号不能为空！', {
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
				url:"invoice_luruphp.php",
				 cache: false,  
				data: $('#Form').serialize(),
				success: function (data) {
					 layer.alert('保存成功！', {
					 icon: 6,   //绿色笑脸
					 title: '提示',
					 end:function(){
					 					  var index = parent.layer.getFrameIndex(window.name);
					 					   parent.layer.close(index);
					 					 // layer.closeAll();
					 					 // window.location.href='income.php';
					 }
					 });
			  }
			  });
		   }
		   $("#exit").click(function(){
			   var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
			   parent.layer.close(index); //再执行关闭
			   })
	</script>
	
</html>
