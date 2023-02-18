

//var eOperAdd = 1;
//var eOperEdit = 3;
//var eOperDel = 4;
//var eOperAudit = 5;
//var eOperExec = 6;
//var eOperPrint = 7;
//var eOperAddLike = 8;
//var eOperDisCard = 9;  //作废

var mPreUrl = "";//调用 前的URL
var bShowPopup = true;
var iframe;
var glngIs360 = 0;
var mdicWin = new Dictionary();
var mdicUrl = new Dictionary();
var i = 0;
function OnPopupInit() {
//    alert("OnPopupInit");
    iframe = PopupControl1.GetContentIFrame();
    if (iframe == null) {
  //      alert("iframe=null");
    }
    /* the "load" event is fired when the content has been already loaded */
    ASPxClientUtils.AttachEventToElement(iframe, 'load', OnContentLoaded);
}

function onBtnInit(s, e) {
    iframe = s.GetMainElement();
    if (iframe == null) {
        alert("iframe=null");
    }
    ASPxClientUtils.AttachEventToElement(iframe, 'click', OnBtnSaviing);
}

function OnBtnSaviing() {
    iframe = this.GetMainElement();
    LoadingPanel1.ShowInElement(iframe);
}

function OnPopupShown() {
 //   alert("OnPopupShown");
    var aa = PopupControl1;
    if (bShowPopup)
        LoadingPanel1.ShowInElement(iframe);
}

function OnContentLoaded() {
 //   alert("OnContentLoaded");
    bShowPopup = false;
    LoadingPanel1.Hide();
}

function onClosing() {

    PopupControl1.SetContentUrl("about:blank");
    
}

function ShowPopup(width, height, contenturl, headertext) {
    bShowPopup = true;
    PopupControl1.SetWidth(width);
    PopupControl1.SetHeight(height);
    PopupControl1.SetContentUrl(contenturl);
    PopupControl1.SetHeaderText(headertext);
    PopupControl1.Show();
}


function SetProgressBarPosition() {
    if (i < 100) {
        i = i + 5;
    }
    else {
        i = 0;
    }
    ProgressBar1.SetPosition(i);
}
//是否是360浏览器
function IsChrome() {
    var lIs = 0;
    var lPos = navigator.userAgent.indexOf("Chrome");//判断是否是  google浏览器
    if (lPos > 0) {
        var strList = navigator.userAgent.toString();
        //     alert(lPos);
        var lver = strList.substr(lPos + 7, 2);
        //      alert(lver);//>37则使用这个 从37之后，就不支持这个了
        if (lver >= 37) {
            lIs = 1;
        }
    }
    return lIs;
}

function isIE() { //ie?  
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}
//适合Mobile的
function ShowMobDlg(strUrl) {
    
//    alert("ShowDlg" + navigator.userAgent.toString());


     //   alert("!isPC");//弹出当前网址 然后去新的网址
        //    window.open(strUrl);//到新的窗体就返回吧
       
    mPreUrl = window.location.href;//
 
    mPreUrl = escape(mPreUrl);
//      alert("ShowDlg:" + mPreUrl);//弹出当前网址 然后去新的网址

    strUrl = strUrl + "&IsMobile=1&PreUrl=" + mPreUrl + "";
//      alert(strUrl);
    window.location.href = strUrl;

    return;
 

}

