//输入对话框脚本
var mlngGridType = 0;
var mlngID = -1;            //表示增加
var mstrCode = "";          //对于进销存来说很有用
var mlngOrderType = 0;       //进销存部分的很有用 对于一些自定义字段都有用
var mstrOrderCaption = "";  // 单据内容
var mlngShowAudit = 0;//是否显示了审核按钮
var mstrRelField = undefined;//主从表之间的对应关系
var mstrTGField = undefined;//主从表之间的对应关系 上面主表跟下面主表关联关系
var mlngObjID = -1;//表示增加 增加从表的时候有作用
var mlngPID = -1;//表示增加 增加从表的时候有作用
var mlngGroupID = -1;// 增加带导航的主表有作用
var mlngShowNav = 0;//是否显示导航啊
var mlngShowProp = 0;//是否显示属性
var mstrDBType = "DBID";
var mlngDBID = 0;

var mstrPermString = "XXXXXXXXXXXXXX";

var mlngShowMe = 1;
var mlngNeedAuth = 0;
var mlngAuthFlag = 0;
var mlngAuthEdit = 0;
var mlngShowSelObj = 0;
var mlngGridTypeC = 0;
var mstrTableGroup = "";
var mlngGridTypeG = 0;//对应主表内容

var mdtGridG = null;        //对应的主ID  网格内容
var mdtRowParent = null;    //对应的主ID  的主体内容
var mstrParentInfo = "";    //对应的父亲网格
var mstrPreCode = "";       //前缀
var mblnAutoCode = null;
var mstrTableRel = "";  //一般对=0应的Pub_CJB
var mstrRelSqlCont = ""; //document.getElementById("hid_relsqlcont").value;
var mlngGridTypeRel = 0;
var mstrTableMain = "HTB";  //对应主表信息
var mstrTableName = "";     //对应主表信息
var mstrTableSub = "";
var mlngRptID = 0;      //对应的自己设计的报表，主要是对应DBTblRptList
var mlngRptFileID = 0;  //对应的文件ID模版主要是Word
var mlngInoutType = 0;
var mlngBusinessType = 0;   //业务类型

var mlngAddLike = 0;
var mlngAddChild = 0;       //是否是增加孩子节点
var mMainJsonInput = null;  //主要录入界面 保存
var mMainTableInfo = null;//主要界面信息
var mdtRow = null;//当前网格内容
var mlngTempID = 0;//临时ＩＤ
var mstrFieldName = "";//当前选定 字段
var mlngIsSub = 0;//是主表还是从表 缺省肯定都是主表的，不可能是从表的
var mGridColObj = null;
var mbChange = false;
var mlngShowFJ = 0;//是否显示附件
var mdicMainCmbInited = new Dictionary();//存储是否加载完毕
var mlngDBSrcType = 0;
var mbHasGrid = false;
var mGridColumns = null; //活动的
var mlngShowStrict = 0;          //是否显示严管字段设置
//var mstrGridField = "jycont";//一般一个主表最多设置一个 网格类型的输入框
var mstrGridField = "";//一般一个主表最多设置一个 网格类型的输入框
var mdicEditor = new Dictionary();//存储富文本编辑器的
var mstrFieldListCrypt = "";
var mstrFieldListStricit = "";      //严管字段
var mstrFieldListMonitor = "";      //监控字段
var mstrFieldListHC = "";           //合成字段
var mPropRowNull = null;


var mstrSubIDList = undefined;
var mstrTableRelIn = "";
var mlngRelDBID = 0;
var mlngRelID = 0;

var mlngJHID = 0;       //计划ID

var mstrMonitorMsg = "";

var mlngRowCountTable = [0, 0, 0, 0, 0];  //录入界面总行数

var mlngGridIndex = 0;
var mstrParentPath = "";
var mMainJson = null;
var mblnShowTable = [true, false, false, false,false];//缺省考虑最多四级
var mlngGridChange = 0;
var mstrRetType = "";//返回类型  特殊的返回类型对应的onOK类别
var KindEditorItems = [
    'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
    'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
    'insertunorderedlist', '|', 'emoticons', 'image', 'link'];

//$.fn.combobox.defaults.icons = [{
//    iconCls: 'icon-clear',
//    handler: function (e) {
//        //alert($(e.handleObj.data.target).combobox('getValue'));
//        $(e.handleObj.data.target).combobox('clear');
//    }
//}];
//初始化参数 json 形式保留也行
function InitParms() {
    mdicMainCmbInited = new Dictionary();//存储是否加载完毕
    var vParm = getUrlParam("DBID");
    if (vParm != null) {
        mlngDBID = vParm;      
    }

   
 //   alert("InitParms.mstrDBType.2:" + mstrDBType + "mlngOrderType:" + mlngOrderType);
    vParm = getUrlParam("GridType");
    if (vParm != null) {
        mlngGridType = vParm;
    } else {
        mlngGridType = mlngDBID;
    }

    vParm = getUrlParam("RetType");
    if (vParm != null) {
        mstrRetType = vParm;
    }

    //留着兼容老版本的 cycmd吧 兼容以前版本  有以OrderID的优先考虑
    vParm = getUrlParam("OrderID");
    if (vParm != null) {
        mlngOrderType = vParm;
        mlngGridType = mlngOrderType;//兼容老版本的
        mstrDBType = "OrderID";
    }

    vParm = getUrlParam("OrderType");
    if (vParm != null) {
        mlngOrderType = vParm;
        mlngGridType = mlngOrderType;//兼容老版本的
        mstrDBType = "OrderID";
    }

    var vParm = getUrlParam("AddLike");
    if (vParm != null) {
        mlngAddLike = vParm;
    }
    var vParm = getUrlParam("JHID");
    if (vParm != null) {
        mlngJHID = vParm;
    }
    var vParm = getUrlParam("PID");
    if (vParm != null) {
        mlngPID = vParm;
    }
    var vParm = getUrlParam("AddChild");
    if (vParm != null) {
        mlngAddChild = vParm;
    }
    var vParm = getUrlParam("GridTypeG");
    if (vParm != null) {
        mlngGridTypeG = vParm;
    }
    //数据来源
    vParm = getUrlParam("DBSrcType");
    if (vParm != null) {
        mlngDBSrcType = vParm;
    }
    var vParm = getUrlParam("TableMain");
    if (vParm != null) {
        mstrTableMain = vParm;
    }
    var vParm = getUrlParam("TableGroup");
    if (vParm != null) {
        mstrTableGroup = vParm;
    }

    var vParm = getUrlParam("ObjID");
    if (vParm != null) {
        mlngObjID = vParm;
    }
    vParm = getUrlParam("GroupID");
    if (vParm != null) {
        mlngGroupID = vParm;
    }

    //vParm = getUrlParam("DBType");
    //if (vParm != null) {
    //    mstrDBType = vParm;
    //}
    vParm = getUrlParam("ShowNav");
    if (vParm != null) {
        mlngShowNav = vParm;
    }
    vParm = getUrlParam("ShowProp");
    if (vParm != null) {
        mlngShowProp = vParm;
    }


    vParm = getUrlParam("NeedAuth");
    if (vParm != null) {
        mlngNeedAuth = vParm;
    }
    vParm = getUrlParam("AuthFlag");
    if (vParm != null) {
        mlngAuthFlag = vParm;
    }
    vParm = getUrlParam("AuthEdit");
    if (vParm != null) {
        mlngAuthEdit = vParm;
    }
    vParm = getUrlParam("ShowSelObj");
    if (vParm != null) {
        mlngShowSelObj = vParm;
    }
    //    alert("mlngShowSelObj" + mlngShowSelObj);
    vParm = getUrlParam("ID");
    if (vParm != null) {
        mlngID = vParm;
     //   alert("mlngID:" + mlngID);
    }
 
    vParm = getUrlParam("Code");//进销存部分可能通过传递Code来查找定位单据
    if (vParm != null) {
        mstrCode = vParm;
    }
 //   alert("mstrCode:" + mstrCode);
    
    vParm = getUrlParam("ShowFJ");
    if (vParm != null) {
        mlngShowFJ = vParm;
    }
    vParm = getUrlParam("SubIDList");
    if (vParm != null) {
        mstrSubIDList = vParm;
    }
    vParm = getUrlParam("TableRelIn");
    if (vParm != null) {
        mstrTableRelIn = vParm;
    }
    vParm = getUrlParam("RelDBID");
    if (vParm != null) {
        mlngRelDBID = vParm;
    }
    vParm = getUrlParam("RelID");
    if (vParm != null) {
        mlngRelID = vParm;
    }

    mbHasGrid = HasGrid();
 //   alert("InitParms.mstrDBType.2:" + mstrDBType + "mlngOrderType:" + mlngOrderType);
    //   alert("HasGrid=mbHasGrid" + mbHasGrid);
}

//为了使界面好看，预先做好处理
function HasGrid() {
    var hasGrid = false;
  //  alert("HasGrid.mlngGridType" + mlngGridType + "mlngOrderType:" + mlngOrderType);
    if (mlngGridType < 100 && mlngGridType>0) {
        switch (parseInt(mlngGridType)) {
            case 4:
            case 21:
                hasGrid = false;
                mlngOrderType = 0;
                break;
            case 65:
            case 66:
            case 72:
            case 82:
                mlngOrderType = mlngGridType;
                hasGrid = false;
                break;
            default:
                mlngOrderType = mlngGridType;
                hasGrid = true;
                break;
        }
        return hasGrid;            
    }
    switch (parseInt(mlngGridType)) {
      //  case 4113://合同收付款
        case 4059://总包合同 可以直接设置成本类别
        case 4321://单章交接
        case 4323://双章交接
        case 4335://单章交接
        case 4336://双章交接
        case 8009://工序设置
        case 8012://银行代发设置
        case 8015://银行代发设置
        case 8016://工资账套人员设置
        case 8192:
        case 8164://流程设置
        case 6095:
        case 5106:
        case 5306:
        case 6093:
        case 6091:
        case 6082:
        case 6074:
        case 6091:
        case 6003:
        case 6117:
        case 5003:
        case 6053:
        case 6027:
        case 5320:
        case 6026:
        case 6073:
        case 6022://检验记录 主从表格
        case 5036:
        case 6045://巡检计划
        case 6047://巡检记录 点检记录
        case 6042://保养计划
        case 6049://保养记录
        case 6112://保养记录
        case 6144://点检计划
        case 6016://设备借出 批量
        case 6017://设备归还 批量
        case 6056://保养记录明细
        case 2063://必须事先设置 是这样的录入方式 供应商资料  这个暂时屏蔽吧
            if (mlngGridTypeC < 1) {
                mlngGridTypeC = 1;
            }
            hasGrid = true;
            break;

    }
    return hasGrid;
}

function HasBarCode() {
    var bhasBarCode = false;
    switch (parseInt(mlngDBID)) {
        case 5036://资产盘点
        case 6045://资产出入库
        case 4321://合同交接
        case 4323://合同交接
        case 4335://合同交接
        case 4336://合同交接
            bhasBarCode = true;
            break;

    }
    return bhasBarCode;
}

//初始化LayOut
function InitInputLayout() {
    //2020-12-30 不考虑APP调用了，速度太慢，也不好看
    if (mlngIsApp != 1) {
        $('#tdscan').hide();
        $('#divheader').hide();
        $('#divheader2').hide();
    }

   

    //是否显示右边主属性
    if (mlngShowSelObj < 1) {
        //$('#divEast').hide();
        $('#divMain').layout('remove', 'east');
        var temp = $('#divMain').layout('panel', 'center');//获得面板     
        temp.panel('resize', { width: '100%' });

        //   $('#divNorth').panel('resize', { height: "100%" });
    }
    //if (mlngShowNav == 0) {
    //    HideNav();
    //}
   
    //if (mlngGridTypeC == 0) {
    if (mlngOrderType < 1) {
        $('#divcode').hide();
        if (HasBarCode() == true) {//资产盘点例外 或者其他的 盘点专门针对APP

        } else {
            $('#divbarcode').hide();                
        }
        $('#bodyMain').layout('remove', 'south');
    }

    
    var hasGrid = HasGrid();  
  //  alert("InitInputLayout.mlngOrderType=" + mlngOrderType + "mlngGridTypeC:" + mlngGridTypeC + "hasGrid:" + hasGrid);
    if ((mlngOrderType < 1 && mlngGridTypeC < 1) || hasGrid == false) {
        HideInputProp();
    }
    else {

        //  $('#divCenter').layout('minHeight', 150);
        if (mlngOrderType > 0) {
            //$('#dg').datagrid('resize', {
            //    height: "75%",
            //});
          
            InitGridHeight(90);
        } else {
            //  $('#divNorth').height("55%");
            var temp = $('#bodyMain').layout('panel', 'north');//获得面板     
            temp.panel('resize', { height: '50%' });

            //var temp = $('#bodyMain').layout('panel', 'center');//获得面板     
            //temp.panel('resize', { height: '280px' });

            //$('#dg').datagrid('resize', {
            //    height: "90%",
            //});
            InitGridHeight(60);
            $('#bodyMain').layout('resize');
        }

    }

}

function InitGridHeight(lHeightDiff){
    var settime = null;
    $('#bodyMain').layout('panel', 'center').panel({
        onResize: function (width, height) {
            if (settime != null)
                clearTimeout(settime);
            settime = setTimeout(function () {
                console.log(height);
                //      alert("InitInputLayout" + height);
                //     var lHeight = document.getElementById("divCenter").style.height;
                //   lHeight = lHeight.replace("px", "");
                var lHeight = height - lHeightDiff;
                //   alert("divCenter.height=" + lHeight);
                $('#dg').datagrid('resize', {
                    height: lHeight,
                });

            }, 100);
        }
    })
}

//隐藏左侧导航或者属性
function HideNav() {
    $('#bodyMain').layout('remove', 'west');
}
//隐藏网格
function HideInputProp() {
    try {
        $('#bodyMain').layout('remove', 'center');//这个是显示属性网格
        //if (mlngOrderType < 1) {
        //    $('#bodyMain').layout('remove', 'south');
        //}
        //   $('#bodyMain').layout('panel', 'north').panel('resize', { height: "100%" });//这种写法也可以的

        $('#divNorth').panel('resize', { height: "100%" });

    } catch (ex) {
        alert("HideInputProp:" + ex.message);
    }
}


var editIndex = undefined;
var editField = undefined;
var editTextOld = undefined;

function endEditing() {

    try {
        if (editIndex == undefined) { return true }

        if ($('#dg').datagrid('validateRow', editIndex)) {

            $('#dg').datagrid('endEdit', editIndex);
            //    alert("endEditing.editIndex" + editIndex);//离开的时候触发



            //特殊处理这个
            //    alert("editField:" + editField);
            switch (editField) {
                case "CLCode"://实现 输入CLCode 加载
                    var row = $('#dg').datagrid('getSelected');
                    //   alert("旧的：" + editTextOld + "新的：" + row.CLCode);
                    if (editTextOld != row.CLCode) {
                        UpdateRowFieldCLCode(editIndex, row);
                    }

                    break;
                default:

                    break;
            }

            //这里暂时屏蔽，只更改回车确认才修改
        //    onGridCellChange(editIndex, editField);//更改整行内容 换个位置

            editIndex = undefined;
            editField = undefined;
            return true;
        } else {
            return false;
        }
    }
    catch (ex) {
        alert("input.js.endEditing" + ex.message);
    }

}

function onClickCell(index, field) {

    if (endEditing()) {
        //    alert("onClickCell.index" + index + "field:" + field);//点击的时候就触发
        $('#dg').datagrid('selectRow', index)
            .datagrid('editCell', { index: index, field: field });
        editIndex = index;
        editField = field;


        $('#dg').datagrid('selectRow', editField);//先选中行再说  
        var rowOld = $('#dg').datagrid('getSelected');
        editTextOld = rowOld[editField];

        try {
            //获得单个的
            var editor = $('#dg').datagrid('getEditor', { index: editIndex, field: editField });
            //  alert(editor);
            if (editor != null) {
                $(editor.target).focus();
                $(editor.target).bind('keyup', onGridInputKeyUp);//绑定Keyup事件
                $(editor.target).bind('change', onGridInputChange);
                //  AuthManList
                //if ("AuthManList" == field) {
                if (HasButtonEdit(field)) {
                    //   $(editor.target).bind('keyup', onGridInputKeyUp);//绑定Keyup事件
                    //   editor.target.id ="prp"+ field;//临时等于无妨的
                    $(editor.target).textbox({ icons: mObjGridFieldSel });
                    $(editor.target).attr("id", "prp" + field);
                    //  alert("editor.target.id:" + editor.target.id);
                }
            } else {
                //    alert("editor为空"+editor);

            }

        }
        catch (ex) {
            alert("input.onClickCell:" + ex.message);
        }
    }
}

function onClickRow(index) {
    alert("input.onClickRow:" + index);
}

//单机某行屏蔽了
function onClickRowEx(index) {
    //    alert("input.onClickRow:" + index);
    if (editIndex != index) {
        if (endEditing()) {
            $('#dg').datagrid('selectRow', index)
                .datagrid('beginEdit', index);
            editIndex = index;


            //如果选中行，获得一行的
            var editors = $('#dg').datagrid('getEditors', index);
            for (var i = 0, len = editors.length; i < len; i++) {
                var editor = editors[i];
                //    $(editor.target).focus();
                //$(editor.target).bind('keyup', function (e) {

                //});
                $(editor.target).bind('keyup', onGridInputKeyUp);
            }

        } else {
            $('#dg').datagrid('selectRow', editIndex);
        }
    }
}
//这里记住不要用blur 会导致无限死循环
function onGridInputChange(e) {
    try {
        $('#dg').datagrid('endEdit', editIndex);
        var bRet = onGridCellChange(editIndex, editField);
    }
    catch (ex) {
        alert("input.js.onGridInputChange.ex=" + ex.message)
    }
}
//回车下个一
function onGridInputKeyUp(e) {

    try {
        //    alert("helloonGridInputKeyUp:" + editField);
        var code = e.keyCode || e.which;
        if (code == 13) {

            $('#dg').datagrid('endEdit', editIndex);
            ////do something
            var sNextField = editField;

            var bRet = onGridCellChange(editIndex, editField);

            if (bRet == true) {//成功往下走，否则重新编辑吧
                sNextField = GetGridNextField(editIndex, editField);
            }
      //      alert("input.onGridInputKeyUp:" + sNextField);

            onClickCell(editIndex, sNextField);
            //    $(editor.target).focus();
        }
    }
    catch (ex) {
        alert("input.js.onGridInputKeyUp.ex=" + ex.message)
    }



}
//是否有ButtonEdit按钮
function HasButtonEdit(sField) {
    var bHas = false;
    //   alert("HasButtonEdit:" + JSON.stringify(mGridColObj));
    // alert("HasButtonEdit:" + mGridColObj.length);
    for (var i = 0; i < mGridColObj.length; i++) {
        var item = mGridColObj[i];
        //  alert("HasButtonEdit:" + sField + "item.Key:" + item.Key + " item.EditType:  " + item.EditType);
        if (item.Key == sField) {
            //      alert("找到了");
            if (item.EditType == "tpButtonEdit") {
                bHas = true;
                break;
            }
        }

    }
    return bHas;
}

//在网格中查找下一个
function GetGridNextField(index, sFiled) {
    //  alert("GetGridNextField.sField="+sFiled + JSON.stringify(mGridColumns));
    var bFind = 0;
    var sField = "";
    var bFindNext = 0;
    for (var i = 0; i < mGridColumns.length; i++) {
        var item = mGridColumns[i];
        if (bFind == 1 && item.editor == 'text') {
            sField = item.field;
            // alert(sField);
            bFindNext = 1;
            break;
        }
        if (item.field == sFiled) {
            //找到了
            //   alert("找到了字段！");
            bFind = 1;
        }
    }
    //找第二行的第一个就行了
    if (bFindNext == 0) {
        index = index + 1;
        editIndex = index;
        for (var i = 0; i < mGridColumns.length; i++) {
            item = mGridColumns[i];
            if (item.editor == 'text') {
                sField = item.field;
                break;
            }
        }
    }

    //如果editIndex>当前的行数 则自动增加一行
    var rows = $('#dg').datagrid('getRows');
    //  alert("editIndex:" + editIndex + "sField:" + sField + "rows.length:" + rows.length);
    if (editIndex >= rows.length) {
        append();
        onClickCell(editIndex, sField);
    }

    // alert("editIndex:" + editIndex + "sField:" + sField);
    return sField;//"CJPrice";            
}


//网修改
function onGridCellChange(index, field) {
    var bRet = true;
    try {
        // var row = $('#dgMain').treegrid.find();
        //   alert("onGridCellChange.index" + index + "field" + field);
        //   var AmountTarget = $('#dg').datagrid('getEditor', { index: index, field: field });

        //    alert(ShowObjProperty($(AmountTarget.target)));
        //    var Number = $(AmountTarget.target).numberbox('getValue');//数量
        //   var Number = $(AmountTarget.target).textbox('getValue');//数量

        //    alert("Number:" + Number);

        $('#dg').datagrid('selectRow', index);//先选中行再说       
        var row = $('#dg').datagrid('getSelected');
        if (row != null) {
            //alert(JSON.stringify(row));
            // alert(row.Amount);//这里已经是编辑后的值了
            //  再更改其他的值即可
            if (mlngOrderType > 0 || mlngGridTypeC > 0) {
                bRet = UpdateRowField(row, field);
            }
            //强调客户端更新和
            //  alert("强制更新:" + JSON.stringify(row));
            if (bRet == true) {//有的是 服务端更新，这里就不要乱调用了
                $('#dg').datagrid('updateRow', {
                    index: index,
                    row: row
                });
                $('#dg').datagrid('refreshRow', index);//刷新改行内容


                GridUpdateFooterRow("dg");
            }
        

        } else {
            alert("为null");
        }
    }
    catch (ex) {
        //  alert("input.js.onGridCellChange.ex:" + ex.message);
    }
    return bRet;
}
//刷新当前行
function RefreshGridRow(data) {
  //  mlngGridIndex =;
    try {
 //       alert("RefreshGridRow:mlngGridIndex=" + mlngGridIndex+" data="+ data);
        var index = mlngGridIndex;
        var retObj = eval("(" + data + ")");
        var dgName = "dg";
        var rows = $('#' + dgName + '').datagrid('getRows');
        var row = rows[index];
        row.JsonResult = retObj.JsonResult
        row.NoPass = retObj.NoPass;
        row.WJCont = retObj.WJCont;
        row.Result = retObj.Result;
        $('#dg').datagrid('updateRow', {
            index: index,
            row: row
        });
        $('#dg').datagrid('refreshRow', index);//刷新改行内容
    }
    catch (ex) {
        alert("popp.js.RefreshGridRow.target.ex:" + ex.message);
    }

}

function UpdateRowField(row, field) {
    var bRet = true;
    
    try {
        //   alert("UpdateRowField:" + field + "mstrTableSub=" + mstrTableSub);
        switch (mstrTableSub.toUpperCase()) {

            case "EQUIP_WXPJ":
            case "EQUIP_BYPJ":
            case "JXC_ORDERCJB":
            case "JXC_IOCKCJB":
            case "JXC_BJCJB":
            case "EQUIP_CGD":
                 UpdateGridMtl(row, field);
                break;
           
               
            case "JXC_SFDETAIL":
                UpdateGridSFB(row, field);
                break;
            case "EQUIP_IO": 
            case "EQUIP_PDD":            
                UpdateGridEquipAmount(row, field);
                break;
            case "GZ_GZDETAIL"://服务端计算，不要强制更改
                UpdateGZDetail(0,row, field, editIndex);
                bRet = false;
                break;
            case "HT_COST":
                UpdateHTCost(row, field, editIndex)
               
                

                break;
        }
    }
    catch (ex) {
        alert("UpdateRowField" + ex.message);
    }
    //  alert("UpdateRowField" + bRet);
    return bRet;
}

function UpdateHTCost(row, field, index) {
    try {

        var dgName = "dg";
        if (field == "CBPer") {
            var dTotalPrice = $('#TotalPrice').textbox('getValue');
            var lTotal = GridTotalSumCol(dgName, field);
            if (lTotal > 80) {
                alert1("注意成本比例已经超过80%");
            }
            dTotalPrice = parseFloat(dTotalPrice);
       //     alert("dTotalPrice" + dTotalPrice + "row.CBVer:" + row.CBVer);
            row.CBPer = parseFloat(row.CBPer);
            row.CBMoney = row.CBPer * dTotalPrice / 100;

            $('#dg').datagrid('updateRow', {
                index: index,
                row: row
            });
            $('#dg').datagrid('refreshRow', index);//刷新改行内容
        }
    } catch (ex) {
        alert("UpdateHTCost" + ex.message);
    }
}

//条形码插入
function UpdateRowFieldCLCode(index, row) {


    try {

        //    alert("onBarAddRow.strTable" + strTable + "Code" + sCode);

        //     alert(sBillCode);
        var sCKName = "";
        var sCode = row.CLCode;
        if (mlngInoutType == -1) {

            //     sCKName = txt_OutCK.GetText();
            var str = $('#OutCK').textbox('getValue');
            str = GetStrSave(str);//考虑转义问题
            sCKName = str;
        }
        sBillCode = mdtRow["Code"];//主表的Code字段

        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        var dataparm = { TableName: mstrTableSub, CLCode: sCode, CKName: sCKName, BillCode: sBillCode };
        switch (mstrTableSub.toUpperCase()) {
            case "JXC_ORDERCJB":
            case "JXC_IOCKCJB":
            case "JXC_BJCJB":
                dataparm["Action"] = "GetCJB";
                break;
            case "EQUIP_DJJHD"://资产盘点
            case "EQUIP_BYJHD"://保养计划单
            case "EQUIP_PDD"://资产盘点
            case "EQUIP_IO": 
            case "EQUIP_BY": //保养记录
            case "EQUIP_IOD"://资产盘点
                dataparm["Action"] = "GetEquipSB";
                dataparm["BarCode"] = sCode;
                break;
        }
           
        //$.post(url,
        //    dataparm,
        //    function (data, status) {

        //    });

        $.ajax({
            url: url, data: dataparm, type: 'POST', dataType: 'text',
            success: function (data) {

                try {
                    //     alert(data);
                    if (data == "-1") {
                        return;
                    }
                    var mjson = eval("(" + data + ")"); //
                    //       alert("mbGridChange = true");
                    mbGridChange = true;
                    $.each(mjson.tbl, function (idx, item) {
                        //InsertRowItem(item, 1);
                        //row.CLName = item.CLName;
                        InitRowItem(row, item);
                        //    alert("新的item.CLName:" + row.CLName +"index:"+index);
                        //   row.ID = 11;
                        //   alert("新的:" + JSON.stringify(row));
                        $('#dg').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                        $('#dg').datagrid('refreshRow', index);//刷新改行内容
                        //重新获得焦点定位
                        var sNextField = GetGridNextField(index, "CLCode");
                        onClickCell(editIndex, sNextField);
                    });
                }
                catch (ex) {
                    alert("intpu.js.UpdateRowFieldCLCode.ret:" + ex.name + ":" + ex.message);
                }
            },
            error: function (xhr) {
                alert('动态页有问题\nstatus：' + xhr.status + '\nresponseText：' + xhr.responseText)
            }
        });


    }
    catch (ex) {
        alert("intpu.js.UpdateRowFieldCLCode:" + ex.name + ":" + ex.message);
    }
}

function UpdateGridSFB(row, field) {
    var bRet = true;
    try {
        //     alert("UpdateGridSFB" + field + "rowinfo:" + JSON.stringify(row));
        //alert("UpdateGridSFB" + field + "row.BCSFMoney:" + row.BCSFMoney);
        //alert("UpdateGridSFB" + field + "row.WSFMoney:" + row.WSFMoney);
        ////如果有总金额字段
        if (parseFloat(row.BCSFMoney) > parseFloat(row.WSFMoney)) {
            alert("本次收付金额" + row.BCSFMoney + "不能大于未收付金额！" + row.WSFMoney + "");
            //   row.BCSFMoney = 0;
            bRet = false;
        }

        if ($('#TotalPrice').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "BCSFMoney");
            $('#TotalPrice').textbox('setValue', total);
        }

        //这个地方要汇总所有网格

    } catch (ex) {
        alert("UpdateGridSFB" + ex.message);
    }
    return bRet;
}


//格式化显示
//function GridFormatNumber(value, sFormat) {
//    return formatNumber(value, 2);
//}
//方便多单位换算处理
function UpdateUAmount(row, dAmount,lType) {
    //var str = '123.456sdfsdf456.789'
    //var numArr = str.match(/\d+\.\d+/g)
   
    //console.log(numArr) / /=> ["123.456", "456.789"]
    try {
        var dXS = 1;
        var dSX = 0;
        var sFZUnit = row.FZUnit;
        //  sFZUnit;// 1件=12瓶 

        if (sFZUnit == "" || sFZUnit == undefined) {
            return;//没啥好转换的
        }
        var sArr = sFZUnit.split("=");
        dXS = sArr[1];
        dXS = parseFloat(dXS);
     //   dXS = dXS.match(/\d+\.\d+/g);//  取文本和数字混合取数字

   //     alert("UpdateUAmount" + dAmount + "dSX:" + dSX + "dXS:" + dXS);
        
        
        if (lType == 0) {
            dSX = dAmount % dXS;
            row.Amount = dAmount;
            row.UAmount1 = (dAmount - dSX) / dXS;//整件数量 或者整箱数量
            row.UBAmount = dSX;//散数量
        } else {
            row.UAmount1 = dAmount;
            dSX = parseFloat(row.UBAmount);
            row.Amount = dXS * dAmount + dSX;//整件数量 或者整箱数量      
        }
    } catch {
        alert("input.js.UpdateUAmount" + ex.message);
    }
    
}

function UpdateGridMtl(row, field) {
    var bRet = true;
    if (row.Cess == undefined) {
        row.Cess = 0;
    }
    //  alert("UpdateGridMtl.mlngAmountLen=" + mlngAmountLen);
    var lAmountLen = mlngAmountLen;
    if (!isNotANumber(mlngAmountLen)) {
        lAmountLen = 2;
    }
    var lGoodsPriceCalcType = mlngGoodsPriceCalcType;
    if (!isNotANumber(mlngGoodsPriceCalcType)) {
        lGoodsPriceCalcType = 2;
    }
    
    var lMoneyLen = mlngMoneyLen;
    if (!isNotANumber(mlngMoneyLen)) {
        lMoneyLen = 2;
    }
   
    
    //    alert("lAmountLen=" + lAmountLen);
    //我们讲究源头 反算
    switch (field) {

        case "PDAmount":
            //     alert("lAmountLen=" + lAmountLen + "row.Amount=" + row.Amount);
            row.Amount = formatNumber((row.PDAmount - row.QMAmount), lAmountLen);//这里截取，改为不截取
            break;
        case "Amount":
            //     alert("lAmountLen=" + lAmountLen + "row.Amount=" + row.Amount);
            row.Amount = formatNumber(row.Amount, lAmountLen);//这里截取，改为不截取
            //不能超过库存数量
            if (lGoodsPriceCalcType == 2) {
                if (row.Amount > row.KCAmount && mlngInoutType==-1) {
                    alert1("出库数量不能超过该批次的入库数量[" + row.KCAmount+"]");
                    row.Amount = row.KCAmount;
                }
            }
            UpdateUAmount(row, row.Amount, 0);
            break;
        case "UAmount1":
            row.UAmount1 = formatNumber(row.UAmount1, lAmountLen);//这里截取，改为不截取
            UpdateUAmount(row, row.UAmount1, 1);
            break;
        case "UBAmount":
            row.UBAmount = formatNumber(row.UBAmount, lAmountLen);//这里截取，改为不截取
            UpdateUAmount(row, row.UAmount1, 1);
            break;
        case "CJPrice":
            //     row.CJPrice = formatNumber(row.CJPrice, lMoneyLen);
            row.Price = parseFloat(row.CJPrice) * parseFloat(1 + row.Cess / 100);
            //       row.Price = formatNumber(parseFloat(row.CJPrice) * parseFloat(1 + row.Cess / 100), lMoneyLen);
            break;
        case "Cess":
            //    row.Cess = formatNumber(row.Cess, lMoneyLen);
            break;
        case "Price":

            //     row.Cess = formatNumber(row.Cess, lMoneyLen);
            row.CJPrice = parseFloat(row.Price) / parseFloat(1 + row.Cess / 100);
            //       row.CJPrice = formatNumber(parseFloat(row.Price) / parseFloat(1 + row.Cess / 100), lMoneyLen);
            break;
        case "UseDate"://计算过期日期
            //     row.Cess = formatNumber(row.Cess, lMoneyLen);
            var dateExpDate = getNowFormatDate()

            var date;// = new Date();
            var strBillDate = mdtRow["BillDate"];
            if (strBillDate != "") {
                date = StringToDate(strBillDate);
            }
            date = date.DateAdd("d", parseInt(row.UseDate));
            var currentdate = date.Format("yyyy-MM-dd hh:mm:ss");     //获取当前日期
           // return currentdate;
            row.ExpDate = currentdate;
            //       row.CJPrice = formatNumber(parseFloat(row.Price) / parseFloat(1 + row.Cess / 100), lMoneyLen);
            break;

    }


    row.SumP = parseFloat(row.Amount) * parseFloat(row.Price);
    row.SumHK = parseFloat(row.Amount) * parseFloat(row.CJPrice);
    row.SumCost = parseFloat(row.Amount) * parseFloat(row.CostPrice);
    row.SumCess = parseFloat(row.Amount) * parseFloat(row.CJPrice) * row.Cess / 100;

    //2019-08-20 屏蔽掉这里截取，这里截取会导致超过2位无法保存
    //row.SumP = formatNumber(row.SumP, lMoneyLen);
    //row.SumHK = formatNumber(row.SumHK, lMoneyLen);
    //row.SumCost = formatNumber(row.SumCost, lMoneyLen);
    //row.SumCess = formatNumber(row.SumCess, lMoneyLen);
    try {
        if ("JXC_BJCJB" == mstrTableSub.toUpperCase()) {
            row.SumP1 = parseFloat(row.Amount) * parseFloat(row.Price1);
            row.SumP2 = parseFloat(row.Amount) * parseFloat(row.Price2);
            row.SumP3 = parseFloat(row.Amount) * parseFloat(row.Price3);

            if ($('#TotalPrice1').length > 0) {//判断某个ID是否存在的依据
                //       alert("存在主表该字段内容");
                var total = GridTotalCol("dg", "SumP1");
                $('#TotalPrice1').textbox('setValue', total);
            } 
            if ($('#TotalPrice1').length > 0) {//判断某个ID是否存在的依据
        
                var total = GridTotalCol("dg", "SumP2");
                $('#TotalPrice2').textbox('setValue', total);
            } 
            if ($('#TotalPrice3').length > 0) {//判断某个ID是否存在的依据
                //       alert("存在主表该字段内容");
                var total = GridTotalCol("dg", "SumP3");
                $('#TotalPrice3').textbox('setValue', total);
            }
        }
        //alert(row.SumP);
        //如果有总金额字段
        if ($('#TotalPrice').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "SumP");
            $('#TotalPrice').textbox('setValue', total);
        } 
        if ($('#TotalAmount').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "Amount");
            $('#TotalAmount').textbox('setValue', total);
        } 
        //这个地方要汇总所有网格

    } catch (ex) {
        alert("UpdateGridMtl" + ex.message);
    }
    return bRet;
}

