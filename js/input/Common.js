var Common = {
    //验证档案号是否重复
    CheckUnArchiveCode: function (dah) {
        $("#btnsave").attr("disabled", "disabled");
        if (dah != null && dah != "") {
            $.ajax({
                type: "POST",
                //async: false,
                url: "/dagl/XSDocManage/ArchiveCodes/CheckUnArchiveCode",
                dataType: "text",
                data: { archiveCode: dah },
                success: function (data) {
                    if (data == "") {
                        $("#btnsave").removeAttr("disabled");
                        //toastr.success('档案号合格');
                    }
                    else {
                        toastr.error(data);
                    }
                },
                error: function (data) {
                    toastr.error('系统错误，请检查操作是否正确');
                }
            });
        }
    },
    //关闭layer弹出层
    Cancel: function () {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
        //var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        //setTimeout(function () {
        //    parent.layer.close(index);  // 关闭layer
        //}, 1000);
    },
    CloseForm: function (data) {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
        parent.Init.ShowMsg(data);
    },
    BindSelect: function (ctrlName, url) {
        var control = $('#' + ctrlName);
        //绑定Ajax的内容
        $.getJSON(url, function (data) {
            control.empty();//清空下拉框
            // control.append("<optgroup disabled=\"disabled\" label=\"disabled\"><option>Hidden</option></optgroup>");
            $.each(data, function (i, item) {
                control.append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                //$("#" + ctrlName).selectpicker('refresh');
            });

            //$("#" + ctrlName).selectpicker();
            //$("#" + ctrlName).selectpicker('refresh');
        });
    },
    BindSelectName: function (ctrlName, url) {
        var control = $('#' + ctrlName);
        //绑定Ajax的内容
        $.getJSON(url, function (data) {
            control.empty();//清空下拉框
            $.each(data, function (i, item) {
                control.append("<option value='" + item.Text + "'>" + item.Text + "</option>");
            });
        });
    },
    BindSelect1: function (ctrlName, url, selvalue) {
        var control = $('#' + ctrlName);
        //绑定Ajax的内容
        $.ajaxSettings.async = false
        $.getJSON(url, function (data) {
            control.empty();//清空下拉框
            // control.append("<optgroup disabled=\"disabled\" label=\"disabled\"><option>Hidden</option></optgroup>");
            $.each(data, function (i, item) {
                if (item.Value == selvalue) {
                    control.append("<option value='" + item.Value + "' selected='selected'>" + item.Text + "</option>");
                } else {
                    control.append("<option value='" + item.Value + "'>" + item.Text + "</option>");

                }
            });
        });
        //$("#" + ctrlName).selectpicker('refresh');
        //$("#" + ctrlName).selectpicker('val', selvalue);
    },
    BindSelectName1: function (ctrlName, url, selvalue) {
        var control = $('#' + ctrlName);
        //绑定Ajax的内容
        $.ajaxSettings.async = false
        $.getJSON(url, function (data) {
            control.empty();//清空下拉框
            // control.append("<optgroup disabled=\"disabled\" label=\"disabled\"><option>Hidden</option></optgroup>");
            $.each(data, function (i, item) {
                if (item.Text == selvalue) {
                    control.append("<option value='" + item.Text + "' selected='selected'>" + item.Text + "</option>");
                } else {
                    control.append("<option value='" + item.Text + "'>" + item.Text + "</option>");

                }
            });
        });
        //$("#" + ctrlName).selectpicker('refresh');
        //$("#" + ctrlName).selectpicker('val', selvalue);
    },
    DataTablesSelect: function (dg) {
        $('#' + dg + ' tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $(this).find("input[type=radio]").prop("checked", false);
            }
            else {
                $('#' + dg + ' tr.selected').removeClass('selected');
                $(this).addClass('selected');
                $(this).find("input[type=radio]").prop("checked", true);
            }
        });
    },
    DataTablesCheckBox: function (dg) {
        $('#' + dg + ' tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $(this).find("input[type=checkbox]").prop("checked", false);
            }
            else {
                $(this).addClass('selected');
                $(this).find("input[type=checkbox]").prop("checked", true);
            }
        });
    },
    ValidateNum: function (obj) {
        obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
        obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
        obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    }
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,
        //月份 
        "d+": this.getDate(),
        //日 
        "h+": this.getHours(),
        //小时 
        "m+": this.getMinutes(),
        //分 
        "s+": this.getSeconds(),
        //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
