<?php
	   $date=$_POST['date'];
	   $company=$_POST['company'];
	   	//���ݿ�������Ϣ(�û���,���룬���ݿ�������ǰ׺��)
	   	require("dbconfig.php");//���������ļ�
	   	$link = mysql_connect(HOST,USER,PASS)or die("���ݿ�����ʧ��");//�������ݿ�
	   	mysql_select_db(DBNAME,$link);//ѡ�����ݿ�
	   	mysql_query("set names 'utf8'");//ѡ���ַ���
	   	
	   $sql="select *  from salary where date='$date' and company='$company'  ";
	   $result = mysql_query($sql);
	   if (!mysql_num_rows($result)){
	            echo "1";
	        }
	?>