//修改设备资产的数量
function UpdateGridEquipAmount(row, field) {




    try {
        //alert("UpdateGridEquipAmount" + field);
        var lAmountLen = mlngAmountLen;
        if (isNotANumber(mlngAmountLen)) {
            lAmountLen = 2;
        }
        var lMoneyLen = mlngMoneyLen;
        if (isNotANumber(mlngMoneyLen)) {
            lMoneyLen = 2;
        }
        switch (field) {//改为点击那里获取
            //case "PDFlag":
            //    //     alert("row.PDFlag:" + row.PDFlag);
            //    if (parseInt(row.PDFlag) == 1) {
            //        row.PDMan = GetCookie("username");
            //        row.PDDate = getNowFormatDate();
            //    }
            //    break;
            case "PDAmount":
                ///  row.PDAmount = formatNumber(row.PDAmount, lAmountLen);
                row.PDAmount = parseFloat(row.PDAmount);
                break;
        }

        //alert("row.PDAmount:"+row.PDAmount + "row.Price" + row.Price)
        row.SumPD = parseFloat(row.PDAmount) * parseFloat(row.Price);
        row.SumPrice = parseFloat(row.AmountEx) * parseFloat(row.Price);
        row.AmountDiff = parseFloat(row.PDAmount) - parseFloat(row.AmountEx);
        if (row.AmountDiff >= 0) {
            row.Amount1 = row.AmountDiff;
        } else {
            row.Amount2 = -1 * row.AmountDiff;
        }
        row.SumP1 = parseFloat(row.Amount1) * parseFloat(row.Price);
        row.SumP2 = parseFloat(row.Amount2) * parseFloat(row.Price);
        //alert(row.SumP);
        //如果有总金额字段
        if ($('#TotalPriceEx').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "SumPrice");
            $('#TotalPriceEx').textbox('setValue', total);
        }

        if ($('#TotalPricePD').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "SumPD");
            $('#TotalPricePD').textbox('setValue', total);
        }

        var dTotalAmount = 0;
       

        if ($('#TotalAmountPD').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "PDAmount");
            $('#TotalAmountPD').textbox('setValue', total);
        }

        if ($('#TotalAmountEx').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "AmountEx");
            dTotalAmount = total;
            $('#TotalAmountEx').textbox('setValue', total);
        }
        if ($('#TotalPrice1').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "SumP1");
            $('#TotalPrice1').textbox('setValue', total);
        }
        if ($('#TotalPrice2').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "SumP2");
            $('#TotalPrice2').textbox('setValue', total);
        }
     


        //这个地方要汇总所有网格

    } catch (ex) {
        alert("UpdateGridEquipAmount" + ex.message);
    }
}

//处理导入问题
function ProcImportProp() {
    try {
        var lGridType = mlngGridTypeC;//document.getElementById("hid_gridtype").value;
        var strTable = mstrTableSub;


        var sPerm = mstrPermString;
        if (!IsValidHandler(sPerm, eOperPrint)) {
            $.messager.alert("提示", "当前用户无导入权限，需要取得该权限的【打印】权限才可以批量导入，请联系管理员开通");
            return;
        }
        //   alert(lGridType);
        if (mlngID < 1) {
            alert1("数据还未保存，请保存一次再进行导入操作");
            return;
        }

        //  var strUrl = "../WebImport.aspx?GridType=" + lGridType + "&TableName=" + strTable + "&GroupID=" + lSelID + "&GroupName=" + strGroupName + "";
        var strUrl = "WebImport.html?GridType=" + lGridType + "&TableGroup=" + mstrTableName + "&TableName=" + strTable + ""
        strUrl = strUrl + "&PermString=" + mstrPermString + "&ObjID=" + mlngID + "&HideGroupID=1";
      
        strUrl = strUrl + "&RelField=" + mstrRelField;
        strUrl = strUrl + "&ImpType=2";//仅仅只是导入属性
     //   alert("input.js.ProcImportProp" + strUrl);
        ShowDlg(1150, 750, strUrl);
    } catch (ex) {
        alert("ProcImportProp" + ex.message);
    }
    
}
//加载人员
function LoadGZRY() {
    try {
        //alert("UpdateGridEquipAmount" + field);

        $.messager.confirm('超易软件', '执行该操作将会重新根据账套人员生成，但是会删除目前的人员工资内容，确定要重新按选定加载人员吗?', function (r) {
            if (r) {
                var lZTID = $('#ZTID').textbox('getValue');
                //这个地方 修改从服务器那里拿取数据
                var url = "../ajax/Salary.ashx?now =" + new Date().getTime() + "";
                var dataparm = { GZZTID: mlngID };
                dataparm["Action"] = "loadgzry";
                //   dataparm["ID"] = lID;     
                dataparm["ZTID"] = lZTID;
                $.ajax({
                    url: url, async: true, data: dataparm, type: 'POST', dataType: 'text',
                    success: function (data) {

                        try {
                            var json = eval("(" + data + ")");
                            $('#dg').datagrid('loadData', json);

                        } catch (ex) {
                            alert("input.js.UpdateGZDetail.onret" + ex.message);
                        }
                    },
                    error: function (xhr) {
                        alert('服务端通讯错误\nstatus：' + xhr.status + '\nresponseText：' + xhr.responseText)
                    }
                });
            }
        });

    } catch (ex) {
        alert("input.js.LoadGZRY" + ex.message);
    }
}


//导入工资 
function ProcImportGZ(strImpType) {
    try {
        //alert("UpdateGridEquipAmount" + field);

        $.messager.confirm('超易软件', '执行该操作将会导入选定月份的计时计件工资并重新计算，确定要执行此操作吗?', function (r) {
            if (r) {
                var lZTID = $('#ZTID').textbox('getValue');
                //这个地方 修改从服务器那里拿取数据
                var url = "../ajax/Salary.ashx?now =" + new Date().getTime() + "";
                var dataparm = { GZZTID: mlngID };
                dataparm["Action"] = "impgz";
                dataparm["ImpField"] = strImpType;     
                dataparm["ZTID"] = lZTID;
                var lGZYear = $('#GZYear').textbox('getValue');
                var lGZMonth = $('#GZMonth').textbox('getValue');           
                dataparm["GZYear"] = lGZYear;
                dataparm["GZMonth"] = lGZMonth;

                $.ajax({
                    url: url, async: true, data: dataparm, type: 'POST', dataType: 'text',
                    success: function (data) {

                        try {
                            var json = eval("(" + data + ")");
                            $('#dg').datagrid('loadData', json);

                        } catch (ex) {
                            alert("input.js.ProcImportGZ.onret" + ex.message);
                        }
                    },
                    error: function (xhr) {
                        alert('服务端通讯错误\nstatus：' + xhr.status + '\nresponseText：' + xhr.responseText)
                    }
                });
            }
        });

    } catch (ex) {
        alert("input.js.ProcImportGZ" + ex.message);
    }
}


//修改工资数据
function UpdateGZDetail(lCalcType,row, field,index) {
    try {
       
        var lAmountLen = mlngAmountLen;
        if (isNotANumber(mlngAmountLen)) {
            lAmountLen = 2;
        }
        var lMoneyLen = mlngMoneyLen;
        if (isNotANumber(mlngMoneyLen)) {
            lMoneyLen = 2;
        }
        var dValue = 0;
        var lEmpID = 0;
        var lID = 0;
        switch (field) {//改为点击那里获取            
            case "JIBEN":
                dValue = row[field];
                break;
        }

        if (row != undefined) {
            dValue = row[field];
            lEmpID = row.EmpID;
            lID = row.ID;
        //    alert("UpdateGridEquipAmount" + JSON.stringify(row));
        }
        

        //这个地方 修改从服务器那里拿取数据
        var url = "../ajax/Salary.ashx?now =" + new Date().getTime() + "";
        var dataparm = {GZZTID: mlngID };
        dataparm["Action"] = "updategz";
        dataparm["CalcType"] = lCalcType;
        dataparm["Value"] = dValue;
        dataparm["ID"] = lID;
        dataparm["EmpID"] = lEmpID;//员工号
        dataparm["Field"] = field;

        $.ajax({
            url: url, async: true, data: dataparm, type: 'POST', dataType: 'text',
            success: function (data) {            
             
                try {
                    var json = eval("(" + data + ")");
               //     alert(data);
                    if (json.total > 0) {
                        row = json.rows[0];
                    }
                    if (lCalcType == 0) {
                        $('#dg').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                        $('#dg').datagrid('refreshRow', index);//刷新改行内容

                    } else {
                        $('#dg').datagrid('loadData', json);
                    }
                   
                } catch (ex) {
                    alert("input.js.UpdateGZDetail.onret" + ex.message);
                }
            },
            error: function (xhr) {
                alert('服务端通讯错误\nstatus：' + xhr.status + '\nresponseText：' + xhr.responseText)
            }
        });

    } catch (ex) {
        alert("UpdateGZDetail" + ex.message);
    }
}



//网格汇总计算
function GridTotalCol(dgName, colName) {
    var rows = $('#' + dgName + '').datagrid('getRows');
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
        if (isNumber(rows[i][colName])) {
            total += parseFloat(rows[i][colName]);
        }        
    }
    return total;
}

/**
 * 格式化数字，小数点后是0不表示
 * @param value
 * @param fixed 小数位数
 */
function formatNumber(value, fixed) {
    var number = Number(value);
    if (isNaN(number)) {
        return '';
    } else {
        return number.toFixed(fixed);
        //if (fixed == 2) {
        //    return number.toFixed(2) * 100 / 100;
        //} else if (fixed == 6) {
        //    return number.toFixed(6) * 1000000 / 1000000;
        //}
    }
}


//设置
function cellStyler(value, row, index) {
    // if (value < 30) {
    //   return 'background-color:#ffee00;color:red;';
    return 'background-color:#B0FFC5;';
    //var val = toThousands(value);
    //return val;

    //alert(val);
    //return '<span style="color:#B0FFC5;">(' + val + ')</span>';
    //}
}


//增加一个文本框
function AddButtonFieldUserName(val, rowdata, index) {
    var sText = "";
    // sText = '<input   id="Field1" name="field1" value="' + rowdata.Field1 + '" data-options="icons:' + JSON.stringify(mObjFieldSel) + '" style="width:80px"  class="easyui-textbox"   >';
    var txtid = "Field1" + "|" + rowdata.Row;
    var val = rowdata.Field1;
    if (val == null || val == "null") {
        val = "";
    }
    sText = '<input   id="' + txtid + '" name="fieldicon" value="' + val + '"  style="width:120px"  class="easyui-textbox"   >';
    return sText;
}

//{"total":28,"rows":[
//    {"productid":"FI-SW-01","unitcost":10.00,"status":"P","listprice":36.50,"attr1":"Large","itemid":"EST-1"},
//    {"productid":"K9-DL-01","unitcost":12.00,"status":"P","listprice":18.50,"attr1":"Spotted Adult Female","itemid":"EST-10"},
//    {"productid":"RP-SN-01","unitcost":12.00,"status":"P","listprice":28.50,"attr1":"Venomless","itemid":"EST-11"},
//    {"productid":"RP-SN-01","unitcost":12.00,"status":"P","listprice":26.50,"attr1":"Rattleless","itemid":"EST-12"},
//    {"productid":"RP-LI-02","unitcost":12.00,"status":"P","listprice":35.50,"attr1":"Green Adult","itemid":"EST-13"},
//    {"productid":"FL-DSH-01","unitcost":12.00,"status":"P","listprice":158.50,"attr1":"Tailless","itemid":"EST-14"},
//    {"productid":"FL-DSH-01","unitcost":12.00,"status":"P","listprice":83.50,"attr1":"With tail","itemid":"EST-15"},
//    {"productid":"FL-DLH-02","unitcost":12.00,"status":"P","listprice":63.50,"attr1":"Adult Female","itemid":"EST-16"},
//    {"productid":"FL-DLH-02","unitcost":12.00,"status":"P","listprice":89.50,"attr1":"Adult Male","itemid":"EST-17"},
//    {"productid":"AV-CB-01","unitcost":92.00,"status":"P","listprice":63.50,"attr1":"Adult Male","itemid":"EST-18"}
//],"footer":[
//    {"unitcost":19.80,"listprice":60.40,"productid":"Average:"},
//    {"unitcost":198.00,"listprice":604.00,"productid":"Total:"}
//]}

//第一次加载的时候
function GridAddFooter(rows) {

    try {
        //    alert("GridAddFooter.rows=" + JSON.stringify(rows));
        var footerObj = [];
        var row = {}
        row["IsTotal"] = 1;

        var dgName = "dg";
        //       var rows = $('#' + dgName + '').datagrid('getRows');
        for (var i = 0; i < mGridColObj.length; i++) {
            var item = mGridColObj[i];
            //if (i == 0) {               
            //    row[item.Key] = "合计：";
            //}
            if (item.TotalFunc == "Avg") {

            }
            if (item.TotalFunc == "Sum") {
                //    alert("Find.item.Key=" + item.Key+mRowTotalObj[item.Key])
                var lTotal = GridTotalSumColByRows(rows, item.Key);
                row[item.Key] = lTotal;//分页小计

            }
        }

        footerObj.push(row);
        //      alert("GridAddFooter.footerObj=" + JSON.stringify(footerObj));
        return footerObj;
    } catch (ex) {
        alert("input.GridAddFooter." + ex.message)
    }

}


//增加汇总行 或者更改
function GridUpdateFooterRow(dgName) {

    //   alert("GridAddFootRow:");
    // alert("HasButtonEdit:" + mGridColObj.length);
    try {


        //  var rows = $("#" + dgName + "").datagrid('getFooterRows');
        var rows = $("#" + dgName + "").datagrid('getFooterRows');
        var row = rows[0];
        // rows[0]['price'] = totalMoney;


        for (var i = 0; i < mGridColObj.length; i++) {
            var item = mGridColObj[i];
            //  alert("HasButtonEdit:" + sField + "item.Key:" + item.Key + " item.EditType:  " + item.EditType);
            if (item.TotalFunc == "Avg") {

            }
            if (item.TotalFunc == "Sum") {
                //    alert("Find.item.Key=" + item.Key+mRowTotalObj[item.Key])
                var lTotal = GridTotalSumCol(dgName, item.Key);
                row[item.Key] = lTotal;//分页小计              

            }
        }

        $("#" + dgName + "").datagrid('reloadFooter');




    }
    catch (ex) {
        alert("GridAddFootRow:" + ex.name + ex.message);
    }
}



//主表网格加载完毕触发事件
function onLoadSuccess(data) {


    try {

        $('input[name="fieldicon"]').each(function (idx) {
            $(this).textbox({ icons: mObjGridFieldSel });
        });
        //       $('#Field10').textbox({ icons: mObjFieldSel });

    }
    catch (ex) {
        alert("onLoadSuccess" + ex.message);
    }
}

//增加一行

function append() {
    try {
        if (endEditing()) {
            var row = null;
            if (mPropRowNull != undefined) {
                row = CloneObj(mPropRowNull);
                //$('#dg').datagrid('updateRow', {
                //    index: editIndex,
                //    row: row
                //});
                //$('#dg').datagrid('refreshRow', editIndex);//刷新改行内容
            } else {
                row = { status: 'P' };
            }
            $('#dg').datagrid('appendRow', row);

            editIndex = $('#dg').datagrid('getRows').length - 1;

            $('#dg').datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);


            //增加一个空的Row 否则容易产生错误
            if (mPropRowNull != undefined) {
                row = CloneObj(mPropRowNull);
                $('#dg').datagrid('updateRow', {
                    index: editIndex,
                    row: row
                });
                $('#dg').datagrid('refreshRow', editIndex);//刷新改行内容
            }
        }
    }
    catch (ex) {
        alert("input.js.append.ex=" + ex.message);
    }
}





function removeit() {
    if (editIndex == undefined) { return }
    $('#dg').datagrid('cancelEdit', editIndex)
        .datagrid('deleteRow', editIndex);
    editIndex = undefined;
}
function accept() {
    if (endEditing()) {
        $('#dg').datagrid('acceptChanges');
    }
}
function reject() {
    $('#dg').datagrid('rejectChanges');
    editIndex = undefined;
}
function getChanges() {
    var rows = $('#dg').datagrid('getChanges');
    alert(rows.length + ' rows are changed!');
}

//获取网格的JSON数据
function getOptionDataStr() {
    var data = $('#dg').datagrid('getData');
    var str = "";
    if (data) {
        for (var i = 0; i < data.rows.length; i++) {
            var idx = i + 1;
            if (str.length == 0)
                str = idx + ":" + data.rows[i].optcontent;
            else
                str += ";" + idx + ":" + data.rows[i].optcontent;
        }
    }
    return str;
}


//初始化网格
function InitGrid() {
    if (mlngOrderType < 1 && mlngGridTypeC < 1)
        return;
    //改为动态创建
    //var strdg = '<table id="dg" title="" class="easyui-datagrid" style="width: 99%;height:400px"></table>';
    //var objGrid = $('#divgrid').append(strdg);
    //$.parser.parse(objGrid);//渲染一下吧

    $('#dg').datagrid({

        //  onClickRow: onClickRow,
        //onDblClickRow: function (rowIndex, rowData) {
        //    alert("双击");
        //},
        onLoadSuccess: onLoadSuccess,
        onClickCell: onClickCell,
        rownumbers: true,
        pagination: false,
        singleSelect: true,
        //height:450,
        showFooter: true,
        loadMsg: "数据加载中...", //載入信息時提示內容
        title: "",


    });

}

//初始化属性网格的 工具栏
function InitToolBarProp() {

    try {
        $('#propimport').hide();
        //    alert("input.InitToolBarProp1.mlngGridTypeC=" + mlngGridTypeC);
        if (mlngOrderType < 1 && parseInt(mlngGridTypeC) < 1) {

            return;
        }
        //      alert("input.InitToolBarProp2.1.mlngGridTypeC=" + mlngGridTypeC);
        var obj = HasRelOrder(mlngOrderType);
        //    alert(JSON.stringify(obj));
        //      alert("InitToolBarProp" + obj.Has);
        if (obj.Has == true) {
            //      alert("InitToolBarProp" + mlngOrderType);
            var strKey = "rel";
            var strCaption = obj.Caption;// "引用订单"
            var lRelOrderType = obj.RelOrderType;
            var sRelButton = '<a href="#" id="' + design + '" title="点击选择引用订单" onclick="onRelOrder(' + lRelOrderType + ')" class="easyui-linkbutton" plain="true" iconcls="icon-edit">' + strCaption + '</a>';
            //       var objRel = $('#').before(strdivgrid);
            //       var divgridName = "divtoolbar";
            var objRel = $('#divtoolbar').append(sRelButton);
            $.parser.parse(objRel);//渲染一下吧
        }

        //     alert("input.InitToolBarProp5.mlngGridType=" + mlngGridType);
        if (mlngGridType == 5036) {
            var strKey = "imppddata";
            var strCaption = "导入采集";// "引用订单"

            var sRelButton = '<a href="#" id="' + strKey + '" title="点击导入采集数据" onclick="ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain="true" iconcls="icon-import">' + strCaption + '</a>';

            var objRel = $('#divtoolbar').append(sRelButton);
            $.parser.parse(objRel);//渲染一下吧

            var strKey = "zcpd";
            var strCaption = "按部门盘点";// "引用订单"

            var sRelButton = '<a href="#" id="' + strKey + '" title="点击根据所选部门自动盘点" onclick="ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain="true" iconcls="icon-calculator">' + strCaption + '</a>';

            var objRel = $('#divtoolbar').append(sRelButton);
            $.parser.parse(objRel);//渲染一下吧

            var strKey = "zcpdex";
            var strCaption = "按分组盘点";// "引用订单"

            var sRelButton = '<a href="#" id="' + strKey + '" title="点击根据所选分组自动盘点" onclick="ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain="true" iconcls="icon-calculator">' + strCaption + '</a>';

            var objRel = $('#divtoolbar').append(sRelButton);
            $.parser.parse(objRel);//渲染一下吧

        }
        //领料出库 和销售出库 ，可以从库存查找出库
        if (mlngGridType == 41 || 51 == mlngGridType) {
            var strKey = "findbyck";
            var strCaption = "按仓库查找";// "引用订单"

            var sRelButton = '<a href="#" id="' + strKey + '" title="点击按仓库查找" onclick="ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain="true" iconcls="icon-import">' + strCaption + '</a>';

            var objRel = $('#divtoolbar').append(sRelButton);
            $.parser.parse(objRel);//渲染一下吧

         

        }
        //    alert("mlngGridType:" + mlngGridType);
        if (mlngGridType == 56) {
            var strKey = "ckpd";
            var strCaption = "自动盘点";// "引用订单"          
            var sRelButton = '<a href="#" id="' + strKey + '" title="点击根据所选仓库自动盘点" onclick="ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain="true" iconcls="icon-calculator">' + strCaption + '</a>';

            var objRel = $('#divtoolbar').append(sRelButton);
            $.parser.parse(objRel);//渲染一下吧

            var strKey = "GetCJKC";
            var strCaption = "计算库存";// "引用订单"          
            var sRelButton = '<a href="#" id="' + strKey + '" title="点击根据所选仓库自动盘点" onclick="ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain="true" iconcls="icon-sum">' + strCaption + '</a>';

            var objRel = $('#divtoolbar').append(sRelButton);
            $.parser.parse(objRel);//渲染一下吧
        }
        switch (mlngGridType) {
            case 53:    //产品进仓当
            case 1:     //采购订单
                $('#propimport').show();//显示导入
                break;

        }
     
        if (mlngGridType == 8015) {
            $('#propimport').show();
            //var strKey = "impgz";
            //var strCaption = "导入";// "引用订单"          
            //var sRelButton = '<a href="#" id="' + strKey + '" title="点击根据所选账套加载人员" onclick="ontoolbar(\'' + strKey + '\')" class="easyui-menubutton" plain="true" iconcls="icon-import">' + strCaption + '</a>';
            //var objRel = $('#divtoolbar').append(sRelButton);
            //$.parser.parse(objRel);//渲染一下吧


            //var divImpGZ = '<div id="mmgz">';
            ////strKey = "impjjgz"; strCaption = "导入计件工资";
            ////divImpGZ += '<div>< a href = "#" id = "' + strKey + '" title = "导入计件工资" onclick = "ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain = "true" iconcls = "icon-sum" > ' + strCaption + '</a ></div> ';
            ////strKey = "impjsgz"; strCaption = "导入计时工资";
            ////divImpGZ += '<div>< a href = "#" id = "' + strKey + '" title = "导入计时工资" onclick = "ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain = "true" iconcls = "icon-sum" > ' + strCaption + '</a ></div> ';

            //divImpGZ += '</div>';
            //var objRel = $('#bodyMain').append(divImpGZ);
            //$.parser.parse(objRel);//渲染一下吧

            //$('#impgz').menubutton({
            //    iconCls: 'icon-edit',
            //    menu: '#mmgz'
            //});
   
            //$('#mmgz').menu('appendItem', {
            //    text: 'New Item',
            //    iconCls: 'icon-ok',
            //    onclick: function () { alert('New Item') }
            //});

            var strKey = "LoadGZRY";
            var strCaption = "按选定账套加载";// "引用订单"          
            var sRelButton = '<a href="#" id="' + strKey + '" title="点击根据所选账套加载人员" onclick="ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain="true" iconcls="icon-sum">' + strCaption + '</a>';

            var objRel = $('#divtoolbar').append(sRelButton);
            $.parser.parse(objRel);//渲染一下吧

            var strKey = "CalcGZ";
            var strCaption = "重算";// "引用订单"          
            var sRelButton = '<a href="#" id="' + strKey + '" title="点击自动重算工资" onclick="ontoolbar(\'' + strKey + '\')" class="easyui-linkbutton" plain="true" iconcls="icon-sum">' + strCaption + '</a>';

            var objRel = $('#divtoolbar').append(sRelButton);
            $.parser.parse(objRel);//渲染一下吧
        }

    }
    catch (ex) {
        alert("intput.InitToolBarProp:" + ex.message);
    }
}



var toolbar = [{
    text: '增加',
    iconCls: 'icon-add',
    handler: function () { ontoolbar('add') }
}, {
    text: '查找',
    iconCls: 'icon-find',
    handler: function () { ontoolbar('find') }
    //}, '-', {
    //    text: 'Save',
    //    iconCls: 'icon-save',
    //    handler: function () { ontoolbar('save') }
}, '-', {
    text: '导出',
    iconCls: 'icon-export',
    handler: function () { ontoolbar('excel') }
}, '-', {
    text: '列设置',
    iconCls: 'icon-wrench',
    handler: function () { ontoolbar('gridset') }
}];

//执行操作
function ShowExec(target) {  //删除用户
    try {
        var tr = $(target).closest('tr.datagrid-row');
        var index = parseInt(tr.attr('datagrid-row-index'));
        mlngGridIndex = index;
        $('#dg').datagrid('selectRow', index);//先选中再说吧
        var rows = $("#dg").datagrid("getRows");

        //  alert("删除记录：" + rows[index].ID);
        //手工再选定行一次

        var sID = rows[index].ID;
        var sNameList = rows[index].XJCont;
        var sRowJsonResult = rows[index].JsonResult;
        var lGridType = 6048;
        var strField = "xjtype";
       
      //  strUrl = "DlgExec.html?ID=" + sID + "&JsonResult=" + sRowJsonResult + "&NameList=" + sNameList + "&GridType=" + lGridType + "&Field=" + strField + "&TableName=v_Equip_XJBZD";// 弹出一个选择对话框按钮
        strUrl = "DlgExec.html?ID=" + sID + "&GridType=" + lGridType + "&Field=" + strField + "&TableName=v_Equip_XJBZD";// 弹出一个选择对话框按钮

        ShowDlg(1050, 600, strUrl);
     
    }
    catch (ex) {
        alert("ShowExec.target.ex:" + ex.message);
    }
}

function ShowDel(target) {  //删除用户
    try {
        var tr = $(target).closest('tr.datagrid-row');
        var index = parseInt(tr.attr('datagrid-row-index'));

        $('#dg').datagrid('selectRow', index);//先选中再说吧
        var rows = $("#dg").datagrid("getRows");
     //  alert("删除记录：" + rows[index].ID);
        //手工再选定行一次

        var sID = rows[index].ID;
        if (mlngOrderType > 0) {
            var lCheckFlag = GetCheckFlag();
            if (lCheckFlag == 1) {
                var strMsg = "已审核单据，不能修改或者删除删除属性内容！";
                $.messager.alert("提醒", strMsg, 'info', function () {

                });
                return;
            }
        }

        //$.messager.confirm('超易软件', '确信要删除下列ID的内容吗?' + sID, function (r) {
        //    if (r) {
        //删除前要选中，否则无法删除的
        //  $('#dg').datagrid('selectRow', index);//先选中再说吧
        removeRow(index, sID);



    }
    catch (ex) {
        alert("ShowDel.target.ex:" + ex.message);
    }

}


//无法连续删除，老师出错误
function ShowDelOld(index) {  //删除用户
    try {

        $('#dg').datagrid('selectRow', index);//先选中再说吧
        var rows = $("#dg").datagrid("getRows");
        alert("删除" + rows[index].ID);
        //手工再选定行一次
        
        var sID = rows[index].ID;
        if (mlngOrderType > 0) {
            var lCheckFlag = GetCheckFlag();
            if (lCheckFlag == 1) {
                var strMsg = "已审核单据，不能修改或者删除删除属性内容！";
                $.messager.alert("提醒", strMsg, 'info', function () {

                });
                return;
            }
        }

        //$.messager.confirm('超易软件', '确信要删除下列ID的内容吗?' + sID, function (r) {
        //    if (r) {
        //删除前要选中，否则无法删除的
      //  $('#dg').datagrid('selectRow', index);//先选中再说吧
        removeRow(index, sID);

        $("dg").datagrid("reload");//重新加载一次
        //    }
        //});

    }
    catch (ex) {
        alert("ShowDel:" + ex.message);
    }

}

function removeRow(index, sID) {
    try {
        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        //    AddRow();
        //ID<1的也可能在数据库中啊
        //if (parseInt(sID) < 1) {
        //    $('#dg').datagrid('deleteRow', index);
        //    return;
        //}
        var dataparm = null;
        if (mlngOrderType > 0) {

            dataparm = { ID: mlngID, ObjID: mlngObjID, OrderID: mlngOrderType, GridType: mlngGridType };
            dataparm["Code"] = mstrCode;
        } else {
            dataparm = { ID: mlngID, ObjID: mlngObjID, DBID: mlngDBID, GridType: mlngGridType };
        }
        dataparm["SubID"] = sID;
        dataparm["Action"] = "deleteprop";

        //    alert(JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {

                //     alert("removeRow.数据：" + data + "\n状态：" + status);
                if (data == 'true') {
                    $('#dg').datagrid('deleteRow', index);
                } else {
                    alert(data);
                }
            });
    }
    catch (ex) {
        alert("removeRow:" + ex.message);
    }
}


//动态创建录入界面
function onCreateUI() {

    try {
        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        //    AddRow();
        //  MaskUtil.mask("正在加载数据...");
        //   alert("onCreateUI.mlngShowSelObj" + mlngShowSelObj);
        onloading();

        var dataparm = null;
        //   alert("onCreateUI:mlngOrderType=" + mlngOrderType + "mlngGridType:" + mlngGridType);
        if (mlngOrderType > 0) {
            dataparm = { ID: mlngID, ObjID: mlngObjID, OrderID: mlngOrderType, GridType: mlngGridType };
        } else {
            dataparm = { ID: mlngID, ObjID: mlngObjID, DBID: mlngDBID, GridType: mlngGridType };
        }
        dataparm["NeedAuth"] = mlngNeedAuth;
        dataparm["AuthFlag"] = mlngAuthFlag;
        dataparm["AddLike"] = mlngAddLike;
        dataparm["DBSrcType"] = mlngDBSrcType;
        dataparm["GroupID"] = mlngGroupID;
        if (mstrSubIDList != "") {
            dataparm["SubIDList"] = mstrSubIDList;
        }
        if (mstrTableRelIn != "") {
            dataparm["TableRelIn"] = mstrTableRelIn;
        }
        if (mlngRelID >0) {
            dataparm["RelID"] = mlngRelID;
        }
        if (mlngRelDBID >0) {
            dataparm["RelDBID"] = mlngRelDBID;
        }
        if (mstrCode != "") {
            dataparm["Code"] = mstrCode;
        }
        if (mlngPID>0) {
            dataparm["PID"] = mlngPID;
        }
        
        //  alert("onCreateUI:dataparm=" + JSON.stringify(dataparm));

        $.post(url,
            dataparm,
            function (data, status) {
                //     alert(data);
                if (data == "-5") {
                    alert("非法请求缺少CorpName字段或者UserNam字段");
                }
                //        alert("input.onCreateUI" + data);
                //    alert("数据：" + data + "\n状态：" + status);
                var json = eval("(" + data + ")");
                ///    alert(JSON.stringify(json.rows));
                //  $("#dg").datagrid("loadData", json.rows);


                LoadInputData(json);
                removeload();
                //   MaskUtil.unmask();

            });


        if (mlngIsApp == 1) {

            if (mlngShowSelObj != 1) {
                $('#divobj').hide();
            }
        }
        else {
            $('#divobj').hide();
        }
    }
    catch (ex) {
        alert("removeRow:" + ex.message);
    }

}


var mobjMainCol = [{
    field: "edit", frozen: true, title: "操作", align: "center", width: 80, formatter: function (value, row, index) {
       // var detail = '<a style="padding:1px;color:black;" onclick="ShowEdit(' + index + ')"><i class="fa fa-edit"></i>编辑</a>';
        var detail = "<img class='GridTopImg' title='点击编辑修改条记录' onclick=ShowEdit(\"" + index + "\")  src='../Images/Edit.png' />";
      //  var deleteBtn = '<a style="color:black;" onclick="ShowDel(this)"><i class="fa fa-trash-o"></i>删除</>';
        var deleteBtn = "<img  title='点击删除该条记录' class='GridTopImg' onclick=ShowDel(this)  src='../Images/DelBtn.png' />";
        var sRelButton = "";
        if (row.IsTotal > 0) {
            sRelButton = '<a title="" class="GridTopBtn" ><i class="fa fa-trash-o"></i>合计</>';
        } else {
         //   deleteBtn = '<a style="color:black;" onclick="ShowDel(' + index + ')"><i class="fa fa-trash-o"></i>删除</>';
          //  deleteBtn = '<a title="点击删除该条记录" class="GridTopBtn"onclick="ShowDel(this)"><i class="fa fa-trash-o"></i>删除</>';
            deleteBtn = "<img  title='点击删除该条记录' class='GridTopImg' onclick=ShowDel(this)  src='../Images/DelBtn.png' />";
            var sRelButton = deleteBtn;
           
            var execBtn = "";
            switch (parseInt(mlngGridTypeC)) {
                case 6048:
                    execBtn = '<a title="点击执行巡检设置" class="GridTopBtn"onclick="ShowExec(this)"><i class="fa fa-trash-o"></i>巡检</>';
                    break;
            }
            if (execBtn != "") {
                sRelButton = deleteBtn + "|" + execBtn;
            }
        }
     
        
      
     //   alert("mlngGridType:" + mlngGridType + sRelButton);
        return sRelButton;
    }
}]