//获取url参数
$(function ($) {
    $.getUrlParam
     = function (name) {
         var reg
          = new RegExp("(^|&)" +
          name + "=([^&]*)(&|$)");
         var r
          = window.location.search.substr(1).match(reg);
         if (r != null) return unescape(r[2]); return null;
     }
})

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
function isMobile(str) {
    if (str != "" && str != null)
        return /^1[3|4|5|8][0-9]\d{4,8}$/.test(str);
    else {
        return true;
    }
}
function isEmail(str) {
    if (str != "" && str != null) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return reg.test(str);
    } else {
        return true;
    }
}
function AddSyTab(title, url, id) {
    var uhost = getRootPath() + url;
    alert(uhost);
   // var aid = $(obj).attr("id");
    CreateTab({ id: id, title: title, close: true, url: uhost });
}

function CreateTab(options) {
    //var rand = Math.random().toString();
    //var id = rand.substring(rand.indexOf('.') + 1);
    var url = '';
    if (options.url.indexOf('http') == -1) {
        url = window.location.protocol + '//' + window.location.host;
    };
    options.url = url + options.url;
    id = "tab_" + options.id;
    var active_flag = true;
    if (parent.$("#" + id)) {
        //active_flag = parent.$("#" + id).hasClass('active');
    }
    parent.$(".active").removeClass("active");
    //如果TAB不存在，创建一个新的TAB
    if (!parent.$("#" + id)[0]) {
        //固定TAB中IFRAME高度
        mainHeight = $(document.body).height() - 90;
        //创建新TAB的title
        title = '<li role="presentation" id="tab_' + id + '"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab">' + options.title;
        //是否允许关闭
        if (options.close) {
            title += ' <i class="glyphicon glyphicon-remove" tabclose="' + id + '"></i>';
        }
        title += '</a></li>';
        //是否指定TAB内容
        if (options.content) {
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '" style="height:100%">' + options.content + '</div>';
        } else {//没有内容，使用IFRAME打开链接
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '" style="height:100%;top: -15px;"><iframe id="iframe_' + id + '" src="' + options.url +
                '" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes" style="position: relative;top: -13px;"></iframe></div>';
        }
        //加入TABS
        parent.$(".nav-tabs").append(title);
        parent.$(".tab-content").append(content);
    } else {
        if (active_flag) {
            //parent.$("#iframe_" + id).attr('src', parent.$("#iframe_" + id).attr('src'));
            parent.$("#iframe_" + id).attr('src', options.url);
        }
    }
    //激活TAB
    parent.$("#tab_" + id).addClass('active');
    parent.$("#" + id).addClass("active");
}

//获取网站路径以及虚拟目录
function getRootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 2);
    return (prePath + postPath);
}
//datatables 动态合并单元和
function getRowSpanData(data, rowNameArr) {

    function rowSpanNum(row_name, current_row) {
        var num = 1;
        if (data[current_row][row_name].length > 0 && data[current_row][row_name]!=null) {
            //如果与上一行的数据相同，则标记为0
            if ((current_row > 0) && (data[current_row - 1][row_name] === data[current_row][row_name])) {
                num = 0;
            }
                //否则 计算共有几行重复
            else {
                var i = current_row + 1;
                while (i < data.length && (data[i][row_name] === data[current_row][row_name])) {
                    num++;
                    i++;
                }
            }
        }
        return num;
    }
    $.each(data, function (key, value) {
        $.each(rowNameArr, function (index, item) {
            value[item + '_rowspannum'] = rowSpanNum(item, key);
        });
    });
    return data;
}
function handleRowSpan(row_name, cell, rowData) {
    if (rowData[row_name + '_rowspannum'] > 1) {
        $(cell).attr('rowspan', rowData[row_name + '_rowspannum']);
        $(cell).attr('style', "vertical-align:middle;background-color:#dff0d8");
    }
    else if (rowData[row_name + '_rowspannum'] < 1) {
        $(cell).remove();
    }
};
