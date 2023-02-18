<!DOCTYPE html>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <title>档案管理系统</title>
    <link href="/dagl/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <meta name="viewport" content="width=device-width" />
    <link href="Content/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
	<link href="Content/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
	<link href="css/dataTables.bootstrap.css" rel="stylesheet"/>
	<link href="css/ionicons.min.css" rel="stylesheet"/>
	<link href="Content/ace/css/ace.min.css" rel="stylesheet"/>
	<link href="css/_all-skins.min.css" rel="stylesheet"/>
	<link href="css/toastr.min.css" rel="stylesheet"/>
	<link href="css/main.css" rel="stylesheet"/>
	<link href="Content/bootstrap-treeview/css/bootstrap-treeview.css" rel="stylesheet"/>
	    <script src="js/jquery-1.9.1.min.js"></script>
		<link href="css/select2.min.css" rel="stylesheet"/>
		<script type="text/javascript" src="js/select2.min.js"></script>
    <style type="text/css">
        .treeview ul li {
            border: none;
        }
		.suggest_li{
			color:#FFFFFF;
			background-color:#428bca;
		}
         a{font-size:16px;padding-left:5px;}
         html,body{height:100%}
		 
		 .list-group li.active > a:after {
		     display: block;
		     content: "";
		     position: absolute !important;
		     right: 0;
		     top: 4px;
		     border: 8px solid transparent;
		     border-width: 14px 10px;
		     border-right-color: #2b7dbc;
		 }
    </style>