// 加载属性
function LoadInputProp(jsonIn) {
 

    
    try {
        var data = jsonIn.prop;
     //   alert("input.LoadInputProp.data=" + data);

        var json = eval("(" + data + ")");
      
        //     alert("input.LoadInputProp.mlngOrderType" + mlngOrderType + "mlngGridTypeC:" + mlngGridTypeC);
        InitToolBarProp();
        //setTimeout(function () {
   

        mGridColObj = json.dtgrid;
        mPropRowNull = json.table.rownull;
        //     alert(json.columns);
        //  alert(JSON.stringify(json.table));
        // alert("ok0");
        //获取datagrid熟悉对象 并为其赋值
        //   var opt = $("#dg").datagrid('options');
        //    alert('LoadInputProp11');
        var opt = $("#dg").datagrid('options');
        var str = json.columns;
        str = str.replace(/\r\n/g, "<BR>");
        str = str.replace(/\\n/ig, "");
        str = str.replace(/\\r/ig, "");
        json.columns = str;
      //  alert('LoadInputProp.json.columns=' + json.columns);
       //   alert("LoadInputProp.mobjMainColbefore=" + JSON.stringify(mobjMainCol));
        var objCol = eval(json.columns);

        mGridColumns = objCol;
        //connectjson(mobjMainCol, objCol);
        //opt.columns = [mobjMainCol];
        opt.frozenColumns = [mobjMainCol];
        opt.columns = [objCol];
      //       alert("LoadInputProp.mobjMainCol.after=" + JSON.stringify(mobjMainCol));


        //opt.columns = [objCol];
        //    opt.columns =  json.columns;


        //opt.columns = eval("["+json.columns+"]");

        $("#dg").datagrid(opt);

        if (json.table.ErrMsg != "" && json.table.ErrMsg != undefined) {
            alert("发生错误："+json.table.ErrMsg)
        }
        //       
        json.table.footer = GridAddFooter(json.table.rows);
      //     alert("input.LoadInputProp.json.table:" + JSON.stringify(json.table.rows));
        //   alert("input.LoadInputProp.json.table:" + JSON.stringify(json.table.footer));
        $('#dg').datagrid('loadData', json.table);

        switch (mstrTableSub.toUpperCase()) {
            case "JXC_ORDERCJB":
            case "JXC_IOCKCJB":
            case "JXC_BJCJB":
                $('#divCenter').panel({ title: '商品资料' });
                break;
            case "EQUIP_BYPJ":
            case "EQUIP_WXPJ":
                $('#divCenter').panel({ title: '配件资料' });
                break;
            case "EQUIP_XJJLD":
            case "EQUIP_XJJHD":
            case "EQUIP_PDD":
            case "EQUIP_IO": 
            case "EQUIP_DBD":
            case "EQUIP_DBGL":
            case "EQUIP_CGD":
            case "EQUIP_JYJLD":
                $('#divCenter').panel({ title: '资产设备明细' });
                break;
            default:

                break;
        }


        //
    //    alert("propin" + jsonIn.propin);
     //   alert(JSON.stringify(jsonIn.propin));
   //     if (mstrSubIDList != "" && mlngID < 1) {
        //2021-03-18改为新的写法，可以读取传入的数据
        if (jsonIn.propin != undefined && mlngID < 1) {
            var propIn = jsonIn.propin;
            if (jsonIn.propin != undefined) {             
                $('#dg').datagrid('loadData', jsonIn.propin);
            }
        }
       
        //   $.messager.progress('close');
        //}, 1000); //end setTimeout
    }
    catch (ex) {
        //     $('#txtbarcode').val(JSON.stringify(json.table));
        alert("input.LoadInputProp:" + ex.message);
    }
}
//获取材料机械或者仓库库存
function ProcGetKC(strKey) {
    try {
        if (mlngID < 1) {
            alert("主表内容还未保存，不能做自动盘点功能，请先保存主表再点击自动盘点");
            return;
        }
        var strMsg = "自动计算库存将会根据所选的部门仓库重新盘点，请谨慎使用，是否开始自动计算库存";
        if (confirm(strMsg) != true) {
            return;
        }

        var strDept = "";
        var strCK = "";
        //    alert("input.AutoPD1:" );
        if (strKey == "GetZCKC") {
            strDept = $('#Department').textbox('getValue');
            if (strDept == "") {
                alert("部门不能为空");
                return;
            }
        } else {
            strCK = $('#InCK').textbox('getValue');
            if (strCK == "") {
                alert("盘点仓库不能为空");
                return;
            }
        }
        var sCLCodeList = "";
        var rows = $('#dg').datagrid('getRows');
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            sCLCodeList += ",'" + row.CLCode + "'";
        }
        if (sCLCodeList.substr(0, 1) == ",") {
            sCLCodeList = sCLCodeList.substring(1);
        }


        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        if (mlngOrderType > 0) {
            dataparm = { ID: mlngID, Code: mstrCode, ObjID: mlngObjID, OrderID: mlngOrderType, GridType: mlngGridType };
        } else {
            dataparm = { ID: mlngID, ObjID: mlngObjID, DBID: mlngDBID, GridType: mlngGridType };
        }
        dataparm["Department"] = strDept;
        dataparm["CLCodeList"] = sCLCodeList;
        dataparm["BillCode"] = mstrCode;
        dataparm["CKName"] = strCK;
        dataparm["Action"] = strKey;

        //      alert("input.ProcGetKC.dataprm=" + JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {


                if (data == "-1") {
                    return;
                }
                var mjson = eval("(" + data + ")"); //

                mbGridChange = true;
                try {
                    //根据新的重新计算
                    //     $('#dg').datagrid('loadData', mjson);
                    //      alert("input.data=" + data);
                    var rows = $('#dg').datagrid('getRows');
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];

                        var itemT = FindItemByCode(row, mjson.rows);

                        row.QMAmount = itemT.KC;//更改库存
                        if (parseFloat(row.PDAmount) < 1) {
                            row.PDAmount = row.QMAmount;
                        }
                        row.Amount = row.PDAmount - row.QMAmount;
                        //     UpdateRowField(row, "PDAmount");
                        rows[i] = row;

                    }
                    //  alert("input.rows=" + JSON.stringify(rows));
                    $('#dg').datagrid('loadData', rows);

                }
                catch (ex) {
                    alert("input.ProcGetCJKC:" + item.Code + ex.message);
                }

            });

    }
    catch (ex) {
        alert("input.ProcGetCJKC:" + ex.message);
    }
}

// 自动盘点功能
function ProcAutoPD(strKey,lType) {
    try {
        if (lType == undefined) {
            lType = 0;
        }
        if (mlngID < 1) {
            alert("主表内容还未保存，不能做自动盘点功能，请先保存主表再点击自动盘点");
            return;
        }
       

        var strDept = "";
        var strCK = "";
        var strGroupID = "0";
        //    alert("input.AutoPD1:" );
        if (strKey == "ZCPD") {
            
            if (lType == 0) {
                var strMsg = "自动盘点将会删除当前表格的属性内容，根据所选的【部门】重新盘点，请谨慎使用，是否开始自动盘点";
                if (confirm(strMsg) != true) {
                    return;
                }
                strDept = $('#Department').textbox('getValue');
                if (strDept == "") {
                    alert1("部门不能为空");
                    return;
                }
            } else {
                var strMsg = "自动盘点将会删除当前表格的属性内容，根据所选的【分组】重新盘点，请谨慎使用，是否开始自动盘点";
                if (confirm(strMsg) != true) {
                    return;
                }
                strGroupID = $('#GroupID').textbox('getValue');
                if (strGroupID == "" || strGroupID=="0") {
                    alert1("盘点分组不能为空");
                    return;
                }
            }
           
        } else {

            strCK = $('#InCK').textbox('getValue');
            if (strCK == "") {
                alert1("盘点仓库不能为空");
                return;
            }
            var strMsg = "自动盘点将会删除当前表格的属性内容，根据所选的【仓库】重新盘点，请谨慎使用，是否开始自动盘点";
            if (confirm(strMsg) != true) {
                return;
            }
        }


        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        if (mlngOrderType > 0) {
            dataparm = { ID: mlngID, Code: mstrCode, ObjID: mlngObjID, OrderID: mlngOrderType, GridType: mlngGridType };
        } else {
            dataparm = { ID: mlngID, ObjID: mlngObjID, DBID: mlngDBID, GridType: mlngGridType };
        }
        dataparm["Department"] = strDept;
        dataparm["InCK"] = strCK;
        dataparm["BillCode"] = mstrCode;
        dataparm["Action"] = strKey;
        dataparm["PDType"] = lType;
        dataparm["GroupID"] = strGroupID;
        dataparm["GridTypeRel"] = mlngGridTypeRel;//父亲分组

        //    alert(JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {
                if (data == "-1") {
                    return;
                }
                var lID = -1;
                var mjson = eval("(" + data + ")"); //
                var rows = mjson.rows;
             /*   if (rows.length > 0) {*/
                    for (var i = 0; i < rows.length; i++){
                        var item = rows[i];
                        item.ID = lID;
                        lID--;
                        rows[i] = item;
                    }                    
                //}
                mjson.rows = rows;
           //     alert(rows.length +":"+JSON.stringify(mjson));
                mbGridChange = true;
                try {
                    $('#dg').datagrid('loadData', mjson);
                }
                catch (ex) {
                    alert("input.ProcAutoPD:" + item.Code + ex.message);
                }

            });

    }
    catch (ex) {
        alert("input.ProcAutoPD:" + ex.message);
    }
}


//导入采集盘点数据
/**只能导入类似采集格式数据
10000033, 1
10000003, 1
10000002, 1
*******************/

function ProcImpPD() {
    try {
      
        if (mlngID < 1) {
            alert("主表内容还未保存，不能导入采集数据，请先保存主表再点击自动盘点");
            return;
        }
        var lDBID = mlngGridType;
        var sPath = "";
        var sUploadPath = escape("Upload");

        strUrl = "../DlgUpload.html?UpFileOnly=1&SaveDB=0&HideGroup=1&ReName=0&ObjID=" + lDBID + "&FileExt=.txt&UploadPath=" + sUploadPath + "&GridType=-1&TableName=RptFile";
        var result = ShowDlg(950, 600, strUrl);

    }
    catch (ex) {
        alert("input.ProcAutoPD:" + ex.message);
    }
}

//添加文件
function OnAddFile(sFile) {
    var sFile = escape(sFile);
    try {
        //      alert("top.js.OnAddFile 开始导入样式文件" + sFile);
        var lGridType = mlngGridType;
        //直接调用 上传样式文件，上传后直接返回
        if (sFile == "") {
            $.messager.alert("提示", "还未选择导入的条码采集数据，请先上传要导入的数据");
            return;
        }
        //  var lGridType = mlngGridType;

        var dataparm = { Action: "ImpBarCodeFile", GridType: lGridType, FileName: sFile };
        dataparm["ID"] = mlngID;
        //采取同步方法
        var url = "../ajax/input.ashx?now =" + new Date().getTime() + "";
        $.post(url, dataparm, function (data) {
            try {
             //   window.location.reload();//重新加载最快吧
                //  alert(data);
                if (data == "-1") {
                //    alert(data);
                    return;
                }
                var mjson = eval("(" + data + ")"); //
                mbGridChange = true;
                try {
                    $('#dg').datagrid('loadData', mjson);
                    alert1("已经成功导入条码数据，请查看刷新后的效果！");
                }
                catch (ex) {
                    alert("input.OnAddFile:" + item.Code + ex.message);
                }

            }
            catch (ex) {
                alert("input.js.OnAddFile.onret:" + ex.message);
            }
        });
    }
    catch (ex) {
        alert("input.js.OnAddFile" + ex.message);
    }
}





//初始化表格信息
function InitTblInfo(mMainTableInfo) {

    try {

        if (mlngAddLike == 1) {
            //动态改变一下
            mlngID = mdtRow["ID"];
        }

        //if (mlngInoutType == 1) {//进销存这个是关键字
        //    mstrCode = mdtRow["Code"];
        //}

        if (mMainTableInfo.length < 1)
            return;


        var item = mMainTableInfo[0];
        mstrTableName = item.tblName;
        mblnAutoCode = item.AutoCode;
        mstrPreCode = item.PreCode;
        if (item.TableMain != "" && item.TableMain != undefined) {
            mstrTableMain = item.TableMain;
        }
        mstrParentPath = item.ParentPath;
        mstrTableSub = item.TableSub;
        mstrRelField = item.RelField;
        mstrTGField = item.TGField;
        mlngGridTypeC = item.GridTypeC;
        mstrTableRel = item.TableRel;
        mlngGridTypeRel = item.GridTypeRel;
        mstrRelSqlCont = item.RelSqlCont;
        mstrPermString = item.PermString;
        mlngAmountLen = item.AmountLen;
        mlngGoodsPriceCalcType = item.GoodsPriceCalcType;
        mlngMoneyLen = item.MoneyLen;

        mlngInoutType = item.InOutType;
        mlngBusinessType = item.BusinessType;
        mstrTableGroup = item.TableGroup;
        mlngGridTypeG = item.GridTypeG;
        mstrOrderCaption = item.Caption;
        mlngRptFileID = item.RptFileID;
        mlngRptID = item.RptID;
        mstrFieldListStricit = "|" + item.FieldListStricit + "|";
    //   mstrFieldListHC = item.FieldListHC; //获取合成字段 暂时屏蔽                
        mstrFieldListCrypt = "|" + item.FieldListCrypt + "|";
        mstrFieldListMonitor = "|" + item.FieldListMonitor + "|";

        if (item.OrderType != undefined) {
            mlngOrderType = item.OrderType;
        }
        //    alert(mstrFieldListStricit);
        if (mlngOrderType > 0) {
            mlngGridType = item.GridType;
            mstrDBType = "OrderID";
        }
        //修改
        document.title = mstrOrderCaption;
        if (mlngIsApp == 1) {
            $('#title').html(mstrOrderCaption + "编辑");
        }
        //     alert("mlngGridTypeC=" + mlngGridTypeC + " item.GridTypeC:" + item.GridTypeC);
    }
    catch (ex) {
        alert("InitTblInfo:" + ex.message);
    }

}

//创建界面

function SetFootItemText(sCode) {
    try {

        var str = mdtRow[sCode];
        var sID = "txt" + sCode;
        str = GetStrShow(str);
        if ($('#' + sID + '').length > 0) {
            $('#' + sID + '').textbox('setValue', str);
            $('#' + sID + '').textbox('textbox').attr('readonly', true);  //设置输入框为禁用
            $('#' + sID + '').textbox('textbox').css('background', '#ccc');

        }
        if ($('#' + sCode + '').length > 0) {
            $('#' + sCode + '').textbox('setValue', str);
            $('#' + sCode + '').textbox('textbox').attr('readonly', true);  //设置输入框为禁用
            $('#' + sCode + '').textbox('textbox').css('background', '#ccc');
        }
       

    } catch (ex) {

        alert("input.js.SetFootItemText:" + sCode + ex.message);
    }
}

function GetItemFormatStr(item) {
    var str = item.Value;
    str = GetStrShow(str);

    // alert("GetItemFormatStr.item.Code:" + item.Code + "item.DataType:" + item.DataType + "str"+str);
    //数字型的
    if (parseInt(item.DataType) == 5 || parseInt(item.DataType) == 1) {
        //去除双精度类型，显示很多0 的问题
        //    alert("GetItemFormatStr.item.Code:" + item.Code + "str:" + str);
        if (isNumber(str)) {
            str = parseFloat(str);
        } else {
            str = 0;
        }
    }

    if (parseInt(item.Style) == eCtrlDTPicker) {
        //      alert("GetItemFormatStr.str1=" + str);
        //    alert("GetItemFormatStr.parseInt(item.Style):" + parseInt(item.Style));
        if (parseInt(item.DataFormat) == 0) {
            //   alert("找到了短整型日期型");
            if (isNaN(str) && !isNaN(Date.parse(str))) {
                //       console.log("data是日期格式！");
                var date = new Date(str).Format('yyyy-MM-dd');
                str = date.toString();
                //       alert("GetItemFormatStr.str1=" + str);
            }


            //    alert(str);
        }

        //$("#"+ item.Code +"").datebox({
        //    required: true,
        //    onSelect: function (date) {
        //        $("#" + item.Code + "").val(date);
        //    }
        //});


    }
    return str;
}

//创建编辑器
function SetTextKindEditor(item) {
    try {
        //    alert("开始获取！");        	   

        var sCode = item.Code;
        var lheight = item.RowCount * 30;
        lheight = lheight + "px";
        var editorT = KindEditor.create('textarea[id="' + sCode + '"]',
            {
                cssPath: '../editor/plugins/code/prettify.css',
                uploadJson: '../editor/asp.net/upload_json.ashx',
                // uploadJson: '../editor/asp.net/uploadpic.ashx',
                fileManagerJson: '../editor/asp.net/file_manager_json.ashx',
                allowFileManager: true,
                items: KindEditorItems,
                height: lheight,
                afterChange: function () {//编辑器发生改变时间 这个非常关键
                    $("" + sCode + "").val(this.sync().html());
                }
            });   //正确
        // var str = GetItemFormatStr(item);
        var str = item.Value;
        editorT.html(str);
        mdicEditor.add(sCode, editorT);
    } catch (ex) {
        alert("SetTextKindEditor:" + ex.message);
    }
}

//考虑Combox类型赋值问题

function SetTextBox(item) {
    try {

        //var eCtrlLable = -1;
        //var eCtrlTextBox = 0;
        //var eCtrlComboBox = 1;
        //var eCtrlDTPicker = 2;
        //var eCtrlCheckBox = 3;
        //var eCtrlCommondButton = 4;
        //var eCtrlPictureBox = 5;
        //var eCtrlUpLoad = 6;
        //var eCtrlRichText = 7;//添加一个富文本框
        //var eCtrlRemark = 8;//添加一个备注行
        //var eCtrlRadioButton = 9;//添加一个复选框效果
       
        switch (item.Style) {
            case eCtrlCheckBox:
                $('#' + item.Code + '').attr("checked", item.Value == 1 ? true : false);
                break;
            case eCtrlRichText://富文本内容
                SetTextKindEditor(item);
                break;
            case eCtrlGrid:
                SetItemGrid(item, item.Value);
                break;
            case eCtrlTagBox:
                {
                   
                    str = item.Value;
                    if (str == null) {//这里必须做这个处理，否则出错了
                        str = "";
                    }
                //    alert("str=" + str);
                    var data = str.split(",");
                    //str = str.replace(/\,/g, "','");
                    //if (str != "") {
                    //    str = "['" + str + "']";
                    //    alert(str);
                    //}                    
                    //var data = eval("(" + str + ")");          
                   
                  
                  
                    $('#tagbox' + item.Code + '').tagbox({
                        //label: 'Add a tag',
                        //value: ['Apple', 'Orange'],
                      //  value: data,
                        onRemoveTag: function (newValue) {
                          //  alert(newValue);

                          //  onMainRemoveTag(newValue);

                        //    var str = mdtRow[item.Code];
                        //    alert("onRemoveTag.dataList.str:" + str);          
                        //    $('#' + item.Code + '').tagbox('setValues', str);

                        },
                        onClickTag: function (newValue) {
                       //     alert("onClickTag.value" + newValue);

                        },
                        buttonIcon: 'icon-search',
                        buttonText: "选择",
                        editable: false,
                        onClickButton: function () {
                            //    LoadPollingStandardWindow();
                            mstrFieldName = item.Code;
                            onMainSerchField(mstrFieldName);
                        },
                   
                        onBeforeRemoveTag: function (value) {
                     
                           
                        },
                    })

                    $('#tagbox' + item.Code + '').tagbox('setValues', str);
                    //   $('#testtagbox').tagbox('setValues', str);
              //      alert("后面再赋值.str=" + str);
                    
               //     $.parser.parse($('#' + item.Code + ''));
                //    $('#' + item.Code + '').parse();
                }
                break;
            case eCtrlRadioButton:
            //    alert("找到2：eCtrlRadioButton");//这里没有用不调用，
           //     $("input[name='" + item.Code + "'][value=" + item.Value +"]").attr("checked", true); 
           //     $("input[name='JYState'][value='在检']").attr("checked", "checked"); 
                break;
            case eCtrlUpLoad:
            //    alert("eCtrlUpLoad.item.Code" + item.Code +" item.Value:" + item.Value);
                $('#' + item.Code + '').textbox('setValue', item.Value);//触发两次onMainCmbSelect 搞不清楚原因
                //AddBtnUpload(item);
                break;   
            default://普通文本型
                {
                    var lReadOnly = 0;
                    var sKey = "|" + item.Code + "|";

                    if (mstrFieldListStricit.indexOf(sKey) >= 0) {//严管字段
                        lReadOnly = 1
                    }
                    if (parseInt(item.IsLocked) == 1 || lReadOnly == 1) {

                        $('#' + item.Code + '').textbox('textbox').attr('readonly', true);  //设置输入框为禁用
                        $('#' + item.Code + '').textbox('textbox').css('background', '#ECECEC');
                        $('#' + item.Code + '').textbox('disable')
                        if (item.Style == eCtrlComboBox) {
                            $("#" + item.Code + "").combobox('disable');
                        }
                    }

                    //保密字段 设置为 密码形式
                    if (mstrFieldListCrypt.indexOf(sKey) >= 0) {//严管字段 用户管理员权限
                        //    $('#' + item.Code + '').textbox('textbox').attr('type', 'password');
                        //    $('#' + item.Code + '').textbox('type', 'password');
                        $('#' + item.Code + '').next().hide();//隐藏吧
                    }
                    var str = GetItemFormatStr(item);
                    //     sVal = 
                    // if (item.Code == "SFKName") {
                    if (item.Code == "BillDate") {
                        //    alert("SFKName=" + str);//调试信息
                        //            alert("eCtrlDTPicker" + item.Code + "Value:" + str);
                    }


                    if (item.Style == eCtrlComboBox) {

                        if (!HasFieldTree(item.Code)) {
                                                     
                            if (item.CmbStyle == 1) {
                                //这行代码一定要放在 设置之后，放在这里不起作用
                             //   AddBtnClear(item);
                            } 
                            $('#' + item.Code + '').combobox({
                                onSelect: function (record) {
                                    onMainCmbSelect(item, record);                                    
                                },
                                onChange: function (newValue, oldValue) {                                   
                                    onMainCmbChange(item, newValue);
                                },
                                
                                onLoadSuccess: function (record) {
                                    onMainCmbLoadSuccess(item);
                                    // procClisk(rowIndex, rowData)
                                }

                            });
                            if (item.CmbStyle == 1) {  
                                //这行代码一定要放在 设置之后，否则不起作用
                                AddBtnClear(item); 
                            }  
                            
                            
                        } else {
                            //树形结构 ，也增加一个事件吧
                            $('#' + item.Code + '').combotree({
                                onSelect: function (node) {
                                    //   alert(JSON.stringify(record));
                                    onMainCmbTreeSelect(item, node);
                                    // procClisk(rowIndex, rowData)
                                },
                                onClick: function (node) {
                                    //    alert(node.text);  // alert node text property when clicked
                                }
                            });
                        }
                    }

                    if (item.Style == eCtrlTextBox) {
                        $('#' + item.Code + '').textbox({
                            onChange: function (newValue, oldValue) {
                                onMainTextChange(item, newValue, oldValue);
                            },

                        });
                    }
                    if (item.Style == eCtrlDTPicker) {
                        //    alert("eCtrlDTPicker" + item.Code);
                        if (item.NotNull == 1) {
                            if (item.Value == "" || item.Value == undefined) {
                                //    item.Value = getNowFormatDate();
                                str = getNowFormatDate();
                            }
                        }                       
                        $('#' + item.Code + '').datebox({
                            onSelect: function (date) {
                                onMainDateChange(item,date);
                            //    alert(date.getFullYear() + ":" + (date.getMonth() + 1) + ":" + date.getDate());
                            }
                        });
                    }
                    //树形结构
                    if (item.Style == eCtrlComboBoxTree) {
                        //树形结构 ，也增加一个事件吧
                        $('#' + item.Code + '').combotree({
                            onSelect: function (node) {
                                //   alert(JSON.stringify(record));
                                onMainCmbTreeSelect(item, node);
                                // procClisk(rowIndex, rowData)
                            },
                            onClick: function (node) {
                                //    alert(node.text);  // alert node text property when clicked
                            }
                        });
                    }
                    var blnSetValue = true;
                    if (mlngID < 1) {
                        if (item.Style == eCtrlComboBox && str == "") {
                            blnSetValue = false;
                        }
                    }
                    if (blnSetValue ) {
                        $('#' + item.Code + '').textbox('setValue', str);//触发两次onMainCmbSelect 搞不清楚原因

                    }
                  


                    //if (item.Code == "Code")
                    //{
                    //    alert("Code=" + str);
                    //}

                    //$('#' + item.Code + '').textbox('textbox').keydown(onMainInputKeydown);


                    $("input", $("#"+ item.Code +"").next("span")).blur(function () {
                     //   alert("ok");
                    
                    });
                    //这种方法无法及时监控
                    //$("input", $("#" + item.Code + "").next("span")).change(function () {
                    //    //   alert("ok");
                    //      onMainPropertyChange(item);
                    //});
                    switch (item.Code) {
                        case "TotalPrice"://特殊字段加入监控及时修改，不随便监听吧
                        case "SSMoney"://特殊字段加入监控及时修改，不随便监听吧
                        case "BCSFMoney":
                            $("input", $("#" + item.Code + "").next("span")).bind('input propertychange', function () {
                                //     $('#result').html($(this).val().length + ' characters');
                                //     alert("ok" + $(this).val());
                                onMainPropertyChange(item, $(this).val());
                            });
                            break;
                    }
                   

                    $("input", $("#" + item.Code + "").next("span")).keydown(function (e) {
                        //  alert("ok");
                        onMainInputKeydown(e, item);
                    });
                    //两种写法 这种写法也予以保留吧
                    //$('#' + item.Code + '').textbox('textbox').keydown.keydown(function (e) {
                    //    //  alert("ok");
                    //    onMainInputKeydown(e, item);
                    //});
                }

                break;
        }
        
     //   alert(mlngOrderType + item.Code);
        if (parseInt(mlngOrderType) > 0) {
            
            InitParentInfo(item);
        }

    } catch (ex) {
        alert("input.js.SetTextBox:" + item.Code + ex.message);
    }
}

function onMainRemoveTag(value) {
    alert("onMainRemoveTag.value:" + value);
}
//Init 特殊字段
function InitParentInfo(item) {
    
    switch (item.Code) {
        case "Customer":
                  
        case "Vender":
            
            LoadParentInfo(item.Value,item.Code);
            break;
    }

}

function onMainDateChange(item,date) {
    try {
        var sField = item.Code;
        var dtStart = null;
        var dtEnd = null;
        switch (sField) {
            case "BeginDate":
                $('#BeginDate').textbox('setValue', date);
                dtStart = date;
                if ($('#EndDate').length > 0) {
                    var sEndDate = $('#EndDate').datebox('getValue');
                    dtEnd = ConvertStrToDate(sEndDate);
                }
               break;
            case "EndDate":
                $('#EndDate').textbox('setValue', date);
                if ($('#BeginDate').length > 0) {
                    var sStartDate = $('#BeginDate').datebox('getValue');
                    dtStart = ConvertStrToDate(sStartDate);
                }
                dtEnd = date;

                break;
        }
    //    alert("$('#GCDays').length"+$('#GCDays').length)
        if ($('#GCDays').length<= 0) {
            return
        }
        //后续计算
        switch (sField) {
            case "BeginDate":
            
            case "EndDate":
               

                var lGCDays = $('#GCDays').textbox('getValue');
             //   alert("input.onMainDateChange.sStartDate=" + lGCDays + "date:" + date);
                //   $('#dd').datebox('getValue');
                var sStartDate = $('#BeginDate').datebox('getValue');
                var sEndDate = $('#EndDate').datebox('getValue');
           //     alert("input.onMainDateChange.sStartDate=" + sStartDate + "sEndDate" + sEndDate);
               
                if (IsValidDate(sStartDate) && IsValidDate(sEndDate)) {
                    //var dtStart = ConvertStrToDate(sStartDate);
                    //var dtEnd = ConvertStrToDate(sEndDate);

                 //   alert("input.onMainDateChange.sStartDate=" + dtStart + "dtEnd:" + dtEnd);
                    //lGCDays = dtStart.DateDiff("d", dtEnd);
                    lGCDays = GetDiffDays(dtStart, dtEnd);
                    //var num = (dtEnd - dtStart) / (1000 * 3600 * 24);//求出两个时间的时间差，这个是天数
                    //lGCDays = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）

                    $('#GCDays').textbox('setValue', lGCDays);
                   
                    //lBGYears = parseInt(lBGYears);//这个很关键
                //    dtStart = StringToDate(sStartDate);
                    //sEndDate = dtStart.DateAdd("y", lBGYears).Format("yyyy-MM-dd");                   
                    //$('#EndDate').textbox('setValue', sEndDate);
                }
                break;
            default:
                break;
        }
    } catch (ex) {
        alert("input.onMainDateChange:" + ex.message);
    }

}

//编辑
function onMainTextChange(item, newValue, OldValue) {
    var lInited = mdicMainCmbInited.getItem(item.Code);
    //第一次是null 第二次 1 都不是手动点击，手动点击 是2
    //   alert("lInited=" + lInited + "onMainCmbSelect:" + item.Code + "record:" + JSON.stringify(record));
    //if (lInited == null) {
    //    return;
    //}
    if (lInited == null) {
        mdicMainCmbInited.remove(item.Code)
        mdicMainCmbInited.add(item.Code, "1");//成功加载一次
        return;
    }
    if (lInited != "1") {

        return;
    }

    onMainRecalChange(item.Code, newValue);

    //   alert("onMainTextChange.Field=" + item.Code + "  newValue:" + newValue + "OldValue:" + OldValue);
    //   mdicMainCmbInited.set(item.Code, "1");//成功加载
}
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);

}

//根据设置参数进行修改
function UpdateGZCalcFunc(sFunc) {
    try {
        $('#Func').textbox('setValue', sFunc);
        UpdateFuncEx(sFunc);
    } catch (ex) {
        alert("input.UpdateGZCalcFunc:" + ex.message);
    }

}
//解析公式
function UpdateFuncEx(sFunc) {
   
  
    try {

        if (mGridColObj == null) {
        //    var data = mMainJson.prop;
         //   var json = eval("(" + data + ")");
            mGridColObj = mMainJson.dtgrid;
        }

        var sFuncEx = sFunc;
      //  alert("UpdateFuncEx.sFuncEx" + sFuncEx);
        var sFuncChinese = sFunc;
     //   sFuncEx = sFuncEx.replaceAll("\+", ";");

        sFuncEx = ReplaceFunc(sFuncEx);

        if (sFuncEx.indexOf(";") < 0) {
            sFuncEx = sFuncEx + ";";
        }
    //    alert("UpdateFuncEx" + sFuncEx );
        var sArr = sFuncEx.split(';');
     //   alert("sArr.length:" + sArr.length);
     //   alert("mGridColObj.length:" + JSON.stringify(mGridColObj));
      //  alert("UpdateFuncEx.sFuncChinese" + sFuncChinese);
        for (var m = 0; m < sArr.length; m++) {
            var sField = sArr[m];
            
            sField = sField.trim();
        //    alert(sField);
            for (var i = 0; i < mGridColObj.length; i++) {
                var item = mGridColObj[i];
                
                if (item.Key == sField) {
                //    alert(sField);
            //        alert("sField:"+sField+ "item.Caption:" + item.Caption);
                    var sCaption = item.Caption;
                    sCaption = sCaption.replace(/\r/g, "");
                    sCaption = sCaption.replace(/\n/g, "");
                    
                    sFuncChinese = sFuncChinese.replace(sField, sCaption);
                    break;
                }
            }
        }

        //处理加减乘除 等设置
        $('#FuncEx').textbox('setValue', sFuncChinese);
    } catch (ex) {
        alert("input.UpdateFuncEx:"  + ex.message);
    }
}
//这里设置触发的计算公式 这个函数可以改为动态加载
function onMainRecalChange(sField, newValue) {
  //     alert("onMainRecalChange:" + sField + "newValue:" + newValue);
    try {
        switch (sField) {
            case "Func":
                UpdateFuncEx(newValue);
                break;

            case "Amount":
            case "Price":
                var dAmount = $('#Amount').textbox('getValue');
                var dPrice = $('#Price').textbox('getValue');
            //    alert("input.onMainCalc.item.Code=" + sField + "dPrice" + dPrice);
                var dSum = dAmount * dPrice;
                $('#SumP').textbox('setValue', dSum);
                if ($('#OriginValue').length > 0) {
                    $('#OriginValue').textbox("setValue", dSum)
                }
                break;
            case "BGYears":

                var lBGYears = $('#BGYears').textbox('getValue');
                var sStartDate = $('#StartDate').textbox('getValue');
                var sEndDate = $('#EndDate').textbox('getValue');
                //    alert("input.onMainCalc.item.Code=" + newValue + "sStartDate" + sStartDate);
                var dtStart = null;
                if (IsValidDate(sStartDate)) {
                    lBGYears = parseInt(lBGYears);//这个很关键
                    dtStart = StringToDate(sStartDate);
                    sEndDate = dtStart.DateAdd("y", lBGYears).Format("yyyy-MM-dd");
                    //   sEndDate = sEndDate.Format("yyyy-MM-dd");
                    $('#EndDate').textbox('setValue', sEndDate);
                }
                break;
            case "GCDays":

                var lGCDays = $('#GCDays').textbox('getValue');
                var sStartDate = $('#BeginDate').textbox('getValue');
                var sEndDate = $('#EndDate').textbox('getValue');
           //     alert("input.onMainCalc.item.Code=" + newValue + "sStartDate" + sStartDate);
                var dtStart = null;
                if (IsValidDate(sStartDate)) {
                    lGCDays = parseInt(lGCDays);//这个很关键
                    dtStart = StringToDate(sStartDate);
                    sEndDate = dtStart.DateAdd("d", lGCDays).Format("yyyy-MM-dd");
                    //   sEndDate = sEndDate.Format("yyyy-MM-dd");
                    $('#EndDate').textbox('setValue', sEndDate);
                }
                break;
            case "JSGrade"://技术评价

                var dRate = $('#JSRate').combobox('getValue');
                //      alert("onMainRecalChange:" + sField + "newValue:" + newValue + "dRate:" + dRate);
                //  dRate = parseFloat(dRate);
                var dJSGrade = newValue;
                $('#JSVal').textbox('setValue', dRate * dJSGrade);

                break;
            case "SCGrade"://技术评价
                var dRate = $('#SCRate').combobox('getValue');
                //     dRate = parseFloat(dRate);
                //      alert("onMainRecalChange:" + sField + "newValue:" + newValue + "dRate:" + dRate);
                var dSCGrade = newValue;
                $('#SCVal').textbox('setValue', dRate * dSCGrade);

                break;
            case "SCVal"://技术分值
            case "JSVal"://市场分值

                //  3、专利等级=IF((技术分值+市场分值)>=2,IF((技术分值+市场分值)>=3,2,1),0)
                // JSON.stringify
                var dPatentGrade = 0;
                var dJSVal = $('#JSVal').textbox('getValue');
                var dSCVal = $('#SCVal').textbox('getValue');
                var dSum = parseFloat(dJSVal) + parseFloat(dSCVal);
                //    alert("onMainRecalChange:" + sField + "newValue:" + newValue + "dSum:" + dSum);
                if (dSum > 3) {
                    dPatentGrade = 3;
                } else if (dSum > 2 && dSum < 3) {
                    dPatentGrade = 2;
                } else {
                    dPatentGrade = 1;
                }
                $('#PatentGrade').textbox('setValue', dPatentGrade);
                break

            


        }
    } catch (ex) {
        alert("input.onMainRecalChange:" + sField + ex.message);
    }


}

//主表加载完毕事件
function onMainCmbLoadSuccess(item) {
    //   alert("onMainLoadSuccess"+item.Code);
    try {
        mdicMainCmbInited.remove(item.Code)
        mdicMainCmbInited.add(item.Code, "1");//成功加载一次
    //    mdicMainCmbInited.set(item.Code, "1");//成功加载
    }
    catch (ex) {
        alert("input.onMainCmbTreeSelect:" + item.Code + ex.message);
    }
}

function onMainCmbTreeSelect(item, node) {


    try {




        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        switch (item.Code) {
            case "EquipType":
                //
                var str = GetComboTreeParentText(item);
           //     alert("EquipType.str=" + str);
                if ($('#EquipTypePath').length > 0) {
                    $('#EquipTypePath').textbox("setValue", str)
                }
                var strEquipType = GetComboTreeText(item);
                //如果是增加状态
                if (mlngID < 1) {
                    //if (mblnAutoCode == true) {
                    //    alert("onMainCmbTreeSelect.mblnAutoCode：true:" + mblnAutoCode);
                    //} else {
                    //    alert("onMainCmbTreeSelect.mblnAutoCode：false:" + mblnAutoCode);
                    //}
                    if (mstrPreCode == "[zctypecode]" && mblnAutoCode == true) {
                       
                        //重新获取
                        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
                        var dataparm = { Action: 'getzccodebytype', DBID: mlngDBID, TableName: mstrTableName, EquipType: strEquipType};
                     //   alert("onMainCmbTreeSelect："+JSON.stringify(dataparm));
                        $.post(url,
                            dataparm,
                            function (data, status) {                              
                                $('#Code').textbox("setValue", data);
                            });
                    }
                }
              
                break;
            case "GroupID"://技术评价
                var t = $('#' + item.Code + '').combotree('tree');	// get the tree object
                //var n = t.tree('getSelected');		// get selected node
                //var str = "";
                //if (n != null) {
                //    str = n.text;
                //}  
                var strGroupFirst = "";
                var strGroupSecond = "";
                //   alert(node.text);
                var level = t.tree("getLevel", node.target);
                level = parseInt(level);
                switch (level) {
                    case 1:
                        strGroupSecond = "";
                        strGroupFirst = node.text;
                        break;

                    case 2:
                        strGroupSecond = "";
                        strGroupFirst = node.text;
                        break;
                    case 3:
                        strGroupSecond = node.text;
                        var nodeParent = t.tree('getParent', node.target);	// get checked nodes  
                        strGroupFirst = nodeParent.text;
                        break;
                    default:
                }
                if ($('#GroupSecond').length > 0) {//判断某个ID是否存在的依据
                    $('#GroupSecond').textbox("setValue", strGroupSecond)
                }
                $('#GroupFirst').textbox("setValue", strGroupFirst)




                break;
        }

    }
    catch (ex) {
        alert("input.onMainCmbTreeSelect:" + item.Code + ex.message);
    }
}

