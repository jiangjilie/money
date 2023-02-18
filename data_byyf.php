
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
						if(!empty($_POST['nd'])){
							$wherelist[] = "date like '%{$_POST['nd']}%'";
						}
						if(!empty($_POST['company'])){
							$wherelist[] = "company='{$_POST['company']}'";
						}
						
						
					if(count($wherelist) > 0){         //组装查询条件
						$where = " where ".implode(' AND ' , $wherelist); 
						
					}								
				$sql = "select nd,yf,company,sum(jc) as jc,sum(fd) as fd,sum(jx) as jx,sum(qx) as qx,sum(kh) as kh,sum(bt) as bt,sum(gjj) as gjj,sum(yal) as yal,sum(yil) as yil,sum(sy) as sy,sum(se) as se from salary $where group by date,company order by date ";//查询语句	;
					$result = mysql_query($sql,$link);					
					while($row = mysql_fetch_assoc($result) ){
							$yfhj=$row['jc']+$row['fd']+$row['jx']-$row['qx']-$row['kh']+$row['bt'];
							$sfhj=$yfhj-$row['gjj']-$row['yal']-$row['yil']-$row['sy']-$row['se'];
							$yfhj=number_format($yfhj,2);
							$sfhj=number_format($sfhj,2);
							$yf=intval($row['yf']);	
							//将查询结构集重新数组化
							$data[]=array("id"=>$row["id"],"time"=>$row["time"],"company"=>$row["company"],"dept"=>$row["dept"],"nd"=>$row["nd"],"yf"=>$yf,"name"=>$row["name"],"jc"=>$row["jc"],"fd"=>$row["fd"],"jx"=>$row["jx"],"qx"=>$row["qx"],"kh"=>$row["kh"],"bt"=>$row["bt"],"gjj"=>$row["gjj"],"yal"=>$row["yal"],"yil"=>$row["yil"],"sy"=>$row["sy"],"se"=>$row["se"],"yfhj"=>$yfhj,"sfhj"=>$sfhj);
							// $data[] = $row;
						}
						
			
					echo json_encode($data);//输出json数据
?>  
