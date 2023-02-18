//日期时间脚本库方法列表
// 
//Date.prototype.isLeapYear 判断闰年
//Date.prototype.Format 日期格式化
//Date.prototype.DateAdd 日期计算
//Date.prototype.DateDiff 比较日期差
//Date.prototype.toString 日期转字符串
//Date.prototype.toArray 日期分割为数组
//Date.prototype.DatePart 取日期的部分信息
//Date.prototype.MaxDayOfDate 取日期所在月的最大天数
//Date.prototype.WeekNumOfYear 判断日期所在年的第几周
//StringToDate 字符串转日期型
//IsValidDate 验证日期有效性
//CheckDateTime 完整日期时间检查
//daysBetween 日期天数差
// 
//js 代码
  
//————————————————— 
// 判断闰年 
//————————————————— 
Date.prototype.isLeapYear = function() 
{ 
    return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0))); 
} 
   
//————————————————— 
// 日期格式化 
// 格式 YYYY/yyyy/YY/yy 表示年份 
// MM/M 月份 
// W/w 星期 
// dd/DD/d/D 日期 
// hh/HH/h/H 时间 
// mm/m 分钟 
// ss/SS/s/S 秒 
//————————————————— 
//Date.prototype.Format = function(formatStr) 
//{ 
//    var str = formatStr; 
//    var Week = ['日','一','二','三','四','五','六']; 
   
//    str = str.replace(/yyyy|YYYY/, this.getFullYear()); 
//    str= str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' +  (this.getYear() % 100)); 
   
//    str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth()); 
//    str = str.replace(/M/g, this.getMonth()); 
   
//    str = str.replace(/w|W/g, Week[this.getDay()]); 
   
//    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate()); 
//    str = str.replace(/d|D/g, this.getDate()); 
   
//    str = str.replace(/hh|HH/, this.getHours() >9 ? this.getHours().toString() : '0' + this.getHours()); 
//    str = str.replace(/h|H/g, this.getHours()); 
//    str = str.replace(/mm/, this.getMinutes() >9 ? this.getMinutes().toString() : '0' + this.getMinutes()); 
//    str = str.replace(/m/g, this.getMinutes()); 
   
//    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds()); 
//    str = str.replace(/s|S/g, this.getSeconds()); 
//    alert("Date.prototype.Format:" + str);
//    return str; 
//}


// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
   
//+————————————————— 
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd 
//+————————————————— 
function daysBetween(DateOne, DateTwo) 
{ 
    var OneMonth = DateOne.substring(5, DateOne.lastIndexOf ('-')); 
    var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf ('-')+1); 
    var OneYear = DateOne.substring(0, DateOne.indexOf ('-')); 
   
    var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf ('-')); 
    var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1); 
    var TwoYear = DateTwo.substring(0, DateTwo.indexOf ('-')); 
   
    var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) -  Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000); 
    return Math.abs(cha); 
} 
   
//+————————————————— 
//| 日期计算 
//+————————————————— 
Date.prototype.DateAdd = function(strInterval, Number) { 
    var dtTmp = this; 
    switch (strInterval) { 
        case 's' : return new Date(dtTmp.getTime() + (1000 * Number)); 
        case 'n' : return new Date(dtTmp.getTime() + (60000 * Number)); 
        case 'h' : return new Date(dtTmp.getTime() + (3600000 * Number)); 
        case 'd' : return new Date(dtTmp.getTime() + (86400000 * Number)); 
        case 'w' : return new Date(dtTmp.getTime() + ((86400000 * 7) * Number)); 
        case 'q' : return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
        case 'm' : return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
        case 'y' : return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
    } 
} 
   