//这种写法代表 Combox 是真正的选择，更加好
function onMainCmbChange(item, newValue) {


    try {
     //   alert("item=" + JSON.stringify(item));

        var lInited = mdicMainCmbInited.getItem(item.Code);
        //第一次是null 第二次 1 都不是手动点击，手动点击 是2
        if (item.Code == "AgioType") {
            //     alert("item.Value:" + item.Value+ "lInited=" + lInited + "onMainCmbSelect:" + item.Code + "record:" + JSON.stringify(record));
        }
        //   
        if (lInited == null) {
            return;
        }
        
        if (lInited != "1") {//没有加载完毕，不要执行这些操作

            return;
        }

        //       alert("lInited=" + lInited + "onMainCmbSelect:" + item.Code + "开始真正执行.record.Name=" +  JSON.stringify(record));

        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        switch (item.Code) {  
            case "CorpProvince"://省份 自动刷新城市
           //     alert("input.onMainCmbChange.CorpProvince:" + newValue);
                LoadCmbListChild("CorpCity", newValue, "CorpCity");
                break;
            case "EquipType1"://省份 自动刷新城市
                //     alert("input.onMainCmbChange.CorpProvince:" + newValue);
                LoadCmbListChild("EquipType2", newValue, "EquipType2");
                break;
            case "Cess":
                UpdateMainCess(newValue);
                break;
            case "AgioType":
                UpdateAgioType(newValue);
                break;
        }

    }
    catch (ex) {
        alert("input.onMainCmbChange:"  + ex.message);
    }
}


//主表选择
function onMainCmbSelect(item, record) {


    try {

        var lInited = mdicMainCmbInited.getItem(item.Code);
        //第一次是null 第二次 1 都不是手动点击，手动点击 是2
        if (item.Code == "CorpProvince") {
            //     alert("item.Value:" + item.Value+ "lInited=" + lInited + "onMainCmbSelect:" + item.Code + "record:" + JSON.stringify(record));
        }
        //   
        if (lInited == null) {
            return;
        }

        //if (lInited == null) {
        //    mdicMainCmbInited.remove(item.Code)
        //    mdicMainCmbInited.add(item.Code, "1");//成功加载一次
        //    return;
        //}
        //if (lInited != "1") {
        //    return;
        //}
        //这种写法要考虑增加的时候

        //if (lInited == "1"||item.Value=="" ) {
        //    mdicMainCmbInited.remove(item.Code)
        //    mdicMainCmbInited.add(item.Code, "2");//成功加载一次
        ////    return;
        //}
        //if (lInited != "2") {

        //    return;
        //}
        //if (item.Value == "") {//不为空的时候不会加载一次

        //}
        //if (item.Value == "") {
        //    mdicMainCmbInited.remove(item.Code)
        //    mdicMainCmbInited.add(item.Code, "1");//成功加载一次
        //    return;
        //}
        if (lInited != "1") {//没有加载完毕，不要执行这些操作

            return;
        }
   //     alert("item.Code" + item.Code + "record:" + JSON.stringify(record));
        //       alert("lInited=" + lInited + "onMainCmbSelect:" + item.Code + "开始真正执行.record.Name=" +  JSON.stringify(record));

        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        switch (item.Code) {
            case "JSRate"://技术评价
                //  alert("lInited=" + lInited + "onMainCmbSelect:" + item.Code + "record:" + JSON.stringify(record));
                var dJSGrade = $('#JSGrade').textbox('getValue');

                $('#JSVal').textbox('setValue', record.ID * dJSGrade);//触发两次onMainCmbSelect 搞不清楚原因

                break;
            case "SCRate"://技术评价
                var dSCGrade = $('#SCGrade').textbox('getValue');
                $('#SCVal').textbox('setValue', record.ID * dSCGrade);//触发两次onMainCmbSelect 搞不清楚原因

                break;
            case "EmpMan"://技术评价
              //  var dSCGrade = $('#SCGrade').textbox('getValue');
                //这里修改要非常慎重，只针对人事的修改，其他的不要修改
             //   alert("EmpMan.mstrTableMain " + mstrTableMain + "mlngObjID:" + mlngObjID);
                if (mstrTableMain != "" && mstrTableMain != undefined) {
                    mstrTableMain = mstrTableMain.trim();
                    if (mstrTableMain.toUpperCase() == "RS_EMPLOYEE") {
                        mdtRow["ObjID"] = record.ID;
                        mlngObjID = record.ID;
                        $('#ObjID').textbox('setValue', record.ID);

                    }
                }
               
               

                break;
            case "GZCalcCodeName"://计算参数下拉
                //  var dSCGrade = $('#SCGrade').textbox('getValue');
                mdtRow["Code"] = record.ID;
                var str = record.Name;
                var lpos = str.indexOf("|");
                var strName = "";
                if (lpos > 0) {
                    strName = str.substr(lpos+1);
                }
                $('#Code').textbox('setValue', record.ID);

                $('#Name').textbox('setValue', strName);

                break;
            case "Customer"://根据客户其实也可以选择价格的
                switch (mstrTableName) {
                    case "JXC_IOCK":
                    case "JXC_SFB":
                        mlngObjID = record.ID;//更改一下主ID//设备管理 合同管理就不要更改这个ObjID了
                        //    alert("onMainCmbSelect.mlngObjID:" + mlngObjID);
                        break;
                }
                
                break;
            case "Vender":
                switch (mstrTableName) {
                    case "JXC_IOCK":
                    case "JXC_SFB":
                        mlngObjID = record.ID;//更改一下主ID//设备管理 合同管理就不要更改这个ObjID了
                    //    alert("onMainCmbSelect.mlngObjID:" + mlngObjID);
                        break;
                }
                UpadtePriceByVender(record.Name);

                break;

            case "SFKName":
                var strSFKName = record.Name;
                var dataparm = { SFKName: strSFKName, ObjID: mlngObjID };
                dataparm["Action"] = "GetSFKInfo";
                //    alert(JSON.stringify(dataparm));
                $.post(url,
                    dataparm,
                    function (data, status) {

                        //               alert("onMainCmbSelect:" + data);
                        if (data == "-1") {
                            return;
                        }
                        var mjson = eval("(" + data + ")"); //
                        //       alert("mbGridChange = true");
                        mbGridChange = true;
                        try {
                            $.each(mjson.tbl, function (idx, item) {

                                // InsertRowItem(item, 1);
                                $('#YSMoney').textbox('setValue', item.YSMoney);
                                $('#WSFMoney').textbox('setValue', item.WSFMoney);
                                $('#YiShouMoney').textbox('setValue', item.YiShouMoney);
                                $('#YSDate').textbox('setValue', item.YSDate);

                            });
                        }
                        catch (ex) {
                            alert("input.onMainCmbSelect:" + item.Code + ex.message);
                        }

                    });

                break;
            //case "CorpProvince"://省份 自动刷新城市
            //    LoadCmbListChild("CorpCity", record.Name, "CorpCity");
            //    break;
            //case "AgioType":
            //    UpdateAgioType(record);
            //    break;
        }

    }
    catch (ex) {
        alert("input.onMainCmbSelect:" + item.Code + ex.message);
    }
}

function UpdateMainCess(newValue) {

    try {

        var dAgio = newValue;// record.ID;
    //    alert("UpdateMainCess.newValue:" + newValue);
        var rows = $('#dg').datagrid('getRows');
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            row.Cess = newValue;
            UpdateGridMtl(row, "CJPrice");
            $('#dg').datagrid('updateRow', {
                index: i,
                row: row
            });
            $('#dg').datagrid('refreshRow', i);//刷新改行内容 加上这句话就可以强制刷新了，非常好用

        }

        //更改总价
        if ($('#TotalPrice').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "SumP");
            $('#TotalPrice').textbox('setValue', total);
        } else {
            //
            //  alert("不存在主表该字段内容");
        }

    }
    catch (ex) {
        alert("input.UpdateMainCess:" + ex.message);
    }
}

//根据选中的供应商商来决定中标价格
function UpdateVenderSel(newValue) {

    try {

        var lSel = parseInt(newValue);// record.ID;
   //     alert("UpdateVenderSel.newValue:" + newValue);
        var rows = $('#dg').datagrid('getRows');
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch (lSel) {
                case 1:
                    row.Price = row.Price1;
                    row.SumP = row.SumP1;
                    break;
                case 2:
                    row.Price = row.Price2;
                    row.SumP = row.SumP2;
                    break;
                case 3:
                    row.Price = row.Price2;
                    row.SumP = row.SumP2;
                    break;
            }
            

            $('#dg').datagrid('updateRow', {
                index: i,
                row: row
            });
            $('#dg').datagrid('refreshRow', i);//刷新改行内容 加上这句话就可以强制刷新了，非常好用

        }

        //更改总价
        if ($('#TotalPrice').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "SumP");
            $('#TotalPrice').textbox('setValue', total);
        } else {
            //
            //  alert("不存在主表该字段内容");
        }
        GridUpdateFooterRow("dg");
    }
    catch (ex) {
        alert("input.UpdateVenderSel:" + ex.message);
    }
}

//更改价格体系
function UpdateAgioType(newValue) {

    try {

        var dAgio = newValue;// record.ID;
     //   alert("UpdateAgioType.newValue:" + newValue);
        var rows = $('#dg').datagrid('getRows');
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            UpdateMtlPrice(row, dAgio, 0);
            $('#dg').datagrid('updateRow', {
                index: i,
                row: row
            });
            $('#dg').datagrid('refreshRow', i);//刷新改行内容 加上这句话就可以强制刷新了，非常好用

        }

        //更改总价
        if ($('#TotalPrice').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
            var total = GridTotalCol("dg", "SumP");
            $('#TotalPrice').textbox('setValue', total);
        } else {
            //
            //  alert("不存在主表该字段内容");
        }

    }
    catch (ex) {
        alert("input.UpdateAgioType:"  + ex.message);
    }
}

//考虑价格策略 可以按照整单折扣，也可以按照 多级价格策略执行
function UpdateMtlPrice(row, dAgio, lngPriceLB) {

    //按照整单折扣
    if (dAgio == 0) {
        dAgio = 1;
    }
    row.CJPrice = row.OriginPrice * dAgio;// 原始单价还是要记录的
    switch (lngPriceLB) {
        case 1:
            row.CJPrice = row.Price1;// 1级价格策略
            break;
        case 2:
            row.CJPrice = row.Price2;// 2级价格策略
            break;
        case 3:
            row.CJPrice = row.Price3;// 原始单价还是要记录的
            break;
        case 4:
            row.CJPrice = row.Price4;// 原始单价还是要记录的
            break;
        case 4:
            row.CJPrice = row.Price5;// 5级价格策略
            break;
    }
    

    row.Price = parseFloat(row.CJPrice) * parseFloat(1 + row.Cess / 100);
    //     UpdateGridMtl(row, "CJPrice");
    row.SumP = parseFloat(row.Amount) * parseFloat(row.Price);
    row.SumHK = parseFloat(row.Amount) * parseFloat(row.CJPrice);
    row.SumCost = parseFloat(row.Amount) * parseFloat(row.CostPrice);
    row.SumCess = parseFloat(row.Amount) * parseFloat(row.CJPrice) * row.Cess / 100;

}
//根据单独的 cmb 加载
function LoadCmbListChild(cmbName, strValue, sField) {
    try {
        //    alert("LoadCmbListChild.strValue:" + strValue);
        var url = "";
        url = "../ajax/GetList.ashx?Field=" + sField + "&StrParent=" + strValue + "";
        //     alert("LoadRptFile" + url);
        var bFind = 0;
        for (i = 0; i < mMainJsonInput.length - 1; i++) {
            var item = mMainJsonInput[i];

            if (item.Code == sField) {
                bFind = 1;
                break;
            }
        }
        if (bFind != 1) {
            return;
        }
        $('#' + cmbName + '').combobox({
            url: url,
            valueField: 'Name',
            textField: 'Name'
            //onSelect: onCmbFileSelect,
            //onUnselect: onCmbFileUnSelect
        });

        SetTextBox(item);//第一次就保存一下吧
        item.Value = "";
        $("input.text").css("width", "100%");
        $("input").css("width", "100%");
        $("span.textbox").css("width", "100%");

    } catch (ex) {
        alert("LoadCmbListByField:" + ex.message);
    }
}

function onMainInputKeydown(e, item) {
    
    if (e.keyCode == 13) {
        var v = $('#' + item.Code + '').textbox('getValue');
        //var sname = e.data.target.id;//这里对应的 是ID
        //           alert('按下回车键了哈哈' + v);//+ ShowObjProperty(e.target));
      //  alert( e.data.target.id);
     //   alert(item.Code);
        onMainCalc(item);
        var sNextCode = GetMainNextInput(item.Code);
        //    alert(sNextCode);
        $('#' + sNextCode + '').textbox('textbox').focus();
        e.keyCode = 9;

    }
    //else {
    //    onMainPropertyChange(item);
    //}
}

//及时响应 更新的
function onMainPropertyChange(item,newValue) {
    var dAmount = 0;
    var dPrice = 0;
    var dSum = 0;

 //   alert("input.onMainCalc.item.Code=" + item.Code + "mlngOrderType:" + mlngOrderType);
    try {
        var dYSMoney = 0;
        switch (item.Code) {
           
            case "BCSFMoney"://本次实收Money

                switch (parseInt(mlngOrderType)) {
                    case 31:
                    case 41:
                    case 65: 
                    case 66:

                        if ($('#TotalPrice').length > 0) {
                            dYSMoney = $('#TotalPrice').textbox('getValue');
                        }

                        var dBCSFMoney = $('#BCSFMoney').textbox('getValue');
                        dBCSFMoney = newValue;
                        var dQKMoney = dYSMoney - dBCSFMoney;
                        //if (mlngID > 0) {
                        //    dQKMoney = dQKMoney - dYSMoney;
                        //}
                      
                        var strMsg = "";
                     //   alert("mdtRowParent=" + JSON.stringify(mdtRowParent));
                        if (mdtRowParent != null) {
                            mdtRowParent.QMMoneyOther = mdtRowParent.QMMoney - parseFloat(mdtRow['QKMoney'])
                            if ($('#Customer').length > 0 || $('#Vender').length > 0) {//客户的
                                //   alert("onMainPropertyChange.dBCSFMoney" + dBCSFMoney); 
                                var strMsg = "含本单总欠款：" + (mdtRowParent.QMMoneyOther + dQKMoney);
                                strMsg += "= 除去本单欠款：" + mdtRowParent.QMMoneyOther;
                                strMsg += "+ 本单产生欠款：" + dQKMoney;
                                $('#divMainMsg').html(strMsg);
                            }
                        }
                        break;

                    case 82:
                    case 72:
                        var strSFKText = "收款";
                        if (parseInt(mlngOrderType) == 72) {
                            strSFKText = "付款";
                        }
                        if ($('#TotalPrice').length > 0) {
                            dYSMoney = $('#TotalPrice').textbox('getValue');
                        }
                        var dBCSFMoney = $('#BCSFMoney').textbox('getValue');
                        dBCSFMoney =  newValue;
                        var d3 = dYSMoney - dBCSFMoney;
                       // mdtRow['BCSFMoney'] = dBCSFMoney;
                        if (mdtRowParent != null) {
                       //     alert("mdtRow.BCSFMoney=" + mdtRow['BCSFMoney']);
                            if (mdtRow['BCSFMoney'] == null) {
                                mdtRow['BCSFMoney'] = 0;
                            }
                            //  alert("mdtRowParent.QMMoneyOther=" + mdtRowParent.QMMoneyOther + "mdtRowParent.QMMoney:" + mdtRowParent.QMMoney);
                            mdtRowParent.QMMoneyOther = mdtRowParent.QMMoney - parseFloat(mdtRow['BCSFMoney'] + "");

                            if ($('#Customer').length > 0 || $('#Vender').length > 0) {//客户的
                           //     alert("onMainPropertyChange.dBCSFMoney" + dBCSFMoney + "mdtRowParent.QMMoneyOther:" + mdtRowParent.QMMoneyOther); 
                                var strMsg = "含本单总欠款：" + (mdtRowParent.QMMoneyOther - dBCSFMoney);
                                strMsg += "=除去本单欠款：" + mdtRowParent.QMMoneyOther;
                                strMsg += "-本单" + strSFKText+"：" + dBCSFMoney;
                              //    alert("strMsg" + strMsg);
                                $('#divMainMsg').html(strMsg);
                            }
                        }

                        if (('#QKMoney').length > 0) {
                            $('#QKMoney').textbox('setValue', d3);
                        }
                        break;
                    default:
                        $('#divMainMsg').hide();
                        break;
                }
                

                break;
        }
    } catch (ex) {
        alert("input.onMainPropertyChange." + ex.message);
    }
}

//计算主要的
function onMainCalc(item) {
    var dAmount = 0;
    var dPrice = 0;
    var dSum = 0;

    //   alert("input.onMainCalc.item.Code=" + item.Code);
    try {
        switch (item.Code) {
            case "Amount":
            case "Price":
                dAmount = $('#Amount').textbox('getValue');
                dPrice = $('#Price').textbox('getValue');
                //   alert("input.onMainCalc.item.Code=" + item.Code + "dPrice" + dPrice);
                dSum = dAmount * dPrice;
                $('#SumP').textbox('setValue', dSum);
                break;
            case "SSMoney"://本次实收Money
                var dYSMoney = $('#YSMoney').textbox('getValue');
                var dYiShouMoney = $('#YiShouMoney').textbox('getValue');
                var dSSMoney = $('#SSMoney').textbox('getValue');
                var d3 = dYSMoney - dYiShouMoney - dSSMoney;

                $('#WSFMoney').textbox('setValue', d3);
                break;
            
        }
    } catch (ex) {
        alert("input.onMainCalc." + ex.message);
    }
}

function GetMainInputItem(sCode) {
    var bFind = 0;
    var sNextField = "";
    var item = null;
    var itemFind = null;
    try {
     //   alert("GetMainInputItem.sCode:"+sCode);
        //    mMainJsonInput = json.rows;//主录入界面
        for (i = 0; i < mMainJsonInput.length; i++) {
            var item = mMainJsonInput[i];
            if (item.Code == sCode) {
                itemFind = item;
                return itemFind;
                bFind = 1;
                break;
            }
        }
       
    }
    catch (ex) {
        alert(ex.message);
    }
    return item;
}

//获得下一个主表
function GetMainNextInput(sCode) {
    var bFind = 0;
    var sNextField = "";
    try {

        //    mMainJsonInput = json.rows;//主录入界面
        for (i = 0; i < mMainJsonInput.length - 1; i++) {
            var item = mMainJsonInput[i];

            if (item.Code == sCode) {
                bFind = 1;
                break;
            }

        }
        if (bFind == 1) {
            sNextField = mMainJsonInput[i + 1].Code;
        }
    }
    catch (ex) {
        alert(ex.message);
    }
    return sNextField;
}

function IsValidInput() {
    var bValid = true;
    var item = null;
    var i = 0;
    var strCode = "";
    try {

        var strMsg = "";
        switch (parseInt(mlngGridType)) {
            case 57:
                if ($('#InCK').length < 1) {
                    alert1("设计样式错误，必须设置调入仓库和调出仓库");
                    return false;
                }
                var strInCK = $('#InCK').textbox('getValue');
                var strOutCK = $('#OutCK').textbox('getValue');
                if (strInCK == strOutCK) {
                    alert1("调入仓库和调出仓库不能是同一个仓库！")
                    return false;
                }
                break;
            case 6151:
                if ($('#Amount').length < 1) {
                    alert1("设计样式错误，必须设置申购数量[Amount]字段");
                    return false;
                }
                if ($('#AmountCG').length < 1) {
                    alert1("设计样式错误，必须设置采购数量[AmountCG]字段");
                    return false;
                }
                var lAmount = $('#Amount').textbox('getValue');
                lAmount = parseFloat(lAmount);

                var lAmountCG = $('#AmountCG').textbox('getValue');
                lAmountCG = parseFloat(lAmountCG);
                if (lAmountCG > lAmount) {
                    alert1("累计采购数量[" + lAmountCG + "]不能超过申购数量[" + lAmount+"]")
                    return false;
                }
                break;
            case 6152:
                if ($('#Amount').length < 1) {
                    alert1("设计样式错误，必须设置申购数量[Amount]字段");
                    return false;
                }
                if ($('#AmountCG').length < 1) {
                    alert1("设计样式错误，必须设置采购数量[AmountCG]字段");
                    return false;
                }
                if ($('#AmountDH').length < 1) {
                    alert1("设计样式错误，必须设置到货数量[AmountDH]字段");
                    return false;
                }
                var lAmount = $('#Amount').textbox('getValue');
                var lAmountCG = $('#AmountCG').textbox('getValue');
                var lAmountDH = $('#AmountDH').textbox('getValue');
                lAmount = parseFloat(lAmount);
                lAmountDH = parseFloat(lAmountDH);
                if (lAmountDH > lAmount) {
                    alert1("到货数量[" + lAmountCG + "]不能超过申购数量[" + lAmount + "]")
                    return false;
                }
                break;
            case 6153:
                var lAmount = $('#Amount').textbox('getValue');
                //var lAmountCG = $('#AmountCG').textbox('getValue');
                //var lAmountDH = $('#AmountDH').textbox('getValue');
                var lAmountTZ = $('#AmountTZ').textbox('getValue');
                lAmount = parseFloat(lAmount);
                lAmountTZ = parseFloat(lAmountTZ);
                if ($('#Amount').length < 1) {
                    alert1("设计样式错误，必须设置申购数量[Amount]字段");
                    return false;
                }
                if ($('#AmountTZ').length < 1) {
                    alert1("设计样式错误，必须设置加入台账数量[AmountTZ]字段");
                    return false;
                }
                if (lAmountTZ > lAmount) {
                    alert1("加入台帐[" + lAmountTZ + "]不能超过申购数量[" + lAmount + "]")
                    return false;
                }
                break;
            case 4007://录入单个合同
            case 4060://录入单个合同
                var lParentID = 0;
                var lIsChild = 0;
                if (parseInt(mlngGridType) == 4007) {
                    //if (mlngAddChild == 1) {
                    //    lParentID = mlngID;
                    //    alert("lParentID" + lParentID);
                    //}   
                    if (mdtRowParent != null) {
                        lParentID = mdtRowParent["ID"];//增加的时候带过来了，
                    } else {
                        lParentID = mdtRow["ParentID"];//增加的时候带过来了
                    }
                    if (lParentID < 1) {
                        lIsChild = 0;
                    } else {
                        lIsChild = 1;
                    }
                    
                } else {                    
                    lParentID = $('#ParentID').textbox('getValue');
                    lIsChild = 1;
                }
                
                if (lParentID < 1 && lIsChild==1) {
                    alert1("还未选择主合同");
                    return false;//主合同就不要做任何判断了
                }
                var dTotalPrice = $('#TotalPrice').textbox('getValue');
             
                //子合同才要做这个判断
             //   alert("hhh");
                if (lIsChild == 1) {
                    if ($('#CBLB').length <1) {
                        alert1("设计样式错误，必须设置成本类别");
                        return false;
                    }

                    var strCBLB = $('#CBLB').textbox('getValue');
                    if (strCBLB == "" && parseInt(mlngGridType) != 4007) {
                        alert1("还未选择成本类别");
                        return false;
                    }
                    var url = "../ajax/InputProc.ashx?now =" + new Date().getTime() + "";
                    var dataparm = {};
                    dataparm["Action"] = "isvalidht";
                    dataparm["TotalPrice"] = dTotalPrice;//当前金额
                    dataparm["CBLB"] = strCBLB;
                    dataparm["ID"] = mlngID;
                    dataparm["ParentID"] = lParentID;

                    //1.判断合同金额是否超过主合同的30%，
                    //2.判断是否超过了成本控制金额
                    $.ajax({
                        url: url, async: false, data: dataparm, type: 'POST', dataType: 'text',
                        success: function (data) {
                            //    alert("onLoadInputData.data=" + data);              
                            var strMsg = data;
                            if (strMsg == true || strMsg == "true") {

                            } else {
                                //     alert1(strMsg);
                                strMsg += "\r\n" + "是否继续录入？";
                                if (confirm(strMsg) == true) {
                                    bValid = true;
                                } else {
                                    bValid = false;
                                }

                            }
                        },
                        error: function (xhr) {
                            alert('动态页有问题\nstatus：' + xhr.status + '\nresponseText：' + xhr.responseText)
                        }
                    });
                }
              
                
                break;
            case 8015://需要判断工资账套是否存在
                var lZTID = $('#ZTID').textbox('getValue');
                var lGZYear = $('#GZYear').textbox('getValue');
                var lGZMonth = $('#GZMonth').textbox('getValue');
                var url = "../ajax/Salary.ashx?now =" + new Date().getTime() + "";
                var dataparm = { GZZTID: mlngID };
                dataparm["Action"] = "isexistzt";
                dataparm["GZYear"] = lGZYear;
                dataparm["GZMonth"] = lGZMonth;
                dataparm["ZTID"] = lZTID;
                dataparm["ID"] = mlngID;
                $.ajax({
                    url: url, async: false, data: dataparm, type: 'POST', dataType: 'text',
                    success: function (data) {
                        //    alert("onLoadInputData.data=" + data);              
                        var lRet = parseInt(data)
                        if (lRet == 1 ) {
                            alert("账套已经存在！");
                            strMsg = "账套已经存在";
                            bValid = false;   
                        }
                    },
                    error: function (xhr) {
                        alert('动态页有问题\nstatus：' + xhr.status + '\nresponseText：' + xhr.responseText)
                    }
                });
                break;
        }
     //   alert("input.IsValidInput.1" );
        for (i = 0; i <= mMainJsonInput.length - 1; i++) {
            item = mMainJsonInput[i];
            strCode = item.Code;
        //    alert("input.IsValidInput." + JSON.stringify(item));
            if (item.Code == "") {
                strMsg = item.Code + item.Title + "为空，表单设计样式产生错误，请认真检查表单设计样式！";
                //$.messager.alert("提醒", strMsg, 'info', function () {

                //});
                bValid = false;
                alert(strMsg);

                return bValid;
            }

            if (item.Style == eCtrlRadioButton) {

                //var bcheck = $('#' + item.Code + '').attr('checked');
                var strFieldCheck = "radio" + item.Code;
                var strCheckValue = $("input:radio[name='" + strFieldCheck + "']:checked").val();

                if (strCheckValue == undefined) {
                    strMsg   = item.Title + "还未选择！";
                    alert1(strMsg);
                    bValid = false;
                    return bValid;
                }
              
            }
            if (item.Style == 0 || item.Style == 1 || item.Style == 2) {
                var str = $('#' + item.Code + '').textbox('getValue');

                str = GetStrSave(str);//考虑转义问题 考虑一下GroupID 为空的问题
                if (parseInt(item.NotNull) == 1) {
                    if (str == "" || (item.Code == "GroupID" && parseInt(str) < 1)) {
                        var strMsg = item.Title + "不能为空";
                        $.messager.alert("提醒", strMsg, 'info', function () {
                            $('#' + item.Code + '').textbox('textbox').focus();
                            //        $('#' + item.Code + '').textbox().next('span').find('input').focus();
                        });

                        bValid = false;                       
                        break;
                    }
                }
            }
        }
    }
    catch (ex) {
        bValid = false;
        //if (item.Title != null) {
        //    alert("input.IsValidInput.i=" + i + "item.Title=" + item.Title + ex.name + ex.message);
        //} else {
        alert("input.IsValidInput.i=" + i + " strCode：" + strCode + ex.name + ex.message);
        //}
       
    }
    return bValid;
}
//根据特殊的mlngGridType 来增加
function AddMainJson(strJsonMain) {
    switch (parseInt(mlngGridType)) {
        case 4320:
          //  var lSelField = GetCookie("SelField");
            var ss1 = $('#HTParm1').textbox('getValue');
            ss1 = ss1.replaceAll(" ", "");
            $('#HTParm1').textbox('setValue', ss1);

            var ss2 = $('#HTParm2').textbox('getValue');
            ss2 = ss2.replaceAll(" ", "");     
            $('#HTParm2').textbox('setValue', ss2);

            var strBarCode = ss1 + "_" + ss2;
            if ($('#BarCode').length > 0) {
                $('#BarCode').textbox('setValue', strBarCode);
            } else {
                strJsonMain += "BarCode" + ":'" + strBarCode + "',";
            }
            break;

        case 4060://分项合同增加 //单独保存 项目名称 对于分项合同
            //   alert(mlngObjID + "mstrObjCode"+ mstrObjCode);
            var sParentName = $('#ParentName').textbox('getValue');
            strJsonMain += "XMName" + ":'" + sParentName+ "',";
            
        case 123://点检操作
         //   alert(mlngObjID + "mstrObjCode"+ mstrObjCode);
            
            if (mlngID < 1) {
            //    strJsonMain += "CLCode" + ":'" + mdtRowParent["Code"]; + "',";
            }  
        case 6055://点检操作
            if (mlngID < 1) {
                strJsonMain += "PID" + ":'" + mlngPID + "',";
            }            
        case 6099://计量仪器
            
            if (mlngID < 1) {
                strJsonMain += "FlagJL" + ":'1',";      
            } 
            break;
        case 6100://特种设备

            if (mlngID < 1) {
                strJsonMain += "FlagTZ" + ":'1',";
            }
            break;
        case 6104://故障报修
            if (mlngID < 1) {
                strJsonMain += "BXFlag" + ":'1',";
                strJsonMain += "WXFlag" + ":'-1',";
                strJsonMain += "BXState" + ":'待处理',";
            }            
            break;
        case 6115://报修处理
            strJsonMain += "BXFlag" + ":'1',";
            var strProcState = str = $('#BXProc').textbox('getValue');
            if (strProcState == "驳回") {
                strJsonMain += "WXFlag" + ":'-1',";
                strJsonMain += "BXState" + ":'驳回',";
            } else {
                strJsonMain += "WXFlag" + ":'0',";
                strJsonMain += "WXState" + ":'待维修',";
                strJsonMain += "BXState" + ":'待维修',";
            }            
            break;
        case 6118://报修处理
            //  strJsonMain += "BXFlag" + ":'1',";
            var strProcState = "";
            if ($('#YSState').length > 0) {
                strProcState  = $('#YSState').textbox('getValue');
            }            

            if (strProcState == "合格") {
                strJsonMain += "BXState" + ":'已完成',";
                strJsonMain += "WXState" + ":'已结束',";
            } else {
                strJsonMain += "WXFlag" + ":'0',";
                strJsonMain += "WXState" + ":'待维修',";
                strJsonMain += "BXState" + ":'待维修',";
            }     
            break;
        case 8015://处理 ZTName 
            var strText = $('#ZTID').textbox('getText');
            strJsonMain += "ZTName" + ":'" + strText+"',";
            break;
    }

    if (mlngRelID > 0) {
        if (mlngID < 1) {
            strJsonMain += "RelID" + ":'" + mlngRelID+"',";
        }
    }
    if (mlngOrderType > 0) {
        strJsonMain += "CheckFlag" + ":'" + GetCheckFlag() + "',";
    }

 //   alert("AddMainJson:" + strJsonMain);
    return strJsonMain;
}
//获得保存的JSON数据
function GetMainJson() {

    var ojbItem = null;
    //    var strMonitorMsg = "";
    var str = "";
    try {
        mstrMonitorMsg = "";
        var strJsonMain = "";

        strJsonMain = "ID:'" + mlngID + "',"; //mlngID=-1 表示增加
        if (mlngAddChild == 1) {//增加状态下            
            strJsonMain = "ID:'-1',"; //mlngID=-1 表示增加
            strJsonMain = strJsonMain + "ParentID:'" + mlngID + "',";
        }
        if (mlngObjID > 0) {
            //表示从表 保存从表的方法略有不同
            var strTGField = "";
            if (mstrTGField != undefined && mstrTGField != "") {
                strTGField = mstrTGField;
            } else {
                strTGField = "ObjID";
            }
            strJsonMain = strJsonMain + "" + strTGField + ":'" + mlngObjID + "',";
        }

        if (mlngOrderType > 0) {//进销存部分的 这个肯定是错误的  这样会导致每次都会变化

            strJsonMain += "Code" + ":'" + mstrCode + "',";
            //strJsonMain += "ObjID" + ":'" + mlngOrderType + "',";//这个屏蔽掉
            strJsonMain += "OrderType" + ":'" + mlngOrderType + "',";
            strJsonMain += "InOutType" + ":'" + mlngInoutType + "',";
            //       strJsonMain += "BillDate" + ":'" + getNowFormatDate() + "',";
            strJsonMain += "OrderCaption" + ":'" + mstrOrderCaption + "',";

            if (mlngID < 1) {
                strJsonMain += "BillDate" + ":'" + getNowFormatDate() + "',";
                strJsonMain += "BillMan" + ":'" + GetCookie("username") + "',";
                strJsonMain += "AuthMan" + ":'',";
                strJsonMain += "AuthDate" + ":'',";
            }
        }
        if (mlngNeedAuth > 0) {
            if (mlngID < 1) {
                strJsonMain += "AuthStatus" + ":'" + gstrAuthStatusUn + "',";
            }
        }
        
        strJsonMain = AddMainJson(strJsonMain);        

        for (var i = 0; i <= mMainJsonInput.length - 1; i++) {
            var item = mMainJsonInput[i];

            ojbItem = item;

            //处理 GroupID PermID,ObjID
            if (item.Code == "ObjID") {//这个是为了达到即使刷新的效果
                if (mstrObjCode != undefined) {
                    strJsonMain += "ObjCode" + ":'" + mstrObjCode + "',";
                }
                if (mstrObjName != undefined) {
                    strJsonMain += "ObjName" + ":'" + mstrObjName + "',";
                }
            }
            if (item.Code == "GroupID") {
                str = GetComboTreeText(item);
                strJsonMain += "GroupName" + ":'" + str + "',";
            }

            if (item.Code == "PermID") {
                str = GetComboTreeText(item);
                strJsonMain += "PermName" + ":'" + str + "',";
            }
            if (item.Code == "EquipType") {//做特殊处理
                if (item.Style == eCtrlComboBoxTree) {
                    str = GetComboTreeParentText(item);
                }
                
            //    alert("EquipTypePath字段不存在.length=" + $('#EquipTypePath').length);
                if ($('#EquipTypePath').length <1) { 
                    strJsonMain += "EquipTypePath" + ":'" + str + "',";
                }              
            }

            // if ($('#' + item.Code + '') != null) {

            //    alert(strV);
            //  var value = $('#' + item.Code + '').textbox('getValue');
            //   if (item.Style != 3 && item.Style != eCtrlCheckBox && item.Style != eCtrlRemark)
            if (item.Style == eCtrlComboBoxTree) {
                if (item.DataType == 1 || item.DataType == 5 || item.Code == "newGroupID" ||item.Code == "GroupID") {//数字类型
                    str = $('#' + item.Code + '').textbox('getValue');
                } else {//文本类型
                    str = $('#' + item.Code + '').textbox('getText');
                }  
            //    str = $('#' + item.Code + '').textbox('getValue');
            //    alert("DataType:"+item.DataType + ""+item.Code + ":'" + str + "',");
                strJsonMain += item.Code + ":'" + str + "',";
            }

            if (item.Style == eCtrlTextBox || item.Style == eCtrlComboBox||item.Style == eCtrlDTPicker) {
                str = $('#' + item.Code + '').textbox('getValue');
                if (eCtrlDTPicker == item.Style) {
                    str = $('#' + item.Code + '').textbox('getText');
                }
                str = GetStrSave(str);//考虑转义问题
                //if (item.Code == "BillDate") {
                //    str = $('#' + item.Code + '').datebox('getText');	// get datebox value
                //    alert("BillDate=" + str + "v=" + v);
                //}

                if (item.Code == "ObjID") {//去掉竖线后面的
                    var lpos = str.indexOf("|");
                    str = str.substr(0, lpos);
                    //    alert("ObjID=" + str+"i="+i);
                }
                strJsonMain += item.Code + ":'" + str + "',";
                //  alert(strJsonMain);
            }
            if (item.Style == eCtrlRichText) {
                var editor = mdicEditor.getItem(item.Code);
                str = "";
                if (editor != null && editor != undefined) {
                    var str = editor.html();
                }
                //        str = GetStrSave(str);//考虑转义问题
                strJsonMain += item.Code + ":'" + str + "',";
            }
            if (item.Style == eCtrlCheckBox) {

                //var bcheck = $('#' + item.Code + '').attr('checked');

                var isChecked = $('#' + item.Code + '').prop('checked');
                //    alert(isChecked);
                var lCheck = isChecked == true ? 1 : 0;
                //if (bcheck == true) {

                //}
                //   alert("保存：" + item.Code + "lCheck:" + lCheck);
                strJsonMain += item.Code + ":'" + lCheck + "',";
            }

            if (item.Style == eCtrlRadioButton) {

                //var bcheck = $('#' + item.Code + '').attr('checked');
                var strFieldCheck = "radio" + item.Code;
                var strCheckValue = $("input:radio[name='" + strFieldCheck + "']:checked").val();
          //      alert("获得选中。strCheckValue" + strCheckValue);
              
                strJsonMain += item.Code + ":'" + strCheckValue + "',";
            }
            //网格类型
            if (item.Style == eCtrlGrid) {
          
                str = GetGridContSaveStr(item);//考虑转义问题 
            //    alert("GetGridContSaveStr:"+str);
                strJsonMain += item.Code + ":'" + str + "',";

            }
            if (item.Style == eCtrlTagBox) {
      
             
                var strFiled = "tagbox" + item.Code;
                var str = $('#' + strFiled + '').tagbox('getValues');
                strJsonMain += item.Code + ":'" + str + "',";
            }

            //找到变更字段信息：
            if (mlngID > 0) {
                if (mstrFieldListMonitor.indexOf("|" + item.Code + "|") >= 0) {//监控字段
                    if (mdtRow[item.Code] != str) {
                        mstrMonitorMsg += "[" + item.Code + ":变更前:" + mdtRow[item.Code] + " 变更后:" + str + "]";
                    }
                }
            }

            //  }

        }
        //特殊处理一定要有一个ＩＤ字段
     //     alert("input.GetMainJson.strJsonMain=" + strJsonMain);
        //    alert("input.GetMainJson.mstrFieldListMonitor:" + mstrFieldListMonitor + "strMonitorMsg变更信息=" + mstrMonitorMsg);
        strJsonMain = strJsonMain.substr(0, strJsonMain.length - 1);
        return strJsonMain;
    }
    catch (ex) {
        alert("input.GetMainJson." + JSON.stringify(ojbItem) + "错误信息：" + ex.message);
    }
}