//iWidth:宽度 iHeight：高度
//适合PC端口的
function ShowDlg(iWidth, iHeight, strUrl) {

  //  alert("ShowDlg:iWidth" + navigator.userAgent.toString());

//    alert("JSCom.ShowDlg:iWidth" + iWidth + "iHeight" + iHeight + strUrl);
    if (mlngIsApp != undefined) {
        if (mlngIsApp == 1) {
            strUrl = strUrl + "&IsApp=1";//强制带上一个
            clicked(strUrl);//调用APP打开函数
            return;
        }
    }
  

    var lShowMax = 0;

    //return sRet;
    if (iHeight == 1) {
        lShowMax = 1;
    }

    if (iWidth < 200) {
        iWidth = 800;
    }
    //处理全屏问题

    if (iHeight < 100 && iHeight != 1) {
        iHeight = 300;
    }

    strUrl = strUrl + "&PopupType=1";
    var result = "";
    var isUseDailog = 1;
    var lPos = navigator.userAgent.indexOf("Chrome");//判断是否是  google浏览器
    if (lPos > 0) {
        var strList = navigator.userAgent.toString();
        //     alert(lPos);
        var lver = strList.substr(lPos + 7, 2);
        //      alert(lver);//>37则使用这个 从37之后，就不支持这个了
        if (lver >= 37) {
            isUseDailog = 0;
        }

    }
    var iTop = 150;
    var iLeft = 200;
    //alert(iTop);
    //alert(iWidth);
    //var iTop = (document.documentElement.clientHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
    //var iLeft = (document.documentElement.clientWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
    try {

        isUseDailog = 0;//始终未0 ，放弃showModalDialog 用法，因为兼容性不够好
        if (isUseDailog == 0) {
            //    alert(iTop);
            var winOption = "";

            if (iHeight == 1 || iHeight == "1") {
                iTop = 0;
                iLeft = 0;
                iHeight = window.screen.height - 130;
                iWidth = window.screen.width - 200;
                //         iHeight = 800;
                //          iWidth = 1050;
                iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
                iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
                //      alert("全屏");
                winOption = "height=" + iHeight + ",width=" + iWidth + ",top=" + iTop + ",left=" + iLeft + ",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,channelmode=yes,fullscreen=yes";

            } else {
                winOption = "height=" + iHeight + ",width=" + iWidth + ",top=" + iTop + ",left=" + iLeft + ",toolbar=no,location=no,alwaysRaised=yes,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,fullscreen=0";

            }

            var newwindow = GetWinName(strUrl);
           
            //           alert(newwindow);
            if (mdicWin.Exists(newwindow)) {
                win = mdicWin.getItem(newwindow);
                if (win != null) {
                    win.close();
                }
                mdicWin.remove(newwindow);
            }
       //     alert("JSCom.ShowDlg.newwindow" + newwindow);
            //      这个地方第二个参数 ，要注意不要重复窗体名称，会导致出问题 第二个相当于新窗口名称的
            //      alert("JSCom.ShowDlg.winOption" + winOption);
            
            var win = window.open(strUrl, newwindow, winOption);
            mdicWin.add(newwindow, win);//注意会自动删除以前的对象的


            //window.onfocus = function () { win.focus(); };
            //window.onclick = function () { win.focus(); };

            if (lShowMax == 1) {
                ShowMaximize(win);
            }
            return "0";
        }
        else {
            //      alert("window.showModalDialog 可以用!"); 这个方法彻底放弃了2017-07-07

            result = window.showModalDialog(strUrl, window, "dialogWidth:" + iWidth + "px;dialogHeight:" + iHeight + "px;help:0;status:0;scroll:1;center:1;resizable:1");
            return result;
        }
    }
    catch (ex) {
        alert("JSCom.ShowDlg:" + ex.message);
    }

}


//窗口最大化 
function ShowMaximize(win) {
    if (win && win.open && !win.closed) {
        win.moveTo(-4, -4);
        win.resizeTo(screen.availWidth + 8, screen.availHeight + 8);
    } else {
        alert('还没有打开窗口或已经关闭');
    }
}


function GetWinName(url) {
  //  var url = location.search; //获取url中"?"符后的字串 
    // var theRequest = new Object();
    var strName = "";
    var lposS = url.lastIndexOf('/');//修改至少从3开始
//    alert("GetWinName.lposS" + lposS);
    if (lposS < 1) {
        
        lposS = 0;
    }
    var lPos = url.indexOf('.', 3);//修改至少从3开始

    if(lPos>0)    {
        strName = url.substring(lposS+1, lPos);
        var lDBID = GetUrlParm(url, "DBID");
        if (lDBID != null) {
        //    alert("lDBID=" + lDBID);
            strName = strName + lDBID.toString();
       //     alert(strName);
        }
        return strName;
    }

    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            //  theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            strName += strs[i];
        }
    }
    return strName;
  //  return theRequest;
}
//根据url参数获取
function GetUrlParm(url, param) {
 //   alert(url);
    var query = url.substring(1).split('&');
    for (var i = 0; i < query.length; i++) {
        var kv = query[i].split('=');
        if (kv[0] == param) {
            return kv[1];
        }
    }
    return null;
}


