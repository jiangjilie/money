<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<title>用户更改</title>
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<link href="css/font-awesome.min.css" rel="stylesheet">
		<link href="Content/datatables/dataTables.bootstrap.css" rel="stylesheet">
		<link href="css/ionicons.min.css" rel="stylesheet">
		<link href="Content/ace/css/ace.min.css" rel="stylesheet">
		<link href="css/_all-skins.min.css" rel="stylesheet">
		<link href="css/toastr.min.css" rel="stylesheet">
		<link href="css/main.css" rel="stylesheet">
		<script src='js/jquery-1.10.2.min.js'></script>
		<script src='js/layer/layer.js'></script>
		<style>
			.col-sm-3 {
			    width: 35%;
			}
		</style>
	</head>
	<body>
		<?php
			//声明变量并接受form表单发送过来的数据
				$admin= $_GET['admin']; 
				$id = $_GET['id']; 
			
			//连接数据库
				require("dbconfig.php");//导入配置文件
				$link = mysql_connect(HOST,USER,PASS)or die("数据库连接失败");//连接数据库
				mysql_select_db(DBNAME,$link);//选择数据库
				mysql_query("set names 'utf8'");//选择字符集
				$sql = "select * from admin where id=$id";//查询语句	
				$result=mysql_query($sql,$link);
				$row = mysql_fetch_assoc($result);
			
								echo" <!-- Main content -->
    <section class='content'>
        <div class='row'>
            <!-- left column -->
            <div class='col-md-12'>
                <!-- general form elements -->
                <div class='box box-primary'>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form id='Form' id='formAdd' data-parsley-validate='' class='form-horizontal' novalidate=''>
					<input name='id' value='$id' id='_easyui_textbox_input9' type='text' style='display:none'>
                        <div class='panel-body'>
                            <fieldset>
                                <div class='form-group'>
                                    <div class='col-sm-2'style='width:106px'><label class='lable-title control-label'>用户名</label></div>
                                    <div class='col-sm-3'>
                                        <input type='text' class='form-control' required='' value='{$row['admin']}'id='txtUserName' name='admin' placeholder=''>
                                    </div>
                                    <div class='col-sm-2'style='width:106px'><label class='lable-title control-label'>姓名</label></div>
                                    <div class='col-sm-3'>
                                        <input type='text' class='form-control' id='txtName' value='{$row['name']}'name='name' placeholder=''>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class='form-group'>
                                    <div class='col-sm-2'style='width:106px'><label class='lable-title control-label'>密码</label></div>
                                    <div class='col-sm-3'>
                                        <input type='password' class='form-control' value='{$row['password']}' name='password' id='txtPassWord' placeholder='' required=''>
                                    </div>
									<div class='col-sm-2'style='width:106px'><label class='lable-title control-label'>邮箱</label></div>
									<div class='col-sm-3'>
									    <input type='text' class='form-control' id='txtEmail' data-parsley-type='email' value='{$row['email']}' name='email' placeholder='' onchange='CkEmail()'>
									</div>
                                   

                                </div>
                            </fieldset>                           
                            <fieldset>
                                <div class='form-group'>
                                    <div id='mberror'>
                                        <div class='col-sm-2'style='width:106px'><label class='lable-title control-label'>联系电话</label></div>
                                        <div class='col-sm-3'>
                                            <input type='text' class='form-control' id='txtMobile' value='{$row['phone']}'name='phone' placeholder='' onchange='CkMobile()'>
                                        </div>
                                    </div>
									<div class='col-sm-2'style='width:106px'><label class='lable-title control-label'>备注</label></div>
									<div class='col-sm-3'>
									    <input type='text' class='form-control' id='txtMobile'value='{$row['bz']}'name='bz' placeholder='' onchange='CkMobile()'>
                                </div>
                            </fieldset>
                        </div>
                        <!-- /.box-body -->

                        <div class='box-footer layer-footer'>
                            <button type='button' class='btn btn-default' onclick='Cancel()'>退出</button>
                            <button type='button' class='btn btn-primary' onclick='Save()'>修改</button>
                        </div>
                    </form>
                </div>
                <!-- /.box -->
            </div>
            <!--/.col (left) -->

        </div>
        <!-- /.row -->
    </section>
    <!-- /.content -->";
								?>
						
				
	</body>
	<script>
		function Save(){
			$.ajax({
					type:"post",			
					url:"user_changephp.php",
					 cache: false,  
					data: $('#Form').serialize(),
					success: function (data) {
						 layer.alert('修改成功！', {
						 icon: 6,   //绿色笑脸
						 title: '提示'
						 });
											}
			});
		}
		function Cancel(){
			window.location.reload();//刷新父页面
			var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
			parent.layer.close(index); //再执行关闭
			}
	</script>
	
</html>
