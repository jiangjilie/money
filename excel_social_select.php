<?php
ini_set("memory_limit","80M");   //解决内存溢出
/**
     * 批量导出数据
     * @param $arr 从数据库查询出来，即要导出的数据
     *  $name excel表歌名
     */
    function expExcel($arr,$name){
 
        require_once 'PHPExcel.php';
		require_once 'PHPExcel/IOFactory.php';		
		require_once 'PHPExcel/Reader/Excel5.php';
        // Vendor('PHPExcel.PHPExcel');
        // Vendor('PHPExcel.Autoloader');
 
        //实例化
        $objPHPExcel = new PHPExcel();
        /*右键属性所显示的信息*/
        $objPHPExcel->getProperties()->setCreator("jiuwu")  //作者
        ->setLastModifiedBy("jiuwu")  //最后一次保存者
        ->setTitle('数据EXCEL导出')  //标题
        ->setSubject('数据EXCEL导出') //主题
        ->setDescription('导出数据')  //描述
        ->setKeywords("excel")   //标记
        ->setCategory("result file");  //类别
 
 
        //设置当前的表格
        $objPHPExcel->setActiveSheetIndex(0);
        // 设置表格第一行显示内容
        $objPHPExcel->getActiveSheet()
        ->setCellValue('A1', '部门')
        ->setCellValue('B1', '姓名')
        ->setCellValue('C1', '公积金')
        ->setCellValue('D1', '养老')
        ->setCellValue('E1', '医疗')
        ->setCellValue('F1', '失业')
        ->setCellValue('G1', '合计')
        ->setCellValue('H1', '备注')
        ->setCellValue('I1', '日期')        
            //设置第一行为红色字体
            ->getStyle('A1:D1')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_BLACK);
 
        $key = 1;
        /*以下就是对处理Excel里的数据，横着取数据*/
        foreach($arr as $v){
 
            //设置循环从第二行开始
            $key++;
            $objPHPExcel->getActiveSheet()
 
                //Excel的第A列，name是你查出数组的键值字段，下面以此类推
             ->setCellValue('A'.$key, $v['dept'])
             ->setCellValue('B'.$key, $v['name'])
             ->setCellValue('C'.$key, $v['gjj'])
             ->setCellValue('D'.$key, $v['ylj'])
             ->setCellValue('E'.$key, $v['yl'])
             ->setCellValue('F'.$key, $v['sy'])
             ->setCellValue('G'.$key, $v['hj'])
             ->setCellValue('H'.$key, $v['bz'])
             ->setCellValue('I'.$key, $v['date']) ;     
        }
        //设置当前的表格
        $objPHPExcel->setActiveSheetIndex(0);
        ob_end_clean();  //清除缓冲区,避免乱码
        header('Content-Type: application/vnd.ms-excel'); //文件类型
        header('Content-Disposition: attachment;filename="'.$name.'.xls"'); //文件名
        header('Cache-Control: max-age=0');
        header('Content-Type: text/html; charset=utf-8'); //编码
        //解决报错的问题：Class 'Warehouse\Controller\PHPExcel_IOFactory' not found
        //$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');//原始路径
        //$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');  //excel 2003
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');//新路径
 
        $objWriter->save('php://output');
        exit;
    }
 /***********调用**********************/
 // header("Content-type:text/html;charset=utf-8");
  
 //链接数据库
 $link = @mysql_connect('localhost','root','123456') or die('连接数据库失败');
 mysql_select_db('money',$link);
 mysql_query('set names utf8');
 $id = $_GET['id'];	
 $data = explode(',', $id);   //ajax传过来的是字符串需要转化为数组
 $countp=count($data);//计算id数组长度
 //先获取数据
  $arr = array();
 for($i=0;$i<$countp;$i++ ){
	 $sql = "select * from social where id=$data[$i]";
	 $res = mysql_query($sql);
	 $row = mysql_fetch_assoc($res);
	$hj=$row["gjj"]+$row["ylj"]+$row["yl"]+$row["sy"];
	//将查询结构集重新数组化
	$arr[]=array("date"=>$row["date"],"name"=>$row["name"],"dept"=>$row["dept"],"gjj"=>$row["gjj"],"ylj"=>$row["ylj"],"yl"=>$row["yl"],"sy"=>$row["sy"],"hj"=>$hj,"bz"=>$row["bz"]);
	// $data[] = $row;
	 }
// echo json_encode($arr);//输出json数据
 //excel表格名
