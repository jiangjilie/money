<meta charset="UTF-8">
<!--连接数据库，后面需要链接数据库的时候直接引用就行-->
<?php
/*tourism数据库名*/
/*admin管理员表
字段：id（自增，主键）  name：登录名   password：登录密码*/
/*写法与mysql_connect类似，只是在这里直接连接了数据库，少了mysql_select_db() */

$conn = mysqli_connect('localhost','root','123456','money');
if (!$conn){    die("数据库选择失败！");  }
$conn->query("set names utf8");

/*测试是否能输出数据表中的数据*/
/*$select = "select * from admin";
$query = $conn->query($select);
$row = mysqli_fetch_assoc($query);
print_r($row);*/
/*测试成功，能正常输出，则把上面的测试代码注释，准备写登录代码*/
?>
<!--在这里也可以将需要引入的css、js等写在这里-->
<meta charset="UTF-8">
<script type="text/javascript" rel="stylesheet" src="js/jquery-3.3.1.min.js"></script>