//防止被浏览器拦截
function openwin(url) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "camnpr");
    document.body.appendChild(a);
    a.click();
}
//显示增加对话框
function ShowInputDlg(strUrl) {

//    alert(navigator.userAgent+strUrl);
    var width = document.getElementById("hid_width").value;
    var height = document.getElementById("hid_height").value;
    return ShowDlg(width, height, strUrl);
//    alert(result);
  
}

//显示表单设计
function ShowDesign(lDBID) {
    
    ldbtype = document.getElementById("hid_dbtype").value;
    //   lDBID = document.getElementById("hid_dbid").value;
//    alert(window.location.pathname);
    var strUrl = "";
    if (window.location.pathname.indexOf("WebMob", 0) > 0) {
        strUrl = "../";
    }
    
    if (ldbtype == "OrderID") {
        strUrl = strUrl+"WebSet/WebDesign.aspx?now=" + new Date().getTime() + "&OrderID=" + lDBID + "";
    }
    else {
        strUrl = strUrl + "WebSet/WebDesign.aspx?now=" + new Date().getTime() + "&DBID=" + lDBID + "";
    }
  //  alert(strUrl);

    var result = ShowDlg(1050, 650, strUrl);
    if (result == null) return;
}


//重复了，换掉Ex
function ShowGridSetEx(lGridType) {
    var strUrl = "";
    if (window.location.pathname.indexOf("WebMob", 0) > 0) {
        strUrl = "../";
    }
    strUrl =strUrl+ "WebSet/DlgGridSet.aspx?GridType=" + lGridType + "";
    ShowDlg(950, 650, strUrl);

}  


//获得某个ID顶点位置
function getAbsoluteTop(objectId) {
    try{
        o = document.getElementById(objectId);
        oTop = o.offsetTop;
        while (o.offsetParent != null) {
            oParent = o.offsetParent
            oTop += oParent.offsetTop  // Add parent top position
            o = oParent
        }
        return oTop
    }
    catch (ex) {
        alert("getAbsoluteTop" + objectId + ex.message);
    }
    
}
      


//Grid全选 和 反选 
function onGridSelCheck(s, e) {
  //  alert(s.GetChecked());
 //   alert(s.name + s.GetChecked());
    //"grid"grdProp
    var bRet = s.GetChecked();
    e.processOnServer = false;
    try {
        $('input:checkbox').each(function () {
            var id = $(this).attr('name');
            if (id != undefined) {
                
                id = id.toString();
                if (id.indexOf(s.name) >= 0) {
                 //   alert(id);
                    //第一次执行，没问题，但第二次执行就有问题了，选择不了

                    //解决办法：把attr()换成prop()
                    $(this).prop('checked', bRet);
                }
            }


        });
    }
    catch (ex) {
        alert("WebFile.onSelCheck" + ex.message);
    }
    //    $("input[id='" + s.name + "']").attr("checked", s.GetChecked());
    //   $("input[name='checkbox']").attr("checked", s.GetChecked());
    //      $("input[name='" + s.name + "']").attr("checked", s.GetChecked());

}
//
function onSelCheckxx(s, e) {
    alert("onSelCheck" + s.name);
    var sField = s.name;
    var lPos = s.name.indexOf("_");
    if (lPos > 0) {
        sField = s.name.substr(0, lPos - 1);
        alert(sField);
    }
    var allInput = document.getElementsByClassName(sField);
    var loopTime = allInput.length;
    alert(loopTime);
    for (i = 0; i < loopTime; i++) {
        allInput[i].checked = s.GetChecked();
        var strID = allInput[i].nodeName;
        alert(strID);
        var lPos = strID.indexOf("grid");
        if (lPos > 0) {
            allInput[i].checked = s.GetChecked();
        }

    }
}
//标准通用的获取选中ＩＤ列表 "grid" "grdProp"
function GetGridSelList(sName) {

    var strIDList = "";
 //   alert(sName);
    try{
        var allInput = document.getElementsByTagName("input");
        var loopTime = allInput.length;
        for (i = 0; i < loopTime; i++) {
            if (allInput[i].checked) {
                var strID = allInput[i].id;
                //     alert(allInput[i].id);
                strID = strID.toString();
                if (strID.indexOf(sName) >= 0) {
                
                    var lPos = strID.indexOf("_");
                    if (lPos >= 0) {
                        //        alert(lPos);
                        strID = strID.substr(lPos + 1, strID.length - lPos - 1);
                        if (strID != "I") {
                            strIDList += "," + strID;
                        }
                    }
                }

            }
        }
        //        alert(strIDList);
        if (strIDList.substr(0, 1) == ",") {
            strIDList = strIDList.substr(1, strIDList.length - 1);
        }

        //if (!result) {
        //    alert("请先选择要删除的项!");
        //    return result;
        //}
        //result = confirm("此操作不可逆,确认要删除么?");
    }
    catch (ex) {
        alert(ex.name + ex.message);
    }
  
    return strIDList;
}

