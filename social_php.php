
<?php
// header("Access-Control-Allow-Origin:*");//解决跨域请求问题
// header('Access-Control-Allow-Methods:POST');
// header('Access-Control-Allow-Headers:x-requested-with, content-type');  
// header("content-Type: text/html; charset=utf-8");//字符编码设置  
				//声明变量并接受form表单发送过来的数据
					$dept = $_POST['dept']; 
					$name = $_POST['name'];
					$nd = $_POST['nd'];
					$yf = $_POST['yf'];
					$company = $_POST['company'];
					
																			
				//连接数据库
					require("dbconfig.php");//导入配置文件
					$link = mysql_connect(HOST,USER,PASS)or die("数据库连接失败");//连接数据库
					mysql_select_db(DBNAME,$link);//选择数据库
					mysql_query("set names 'utf8'");//选择字符集

					// 用Page函数计算出 $select_from 从哪条记录开始检索、$pagenav 输出分页导航
					
					
					$wherelist = array();//获取查询条件
						if(!empty($_POST['dept'])){
							$wherelist[] = "dept like '%{$_POST['dept']}%'";
						}
						if(!empty($_POST['name'])){
							$wherelist[] = "name like '%{$_POST['name']}%'";
						}
						if(!empty($_POST['nd'])){
							$wherelist[] = "nd like '%{$_POST['nd']}%'";
						}
						if(!empty($_POST['yf'])){
							$wherelist[] = "date='{$_POST['yf']}'";
						}
						if(!empty($_POST['company'])){
							$wherelist[] = "company='{$_POST['company']}'";
						}
						
						
					if(count($wherelist) > 0){         //组装查询条件
						$where = " where ".implode(' AND ' , $wherelist); 
						
					}								
					// $sql = "select id,nd,yf,htbh,xmbh,xmmc,dwmc,htmc,htlx,lxr,qdsj,htgq,fkfs,jsfs,htze,ysk,gsk,ykp,bz,MAX(pzh) as pzh,MAX(kprq) as kprq,SUM(jshj) as je from (select user.*,invoice. pzh,invoice.kprq,invoice.jshj from user  left join invoice  on user.htbh=invoice.htbh $where) uservoice GROUP BY id order by time desc ";//查询语句
					$sql = "select * from social $where ";
					$result = mysql_query($sql,$link);					
					while($row = mysql_fetch_assoc($result) ){
							// $hj=$row["gjj"]+$row["ylj"]+$row["yl"]+$row["sy"];
							// //将查询结构集重新数组化
							// $data[]=array("id"=>$row["id"],"time"=>$row["time"],"company"=>$row["company"],"date"=>$row["date"],"nd"=>$row["nd"],"yf"=>$yf,"name"=>$row["name"],"dept"=>$row["dept"],"gjj"=>$row["gjj"],"ylj"=>$row["ylj"],"yl"=>$row["yl"],"sy"=>$row["sy"],"hj"=>$hj);
							$data[] = $row;
						}
						
			
					echo json_encode($data);//输出json数据
?>  
