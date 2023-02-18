//缩放
function imgToSize(size) {
    var el = document.getElementById("imgpanel");
    var oWidth = el.width;
    var oHeight = el.height;
    if (size > 0) {
        oWidth = oWidth * 1.2;
        oHeight = oHeight * 1.2;
    }
    else {
        oWidth = oWidth * 10 / 12;
        oHeight = oHeight * 10 / 12;
    }
    $("#imgpanel").css("width", oWidth);
    $("#imgpanel").css("height", oHeight);
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



