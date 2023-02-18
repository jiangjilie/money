<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width" />
		<meta charset="utf-8">
		<title></title>
		<link href="css/bootstrap.min.css" rel="stylesheet" />
		<!-- <link href="css/font-awesome.min.css" rel="stylesheet"/>
		<link href="css/font-awesom.min.css" rel="stylesheet"/> -->
		<link href="css/ace-rtl.min.css" rel="stylesheet"/>
		<link href="css/ace-skins.min.css" rel="stylesheet"/>
		<link href="css/common.css" rel="stylesheet"/>
		<link href="css/easyui.css" rel="stylesheet"/>
		<link href="css/icon.css" rel="stylesheet"/>
		<link href="css/select2.min.css" rel="stylesheet"/>
		<script src="js/Common.js"></script>
		<script src="js/jquery-1.10.2.min.js"></script>
		<script src="js/layer/layer.js"></script>
		<link rel="stylesheet" href="css/jquery.treeview.css" type="text/css"/>
		<script src="js/jquery.treeview.js" type="text/javascript"></script>
		<!-- <link href="css/scrollbox.css" rel="stylesheet"/> -->
		<link href="Content/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
		<link href="Content/bootstrap-table/bootstrap-table.min.css"  rel="stylesheet" />
		<script src="js/bootstrap-datepicker.js"></script>
		<script src="js/bootstrap-datepicker.zh-CN.js"></script>
		<script src="js/date.js" type="text/javascript"></script>
		<link href="css/datepicker3.css" rel="stylesheet"/>
		<link href="ajax-php/css/searchSuggest.css" type="text/css" rel="stylesheet" />
		 <script type="text/javascript" src="ajax-php/js/searchSuggest.js"></script>
		 <script type="text/javascript" src="js/select2.min.js"></script>
		<!-- <link href="Content/bootstrap-table/extensions/fixed-column/bootstrap-table-fixed-columns.css"  rel="stylesheet" /> -->
				   <!-- 解决bootstrapTable中的width值设置无效的问题   table-layout:fixed意思是固定的，即width设置为多少bootstrapTable就显示多宽-->
		<!-- <style type="text/css">		
		 .table {table-layout:fixed;}    
		</style> -->
		<style>
			.th-tr{
				text-align:center;
				background-color: #438eb9;
			}
		
		</style>
		<style>
		/*定义类名为.thead-blue的样式*/
		.table td {
		text-align: center;
		}
		.th-inner {
			height:42px;
			background-color: #438eb9;
			    color: #FFF;
			border: 1px solid #438eb9;
			text-align: center;
		}
		.columns{
			display: none;
		}
		.ace-calendar-picker{
			display: block;
			    width: 100%;
			    height: 34px;
			    padding: 6px 12px;
			    font-size: 16px;
			    line-height: 1.42857143;
			    color: #555;
			    background-color: #fff;
			    background-image: none;
			    border: 1px solid #ccc;
			    border-radius: 4px;
		}
		/* 改变排序图标 */
		.fixed-table-container thead th .sortable{      
		    background-image:url('images/sort.png');cursor:pointer;background-position:right;background-repeat:no-repeat;padding-right:30px
		    }
		    .fixed-table-container thead th .asc{
		    background-image:url('images/sort_asc.png');cursor:pointer;background-position:right;background-repeat:no-repeat;padding-right:30px
		    }
		    .fixed-table-container thead th .desc{
		    background-image:url('images/sort_desc.png');cursor:pointer;background-position:right;background-repeat:no-repeat;padding-right:30px
		    }
			
			.l-btn-left-1{
				margin-left:-21px;
				padding:0;
			}
			.dropdown-menu {
				width:92px;
				min-width: 68px;
				padding:0;
			}
			.l-btn-text-1{
				display: inline-block;
				vertical-align: top;
				width: auto;
				line-height: 24px;
				font-size: 12px;
				padding: 0;
				margin-left:4px;
			}
			.datepicker{
				width:14%;
			}
		</style>
	</head>
		<body marginwidth="0" marginheight="0">

			<div class="col-sm-12">
			     <div class="box box-primary">
			         <div class="panel-body form-horizontal">					
						<form method="get" action="user_php.php" id="Form">
													<fieldset>
						             <div class="form-group">
														  <div class="col-sm-2" style="width:106px">
														  	<span class="form-control" style="border:0px;">
														            所属公司
														     </span>
														    </div>		              		 
														    <div class="col-sm-2">
														          <select name="company" onchange="func()" class="form-control" id="company" style="height:36px;outline:0;margin-top: -5px;">
														             <option value="">全部</option>			              		         
														          </select>
														    </div>
															<div class="col-sm-1"></div>
						         		<div class="col-sm-2" style="width:80px">
						         			<span class="form-control" style="border:0px;">
						         		          部门
						         		   </span>
						         		  </div>		              		 
						         		  <div class="col-sm-2">
						         		        <select name="dept" class="form-control" id="dept" style="height:36px;outline:0;margin-top: -5px;">
						         		            <option value="">所有部门</option>			              		            
						         		        </select>
						         		  </div>
															<div class="col-sm-1"></div>
						         		 <div class="col-sm-2" style="width:80px;display: none;" >
															<span class="form-control" style="border:0px;">
						         		           姓名
						         		       </span>
						         		   </div>		              		 
						         		   <div class="col-sm-2" style="width:80px;display: none;" >
						         		       <input type="text" id="name" class="form-control" name="name" value="<?php echo $name;?>">
						         		   </div>
													  <div class="col-sm-2" style="width:106px">
													  	<span class="form-control" style="border:0px;">
													            年度
													     </span>
													    </div>		              		 
													    <div class="col-sm-2">
													           <input type="text" id="nd" class="form-control" name="nd" value="<?php echo $nd;?>">
													    </div>
													</div>
													<div class="form-group">
														<div class="col-sm-2" style="width:106px">
														<span class="form-control" style="border:0px;">
														          日期
														      </span>
														  </div>		              		 
														  <div class="col-sm-2">
														      <input type="month" id="yf" class="form-control" name="yf" >
														  </div>		                   			 
													</div>	 						  
						         </fieldset>
						         <fieldset>
						             <div class="form-group">
						                 <div style="float: right;">
						         									  <button type="button" id="button" style="background-color: #428BCA !important;border-color: #428BCA;border: 5px solid #FF" class="btn btn-primary" ><span class="fa fa-search" style="border: 5px solid #FF"></span>&nbsp;查询</button>		
						         									<!-- <a href="javascript:;" id="export" title="导出查询数据" onclick="excel()" class=" l-btn l-btn-small l-btn-plain"  group=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">导出查询</span><span class="l-btn-icon icon-export">&nbsp;</span></span></a>								 -->
						         									<a href="data.php" id="exit" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" ><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">按姓名查看</span><span class="l-btn-icon icon-exit">&nbsp;</span></span></a>
						         									 <!-- <a href="javascript:;" title="刷新" onclick="ifram()" class="l-btn l-btn-small l-btn-plain" group="" id="onload"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">刷新</span><span class="l-btn-icon pagination-load">&nbsp;</span></span></a>																	 	 -->
						         								  </div>			                  							  							 							  
						         							  </div>
						         							  </div>
						         </fieldset>			
						    </div>
						</div>
				 <div style="display: ;" id='table_xmbh'>
					 <center><h2 style='font-size:25px;text-align:center'>年度表</h2></center>
		<table style="word-break:break-all; word-wrap:break-all;" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%"id="tb_user" >
					<thead>
					  <tr style="background-color:#438eb9;color: #FFF;">
						<th class="tr-th" style="text-align:center">年度</th>
						<!-- <th class="tr-th" style="text-align:center">姓名</th> -->
						<th class="tr-th" style="text-align:center">公司</th>
						<!-- <th class="tr-th" style="text-align:center">部门</th> -->
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
				<tr>
					<td colspan='18' style="text-align:center;">表中无数据存在！</td>
				</tr>
				</table>
			</div>
				<center><h2 style='font-size:25px;text-align:center'>月度表</h2></center>
				<table id="dg" style="word-break:break-all; word-wrap:break-all;" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%">
								<!-- <caption style='font-size:25px;text-align:center'>项目收支详细表</caption> -->
								<thead>
								  <tr style="background-color:#438eb9;color: #FFF;">
									<th class="tr-th" style="text-align:center">年度</th>
									<th class="tr-th" style="text-align:center">月份</th>
									<!-- <th class="tr-th" style="text-align:center">姓名</th> -->
									<th class="tr-th" style="text-align:center">公司</th>
									<!-- <th class="tr-th" style="text-align:center">部门</th> -->
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
									<!-- <th class="tr-th" style="text-align:center;">操作</th>										 -->
								  </tr>
					            </thead>
								<tr>
									<td colspan='19' style="text-align:center;">表中无数据存在！</td>
								</tr>
								</table>
				</div>
				<!-- <script src="Content/jquery-1.10.2.min.js"></script> -->
				<script src="Content/bootstrap/js/bootstrap.min.js"></script>
				<script src="Content/bootstrap-table/bootstrap-table.min.js"></script>
				<script src="Content/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
				<!-- <script src="Content/bootstrap-table/extensions/fixed-column/bootstrap-table-fixed-columns.js"></script>
				<script type="text/javascript" src="Content/bootstrap-table/extensions/resizable/bootstrap-table-resizable.js"></script> -->
			<script type="text/javascript" src="js/colResizable-1.6.js"></script>
			<script>
				 $('#dept').select2();
					$.ajax({
					type:"post",
					url:"dept_data.php",
					data:"",
					cache: false,
					success: function (msg) {
						var data = eval("("+msg+")");
						var contents="";
						for(var i=0;i<data.length;i++){
							var keywords = data[i].keywords;
							// contents=contents+"<option>"+keywords+"</option>";	
							// contents=contents+"<option value='"+keywords+"'>"+keywords+"</option>";	
							$("#dept").append("<option value='"+keywords+"'>"+keywords+"</option>");
						}
						// $("#dept").html(contents);
					 },
					});
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
						// $("#dept").html(contents);
					 },
					});
					function func(){    					//select改变时触发所选公司对应部门
						$('#dept option').not('option:first').remove(); //移除第一个之外的其他选项
					    var company = $("#company option:selected").val();
					    $.ajax({
					    type:"post",
					    url:"dept_data.php",
					    data:"company="+company,
					    cache: false,
					    success: function (msg) {
					    	var data = eval("("+msg+")");
					    	var contents="";
					    	for(var i=0;i<data.length;i++){
					    		var keywords = data[i].keywords;
					    		// contents=contents+"<option>"+keywords+"</option>";	
					    		// contents=contents+"<option value='"+keywords+"'>"+keywords+"</option>";	
					    		$("#dept").append("<option value='"+keywords+"'>"+keywords+"</option>");
					    	}
					    	// $("#dept").html(contents);
					     },
					    });
					}
			</script>
				<script>
					
					window.onload=function(){
					document.getElementById("button").click();
					
					}
				//do sarch-------------------------------------总表--------------------------------------
				$("#button").click(function(){
					 $('#tb_user').bootstrapTable('destroy'); //动态加载表格之前，先销毁表格
						var dept = $("#dept").val();
						var name = $("#name").val();
						var nd = $("#nd").val();
						var yf = $("#yf").val();
						var company = $("#company").val();
									
						var search= "dept=" + dept + "&name=" + name+ "&nd=" + nd+ "&yf=" + yf+"&company="+company ;
							$.ajax({
						
							type:"post",
							
							url:"data_bynd.php",
				
							data: search,//提交到demo.php的数据
							 cache: false,   
				
							// error:function()
							
							// {alert("错误 !")},
							
							success:function(msg){
											// console.log(msg); 
											// alert(msg);
											var   data = eval("("+msg+")"); //将返回的json数据进解析，并赋给data									
												
												$('#tb_user').bootstrapTable({
												                    data: data,                         //直接从本地数据初始化表格
												                    method: 'get',                      //请求方式（*）
												                    toolbar: '#toolbar',                //工具按钮用哪个容器
																	 // theadClasses: "thead-blue",//设置thead-blue为表头样式
												                    striped: true,                      //是否显示行间隔色
												                    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
												                    pagination: true,                   //是否显示分页（*）
												                    sortable: true,                     //是否启用排序
																	sort: 'xmbh', //要排序的字段
												                    sortOrder: "desc",                   //排序方式 倒序
												                    queryParams: function (params) {
												                        return params;
												                    },                                  //传递参数（*）
												                    sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
												                    pageNumber: 1,                      //初始化加载第一页，默认第一页
												                    pageSize: 5,                       //每页的记录行数（*）
												                    pageList: [5,10,20],        //可供选择的每页的行数（*）
																	paginationPreText:"上一页",
																	paginationNextText:"下一页",
																	resizable: true,
												                    // search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
												                    strictSearch: true,
												                    showColumns: true,                  //是否显示所有的列
												
												                    // showRefresh: true,                  //是否显示刷新按钮
												                    minimumCountColumns: 2,             //最少允许的列数
												                    // height:300,
																	
												            selectItemName: 'parentItem',
															 clickToSelect : true, // 是否启用点击选中行
												                    // fixedColumns: true, 				//是否冻结列
												                    // fixedNumber: 10,						//冻结列数
												                    //注册加载子表的事件。注意下这里的三个参数！
												                    onExpandRow: function (index, row, $detail) {
												                        InitSubTable(index, row, $detail);
												                    },
												                    columns: [
																		// {
												      //                   checkbox: true,
																		// visible: true
												      //               },
																	{
																	                        field: 'nd',
																	                        title: '年度',
																	// width:50,
																	sortable : true
																	                        
																	                    },
																						{
																							field: 'company',
																							title: '公司',
																	// width:50,
																	sortable : true
																						                        
																						},
																						{
																	                        field: 'jc',
																	                        title: '基础工资',
																	// width:50,
																	// sortable : true
																	                        
																	                    }, {
																	                        field: 'fd',
																	                        title: '浮动工资',
																	// width:100,
																						// sortable : true     
																	                    }	,  {
																	                        field: 'jx',
																	                        title: '绩效总额',
																	// width:150
																	                    }, {
																	                        field: 'qx',
																	                        title: '缺薪总额',
																	// width:150
																	                    }, 	{
																	                        field: 'kh',
																	                        title: '考核总额',
																	// width:150
																	                    }, {
																	                        field: 'bt',
																	                        title: '补贴总额',
																	                    }, {
																	                        field: 'yfhj',
																	                        title: '应发合计',
																	                    }, {
																	                        field: 'gjj',
																	                        title: '公积金总额',
																	                    }, {
																	                        field: 'yal',
																	                        title: '养老总额',
																	                    }, {
																	                        field: 'yil',
																	                        title: '医疗总额',
																	                    }, {
																	                        field: 'sy',
																	                        title: '失业总额',
																	                    }, {
																	                        field: 'se',
																	                        title: '个税总额',
																	                    }, {
																	                        field: 'sfhj',
																	                        title: '实发合计',
																	                    },{
																	                        title: '操作',
																	// width:140,
																	                        formatter: function (value, row, index) {//这里的三个参数：value表示当前行当前列的值；row表示当前行的数据；index表示当前行的索引（从0开始）。
																								var html = '<a href="javascript:;" onclick="detail_nd(\''+row.nd+'\',\''+row.company+'\')" title="导出详细记录" class=" l-btn l-btn-small l-btn-plain"  group=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text"></span><span class="l-btn-icon icon-export">&nbsp;</span></span></a>';
																	                            return html;
																	                        },
																							
																	                    }],
																	formatNoMatches: function () {  //没有匹配的结果
																	            return '无符合条件的记录';
																	           // return "<img src='图片路径' style='设置图片样式'>"
																	  },
																	  onLoadError:function(){
																		  console.info("无数据");
																	  },
												          
				
												                });
																				
											$('#tb_user').colResizable({
											         liveDrag:true,//拖动列时更新表布局
											         gripInnerHtml:"<div class='grip'></div>",
											         draggingClass:"dragging",
											         resizeMode:'overflow',//允许溢出父容器
													partialRefresh:true,  //ajax 的部分页面刷新内部
											     });		
											}
												});
			///////////////////////////////////////////////收支详细表///////////////////////////////////////////////////////////////////////
						$('#dg').bootstrapTable('destroy'); //动态加载表格之前，先销毁表格
												var dept = $("#dept").val();
												var name = $("#name").val();
												var nd = $("#nd").val();
												var yf = $("#yf").val();
												var company = $("#company").val();
															
												var search= "dept=" + dept + "&name=" + name+ "&nd=" + nd+ "&yf=" + yf+"&company="+company ;
													$.ajax({
												
													type:"post",
													
													url:"data_byyf.php",
										
													data: search,//提交到demo.php的数据
													 cache: false,   
										
													// error:function()
													
													// {alert("错误 !")},
													
													success:function(msg){
																	// console.log(msg); 
																	// alert(msg);
																	var   data = eval("("+msg+")"); //将返回的json数据进解析，并赋给data									
																		
																		$('#dg').bootstrapTable({
																							data: data,                         //直接从本地数据初始化表格
																							method: 'get',                      //请求方式（*）
																							toolbar: '#toolbar',                //工具按钮用哪个容器
																							 // theadClasses: "thead-blue",//设置thead-blue为表头样式
																							striped: true,                      //是否显示行间隔色
																							cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
																							pagination: true,                   //是否显示分页（*）
																							sortable: true,                     //是否启用排序
																							sort: 'htbh', //要排序的字段
																							sortOrder: "desc",                   //排序方式 倒序
																							queryParams: function (params) {
																								return params;
																							},                                  //传递参数（*）
																							sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
																							pageNumber: 1,                      //初始化加载第一页，默认第一页
																							pageSize: 5,                       //每页的记录行数（*）
																							pageList: [5,10,20],        //可供选择的每页的行数（*）
																							paginationPreText:"上一页",
																							paginationNextText:"下一页",
																		
																							// search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
																							strictSearch: true,
																							showColumns: true,                  //是否显示所有的列
																							resizable: true,
																							// showRefresh: true,                  //是否显示刷新按钮
																							minimumCountColumns: 2,             //最少允许的列数
																							// height:350,
																							
																					selectItemName: 'parentItem',
																					 clickToSelect : true, // 是否启用点击选中行
																							// fixedColumns: true, 				//是否冻结列
																							// fixedNumber: 6,						//冻结列数
																							//注册加载子表的事件。注意下这里的三个参数！
																							onExpandRow: function (index, row, $detail) {
																								InitSubTable(index, row, $detail);
																							},
																							columns: [
																								// {
																			  //                   checkbox: true,
																								// visible: true
																			  //               },
																							{
																							                        field: 'nd',
																							                        title: '年度',
																							// width:50,
																							sortable : true
																							                        
																							                    },{
																							                        field: 'yf',
																							                        title: '月份',
																							// width:50,
																							sortable : true
																							                        
																							                    },
																												{
																													field: 'company',
																													title: '公司',
																							// width:50,
																							sortable : true
																												                        
																												},
																												{
																							                        field: 'jc',
																							                        title: '基础工资',
																							// width:50,
																							// sortable : true
																							                        
																							                    }, {
																							                        field: 'fd',
																							                        title: '浮动工资',
																							// width:100,
																												// sortable : true     
																							                    }	,  {
																							                        field: 'jx',
																							                        title: '绩效总额',
																							// width:150
																							                    }, {
																							                        field: 'qx',
																							                        title: '缺薪总额',
																							// width:150
																							                    }, 	{
																							                        field: 'kh',
																							                        title: '考核总额',
																							// width:150
																							                    }, {
																							                        field: 'bt',
																							                        title: '补贴总额',
																							                    }, {
																							                        field: 'yfhj',
																							                        title: '应发合计',
																							                    }, {
																							                        field: 'gjj',
																							                        title: '公积金总额',
																							                    }, {
																							                        field: 'yal',
																							                        title: '养老总额',
																							                    }, {
																							                        field: 'yil',
																							                        title: '医疗总额',
																							                    }, {
																							                        field: 'sy',
																							                        title: '失业总额',
																							                    }, {
																							                        field: 'se',
																							                        title: '个税总额',
																							                    }, {
																							                        field: 'sfhj',
																							                        title: '实发合计',
																							                    },{
																	                        title: '操作',
																	// width:140,
																	                        formatter: function (value, row, index) {//这里的三个参数：value表示当前行当前列的值；row表示当前行的数据；index表示当前行的索引（从0开始）。
																								var html = '<a href="javascript:;" onclick="detail_yf(\''+row.nd+'\',\''+row.yf+'\',\''+row.company+'\')" title="导出详细记录" class=" l-btn l-btn-small l-btn-plain"  group=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text"></span><span class="l-btn-icon icon-export">&nbsp;</span></span></a>';
																	                            return html;
																	                        },
																							
																	                    }],
																							formatNoMatches: function () {  //没有匹配的结果
																										return '无符合条件的记录';
																									   // return "<img src='图片路径' style='设置图片样式'>"
																							  },
																							  onLoadError:function(){
																								  console.info("无数据");
																							  },
																							
										
																						});
																										
																	$('#dg').colResizable({
																	         liveDrag:true,//拖动列时更新表布局
																	         gripInnerHtml:"<div class='grip'></div>",
																	         draggingClass:"dragging",
																	         resizeMode:'overflow',//允许溢出父容器
																				partialRefresh:true,  //ajax 的部分页面刷新内部
																	     });
																	}
																		});
			
						})
				</script>
				<script>
					function ifram(){
						var xmmc = $("#xmmc").val();
						var xmbh = $("#xmbh").val();
						// var dwmc = $("#dwmc").val();
						// var htmc = $("#htmc").val();
						// var htbh = $("#htbh").val();
						// var nd = $("#nd").val();
						// var yf = $("#yf").val();
						window.location.href= "data_byxm_php.php?xmmc=" + xmmc + "&xmbh=" + xmbh ;
					}
				</script>
				<script>
				function detail_nd(nd,company){
					window.location.href= "excel_data_bytime.php?nd=" + nd + "&company=" + company;
								}	
				function detail_yf(nd,,yf,company){
					window.location.href= "excel_data_bytime.php?nd=" + nd + "&company=" + company+ "&yf=" + yf;
								}
			</script>
</html>