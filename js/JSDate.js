//����ʱ��ű��ⷽ���б�
// 
//Date.prototype.isLeapYear �ж�����
//Date.prototype.Format ���ڸ�ʽ��
//Date.prototype.DateAdd ���ڼ���
//Date.prototype.DateDiff �Ƚ����ڲ�
//Date.prototype.toString ����ת�ַ���
//Date.prototype.toArray ���ڷָ�Ϊ����
//Date.prototype.DatePart ȡ���ڵĲ�����Ϣ
//Date.prototype.MaxDayOfDate ȡ���������µ��������
//Date.prototype.WeekNumOfYear �ж�����������ĵڼ���
//StringToDate �ַ���ת������
//IsValidDate ��֤������Ч��
//CheckDateTime ��������ʱ����
//daysBetween ����������
// 
//js ����
  
//���������������������������������� 
// �ж����� 
//���������������������������������� 
Date.prototype.isLeapYear = function() 
{ 
    return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0))); 
} 
   
//���������������������������������� 
// ���ڸ�ʽ�� 
// ��ʽ YYYY/yyyy/YY/yy ��ʾ��� 
// MM/M �·� 
// W/w ���� 
// dd/DD/d/D ���� 
// hh/HH/h/H ʱ�� 
// mm/m ���� 
// ss/SS/s/S �� 
//���������������������������������� 
//Date.prototype.Format = function(formatStr) 
//{ 
//    var str = formatStr; 
//    var Week = ['��','һ','��','��','��','��','��']; 
   
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


// ��Date����չ���� Date ת��Ϊָ����ʽ��String 
// ��(M)����(d)��Сʱ(h)����(m)����(s)������(q) ������ 1-2 ��ռλ���� 
// ��(y)������ 1-4 ��ռλ��������(S)ֻ���� 1 ��ռλ��(�� 1-3 λ������) 
// ���ӣ� 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //�·� 
        "d+": this.getDate(),                    //�� 
        "h+": this.getHours(),                   //Сʱ 
        "m+": this.getMinutes(),                 //�� 
        "s+": this.getSeconds(),                 //�� 
        "q+": Math.floor((this.getMonth() + 3) / 3), //���� 
        "S": this.getMilliseconds()             //���� 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
   
//+���������������������������������� 
//| ������ʱ��������� ���ڸ�ʽΪ YYYY-MM-dd 
//+���������������������������������� 
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
   
//+���������������������������������� 
//| ���ڼ��� 
//+���������������������������������� 
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
   
