
<?php
// header("Access-Control-Allow-Origin:*");//解决跨域请求问题
// header('Access-Control-Allow-Methods:POST');
// header('Access-Control-Allow-Headers:x-requested-with, content-type');  
// header("content-Type: text/html; charset=utf-8");//字符编码设置  
				//声明变量并接受form表单发送过来的数据
					$dept = $_POST['dept']; 
					$name = $_POST['name'];
					$ssgs = $_POST['ssgs'];
					
																			
				//连接数据库
					require("dbconfig.php");//导入配置文件
					$link = mysql_connect(HOST,USER,PASS)or die("数据库连接失败");//连接数据库
					mysql_select_db(DBNAME,$link);//选择数据库
					mysql_query("set names 'utf8'");//选择字符集

					// 用Page函数计算出 $select_from 从哪条记录开始检索、$pagenav 输出分页导航
					
					
					$wherelist = array();//获取查询条件
						if(!empty($_POST['dept'])){
							$wherelist[] = "user.dept like '%{$_POST['dept']}%'";
						}
						if(!empty($_POST['name'])){
							$wherelist[] = "user.name like '%{$_POST['name']}%'";
						}
						if(!empty($_POST['ssgs'])){
							$wherelist[] = "user.ssgs like '%{$_POST['ssgs']}%'";
						}
						
						
					if(count($wherelist) > 0){         //组装查询条件
						$where = " where ".implode(' AND ' , $wherelist); 
						
					}								
					// $sql = "select id,nd,yf,htbh,xmbh,xmmc,dwmc,htmc,htlx,lxr,qdsj,htgq,fkfs,jsfs,htze,ysk,gsk,ykp,bz,MAX(pzh) as pzh,MAX(kprq) as kprq,SUM(jshj) as je from (select user.*,invoice. pzh,invoice.kprq,invoice.jshj from user  left join invoice  on user.htbh=invoice.htbh $where) uservoice GROUP BY id order by time desc ";//查询语句
					$sql = "select * from user $where ";
					
					$result = mysql_query($sql,$link);
					// $f = "表中无数据存在！";
					// if ($result==''){
					// $data[]=array("id"=>$f,"time"=>$f,"nd"=>$f,"htbh"=>$f,"xmbh"=>$f,"xmmc"=>$f,"dwmc"=>$f,"htmc"=>$f,"htlx"=>$f,"lxr"=>$f,"qdsj"=>$f,"htgq"=>$f,"fkfs"=>$f,"jsfs"=>$f,"htze"=>$f,"ysk"=>$f,"gsk"=>$f,"ykp"=>$f,"bz"=>$f);
					// // return false ;
					// }
					
					while($row = mysql_fetch_assoc($result) ){
							
							$data[] = $row;
						}
						
			
					echo json_encode($data);//输出json数据
?>  