function onTest() {
    var strMsg = "";
    try {
        var url = "../ajax/input.ashx?now=" + new Date().getTime() + "";

        //多次测量
        for (var i = 1; i < 10; i++) {
            var str = "testdata" + i;
            var dataparm = { retstr: str, Action: 'testreturn' };

            $.post(url,
                dataparm,
                function (data, status) {
                    alert(data);
                });
        }

    }
    catch (ex) {
        alert("WebInput.onTest:" + ex.message);
    }
}

//提交数据
function onOK() {

    var strMsg = "";
    try {

        //$.messager.progress({
        //    title: '保存提示',
        //    msg: '正在保存数据，请勿重复点击提交...',
        //    text: ''
        //});


        //    MaskUtil.mask("正在保存数据，请勿重复点击提交...");

        var sPerm = mstrPermString;
        if (!IsValidHandler(sPerm, eOperEdit)) {
            $.messager.alert("提示", "当前用户无修改权限，请联系管理员开通");
            return;
        }

    //    alert("input.js.onOK.1:");
        if (IsValidInput() == false) {
            return;
        }
       
        if (mlngShowAudit ==1) {
            var lCheckFlag = GetCheckFlag();
            //      alert("onOK.lCheckFlag=" + lCheckFlag);

            if (lCheckFlag == 1) {
                $.messager.alert("提示", "当前单据已经审核，无法修改，请先反审核然后再修改！");
                return;
            }
        }
    //    alert("input.js.onOK.2:");
        //对于审核的状态下 或者普通台账状态下
     //  alert("mlngNeedAuth:" +mlngNeedAuth + "mlngAuthFlag:" + mlngAuthFlag + "mlngAuthEdit:" + mlngAuthEdit);
        if (mlngNeedAuth > 0 || mlngAuthFlag > 0 || mlngAuthEdit>0) {
            
            var sAuthStatus = mdtRow["AuthStatus"];   
        //    alert(sAuthStatus);
           
            if (sAuthStatus == gstrAuthStatusEd || sAuthStatus == gstrAuthStatusIng) {
                if (IsValidHandler(sPerm, eOperExec)) {
                //    $.messager.alert("提示", "单据已经提交审核，请谨慎修改，切勿轻易修改");
                    if (confirm("单据已经提交审核，请勿轻易修改,是否确定要修改吗") != true) {
                        return;
                    } 
                //    return;
                } else {
                    $.messager.alert("提示", "当前单据已经提交审核或者审核完毕，无法修改，除非获得超级权限【执行】权限强制修改！");
                    return;
                }
                
            }
        }
   //     alert("input.js.onOK.3:");
        //    alert("input.onOK.mbHasGrid:" + mbHasGrid);
        onShowSaveing();
        //  $('#OnOK')
        $('#ok').linkbutton('disable');
       
        var strJsonMain = GetMainJson();
   //     alert("input.js.onOK.strJsonMain:" + strJsonMain);
        var rowStr = strJsonMain;
        //多返回一点东西
        if (mlngShowSelObj > 0) {
            if (mdtRowParent != undefined) {
            //    alert("mdtRowParent=" + JSON.stringify(mdtRowParent))
                rowStr += ",Code" + ":'" + mdtRowParent["Code"] + "',";
                rowStr += "Name" + ":'" + mdtRowParent["Name"] + "',";
                rowStr += "ObjCode" + ":'" + mdtRowParent["Code"] + "',";
                rowStr += "ObjName" + ":'" + mdtRowParent["Name"] + "'";
            }
           
        }

        strJsonMain = "{tbl:{" + strJsonMain + "}}";

        var url = "../ajax/input.ashx?now=" + new Date().getTime() + "";
        var dataparm = null;
   //     alert("input.onOK.mbHasGrid2:" + mbHasGrid);
        if (mbHasGrid == true) {
            var strJsonGrid = $('#dg').datagrid('getRows');
            strJsonGrid = JSON.stringify(strJsonGrid);
        }

        if (mlngOrderType > 0) {
   //             alert("strJsonGrid:" + strJsonGrid);
            dataparm = { Action: 'SaveData', ID: mlngID, OrderID: mlngOrderType, GridType: mlngGridType, JsonMain: strJsonMain, JsonGrid: strJsonGrid };
        } else {
            dataparm = { Action: 'SaveData', ID: mlngID, DBID: mlngDBID, GridType: mlngGridType, JsonMain: strJsonMain, JsonGrid: strJsonGrid };
        }
        dataparm["DBSrcType"] = mlngDBSrcType;

        if (mstrMonitorMsg != "") {//记录监控信息
            dataparm["MonitorMsg"] = mstrMonitorMsg;
        }
        //主从报表保存内容
        if (mlngObjID > 0) {
            dataparm["ObjID"] = mlngObjID;
        } 

        $.post(url,
            dataparm,
            function (data, status) {
                //       MaskUtil.unmask();
                removeload();
                //   CloseMask();
                //  $.messager.progress('close');
                //      alert("数据：" + data + "\n状态：" + status);
                //  strMsg = "数据：" + data + "\n状态：" + status;
                var str = data;
                try {
                    var json = null;
                    if (status == "success") {
                        //重大改动

                        //str = str.replace(/\\n/ig, "<br>");
                        //str = str.replace(/\\r/ig, "<br>");
                        //str = str.replace(/\r\n/g, "<BR>");
                        str = str.replace(/\r\n/g, "");
                        str = str.replace(/\\n/ig, "");
                        str = str.replace(/\\r/ig, "");

                        //data = str.replace(/\n/g, "\\\\n");//
                        //   alert(data);
                        //    $.messager.alert("提醒", str, 'info', function () { });

                        //   json = JSON.parse(str);
                        json = eval("(" + data + ")");

                        //json = {
                        //    "Ret": "710",
                        //    "Msg": "执行语句Update HTB Set [EmpMan]='管理员',[BillDate]='2019-01-03',[HTCust11]='2',[HTCust10]='区域',[PrjManager]='孙庆涛',[Code]='ZCWY-QYXS-20190103-001',[Name]='手机屏蔽柜销售',[Customer]=' 寿光市台头镇人民政府',[TotalPrice]=12200,[HTSFType]=0,[GroupID]=6,[HTType]='最终用户',[HTState]='签约',[XMName]='',[HTCust18]='中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同中超伟业销售合同',[Remark]='' Where ID=710不成功将截断字符串或二进制数据。 语句已终止。Select Sum(SSMoney) From HT_FPGL Where KPDate >'2020-6-01' And KPDate <'2020-06-10'And ObjID=-1列名 'SSMoney' 无效。"
                        //};
                        if (parseInt(json.Ret) > 0) {
                            strMsg = "保存成功[" + json.Msg + "]";
                        } else {
                            strMsg = "保存失败，原因如下：[" + json.Msg + "]";
                        }
                    }

                    $('#ok').linkbutton('enable');
                    $.messager.alert("提醒", strMsg, 'info', function () {
                        //   alert(parseInt(data));
                        if (parseInt(json.Ret) > 0) {
                            if (mlngID < 1) {
                                mlngID = json.Ret;
                                if (mlngShowFJ > 0) {
                                    UpdateFileObjID(mlngID);
                                }                               
                            }                        
                            //if (mlngOrderType > 0) {
                            //    rowStr += ",BillDate" + ":'" + getNowFormatDate() + "'";//制单时间，防止乱更改
                            //}
                            //alert(rowStr);
                            rowStr = "{" + rowStr + "}";
                            if (mlngIsApp == 1) {

                                var ws = plus.webview.currentWebview();
                                var wo = ws.opener();
                                var strCmd = 'RefreshRow("' + rowStr + '","' + mlngID + '");';
                                console.log(strCmd);
                                wo.evalJS(strCmd);
                                back();//如果是APP则直接调用APP退出函数退出即可了。
                            }
                            else {
                                if (window.opener != null) {
                                    
                                    switch (mstrRetType) {
                                        case "openother"://特殊定制返回窗体
                                            window.opener.OpenOther(rowStr, mlngID);
                                            break;
                                        default:
                                            //      alert("WebInpu.onOK:" + rowStr);
                                            //对于ShowSelObj=1 涉及 有 父内容，刷新必须修一下
                                            if (mstrSubIDList != undefined) {
                                                if (typeof (window.opener.RefreshData) != "undefined") {
                                                    window.opener.RefreshData();
                                                }
                                            } else {
                                                if (typeof (window.opener.RefreshRow) != "undefined") {
                                                    window.opener.RefreshRow(rowStr, mlngID);
                                                }
                                            }
                                            break;
                                    }
                                    window.close();
                                }
                            }
                        }
                    });
                }
                catch (ex) {
                    alert("input.js.onOk.onRet.错误:" + str + ex.message);
                }


            });
    }
    catch (ex) {
        alert("Input.onOK:" + ex.message);
    }
    //查找所有textbox
}

//获取该节点的所有父路径内容
function GetComboTreeParentText(item) {
    var t = $('#' + item.Code + '').combotree('tree');	// get the tree object
    var n = t.tree('getSelected');		// get selected node
    var str = "";
    if (n != null) {
    //    str = n.text;
        str = getTreePathNames(t, n);
    }
    return str;
}
/** 
 * 根据叶子节点选中的值，获取树整个路径的名称 
 * @param treeObj 树对象，（combotree的树对象获取：var treeObj = comboObj.combotree("tree");） 
 * @param node 叶子节点 
 */
function getTreePathNames(treeObj, node) {
    var pathName = node.text;
    var parentNode = treeObj.tree("getParent", node.target);
    if (parentNode != null && parentNode != "undefined") {
        pathName = getTreePathNames(treeObj, parentNode) + "-" + pathName;
    }
    return pathName;
};  
//获得选中树的值
function GetComboTreeText(item) {
    var str = "";
    try {
        var t = $('#' + item.Code + '').combotree('tree');	// get the tree object
        if (t != null) {
            var n = t.tree('getSelected');		// get selected node        
            if (n != null) {
                str = n.text;
            }
        }
    } catch (ex) {

    }
    return str;
}

function GetCheckFlag() {
    var sText = $('#audit').text();
    //   alert("procAudit.('#audit').text()." + sText);
    var lCheckFlag = 0;
    sText = sText.toString();
    sText = sText.trim();
    if (sText == "审核") {
        lCheckFlag = 0;
    } else {
        lCheckFlag = 1;
    }
    return lCheckFlag;
}

function getNowFormatDate() {//获取当前时间
    var date = new Date();
    var currentdate = date.Format("yyyy-MM-dd hh:mm:ss");     //获取当前日期
    return currentdate;
}


function onGridChecked(index,sField) {
    var strCheckText = "";
    try {
     //  
        var strdgName = "dg";
        var rows = $('#' + strdgName + '').datagrid('getRows');
        var index = parseInt(index);
        var row = rows[index];

        var objCheckList = document.getElementsByName("checkbox" + index);
        var objCheck = document.getElementById("checkbox" + index);
      //  alert("sField:"+sField +  "objCheck.checked" + objCheck.checked);

      //  alert("onCheckBox.length" + objCheckList.length);
        //   alert("onGridChecked" + sField + "objCheckList[0].checked" + objCheckList[0].checked);
        switch (sField.toUpperCase()) {
            case "PDFLAG":
                if (objCheckList[0].checked == true) {
                    row.PDFlag = 1;
                    row.PDMan = GetCookie("username");
                    row.PDDate = getNowFormatDate();
                } else {
                    row.PDFlag = 0;
                    row.PDMan = "";
                    row.PDDate = "";
                }
               
                break;
        }
      
  

        $('#' + strdgName + '').datagrid('updateRow', {
            index: index,
            row: { data: row }
        });

        UpdateMainPDInfo();

        //    alert("onCheckBox.index：" + index + " 选中值：" + strCheckText);
    } catch (ex) {
        alert("onCheckBox.err" + ex.message);
    }
 
}

//更改主表盘点消息
function UpdateMainPDInfo() {
    try {
    if ($('#SumYPDAmount').length > 0) {//判断某个ID是否存在的依据
        //       alert("存在主表该字段内容");
        var total = GridTotalCol("dg", "PDFlag");
        $('#SumYPDAmount').textbox('setValue', total);
    }
    if ($('#SumWPDAmount').length > 0) {//判断某个ID是否存在的依据
        //       alert("存在主表该字段内容");

        var dTotalAmount = GridTotalCol("dg", "AmountEx");
        var total = GridTotalCol("dg", "PDFlag");
        var total2 = dTotalAmount - total;
        $('#SumWPDAmount').textbox('setValue', total2);
    }

    //    alert("onCheckBox.index：" + index + " 选中值：" + strCheckText);
    }
    catch (ex) {
        alert("onCheckBox.err" + ex.message);
    }
}
//执行操作
function procExec(lExecProc) {   

    try {
        var sPermStr = mstrPermString;
        if (!IsValidOperEx(document.title, sPermStr, eOperExec)) {
            return;
        }
        var lFlagE = parseInt( mdtRow.FlagE);
        if (lExecProc == 1) {
            if ( lFlagE == 1) {
                alert1("该单据已执行，请勿重复执行");
                return;
            }
        }

  //      lFlagE = (lFlagE == 1 ? 0 : 1);

        lFlagE = lExecProc;
    //     alert("procExec.lCheckFlag=" + lCheckFlag);

        if (mlngID < 1) {
            alert1("该单据还未保存，无法做执行操作！");
            return;
        }

        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        var dataparm = { Action: 'exec', TableName: mstrTableName, ID: mlngID, FlagE: lExecProc };
     //   alert("procExec"+JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {

                //     alert(data);
                //if (data == "-1") {
                //    return;
                //}
               
                if (parseInt(data) == 1) {   
                    var lExecFlag = lFlagE;
                    mdtRow["FlagE"] = lExecFlag;
                    if (parseInt(lExecFlag) > 0) {
                        $('#tdExecFlag').text("[已执行]");
                    } else {
                        $('#tdExecFlag').text("");
                    }
                } else {
                    alert1(data);
            }
        });

    }
    catch (ex) {
        alert("Input.js.procExec" + ex.name + ex.message);
    }
}
function procAudit() {
    var sPermStr = mstrPermString;
    if (!IsValidOperEx(document.title, sPermStr, eOperAudit)) {
        return;
    }

    //     alert("procAudit.lCheckFlag=" + lCheckFlag);
    var lCheckFlag = GetCheckFlag();
    lCheckFlag = lCheckFlag == 1 ? 0 : 1;

    try {

        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        var dataparm = { Action: 'Audit', TableName: mstrTableName, ID: mlngID, CheckFlag: lCheckFlag };
        //    alert(JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {

                //      alert(data);
                //if (data == "-1") {
                //    return;
                //}
                var lCheck = lCheckFlag;
                //       alert("lCheck:" + lCheck);
                if (parseInt(lCheck) == 1) {
                    //      alert("改变按钮");
                    $('#audit').linkbutton({
                        iconCls: 'icon-key',
                        text: '反审'
                    });
                    mdtRow["AuthMan"] = GetCookie("username");
                    mdtRow["AuthDate"] = getNowFormatDate();

                } else {

                    $('#audit').linkbutton({
                        iconCls: 'icon-key',
                        text: '审核'
                    });
                    mdtRow["AuthMan"] = "";
                    mdtRow["AuthDate"] = "";
                }

                SetFootItemText("AuthMan");
                SetFootItemText("AuthDate");
                var strJsonMain = GetMainJson();
                var rowStr = strJsonMain;
                rowStr = "{" + rowStr + "}";
                //    alert("input.js.onOK.strJsonMain:" + strJsonMain);
                if (window.opener != null) {
                    window.opener.RefreshRow(rowStr, mlngID);
                }
               
            });
    }
    catch (ex) {
        alert("Input.js.procAudit" + ex.name + ex.message);
    }

}


//处理各种按钮
function onInputMainToolBar(sCmd) {
    switch (sCmd) {
        case "test":
            onTest();
            break;
        case "Save":

            break;
        case "OK":
            onOK();
            break;
        case "printrpt":
            $('#dlgsel').dialog('open');
            break;

        case "printadv":

            break;
        case "audit":
            procAudit();
            break;
        case "exec":
            procExec(1);//执行
            break;
        case "unexec":
            procExec(0);//反执行
            break;
        case "design":
            ShowDesignEx();
            break;
        case "printset":
            ShowPrintSet();
            break;
        case "printsetrpt":
            ShowPrintSetRpt();
            break;
        case "print":
            ShowPrint();
            break;
        case "cancel":
            onCancel();
            break;
        case "exit":
            onCancel();
            break;
        case "printsetflag":
            ProcSetPrintFlag(0);
            break;
        case "printword":
            ProcPrintWord();
            break;
        case "ShowFJ":
            ProcShowFJ();
            break;
    }
}

function onproptoolbar(sCmd) {
    switch (sCmd) {
        case "ok":
            // alert("save字段信息");
            var lRptID = $('#cmbFile').combobox("getValue");
            if (lRptID < 1) {
                alert("没有选中的模板，无法打印，请先在报表设计中设计模板");
                return;
            }
            ShowPrint(lRptID);
            $('#dlgsel').dialog('close');
            break;
        case "exit":
            $('#dlgsel').dialog('close');
            break;
    }
}





function onRelOrder(lRelOrderType) {

    try {
        //        alert("onRelOrder" + lRelOrderType);
        var strOrderRel = "rel_" + lRelOrderType;
        //if ($('#Vender').length > 0) {
        //    dataparm["Vender"] = $('#Vender').textbox('getValue');//增加一个 要插入的表格
        //}
        //if ($('#Customer').length > 0) {
        //    dataparm["Customer"] = $('#Customer').textbox('getValue');//增加一个 要插入的表格
        //}

        // strUrl = "WebType.html?IsApp=" + mlngIsApp + "&OrderRel=" + strOrderRel + "&IsMul=1";
        strUrl = "fmTop.html?IsApp=" + mlngIsApp + "&OrderID=" + lRelOrderType + "&ctrltype=gridtype&OrderRel=" + strOrderRel + "&IsMul=1&&ShowSel=1";
        var strTitle = "引用相关订单";
        if ($('#Vender').length > 0) {
            var str = $('#Vender').textbox('getValue');//增加一个 要插入的表格
            strUrl += "&Vender=" + str + "";
        }
        if ($('#Customer').length > 0) {
            //    dataparm["Customer"] = $('#Customer').textbox('getValue');//增加一个 要插入的表格
            var str = $('#Customer').textbox('getValue');//增加一个 要插入的表格
            strUrl += "&Customer=" + str + "";
            
        }
        strUrl += "&Date = '" + new Date().getTime() + "'";
        strUrl = strUrl + "&TitleIn=" + strTitle + "";
        //  alert(strUrl);
        mbChange = true;
        ShowDlg(1100, 600, strUrl);
    }
    catch (ex) {
        alert("onRelOrder:" + ex.message);
    }


}

//属性按钮点击
function ontoolbar(sKey) {
   //   alert("ontoolbar:" + sKey);
    switch (sKey) {
        case "add"://动态增加一行
            append();
            break;

        case "find":
            //可以在这里读取权限赋值的东西，做权限控制操作
            var strUrl = "";
            //  var strColKey = "CLCode";
            var strTable = mstrTableRel;
            var strSqlCont = mstrRelSqlCont; //document.getElementById("hid_relsqlcont").value;

            strSqlCont = encodeData(strSqlCont);//换一种加密函数


            var lGridTypeRel = mlngGridTypeRel;
            if (lGridTypeRel == undefined || lGridTypeRel == "") {
                lGridTypeRel = 4;
                //这个地方需要做完善改进，可能是选用固定资产 这里可以是多选
            }
            if (strTable == "") {
                alert("不支持查找！");
            }
            if (strSqlCont == undefined) {
                strSqlCont = "";
            }
            mstrFieldName = "clcode"
            //    strUrl = "WebType.html?IsMul=1&IsMulSel=1&SqlCont=" + strSqlCont + "&GridType=" + lGridTypeRel + "&TableName=" + strTable + "&ctrltype=gridtype&now=" + new Date().getTime();

            strUrl = "fmTop.html?IsApp=" + mlngIsApp + "&ShowNav=1&ShowSel=1&ClientSqlCont=" + strSqlCont + "&DBID=" + lGridTypeRel + "&TableName=" + strTable + "&ctrltype=gridtype&now=" + new Date().getTime();
            var strTitle = "选择商品资料";
            switch (parseInt(lGridTypeRel)) {
                case 4:
                    strTitle = "选择商品资料";
                    strUrl = strUrl + "&PropType=1";
                    break;
                case 7001:
                    strTitle = "选择人员";

                    break;
                default:
                    strTitle = "选择资产设备";

                    break;
            }
            

            strUrl = strUrl + "&TitleIn=" + strTitle + "";
      //      alert("ontoolbar.find.url="+strUrl);
            mbChange = true;
            ShowDlg(1250, 750, strUrl);
            break;
        case "findbyck":
            //可以在这里读取权限赋值的东西，做权限控制操作
            var strUrl = "";
            //  var strColKey = "CLCode";
            var strTable = mstrTableRel;
            var strSqlCont = mstrRelSqlCont; //document.getElementById("hid_relsqlcont").value;
            strSqlCont = encodeData(strSqlCont);
            var lGridTypeRel = mlngGridTypeRel;

            if (lGridTypeRel == undefined || lGridTypeRel == "") {
                lGridTypeRel = 332;
                //这个地方需要做完善改进，可能是选用固定资产 这里可以是多选
            }
            if (strTable == "") {
                alert("不支持查找！");
            }
            if (strSqlCont == undefined) {
                strSqlCont = "";
            }

            mstrFieldName = "clcode"
            //    strUrl = "WebType.html?IsMul=1&IsMulSel=1&SqlCont=" + strSqlCont + "&GridType=" + lGridTypeRel + "&TableName=" + strTable + "&ctrltype=gridtype&now=" + new Date().getTime();
            
            strUrl = "fmTop.html?PropType=1&IsApp=" + mlngIsApp + "&ShowNav=1&ShowSel=1&ClientSqlCont=" + strSqlCont + "&DBID=" + lGridTypeRel + "&TableName=" + strTable + "&ctrltype=gridtype&now=" + new Date().getTime();
            var strTitle = "选择商品资料";
            switch (lGridTypeRel) {
                case 4:
                    strTitle = "选择商品资料";
                    break;    
            }
            strUrl = strUrl + "&PropType=1";
            strUrl = strUrl + "&TitleIn=" + strTitle + "";
            //  alert(strUrl);
            mbChange = true;
            ShowDlg(1250, 750, strUrl);
            break;
        case "gridexport":
            //导出网格

            GridExportExcel();
            break;
        case "gridset"://网格设置
            var url = "../WebSet/DlgGridSet.html?GridType=" + mlngGridTypeC + "";
            ShowDlg(1050, 900, url);
            break;
        case "zcpd"://自动盘点            
            ProcAutoPD("ZCPD",0);
            break;
        case "zcpdex"://自动盘点            
            ProcAutoPD("ZCPD",1);
            break;
        case "imppddata"://自动盘点            
            ProcImpPD();
            break;           
        case "ckpd"://自动盘点            
            ProcAutoPD("CKPD");
            break;
        case "GetZCKC":
            ProcGetKC("GetZCKC");
            break;
        case "GetCJKC":
            ProcGetKC("GetCJKC");
            break;
        case "CalcGZ":
            UpdateGZDetail(1)
            break;
        case "LoadGZRY":
            LoadGZRY(1)
            break;
        case "propimport":
            ProcImportProp()
            break;
        case "impjjgz":
            ProcImportGZ("JIJIAN");
            break;
        case "impjsgz":
            ProcImportGZ("JISHI");
            break;  

    }
}

//初始化按钮
function InitToolBar() {
 //   var lShowAudit = 0;

    switch (parseInt(mlngGridType)) {
        case 5036://加入审核功能
        case 8015:
            mlngShowAudit = 1;
            break;
        default:
            break;
    }
    if (mlngOrderType > 0) {
        mlngShowAudit = 1;
    }
    //缺省隐藏
    $('#audit').hide();
    $('#oper').hide();//缺省隐藏吧
    if (mlngShowAudit) {
        //  alert("InitToolBar11");
        $('#audit').show();
        var lCheck = mdtRow["CheckFlag"];
        //    alert("InitToolBar.CheckFlag" + lCheck);
        if (parseInt(lCheck) == 1) {

            $('#audit').linkbutton({
                iconCls: 'icon-key',
                text: '反审'
            });
        } else {

            $('#audit').linkbutton({
                iconCls: 'icon-key',
                text: '审核'
            });
        }
    }

    //执行标志判断
    if (mlngOrderType > 0 ) {
        var lExecFlag = mdtRow["FlagE"];
        if (parseInt(lExecFlag) > 0) {
            $('#tdExecFlag').text("[已执行]");
        } else {
            $('#tdExecFlag').text("");
        }

        var lPrintFlag = mdtRow["FlagP"];
        if (parseInt(lPrintFlag) > 0) {
            $('#tdPrintFlag').text("[已打印]");
        } else {
            $('#tdPrintFlag').text("");
        }
    } 

    if (mlngIsApp == 1) {
        $('#design').hide();
        $('#print').hide();
    }
    //是否查看附件
    if (mlngShowFJ > 0) {
        //动态增加
        //var strKey = "ShowFJ";
        //var strCaption = "查看附件";// "引用订单"

        //var sRelButton = '<a href="#" id="' + strKey + '" title="点击查看或者上传附件" onclick="onInputMainToolBar(\'' + strKey + '\')" class="easyui-linkbutton" plain="true" iconcls="icon-edit">' + strCaption + '</a>';

        //var objRel = $('#divMainToolBar').append(sRelButton);
        //$.parser.parse(objRel);//渲染一下吧
        //   $('#dgProp').show();
        var dgName = "dgProp";
        strdg = '<table id="' + dgName + '" title="" class="easyui-datagrid" style="width: 99%;height:200px"></table>';
        var objFJ = $('#divfj').append(strdg);
        $.parser.parse(objFJ);//渲染一下吧

        //   $('#dgProp').datagrid("getPanel").show();
    } else {
        //      alert("dgProp.hide");
        //    $('#dgProp').datagrid("getPanel").hide();

    }

}





//退出
function onCancel() {
    if (mlngIsApp == 1) {
        back();//如果是APP则直接调用APP退出函数退出即可了。
    } else {
        window.close();
    }
}

// --下拉框相关

//$("#xx").combobox({ disabled: true });      //设置下拉款为禁用

//$("#xx").combobox('setValue', xlid);  //设置下拉款的默认值  xlid是你下拉款的id属性

//$("#xx").combobox('getValue');      //获取下拉款id值

//$("#xx").combobox('getText');      //获取下拉款name值

function onSearch(e) {
    var v = $(e.data.target).textbox('getValue');
    alert('The inputed value is ' + (v ? v : 'empty'));
}

//重新计算高度
function WindowsResize(dZoom, lColCount, lRowCount) {
    //  $(window).height(500);
    //   alert(" window.screen.height:" + (100 * window.screen.height / dZoom))
    //   $(document).height(300);// = 300;
    var lHeight = $(document).height();
    var lWidth = $(document).width();
    //   var dZoom = detectZoom();
    //   alert("WindowsResize.lRowCount=" + lRowCount);
    //要考虑文本过长 ，有换行问题的
    var lHeight2 = (lRowCount * 30 + 50);
    var lHeightInput = lHeight2;
 //   alert("lHeight2:" + lHeight2);
    if (mlngShowFJ > 0) {
        lHeight2 = lHeight2 + 150;
    }
    if (lHeight2 > (100 * window.screen.height / dZoom - 100)) {
        lHeight2 = (100 * window.screen.height / dZoom - 100);
    }
      
    if (lHeight2 < 300) {
        lHeight2 = 300;
    }
  //  var lHeightDiff = (lHeight2 - lHeight) * dZoom / 100;
    var lHeightDiff = (lHeight2 - lHeight) * 100 / dZoom;//;//  / 100;
    //   alert("WindowsResize.lHeightDiff" + lHeightDiff);
    if (lHeightDiff > 0) {
        lHeightDiff = 0;
    } else {
      //  lHeightDiff = lHeightDiff + 50;//不要偏移那么多
        lHeightDiff = lHeightDiff + 100;//不要偏移那么多 让高度更高一些
    }
  //  alert("WindowsResize.WindowsResize.lHeight2" + lHeight2 + "lHeight=" + lHeight + "lHeightDiff:" + lHeightDiff);
   
 //   alert("lRowCount=" + lRowCount + "document.clientHeight:" + document.body.clientHeight + "lWidth:" + lWidth + "lHeight" + lHeight + "lHeightDiff" + lHeightDiff);
   
    if (lColCount == 8) {
        var lWidthDiff = 200;    
        window.resizeBy(lWidthDiff, lHeightDiff);
    } else {
        window.resizeBy(0, lHeightDiff);
    } 

    
  //  alert("lHeight2=" + lHeight2 + "lHeight:" + lHeight + "document.clientHeight:" + document.body.clientHeight);
    lHeight = lHeight + lHeightDiff - 50;

    var lHeightInput = lHeight2;
   //    alert("lHeight2:" + lHeight2);
    if (mlngShowFJ > 0) {
        lHeightInput = lHeight2 - 130;
    }
    var strHeight = lHeightInput + "px";
    var strStyle = 'height:' + strHeight + ';';
 //   alert("strStyle:" + strStyle);

    document.getElementById('divinput').setAttribute('style', strStyle);
   
    
    //  window.resizeTo()
    //    alert("document.documentElement.clientHeightafter:" + document.documentElement.clientHeight)
}

//克隆拷贝对象
function CloneObj(obj) {
    return copyobj(obj);
}
function copyobj(obj) {
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}
//加载父窗体数据，仅仅只是查看效果
function LoadParentInfo(strName,strFieldName) {
    try {


        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        var dataparm = { Action: 'getparentinfo', DBID: mlngGridType, GridType: mlngGridType, ObjID: mlngObjID };
        
        if (strName != "") {
            dataparm["ParentName"] = strName;
        }
        if (strFieldName != "" && strFieldName != undefined) {
            dataparm["FieldName"] = strFieldName;
        }
    //    alert(JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {
                var strHtml = JSON.stringify(data);
                
                if (data == "") {
                    return;
                }
                try {
                    var json = eval("(" + data + ")"); //
                    mdtGridG = json.dtGrid;
                    var rows = json.rows;
               //     alert("LoadParentInfo.rows" + rows);
                    strHtml = "";
                    if (rows== null || rows == "null") {
                        return;
                    }
                    if (rows.length < 1) {
                        return;
                    }
                    var row = rows[0];
                   
                    mdtRowParent = row;
                    mdtRowParent.QMMoneyOther = mdtRowParent.QMMoney - mdtRow["QKMoney"]
                 //   alert("mdtRowParent.QMMoney:" + mdtRowParent.QMMoney);
                    UpdateParentObjInfo(mdtGridG, row);
                    switch (mstrTableName) {
                        case "JXC_IOCK":
                        case "JXC_SFB":
                            mlngObjID = row.ID;//更改一下主ID//设备管理 合同管理就不要更改这个ObjID了
                            //      alert("mlngObjID:" + mlngObjID);
                            break;
                    }     
                }
                catch (ex) {
                    alert("input.js.LoadParentInfo.onRet:" + ex.name + ex.message);
                }
                         
            });
    }
    catch (ex) {
        alert("input.js.LoadParentInfo" + ex.name + ex.message);
    }
}