//+————————————————— 
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串 
//+————————————————— 
Date.prototype.DateDiff = function(strInterval, dtEnd) { 
    var dtStart = this; 
    //如果是字符串转换为日期型 
    if (typeof dtEnd == 'string') { 
        dtEnd = StringToDate(dtEnd); 
    } 
   
    switch (strInterval) { 
        case 's' :return parseInt((dtEnd - dtStart) / 1000); 
        case 'n' :return parseInt((dtEnd - dtStart) / 60000); 
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000); 
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000); 
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7)); 
        case 'm' :return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) -  (dtStart.getMonth() + 1); 
        case 'y' : return dtEnd.getFullYear() - dtStart.getFullYear(); 
    } 
} 
   
//+————————————————— 
//| 日期输出字符串，重载了系统的toString方法 
//+————————————————— 
Date.prototype.toString = function(showWeek) { 
    var myDate= this; 
    var str = myDate.toLocaleDateString(); 
    var Week = ['日','一','二','三','四','五','六']; 
    if (showWeek) { 
        str += ' 星期' + Week[myDate.getDay()]; 
    } 
    return str; 
} 
   
//+————————————————— 
//| 日期合法性验证 
//| 格式为：YYYY-MM-DD或YYYY/MM/DD 
//+————————————————— 
function IsValidDate(DateStr) { 
    var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格; 
    if(sDate == '') return true; 
   
    //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为” 
    //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式 
    var s = sDate.replace(/[\d]{ 4,4 }[\-\/]{ 1 }[\d]{ 1,2 }[\-\/]{ 1 }[\d]{ 1,2 }/g, ''); 
   
    //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D 
    if ( s != '') { 
        var t = new Date(sDate.replace(/\-/g, '/')); 
        var ar = sDate.split(/[\-\/:]/); 
        if(ar[0] != t.getFullYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) { 
            //alert(‘错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。’); 
            return false; 
        } 
    } else { 
        //alert(‘错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。’); 
        return false; 
    } 
   
    return true; 
} 
   
//+————————————————— 
//| 日期时间检查 
//| 格式为：yyyy-MM-dd HH:mm:ss 
//+————————————————— 
function CheckDateTime(str) { 
    var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/; 
    var r = str.match(reg); 
    if(r == null) return false; 
   
    r[2] = r[2] - 1; 
    var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]); 
    if(d.getFullYear() != r[1]) return false; 
    if(d.getMonth() != r[2]) return false; 
    if(d.getDate() != r[3]) return false; 
    if(d.getHours() != r[4]) return false; 
    if(d.getMinutes() != r[5]) return false; 
    if(d.getSeconds() != r[6]) return false; 
   
    return true; 
} 
   
//+————————————————— 
//| 把日期分割成数组 
//+————————————————— 
Date.prototype.toArray = function() { 
    var myDate = this; 
    var myArray = Array(); 
   
    myArray[0] = myDate.getFullYear(); 
    myArray[1] = myDate.getMonth(); 
    myArray[2] = myDate.getDate(); 
    myArray[3] = myDate.getHours(); 
    myArray[4] = myDate.getMinutes(); 
    myArray[5] = myDate.getSeconds(); 
   
    return myArray; 
} 
   
//+————————————————— 
//| 取得日期数据信息 
//| 参数 interval 表示数据类型 
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒 
//+————————————————— 
Date.prototype.DatePart = function(interval) { 
    var myDate = this; 
    var partStr = ''; 
    var Week = ['日','一','二','三','四','五','六']; 
    switch (interval) 
    { 
        case 'y' :partStr = myDate.getFullYear(); break; 
        case 'm' :partStr = myDate.getMonth() + 1; break; 
        case 'd' :partStr = myDate.getDate(); break; 
        case 'w' :partStr = Week[myDate.getDay()]; break; 
        case 'ww' :partStr = myDate.WeekNumOfYear(); break; 
        case 'h' :partStr = myDate.getHours(); break; 
        case 'n' :partStr = myDate.getMinutes(); break; 
        case 's' :partStr = myDate.getSeconds(); break; 
    } 
   
    return partStr; 
} 
   
