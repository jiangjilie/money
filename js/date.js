$(function () {
    $('.ace-calendar-picker-input').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        language: 'zh-CN',
        clearBtn: true,
        todayHighlight: true
    }).on("click", function () {
        $("#dpStart").datepicker("setEndDate", $("#dpEnd").val());
        $("#dpEnd").datepicker("setStartDate", $("#dpStart").val())
    });
    toastr.options.positionClass = 'toast-bottom-right';


})
var Init = {
    fs:0,
    BindData: function () {
        var table = $('#dg').DataTable({
            "paging": true,//是否分页
            "searching": false,
            "ordering": false,
            "info": true,////页脚信息
            renderer: "bootstrap",  //渲染样式：Bootstrap和jquery-ui
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            bLengthChange: false,
            "bPaginate": true,// 分页按钮 
            "serverSide": true,//开启服务器分页模式
            "iDisplayLength": 10,//默认每页数量
            "bAutoWidth": true,//自动宽度
            // "bSort":true,
            "oLanguage": {
                "sProcessing": "正在加载中......",
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "对不起，查询不到相关数据！",
                "sEmptyTable": "表中无数据存在！",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
                "sSearch": "搜索",
                "sInfoEmpty": "",
                "oPaginate":
                {
                    "sFirst": "首页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "末页"
                }
            }, //多语言配置
            "ajax": {
                "type": "POST",
                "url": "../Statistics/GetInStorageInfo",
                "data": function (d) {
                    d.starttime = $("#dpStart").val();
                    d.endtime = $("#dpEnd").val();
                    d.isinstorage= 0;
                }
            },
            columns: [
                {
                    "data": "YWBH", "width": "100px", "render": function (data, type, row) {
                        return '<a href="#" onclick="Init.OpenR(' + row.YWBH + ');">' + row.YWBH + '</a>';
                    }
                },
                { "data": "DAH", "width": "100px" },
                { "data": "DJXL", "width": "100px" },
                { "data": "CHECKUSER", "width": "100px" },
                { "data": "CHECKTIME", "width": "100px" },
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {// 相当于对字段格式化    

            }
        });
    },
    Search: function () {
        $("#mxlb").css("display", "none");
        var e = $("#dpEnd").val();
        var s = $("#dpStart").val();
        if (e != "" || s != "") {
            $.ajax({
                type: "POST",
                async: true,
                url: "../Statistics/GetUnInStorageInfo",
                data: { starttime: s, endtime:e },
                dataType: "text",
                success: function (result) {
                    //result = eval('(' + result + ')');
                    $("#wrksl").val(result);
                }
            });
        } else {
            alert("请选择一个查询条件");
        }

    },
    SearchMX: function () {
        $("#mxlb").css("display", "block");
        if (Init.fs == 0) {
            Init.fs = 1;
            Init.BindData();
        } else {
            $('#dg').dataTable().fnDraw();
        }
    },
    Export: function () {


    },
    OpenR: function (ywbh) {
        //parent.closeTab('16');
        parent.layer.open({
            type: 2,
            title: '<span style="color:#F37C25">生产流程查询</span>',
            shadeClose: true,
            maxmin: false, //开启最大化最小化按钮
            area: ['1000px', '480px'],
            content: '/dagl//Statistics/ProductionFlow?ywbh=' + ywbh,
            end: function (index) {
                //location.reload();
            }
        });
        //parent.addTabs({ id: '16', title: '生产流程查询', close: true, url: '/dagl//Statistics/ProductionFlow?ywbh=' + ywbh, icon: ' icon-refresh' });
    },
    ShowMsg: function (text) {
        var data = eval('(' + text + ')');
        if (data.IsSuccess == 1) {
            toastr.success('保存成功');
        }
        else {
            toastr.error(data.ErrorMessage);
        }
    }
}