function UpdateParentObjInfo(dtGrid, row) {
    try {

        mdtRowParent = row;//重新赋值了

        //alert("UpdateParentObjInfo.11:" );
        //alert("UpdateParentObjInfo.dtGrid:" + JSON.stringify(dtGrid));
        if (row == undefined) {
            return;
        }
        if (dtGrid == null || dtGrid == undefined) {
            return;
        }
        var strTitle = "主" + GetMainName(mlngGridType) + "信息";
        $("#divMainTitle").html(strTitle);
        var strHtml = "";
        //   alert("LoadParentInfo.row" + JSON.stringify(row));

        for (var i = 0; i < dtGrid.length; i++) {
            var item = dtGrid[i];
            var strValue = "";
            if (row[item.Key] != undefined) {
                strValue = row[item.Key];
            }
            strHtml += item.Caption + ":" + strValue + "<br>";
        }
        //  alert("mdtRow.QKMoney:" + mdtRow["QKMoney"]);
        var strMsg = "";
        var dBCSFMoney = 0;
        var dQKMoney = 0;
    //    alert("parseInt(mlngOrderType):" + parseInt(mlngOrderType));
        if (parseInt(mlngOrderType) < 1) {
            $("#divMainMsg").hide();
        }

        switch (parseInt(mlngOrderType)) {
            case 72:
               
            case 82:
                var strSFKText = "收款";
                if (parseInt(mlngOrderType) == 72) {
                    strSFKText = "付款";
                }
             //   alert("mdtRow.BCSFMoney" + mdtRow["BCSFMoney"]);
                if (mlngID < 1) {
                    dBCSFMoney = 0;
                } else {
                    dBCSFMoney = parseFloat(mdtRow["BCSFMoney"]);
                }
                row.QMMoneyOther = row.QMMoney + dBCSFMoney
                strMsg = " 含本单产欠款：" + row.QMMoney +"=除去本单欠款：" + row.QMMoneyOther ;
                strMsg += "-本单" + strSFKText+"：" + dBCSFMoney;
                break;
            case 31:
            case 41:
            case 65:
            case 66:
                if (mlngID < 1) {
                    dQKMoney = 0;
                } else {
                    dQKMoney = parseFloat(mdtRow["QKMoney"]);
                }
                //dQKMoney = -1 * dQKMoney;
                row.QMMoneyOther = row.QMMoney - dQKMoney;
                strMsg = " 含本单产欠款：" + row.QMMoney + "= 除去本单欠款：" + row.QMMoneyOther;
                strMsg += "+本单产生欠款：" + dQKMoney;

                break;
            case eOrder_XSTHD:
            case eOrder_CGTHD: 

                if (mlngID < 1) {
                    dQKMoney = 0;
                } else {
                    dQKMoney = parseFloat(mdtRow["QKMoney"]);
                }
                dQKMoney = -1 * dQKMoney;               
                row.QMMoneyOther = row.QMMoney - dQKMoney;
                strMsg = " 含本单产欠款：" + row.QMMoney + "= 除去本单欠款：" + row.QMMoneyOther;
                strMsg += "+本单产生欠款：" + dQKMoney;

                break;
            default:
                $("#divMainMsg").hide();
                
                break;

        }
       

      
        if ($("#divMainMsg").length > 0) {
            $("#divMainMsg").html(strMsg);
        }
        
        //    alert("LoadParentInfo" + strHtml);

        $("#divCont").html(strHtml);
    }
    catch (ex) {
        alert("input.js.UpdateParentObjInfo.ex:" + ex.name + ex.message);
    }
}

//加载数据
function LoadInputData(json) {
    var lLastRow = 0;
    var dZoom = detectZoom();
    //    alert("detectZoom:" + dZoom);//根据缩放比例来决定
    var lColCount = 6;
    var lRowCount = 0;
    try {

        mdtRow = json.dts[0];
        if (parseInt(mlngID) < 1 || mlngID == "undefined") {
            mlngID = mdtRow["ID"];//重新赋值一下
            if (mlngID == null) {
                mlngID = -1;
            }
        }
     //   alert("mlngID:"+mlngID);
      
        mMainTableInfo = json.tableinfo;//就是主表的一些录入信息
        InitTblInfo(mMainTableInfo);
        //     InitInputLayout();//这个时候来决定是否显示属性 这里已经迟了
        InitToolBar();//初始化

        mMainJson = json;
        mMainJsonInput = json.rows;//主录入界面
        //   alert("LoadInputData:"+JSON.stringify(mMainJsonInput));
        var newTr = null;
        //  if (mlngIsApp == 1) {
        //       alert("mlngIsApp=" + mlngIsApp);
        //   }
        //自动增加一条 objid
        var bHasObjID = false;
        if (mlngShowSelObj == 1) {
            mlngObjID = mdtRow["ObjID"];
            mstrObjCode = mdtRow["ObjCode"];
            mstrObjName = mdtRow["ObjName"];
            LoadParentInfo();//加载父节点效果
            if (mlngIsApp == 0) {
                for (i = 0; i <= json.rows.length - 1; i++) {
                    var item = json.rows[i];
                    if (item.Code == "ObjID") {
                        bHasObjID = true;
                        break;
                    }
                }
                if (bHasObjID == false) {
                    //     alert(JSON.stringify(item));
                    var item = json.rows[0];
                    var objitem = copyobj(item);
                    objitem.NotNull = 0;
                    objitem.IsLocked = 0;
                    objitem.Code = "ObjID";
                    objitem.Name = "主" + GetMainName(mlngGridType);
                    objitem.Row = -1;
                    objitem.Title = "主" + GetMainName(mlngGridType);
                    objitem.ColCount = parseInt(objitem.Cols) / 2;

                    objitem.Style = 0;
                    objitem.HasButton = 1;
                    var str = "";
                    //    alert("mdtRow[ObjID]" + mdtRow["ObjID"]);
                    if (mdtRow["ObjID"] == null || mdtRow["ObjID"] == "null" || parseInt(mdtRow["ObjID"]) == 0) {

                        str = "";
                    } else {

                        str = mdtRow["ObjID"] + "|" + mdtRow["ObjName"];
                    }
                    objitem.Value = str;
                    //    alert(JSON.stringify(objitem));
                    json.rows.unshift(objitem);

                }
            } else {
                var str = mdtRow["ObjID"] + "|" + mdtRow["ObjName"];
                $("#divobjid").html(str);

            }
        }
        var lTableIndex = 0;
        var lLashRowCount = 0;
        //    alert("input.js.LoadInputData开始执行for循环");
        for (i = 0; i <= json.rows.length - 1; i++) {
            var item = json.rows[i];
            //if (i % 3 == 0) {
            //    var newTr = tab1.insertRow();
            //}
            if (i == json.rows.length - 1) {
                //  alert(item.Code);
            }
            lColCount = item.Cols;
            var lwidlbl = 150;
            var lwidtxt = 150;
            lwidlbl = lwidlbl * 100 / dZoom;
            lwidtxt = lwidtxt * 100 / dZoom;          
            var tabCur = GetInputTable(lTableIndex);
            if (mlngIsApp == 1) {
                //每个都增加
                item.Cols = 2;
                item.ColCount = 1;
                newTr = tabCur.insertRow();
                lLastRow = item.Row;
                lRowCount++;
            }
            else {
                if (item.Row != lLastRow) {
                    newTr = tabCur.insertRow();
                    lLastRow = item.Row;
                    lRowCount++;
                }
            }

            var lColPans = 1;
            var lRowPans = 1;
            if (item.ColCount > 1) {
                //     alert(lwidtxt);
                lwidtxt = (parseFloat(lwidtxt) + parseFloat(lwidtxt)) * parseFloat(item.ColCount) - parseFloat(lwidlbl);
                lColPans = item.ColCount * 2 - 1;
                //     alert(item.Code + "item.ColCoun:" + item.ColCount + "lwidtxt:" + lwidtxt + "lColPans:" + lColPans);
            }
            lRowPans = item.RowCount;
            if (lRowPans > 1) {
                //  alert("lRowPans:" + lRowPans);
                lRowCount = lRowCount + lRowPans - 1;
            }


            lwidlbl = lwidlbl + "px";
            lwidtxt = lwidtxt + "px";
            //实际情况自动计算吧
            //添加列
            var objItem = null;
            var strFieldType = "text";
            //标签列
            var strTitle = item.Title;

            if (parseInt(item.NotNull) == 1) {

                //     alert("item.NotNull" + item.NotNull);
                strTitle = strTitle + "*";
            }

            var newTd0 = null;
            var newTd1 = null;
            if (eCtrlRemarkNewLine != item.Style) {
                newTd0 = newTr.insertCell();
                
                if (item.Style != eCtrlRemark && item.Style != eCtrlRemarkNewLine) {
                    newTd1 = newTr.insertCell();
                    newTd1.colSpan = lColPans;
                }
                newTd0.innerHTML = '<td style="min-width:80px;" align="right">' + strTitle + '</td>';
            }
           
            var sKey = "|" + item.Code + "|";
            var sCrypt = "";
            if (mstrFieldListCrypt.indexOf(sKey) >= 0) {//严管字段 用户管理员权限
                sCrypt = "******"
            }
            switch (item.Style) {
                case eCtrlTextBox://tetxtbox
                    if (item.RowCount > 1) {
                        var lheight = item.RowCount * 30;
                        lheight = lheight + "px";
                        newTd1.innerHTML = '<td ><input type="text" class="easyui-textbox" data-options="multiline:true" id="' + item.Code + '" name="' + item.Code + '"  style="width:' + lwidtxt + ';height:' + lheight + '" /></td>';


                    } else {

                        if (item.IsPwd == 1) {
                            strFieldType = "password";
                            //      alert("LoadInputData:"+JSON.stringify(item));
                        }
                        newTd1.innerHTML = '<td >' + sCrypt + '<input type="' + strFieldType + '" class="easyui-textbox" data-options="multiline:false" id="' + item.Code + '" name="' + item.Code + '"  style="width:' + lwidtxt + ';" /></td>';

                    }
                    break;
                case eCtrlComboBoxTree://combox 树形下拉框

                    //if (item.Style == eCtrlComboBoxTree) {
                    //    item.Style = eCtrlComboBox;//做个兼容处理
                    //}
                    var url = "";
                    var sField = GetRelFieldName(item.Code);
                    url = "../ajax/GetTree.ashx?Field=" + item.Code + "&GridType=" + mlngGridType + "";
                    if (item.DataType == 0) {
                        newTd1.innerHTML = '<td ><select id="' + item.Code + '" name="' + item.Code + '" class="easyui-combotree" valueField="text" textField="text"  url="' + url + '"  style="width:' + lwidtxt + ';" /></td>';
                    } else {
                        newTd1.innerHTML = '<td ><select id="' + item.Code + '" name="' + item.Code + '" class="easyui-combotree" valueField="ID" textField="text"  url="' + url + '"  style="width:' + lwidtxt + ';" /></td>';
                    }

                    //    newTd1.innerHTML = '<td ><input id="' + item.Code + '" class="easyui-combobox"  name="' + item.Code + '" valueField="text" textField="text"  method="get" url="combobox_data1.json" /></td>';

                    break;

                case eCtrlComboBox://combox
                    if (item.Style == eCtrlComboBoxTree) {
                        item.Style = eCtrlComboBox;//做个兼容处理
                    }
                    var url = "";
                    var sField = GetRelFieldName(item.Code);
                   
                //    alert(sField + " item.DataType:" + item.DataType);
                    //if (isNotANumber(item.DataType)) {
                    //    item.DataType = 0;
                    //}
              
                    if (HasFieldTree(sField)) {
                        url = "../ajax/GetTree.ashx?Field=" + item.Code + "&GridType=" + mlngGridType + "";

                        newTd1.innerHTML = '<td ><select id="' + item.Code + '" name="' + item.Code + '" class="easyui-combotree" valueField="ID" textField="text"  url="' + url + '"  style="width:' + lwidtxt + ';" /></td>';

                    } else {
                        if (mlngObjID == null) {
                            mlngObjID = -1;
                        }
                        url = "../ajax/GetList.ashx?Field=" + item.Code + "&ObjID=" + mlngObjID + "";
                        //  alert("item.DataType="+item.DataType+"字段：" + item.Code);
                        var bEditable = true;
                        if (item.CmbStyle == 1) {
                            bEditable = false;
                        }


                        if (item.DataType == 5 || item.DataType == 1) {
                            newTd1.innerHTML = '<td >' + sCrypt + '<input id="' + item.Code + '" name="' + item.Code + '" class="easyui-combobox" panelHeight="auto" panelMaxHeight=200 valueField="ID" textField="Name"  url="' + url + '"  style="width:' + lwidtxt + ';" /></td>';
                        } else {
                          //  item.DataType =0 或者null
                            newTd1.innerHTML = '<td >' + sCrypt + '<input id="' + item.Code + '" editable="' + bEditable + '" name="' + item.Code + '" class="easyui-combobox" panelHeight="auto" panelMaxHeight=200 valueField="Name" textField="Name"  url="' + url + '"  style="width:' + lwidtxt + ';" /></td>';
                        }
                    


                    }


                    //    newTd1.innerHTML = '<td ><input id="' + item.Code + '" class="easyui-combobox"  name="' + item.Code + '" valueField="text" textField="text"  method="get" url="combobox_data1.json" /></td>';

                    break;
                case eCtrlTagBox:
                    //newTd1.innerHTML = '<td ><input  class="easyui-tagbox"  id="' + item.Code + '" name="' + item.Code + '"  style="width:' + lwidtxt + ';" /></td>';
                    strHtml = '<input id ="tagbox'+item.Code+'" class="easyui-tagbox"  label="" style="width:100%" data-options="buttonText: \'Button\',onClickButton: function() { alert(\'click '+ item.Code +' button\');}">';
                  //  strHtml = '<input id ="testtagbox" class="easyui-tagbox"  label="" style="width:100%" data-options="buttonText: \'Button\',onClickButton: function() { alert(\'click ' + item.Code + ' button\');}">';
                    //   strHtml = '<input id ="' + item.Code + '" class="easyui-tagbox" value="张三,李四" label="" style="width:100%" data-options="buttonText: \'Button\',onClickButton: function() { alert(\'click ' + item.Code + ' button\');}">';
                    newTd1.innerHTML = strHtml;     
                    break;
                case eCtrlRadioButton://直接加载过来
                //    alert("找到了eCtrlRadioButton");
                    url = "../ajax/GetList.ashx?Field=" + item.Code + "&ObjID=" + mlngObjID + "";
                    var dataparm = {};
                    $.ajax({
                        url: url, async: false, data: dataparm, type: 'POST', dataType: 'text',
                        success: function (data) {
                    
                        //    alert("onLoadInputData.data=" + data);              
                            var json = eval("(" + data + ")");
                            var strHtml = '<td><table style="heigh:20px;width:auto"><tr>';
                            for (var i = 0; i < json.length; i++) {
                                var row = json[i];
                                var strChecked = "";
                                if (row.Name == item.Value) {
                                    strChecked = 'checked=true';
                                }
                         //       alert("onLoadInputData.data=" + JSON.stringify(row));  \'' + item.Code +'\'
                            //    strHtml += '<td><input data-options="onChange:onMainRadioChange"  ' + strChecked+' class="easyui-radiobutton" name = "'+item.Code+'" value = "' + row.Name + '" label = "' + row.Name +':"></td>';

                                strHtml += '<td><label style="text-align:right;" >' + row.Name + '</label><input ' + strChecked + ' type="radio" name="radio' + item.Code + '" value="' + row.Name + '" onclick="onMainRadioChange(\'' + item.Code + '\')"></td> '
                            }
                           
                            //strHtml += '<td><div style="text-align:right;"><input class="easyui-radiobutton" name = "fruit" value = "Orange" label = "在检:"></div></td>';
                            //strHtml += '<td><div style="text-align:right;"><input class="easyui-radiobutton" name="fruit" value="Apple" label="未检:"></div></td>';
                            strHtml += '</tr></table></td>';
                        //    alert(strHtml);
                            newTd1.innerHTML = strHtml;                                           
                        },
                        error: function (xhr) {
                            alert('动态页有问题\nstatus：' + xhr.status + '\nresponseText：' + xhr.responseText)
                        }
                    });

                    
                    break;
                case eCtrlDTPicker://datebox

                    if (parseInt(item.DataFormat) == 1) {
                        newTd1.innerHTML = '<td><input class="easyui-datetimebox" id="' + item.Code + '" name="' + item.Code + '" style="width:' + lwidtxt + ';"/></td>';
                    } else {

                        newTd1.innerHTML = '<td><input class="easyui-datebox" id="' + item.Code + '" name="' + item.Code + '" style="width:' + lwidtxt + ';"/></td>';
                    }
                    break;
                case eCtrlCheckBox://checkbox
                    //     alert("checkbox" + item.Code);
                    newTd1.innerHTML = '<td><input type="checkbox"  id="' + item.Code + '" name="' + item.Code + '"  style="width:' + lwidtxt + ';" /></td>';
                    break;
                case eCtrlRemark://备注说明行
                    //  newTd1.innerHTML = '<td><input type="checkbox"  id="' + item.Code + '" name="' + item.Code + '"  style="width:' + lwidtxt + ';" /></td>';
                    //   strTitle = "说明：" + strTitle;


                    newTd0.colSpan = item.Cols;
                    newTd0.innerHTML = '<td colspan="+ item.Cols +" style="min-width:180px;color:blue" align="left">' + strTitle + '</td>';
                    newTd0.innerHTML = '<div style="min-width:180px;color:blue;" align="left">' + strTitle + '</div>';
                    //   alert("找到备注行了" + newTd0.innerHTML);
                    break;
                case eCtrlRemarkNewLine:
                    mlngRowCountTable[lTableIndex] = lRowCount - lLashRowCount;
                    lLashRowCount = lRowCount;                   
                  
                    lTableIndex++;

                    var divTableID = "divtable" + lTableIndex;
                    var imgID = "imgShowHide" + lTableIndex;
                    var spanID = "span" + lTableIndex;
                 //   var strLine = '<div id=' + divTableID + ' onclick="onShowTable(' + lTableIndex + ')" class="cyremark" ><a href="#" onclick="onShowTable(' + lTableIndex +')" class="easyui-linkbutton" iconcls="icon-compress" plain="true">显示隐藏</a>   ' + strTitle + '</div>';
                    var strLine = '<div title="点击显示隐藏' + strTitle+'" id=' + divTableID + ' onclick="onShowTable(' + lTableIndex + ')" class="cyremark" >'
                    strLine += '<span id="' + spanID + '">展开</span><image id=' + imgID +'   src="../Images/Showmore.jpg"></image>'+ strTitle + '</div > ';

               //     alert("eCtrlRemarkNewLine.tabID" + divTableID +"strLine:"+ strLine);
                    $("#" + divTableID + "").html(strLine);
                //    $.parser.parse(divTableID);//渲染一下吧
                //    $("#" + divTableID + "").show();
                   
                    break;
                
                case eCtrlRichText://富文本 kindeditor 富文本

                    newTd1.innerHTML = '<td ><textarea id="' + item.Code + '" name="' + item.Code + '"     style="width: 100%; height: 200px; visibility: hidden;">EasyUI集合KindEditor</textarea></td>';
                   
                    break;
                case eCtrlUpLoad://处理文件上传操作

                //    newTd1.innerHTML = '<td rowspan=' + lRowPans + ' colspan=' + lColPans + '  style="min-width:80px" align="right"> <input class="easyui-filebox" style="width:300px"></td>';
                    var strHtml = '<td rowspan=' + lRowPans + ' colspan=' + lColPans + '>';
                    strHtml += '<table style="width:100%"><tr><td colspan=' + (lColPans-1) + ' style="min-width:80px;width:80%" align="right"> <input id="' + item.Code + '" name="' + item.Code + '" class="easyui-textbox" style="width:500px"></td>';
                    strHtml += '<td ><a href="#" id="open' + item.Code + '" title="点击查看文件" onclick="onMainInputFile(\'open\')" class="easyui-linkbutton" iconcls="icon-open" plain="true"></a></td>';
                    strHtml += '<td ><a href="#" id="upload' + item.Code + '" title="点击上传文件" onclick="onMainInputFile(\'upload\')" class="easyui-linkbutton" iconcls="icon-up" plain="true"></a>';
                    strHtml += '</td></tr></table></td>';
                 //   strHtml = '<input id ="'+ item.Code +'" class="easyui-tagbox" value="'+ item.Value +'" label="" style="width:100%" data-options="buttonText: \'Button\',onClickButton: function() { alert(\'click button\');}">';
                 //   strHtml = '<input id ="' + item.Code + '" class="easyui-textbox" value="' + item.Value + '" label="" style="width:100%" data-options="buttonText: \'打开\',onClickButton: function() { alert(\'click button\');}">';


                    newTd1.innerHTML = strHtml;
                    newTd1.rowSpan = lRowPans;
               //     alert("找到上传按钮了！eCtrlUpLoad" + strHtml);
                    break;
                case eCtrlPictureBox://图片
                    //   newTd1.innerHTML = '<td rowspan=' + lRowPans + ' colspan=' + lColPans + '  style="min-width:80px" align="right"><img src="../images/login_l.gif" width="120px" height="120px" /></td>';
                    var imgUrl = "../" + item.Value;
                    //    alert(imgUrl);
                    newTd1.innerHTML = '<td rowspan=' + lRowPans + ' colspan=' + lColPans + '  style="min-width:80px" align="right"><img src=' + imgUrl + ' width="120px" height="120px" /></td>';

                    newTd1.rowSpan = lRowPans;
                    break;
                    
                case eCtrlGrid://增加一个网格解析模式
                    newTd0.colSpan = item.Cols;
                    newTd0.innerHTML = InitGridItem(item);
                    newTd1 = null;
                    break;

            }
            if (lLashRowCount < 1) {
                mlngRowCountTable[lTableIndex] = lRowCount;
            } else {
                mlngRowCountTable[lTableIndex] = lRowCount - lLashRowCount;
            }
            if (eCtrlRemarkNewLine != item.Style) {
                $.parser.parse(newTd0);
                if (newTd1 != null) {
                    $.parser.parse(newTd1);//对这个一定要进行单独渲染，否则 时间控件将会无效 避免使用全局渲染
                }
                SetTextBox(item);
                if (item.HasButton == 1 && item.Style != eCtrlComboBox && item.Style != eCtrlGrid) {
                    //  alert(item.Code);
                    $('#' + item.Code + '').textbox({ icons: mObjFieldSel });
                    $('#' + item.Code + '').textbox({
                        prompt: '请选择' + GetMainName(mlngGridType, item.Code)
                    });
                    if (item.Code == "ObjID") {
                        var str = mdtRow["ObjID"] + "|" + mdtRow["ObjName"];
                        if (mdtRow["ObjID"] == null || mdtRow["ObjID"] == "null" || parseInt(mdtRow["ObjID"]) == 0) {
                            str = "";
                        }
                      
                        $('#' + item.Code + '').textbox('setValue', str);
                        if (mlngIsApp == 1) {
                            $('#' + item.Code + '').textbox({ icons: mObjFieldSelBar });
                        }
                    }
                }
            } 
        }

        //   alert("input.js.LoadInputData 结束循环");
        //  $("input.easyui-textbox textbox-f").css("width", "100%");

        $("input.text").css("width", "100%");
        $("input").css("width", "100%");
        $("textarea").css("width", "100%");
        $("span.textbox").css("width", "100%");//动态设置宽度是有效的 但是对于easyui-combogrid 竟然是无效的
        //     $("span.panel combo-p panel-htop").css("width", "100%");//动态设置宽度是有效的 但是对于easyui-combogrid 竟然是无效的

        //$("input.radiobutton-value").css("width", "30px");
        //$("input.easyui-radiobutton radiobutton-f").css("width", "50px");
        //$("input.easyui-radiobutton").css("width", "50px");
        $("input[type='radio']").css("width", "auto");
        $("input[type='checkbox']").css("width", "auto");

    //    $("td").css("min-width", "80px");//屏蔽这个设置 有的地方需要屏蔽 
        if (mlngIsApp == 1) {
            $("td").css("min-height", "30px");//设置高度
            $("input").css("height", "30px");
            $("a").css("height", "30px");
        }

        //    alert("input.js.LoadInputData 33");
        //$("span.l-btn-left l-btn-icon-left").css("height", "30px");
        //$("span.l-btn-left l-btn-icon-left").css("font-size", "16px");
        //$("span.l-btn-left l-btn-icon-left").css("lien-height", "30px");
       
       
        if ((mlngOrderType > 0 && mlngGridTypeC > 0) || (mlngGridTypeC > 0 && mbHasGrid == true)) {
            if (lColCount == 8) {
                var lWidthDiff = 200;
                window.resizeBy(lWidthDiff, 0);
            }
            UpdateNorthHeight(dZoom);
            InitGrid();
            LoadInputProp(json);//对于进销存部分可以加载属性内容
        } else {
            WindowsResize(dZoom, lColCount, lRowCount);           
        }


        if (lTableIndex == 1) {
            var tab2 = document.getElementById("tab2");
            tab2.hidden = !tab2.hidden;//true;
        }       
        //     alert("input.js.LoadInputData 44");
        if (mlngOrderType > 0) {
            mstrCode = mdtRow["Code"];
            // alert("LoadInputData.mstrCode=" + mstrCode);
            SetFootItemText("Code");
            //设置foot 内容
            SetFootItemText("BillMan");
            SetFootItemText("BillDate");
            SetFootItemText("AuthMan");
            SetFootItemText("AuthDate");
        }

        //   alert("input.js.LoadInputData 55");
        //    alert(mlngShowFJ);
        if (mlngShowFJ > 0) {
            LoadFJ(mlngID, mlngShowFJ, "");
        }

        //    $("span.textbox combo datebox").css("width", "100%");
        //var divInput = document.getElementById("divinput");
        //$.parser.parse(divInput);//对这个一定要进行单独渲染，否则 时间控件将会无效 避免使用全局渲染
    } catch (ex) {
        alert("input.js.LoadInputData.ex:" + ex.message);
    }
}

function GetNumber(sVal) {
    if (sVal == null) {
        sVal = 0;
    }
    if (isNotANumber(sVal)) {
        sVal = 0;
    }
    return sVal;
}

function onMainRadioChange(strCode) {
    try {
       

        var objCheckList = document.getElementsByName("radio" + strCode);
        var strFieldCheck = "radio" + strCode;
        var strCheckValue = $("input:radio[name='" + strFieldCheck + "']:checked").val();
    //    alert("onMainRadioChange.strCode" + strCode + "strCheckValue:" + strCheckValue);
        //for (var i = 0; i < objCheckList.length; i++) {
        //    if (objCheckList[i].checked == true) {
        //    //    alert("onMainRadioChange.opt" + objCheckList[i].value);
        //    }
        //}
        //发生事件
        switch (strCode) {
            case "VenderSel"://供应商选择
                var strVender = "";
                var dTotalPrice = 0;
                switch (strCheckValue) {
                    case "供应商1":
                        strVender = $('#Vender1').textbox('getValue');
                        dTotalPrice = $('#TotalPrice1').textbox('getValue');
                        UpdateVenderSel(1);
                        break;
                    case "供应商2":
                        strVender = $('#Vender2').textbox('getValue');
                        dTotalPrice = $('#TotalPrice2').textbox('getValue');
                        UpdateVenderSel(2);
                        break;
                    case "供应商3":
                        strVender = $('#Vender3').textbox('getValue');
                        dTotalPrice = $('#TotalPrice3').textbox('getValue');
                        UpdateVenderSel(3);
                        break;
                }

                if ($('#Vender').length > 0) {//判断某个ID是否存在的依据
                    $('#Vender').textbox('setValue', strVender);
                }

                if ($('#TotalPrice').length > 0) {//判断某个ID是否存在的依据
                    $('#TotalPrice').textbox('setValue', dTotalPrice);
                }
                break;
        }       
        
//    alert("onMainRadioChange.target" + JSON.stringify(target));
    } catch (ex) {
        alert("input.js.onMainRadioChange.ex:" + ex.message);
    }
}

//更改文件 考虑到解析内容，一并缺德
function UpdateInputFile(data) {

    try {
      //  alert("UpdateInputFile.data=" + data);
        var json = eval("(" + data + ")");
    //    alert("UpdateInputFile.json.ResultText=" + json.ResultText);
        var sFile = json.FilePath;
        if ($('#FileName').length > 0) {//判断某个ID是否存在的依据
            $('#FileName').textbox('setValue', json.FileName);
        }
        if ($('#ImgUrl').length > 0) {//判断某个ID是否存在的依据
            $('#ImgUrl').textbox('setValue', json.FilePath);
        }
        //  return;
        switch (mstrTableName.toUpperCase()) {
            case "HT_FPGL":
                if (json.ResultText != undefined) {
                    if (json.ResultText != "") {
                        var sResult = json.ResultText;
                        //     alert("json.words:" + sResult);
                        var json2 = eval("(" + sResult + ")");

                        //      alert("json2.words_result:" + json2.words_result);
                        //读取解析文件
                        //     var json2 = eval("(" + json2.words_result + ")");
                        //购买客户：
             //           alert("json2.words_result.PurchaserName:" + json2.words_result.PurchaserName);
                        //购买方的
                        if ($('#KPAccount').length > 0) {//发票类型
                            $('#KPAccount').textbox('setValue', json2.words_result.PurchaserRegisterNum);
                        }
                        if ($('#Customer').length > 0) {//判断某个ID是否存在的依据
                            $('#Customer').textbox('setValue', json2.words_result.PurchaserName);
                        }
                        //开票单位
                        if ($('#KPCorp').length > 0) {//供应商
                            $('#KPCorp').textbox('setValue', json2.words_result.SellerName);
                        }

                        if ($('#Vender').length > 0) {//供应商
                            $('#Vender').textbox('setValue', json2.words_result.SellerName);
                        }

                        if ($('#KPCode').length > 0) {//判断某个ID是否存在的依据
                            $('#KPCode').textbox('setValue', json2.words_result.InvoiceCode);
                        }
                        if ($('#FPCode').length > 0) {//判断某个ID是否存在的依据
                            $('#FPCode').textbox('setValue', json2.words_result.InvoiceNum);
                        }

                        if ($('#KPMoney').length > 0) {//判断某个ID是否存在的依据
                            $('#KPMoney').textbox('setValue', json2.words_result.AmountInFiguers);
                        }
                        if ($('#KPType').length > 0) {//发票类型
                            $('#KPType').textbox('setValue', json2.words_result.InvoiceType);
                        }
                        var strDate = json2.words_result.InvoiceDate;
                        strDate = strDate.replace("年", "-");
                        strDate = strDate.replace("月", "-");
                        strDate = strDate.replace("日", "");
                        if ($('#KPDate').length > 0) {//判断某个ID是否存在的依据
                            $('#KPDate').textbox('setValue', strDate);
                        }
                    }
                }
                break;
        }
        
    }
    catch (ex) {
        alert("input.js.UpdateInputFile" + ex.message);
    }


}
//文件查看 文件上传等
function onMainInputFile(sKey) {

    try {
   //     alert("onMainInputFile" + sKey );

        switch (sKey) {
            case "open":

                var sFilelUrl = "";           
               
                var url = "../ajax/FileProc.ashx?Date='" + new Date().getTime() + "'";
                // alert("LoadPage" + url + "  pagenumber:" + pagenumber + "  pagesize:" + pagesize);
                var dataparm = { ID: mlngID, TableName: mstrTableName };
                dataparm["Action"] = "getfileurlex";

             //   alert("onMainInputFile.dataparm:"+JSON.stringify(dataparm));
                $.ajax({
                    url: url, async: false, data: dataparm, type: 'POST', dataType: 'text',
                    success: function (data) {
                        if (data == "") {
                            alert("文件不存在！");
                            return;
                        }
                  //      alert("onMainInputFile.data"+data);
                        sFilelUrl = data;
                        ShowFileUrl(uid, sFilelUrl, "../");
                    },
                    error: function (xhr) {
                        alert('动态页有问题\nstatus：' + xhr.status + '\nresponseText：' + xhr.responseText)
                    }
                });
                break;

            case "upload":

                //var sPerm = mstrPermStringP;
                //if (!IsValidHandler(sPerm, eOperAdd)) {
                //    $.messager.alert("提示", "当前用户无增加权限，请联系管理员开通");
                //    return;
                //}
                var lGridType = mlngGridType;
                var uid = mlngID;
                var lShowMe = 1;

                strUrl = "../DlgUpload.html?";
                strUrl = strUrl + "ID=" + uid + "&DBID=" + lGridType + "&ShowMe=" + lShowMe + "";

                //strUrl = strUrl + "&ObjID=" + mlngMainFileID + "";
                strUrl = strUrl + "&HideGroup=1";
                strUrl = strUrl + "&ShowSelObj=0";

                var lngReName = 1;//这里更改名称吧
                strUrl = strUrl + "&ReName=" + lngReName + "";
                strUrl = strUrl + "&Action=UpdateFile";//仅仅更改当前文件
                strUrl = strUrl + "&now=" + new Date().getTime() + "";
                //      
                var lGroupID = -1;
                if ($('#GroupID').length > 0) {
                    lGroupID = $('#GroupID').textbox('getValue');
                }

                var lWidth = 900;
                var lHeight = 750;
                mlngOperMainSub = 1;
                result = ShowDlg(1050, 650, strUrl);

                break;
        }


    }
    catch (ex) {
        alert("input.js.onMainInputFile" + ex.message);
    }

}
//
function GetInputTable(lTableIndex) {
    var tableCur = null;
    if (lTableIndex == 0) {
        tableCur = document.getElementById("tab1");
    }
    if (lTableIndex == 1) {
        tableCur = document.getElementById("tab2");
    }
    if (lTableIndex == 2) {
        tableCur = document.getElementById("tab3");
    }
    return tableCur;
}

function onShowTable(lTableIndex) {
  // alert("onShowTable.lTableIndx:" + lTableIndex);
    try {
        var dZoom = detectZoom();
        var tableCur = GetInputTable(lTableIndex);
        mblnShowTable[lTableIndex] = !mblnShowTable[lTableIndex];
        tableCur.hidden = !mblnShowTable[lTableIndex];
        UpdateNorthHeight(dZoom);
       
    } catch (ex) {
        alert("input.js.onShowTable.ex:" + ex.message);
    }
   
}