</head>
<body>
    <section class="content" style="height:100%;">
        <div class="row" style="height:100%;">
            <!-- left column -->
			<div class="col-md-4" style="height:100%;">
			    <!-- general form elements -->
			    <div class="box box-primary" style="height: 99%;">
			        <div class="box-header with-border">
			            <h3 class="box-title" >公司</h3>
						
			            <div class="box-tools pull-right" style="top:20%">		           
			                <a title="添加公司信息" id="btnAddCom" class="green" onclick="AddCompany();" href="javascript://"><i class="fa fa-plus"></i></a>
			            </div>
						</form>
			            <div class="clearfix"></div>
			        </div>
			        <div class="box-body">
			            <div class="container">
			                <div class="row">
			                    <div class="col-md-4">
			                        <div id="EepartMentTree" class="treeview" style="width: 112%;">
										<!-- <ul class="list-group" id="suggest_ul"> -->
										 <?php
										 require("dbconfig.php");//导入配置文件
										 $link = mysql_connect(HOST,USER,PASS)or die("数据库连接失败");//连接数据库
										 mysql_select_db(DBNAME,$link);//选择数据库
										 mysql_query("set names 'utf8'");//选择字符集
										 $sql = "select name from company ";//查询语句	;
										 $result = mysql_query($sql,$link);
										 echo"<ul  class='list-group' id='suggest_ul'>";
										 while($row = mysql_fetch_assoc($result)){
										 	echo "<li id='{$row["name"]}'style='background-color:;padding:2px;list-style:none' class='cd'><a style='text-decoration:none;'href='dept?company={$row["name"]}'>{$row["name"]}</a>
											 <a title='删除公司' id='btnDeleteCom' style='float:right'class='red' onclick='DelCom({$row["id"]});' href='javascript://'><i class='fa fa-remove'></i></a>
											<a title='编辑公司信息' id='btnEditCom' style='float:right'class='green' onclick='EditCom({$row["id"]});' href='javascript://'><i class='fa fa-edit'></i></a>
											
											</li>";
										 }
										 ?>
										</ul>
									</div>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
            <div class="col-md-4" style="height:100%;">
                <!-- general form elements -->
                <div class="box box-primary" style="height: 99%;">
                    <div class="box-header with-border">
                        <h3 class="box-title" >部门</h3>
						<form method="get" action="dept.php" id="Form">
						<select name="dept" class="box-tools pull-right" id="dept" style="left:20%;width:80%">
						    <option value="<?php echo $dept;?>"><?php echo $dept;?></option>			              		            
						    <option value="">所有部门</option>			              		            
						</select>
						
                        <div class="box-tools pull-right" style="top:20%">
							<a href="javascript:;"><img class="" style=""title="查找" onclick="subForm()" src="images/search.png"></a>
                            <!-- <a title="删除部门" id="btnDeleteDep" class="red" onclick="DelEepartMent();" href="javascript://"><i class="fa fa-remove"></i></a> -->
                            <!-- <a title="编辑部门信息" id="btnEditDep" class="green" onclick="EditEepartMent();" href="javascript://"><i class="fa fa-edit"></i></a> -->
                            <a title="添加部门信息" id="btnAddDep" class="green" onclick="AddEepartMent();" href="javascript://"><i class="fa fa-plus"></i></a>
                        </div>
						</form>
                        <div class="clearfix"></div>
                    </div>
                    <div class="box-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4">
                                    <div id="EepartMentTree" class="treeview" style="width: 112%;">
										<!-- <ul class="list-group" id="suggest_ul"> -->
										 <?php
										 require("dbconfig.php");//导入配置文件
										 $link = mysql_connect(HOST,USER,PASS)or die("数据库连接失败");//连接数据库
										 mysql_select_db(DBNAME,$link);//选择数据库
										 mysql_query("set names 'utf8'");//选择字符集
										 $wherelist = array();//获取查询条件
										 	if(!empty($_GET['dept'])){
										 		$wherelist[] = "name like '%{$_GET['dept']}%'";
										 	}
											
											if(count($wherelist) > 0){         //组装查询条件
												$where = " where ".implode(' AND ' , $wherelist); 
												
											}	
										 $sql = "select * from dept $where";//查询语句	;
										 $result = mysql_query($sql,$link);
										 echo"<ul  class='list-group' id='suggest_ul'>";
										 while($row = mysql_fetch_assoc($result)){
										 	echo "<li id='{$row["name"]}'style='background-color:;padding:2px;list-style:none' class='cd'><a style='text-decoration:none;'href='dept?dept={$row["name"]}'>{$row["name"]}</a>
											 <a title='删除部门' id='btnDeleteDep' style='float:right'class='red' onclick='DelEepartMent({$row["id"]});' href='javascript://'><i class='fa fa-remove'></i></a>
											<a title='编辑部门信息' id='btnEditDep' style='float:right'class='green' onclick='EditEepartMent({$row["id"]});' href='javascript://'><i class='fa fa-edit'></i></a>
											
											</li>";
										 }
										 ?>
										</ul>
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3" style="height:100%;">
                    <div class="box box-primary" style="height: 99%;">
                        <div class="box-header with-border">
                            <h3 class="box-title"><?php echo $_GET["dept"]; ?>员工</h3>
                            <div class="box-tools pull-right">
                                <!-- <a title="删除职员" id="btnDeleteUser" class="red" onclick=" DelUser();"><i class="fa fa-remove"></i></a> -->
                                <!-- <a title="编辑职员信息" id="btnEditUser" class="green" onclick=" EditUser();"><i class="fa fa-edit"></i></a> -->
                                <a title="添加职员信息" id="btnAddUser" class="green" onclick="AddUser();"><i class="fa fa-plus"></i></a>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div id="UserTree" class="treeview"style="width: 110%;">
											<!-- <ul class="list-group" id="user_ul"> -->
											 <?php
											 $dept=$_GET["dept"];
											 require("dbconfig.php");//导入配置文件
											 $link = mysql_connect(HOST,USER,PASS)or die("数据库连接失败");//连接数据库
											 mysql_select_db(DBNAME,$link);//选择数据库
											 mysql_query("set names 'utf8'");//选择字符集
											 $sql = "select * from user where dept='$dept'  ";//查询语句	;
											 $result = mysql_query($sql,$link);
											 if(!mysql_num_rows($result)){
												 echo"<ul  class='list-group' >";
												 echo"<li>该部门无员工信息！</li>";
												 echo"</ul>";
												 // return false;
											 }
											 echo"<ul  class='list-group' id='suggest_ul'>";
											 while($row = mysql_fetch_assoc($result)){
											 	echo "<li id='{$row["name"]}'class='cd'><a style='text-decoration:none;'href='javascript://'>{$row["name"]}</a>
													<a title='删除职员' id='btnDeleteUser' style='float:right'class='red' onclick='DelUser({$row["id"]});' href='javascript://'><i class='fa fa-remove'></i></a>
													<a title='编辑职员信息' id='btnEditUser' style='float:right'class='green' onclick='EditUser({$row["id"]});' href='javascript://'><i class='fa fa-edit'></i></a>													
													</li>";
											 }
											 ?>
											</ul>
										</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </section>

