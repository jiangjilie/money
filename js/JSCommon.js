
//做重大改变，未提交 未通过分开处理 2021-01-25
//var gstrAuthStatusUn = "未提交/未通过";
var gstrAuthStatusUn = "未提交";
var gstrAuthStatusNoPass = "未通过";
var gstrAuthStatusIng = "等待办理";
var gstrAuthStatusEd = "办理审结";



//'审核结果状态
var gstrAuthResultBatch = "提交";
var gstrAuthResultPass = "通过";
var gstrAuthResultNoPass = "未通过";
var gstrAuthResultNull = "";

var eOperBrow = 1;//浏览权限
var eOperAdd = 2;//增加权限
var eOperEdit = 3;
var eOperDel = 4;
var eOperAudit = 5;     //审核
var eOperExec = 6;      //执行
var eOperPrint = 7;     //打印
var eOperDesign = 8;         //单独的表单 设计权限 
var eOperDisCard = 9;   //作废
var eOperYG = 10        //'严管字段
var eOperBM = 11        // '保密 增加一个导出权限
var eOperExport = 12    //'导出 增加一个导出权限
var eOperR1 = 13        //'分级录入权限1
var eOperR2 = 14        //'分级录入权限2
var eOperR3 = 15        // '分级录入权限3
var eOperR4 = 16        //'分级录入权限4
var eOperR5 = 17        //'分级录入权限5
var eOperAddLike = 18;   //增加相似


var eCtrlLable = -1;
var eCtrlTextBox = 0;
var eCtrlComboBox = 1;
var eCtrlDTPicker = 2;
var eCtrlCheckBox = 3;
var eCtrlCommondButton = 4;
var eCtrlPictureBox = 5;
var eCtrlUpLoad = 6;
var eCtrlRichText = 7;      //添加一个富文本框
var eCtrlRemark = 8;        //添加一个备注行
var eCtrlRadioButton = 9;   //添加一个选框效果 单选效果
var eCtrlGrid = 10;         //添加一个网格录入框 能够方便的解析 Grid内容
var eCtrlComboBoxTree = 11; //树形的，BS版本重复
var eCtrlRemarkNewLine = 12;    //分割行
var eCtrlTagBox = 13;           //标签框
var eCtrlCheckBoxList = 14; //多选 

var eOrder_CGDD = 1;        //采购订单
var eOrder_XSDD = 2;       //销售订单
var eOrder_XSBJD = 3;      //销售报价单
var eOrder_CGJHD = 4;      //采购计划单 需要审批 请购单
var eOrder_CGBJD = 5;      //采购报价单
var eOrder_SCDD = 6;      //可以给领料单领用
var eOrder_XQJHD = 7;       //需求计划单
var eOrder_CGSQD = 9;        //采购申请单
var eOrder_CGRKD = 31;       //采购入库;收货单
var eOrder_CGJHD =32;       //采购计划单
var eOrder_CGTHD = 33;     //采购退货单
var eOrder_CGGJRKD = 35;    //采购估价入库单
var eOrder_CGXKCGD = 36;     //采购现款采购单

var eOrder_XSCKD = 41;   //销售出库单
var eOrder_XSTHD = 42;   //销售退货单
var eOrder_XSWTDXD = 43;  //委托代销单
var eOrder_XSXKXSD = 44;   //现款销售单
var eOrder_XSDXJSD = 45;  //销售代销结算单
var eOrder_XSHYXFD = 46;  //销售会员消费单
var eOrder_XSHYDHD = 47;   //销售会员兑换单
var eOrder_XSKHCJD = 48;  //销售客户销售单


var eOrder_CKLLD = 51;   //领料出库单 领用出库单
var eOrder_CKTLD = 52;  //退料进仓单
var eOrder_CKCPJCD = 53;  //产品进仓单
var eOrder_CKCHTJD = 54;  //货存调价单
var eOrder_CKBDD = 55;  //库存变动单;变更单
var eOrder_CKPDD = 56;   //仓库盘点单
var eOrder_CKDBD = 57;    //仓库调拨单
var eOrder_CKZZCXD = 58;    //组装拆卸单


var eOrder_CGFKD = 71  ;//          '采购付款单
var eOrder_GYSBJD = 72;//           '供应商保价单
var eOrder_GYSFLD = 73 ;//          '供应商报价单
    
var eOrder_XSSKD = 81 ;//           '销售收款单
var eOrder_CRMBJD = 82;//           '客户保价单
var eOrder_CRMFLD = 83 ;//          '客户返利单
    
var eOrder_FKSQD = 101;//        '采购付款申请单


var mlngIsApp = 0;//是否是APP
var mlngAmountLen = 2;  //数量长度
var mlngMoneyLen = 2;   //金额长度

//获得放大的倍数
function detectZoom() {
    var ratio = 0,
      screen = window.screen,
      ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    }
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio) {
        ratio = Math.round(ratio * 100);
    }

    return ratio;
};

//初始化界面风格
function InitTheme() {
    try {
        var themeName = GetCookie("themename");
        var $easyuiTheme = $('#easyuiTheme');
        var url = $easyuiTheme.attr('href');
        var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName + '/easyui.css';
     //   alert(href);
        $easyuiTheme.attr('href', href);
        var $iframe = $('iframe');
        if ($iframe.length > 0) {
            for (var i = 0; i < $iframe.length; i++) {
                var ifr = $iframe[i];
                $(ifr).contents().find('#easyuiTheme').attr('href', href);
            }
        }
    } catch (ex) {
        alert("InitTheme:" + ex.message);
    }
}

//初始化APP 全部封装到这里，其他调用页面只需要调用这个就自动成为了 具备支持APP功能
function InitApp(sRelUrl) {
    try {
    //    alert("JSCommon.InitApp");
        var vParm = getUrlParam("IsApp");
        if (vParm != null) {
            mlngIsApp = vParm;
        }
    //    alert("JSCommon.InitApp.mlngIsApp" + mlngIsApp);
        // alert("InitApp");
      //  console.log("JSCommon.InitApp.mlngIsApp" + mlngIsApp);
        if (mlngIsApp == undefined) {
            return;
        }
        if (mlngIsApp == 1) {
            //var $webmobcom = $('#webmobcom');
            if (sRelUrl == undefined) {
                sRelUrl='../'
            }
            var hrefcom = sRelUrl+'WebMob/js/common.js';
            console.log("InitApp:" + hrefcom);
            $.getScript(hrefcom);  //加载js文件
            var hrefmui =  sRelUrl+'WebMob/js/mui.min.js';
            $.getScript(hrefmui);  //加载js文件

    
            cssurl = sRelUrl + 'WebMob/css/common.css';
            $('head').append('<link href="' + cssurl + '" rel="stylesheet" type="text/css" />')
            var cssurl = sRelUrl + 'WebMob/css/mui.min.css';
            $('head').append('<link href="' + cssurl + '" rel="stylesheet" type="text/css" />')

            
        } 

    } catch (ex) {
        alert("InitApp:" + ex.message);
    }
}