function UpdateNorthHeight(dZoom) {
    try {

        var lRowCount = mlngRowCountTable[0] ;  
        for (var i = 1; i < 5; i++) {
            if (mblnShowTable[i] == true) {
                lRowCount = lRowCount + mlngRowCountTable[i];
            }
        }
        for (var i = 1; i <= 2; i++) {
            var strImgUrl = "";
            var tableCur = GetInputTable(i);
            tableCur.hidden = !mblnShowTable[i];//这种方法不及时
            //     alert(" tableCur.hidden.1:" + tableCur.hidden);
            var tabid = "tab" + (i + 1);
            var spanID = "span" + i;
            if (tableCur.hidden == true) {
                strImgUrl = "../Images/showmore.jpg";
                $("#" + tabid + "").hide();
                $("#" + spanID + "").text("展开");
                
            } else {
                $("#" + tabid +"").show();
                strImgUrl = "../Images/showless.jpg";
                $("#" + spanID + "").text("收起");
            }
            $("#imgShowHide" + i+"").attr("src", strImgUrl);
        }
       
       
       
   //     alert("UpdateNorthHeight.mblnShowTable" + JSON.stringify(mblnShowTable) + "mlngRowCountTable:" + JSON.stringify(mlngRowCountTable));
      //  var lHeight = lRowCount * 30 + dZoom / 100 * 50;
    
      
     //   

        var lHeight = lRowCount * 30 + 75;
        if (HasGrid()) {
            if (lHeight > 400) {
                lHeight = 400;
            }
            //    lHeight = lHeight + 30;
            if (parseInt(mlngOrderType) > 0) {
                lHeight = lHeight + 30;
            }
            //   alert("input.js。lHeight:" + lHeight + "lRowCount:" + lRowCount);
      //      alert("UpdateNorthHeight.mblnShowTable:" + JSON.stringify(mblnShowTable) + "mlngRowCountTable:" + JSON.stringify(mlngRowCountTable) + "lHeight:" + lHeight);
            $('#divNorth').panel('resize', { height: lHeight });
            $('#bodyMain').layout('resize');
        }
      
  

        //var strHeight = lHeight + "px";
        //var strStyle = 'height:' + strHeight + ';';
        //document.getElementById('divinput').setAttribute('style', strStyle);

   //     alert("input.js。lHeight:" + lHeight + "lRowCount:" + lRowCount + "dZoom:" + dZoom);
   
    } catch (ex) {
        alert("input.js.onShowTable.ex:" + ex.message);
    }

}

function GridSearch(lID, sOper, index) {
    onMainSerchField(mstrGridField);
}

function onMainFind() {
    //   alert("onMainFind.mstrGridField=" + mstrGridField);
    onMainSerchField(mstrGridField);
}

//移动操作 这个可以作为复用功能函数
function GridOper(lID, sOper, index) {
    try {
        //      alert("GridMove" + sOper);
        var rows = $('#' + mstrGridField + '').datagrid('getRows');
        var rowlength = rows.length;
        index = parseInt(index);// 做一个强制数据类型转换吧，否则当作文本型的
        mlngRowIndex = index;
        switch (sOper) {

            case "del":
                rows.splice(index, 1);//直接删除，从新加载就OK了
                break;
            case "up":
                if (index == 0) {
                    alert("已经是最顶部行，无法上移！");
                    return;
                }
                var item = rows[index];
                rows[index] = rows[index - 1];
                rows[index - 1] = item;
                break;
            case "down":
                if (index == (rowlength - 1)) {
                    alert("已经是最底部行，无法下移动！");
                    return;
                }
                //        alert("GridMove.rows.index=" + index);
                var lNextIndex = index + 1;
                //       alert("GridMove.rows.lNextIndex=" + lNextIndex);
                var item = rows[index + 1];
                rows[(index + 1)] = rows[index];
                rows[index] = item;
                alert("GridMove.rows.length=" + rows.length);
                break;
            case "top":
                if (index == 0) {
                    alert("已经是最顶部行，无法上移！");
                    return;
                }
                var item = rows[index];
                item = copyobj(item);

                rows.splice(index, 1);
                rows.unshift(item);

                //rows[index] = rows[0];
                //rows[index - 1] = item;
                break;
            case "bottom":
                if (index == rowlength) {
                    alert("已经是最底部行，无法下移动！");
                    return;
                }
                var item = rows[index];
                item = copyobj(item);

                rows.splice(index, 1);
                rows.push(item);
                break;

        }
        UpdateItemGrid(mstrGridField, rows);

    }
    catch (ex) {
        alert("GridOper" + ex.message);
    }


}

var toolItemGrid = [
    {
        text: '查找',
        iconCls: 'icon-sql',
        handler: function () { onMainFind() }

    }];

var toolItemGridExec = [
    {
        text: '执行',
        iconCls: 'icon-sql',
        handler: function () { onMainFind() }

    }];

// 加载属性内容
function InitGridItem(item) {
    try {

        //page1 page2等
        var sField = item.Code;
        mstrGridField = sField;

        var json = item.Value;
        var divgridName = "div_grid" + sField;
        //   var dgName = "dg" + sField;
        var dgName = sField;
        var strdg = "";

        var sArr = null;

        strdg = '<table id="' + dgName + '" title="" class="easyui-datagrid" style="width: 99%;height:100%"></table>';

        //     alert("LoadInputProp.strdg=" + strdg);
        // var strdivgrid = '<div id="' + divgridName + '" style="width:100%;height:300px"><table id="' + dgName + '" title="" class="easyui-datagrid" style="width: 95%;height:100%"></table></div>';


        var strdivgrid = '<div id="' + divgridName + '"   style="width:100%;height:100%">' + strdg + '</div>';
        //      alert(strdg);
        return strdg;
    }
    catch (ex) {
        alert("input.InitGrid:" + ex.message);
    }
}






//设置 主表网格类型的录入样式
function SetItemGrid(item, data) {
    try {

        var dgName = item.Code;
        
        mstrGridField = dgName;
        var dgTitle = item.Title;

    //    alert("SetItemGrid.mdtRow.opt.mobjFieldExec=" + JSON.stringify(mobjFieldExec));
        //然后整体高度也要高一点，这个怎么设置了
        if (HasGrid() == true) {
            //如果还有子网格属性的话
            window.resizeBy(0, 120);
            $('#divNorth').panel('resize', { height: "65%" });//对于有网格的，必须把这个设置高一点 
        } else {
            window.resizeBy(0, 120);
            $('#divNorth').panel('resize', { height: "100%" });//对于有网格的，必须把这个设置高一点 
        }
        var toolbarSel = toolItemGrid;
        if (mstrGridField == "JsonResult" || mstrGridField == "ExecXJCont") {
            toolbarSel = toolItemGridExec
        }

        //  alert("SetItemGrid.dgName:" + dgName + " :data:" + data);
     
        $('#' + dgName + '').datagrid({
            rownumbers: true,
            pagination: false,
            singleSelect: true,
            nowrap: false,
            loadMsg: "数据加载中...", //載入信息時提示內容
            //    showFooter: true,
            fitColumns: true,
            title: dgTitle,
   
       
        });
        
        if (mstrGridField == "ExecCont" || mstrGridField == "BYCont") {
           
            //是否显示查找按钮
            $('#' + dgName + '').datagrid({
                toolbar: toolbarSel
            });
        }

        //获取datagrid熟悉对象 并为其赋值
        //   var opt = $("#dg").datagrid('options');
        var opt = $("#" + dgName + "").datagrid('options');
    //    
      
        if (mstrGridField == "JsonResult") {
            opt.columns = [mobjFieldExec];
        } else {
            opt.columns = [mobjFieldBY];
        }
        
     //   alert("SetItemGrid.mdtRow.opt.columns=" + JSON.stringify(opt.columns));
       

        $("#" + dgName + "").datagrid(opt);
        var lHeight = 0;
        lHeight = 300;
   //     alert("SetItemGrid.mdtRow.XJCont2=" + mdtRow.XJCont);
        $("#" + dgName + "").datagrid('resize', {
            height: lHeight,
            width: '100%'
        });

        //var rows = null;
        //if (data != "") {
        //    var rows = eval("(" + data + ")"); //
        //}
        //UpdateItemGrid(dgName, rows);

    //    alert("SetItemGrid.mdtRow.XJCont=" + mdtRow.XJCont);
   //     SetExecParm(mdtRow.XJCont, "Equip_XJBZD");
  //      InitExecParm();
        LoadGridCont(dgName, data);
     //   LoadExecPage(dgName);        //加载网格内容


    } catch (ex) {
        alert("input.SetItemGrid.ex=" + ex.name + ex.message);
    }


}

function MergeItemGrid(dgName, insrows) {
    try {
        //      alert("MergeItemGrid.开始执行合并操作" + JSON.stringify(insrows));

        var rows = $('#' + dgName + '').datagrid('getRows');
        for (var i = 0; i < insrows.length; i++) {
            var item = insrows[i];
            if (!IsExistItem(item, rows)) {
                rows.push(item);
            }
        }
        UpdateItemGrid(dgName, rows);
    } catch (ex) {
        console.log('intpu.MergeItemGrid.errmsg=' + ex.message);
    }


}

function IsExistItem(item, rows) {
    //	console.log('开始查找了！finditem item.id='+item.id +'dtinfo.length'+dtinfo.rows.length);
    try {
        for (var m = 0; m < rows.length; m++) {

            var itemT = rows[m];
            //      alert("IsExistItem.找到了")
            //	console.log("main.finditem:"+item.id+'itemT.DBID:'+itemT.DBID);
            if (item.ID == itemT.ID) {
                return true;
                break;
            }
        }
    } catch (ex) {
        alert('IsExistItem.errmsg=' + ex.message);
    }
    //   alert("IsExistItem.没找到")
    return false;
};

function FindItemByCode(item, rows) {
    //	console.log('开始查找了！finditem item.id='+item.id +'dtinfo.length'+dtinfo.rows.length);
    try {
        //   alert("开始查找rows=" + JSON.stringify(rows));
        //   alert("开始查找Item=" + JSON.stringify(item));
        for (var i = 0; i < rows.length; i++) {
            //    alert("input.finditem:item.CLCode=" + item.CLCode + 'itemT.CLCode:' + itemT.CLCode);
            var itemT = rows[i];


            if (item.CLCode == itemT.CLCode) {
                //        alert("FindItemByCode.找到了");
                return itemT;
                break;
            }
        }
    } catch (ex) {
        alert('FindItemByCode.errmsg=' + ex.message);
    }
    //   alert("IsExistItem.没找到")
    return null;
};


//加载某个单独的网格
function UpdateItemGrid(dgName, rows) {

    try {

        if (rows == null) {
            return;
        }
        var table = new Object;
        table.rows = rows;
        table.total = rows.length;

        //  alert("input.js.UpdateItemGrid.dgName" + dgName + "table=" + JSON.stringify(table));

        $("#" + dgName + "").datagrid('loadData', table);

    }

    catch (ex) {
        alert("input.UpdateItemGrid:" + ex.message);
    }


}

//设备报表模版打印
function ShowPrintSetRpt() {
    try {
        var ldbtype = mstrDBType;
        var lDBID = mlngDBID;
        var sPerm = mstrPermString;//客户端判断方法
        var uid = mlngID;

        //if (!IsValidOper(sPerm, eOperPrint)) {
        //    return;
        //}
        //var sPerm = mstrPermString;
        if (!IsValidHandler(sPerm, eOperPrint)) {
            $.messager.alert("提示", "当前用户无打印模板设置权限，需要获得该操作的【打印】权限，请联系管理员开通");
            return;
        }
        var strUrl = "";
        strUrl = "../WebRpt/PrintSet.html?";
        //if (ldbtype == "OrderID") {
        //    strUrl = strUrl + "ID=" + uid + "&OrderID=" + mlngOrderType + "";
        //}
        //else {
        //    strUrl = strUrl + "ID=" + uid + "&DBID=" + mlngDBID + "";;
        //}

        if (mlngOrderType > 0) {
            strUrl = strUrl + "ID=" + uid + "&OrderID=" + mlngOrderType + "";
        } else {
            strUrl = strUrl + "ID=" + uid + "&DBID=" + mlngGridType + "";
        }
        strUrl = strUrl + "&ParentPath=" + mstrParentPath + "";
        //     alert(strUrl);
        mlngOperMainSub = 0;

        ShowDlg(1050, 800, strUrl);

    }
    catch (ex) {
        alert("input.ShowPrintSetRpt" + ex.message);
    }
}

//打印操作
function ShowPrint(rptid) {


    try {
        var ldbtype = mstrDBType;
        var lDBID = mlngDBID;
        var sPerm = mstrPermString;//客户端判断方法
        var uid = mlngID;

        if (!IsValidOper(sPerm, eOperPrint)) {
            return;
        }
        var strUrl = "../WebRpt/DlgPrint.aspx?";
        strUrl = "../WebRpt/DlgPrint.html?";
        if (ldbtype == "OrderID") {
            strUrl = strUrl + "ID=" + uid + "&OrderID=" + mlngOrderType + "";
        }
        else {
            strUrl = strUrl + "ID=" + uid + "&DBID=" + mlngDBID + "";;
        }
        if (rptid > 0) {
            strUrl = strUrl + "&RptID=" + rptid + ""
        }
        //     alert(strUrl);
        mlngOperMainSub = 0;

        ShowDlg(1050, 800, strUrl);
        ProcSetPrintFlag(1);
    }
    catch (ex) {
        alert("input.ShowPrint" + ex.message);
    }

}




//处理打印标志
function ProcSetPrintFlag(lFlagE) {
    var sPermStr = mstrPermString;
    if (!IsValidOperEx(document.title, sPermStr, eOperPrint)) {
        return;
    }

    try {

        if (parseInt(lFlagE) > 0) {
            $('#tdPrintFlag').text("已打印");
        } else {
            $('#tdPrintFlag').text("");
        }

        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        var dataparm = { Action: 'SetPrintFlag', TableName: mstrTableName, ID: mlngID, FlagE: lFlagE };
        //    alert(JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {
                //    alert(data);             
            });
    }
    catch (ex) {
        alert("Input.ProcSetPrintFlag" + ex.name + ex.message);
    }
}

//处理打印标志 查看附件
function ProcShowFJ() {
    var sPermStr = mstrPermString;
    if (!IsValidOperEx(document.title, sPermStr, eOperPrint)) {
        return;
    }
    try {

        var strUrl = "fmInputEx.html?";
        //if (lInputEx == 1) {
        //    strUrl = "WebInputEx.aspx?";
        //}
        var lGridType = mlngShowFJ;//附件  应该是类似 526字段

        strUrl = strUrl + "ID=" + mlngID + "&DBID=" + lGridType + "";;

        //考虑如果是审核界面，已经提交审核不能随便修改
        //if (lNeedAuth = 1) {
        //    strUrl = strUrl + "&NeedAuth=1&AuthFlag=" + lAuthFlag + "";
        //}
        //strUrl = strUrl + "&ShowSelObj=" + lShowSelObj + "";
        strUrl = strUrl + "&TableMain=" + mstrTableName + "";//作为父窗体了
        strUrl = strUrl + "&GridTypeG=" + mlngGridType + "";

        strUrl = strUrl + "&IsApp=" + mlngIsApp + "";
        strUrl = strUrl + "&now=" + new Date().getTime() + "";
        //    alert("ProcShowFJ:" + strUrl);
        mlngOperMainSub = 0;

        //  result = ShowInputDlg(strUrl);
        var lWidth = 900;
        var lHeight = 750;
        mlngOperMainSub = 0;
        result = ShowDlg(1050, 750, strUrl);
    }
    catch (ex) {
        alert("input.ProcShowFJ" + ex.name + ex.message);
    }
}


//改用新的方法，直接显示附件 

//回车txtBarCode
function onTxtBarCode(e) {
    //if (e.keyCode == 13) {
    //    alert("onTxtBarCode");
    //}

    var keyCode = null;

    if (e.which)
        keyCode = e.which;
    else if (e.keyCode)
        keyCode = e.keyCode;

    if (keyCode == 13) {
        //    alert("input.onTxtBarCode" + $("#txtbarcode").val());
        onBarAddRow(mstrTableRel, $("#txtbarcode").val());
        $("#txtbarcode").val('');

        return false;
    }
}


function GetNewTempID() {
    mlngTempID--;
}

//条形码插入
function onBarAddRow(strTable, sCode) {


    try {

        //    alert("onBarAddRow.strTable" + strTable + "Code" + sCode);

        //     alert(sBillCode);
        var sCKName = "";
        if (mlngInoutType == -1) {

            //     sCKName = txt_OutCK.GetText();
            var str = $('#OutCK').textbox('getValue');
            str = GetStrSave(str);//考虑转义问题
            sCKName = str;
        }
        sBillCode = mdtRow["Code"];//主表的Code字段

        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        var dataparm = { TableName: strTable, CLCode: sCode, CKName: sCKName, BillCode: sBillCode };
        switch (mstrTableSub.toUpperCase()) {
            case "JXC_ORDERCJB":
            case "JXC_IOCKCJB":
                dataparm["Action"] = "GetCJB";
                break;
            case "EQUIP_DJJHD"://点检计划单
            case "EQUIP_BYJHD"://保养计划大
            case "EQUIP_IO": 
            case "EQUIP_PDD"://资产盘点
            case "EQUIP_IOD"://资产出入明细单
            case "EQUIP_BY": //保养记录
            case "EQUIP_JYJLD"://检验记录单
                dataparm["Action"] = "GetEquipSB";
                dataparm["BarCode"] = sCode;
                break;
            case "HTJJ_DZD"://单章交接单
            case "HTJJ_SZD"://双章交接单
                dataparm["Action"] = "GetHTJJ";
                dataparm["BarCode"] = sCode;
                break;
        }
       //    alert(JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {

                //     alert(data);
                if (data == "-1") {
                    return;
                }
                var mjson = eval("(" + data + ")"); //
                //       alert("mbGridChange = true");
                mbGridChange = true;
                $.each(mjson.tbl, function (idx, item) {

                    InsertRowItem(item, 1);


                });

            });

    }
    catch (ex) {
        alert("intpu.onBarAddRow:" + ex.name + ":" + ex.message);
    }
}

//出师RowItem
function InitRowItem(row, item) {
    var strTableSub = mstrTableSub.toUpperCase();
 //   alert("input.InitRowItem.1" + strTableSub);
    switch (strTableSub) {

        case "VEN_PRODUCT":
            if (item.Code != undefined) {
                row.CLCode = item.Code;
            }
            if (item.Name != undefined) {
                row.CLName = item.Name;
            }
            break;
        case "EQUIP_WXPJ":
        case "EQUIP_BYPJ":
        case "JXC_ORDERCJB":
        case "JXC_IOCKCJB":
        case "JXC_BJCJB":
            //        alert("input.InsertRowItem.1" );
            if (item.Code != undefined) {
                row.CLCode = item.Code;
            }
            if (item.Name != undefined) {
                row.CLName = item.Name;
            }

            row.Amount = 1;
            row.CJPrice = 0;//先初始化再说


            //       alert("row.Cess="+row.Cess);
            if (row.Cess == undefined) {
                row.Cess = 0;
            }
            if (isNotANumber(row.Cess)) {
                row.Cess = parseFloat(row.Cess);
            }
            

            //按照新的逻辑修改  2020-03-26
            //if (mlngInoutType == -1) {
            //    row.Price = item.SalePrice;
            //} else {
            //    row.Price = item.CostPrice;
            //}
           // mlngBusinessType=2 代表销售 1 代表入库 3代表仓库操作
      //      alert("mlngBusinessType:" + mlngBusinessType);
            if ( mlngBusinessType == 2) {
                row.Price = item.SalePrice;
            } else {
                row.Price = item.CostPrice;
                var strBillDate = mdtRow["BillDate"];
                if (strBillDate != "") {
                    date = StringToDate(strBillDate);
                }
             //   alert("strBillDate"+strBillDate);
                date = date.DateAdd("d", parseInt(row.UseDate));
                var currentdate = date.Format("yyyy-MM-dd hh:mm:ss");     //获取当前日期

                row.ExpDate = currentdate;
            }

            row.CJPrice = parseFloat(row.Price) / parseFloat(1 + row.Cess / 100);
            //按照新的逻辑进行修改的

            row.SumP = parseFloat(row.Amount) * parseFloat(row.Price);

            row.SumHK = parseFloat(row.Amount) * parseFloat(row.CJPrice);

            row.SumCost = parseFloat(row.Amount) * parseFloat(row.CostPrice);

            row.SumCess = parseFloat(row.Amount) * parseFloat(row.CJPrice) * row.Cess / 100;

        //    row.ExpDate
         


            break;
        case "JXC_SFDETAIL":


            row.RelBillCode = row.Code;
            row.RelOrderType = row.OrderType;
            row.RelBillDate = row.BillDate;
            row.RelTotalPrice = row.TotalPrice;
            row.BCSFMoney = 0;
            row.Memos = "";
            break;

        case "EQUIP_PDD"://资产盘点

            row.PID = mlngID;
            row.AmountEx = row.Amount;//库存数量先弄过来
            row.PDAmount = row.AmountEx;//盘点数量等于库存数量
            row.ObjID = row.ID;//替换一下ObjID
            row.ObjCode = row.Code;
            row.ObjName = row.Name;


            break;
        case "EQUIP_DBD"://资产盘点
        case "EQUIP_DBGL":
        case "EQUIP_IOD"://资产盘点
        case "EQUIP_BYJHD"://保养计划单
        case "EQUIP_BY": //保养记录
        case "EQUIP_DJJHD"://资产盘点

            bFind = false;
            row.PID = mlngID;
            row.ObjID = row.ID;//替换一下ObjID
            row.ID = lID;//新增加的ID
            row.ObjCode = row.Code;
            row.ObjName = row.Name;

            break;

        case "EQUIP_IO"://资产盘点
            bFind = false;
            if (mlngGridType == 6117) {
                row.GHID = mlngID;
           //     row.ID = row.RelID;
            } else {
                row.PID = mlngID;
            }
         //   alert(JSON.stringify(row));
            row.ObjID = row.ID;//替换一下ObjID
         //   row.ID = lID;//新增加的ID
            row.ObjCode = row.Code;
            row.ObjName = row.Name;

            break;
        default:
            break;
    }



}


//初始化内容 1具体内容 2.是否需要初始化
function InsertRowItem(item, bNeedInit) {

    try {
      //   alert("input.InsertRowItem.row=" + JSON.stringify(item));
        //如何增加新航，
        var bFind = false;//如果找到了，就不让重复了。
        var row = item;

        //      alert("input.InsertRowItem.mstrTableSub=" + mstrTableSub+item.ID);
        var lID = mlngTempID--;//不停的减小即可
        var index = 0;
        var dgName = "dg";
        // 先查找是否有相同的
        var rows = $('#dg').datagrid('getRows');
        //      alert(mstrTableSub.toUpperCase() == "EQUIP_DJJHD");

        var strTableSub = mstrTableSub.toUpperCase();
     //   alert("input.InsertRowItem.1" + strTableSub);
        switch (strTableSub) {

            case "VEN_PRODUCT":
                if (item.Code != undefined) {
                    row.CLCode = item.Code;
                }
                if (item.Name != undefined) {
                    row.CLName = item.Name;
                }
                break;
            case "EQUIP_WXPJ":
            case "EQUIP_BYPJ":
            case "JXC_ORDERCJB":
            case "JXC_IOCKCJB":
            case "JXC_BJCJB":
              //  alert("input.InsertRowItem.2" + JSON.stringify(item));
                if (bNeedInit == 1) {
                    //        alert("input.InsertRowItem.1" );
                    if (item.Code != undefined) {
                        row.CLCode = item.Code;
                    }
                    if (item.Name != undefined) {
                        row.CLName = item.Name;
                    }

                    row.Amount = 1;
                    row.CJPrice = 0;//先初始化再说
                    if (row.CKName != undefined) {
                        if (row.CKName != "") {
                            row.Amount = row.SumAmount;
                        }
                    }
               //     alert("input.InsertRowItem.3" + strTableSub);
                    //      row.Cess = 0;      2020-02-24 自带缺省税率 

                    //如果是含税价格问题

                    //       alert("row.Cess="+row.Cess);
                    if (row.Cess == undefined) {
                        row.Cess = 0;
                    }
                    if (isNotANumber(row.Cess)) {
                        row.Cess = parseFloat(row.Cess);
                    }

                    var dAgio = 1;
                    if ($('#AgioType').length > 0) {//判断某个ID是否存在的依据
                        dAgio = $('#AgioType').textbox('getValue');
                        if (dAgio == 0) {
                            dAgio = 1;
                        }
                    }
                //    alert("input.InsertRowItem.4" + strTableSub);

                    //  if (mlngInoutType == -1) {
                    if (mlngBusinessType == 2) {
                        row.OriginPrice = item.SalePrice;//销售记住原始单价，这样才有打折的基础                      
                        row.CJPrice = item.OriginPrice * dAgio;
                    } else {

                        row.CJPrice = item.CostPrice;
                        if (mdtRow["BillDate"] != null) {//考虑有的没有这个 BillDate
                            var strBillDate = mdtRow["BillDate"];
                            if (strBillDate != "") {
                                date = StringToDate(strBillDate);
                                //   alert("strBillDate"+strBillDate);
                                date = date.DateAdd("d", parseInt(row.UseDate));
                                var currentdate = date.Format("yyyy-MM-dd hh:mm:ss");     //获取当前日期
                                row.ExpDate = currentdate;
                            }
                        }
                    }
                    row.Price = parseFloat(row.CJPrice) * parseFloat(1 + row.Cess / 100);

                    //按照新的逻辑修改  2020-03-26
                    //if (mlngInoutType == -1) {
                    //    row.OriginPrice = item.SalePrice;//销售记住原始单价，这样才有打折的基础
                 

                    //} else {
                    //    row.Price = item.CostPrice;
                    //}
                   
                 //   row.CJPrice = parseFloat(row.Price) / parseFloat(1 + row.Cess / 100);

                    //按照新的逻辑进行修改的
                    row.SumP = parseFloat(row.Amount) * parseFloat(row.Price);
                    row.SumHK = parseFloat(row.Amount) * parseFloat(row.CJPrice);
                    row.SumCost = parseFloat(row.Amount) * parseFloat(row.CostPrice);
                    row.SumCess = parseFloat(row.Amount) * parseFloat(row.CJPrice) * row.Cess / 100;

                }
          //      alert("input.InsertRowItem.3" + strTableSub);
                for (var i = 0; i < rows.length; i++) {
                    if (row.CLCode == rows[i].CLCode) {
                        bFind = true;
                        row.ID = rows[i].ID;
                        index = i;//rows[i].index;
                        row.Amount = parseFloat(rows[i].Amount) + 1;

                        UpdateRowField(row, "Amount");
                        //     alert("找到了：" + index);
                        break;
                    }
                }

                break;
            case "JXC_SFDETAIL":
                //if (bNeedInit == 1) {

                row.RelBillCode = row.Code;
                row.RelOrderType = row.OrderType;
                row.RelBillDate = row.BillDate;
                row.RelTotalPrice = row.TotalPrice;
                row.BCSFMoney = 0;
                row.Memos = "";

                //}

                break;
           
            case "EQUIP_PDD"://资产盘点

                row.PID = mlngID;
                row.AmountEx = row.Amount;//库存数量先弄过来
                row.PDAmount = row.AmountEx;//盘点数量等于库存数量
                row.ObjID = row.ID;//替换一下ObjID
                row.ObjCode = row.Code
                row.ObjName = row.Name  
                for (var i = 0; i < rows.length; i++) {
                    if (row.BarCode == rows[i].BarCode) {

                        bFind = true;
                        //    alert("找到了：" + JSON.stringify(rows[i]));
                        index = i;// rows[i].index;
                        row.ID = rows[i].ID;
                        row.PDAmount = parseFloat(rows[i].PDAmount) + 1;
                        row.PDAmount = 1;//修改逻辑 2021-04-20                   
                        row.PDMan = GetCookie("username");
                        row.PDDate = getNowFormatDate();
                        row.PDFlag = 1;//修改逻辑
                        UpdateRowField(row, "PDAmount");
                    }
                }
                if (bFind == false) {
                    UpdateRowField(row, "PDAmount");
                }
               
                break;
            case "GZ_GZDETAIL"://不重复添加内容
                row.ObjID = mlngID;        
                row.EmpID = row.ID;//替换一下ObjID      
                row.EmpMan = row.Name;
                
                for (var i = 0; i < rows.length; i++) {
                    if (row.EmpID == rows[i].EmpID) {
                        index = i;//rows[i].index;
                        row.ID = rows[i].ID;
                        bFind = true;
                    }
                }       
                if (bFind == false) {
                    lID = -1;
                    row.ID = -1;
                   
                    mlngGridChange = 1;//表示网格改动了，强制服务端保存吧

                }
                
                break;
            case "EQUIP_IO"://设备出入库
                
            case "EQUIP_DBD"://资产盘点
            case "EQUIP_DBGL":
            case "EQUIP_IOD"://资产盘点
            case "EQUIP_BYJHD":
            case "EQUIP_BY": //保养记录
            case "EQUIP_XJJLD":
            case "EQUIP_XJJHD"://资产盘点
            case "EQUIP_DJJH"://点检计划单

                //            alert("转到.EQUIP_DJJHD.row=" + JSON.stringify(row));
                //             alert("input.InsertRowItem.2");
                bFind = false;
                row.PID = mlngID;
                if (mlngGridType == 6117) {//特殊处理一下
                    row.GHID = mlngID;
                    row.ID = row.RelID;
                } else {
                    row.PID = mlngID;
                }
                row.ObjID = row.ID;//替换一下ObjID
                row.ID = lID;//新增加的ID
                row.ObjCode = row.Code
                row.ObjName = row.Name  
               
                row.ID = lID;//新增加的ID
                for (var i = 0; i < rows.length; i++) {
                    if (row.Code == rows[i].Code) {
                        index = i;
                        row.ID = rows[i].ID;
                        bFind = true;
                    }
                }

                break;
            case "HTJJ_DZD":
            case "HTJJ_SZD"://合同交接

                bFind = false;
                row.PID = mlngID;
                row.ObjID = row.ID;//替换一下ObjID
                row.ID = lID;//新增加的ID
                for (var i = 0; i < rows.length; i++) {
                    if (row.BarCode == rows[i].BarCode) {
                        index = i;
                        row.ID = rows[i].ID;
                        bFind = true;
                    }
                }

                if (bFind == true) {
                    return;//不重复扫码增加吧
                }
                break;
            case "GZ_ZTRYB":
                bFind = false;
                row.ZTID = mlngID;
                row.EmpID = row.ID;//替换一下 EmpID
                row.EmpCode = row.Code;//替换一下 EmpID
                row.EmpMan = row.Name;
                row.Department = row.NewDepartMent;
                row.ID = lID;//新增加的ID
                for (var i = 0; i < rows.length; i++) {
                    if (row.EmpID == rows[i].EmpID) {
                        index = i;
                        row.ID = rows[i].ID;
                        bFind = true;
                    }
                }

                if (bFind == true) {
                    return;//不重复扫码增加吧
                }
                break;
            default:
                break;


        }
        //    $('#dg').datagrid('appendRow', { status: 'P' });//这个写法淘汰掉 容易导致  toString()错误
        //    alert("bFind ="+ bFind)
        //       alert("input.InsertRowItem.7");
        if (bFind == false) {
            row.ID = lID;//新增加的ID
            //          alert("input.InsertRowItem.8");
            $('#dg').datagrid('appendRow', row);
            //  alert(JSON.stringify(row1));
            index = $('#dg').datagrid('getRows').length - 1;
            row.ID = lID;//新增加的ID
            if (mlngOrderType == 56 || mstrTableSub.toUpperCase() == "EQUIP_PDD") {//盘点的时候才做这个操作
                UpdateRowField(row, "PDAmount");//资产盘点
            }

        }


        $('#dg').datagrid('selectRow', index)
        //     .datagrid('beginEdit', index);
        //   alert(JSON.stringify(row1));
        //          alert("input.InsertRowItem.9");


        $('#dg').datagrid('updateRow', {
            index: index,
            row: row
        });
        OnUpdatePriceByCalcType(index, row);
        if (strTableSub == "EQUIP_PDD") {
            UpdateMainPDInfo();
        }
        
    } catch (ex) {
        alert("input.js.InsertRowItem" + ex.name + ex.message);
    }
}
//如果是先进先出方法就需要更改价格
function OnUpdatePriceByCalcType(index, row) {
 //   alert("mlngGoodsPriceCalcType:" + mlngGoodsPriceCalcType);
    if (mlngGoodsPriceCalcType != 2) {
        return;
    }
    var bReCalc = false;
    switch (parseInt(mlngOrderType)) {
        case eOrder_CKLLD:  //领料出库
        case eOrder_XSCKD:  //销售出库
        case eOrder_XSXKXSD://现款销售
            bReCalc = true;
            break;
        default:

            break;
    }
    if (bReCalc == false) {
        return;
    }

    //这个只需要取第一个价格即可
    var url = "../ajax/Main.ashx?Date='" + new Date().getTime() + "'";
    var dataparm = { };
    dataparm["Action"] = "GetPriceByCalcType";//更新价格
    dataparm["CKName"] = "";
    dataparm["CLCode"] = row.CLCode;
    var strCKName = $('#OutCK').textbox('getValue');
    dataparm["CKName"] = strCKName;
    if (row.CKName != "") {
        dataparm["CKName"] = row.CKName;
    }
    //这个数量 是个汇总数量可能是几个 批号或者单号的汇总
    if (row.SumAmount != undefined) {
        dataparm["SumAmount"] = row.SumAmount;
    }
   
    if (strCKName == "") {
      //  alert("还未选择仓库");      
        
       // return;
    }
 //    alert(JSON.stringify(dataparm));
    $.post(url,
        dataparm,
        function (data, status) {

            //     alert(data);
            try {
                if (data == "-1") {
                    return;
                }
                var mjson = eval("(" + data + ")"); //          
                mbGridChange = true;
                if (mjson.rows.length > 0) {
                    var itemT = mjson.rows[0];
                    UpdateGridPriceByCalcType(index, itemT);
                }
            }
            catch (ex) {
                alert("input.OnGridUpadtePrice" + ex.name + ex.message);
            }
    });
}
//更改当前行内容
function UpdateGridPriceByCalcType(index,itemT) {
    //成本价肯定是修改的
    var dgName = "dg";
    try {
        var rows = $('#' + dgName + '').datagrid('getRows');
        var row = rows[index];
       
        row.CostPrice = itemT.Price;//进货价
        row.PiHao = itemT.BillCode;
        row.KCAmount = itemT.KCAmount;//这个非常关键 作为判断依据
        row.Amount = itemT.KCAmount;
        UpdateRowField(row, "CostPrice");
        //对于销售单，应该更改销售价格
        if (parseInt(mlngBusinessType) == 2) {
            //   row.CJPrice = itemT.Price;//进货价
        } else {
            //对于 领用这些才需要更改所谓的成交价
            row.CJPrice = itemT.Price;//进货价
            UpdateRowField(row, "CJPrice");
        }

        $('#dg').datagrid('updateRow', {
            index: index,
            row: row
        });
        $('#dg').datagrid('refreshRow', index);//刷新改行内容 加上这句话就可以强制刷新了，非常好用

    } catch (ex) {
        alert("input.UpdateGridPriceByCalcType" + ex.name + ex.message);
    }    
}
function OnAddRow(rowsjson) {
    // onBatchAddRow(mstrTableRel,sIDlist);
    try {

   //     alert("input.OnAddRow:" + rowsjson);
     //   console.log("input.OnAddRow:" + 11);
        var rows = eval("(" + rowsjson + ")");
        for (var i in rows) {
            var item = rows[i];
            InsertRowItem(item, 1);            
        }
      //  console.log("input.OnAddRow:" + 22);
        OnGridUpadtePriceByVender();
       // console.log("input.OnAddRow:" + 33);
        //进销存部分汇总自动计算
    //    if (mlngOrderType > 0) {
            //计算总价格
   //     console.log("TotalPrice.length:"+ $('#TotalPrice').length);
            if ($('#TotalPrice').length > 0) {//判断某个ID是否存在的依据
                //       alert("存在主表该字段内容");
                var total = GridTotalCol("dg", "SumP");
                $('#TotalPrice').textbox('setValue', total);
            }
      //  }

        if ($('#RSCount').length > 0) {//判断某个ID是否存在的依据
            //       alert("存在主表该字段内容");
          
            var rows = $('#dg').datagrid('getRows');
            var total = rows.length;
            $('#RSCount').textbox('setValue', total);
        }

    } catch (ex) {
        alert("input.js.OnAddRow" + ex.name + ex.message);
    }
}