$date=date('YmdHis', time());  //获取系统时间年月日时分秒
 $name = "社保表".$date;
  
 //调用
 expExcel($arr,$name);
 
 function Manage_exportfile ($fields,$data,$name){
	 require_once 'PHPExcel.php';
	 require_once 'PHPExcel/IOFactory.php';		
	 require_once 'PHPExcel/Reader/Excel5.php';
	 Vendor('PHPExcel.PHPExcel');
	 Vendor('PHPExcel.Autoloader');
        // Vendor('PHPExcel.PHPExcel');
        // Vendor('PHPExcel.Autoloader');
        $file_name = $name.'_'.uniqid();
        // 首先创建一个新的对象  PHPExcel object
        $objPHPExcel = new PHPExcel();
 
        // 设置文件的一些属性，在xls文件——>属性——>详细信息里可以看到这些值，xml表格里是没有这些值的
        $objPHPExcel
            ->getProperties()  //获得文件属性对象，给下文提供设置资源
            ->setCreator( "Itsean")                 //设置文件的创建者
            ->setLastModifiedBy( "Itsean")          //设置最后修改者
            ->setTitle($name)    //设置标题
            ->setSubject($name)  //设置主题
            ->setDescription(iconv('utf-8', 'gb2312', "The File Great By Xvdesign.Com !The Site:http://www.xvdesign.com/")) //设置备注
            ->setKeywords($name.' Itsean')        //设置标记
            ->setCategory($name.' Itsean');                //设置类别
        // 位置aaa  *为下文代码位置提供锚
        // 给表格添加数据
        $objActSheet = $objPHPExcel->setActiveSheetIndex(0);             //设置第一个内置表（一个xls文件里可以有多个表）为活动的
        $excel_col = 'A';
        $excel_row = 1;
        //dump($data);die;
        //dump($fields);die;
        foreach ($fields as $key => $field) {
            $objActSheet->setCellValue($excel_col.$excel_row, $field[1]);
            if($field[2]){
                $objActSheet->getColumnDimension($excel_col) -> setWidth($field[2]/10);
            }
            //$objActSheet->getStyle($excel_col.$excel_row)->getAlignment()->setHorizontal('center');
            $objActSheet->getStyle($excel_col.$excel_row)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
            $objActSheet->getStyle($excel_col.$excel_row)->getFill()->getStartColor()->setARGB('ffcccccc');
            //$objActSheet->getColumnDimension($excel_col)->setWidth(20);
 
            $objActSheet->getStyle($excel_col.$excel_row)->getAlignment()->setHorizontal('left');
            //$objActSheet->getStyle('B'.$excel_row)->getAlignment()->setHorizontal('left');
            //$objActSheet->getStyle('E'.$excel_row)->getAlignment()->setHorizontal('left');
 
 
            $excel_col++;
        }
 
        //设置宽度
        // $objActSheet->getColumnDimension('A')->setWidth(30);
        // $objActSheet->getColumnDimension('B')->setWidth(30);
        // $objActSheet->getColumnDimension('C')->setWidth(15);
        // $objActSheet->getColumnDimension('D')->setWidth(50);
 
        //dump($objActSheet);die;
        $excel_row++;
        foreach ($data as $k => $v) {
            $excel_col = 'A';
            foreach ($fields as $key => $field) {
                /*$objActSheet->getStyle('A'.$excel_row)->getAlignment()->setHorizontal('left');
                $objActSheet->getStyle('B'.$excel_row)->getAlignment()->setHorizontal('left');
                $objActSheet->getStyle('E'.$excel_row)->getAlignment()->setHorizontal('left');*/
                $objActSheet->setCellValue( $excel_col.$excel_row, $v[$field[0]]);
                //设置换行
                //$objActSheet->getStyle($excel_col)->getAlignment()->setWrapText(true);
 
                $excel_col++;
            }
            $excel_row++;
        }
 
        $objDrawing = new PHPExcel_Worksheet_Drawing();
        $objDrawing->setName('Paid');
        $objDrawing->setDescription('Paid');
//	$objDrawing->setPath('./Public/Images/login/loginlogo.png'); //图片引入位置
//	$objDrawing->setCoordinates('A'.$excel_row); //图片添加位置
        $objDrawing->setOffsetX(10);
        $objDrawing->setRotation(0);
        $objDrawing->setHeight(100);
        $objDrawing->getShadow()->setVisible (true);
        $objDrawing->getShadow()->setDirection(20);
        $objDrawing->setWorksheet($objActSheet);
 
        //得到当前活动的表,注意下文教程中会经常用到$objActSheet
        // $objActSheet = $objPHPExcel->getActiveSheet();
        // 位置bbb  *为下文代码位置提供锚
        // 给当前活动的表设置名称
        $objActSheet->setTitle($name);
 
        // 生成2003excel格式的xls文件
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="'.$file_name.'.xls"');
        header('Cache-Control: max-age=0');
        //解决报错的问题：Class 'Warehouse\Controller\PHPExcel_IOFactory' not found
        //$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');//原始路径
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');//新路径
 
        // 生成2007excel格式的xlsx文件
//	header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//	header('Content-Disposition: attachment;filename="'.$name.'.xlsx"');
//	header('Cache-Control: max-age=0');
//	$objWriter = \PHPExcel_IOFactory:: createWriter($objPHPExcel, 'Excel2007');
        $objWriter->save('php://output');
        exit;
    }
 
?>
