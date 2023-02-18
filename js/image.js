function preview(oper)
{
if (oper < 10){
bdhtml=window.document.body.innerHTML;//获取当前页的html代码
sprnstr="<!--startprint"+oper+"-->";//设置打印开始区域
eprnstr="<!--endprint"+oper+"-->";//设置打印结束区域
prnhtml=bdhtml.substring(bdhtml.indexOf(sprnstr)+18); //从开始代码向后取html
prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));//从结束代码向前取html
window.document.body.innerHTML=prnhtml;
window.print();
window.document.body.innerHTML=bdhtml;
} else {
window.print();
}
}
function rollImg(o){
    /* 获取当前页面的缩放比
        若未设置zoom缩放比，则为默认100%，即1，原图大小
    */ 
    var zoom=parseInt(o.style.zoom)||100;
    /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom
        wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动
    */
    zoom+=event.wheelDelta/12;
    /* 如果缩放比大于0，则将缩放比加载到页面元素 */
    if (zoom>0) o.style.zoom=zoom+'%';
    /* 如果缩放比不大于0，则返回false，不执行操作 */
    return false;
}
//缩放
function imgToSize(size) {
    var el = document.getElementById("imgpanel");
    var syel = document.getElementById("sydiv");
    var strsyfontsiz = syel.style.fontSize;
    var syfontsiz = parseInt(strsyfontsiz);
    var sywidth = syel.width;
    var syheight = syel.height;
    var oWidth = el.width;
    var oHeight = el.height;
    if (size > 0) {
        oWidth = oWidth * 1.2;
        oHeight = oHeight * 1.2;
        syfontsiz = syfontsiz * 1.2;
    }
    else {
        oWidth = oWidth * 10 / 12;
        oHeight = oHeight * 10 / 12;
        syfontsiz = syfontsiz * 10 / 12;
    }
    $("#imgpanel").css("width", oWidth);
    $("#imgpanel").css("height", oHeight);
    var len = syel.innerText.length;
    sywidth = syfontsiz * len + 1;
    syheight = syfontsiz + 1;
    var syx = (oWidth - sywidth) / 2;
    var syy = (oHeight - syheight) / 2;
    $("#sydiv").css("width", sywidth);
    $("#sydiv").css("height", syheight);
    syel.style.fontSize = syfontsiz + "px";
    $("#sydiv").css("margin-left", syx);
    $("#sydiv").css("margin-top", syy);
}
//滚轮缩放
function bigimg() {
    if (event.wheelDelta < 0) {
        imgToSize(-30);
    } else {
        imgToSize(30);
    }
}

//拖动
var ie = document.all;
var nn6 = document.getElementById && !document.all;
var isdrag = false;
var y, x;
var oDragObj;

function moveMouse(e) {
    if (isdrag) {
        oDragObj.style.top = (nn6 ? nTY + e.clientY - y : nTY + event.clientY - y) + "px";
        oDragObj.style.left = (nn6 ? nTX + e.clientX - x : nTX + event.clientX - x) + "px";
        return false;
    }
}

function initDrag(e) {
    var oDragHandle = nn6 ? e.target : event.srcElement;
    var topElement = "HTML";
    while (oDragHandle.tagName != topElement && oDragHandle.className != "dragAble") {
        oDragHandle = nn6 ? oDragHandle.parentNode : oDragHandle.parentElement;
    }
    if (oDragHandle.className == "dragAble") {
        isdrag = true;
        oDragObj = oDragHandle;
        nTY = parseInt(oDragObj.style.top + 0);
        y = nn6 ? e.clientY : event.clientY;
        nTX = parseInt(oDragObj.style.left + 0);
        x = nn6 ? e.clientX : event.clientX;
        document.onmousemove = moveMouse;
        return false;
    }
}
document.onmousedown = initDrag;
document.onmouseup = new Function("isdrag=false");

function clickMove(s) {
    if (s == "up") {
        dragObj.style.top = parseInt(dragObj.style.top) + 100;
    } else if (s == "down") {
        dragObj.style.top = parseInt(dragObj.style.top) - 100;
    } else if (s == "left") {
        dragObj.style.left = parseInt(dragObj.style.left) + 100;
    } else if (s == "right") {
        dragObj.style.left = parseInt(dragObj.style.left) - 100;
    }

}

//旋转
var current = 0;
function Rotate() {
    isIE();
    if (!IE) {
        current = (current + 90) % 360;
        document.getElementById('imgpanel').style.transform = 'rotate(' + current + 'deg)';
    }
    else {
        Rigrotate();
    }
}

//兼容IE版本的旋转
var r = 0;
function Rigrotate() {

    var o = document.getElementById('imgpanel');
    var currentFilter = o.currentStyle.filter;
    if (currentFilter) {
        r++;
        if (r > 3) {
            r = 0;
        }

        o.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + r + ')';
    }
    else {
        o.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)';
    }

}
function Lefrotate() {

    var o = document.getElementById('imgpanel');
    var currentFilter = o.currentStyle.filter;
    if (currentFilter) {
        var filterMatch = currentFilter.match(/rotation=(\d)+/);
        var r = parseInt(filterMatch[1]) - 1;
        if (r < 0) {
            r = 3;
        }

        o.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + r + ')';
    }
    else {
        o.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)';
    }

}

var IE = false;
function isIE() {
    if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
        IE = true;
    }
    else {
        IE = false;
    }
    return IE;

}
function addEvent(ele, name, fn) {//元素   事件   回调函数
    console.log(ele.attachEvent);
    if (ele.attachEvent) {//如果元素有attachEvent属性，就执行下面的代码
        ele.attachEvent("on" + name, fn);
    } else {//高级浏览器执行的方法
        ele.addEventListener(name, fn);
    }
}
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1;//不是ie浏览器
    }
}
window.onload=function(){
	document.getElementById("lqjyb").onclick=function(){
		// alert(document.getElementById("lqjyb").href);
	}
}