//是否有 文件操作的ID
function HasFileOper(lDBID) {
 //   alert("JSCommon.HasFileOper.lDBID"+lDBID);
    var bhas = false;
    switch (parseInt(lDBID)) {
        case 516:
        case 517:
        case 526:       
        case 536:
        case 538://巡检附件
        case 556:
        case 537://Pub_CJImg
        case 541:
        case 542:
        case 543:
        case 544:
        case 545:
        case 546:
        case 548://Crm_RelFile
        case 549:// CRM_IMG
        case 550:// RS_DA_HF_File
        case 557: //HT_FILE V_HT_FILE_M_C
        case 560:// HT_AQGL_FIle
        case 561:// HT_FK_FIle
        case 562:// JXC_BJFJ
        case 563:// JXC_TB_FIle
        case 564:// JXC_TB_FIle
        case 565:// JXC_TB_FIle
        case 567:// HT_File v_HT_SFB_File 挂接过来
        case 5013:// Equip_File
            bhas = true;
            break;
        default:
            break;
    }
    return bhas;
}

function alertex(strMsg) {
    $.messager.show({
        title: 'My Title',
        msg: strMsg,
        showType: 'slide',
        style: {
            right: '',
            top: document.body.scrollTop + document.documentElement.scrollTop,
            bottom: ''
        }
    });
}
function alert1(strMsg) {
    $.messager.alert('超易软件', strMsg);
}
function alert2() {
    $.messager.alert('超易软件', 'Here is a error message!', 'error');
}
function alert3() {
    $.messager.alert('超易软件', 'Here is a info message!', 'info');
}
function alert4() {
    $.messager.alert('超易软件', 'Here is a question message!', 'question');
}
function alert5() {
    $.messager.alert('超易软件', 'Here is a warning message!', 'warning');
}
function confirm1() {
    $.messager.confirm('超易软件', 'Are you confirm this?', function (r) {
        if (r) {
            alert('confirmed: ' + r);
        }
    });
}
function prompt1() {
    $.messager.prompt('超易软件', 'Please type something', function (r) {
        if (r) {
            alert('you type: ' + r);
        }
    });
}

//将两个JSON数组拼接在一起
function connectjson(obj1, obj2) {
    //将obj2追加到obj1
    try {
        for (var i = 0; i < obj2.length; i++) {
            obj1.push(obj2[i]);
        }
    } catch (ex) {
        alert("JSCommon.copyjson" + ex.message);
    }

}
//将对象2 拷贝到对象1
function copyjson(obj1, obj2) {
    try {
        for (var i = 0; i < obj2.length; i++) {
            obj1.push(obj2[i]);
        }

    } catch (ex) {
        alert("JSCommon.copyjson" + ex.message);
    }
   
}

function ShowObjProperty(Obj) {
    var PropertyList = '';
    var PropertyCount = 0;
    for (i in Obj) {
        if (Obj.i != null)
            PropertyList = PropertyList + i + '属性：' + Obj.i + '\r\n';
        else
            PropertyList = PropertyList + i + '方法\r\n';
    }
    return PropertyList;
}

// 获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //var r = window.location.search.substr(1).match(reg);

    //if (r != null) {
    //    return unescape(r[2]);
    //} else {
    //    return null;
    //}
    //兼容中文处理
    var r = encodeURI(window.location.search).substr(1).match(reg);
    if (r != null) {
        //将中文编码的字符重新变成中文
        return decodeURI(unescape(r[2]));
    } else {
        return null;
    }

}