<script src="js/jquery.dataTables.min.js"></script>
<script src="js/dataTables.bootstrap.min.js"></script>
<script src="js/layer/layer.js"></script>
<script src="js/toastr.min.js"></script>
<script src="Content/bootstrap-treeview/js/bootstrap-treeview.js"></script>
<script>
	var yj=document.getElementsByClassName('cd');
	for(var i=0;i<yj.length;i++){
		yj[i].onmouseover=function(){
		//console.log(i)
		this.style.backgroundColor="rgb(213,213,213)"	
	}
	yj[i].click=function(){
			this.style.backgroundColor="rgb(213,213,213)"
		}
	yj[i].onmouseout=function(){
		this.style.backgroundColor="";
	}
	}
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
					function subForm(){
						// $qdsj = document.getElementById('qdsj').value;
						// 	if($qdsj.length!=10){
						// 	layer.alert('签订时间输入有误，例：2013.01.04');
						// 	return false;
						// 	}
					       $("#Form").submit();
					   }
	// function deptSearch(){
	// 	var options=$("#dept option:selected"); //获取选中的项		
	// 	var dep=options.val(); //拿到选中项的值
	// 	var dep="deptname="+dep;
	// 	$.ajax({
	// 		type:"GET",
	// 		url:"dept.php",
	// 		data: dep,
	// 		cache: false,
	// 		success: function (msg) {
	// 			alert(dep);
	// 			}
	// 	})
	// }
	// $(function(){
	//     /* 单机li进行页面跳转 */
	//     $(".cd").click(function(){
	//         /*当前标签下的a标签*/
	//         var obj = $(this).children("a");
	//         /*获取第一个a标签，进行跳转*/
	//         window.location.href=$(obj[0]).attr("href");
	//     });
	// })
