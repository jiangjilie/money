//Jquery DataGrid 的一些常用扩展方法



///** 
//* 扩展表格列对齐属性：  保留吧
//*      自定义一个列字段属性： 
//*      headalign ：原始align属性针对数据有效, headalign针对列名有效
//*      
//*/
$.extend($.fn.datagrid.defaults, {
    onLoadSuccess: function () {
        var target = $(this);
        var opts = $.data(this, "datagrid").options;
        var panel = $(this).datagrid("getPanel");
        //获取列
        var fields = $(this).datagrid('getColumnFields', false);
        //datagrid头部 table 的第一个tr 的td们，即columns的集合
        var headerTds = panel.find(".datagrid-view2 .datagrid-header .datagrid-header-inner table tr:first-child").children();
     //   alert("find并设置了" + JSON.stringify(headerTds));
        //重新设置列表头的对齐方式
        headerTds.each(function (i, obj) {
            var col = target.datagrid('getColumnOption', fields[i]);
            if (!col.hidden && !col.checkbox) {
                //   var headalign = col.headalign || col.align || 'left';
                //  $("div:first-child", obj).css("text-align", headalign);

                $("div:first-child", obj).css("text-align", 'center');
           //     alert("find并设置了" + JSON.stringify(obj));
            }
        })
    }
});



$.extend($.fn.datagrid.methods, {
    //显示遮罩
    loading: function (jq) {
        return jq.each(function () {
            $(this).datagrid("getPager").pagination("loading");
            var opts = $(this).datagrid("options");
            var wrap = $.data(this, "datagrid").panel;
            if (opts.loadMsg) {
                $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: wrap.width(), height: wrap.height() }).appendTo(wrap);
                $("<div class=\"datagrid-mask-msg\"></div>").html(opts.loadMsg).appendTo(wrap).css({ display: "block", left: (wrap.width() - $("div.datagrid-mask-msg", wrap).outerWidth()) / 2, top: (wrap.height() - $("div.datagrid-mask-msg", wrap).outerHeight()) / 2 });
            }
        });
    },
    //隐藏遮罩
    loaded: function (jq) {
        return jq.each(function () {
            $(this).datagrid("getPager").pagination("loaded");
            var wrap = $.data(this, "datagrid").panel;
            wrap.find("div.datagrid-mask-msg").remove();
            wrap.find("div.datagrid-mask").remove();
        });
    }
});


/* 自动合并方法 调用如下

$('#dg').datagrid({
    url: 'datagrid_data.json',
    onLoadSuccess: function(data) {
        //所有列进行合并操作
        //$(this).datagrid("autoMergeCells");
        //指定列进行合并操作
        $(this).datagrid("autoMergeCells", ['groupId', 'commId']);
    }
});


*/


$.extend($.fn.datagrid.methods, {
    autoMergeCells: function (jq, fields) {
        return jq.each(function () {
            var target = $(this);
            if (!fields) {
                fields = target.datagrid("getColumnFields");
            }
            var rows = target.datagrid("getRows");
            var i = 0,
            j = 0,
            temp = {};
            for (i; i < rows.length; i++) {
                var row = rows[i];
                j = 0;
                for (j; j < fields.length; j++) {
                    var field = fields[j];
                    var tf = temp[field];
                    if (!tf) {
                        tf = temp[field] = {};
                        tf[row[field]] = [i];
                    } else {
                        var tfv = tf[row[field]];
                        if (tfv) {
                            tfv.push(i);
                        } else {
                            tfv = tf[row[field]] = [i];
                        }
                    }
                }
            }
            $.each(temp,
            function (field, colunm) {
                $.each(colunm,
                function () {
                    var group = this;
                    if (group.length > 1) {
                        var before, after, megerIndex = group[0];
                        for (var i = 0; i < group.length; i++) {
                            before = group[i];
                            after = group[i + 1];
                            if (after && (after - before) == 1) {
                                continue;
                            }
                            var rowspan = before - megerIndex + 1;
                            if (rowspan > 1) {
                                target.datagrid('mergeCells', {
                                    index: megerIndex,
                                    field: field,
                                    rowspan: rowspan
                                });
                            }
                            if (after && (after - before) != 1) {
                                megerIndex = after;
                            }
                        }
                    }
                });
            });
        });
    }
});



//editCell方法 编辑指定的单元格的方法

$.extend($.fn.datagrid.methods, {
    editCell: function (jq, param) {
        return jq.each(function () {
            var opts = $(this).datagrid('options');
            var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor1 = col.editor;
                if (fields[i] != param.field) {
                    col.editor = null;
                }
            }
            $(this).datagrid('beginEdit', param.index);
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor = col.editor1;
            }
        });
    }
});

//自动适应行高
$.extend($.fn.datagrid.methods, {
    fixRownumber: function (jq) {
        return jq.each(function () {
            var panel = $(this).datagrid("getPanel");
            //获取最后一行的number容器,并拷贝一份
            var clone = $(".datagrid-cell-rownumber", panel).last().clone();
            //由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下
            clone.css({
                "position": "absolute",
                left: -1000
            }).appendTo("body");
            var width = clone.width("auto").width();
            //默认宽度是25,所以只有大于25的时候才进行fix
            if (width > 25) {
                //多加5个像素,保持一点边距
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
                //修改了宽度之后,需要对容器进行重新计算,所以调用 resize
                $(this).datagrid("resize");
                //一些清理工作
                clone.remove();
                clone = null;
            } else {
                //还原成默认状态
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
            }
        });
    }
});