//查看文件
function ShowFileUrl(uid, sFilelUrl,sPre) {
   
    try {

        //var strTable = getValByKey("hid_tablename");

        ////      alert(strTable);
        ////这里在服务端 统计一下
        //var sFilelUrl = cySoft.WebFile.GetFileUrlEx(strTable, uid.toString()).value;
        //    alert(sFilelUrl);
       
        if (sFilelUrl == "-1") {
            alert("当前用户无查看该文件的权限！");
        }
        else {
            //      
            //   DXDemo.ShowScreenshotWindow(event, sFilelUrl);

            var isdoc = 0;
            var isimg = 0;
            var strExt = "xxx"
            if (sPre == undefined) {
                sPre = "";
            }
         //   var lpos = sFilelUrl.indexOf(".");
            var lpos = sFilelUrl.lastIndexOf(".");
            if (lpos > 0) {
                strExt = sFilelUrl.substr(lpos + 1, sFilelUrl.length - lpos);
                //        alert(strExt.toLowerCase());
            }
            //直接下载文件就行了
            //          window.open(sFilelUrl);
        //    var strUrl = sPre+"DlgImg.aspx?Img=" + sFilelUrl + "";
            var strUrl = sPre + "DlgImg.html?Img=" + sFilelUrl + "";
            isimg = FileIsImage(sFilelUrl);

     //       alert("JSCom.js.ShowFileUrl" + uid + "sFilelUrl:" + sFilelUrl + "strExt:" + strExt);
           
            if (isimg == 1) {

                // alert(strUrl);图片性质的                
                ShowDlg(1000, 768, strUrl);
            }
            else {
                sFilelUrl = encodeURI(sFilelUrl);
                switch (strExt.toLowerCase()) {

                    case "xls":
                    case "xlsx":
                        //       alert(sFilelUrl);
                        //考虑到是否只读问题

                        strUrl = sPre + "DlgExcel.aspx?FilePath=" + sFilelUrl + "";
                        ShowDlg(1100, 768, strUrl);
                       
                        break;
                    case "doc":
                    case "docx":
                        //       alert(sFilelUrl);
                        //考虑到是否只读问题
                        strUrl = sPre + "DlgDoc.aspx?FilePath=" + sFilelUrl + "";
                  //      alert("JSCom.js.ShowFileUrl.strUrl="+strUrl);
                        ShowDlg(1100, 768, strUrl);
                        break;
                    case "mp4"://视频性质的，播放视频
            //            strUrl = sPre + "DlgVideo.aspx?FilePath=" + sFilelUrl + "";
                        strUrl = sPre + "DlgVideo.html?FilePath=" + sFilelUrl + "";
            //            alert(strUrl);
                        //全屏比较合适啊
                      //  ShowDlg(1100, 768, strUrl);
                        window.open(strUrl);
                        break;
                    default:
                        sFilelUrl = decodeURI(sFilelUrl);
                  //      alert("isimg:" + isimg + sFilelUrl);
                        sFilelUrl = sPre + sFilelUrl;
                        window.open(sFilelUrl);
                        break;

                }
              
            }
        }
    }

    catch (ex) {
        alert("JSCom.ShowFileUrl" + ex.message);
    }
    //         DXDemo.ShowScreenshotWindow(event, sFilelUrl);

    //  alert(sFilelUrl);

}

//是否是ＰＣ端口
function IsPC() {
//    return false;//模拟ＰＣ端口测试一下
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//判断是否是微信浏览器
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
