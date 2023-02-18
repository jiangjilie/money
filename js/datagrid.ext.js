//Jquery DataGrid ��һЩ������չ����



///** 
//* ��չ����ж������ԣ�  ������
//*      �Զ���һ�����ֶ����ԣ� 
//*      headalign ��ԭʼalign�������������Ч, headalign���������Ч
//*      
//*/
$.extend($.fn.datagrid.defaults, {
    onLoadSuccess: function () {
        var target = $(this);
        var opts = $.data(this, "datagrid").options;
        var panel = $(this).datagrid("getPanel");
        //��ȡ��
        var fields = $(this).datagrid('getColumnFields', false);
        //datagridͷ�� table �ĵ�һ��tr ��td�ǣ���columns�ļ���
        var headerTds = panel.find(".datagrid-view2 .datagrid-header .datagrid-header-inner table tr:first-child").children();
     //   alert("find��������" + JSON.stringify(headerTds));
        //���������б�ͷ�Ķ��뷽ʽ
        headerTds.each(function (i, obj) {
            var col = target.datagrid('getColumnOption', fields[i]);
            if (!col.hidden && !col.checkbox) {
                //   var headalign = col.headalign || col.align || 'left';
                //  $("div:first-child", obj).css("text-align", headalign);

                $("div:first-child", obj).css("text-align", 'center');
           //     alert("find��������" + JSON.stringify(obj));
            }
        })
    }
});



$.extend($.fn.datagrid.methods, {
    //��ʾ����
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
    //��������
    loaded: function (jq) {
        return jq.each(function () {
            $(this).datagrid("getPager").pagination("loaded");
            var wrap = $.data(this, "datagrid").panel;
            wrap.find("div.datagrid-mask-msg").remove();
            wrap.find("div.datagrid-mask").remove();
        });
    }
});


/* �Զ��ϲ����� ��������

$('#dg').datagrid({
    url: 'datagrid_data.json',
    onLoadSuccess: function(data) {
        //�����н��кϲ�����
        //$(this).datagrid("autoMergeCells");
        //ָ���н��кϲ�����
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



//editCell���� �༭ָ���ĵ�Ԫ��ķ���

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

//�Զ���Ӧ�и�
$.extend($.fn.datagrid.methods, {
    fixRownumber: function (jq) {
        return jq.each(function () {
            var panel = $(this).datagrid("getPanel");
            //��ȡ���һ�е�number����,������һ��
            var clone = $(".datagrid-cell-rownumber", panel).last().clone();
            //������ĳЩ���������,�ǲ�֧�ֻ�ȡ����Ԫ�صĿ��,����ȡ��һ��
            clone.css({
                "position": "absolute",
                left: -1000
            }).appendTo("body");
            var width = clone.width("auto").width();
            //Ĭ�Ͽ����25,����ֻ�д���25��ʱ��Ž���fix
            if (width > 25) {
                //���5������,����һ��߾�
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
                //�޸��˿��֮��,��Ҫ�������������¼���,���Ե��� resize
                $(this).datagrid("resize");
                //һЩ������
                clone.remove();
                clone = null;
            } else {
                //��ԭ��Ĭ��״̬
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
            }
        });
    }
});