// 获取url中的参数
function getUrlParamex(url, name) {
    //    alert(url);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}



//处理单双引号和 br换行问题 这个是 获得显示在服务器上的
function GetStrShow(str) {
    if (str == null) {
        return "";
    }
    if (str.length > 0) {
        str = str.replace(/\&quot;/ig, "\""); //双引号也需要转义，所以加一个斜线对其进行转义
        str = str.replace(/\&#39;/ig, "'");   //IE暂不支持单引号的实体名称,而支持单引号的实体编号,故单引号转义成实体编号,其它字符转义成实体名称
        //str = str.replace(/\<br/>/ig, "\n");
        str = str.replace("&quot;", "\""); //双引号也需要转义，所以加一个斜线对其进行转义
        //     str = str.replace("<br/>", "\n");

        var reg = new RegExp("<br/>", "g");
        str = str.replace(reg, "\n");
        var reg = new RegExp("<BR>", "g");
        str = str.replace(reg, "\n");

     
    }
    return str;
}

//获得存储的数据
function GetStrSave(str) {
    if (str == null) {
        return null;
    }
    if (str.length > 0) {
        //解决单双引号添加的问题
        //strV = strV.replace("\"", "\\\""); //双引号
        //strV = strV.replace("\"", "\\'’"); //单引号
        str = str.replace(/\'/ig, "&#39;");
        str = str.replace(/\"/ig, "&quot;");
     //   str = str.replace(/\\n/ig, "<br/>");//这个好像没有用
        //var reg = new RegExp("\n", "g");
        //str = str.replace(reg, "<br/>");
    }
    return str;
}

function strToJson(data) {
    var formData = data;
    var reg = new RegExp("\n", "g");
    formData = formData.replace(reg, "\\n");
    reg = new RegExp("\r", "g");
    formData = formData.replace(reg, "\\r");
    //formData = eval("({" + formData + "})");
    return formData;
}

//加载缺省的报表文件 fmTop 和 WebInput配套调用，其他地方无法调用
function LoadRptFile(cmbName) {
    try {

        //以后统一只考虑一个了
        var url = "../ajax/Design.ashx?Action=GetRptFile&GridType=" + mlngGridType + "";
        //if (mlngOrderID > 0) {
        //    url = "../ajax/Design.ashx?Action=GetRptFile&OrderID=" + mlngOrderID + "";
        //}
        //     alert("LoadRptFile" + url);

        $('#' + cmbName + '').combobox({
            url: url,
            valueField: 'ID',
            textField: 'Name'
            //onSelect: onCmbFileSelect,
            //onUnselect: onCmbFileUnSelect
        });
    } catch (ex) {
        alert("LoadRptFile:" + ex.message);
    }
}



//附带一些常用的asp函数
function left(mainStr, lngLen) {
    if (lngLen > 0) { return mainStr.substring(0, lngLen) }
    else { return null }
}

function right(mainStr, lngLen) {
    // alert(mainStr.length) 
    if (mainStr.length - lngLen >= 0 && mainStr.length >= 0 && mainStr.length - lngLen <= mainStr.length) {
        return mainStr.substring(mainStr.length - lngLen, mainStr.length)
    }
    else { return null }
}

function mid(mainStr, starnum, endnum) {
    if (mainStr.length >= 0) {
        return mainStr.substr(starnum, endnum)
    } else { return null }
        
    //mainStr.length 
}



function trim(mainStr) {
    var str = mainStr,

  str = str.replace(/^\s+/, '');

    for (var i = str.length - 1; i >= 0; i--) {

        if (/\S/.test(str.charAt(i))) {

            str = str.substring(0, i + 1);
            break;
        }

    }
    return str;

}

//JSONת ToString
function json2string(item) {
    var strOut = "";
    try {
   //     alert("json2string");
        $.each(item, function (k, val) {                //
            var strKey = k.toString();
      //          alert(strKey);
            strOut = strOut + strKey + ":'" + val + "',";

        });

        if (right(strOut, 1) == ",") {
            strOut = left(strOut, strOut.length - 1);
        }
    }
    catch (eException) {
        strOut = eException.message;
    }
    return strOut;
}

//跟 上面的 json2string 配对使用
function string2Item(result) {

    if (result) {
//        var json = eval("[{" + result + "}]"); //转换为json对象单条记录可以不用理会
        var json = eval("(" + result + ")");    //20130412 换一种写法
   
        var obj;
        $.each(json, function (idx, item) {
            //                        alert("ok2");
            //                        alert(item.Name);
            obj = item;
        });
    }
 //   alert(obj.Name);
    return obj;

}

//设置cookie
function SetCookie(key, value) {
    var date = new Date();
    //var year = date.getFullYear();
    var hour = date.getHours();
    var day = date.getDate();
    day = day + 1;
    date.setDate(day);
    date.setHours(23, 59, 59);   
    var path = GetCookiePath();
    var strKey = path + key;
    document.cookie = strKey + "=" + value + ";path=/;expires=" + date.toGMTString(); //设置Cookie值,路径,过期时间
}

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

function ReplaceFunc(sFuncEx) {
    sFuncEx = sFuncEx.replace(/\+/g, ";");
    sFuncEx = sFuncEx.replace(/\-/g, ";");
    sFuncEx = sFuncEx.replace(/\*/g, ";");
    sFuncEx = sFuncEx.replace(/\//g, ";");
    return sFuncEx;
}

function GetCookiePath() {
    var path = document.location.href;
    var lpos = path.indexOf("?");
    if (lpos > 0) {
        path = path.substring(0, lpos - 1);
    }
    
  //  path = path.replaceAll(":", "");
    lpos = path.indexOf("//");
    if (lpos > 0) {
        path = path.substring(lpos);
    }

    lpos = path.indexOf("viewhtml");
    if (lpos > 0) {
        path = path.substring(0,lpos);
    }
    lpos = path.indexOf("WebRpt");
    if (lpos > 0) {
        path = path.substring(0, lpos);
    }
    lpos = path.indexOf("WebSet");
    if (lpos > 0) {
        path = path.substring(0, lpos);
    }
    lpos = path.indexOf("RptTemp");
    if (lpos > 0) {
        path = path.substring(0, lpos);
    }
    path = path.replaceAll("/", "");    
    path = path.replaceAll("#", "");
    path = path.replaceAll("login.html", "");
    path = path.replaceAll("fmMain.html", "");
    path = path.replaceAll("viewhtml", "");

    return path;
}
function GetCookie(key) {//获取指定名称的cookie的值
    //var path = document.location.href;
 //   alert("GetCookie" + document.location.href);
    var path = GetCookiePath();
    var strKey = path + key;
 //   alert("GetCookie" + strKey);
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == strKey) return unescape(temp[1]);
    }
   
}

/* 删除Cookie
*  key 参数
*/
function DelCookie(key) {
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var val = CookieHelper.GetCookie(key);
    if (val != "")
        document.cookie = key + "=" + val + ";path=/;expires=" + date.toGMTString();
}

//获取窗体大小
function RegGetPos(strName, lGridType) {


    var strUrl = "WebSvr.aspx?now=" + new Date().getTime();
    var lGridType = 3;
    var strdlgname = strName + lGridType;

    var item = new Object;
    item.Top = 100;
    item.Left = 100;
    item.Width = 800;
    item.Height = 500;
    item.State = 0;
    //alert(strUrl);
    $.ajax({
        url: strUrl,
        type: "GET",
        async: false,
        data: { "action": "getpos", "dlgname": strdlgname },
        success: function (data) {

            var json = eval(data); //转换为json对象单条记录可以不用理会
            //alert(data);

            $.each(json, function (idx, pos) {

                item.Top = pos.Top;
                item.Width = pos.Width + "px";
                item.Height = pos.Height + "px";
                item.Left = pos.Left;
          //      item.State = pos.State;
            });
        }
    });
    return item;

}

//设置客户端控件的值
function getValByKey(strKey) {
    var strVal="";
    try {

        strVal = document.getElementById(strKey).value;
    }
    catch (eExcetion) {
      //  alert()
    }
    return strVal;
}

function FileIsImage(sFileUrl) {

    var isimg = 0;
    try{
        var lpos = sFileUrl.indexOf(".");
        var strExt = "";
        if (lpos > 0) {
            strExt = sFileUrl.substr(lpos + 1, sFileUrl.length - lpos);
            //        alert(strExt.toLowerCase());
        }

        switch (strExt.toLowerCase()) {
            case "dwg":
            case "dxf":
            case "jpg":
            case "gif":
            case "png":
            case "bmp":

            case "jpeg":
                //都是图片型的处理
            case "image/jpeg":
                isimg = 1;
                break;
            default:
                isimg = 0;

        }
    
    }
    catch (ex) {
        alert("JSCommon.FileIsImage" + sFileUrl+ ex.message);
    }
    return isimg;
}

//设置客户端控件的值
function setValByKey(strKey, strVal) {
    try {
        document.getElementById(strKey).value = strVal;
    }
    catch (eExcetion) {

    }
}


//保存窗体大小
function RegSavePos(strName,item) {

    //            alert(document.body.scrollHeight);
    //            alert(document.body.offsetHeight);
    //     alert(window.screen.height);
    //    alert(window.screen.width);


    var strUrl = "WebSvr.aspx?now=" + new Date().getTime();

    $.ajax({
        url: strUrl,
        type: "GET",
        data: { "action": "savepos", "dlgname": strName, "left": item.Left, "top": item.Top, "Width": item.Width, "Height": item.Height },
        success: function (data) {

            alert(data); //成功的标志就行了               
        }
    });

}


/** 
* 格式化数字显示方式 
* 用法 
* formatNumber(12345.999,'#,##0.00'); 
* formatNumber(12345.999,'#,##0.##'); 
* formatNumber(123,'000000'); 
* @param num 
* @param pattern 
*/
function formatNumberex(num, pattern) {
    var strarr = num ? num.toString().split('.') : ['0'];
    var fmtarr = pattern ? pattern.split('.') : [''];
    var retstr = '';

    // 整数部分   
    var str = strarr[0];
    var fmt = fmtarr[0];
    var i = str.length - 1;
    var comma = false;
    for (var f = fmt.length - 1; f >= 0; f--) {
        switch (fmt.substr(f, 1)) {
            case '#':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                break;
            case '0':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                else retstr = '0' + retstr;
                break;
            case ',':
                comma = true;
                retstr = ',' + retstr;
                break;
        }
    }
    if (i >= 0) {
        if (comma) {
            var l = str.length;
            for (; i >= 0; i--) {
                retstr = str.substr(i, 1) + retstr;
                if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr;
            }
        }
        else retstr = str.substr(0, i + 1) + retstr;
    }

    retstr = retstr + '.';
    // 处理小数部分   
    str = strarr.length > 1 ? strarr[1] : '';
    fmt = fmtarr.length > 1 ? fmtarr[1] : '';
    i = 0;
    for (var f = 0; f < fmt.length; f++) {
        switch (fmt.substr(f, 1)) {
            case '#':
                if (i < str.length) retstr += str.substr(i++, 1);
                break;
            case '0':
                if (i < str.length) retstr += str.substr(i++, 1);
                else retstr += '0';
                break;
        }
    }
    return retstr.replace(/^,+/, '').replace(/\.$/, '');
}


function formatNum(Num1, Num2) {
//    alert("JSCommon.formatNum");
    if (isNaN(Num1) || isNaN(Num2)) {
        return (0);
    } else {
        Num1 = Num1.toString();
        Num2 = parseInt(Num2);
        if (Num1.indexOf('.') == -1) {
            return (Num1);
        } else {
            var b = Num1.substring(0, Num1.indexOf('.') + Num2 + 1);
            var c = Num1.substring(Num1.indexOf('.') + Num2 + 1, Num1.indexOf('.') + Num2 + 2);
            if (c == "") {
                return (b);
            } else {
                if (parseInt(c) < 5) {
                    return (b);
                } else {
                    return ((Math.round(parseFloat(b) * Math.pow(10, Num2)) + Math.round(parseFloat(Math.pow(0.1, Num2).toString().substring(0, Math.pow(0.1, Num2).toString().indexOf('.') + Num2 + 1)) * Math.pow(10, Num2))) / Math.pow(10, Num2));
                }
            }
        }
    }
}
//真正强大的
function formatnumber(num1, fmt) {
 //   alert("JSCommon.formatnumber");
    var num = num1.toString();
  //  alert(num);
    var i = fmt.indexOf('.');
  //  alert(0);
    if (i <0) {
  //      alert(1);
        return formatNumberex(num,fmt);
    }
    else {
   //     alert(i);
   //     alert(fmt.toString().length);
        var str = right(fmt, fmt.toString().length - i);
   //     alert(str);
        var ilen = str.toString().length-1;
        var num2 = formatNum(num, ilen);
        return formatNumberex(num2, fmt);
    }
}


//例如： 
//12345格式化为12,345.00 
//12345.6格式化为12,345.60 
//12345.67格式化为 12,345.67 
//只留两位小数。 
function fmoney(s, n) {
//    alert("JSCommon.fmoney");
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
   r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}



////////返回错误码
function GetSvrErrMsg(lID) {
    var strMsg;
    strMsg = "";
    switch (lID) {
        case -1:
            strMsg = "保存到服务端错误！";
            break;
        case -2:
            strMsg = "保存到服务端错误！";
            break;
        default:
            strMsg = "保存到服务端错误！";
            break;
    }
    return strMsg;
}



function GetErrMsg(data) {
    var strErrMsg;
    switch (data) {
        case "-1":
            strErrMsg = "网络或其他问题，无法保存！";
            break;
        case "-2":
            strErrMsg = "超过记录数限制，无法保存！";
            break;
        case "-3":
            strErrMsg = "无相关权限，无法保存！";
            break;
        default:
            strErrMsg = "保存期间出现错误，无法保存！" + data;            
            break;
    }
    return strErrMsg;
}

//有树形结构的
function HasFieldTree(sField) {
    var lHas = 0;
    switch (sField.toLowerCase()) {
        //  case "department":
        case "filegroupname":
            lHas = 1;
            break;
        case "filegroupid":
            lHas = 1;
            break;
        case "groupid":
            lHas = 1;
            break;
        case "permid":
            lHas = 1;
            break;
    }

    return lHas;

}

//是否让用户选择Button
function HasSelButton() {
    var lHas = 0;
    switch (sField.toLowerCase()) {
        case "userlist":
        case "customer":
            lHas = 1;
            break;

    }

    return lHas;
}

//相关字段
function GetRelFieldName(strFieldName) {
    var strIn = strFieldName.toLowerCase();

    var strField = strIn;

    if (strIn == "wxman" || strIn == "jsman" || strIn == "lrman" || strIn == "lrman" || strIn == "reqman" || strIn == "bxman" || strIn == "bgman" || strIn == "newbgman" || strIn == "pzman" || strIn == "ysman" || strIn == "prjmanager") {
        strField = "empman";
    }
    else if (strIn == "authman" || strIn == "billman" || strIn == "xjman") {
        strField = "billman";// 提取组织架构人员
    }
    else if (strIn == "wxdepartment" || strIn == "bydepartment" || strIn == "jsdepartment" || strIn == "indepartment" || strIn == "outdepartment" || strIn == "usedepartment") {
        strField = "department";
    }
    else if (strIn == "jsdw" || strIn == "vender" || strIn == "fbvender" || strIn == "wbvender" || strIn == "wxvender") {
        strField = "vender";
    }
    else if (strIn == "vender1" || strIn == "vender2" || strIn == "vender3") {
        strField = "vender";
    }
    else if (strIn == "inck" || strIn == "outck") {
        strField = "ckset";
    }
    else if (strIn == "skmode" || strIn == "fkmode") {
        strField = "sfkmode";
    }
    else if (strIn == "inaccount" || strIn == "outaccount" || strIn == "bank") {
        strField = "bank";
    }
    else if (strIn == "idclass" || strIn == "certtype") {
        strField = "certtype";
    }
    else if (strIn == "memcardtype" || strIn == "memcardt") {
        strField = "memcardtype";
    }
    else if (strIn == "corptype" || strIn == "corpkind") {
        strField = "corpkind";
    }
    else if (strIn == "newaddress" || strIn == "oldaddress") {
        strField = "address";
    }
    else if (strIn == "newteam" || strIn == "oldteam") {
        strField = "useteam";
    }
    else if (strIn == "newbgamn" || strIn == "oldbgamn") {
        strField = "bgamn";
    }
    else if (strIn == "primarybusiness" || strIn == "trade" || strIn == "corpindustry") {
        strField = "trade";
    }
    else if (strIn == "customer" || strIn == "j_corpname" || strIn == "y_corpname") {
        strField = "customer";
    }
    else {
        strField = strIn;
    }

    return strField;
}

//合并两个相同的
function MergeList(str1, str2) {
    //    alert("MergeList"+str1+","+str2);
    var arr2 = new Array();
    //   var arr1 = str1.split(",");

    var strList = "";
    var sTemp = str1 + ",";
    if (str2 == "") {
        return str1;
    }
    if (str2.indexOf(",", 1) < 0) {
        //         alert("sTemp=" + sTemp);
        var sUser = str2 + ",";
        var lPos = sTemp.indexOf(sUser, 0)
        //        alert(lPos);
        if (lPos < 0) {
            sTemp = sTemp + str2;
        }

        //         alert("sTemp=" + sTemp);
    }
    else {
        arr2 = str2.split(",");
        for (var i = 0; i < arr2.length; i++) {
            if (sTemp.indexOf(arr2[i] + ",", 0) < 0) {
                sTemp = sTemp + arr2[i];
                sTemp = sTemp + ",";
            }
        }
    }
    strList = sTemp;
    //     alert(strList);
    if (right(strList, 1) == ",") {
        strList = mid(strList, 0, strList.length - 1);
    }
    if (left(strList, 1) == ",") {
        strList = mid(strList, 1, strList.length - 1);
    }
    //  alert(strList);
    return strList;
}

/////////////////////////////////////////////////////////
//弹出调试信息 这个代码始终保持在最后面吧 每次调试完毕就可以改glngShowDebug=0
function alertd(strmsg) {
    var glngShowDebug = 1;
    // glngShowDebug = GetCookie("ShowDebug");
    //alert("ShowDebug="+ glngShowDebug);
    if (glngShowDebug == 1) {
        alert("aleted:" + strmsg);
    }
}
//给新的调用
function IsValidHandler(strPermStr, lOper) {

    var bValid = false;
    var iStart = lOper - 1;
    //    alert("IsValidOper"+iStart+":"+strPermStr);
    if (mid(strPermStr, iStart, 1) == "A") {
        return true;
    }
    else {

        var strMsg = "无相关权限操作，请联系管理员给予相应权限";     
        //  jAlert(strMsg);//修改一下 暂时屏蔽吧
    }

    return bValid;
}

//是否是合法的操作
function IsValidOper(strPermStr, lOper) {

    var bValid = IsValidHandler(strPermStr, lOper);
    if(bValid==false){
        var strMsg = "无相关权限操作，请联系管理员给予相应权限";
        alert(strMsg);
      //  jAlert(strMsg);//修改一下 暂时屏蔽吧
    }

    return bValid;
}

function IsValidOperEx(sTitle,strPermStr, lOper) {

    var bValid = IsValidHandler(strPermStr, lOper);
    if (bValid == false) {
        var strMsg = "当前登录用户无【" + sTitle + "】相关权限操作，请联系管理员给予相应权限！";
        alert(strMsg);      //对于有的界面会出现闪退的问题，调用地方过多，不适宜用这个了
      //  jAlert(strMsg);//修改一下
    }
    return bValid;
}


//存储特殊字段内容添加到JSON
function GetJsonField(obj, strKey, strvalue) {
    var strJson = "";
    var strHideValue = "";
    //做转义，处理一些特殊字符的保存，例如',"等符号
    // strvalue = strvalue.toString().replace(new RegExp('(["\"])', 'g'), "\\\"");
    //  strvalue = strvalue.toString().replace(/\'/g, "") //强行把'去掉
    strvalue = strvalue.toString().replace(/\'/g, "\"") //强行把'去掉

    //   alertd("GetJsonFieldXX:" + strvalue);

    switch (strKey) {
        case "GroupID":
            //      alert("GroupID:strHideValue");
            strHideValue = GetHideValue(obj);
            if (strHideValue == "") {
                strHideValue = "0";
            }
            if (strHideValue != "") {
                strJson = "GroupID:'" + strHideValue + "',GroupName:'" + strvalue + "',";
            }
            //       alert(strHideValue);
            //strJson = strJson + strKey + ":'" + strvalue + "',";
            break;
        case "ObjID":
            //      alert("GroupID:strHideValue");
            strHideValue = GetHideValue(obj);
            //alert(strHideValue);
            if (strHideValue == "") {
                strHideValue = "0";
            }
            if (strHideValue != "") {
                strJson = "ObjID:'" + strHideValue + "',ObjName:'" + strvalue + "',";
                //alert(strJson);
            }
            //       alert(strHideValue);
            //strJson = strJson + strKey + ":'" + strvalue + "',";
            break;
        case "ChangeType"://变化类型

            strJson = strJson + strKey + ":'" + strvalue + "',";
            break;
        case "InOutType"://进出类型
            strJson = strJson + strKey + ":'" + strvalue + "',";
            break;

        case "Customer":
            strHideValue = GetHideValue(obj);
            if (strHideValue != "") {
                strJson = "CustomerCode:'" + strHideValue + "',";
            }
            //    alert(strJson);
            strJson = strJson + strKey + ":'" + strvalue + "',";
            break;
        case "Vender":
            strHideValue = GetHideValue(obj);
            if (strHideValue != "") {
                strJson = "CustomerCode:'" + strHideValue + "',";
            }
            strJson = strJson + strKey + ":'" + strvalue + "',";
            break;
        case "AgioType":
            strHideValue = GetHideValue(obj);
            if (strHideValue != "") {
                strJson = "Agio:'" + strHideValue + "',";
            }
            strJson = strJson + strKey + ":'" + strvalue + "',";
            break;

        default:
            strJson = strJson + strKey + ":'" + strvalue + "',";
            break;
    }


    return strJson;
}

//设置隐藏值 所有Obj都支持这个的
function SetHideValue(obj, value) {
    //alert(value);
    //var txt = document.getElementById("txt1");
    obj.setAttribute("hidevalue", value);

}
//获取隐藏值
function GetHideValue(obj) {
    //var txt = document.getElementById("txt1");
    var hidevalue = obj.getAttribute("hidevalue");
    if (hidevalue == null) {
        hidevalue = "";
    }
    if (hidevalue == undefined) {
        hidevalue = "";
    }
    return hidevalue;

}
//显示一个对象的所有属性和方法
function ShowObjProperty(Obj) {
    var PropertyList = '';
    var PropertyCount = 0;
    for (i in Obj) {
        if (Obj.i != null)
            PropertyList = PropertyList + i + '属性：' + Obj.i + '\r\n';
        else
        {
            //alert(typeof (Obj[p]));
            //if (typeof (Obj.i) == "function") {
                PropertyList = PropertyList + i + '方法\r\n';
            //}
            //else {
            //    PropertyList = PropertyList + i + '属性\r\n';
            //}
        }
           
    }
    return PropertyList;
 //   alert(PropertyList);

}
//yyyy-MM-dd
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}



// 方法四 千分位数字化
function toThousands(num) {

    var num = (num || 0).toString(), result = '';

    while (num.length > 3) {

        result = ',' + num.slice(-3) + result;

        num = num.slice(0, num.length - 3);

    }

    if (num) { result = num + result; }

    return result;

}

//千分位格式化调用方法
//console.log(number_format(1000.123, 2));  // 1,000.13
function number_format(number, decimals, dec_point, thousands_sep) {
    /*
  　　 * 参数说明：
  　　 * number：要格式化的数字
  　　 * decimals：保留几位小数
  　　 * dec_point：小数点符号
  　　 * thousands_sep：千分位符号
  　　 * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
     sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
     dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
     s = '',
    toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.ceil(n * k) / k;
    };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

/* 
* 用来遍历指定对象所有的属性名称和值 
* obj 需要遍历的对象 
* author: Jet Mah 
*/
//function ShowObjProperty(obj) {
//    // 用来保存所有的属性名称和值 
//    var props = "";
//    // 开始遍历 
//    for (var p in obj) {
//        // 方法 
//        if (typeof (obj[p]) == "function") {
//        //    obj[p]();
//            props += p+"方法";
//        } else {
//            // p 为属性名称，obj[p]为对应属性的值 
//            props += p + " = " + obj[p] + " \t ";
//            props += p + " = " + obj[p] + " \t ";
//        }
//    }
//    // 最后显示所有的属性 
//    alert(props);
//}




//这个是为了不跟主Common相同
function ShowDesignEx() {

    //     var ldbtype = document.getElementById("hid_dbtype").value;


    //   mstrDBType = "DBID";
    try {
     //   alert("ShowDesignEx开始"+mlngGridType);
        var sPerm = mstrPermString;//需要执行权限
        if (!IsValidHandler(sPerm, eOperDesign)) {
            $.messager.alert("提示", "当前用户设计权限，必须获得该操作的【设计】权限，请联系管理员开通");
            return;
        }
        //if (mstrDBType == "OrderID") {
        //    lDBID = mlngOrderID;
        //    var lGridType = mlngGridType;
        //    strUrl = "../WebSet/WebDesign.html?now=" + new Date().getTime() + "&OrderID=" + lDBID + "&GridType=" + lGridType+"";
        //}
        //else {
            lDBID = mlngDBID;
            lDBID = mlngGridType;//考虑不同分组不同录入界面情况下
            strUrl = "../WebSet/WebDesign.html?now=" + new Date().getTime() + "&DBID=" + lDBID + "";
        //}
 //       alert(strUrl);
        ShowDlg(1050, 750, strUrl);
    }
    catch (ex) {
        alert("JSCommon.ShowDesignEx"+ex.message);
    }
}
function ShowGridSet(lGridType,lShowSetType) {

    //     var ldbtype = document.getElementById("hid_dbtype").value;
    if (lShowSetType == undefined) {
        lShowSetType = 0;
    }
  //  alert("ShowGridSet.lShowSetType" + lShowSetType);
    //   mstrDBType = "DBID";
    try {

        var sPerm = mstrPermString;//需要执行权限
        if (!IsValidHandler(sPerm, eOperDesign)) {
            $.messager.alert("提示", "当前用户无列设置权限，必须获得该操作的设权限，请联系管理员开通");
            return;
        }
      
        var url = "../WebSet/DlgGridSet.html?GridType=" + mlngGridType + "&ShowSetType=" + lShowSetType + "";
    //    alert(url);
        var lwidth = 1050;
        var lheight = 900;
        if (lShowSetType == 1) {
            lwidth = 800;
            lheight = 700;
        }
        ShowDlg(lwidth, lheight, url);
      
    }
    catch (ex) {
        alert("JSCommon.ShowGridSet" + ex.message);
    }
}

//报表打印设置
function ShowPrintSet() {

    //     var ldbtype = document.getElementById("hid_dbtype").value;

    //   mstrDBType = "DBID";
    try {

        var sPerm = mstrPermString;
        if (!IsValidHandler(sPerm, eOperPrint)) {
            $.messager.alert("提示", "当前用户无打印权限，需要获得该操作的【打印】权限，请联系管理员开通");
            return;
        }

        if (mstrDBType == "OrderID") {
            lDBID = mlngOrderID;
            strUrl = "../WebSet/WebDesign.html?now=" + new Date().getTime() + "&OrderID=" + lDBID + "&IsRpt=1";
        }
        else {
            lDBID = mlngDBID;
            strUrl = "../WebSet/WebDesign.html?now=" + new Date().getTime() + "&DBID=" + lDBID + "&IsRpt=1";
        }
        //   alert(strUrl);
        ShowDlg(1050, 750, strUrl);
    }
    catch (ex) {
        alert("JSCommon.ShowPrintSet" + ex.message);
    }
}

//是否有相关订单
function HasRelOrder( lngOrderType)
{
    var bHas = true;
    var strKey="";
    var sCaption = "";
    var lRelOrder = -1;
    bHas = true;
    var obj = new Object;
    switch (parseInt( lngOrderType)) 
    {
        case eOrder_CGSQD:
            //采购订单
            //if (glngHasCGBJD == 1) {
            lRelOrder = eOrder_CGJHD;
            strKey = "rel_" + ((eOrder_CGJHD)).toString();
            sCaption = "引用采购计划单";
    
            break;

        case eOrder_CGDD:
            //采购订单
            //if (glngHasCGBJD == 1) {
            lRelOrder = eOrder_CGBJD;
            strKey = "rel_" + ((eOrder_CGBJD)).toString();
            sCaption = "引用采购报价单";
            //} else {
            //    sCaption = "引用相关订单";
            //    bHas = false;
            //}
            //if (glnghasCGSQ == 1) {
            //    sCaption = "引用采购申请单";
            //    bHas = true;
            //}
            break;
        case eOrder_CGRKD:
            //采购入库单
            lRelOrder = eOrder_CGDD;
            strKey = "rel_" + ((eOrder_CGDD)).toString();
            sCaption = "引用采购订单";
            break;
        case eOrder_CKLLD:
        case eOrder_CKDBD:

        case eOrder_CGFKD:
            //采购付款单
            lRelOrder = eOrder_CGRKD;
            strKey = "rel_" + ((eOrder_CGRKD)).toString();
            sCaption = "引用采购收货单";
            break;
            //case eOrder_FKSQD:
            //    sCaption = "引用采购收货单";
            //    break;

        case eOrder_CGTHD:
            //采购退货单
            lRelOrder = eOrder_CGRKD;
            strKey = "rel_" + ((eOrder_CGRKD)).toString();
            sCaption = "引用采购收货单";
            break;
            //case eOrder_XSDXJSD:
            //    //委托代销结算单
            //    sCaption = "引用代销单";
            //    break;
        case eOrder_XSDD:
            //销售订单
            lRelOrder = eOrder_XSBJD;
            strKey = "rel_" + ((eOrder_XSBJD)).toString();
            sCaption = "引用销售报价单";
            break;
        case eOrder_XSCKD:
            //销售出库单，销售开单
            lRelOrder = eOrder_XSDD;
            strKey = "rel_" + ((eOrder_XSDD)).toString();
            sCaption = "引用销售订单";
            break;
            //case eOrder_XSKHCJD:
            //    sCaption = "引用销售报价单";
            //    break;
        case eOrder_XSSKD:
            //销售收款单
            lRelOrder = eOrder_XSCKD;
            strKey = "rel_" + ((eOrder_XSCKD)).toString();
            sCaption = "引用销售出库单";
            break;
        case eOrder_XSTHD:
            //销售退货单
            lRelOrder = eOrder_XSCKD;
            strKey = "rel_" + ((eOrder_XSCKD)).toString();
            sCaption = "引用销售出库单";
            break;
        default:
            bHas = false;
            break;
    }

    obj.Has = bHas;
    obj.Key = strKey;
    obj.Caption = sCaption;
    obj.RelOrderType = lRelOrder;
//    alert(JSON.stringify(obj));
    return obj;

}

///Jquery Easy DataGrid的扩展方法
//网格汇总计算
function GridTotalSumCol(dgName, colName) {
    var rows = $('#' + dgName + '').datagrid('getRows');
    //var total = 0;
    //for (var i = 0; i < rows.length; i++) {
    //    total += parseFloat(rows[i][colName]);
    //}
    //return total;

    return GridTotalSumColByRows(rows, colName);
}

function GridTotalSumColByRows(rows, colName) {
 //   alert("GridTotalSumColByRows");
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
        total += parseFloat(rows[i][colName]);
    }
    return total;
}

//网格汇总求平均值
function GridTotalAvgCol(dgName, colName) {
    var rows = $('#' + dgName + '').datagrid('getRows');
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
        total += parseFloat(rows[i][colName]);
    }
    if (rows.length > 0) {
        total = total / rows.length;
    }    
    return total;
}
//动态设置网格高度
function GridSetHeight(dgName, sHeight,sFontSize) {

    try{
        var panel = $("#" + dgName + "").datagrid('getPanel');
        var fields = $("#" + dgName + "").datagrid('getColumnFields', false);
        //datagrid头部 table 的第一个tr 的td们，即columns的集合

        var headerTds = panel.find(".datagrid-view2 .datagrid-header .datagrid-header-inner table tr:first-child").children();

        //重新设置列表头的对齐方式
        headerTds.each(function (i, obj) {
            obj.style.height = "45px";
        })

        var trlist = panel.find(".datagrid-row").children();
        trlist.each(function (i, obj) {
            obj.style.height = sHeight;
        
        })

 
  

        //动态改变行高
        //    var panel = $(this).datagrid('getPanel');


        ////设置表头高度           
        //var trlist = panel.find(".datagrid-header").children();
        //trlist.each(function (i, obj) {
        //    obj.style.height = sHeight;
        //})

        //var trlist = panel.find(".datagrid-htable").children();
        //trlist.each(function (i, obj) {
        //    obj.style.height = sHeight;
        //})
        //var trlist = panel.find(".datagrid-header-row").children();
        //trlist.each(function (i, obj) {
        //    obj.style.height = sHeight;
        //})

        $('.datagrid-header .datagrid-cell span ').css('font-size', sFontSize); //datagrid中的列名称
    //    $('.panel-title').css('font-size', sFontSize); //标题 这个会导致左边导航栏的字体大小都改变
        $('.datagrid-cell').css('font-size', sFontSize); //更改的是datagrid中的数据

        //   }

        //   var  Tds = panel.find(".datagrid-view2 .datagrid-header .datagrid-header-inner table tr:first-child").children();

        $("#" + dgName + "").datagrid('resize', false);//自动 调用尺寸刷新一下
    }
    catch (ex) {
        alert("JSCommon.GridSetHight:" + ex.message);
    }



}

//动态设置表头对齐方式
function GridSetHeadAlign(dgName, sAlign) {
    var fields = $("#" + dgName + "").datagrid('getColumnFields', false);
    //datagrid头部 table 的第一个tr 的td们，即columns的集合
    var panel = $("#" + dgName + "").datagrid("getPanel");
    var headerTds = panel.find(".datagrid-view2 .datagrid-header .datagrid-header-inner table tr:first-child").children();

    //重新设置列表头的对齐方式
    headerTds.each(function (i, obj) {
        var col = $("#" + dgName + "").datagrid('getColumnOption', fields[i]);
        if (!col.hidden && !col.checkbox) {
            //    var headalign=col.headalign||col.align||'left';
            //   $("div:first-child", obj).css("text-align", headalign);
            $("div:first-child", obj).css("text-align", sAlign);
           
            if (mlngIsApp == 1) {
         //       console.log("GridSetHeadAlign改变表头高度")
                $("div:first-child", obj).css("height", "35px");

            }
        }
    })
}


//增加显示按钮
function GridFormatPDFlag(val, rowdata, index) {
    //  var sCheck = "<input type='checkbox' value='" + rowdata.IsShow + "' \" >";
    var sCheck = "";
    var strChecked = "";
    var strPD="未盘点"
    if (parseInt(rowdata.PDFlag) == 1) {

        strChecked = 'checked="true"';
        strPD = "已盘"
    }
    var strField = "PDFlag";
    sCheck = '<input ' + strChecked + ' type="checkbox" value="' + rowdata.PDFlag + '" name="checkbox' + index + '"  onclick="onGridChecked(\'' + index + '\',\'' + strField + '\')"> ' + strPD + '';

    //  var sCheck = "<input type='checkbox' checked=false >";
    return sCheck;
}


//网格货币化问题 保留两位小数 只需要设置为 0.00即可
function GridFormatNumber(value, row, index) {
 //   alert("JSCommon.GridFormatNumber" + value+JSON.stringify(row));
    var strValue = formatNumberEx(value,2);
 //   alert("index=" + index + "value:" + value + "值：" + strValue);
    return strValue;
}
function GridFormatNumberPercent2(value, row, index) {
    //   alert("JSCommon.GridFormatNumber" + value+JSON.stringify(row));
    var strValue = formatNumberEx(value, 2);
    strValue = strValue + "%";
    //   alert("index=" + index + "value:" + value + "值：" + strValue);
    return strValue;
}

function GridFormatNumberPercent(value, row, index) {
    //   alert("JSCommon.GridFormatNumber" + value+JSON.stringify(row));
    var strValue = formatNumberEx(value,0);
    strValue = strValue + "%";
    //   alert("index=" + index + "value:" + value + "值：" + strValue);
    return strValue;
}



//设置三位小数点
function GridFormatNumber3(value, row, index) {
    
    var strValue = formatNumberEx(value, 3);
    //    alert("index=" +index +"值："+ strValue);
    return strValue;
}

//4位小数点 
function GridFormatNumber4(value, row, index) {
   
    var strValue = formatNumberEx(value, 4);
   
    return strValue;
}

//缺省的设置
function GridFormatDefault(value, row, index) {
   
    var lAmountLen = 2;
    if (mlngAmountLen == undefined) {
       
    } else {
        lAmountLen = mlngAmountLen;
    }
    var strValue = formatNumberEx(value, lAmountLen);
 //   alert("index=" +index +"值："+ strValue);
    return strValue;
}

//货币化形式
function GridFormatCurrency(value, row, index) {
 
    var strValue = formatCurrency(value);
    //    alert("index=" +index +"值："+ strValue);
    return strValue;
}
//格式化长整型日期 yyyy-MM-dd hh:mm:ss
function GridFormatDateLong(value, row, index) {
    if (value == null || value == "" || value == undefined)
        return "";
    var myDate = new Date();
    myDate = StringToDate(value);

    var strValue = myDate.Format("yyyy-MM-dd hh:mm:ss");
    //    alert("index=" +index +"值："+ strValue);
    return strValue;
}
//格式化短整型日期 yyyy-MM-dd 这个地方要注意 否则会产生split 错误 ，还以为是插入 input.js.InsertRowItem 那里产生错误
function GridFormatDateShort(value, row, index) {

    if(value==null||value==""||value==undefined)
        return "";

 //   alert("GridFormatDateShort:"+value);
    var myDate = new Date();
    myDate = StringToDate(value);
 //   alert("GridFormatDateShort:myDate:" +myDate);
    var strValue = myDate.Format("yyyy-MM-dd");
    //    alert("index=" +index +"值："+ strValue);
    return strValue;
}

//合同收付类型字段
function GridFormatHTSFType(value, row, index) {
    if (row.IsTotal > 0) {
        return "";//合计行不要搞事
    }
    if (value == null || value == "" || value == undefined)
        return "";
    var strValue = "";
    switch (parseInt(value)) {
        case 1:
            strValue = '收款';
            break;
        case -1:
            strValue = '付款';
            break;   
    }
    return strValue;
}

//合同收付类型字段
function GridFormatSZFlag(value, row, index) {
    if (row.IsTotal > 0) {
        return "";//合计行不要搞事
    }
    if (value == null || value == "" || value == undefined)
        return "";
    var strValue = "";
    switch (parseInt(value)) {
        case 1:
            strValue = '收';
            break;
        case -1:
            strValue = '支';
            break;
    }
    return strValue;
}
//审核标志
function GridFormatCheckFlag(value, row, index) {
    if (row.IsTotal > 0) {
        return "";//合计行不要搞事
    }
    if (value == null || value == "" || value == undefined)
        return "未审核";
    var strValue = "";
    switch (parseInt(value)) {
        case 1:
            strValue = '已审核';
            break;
        case 0:
            strValue = '未审核';
            break;
    }
    return strValue;
}


//审核标志格式化
function GridFormatExecFlag(value, row, index) {
    if (row.IsTotal > 0) {
        return "";//合计行不要搞事
    }
    if (value == null || value == "" || value == undefined)
        return "未执行";
 
    var strValue = "未执行";
    switch (parseInt(value)) {
        case 1:
            strValue = '已执行';
            break;
        case 0:
            strValue = '未执行';
            break;
    }
    return strValue;
}


//报废标志
function GridFormatDelFlag(value, row, index) {
    if (row.IsTotal > 0) {
        return "";//合计行不要搞事
    }
    if (value == null || value == "" || value == undefined)
        return "未报废";
    var strValue = "";
    switch (parseInt(value)) {
        case 1:
            strValue = '已报废';
            break;
        case 0:
            strValue = '未报废';
            break;
    }
    return strValue;
}

//打印标志
function GridFormatPrintFlag(value, row, index) {
    if (row.IsTotal > 0) {
        return "";//合计行不要搞事
    }
    if (value == null || value == "" || value == undefined)
        return "未打印";
    var strValue = "";
    switch (parseInt(value)) {
        case 1:
            strValue = '已打印';
            break;
        case 0:
            strValue = '未打印';
            break;
    }
    return strValue;
}

function formatNumberEx(value, n) {

    //参数说明：num 要格式化的数字 n 保留小数位      
    var number = Number(value);
    if (isNaN(number)) {
        return '';
    } else {
        number = number.toFixed(n)
        //if (fixed == 2) {
        //    return number.toFixed(2) * 100 / 100;
        //} else if (fixed == 6) {
        //    return number.toFixed(6) * 1000000 / 1000000;
        //}
    }
    return number;

    //num = String(num.toFixed(n));
    //var re = /(-?\d+)(\d{3})/;

    //while (re.test(num)) {
    //    num = num.replace(re, "$1,$2");
    //}

    //return num;

}
/**
* 将数值四舍五入(保留2位小数)后格式化成金额形式
*
* @param num 数值(Number或者String)
* @return 金额格式的字符串,如'1,234,567.45'
* @type String
*/
function formatCurrency(num) {
    try {
        if (num == null || num == 'null' || num == undefined) {
            return 0;
        }
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    } catch (ex) {
        alert("formatCurrency.num=" + num + ex.message);
    }
    

}


//解决 encodeURIComponent不编码-_.!~*'()，
function encodeDataOld(s) {

    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");

}

function decodeDataOld(s) {
    try {

        return decodeURIComponent(s.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")"));

    } catch (e) {

    }
    return "";
}



/**
     * 加密函数
     * @param str 待加密字符串
     * @returns {string}
     */
function encodeData(str) {
    try {
        if (str == "" || str == undefined||str == null) {
            return "";
        }
        return encryptionstr(str);

       
        //var c = String.fromCharCode(str.charCodeAt(0) + str.length);
        //for (var i = 1; i < str.length; i++) {
        //    c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1));
        //}
        //return encodeURIComponent(c);
    } catch (ex) {
        alert("JSCommon.encodeData.str：" + str + "错误：" + ex.message);
        return "";
    }
}

/**
     * 解密函数
     * @param str 待解密字符串
     * @returns {string}
     */
function decodeData(str) {
    try {
         if (str == "" || str == undefined || str == null) {
            return "";
        }
        return decryptstr(str);
       
        //str = decodeURIComponent(str);
        //var c = String.fromCharCode(str.charCodeAt(0) - str.length);

        //for (var i = 1; i < str.length; i++) {
        //    c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
        //}
        //return c;
    } catch (ex) {
        alert("JSCommon.decodeData.str：" + str + "错误：" + ex.message);
        return "";
    }
  
}



// 加密
function encryptionstr(str) {

    let newstr = [];
    let number = Math.random() * 200; // 0 ~ 接近200
    number = Math.trunc(number)  // 0 ~ 199

    for (let i = 0; i < str.length; i++) {
        newstr.push(str.charCodeAt(i) + number);
    }
    newstr.push(number)
    return escape(newstr.toString());
}

// 解密
function decryptstr(str) {

    str = unescape(str);

    // 把字符串以逗号切割为数组
    let arr = str.split(',');
    let number = arr.pop();

    let newarr = [];
    arr.forEach(function (item) {
        let temp = String.fromCharCode(item - number);
        newarr.push(temp)
    });

    return newarr.join('');
}

function GetMainName(lGridType,sFileName) {
    //   alert("GetMainName" + lGridType);
    switch (sFileName) {
        case "Vender":
            return "供应商"
            break;
        case "Customer":
            return "客户"
            break;
    }
    lGridType = parseInt(lGridType);
    var sName = '合同';
    if (lGridType > 2000 && lGridType < 3000) {
        sName = '客户';
    } else if (lGridType > 3000 && lGridType < 4000) {
        sName = '会员';
    } else if (lGridType > 4000 && lGridType < 5000) {
        sName = '合同';
    } else if (lGridType > 5000 && lGridType < 6000) {
        sName = '资产';
    } else if (lGridType > 6000 && lGridType < 7000) {
        sName = '设备';
    } else if (lGridType > 7000 && lGridType < 8000) {
        switch (parseInt(lGridType)) {
            case 7071:
            case 7072:
            case 7073:
            case 7075:
                sName = '档案';
                break;
            default:
                sName = '人员';
                break;
        }
    }
    switch (parseInt(lGridType)) {
        case 41:
            sName = '客户';
            break;
        case 542:
            sName = '人员';
            break;
        case 543:
            sName = '资产';
            break;
        case 547:
        case 541:
            sName = '合同';
            break;
        case 7073:
        case 546:
            sName = '档案';
            break;
        case 5004:
            sName = '配件';
            break;
        case 8008:
        case 8005:
            sName = '工序';
            break;
        case 8006:
            sName = '工种';
            break;
        //default:
        //    sName = '人员';
            break;
    }

    return sName;
};

//js加密 + c#后台解密 配合函数
function getEncodeString(srcString) {
    var BASE32CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var i = 0;
    var index = 0;
    var digit = 0;
    var currByte;
    var nextByte;
    var retrunString = '';
    srcString = encodeURI(srcString);//这样先把汉子处理掉
    for (var i = 0; i < srcString.length;) {
        //var          index    = 0;   
        currByte = (srcString.charCodeAt(i) >= 0) ? srcString.charCodeAt(i)
            : (srcString.charCodeAt(i) + 256);

        if (index > 3) {
            if ((i + 1) < srcString.length) {
                nextByte = (srcString.charCodeAt(i + 1) >= 0)
                    ? srcString.charCodeAt(i + 1)
                    : (srcString.charCodeAt(i + 1) + 256);
            } else {
                nextByte = 0;
            }

            digit = currByte & (0xFF >> index);
            index = (index + 5) % 8;
            digit <<= index;
            digit |= (nextByte >> (8 - index));
            i++;
        } else {
            digit = (currByte >> (8 - (index + 5))) & 0x1F;
            index = (index + 5) % 8;

            if (index == 0) {
                i++;
            }
        }

        retrunString = retrunString + BASE32CHAR.charAt(digit);
    }
    return retrunString.toLowerCase();
};


//显示加载信息
function onShowMask(wrapid,msg) {

    var wrap = $('#' + wrapid + ''); 
    //  var wrap = $('#bodyMain');
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: wrap.width(), height: wrap.height() }).appendTo(wrap);
    $("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo(wrap).css({ display: "block", left: (wrap.width() - $("div.datagrid-mask-msg", wrap).outerWidth()) / 2, top: (wrap.height() - $("div.datagrid-mask-msg", wrap).outerHeight()) / 2 });

}

//删除显示加载信息
function onRemoveMask() {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

//遮罩问题
var MaskUtil = (function () {

    var $mask, $maskMsg;

    var defMsg = '正在处理，请稍待。。。';

    function init() {
        if (!$mask) {
            $mask = $("<div id='mask' class=\"datagrid-mask mymask\"></div>").appendTo("body");
        }
        if (!$maskMsg) {
            $maskMsg = $("<div id='maskmsg'  class=\"datagrid-mask-msg mymask\">" + defMsg + "</div>")
                .appendTo("body").css({ 'font-size': '12px' });
        }

        $mask.css({ width: "100%", height: $(document).height() });

        $maskMsg.css({
            left: ($(document.body).outerWidth(true) - 190) / 2,
            top: ($(window).height() - 45) / 2
        });

    }

    return {
        mask: function (msg) {
            init();
            $mask.show();
            $maskMsg.html(msg || defMsg).show();
        }
        , unmask: function () {
            $mask.hide();
            $maskMsg.hide();
        }
    }

}());


//一些扩展用法 这个是树形控件扩展用法
$.extend($.fn.tree.methods, {
    getLevel: function (jq, target) {
        var l = $(target).parentsUntil("ul.tree", "ul");
        return l.length + 1;
    }
});