//+————————————————— 
//| 取得当前日期所在月的最大天数 
//+————————————————— 
Date.prototype.MaxDayOfDate = function() 
{ 
    var myDate = this; 
    var ary = myDate.toArray(); 
    var date1 = (new Date(ary[0], ary[1], 1)); 
    var date2 = date1.DateAdd('m', 1); 
    //var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd')); 
    return date2.DateDiff('d', date1); 
} 
   
//+————————————————— 
//| 取得当前日期所在周是一年中的第几周 
//+————————————————— 
Date.prototype.WeekNumOfYear = function() { 
    var a = new Date(this.getFullYear(), this.getMonth(), this.getDate()); 
    var b = new Date(this.getFullYear(), 0, 1); 
    var d = (a.getTime() - b.getTime()) / 86400000; 
    var w = Math.floor(d / 7) + 1; 
    if (7-b.getDay() < d % 7) { 
        w++; 
    } 
   
    return w; 
} 
   
//+————————————————— 
//| 字符串转成日期类型 
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd 
//+————————————————— 
function StringToDateEx(DateStr) { 
    var converted = Date.parse(DateStr); 
    var myDate = new Date(converted); 
    if (isNaN(myDate)) 
    { 
        //var delimCahar = DateStr.indexOf(‘/’)!=-1?’/':’-'; 
        var arys= DateStr.split('-');
          myDate = new Date(arys[0], arys[1] * -1, arys[2]);
       // alert(arys[1]);
    //    myDate = new Date(arys[0], arys[1]+1 , arys[2]);

    }
    //解决转换少一个月的问题
 //   myDate = myDate.DateAdd("m", 1);
    return myDate; 
}

//& lt; script type = "text/javascript" & gt;
//字符串转日期格式，strDate要转为日期格式的字符串 
function StringToDate2(strDate) {
    var st = strDate;
    var a = st.split(" ");
    var b = a[0].split("-");
    var c = a[1].split(":");
    var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
    return date;
}


//字符串转日期格式，strDate要转为日期格式的字符串
function StringToDateOld(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
        function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}
function StringToDate(datetimeStr) {
    return ConvertStrToDate(datetimeStr);
}
//把字符串日期转为日期
function ConvertStrToDate(datetimeStr) {
    var mydateint = Date.parse(datetimeStr);//数值格式的时间
    if (!isNaN(mydateint)) {
        var mydate = new Date(mydateint);
        return mydate;
    }
    var mydate = new Date(datetimeStr);//字符串格式时间
    var monthstr = mydate.getMonth() + 1;
    if (!isNaN(monthstr)) {//转化成功
        return mydate;
    }//字符串格式时间转化失败
    var dateParts = datetimeStr.split(" ");
    var dateToday = new Date();
    var year = dateToday.getFullYear();
    var month = dateToday.getMonth();
    var day = dateToday.getDate();
    if (dateParts.length >= 1) {
        var dataPart = dateParts[0].split("-");//yyyy-mm-dd  格式时间             
        if (dataPart.length == 1) {
            dataPart = dateParts[0].split("/");//yyyy/mm/dd格式时间
        }
        if (dataPart.length == 3) {
            year = Math.floor(dataPart[0]);
            month = Math.floor(dataPart[1]) - 1;
            day = Math.floor(dataPart[2]);
        }
    }
    if (dateParts.length == 2) {//hh:mm:ss格式时间
        var timePart = dateParts[1].split(":");//hh:mm:ss格式时间
        if (timePart.length == 3) {
            var hour = Math.floor(timePart[0]);
            var minute = Math.floor(timePart[1]);
            var second = Math.floor(timePart[2]);
            return new Date(year, month, day, hour, minute, second);
        }
    }
    else {
        return new Date(year, month, day);
    }
}
function GetDiffDays(dtStart, dtEnd) {
    var num = (dtEnd - dtStart) / (1000 * 3600 * 24);//求出两个时间的时间差，这个是天数
    var lGCDays = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）
    return lGCDays;
}
//测试

//测试 
//alert(getDate("2016-6-14 11:20:00")); 