//+���������������������������������� 
//| �Ƚ����ڲ� dtEnd ��ʽΪ�����ͻ��� ��Ч���ڸ�ʽ�ַ��� 
//+���������������������������������� 
Date.prototype.DateDiff = function(strInterval, dtEnd) { 
    var dtStart = this; 
    //������ַ���ת��Ϊ������ 
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
   
//+���������������������������������� 
//| ��������ַ�����������ϵͳ��toString���� 
//+���������������������������������� 
Date.prototype.toString = function(showWeek) { 
    var myDate= this; 
    var str = myDate.toLocaleDateString(); 
    var Week = ['��','һ','��','��','��','��','��']; 
    if (showWeek) { 
        str += ' ����' + Week[myDate.getDay()]; 
    } 
    return str; 
} 
   
//+���������������������������������� 
//| ���ںϷ�����֤ 
//| ��ʽΪ��YYYY-MM-DD��YYYY/MM/DD 
//+���������������������������������� 
function IsValidDate(DateStr) { 
    var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //ȥ���߿ո�; 
    if(sDate == '') return true; 
   
    //�����ʽ����YYYY-(/)MM-(/)DD��YYYY-(/)M-(/)DD��YYYY-(/)M-(/)D��YYYY-(/)MM-(/)D���滻Ϊ�� 
    //���ݿ��У��Ϸ����ڿ�����:YYYY-MM/DD(2003-3/21),���ݿ���Զ�ת��ΪYYYY-MM-DD��ʽ 
    var s = sDate.replace(/[\d]{ 4,4 }[\-\/]{ 1 }[\d]{ 1,2 }[\-\/]{ 1 }[\d]{ 1,2 }/g, ''); 
   
    //˵����ʽ����YYYY-MM-DD��YYYY-M-DD��YYYY-M-D��YYYY-MM-D 
    if ( s != '') { 
        var t = new Date(sDate.replace(/\-/g, '/')); 
        var ar = sDate.split(/[\-\/:]/); 
        if(ar[0] != t.getFullYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) { 
            //alert(����������ڸ�ʽ����ʽΪ��YYYY-MM-DD��YYYY/MM/DD��ע�����ꡣ��); 
            return false; 
        } 
    } else { 
        //alert(����������ڸ�ʽ����ʽΪ��YYYY-MM-DD��YYYY/MM/DD��ע�����ꡣ��); 
        return false; 
    } 
   
    return true; 
} 
   
//+���������������������������������� 
//| ����ʱ���� 
//| ��ʽΪ��yyyy-MM-dd HH:mm:ss 
//+���������������������������������� 
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
   
//+���������������������������������� 
//| �����ڷָ������ 
//+���������������������������������� 
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
   
//+���������������������������������� 
//| ȡ������������Ϣ 
//| ���� interval ��ʾ�������� 
//| y �� m�� d�� w���� ww�� hʱ n�� s�� 
//+���������������������������������� 
Date.prototype.DatePart = function(interval) { 
    var myDate = this; 
    var partStr = ''; 
    var Week = ['��','һ','��','��','��','��','��']; 
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
   
//+���������������������������������� 
//| ȡ�õ�ǰ���������µ�������� 
//+���������������������������������� 
Date.prototype.MaxDayOfDate = function() 
{ 
    var myDate = this; 
    var ary = myDate.toArray(); 
    var date1 = (new Date(ary[0], ary[1], 1)); 
    var date2 = date1.DateAdd('m', 1); 
    //var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd')); 
    return date2.DateDiff('d', date1); 
} 
   
//+���������������������������������� 
//| ȡ�õ�ǰ������������һ���еĵڼ��� 
//+���������������������������������� 
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
   
//+���������������������������������� 
//| �ַ���ת���������� 
//| ��ʽ MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd 
//+���������������������������������� 
function StringToDateEx(DateStr) { 
    var converted = Date.parse(DateStr); 
    var myDate = new Date(converted); 
    if (isNaN(myDate)) 
    { 
        //var delimCahar = DateStr.indexOf(��/��)!=-1?��/':��-'; 
        var arys= DateStr.split('-');
          myDate = new Date(arys[0], arys[1] * -1, arys[2]);
       // alert(arys[1]);
    //    myDate = new Date(arys[0], arys[1]+1 , arys[2]);

    }
    //���ת����һ���µ�����
 //   myDate = myDate.DateAdd("m", 1);
    return myDate; 
}

//& lt; script type = "text/javascript" & gt;
//�ַ���ת���ڸ�ʽ��strDateҪתΪ���ڸ�ʽ���ַ��� 
function StringToDate2(strDate) {
    var st = strDate;
    var a = st.split(" ");
    var b = a[0].split("-");
    var c = a[1].split(":");
    var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
    return date;
}


//�ַ���ת���ڸ�ʽ��strDateҪתΪ���ڸ�ʽ���ַ���
function StringToDateOld(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
        function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}
function StringToDate(datetimeStr) {
    return ConvertStrToDate(datetimeStr);
}
//���ַ�������תΪ����
function ConvertStrToDate(datetimeStr) {
    var mydateint = Date.parse(datetimeStr);//��ֵ��ʽ��ʱ��
    if (!isNaN(mydateint)) {
        var mydate = new Date(mydateint);
        return mydate;
    }
    var mydate = new Date(datetimeStr);//�ַ�����ʽʱ��
    var monthstr = mydate.getMonth() + 1;
    if (!isNaN(monthstr)) {//ת���ɹ�
        return mydate;
    }//�ַ�����ʽʱ��ת��ʧ��
    var dateParts = datetimeStr.split(" ");
    var dateToday = new Date();
    var year = dateToday.getFullYear();
    var month = dateToday.getMonth();
    var day = dateToday.getDate();
    if (dateParts.length >= 1) {
        var dataPart = dateParts[0].split("-");//yyyy-mm-dd  ��ʽʱ��             
        if (dataPart.length == 1) {
            dataPart = dateParts[0].split("/");//yyyy/mm/dd��ʽʱ��
        }
        if (dataPart.length == 3) {
            year = Math.floor(dataPart[0]);
            month = Math.floor(dataPart[1]) - 1;
            day = Math.floor(dataPart[2]);
        }
    }
    if (dateParts.length == 2) {//hh:mm:ss��ʽʱ��
        var timePart = dateParts[1].split(":");//hh:mm:ss��ʽʱ��
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
    var num = (dtEnd - dtStart) / (1000 * 3600 * 24);//�������ʱ���ʱ�����������
    var lGCDays = parseInt(Math.ceil(num));//ת��Ϊ���죨С����Ļ��粻��ת�ˣ�
    return lGCDays;
}
//����

//���� 
//alert(getDate("2016-6-14 11:20:00")); 