</script>
<script>
	function AddEepartMent(){
		layer.open({
						 type: 1,
						 title:"添加部门信息",
						 area: ['500px', '300px'],
						 skin: 'layui-layer-demo',
						 closeBtn: 1,
						 offset:'t',  //设置弹出位置
						 anim: 2,
						 shadeClose: true,
						 content: '<div class="col-sm-12"><div class="panel-body form-horizontal"><fieldset><div class="form-group"></fieldset><fieldset><div class="form-group"><div class="col-sm-4"><label class="control-label">部门名称:</label></div><div class="col-sm-8"><input type="text" id="dept" class="form-control"" /></div></fieldset><fieldset><div class="form-group"><div class="col-sm-4"><label class="control-label">备注:</label></div><div class="col-sm-8"><input type="text" id="bz" class="form-control" /></div></fieldset></div></div>',
						 btn: ["添加", "取消"],
						 yes: function () {
						                     var dept = $("#dept").val();
						                     var bz = $("#bz").val();
											 var delid="dept="+dept+"&bz="+bz;
						                     $.ajax({
												type:"post",
												url:"dept_add.php",
												data: delid,
												cache: false,
												success: function (data) {
													 layer.alert('添加成功！', {
													 icon: 1,   
													 title: '提示',
													 end:function(){
														// document.getElementById("button").click();
														window.location.reload();//刷新父页面
														layer.closeAll(); //关闭所有layer
													 },
													 });
												 },
						                     });		
						                 },
						});
	}
	function AddUser(){
		layer.open({
						 type: 2,
						 title:"添加员工信息",
						 area: ['800px', '500px'],
						 skin: 'layui-layer-demo',
						 closeBtn: 1,
						 offset:'t',  //设置弹出位置
						 anim: 2,
						 shadeClose: true,
						 content: 'user_luru?dept=<?php echo $_GET["dept"]; ?> ',
						 // btn: ["添加", "取消"],
						 end: function () {

							window.location.reload();//刷新父页面
							layer.closeAll(); //关闭所有layer
	
						                 },
						});
	}
	function EditEepartMent(id){
		layer.open({
			 type: 2,
			 title:false,
			 shade: [0.5, '#000'],
			 //配置遮罩层颜色和透明度
			 shadeClose: true,
			 shift: 0,
			 //打开效果：0-6 。0放大，1从上到下，2下到上，3左到右放大，4翻滚效果；5渐变；6抖窗口
			 offset:'t',  //设置弹出位置
			 area: ['800px', '500px'],
			 // skin: 'layui-layer-demo',
			 closeBtn: 1,
			 anim: 2,
			 content: "dept_change.php?id=" + id,
			  // btn: ["", "取消"],
			 
			 end:function(){
				  window.location.reload();//刷新父页面    
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		parent.layer.close(index); //再执行关闭
				
			 },
				 });
	}
	function EditUser(id){
		layer.open({
			 type: 2,
			 title:false,
			 shade: [0.5, '#000'],
			 //配置遮罩层颜色和透明度
			 shadeClose: true,
			 shift: 0,
			 //打开效果：0-6 。0放大，1从上到下，2下到上，3左到右放大，4翻滚效果；5渐变；6抖窗口
			 offset:'t',  //设置弹出位置
			 area: ['800px', '500px'],
			 // skin: 'layui-layer-demo',
			 closeBtn: 1,
			 anim: 2,
			 content: "user_change.php?id=" + id,
			  // btn: ["", "取消"],
			 
			 end:function(){
				  window.location.reload();//刷新父页面    
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		parent.layer.close(index); //再执行关闭
				
			 },
				 });
	}
	function DelEepartMent(id) {
		var delid= "id=" + id;
			layer.open({
			 type: 1,
			 area: ['250px', '200px'],
			 skin: 'layui-layer-demo',
			 closeBtn: 1,
			 anim: 2,
			 shadeClose: true,
			 content: '<center><h4 style="color:red;padding:5px5px;magin:2px;">确定删除该部门吗？<br>删除会将该部门员工全部删除<br>请谨慎操作！</h4></center>',
			 btn: ["确定", "取消"],
			 yes: function () {
				 var delid= "id=" + id;
				 $.ajax({
					type:"post",
					url:"dept_delete.php",
					data: delid,
					cache: false,
					success: function (data) {
						 layer.alert('删除成功！', {
						 icon: 1,   
						 title: '提示',
						 end:function(){
							window.location.reload();//刷新父页面
							layer.closeAll(); //关闭所有layer
						 },
						 });
					 },
				 });										 																	                 
			                 },
			});
		}
		function DelUser(id) {
			var delid= "id=" + id;
				layer.open({
				 type: 1,
				 area: ['250px', '150px'],
				 skin: 'layui-layer-demo',
				 closeBtn: 1,
				 anim: 2,
				 shadeClose: true,
				 content: '<center><h4 style="color:red;padding:5px5px;magin:2px;">确定删除该员工吗</h4></center>',
				 btn: ["确定", "取消"],
				 yes: function () {
					 var delid= "id=" + id;
					 $.ajax({
						type:"post",
						url:"user_delete.php",
						data: delid,
						cache: false,
						success: function (data) {
							 layer.alert('删除成功！', {
							 icon: 1,   
							 title: '提示',
							 end:function(){
								// document.getElementById("button").click();
								window.location.reload();//刷新父页面
								layer.closeAll(); //关闭所有layer
							 },
							 });
						 },
					 });										 																	                 
								 },
				});
			}					
</script>
</body>
</html>