// 考虑到 如果是先进先出办法，就调用 对应的入库价格
//选择供应商之后，就开始下载该供应商价格 ，方法一方法二，选择了商品资料再下载价格，根据需要下载
function OnGridUpadtePriceByVender() {
    var bHas = false;
    try {
        if (mstrDBType == "OrderID") {
            switch (parseInt(mlngOrderType)) {
                case eOrder_CKCPJCD:
                case eOrder_CGRKD:
                    bHas = true;
                    break;

            }
        }

        if (bHas == false)
            return;


        if ($('#Vender').length > 0) {
            var strVender = $('#Vender').textbox('getValue');
            if (strVender == "") {
                alert("还未选择供应商");
                return;
            }
            UpadtePriceByVender(strVender);
        }
       
    } 
    catch (ex) {
        alert("input.js.OnGridUpadtePriceByVender" + ex.name + ex.message);
    }
}



//根据 供应商更改价格 根据先进先出法修改价格都是可以考虑的
function UpadtePriceByVender(strVender) {

    //    alert("GridUpadtePrice.strVender=" + strVender);
    //分为整体跟新和局部更新
    try {
        if (mlngGridTypeC < 1) {
            return;
        }
        var dgName = "dg";
        var sCodeList = '';
        var rows = $('#' + dgName + '').datagrid('getRows');
        var total = 0;
        for (var i = 0; i < rows.length; i++) {
            sCodeList = sCodeList + ",'" + rows[i]["CLCode"] + "'";
        }
        if (sCodeList.substr(0, 1) == ",") {
            sCodeList = sCodeList.substr(1, sCodeList.length - 1);
        }

        var url = "../ajax/Main.ashx?Date='" + new Date().getTime() + "'";
        var dataparm = { Vender: strVender, CLCodeList: sCodeList };
        dataparm["Action"] = "UpadtePriceByVender";//更新价格
        //   alert(JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {

                //     alert(data);
                try {
                    if (data == "-1") {
                        return;
                    }
                    var mjson = eval("(" + data + ")"); //          
                    mbGridChange = true;

                    var rows = $('#' + dgName + '').datagrid('getRows');
                    var total = 0;
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        UpdateItemPriceByVender(row, mjson.rows);
                        var index = i;
                        UpdateRowField(row, "CJPrice");
                        //        alert('row.CJPrice=' + row.CJPrice + 'index=' + index);
                        //        alert('row='+JSON.stringify(row));
                        //这个地方无法及时刷新啊 updateRow 这里无法及时更新问题
                        $('#' + dgName + '').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                        $('#dg').datagrid('refreshRow', index);//刷新改行内容 加上这句话就可以强制刷新了，非常好用

                    }
                }
                catch (ex) {
                    alert("input.OnGridUpadtePrice" + ex.name + ex.message);
                }



            });
    }
    catch (ex) {
        alert("input.OnGridUpadtePrice" + ex.name + ex.message);
    }
}

///更改售价 从供应商的的价格列表中获取
function UpdateItemPriceByVender(row, priceitemlist) {
    //  alert("开始查找！priceitemlist=" + JSON.stringify(priceitemlist));
    //   try{
    for (var j = 0; j < priceitemlist.length; j++) {
        var itemT = priceitemlist[j];
        //     
        //   alert("row.CLCode:" + row.CLCode + "itemT.CLCode=" + itemT.CLCode);
        if (row.CLCode == itemT.CLCode) {
            //     alert("开始查找！itemT=" + JSON.stringify(itemT));
            if (mlngInoutType == 1) {
                row.CJPrice = itemT.CostPrice;//进货价 购买价格
            } else {
                row.CJPrice = itemT.SalePrice;//进货价
            }
            //   alert(JSON.stringify(itemT));
            //    alert("找到了！mlngInoutType=" + mlngInoutType + "itemT.CLCode:" + itemT.CLCode + 'row.CJPrice=' + row.CJPrice);
            break;
        }
    }
    //}
    //catch (ex) {
    //    alert("input.UpdateItemPriceByVender" + ex.name + ex.message);
    //}
}


//批量插入模式 对于引用模式的
function OnAddRelOrder(strTable, sIDList) {
    //        for (var i = 0; i < 3; i++) {            
    //修改为 查找模式，传递的 JSON也能够解决问题                
    //var strTable = document.getElementById("hid_tablerel").value;
    //var strIDList = "";
    try {
        //      alert("input.OnAddRelOrder.strTable" + strTable + "sIDList" + sIDList);

        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        var dataparm = { TableName: strTable, IDList: sIDList };
        dataparm["Action"] = "GetRelList";
        dataparm["OrderType"] = mlngOrderType;//当前的ID

        dataparm["TableDst"] = mstrTableName;//增加一个 要插入的表格

        //       alert(JSON.stringify(dataparm));

        $.post(url,
            dataparm,
            function (data, status) {
                try {
                    //           alert("input.OnAddRelOrder.data=" + data);
                    if (data == "-1") {
                        return;
                    }
                    var mjson = eval("(" + data + ")"); //
                    //     var mjson = JSON.parse("(" + data + ")"); //
                    //       alert("mbGridChange = true");
                    mbGridChange = true;
                    $.each(mjson.tbl, function (idx, item) {

                        InsertRowItem(item);
                    });

                }
                catch (ex) {

                    $("#txtbarcode").val(data);
                    alert("商品资料中含有双引号信息内容，导致无法插入，请先在商品资料中去掉单引号和双引号内容，然后重新做单！错误信息：input.OnAddRelOrder" + ex.name + ex.message);
                }


            });

    }
    catch (ex) {
        alert("input.OnAddRelOrder" + ex.name + ex.message);
    }
}

//不管是主表还是从表，都是从这里返回获得缺参数
//sVal=sIDList,sText=sTextList
function OnSetValue(sVal, sText) {
    try {

        //       alert(mstrFieldName);
      //  alert1(mstrFieldName + "sText:" + sText);
        sField = mstrFieldName;
        if (mlngIsSub == 1) {
            sField = mstrFieldName.substring(3);
        }
        var sField = GetRelFieldName(sField);

       
        switch (sField) {
            case "clcode":
                UpdateCJB(sText);
                break;
            case "cjprice":

                break;
            //case "groupid":
            //    clientid.SetText(sVal + "|" + sText);
            //    break;
            //case "equiptype":
            //    clientid.SetText(sText);
            //    break;
            //case "permid":// 权限ID
            //    clientid.SetText(sVal + "|" + sText);
            //    break;
            //case "department"://全部都改为下拉了
            //    clientid.SetText(sText);
            //    break;
            case "customer":
                //    clientid.SetText(sText); //根据客户信息更改其他，这里其实要传json
                UpdateCrm(sText);
                break;
            case "skcorp"://SKCorp
            case "vender":
                //      clientid.SetText(sText); //根据客户信息更改其他，这里其实要传json
                UpdateVender(sText);
                break;
            case "objid":
                //   clientid.SetText(sVal + "|" + sText);
                //$('#ObjID').textbox('setValue', sVal + "|" + sText);
                //      $('#ObjID').textbox('setValue', sVal + "|" + sText);
                //   alert("objid选择返回来！");
                UpdateObjInfo(sText);
                break;
            case "parentid":       
                UpdateParentInfo(sText);
                break;
            case "gxid":
                UpdateGXInfo(sText);
                break
            case "gzid":
                UpdateGZInfo(sText);
                break
            case "userlistperm":

            case "authmanlist":
            case "tipmanlist":
            case "userlist":

                //要合并
                var strList = $('#' + mstrFieldName + '').textbox('getValue');
                strList = MergeList(strList, sText);
                $('#' + mstrFieldName + '').textbox('setValue', strList);
                break;

            case "fileperm":
                var strList = $('#' + mstrFieldName + '').textbox('getValue');
                //       alert("sText:" + sText);
                strList = MergeList(strList, sText);

                //clientid.SetText(strList);
                $('#' + mstrFieldName + '').textbox('setValue', strList);
                break;

            case "mxlist":
                var strList = $('#' + mstrFieldName + '').textbox('getValue');
                strList = MergeList(strList, sText);
                //      alert(strList);
                $('#' + mstrFieldName + '').textbox('setValue', strList);
                //  clientid.SetText(sVal.toString());
                break;
            case "bycont":
             ///  alert("Input.OnSetValue.sText=" + sText);
                //      $('#' + mstrFieldName + '').textbox('setValue', sText);
                var rows = eval("(" + sText + ")"); //
                MergeItemGrid(mstrGridField, rows);
                break;
            case "xjcont"://巡检内容
            case "djcont"://点检内容
            
                
                var item = GetMainInputItem(mstrFieldName);
           //     alert("onsetvalue.item.Style:" + item.Style + "item="+JSON.stringify(item));
                if (item.Style == eCtrlTagBox) {
                    var strFiled = "tagbox" + mstrFieldName;
                    var strList = $('#' + strFiled + '').tagbox('getValues');
                //    alert(strList);
                    strList = MergeList(strList, sText);
                    
                    $('#' + strFiled + '').tagbox('setValues', strList);
                } else {
                    var strList = $('#' + mstrFieldName + '').textbox('getValue');
                    strList = MergeList(strList, sText);
                    $('#' + mstrFieldName + '').textbox('setValue', strList);
                }

                break;
            case "execcont"://返回数据的// 下面网格端的内容
                //详细处理，很复杂的
                UpdateExecCont(sText);
                break;
            //case "bycont":

            //    break;
            case "pihao"://返回数据的// 下面网格端的内容
                //详细处理，很复杂的
              //  alert("pihao.sText:"+sText);
                var row = eval("(" + sText + ")");
                //if (rows.length > 0) {
                    UpdateGridPriceByCalcType(editIndex, row);
                //}                
                break;
            default:
                // clientid.SetText(sText);
                $('#' + mstrFieldName + '').textbox('setValue', sText);
                //    UpdateSetText(sText);
                break;
        }


    }
    catch (e) {
        alert("input.OnSetValue.e.name" + e.name + "e.message: " + e.message);
    }
}

//更改当前行
function UpdateExecCont(strRetObj) {
    try {

        //分为主表和从表的内容

        var retObj = eval("(" + strRetObj + ")");
        if (mlngIsSub == 1) {
            var rows = $('#dg').datagrid('getRows');
            var index = editIndex;
            var row = rows[index];
            row.NoPass = retObj.NoPass;
            row.Result = retObj.Result;
            row.ExecCont = retObj.ExecCont;

            $('#dg').datagrid('updateRow', {
                index: index,
                row: { data: row }
            });
        } else {
            //更新主表的内容
            //     row.ExecCont = retObj.ExecCont;
            $('#Result').textbox('setValue', retObj.Result);
            $('#NoPass').textbox('setValue', retObj.NoPass);
            //    alert("UpdateExecCont.retObj.ExecCont=" + retObj.ExecCont);
            var rows = eval("(" + retObj.ExecCont + ")");

            UpdateItemGrid(mstrGridField, rows);
        }
    }
    catch (e) {
        alert("input.UpdateExecCont" + e.name + ": " + e.message);
    }
}




//更改Vender相关信息
function UpdateVender(strJson) {
    try {
        //        alert(strJson);
        var item = eval("(" + strJson + ")"); //
        str = GetStrShow(item.Name); $('#' + mstrFieldName + '').textbox('setValue', str);

        switch (mstrFieldName.toLocaleUpperCase()) {
            case "VENDER":
                str = GetStrShow(item.Name); $('#Vender').textbox('setValue', str);
                str = GetStrShow(item.Code); $('#VenderCode').textbox('setValue', str);
                str = GetStrShow(item.LinkMan); $('#LinkMan').textbox('setValue', str);
               
                str = GetStrShow(item.CorpTel); $('#CorpTel').textbox('setValue', str);
                str = GetStrShow(item.CorpFax); $('#CorpFax').textbox('setValue', str);
                str = GetStrShow(item.CorpAddress); $('#CorpAddress').textbox('setValue', str);

                break;
            case "VENDER1":
                str = GetStrShow(item.LinkMan); $('#LinkMan1').textbox('setValue', str);
                str = GetStrShow(item.CorpTel); $('#CorpTel1').textbox('setValue', str);
                break;
            case "VENDER2":
                str = GetStrShow(item.LinkMan); $('#LinkMan2').textbox('setValue', str);
                str = GetStrShow(item.CorpTel); $('#CorpTel2').textbox('setValue', str);
                break;
            case "VENDER3":
                str = GetStrShow(item.LinkMan); $('#LinkMan3').textbox('setValue', str);
                str = GetStrShow(item.CorpTel); $('#CorpTel3').textbox('setValue', str);
                break;
            case "SKCORP":
                str = GetStrShow(item.CorpBankNumber); $('#SKCode').textbox('setValue', str);
                str = GetStrShow(item.CorpBankName); $('#SKBankName').textbox('setValue', str);
                str = GetStrShow(item.CorpTaxNumber); $('#SKTaxNumber').textbox('setValue', str);
                
                break;
        }
        
        //更新 已收付款情况，未收付款情况
        //if (typeof (lblMsg) != 'undefined') {
        //    lblMsg.SetText("供应商:" + item.Name + "总货款：" + item.TotalJE + "应付款" + item.TotalWSFMoney);
        //}
    }
    catch (e) {
        alert("input.UpdateVender" + e.name + ": " + e.message);
    }


}

//更改采材机表明细
function UpdateCJB(strJson) {
    try {
        var item = eval("(" + strJson + ")"); //
        //alert(item.Name);
        str = GetStrShow(item.Code); $('#CLCode').textbox('setValue', str);
        str = GetStrShow(item.Name); $('#CLName').textbox('setValue', str);
        str = GetStrShow(item.XHType); $('#XHType').textbox('setValue', str);
        str = GetStrShow(item.Unit); $('#Unit').textbox('setValue', str);
        str = GetStrShow(item.SalePrice); $('#Price').textbox('setValue', str);
        str = GetStrShow(item.Unit); $('#Unit').textbox('setValue', str);
        str = GetStrShow(item.SalePrice); $('#SumP').textbox('setValue', str);
    }
    catch (e) {
        alert("input.UpdateCJB" + e.name + ": " + e.message);
    }
}

function UpdateCrm(strJson) {
    //  alert(strJson);
    try {
        var item = eval("(" + strJson + ")"); //
        //   alert(item.Name);
        mlngObjID = item.ID;
        str = GetStrShow(item.Name); $('#Customer').textbox('setValue', str);
        str = GetStrShow(item.Code); $('#CustomerCode').textbox('setValue', str);
        str = GetStrShow(item.LinkMan); $('#LinkMan').textbox('setValue', str);
        str = GetStrShow(item.CorpTel); $('#CorpTel').textbox('setValue', str);
        str = GetStrShow(item.CorpFax); $('#CorpFax').textbox('setValue', str);
        str = GetStrShow(item.CorpAddress); $('#CorpAddress').textbox('setValue', str);
    }
    catch (e) {
        alert("JSInput.UpdateCrm" + e.name + ": " + e.message);
    }
}


function UpdateObjInfo(strJson) {
    //  alert(strJson);
    try {
        var item = eval("(" + strJson + ")"); //
        mlngObjID = item.ID;
        
        //   alert("UpdateObjInfo:"+item.Name);
        str = GetStrShow(item.Name); mstrObjName = str; $('#ObjName').textbox('setValue', str);
        str = GetStrShow(item.Code); mstrObjCode = str; $('#ObjCode').textbox('setValue', str);

        //考虑到调拨问题
        switch (parseInt(mlngGridType)) {
            case 5008:
            case 6008:
                //        alert("UpdateObjInfo" + mlngGridType + JSON.stringify(item));

                str = GetStrShow(item.UseDepartment); mstrObjCode = str; $('#OldDepartment').textbox('setValue', str);
                str = GetStrShow(item.BGMan); mstrObjCode = str; $('#OldBGMan').textbox('setValue', str);
                str = GetStrShow(item.Address); mstrObjCode = str; $('#OldAddress').textbox('setValue', str);
                str = GetStrShow(item.UseTeam); mstrObjCode = str; $('#OldTeam').textbox('setValue', str);
                break;

        }

        $('#ObjID').textbox('setValue', item.ID + "|" + item.Name);
        UpdateParentObjInfo(mdtGridG, item);


    }
    catch (e) {
        alert("Input.UpdateObjInfo" + e.name + ": " + e.message);
    }
}
function UpdateParentInfo(strJson) {
    //  alert(strJson);
    try {
        var item = eval("(" + strJson + ")"); //
       // mln = item.ID;

        //   alert("UpdateObjInfo:"+item.Name);
        str = GetStrShow(item.Name);  $('#ParentName').textbox('setValue', str);
        str = GetStrShow(item.Code); $('#ParentCode').textbox('setValue', str);
        str = GetStrShow(item.ID); $('#ParentID').textbox('setValue', str);


    }
    catch (e) {
        alert("Input.UpdateParentInfo" + e.name + ": " + e.message);
    }
}
//更改工序信息
function UpdateGXInfo(strJson) {
    //  alert(strJson);
    try {
        var item = eval("(" + strJson + ")"); //
        // mln = item.ID;

        //   alert("UpdateObjInfo:"+item.Name);
        str = GetStrShow(item.Name); $('#Name').textbox('setValue', str);
        str = GetStrShow(item.Code); $('#Code').textbox('setValue', str);
        str = GetStrShow(item.ID); $('#GXID').textbox('setValue', str);
        str = GetStrShow(item.Price); $('#Price').textbox('setValue', str);

        str = GetStrShow(item.GroupName);
        if ($('#GroupName').length >0) {
            $('#GroupName').textbox('setValue', str);
        }
        str = GetStrShow(item.GroupCode);
        if ($('#GroupCode').length > 0) {
            $('#GroupCode').textbox('setValue', str);
        }  
        str = item.Code + " " + item.Name;
        if ($('#GXCodeName').length > 0) {
            $('#GXCodeName').textbox('setValue', str);
        }
      
    }
    catch (e) {
        alert("Input.UpdateGXInfo" + e.name + ": " + e.message);
    }
}
//更改工种信息
function UpdateGZInfo(strJson) {
    //  alert(strJson);
    try {
        var item = eval("(" + strJson + ")"); //
        // mln = item.ID;

        //   alert("UpdateObjInfo:"+item.Name);
        str = GetStrShow(item.Name); $('#GZName').textbox('setValue', str);
        str = GetStrShow(item.Code); $('#GZCode').textbox('setValue', str);
        str = GetStrShow(item.ID); $('#GZID').textbox('setValue', str);
        str = GetStrShow(item.Price); $('#Price').textbox('setValue', str);
        //考虑扩充情况
        str = item.Code + " " + item.Name;
        if ($('#GZCodeName').length > 0) {
            $('#GZCodeName').textbox('setValue', str);
        }

    }
    catch (e) {
        alert("Input.UpdateGZInfo" + e.name + ": " + e.message);
    }
}






//网格 Combox 下拉选择
function onGridGetTextCombox(value, row) {
    //   alert("onGridGetTextCombox.value" + value);
    return value;
}

function GetObjInfo(barCode) {
    try {
        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        //    AddRow();
        //ID<1的也可能在数据库中啊
        //if (parseInt(sID) < 1) {
        //    $('#dg').datagrid('deleteRow', index);
        //    return;
        //}
        var dataparm = null;
        if (mlngOrderType > 0) {

            dataparm = { ID: mlngID, ObjID: mlngObjID, OrderID: mlngOrderType, GridType: mlngGridType };
            dataparm["Code"] = mstrCode;
        } else {
            dataparm = { ID: mlngID, ObjID: mlngObjID, DBID: mlngDBID, GridType: mlngGridType };
        }
        dataparm["BarCode"] = barCode;
        dataparm["Action"] = "getmaininfo";

        //   alert(JSON.stringify(dataparm));
        //   console.log("GetObjInfo:" + JSON.stringify(dataparm));
        $.post(url,
            dataparm,
            function (data, status) {
                //      console.log("GetObjInfo.数据：" + data + "\n状态：" + status);
                //      alert("GetObjInfo.数据：" + data + "\n状态：" + status);

                var dtMain = eval("(" + data + ")");
                if (dtMain.rows.length > 0) {
                    var item = dtMain.rows[0];
                    mlngObjID = item.ID;
                    mstrObjCode = item.Code;
                    mstrObjName = item.Name;
                    //  $("#divobjid").html(item.ID + "|" + item.Name);
                    $('#ObjID').textbox('setValue', item.ID + "|" + item.Name);
                } else {
                    //    $("#divobjid").html('' + barCode + '不存在');
                    $('#ObjID').textbox('setValue', "");
                    $('#ObjID').textbox({ prompt: '' + barCode + '不存在,请重新扫码', width: '100%', height: '35px' });
                    $('#ObjID').textbox().next('span').find('input').focus();
                    mlngObjID = -1;
                    mstrObjCode = "";
                    mstrObjName = "";
                }


            });
    }
    catch (ex) {
        alert("GetObjInfo:" + ex.message);
    }
}


//二维码返回调用界面会用这个 条码扫描
function scaned(t, r, f) {
    console.log("scaned" + r + "mlngIsSub:" + mlngIsSub);
    if (mlngIsSub == 0) {
        var barcode = document.getElementById("ObjID");
        //    var barcode = document.getElementById("barcode");
        if (barcode) {
            console.log("barcode不为空" + r);
            barcode.value = r;
            //查找一下
            //   console.log("scaned.GetObjInfo" + r);
            GetObjInfo(r);
        }
    } else {
        var barcode = document.getElementById("txtbarcode");
        if (barcode) {
            console.log("barcode不为空" + r);
            barcode.value = r;
            //直接调用吧
            onBarAddRow(mstrTableRel, $("#txtbarcode").val());
            $("#txtbarcode").val('');
        }

    }

}

//浏览主ID 条码扫描 APP调用
function onShowScanMain() {
    mlngIsSub = 0;
    clicked('../WebMob/CYBus/barcode_scan2.html', true, true);
}

//浏览从表 BarCode 条码扫描 APP调用
function onShowScanSub() {
    mlngIsSub = 1;
    clicked('../WebMob/CYBus/barcode_scan2.html', true, true);
}

//正在保存
function onShowSaveing(msg) {
    if (msg == undefined) {
        msg = "正在保存数据，请耐心等待。。。";
    }
    //$("<div  class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");
    //$("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });


    var wrap = $('#divNorth');
    if (mlngOrderType > 0 || mlngGridTypeC > 0) {
        wrap = $('#bodyMain');
    }
    //  var wrap = $('#bodyMain');
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: wrap.width(), height: wrap.height() }).appendTo(wrap);
    $("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo(wrap).css({ display: "block", left: (wrap.width() - $("div.datagrid-mask-msg", wrap).outerWidth()) / 2, top: (wrap.height() - $("div.datagrid-mask-msg", wrap).outerHeight()) / 2 });

}

///正在加载信息
function onloading(msg) {
    if (msg == undefined) {
        msg = "正在加载，请稍候。。。";
    }
    //$("<div  class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");
    //$("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });


    var wrap = $('#divNorth');
    if (mlngOrderType > 0 || mlngGridTypeC > 0) {
        wrap = $('#bodyMain');
    }
    //  var wrap = $('#bodyMain');
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: wrap.width(), height: wrap.height() }).appendTo(wrap);
    $("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo(wrap).css({ display: "block", left: (wrap.width() - $("div.datagrid-mask-msg", wrap).outerWidth()) / 2, top: (wrap.height() - $("div.datagrid-mask-msg", wrap).outerHeight()) / 2 });

}
//
function removeload() {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}


//导出Excel
function GridExportExcel() {//导出Excel文件

    //   alert("gridexport");
    //getExcelXML有一个JSON对象的配置，配置项看了下只有title配置，为excel文档的标题

    try {
        var data = $('#dg').datagrid('getExcelXml', { title: '导出Excel' }); //获取datagrid数据对应的excel需要的xml格式的内容
        //用ajax发动到动态页动态写入xls文件中
        var url = '../Ajax/Export.ashx'; //如果为asp注意修改后缀
        var reg = new RegExp("<BR>", "g");
        data = data.replace(reg, "\n");
        $.ajax({
            url: url, data: { data: data, Caption: mstrOrderCaption }, type: 'POST', dataType: 'text',
            success: function (fn) {
                alert('导出Excel成功！' + fn);
                //       window.location.href = fn; //执行下载操作
                //     window.open(fn);//容易被拦截，很麻烦
                //var tw=window.open('_blank'); 
                //tw.location = fn;
                fn = encodeURI(fn);
                //   alert(fn);
                //var strHtml = "DlgDown.html?url=" + fn + "";
                //ShowDlg(600, 300,strHtml);
                var strUrl = '../Ajax/DownFile.ashx?FilePath=' + fn + ''
                window.open(strUrl);

            },
            error: function (xhr) {
                alert('动态页有问题\nstatus：' + xhr.status + '\nresponseText：' + xhr.responseText)
            }
        });
    }
    catch (ex) {
        alert("input.js.GridExportExcel：" + ex.message);
    }
}

//打印到Word文档 
function ProcPrintWord() {
    try {


        var sPerm = mstrPermString;
        if (!IsValidHandler(sPerm, eOperPrint)) {
            $.messager.alert("提示", "当前用户无打印权限，需要获得该操作的【打印】权限，请联系管理员开通");
            return;
        }

        //if (parseInt(mlngRptFileID) < 1) {
        //    alert("还未设置打印的WordExcel模版，请先设置好模版！");
        //    mlngRptFileID = -1;//自动选择缺省的吧
        //}
        MaskUtil.mask("正在导出Word/Excel报表，请耐心等待...");
        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        //    AddRow();
        var dataparm = null;
        if (mlngOrderType > 0) {
            dataparm = { ID: mlngID, OrderID: mlngOrderType, GridType: mlngGridType };
        } else {
            dataparm = { ID: mlngID, DBID: mlngDBID, GridType: mlngGridType };
        }
     
        var strType = "html";
        dataparm["Action"] = "printword";
      //  dataparm["RptFileID"] = mlngRptFileID;
        dataparm["RptFileID"] = -1;
        dataparm["FileType"] = strType;
        if (mlngRptFileID == null || mlngRptFileID == "null") {
            mlngRptFileID = 0;
        }
        //  alert('mlngRptFileID' + mlngRptFileID);
        //if (parseInt(mlngRptFileID) < 1) {
        //    alert('还未设置缺省报表模版文件！');
        //    return;
        //}
        $.post(url,
            dataparm,
            function (data, status) {
                MaskUtil.unmask();

                try {
                    if (data == "-2") {
                        alert('还未设置模版文件或者模版文件已经被删除！' + data);
                        return;
                    }

                    var json = JSON.parse(data);
                    //     alert(data);
                    //    alert(json.FilePath);
                    if (json.ErrMsg != "") {
                        alert("ShowSetPreviewExport:" + json.ErrMsg);
                        return;
                    }
                    if (json.FileUrl != "" && strType == "html") {
                        //     window.open(json.FileUrl);
                        var fn = encodeURI(json.FileUrl);
                        var strUrl = "../RptTemp/Print.html?url=" + fn + "";
                        //      alert(strUrl);
                        ShowDlg(1250, 900, strUrl);
                        //   ShowDlg(1050, 900, json.FileUrl + "?1=1");
                    } else {
                        alert('导出Word成功！' + json.FilePath + "?1=1");
                        var fn = encodeURI(json.FilePath);
                        var strUrl = '../Ajax/DownFile.ashx?FilePath=' + fn + ''
                    }

                }
                catch (ex) {
                    alert("input.js.ProcPrintWord.onerror：" + data + "errrmsg:" + ex.message);
                }

            });
    }
    catch (ex) {
        alert("input.js.ProcPrintWord：" + ex.message);
    }
}
//动态 注意加载附件
function RefreshData() {
    
    if (mlngShowFJ > 0) {
        LoadFJ(mlngID, mlngShowFJ, "");
    } else {
 //       alert("Input.RefreshData.LoadProp.mlngShowFJ。2" + mlngShowFJ);
     //   location.reload();//重新加载一下 可以改进，直接加载属性
        reLoadProp();
      //  LoadProp(mlngID, mlngGridTypeC, "");//试一下看看能否加载
    }
    //针对导入的也可以刷新吗
    
}


//动态创建录入界面
function reLoadProp() {

    try {
        var url = "../ajax/Input.ashx?Date='" + new Date().getTime() + "'";
        //    AddRow();
        //  MaskUtil.mask("正在加载数据...");
        //   alert("onCreateUI.mlngShowSelObj" + mlngShowSelObj);
        onloading();

        var dataparm = null;
        //   alert("onCreateUI:mlngOrderType=" + mlngOrderType + "mlngGridType:" + mlngGridType);
        if (mlngOrderType > 0) {
            dataparm = { ID: mlngID, ObjID: mlngObjID, OrderID: mlngOrderType, GridType: mlngGridType };
        } else {
            dataparm = { ID: mlngID, ObjID: mlngObjID, DBID: mlngDBID, GridType: mlngGridType };
        }
        dataparm["NeedAuth"] = mlngNeedAuth;
        dataparm["AuthFlag"] = mlngAuthFlag;
        dataparm["AddLike"] = mlngAddLike;
        dataparm["DBSrcType"] = mlngDBSrcType;
        dataparm["GroupID"] = mlngGroupID;
        dataparm["Action"] = "getpropjson";

        if (mstrSubIDList != "") {
            dataparm["SubIDList"] = mstrSubIDList;
        }
        if (mstrTableRelIn != "") {
            dataparm["TableRelIn"] = mstrTableRelIn;
        }
        if (mlngRelID > 0) {
            dataparm["RelID"] = mlngRelID;
        }
        if (mlngRelDBID > 0) {
            dataparm["RelDBID"] = mlngRelDBID;
        }
        if (mstrCode != "") {
            dataparm["Code"] = mstrCode;
        }
        if (mlngPID > 0) {
            dataparm["PID"] = mlngPID;
        }

        //  alert("onCreateUI:dataparm=" + JSON.stringify(dataparm));

        $.post(url,
            dataparm,
            function (data, status) {
                //     alert(data);
                if (data == "-5") {
                    alert("非法请求缺少CorpName字段或者UserNam字段");
                }
                //        alert("input.onCreateUI" + data);
                //    alert("数据：" + data + "\n状态：" + status);
                var json = eval("(" + data + ")");
                ///    alert(JSON.stringify(json.rows));
                //  $("#dg").datagrid("loadData", json.rows);

                //重新加载一次数据即可
                $('#dg').datagrid('loadData', json.table);
                removeload();
                //   MaskUtil.unmask();

            });


        if (mlngIsApp == 1) {

            if (mlngShowSelObj != 1) {
                $('#divobj').hide();
            }
        }
        else {
            $('#divobj').hide();
        }
    }
    catch (ex) {
        alert("removeRow:" + ex.message);
    }
}


function isNotANumber(inputData) {
    //isNaN(inputData)不能判断空串或一个空格
    //如果是一个空串或是一个空格，而isNaN是做为数字0进行处理的，而parseInt与parseFloat是返回一个错误消息，这个isNaN检查不严密而导致的。
    if (inputData == null) {
        return true;
    }
    if (parseFloat(inputData).toString() == "NaN") {
        //alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
        return false;
    } else {
        return true;
    }
}

function isNumber(val) {

    if (val === "" || val == null) {
        return false;
    }
    if (!isNaN(val)) {
        //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：‘123‘、[]、[2]、[‘123‘],isNaN返回false,
        //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === ‘number‘ )
        return true;
    }

    else {
        return false;
    }
}

var mObjFieldClear = [{
    iconCls: 'icon-clear',
    handler: onTextClear

}];


//主表字段 点查询 WebInput调用的
function onTextClear(e) {

    //  $(e.data.target).textbox('clear');
    $(e.data.target).textbox('clear').textbox('textbox').focus();
    $(this).css('visibility', 'hidden');
}

//增加
function AddBtnClear(item) {
    //   var t = $(this);
    //  var t = $('#' + sCode + '').textbox().textbox('addClearBtn', 'icon-clear');
    try {
        //return;
    //    alert("find.js.AddClearBtn11:" + sCode);
        var t = $('#' + item.Code + '');//.textbox();
        var opts = t.textbox('options');
        //  opts.icons;
        //   alert("find.js.AddClearBtn2:" + sCode+JSON.stringify(opts.icons));
        var objIcons = [];
        connectjson(objIcons, mObjFieldClear);
        if (opts.icons.length > 0) {
            connectjson(objIcons, opts.icons);
        }

        //    alert("find.js.AddClearBtnafter:" + sCode + JSON.stringify(opts.icons));
        //     
        t.textbox({ icons: objIcons });
        //   t.textbox();
        if (!t.textbox('getText')) {
            t.textbox('getIcon', 0).css('visibility', 'hidden');
        }
        t.textbox('textbox').bind('keyup', function () {
            var icon = t.textbox('getIcon', 0);
            if ($(this).val()) {
                icon.css('visibility', 'visible');
            } else {
                icon.css('visibility', 'hidden');
            }
        });
        //     alert("find.js.AddClearBtn3:" + sCode);
        t.textbox('textbox').bind('blur', function () {
            var icon = t.textbox('getIcon', 0);
            if ($(this).val()) {
                icon.css('visibility', 'visible');
            } else {
                icon.css('visibility', 'hidden');
            }
        });
        //switch (item.Style) {
        //    case eCtrlComboBox:
        //        t.combobox({
        //            //添加清除图标
        //            icons: [{
        //                iconCls: 'icon-clear',
        //                handler: function (e) {
        //                    t.combobox('clear');
        //                }
        //            }],
        //        });
        //        break;
        //    default:
        //    //case eCtrlTextBox:
        //        t.textbox({
        //            //添加清除图标
        //            icons: [{
        //                iconCls: 'icon-clear',
        //                handler: function (e) {
        //                    t.combobox('clear');
        //                }
        //            }],
        //        });
        //        break;
        //}        

        var icon = t.textbox('getIcon', 0);
        if (item.Value!="") {
            icon.css('visibility', 'visible');
        } else {
            icon.css('visibility', 'hidden');
        }

    }
    catch (ex) {
        alert("find.js.AddClearBtn:" + ex.message);
    }
}

//增加查看打开按钮
function AddBtnUpload(item) {
    //   var t = $(this);
    //  var t = $('#' + sCode + '').textbox().textbox('addClearBtn', 'icon-clear');
    try {
        return;
        //    alert("find.js.AddClearBtn11:" + sCode);
        var t = $('#' + item.Code + '');//.textbox();
        var opts = t.textbox('options');
        //  opts.icons;
        //   alert("find.js.AddClearBtn2:" + sCode+JSON.stringify(opts.icons));
        var objIcons = [];
        connectjson(objIcons, mObjFileUpload);
        if (opts.icons.length > 0) {
            connectjson(objIcons, opts.icons);
        }
    }
    catch (ex) {
        alert("find.js.AddBtnUpload:" + ex.message);
    }
}

//var mObjFileUpload = [
//    { iconCls: 'icon-open', text: '打开', handler: onMainInputFile('open') },
//    { iconCls: 'icon-up', text: '上传', handler: onMainInputFile('upload') }
//];
