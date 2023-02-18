//获取主表选中内容
function GetSelMainList() {
    var idlist = "";
    try {
        if (mlngShowTree == 1) {
            idlist = GetTreeSelList("tg");
        } else {
            idlist = GetSelCheckList("dgMain");
        }
    } catch (ex) {
  //      alert("");
    }
    
    return idlist;
}

function GetSelMainListByDg(dgName) {
    var idlist = "";
    if (mlngShowTree == 1) {
        idlist = GetTreeSelList(dgName);
    } else {
        idlist = GetSelCheckList(dgName);
    }
    return idlist;
}
//关于网格的常用方法
//获得选中行的列
function GetSelCheckList(dgName) {
    
    var idlist = "";
    try {
        var rows = $("#" + dgName + "").datagrid("getChecked");
        //    alert(rows.length);
        //    var id = rows[index].ID;
      
        for (var i = 0; i < rows.length; i++) {
            idlist = idlist + "," + rows[i].ID;
        }
        if (idlist != "") {
            idlist = idlist.substr(1, idlist.length - 1);
        }
      //  alert("GetSelCheckList.dgName=" + dgName + "idlist:" + idlist);
    } catch (ex) {
        alert("GetSelCheckList.dg:" + dgName + " ex:" + ex.message)
    }  
    return idlist;
}



//树形选择
function GetTreeSelList(dgName) {

    var strSelIDList = "";
    try {
        $("#" + dgName + "").treegrid('selectAll');
        var rows = $("#" + dgName + "").treegrid('getSelections');
    //        alert("rows.length:=" + rows.length);

        if (rows.length < 1) {
            //     alert(JSON.stringify(rows));
            return;
        }

        for (var index = 0; index < rows.length; index++) {//这种写法不行
            var row = rows[index];
            var trObj = $("tr[node-id=" + row.ID + "]");//获得所有的                            
            if (trObj != null) {
                var sField = "ck"
                var checkBox = trObj.find("input[name='" + sField + "']");
                if (checkBox != null) {
                    //        alert("checkBox.找到了:");
                    var bCheck = checkBox.prop("checked");
                    if (bCheck == true) {

                        strSelIDList += "," + row.ID ;
                        //          alert(strSelIDList);
                    }
                } else {
                    alert("checkBox.找不到:");
                }
            } else {
                alert("trObj.找不到:");
            }

           
            //   GetTreeSelList(row.ID);//继续嵌套调用
            //  strSelIDList + GetTreeSelList(row.ID);
        }
        if (strSelIDList != "") {
            strSelIDList = strSelIDList.substr(1, strSelIDList.length - 1);
        }        
        $("#" + dgName + "").treegrid('unselectAll');
      
    } catch (ex) {
        alert("GetTreeSelList.dg:"+dgName +" ex:"+ex.message)
    }
    //   alert("GetTreeSelList.strSelIDList" + strSelIDList)
    return strSelIDList;
}
//获得选中行的RowJson内容
function GetSelRowJsonSingle(dgName) {

    var rows = $("#" + dgName + "").datagrid("getChecked");
    //    alert(rows.length);
    //    var id = rows[index].ID;
    var rowjson = "";
    rowjson = JSON.stringify(rows[0]);
 //   alert("GetSelRowJson:" + rowjson);
    return rowjson;
}

//获得选中行的RowJson内容
function GetSelNameList(dgName) {

    var rows = $("#" + dgName + "").datagrid("getChecked");
    //    alert(rows.length);
    //    var id = rows[index].ID;
    var idlist = "";
    for (var i = 0; i < rows.length; i++) {
        idlist = idlist + "," + rows[i].Name;
    }
    if (idlist != "") {
        idlist = idlist.substr(1, idlist.length - 1);
    }
    return idlist;
}

//获得选中行的RowJson内容
function GetSelRowJsonList(dgName) {
    try {
        var rows = $("#" + dgName + "").datagrid("getChecked");
  
        rowjsonlist = JSON.stringify(rows);

        return rowjsonlist;
    }
    catch (e) {
        alert("sel.GetSelRowJsonList:" + e.name + ":" + e.message);
    }
}

function LoadMainChecked(rows, strIDList) {
    //alert("set.LoadMainChecked.strIDList" + strIDList);
    var sIDList = "," + strIDList + ",";
    if (mlngShowTree == 1) {
        LoadChecked(rows, sIDList)
    } else {
        for (var index = 0; index < rows.length; index++) {
            var row = rows[index];
            var sID = "," + row.ID + ",";           
            if (sIDList.indexOf(sID) >= 0) {
            //    item.checked = true;
                $("#dgMain").datagrid("checkRow", index);
            }
        }
    }
    
}
//加载已经 选择的
function LoadChecked(rows, sIDList) {

    try {
    //    alert("LoadChecked.sIDList" + sIDList + "rows.length:" + rows.length);
        //必须嵌套的写法才能加载
        for (var index = 0; index < rows.length; index++) {
            var row = rows[index];
            if (row.children != undefined) {
                LoadChecked(row.children, sIDList);
            }
        //    alert("LoadChecked.row.ID:" + row.ID);

            var trObj = $("tr[node-id=" + row.ID + "]");//获得所有的                            
            if (trObj != null) {
                var sField = "ck"
                var items = trObj.find("input[name='" + sField + "']");//获得所有的
                if (items != null) {
                    //     alert("items.length:" + items.length);
                    $.each(items, function (index, item) {
                        var sID = "," + row.ID + ",";
                        //        alert("sID=" + sID + "mstrIDList:" + mstrIDList);
                        //var sIDList = "," + mstrIDList;
                        if (sIDList.indexOf(sID) >= 0) {
                            item.checked = true;
                        }

                    });
                }
            }
        }
    }
    catch (e) {
        alert("sel.LoadChecked:" + e.name + ":" + e.message);
    }
}



//插入选中的内容
function OnInsertSel(dgName) {
    //这里要传ID和Name
    //如果父窗体是自然弹窗容易导致网页崩溃
//   alert("OnInsertSel.开启调试：" + dgName);
    try {
        var sRowsJsonList = null;
        var strFieldName = mstrFieldName;
        var strTable = mstrTableName;

   //     var strIDList = GetSelCheckList(dgName);
        var strIDList = GetSelMainListByDg(dgName);
        
        var strRowJson = GetSelRowJsonSingle(dgName);// 单个
        var msText = "";
     //   alert("sel.OnInsertSel.strFieldName" + strFieldName + "strIDList:" + strIDList);
  //      alert("sel.OnInsertSel.strRowJson=" + strRowJson);
        
        switch (strFieldName.toLowerCase()) {
            //对于UserList，UserListPerm,AuthManList不要关闭，直接加载
            
            case "skcorp"://SKCorp
            case "vender":
                msText = strRowJson;
                break;
            case "customer":
                msText = strRowJson;
                break;
            case "clcode":
                msText = strRowJson;
                break;
            case "objid":
                msText = strRowJson;
                break;
            case "gzid"://工种ID
            case "gxid"://工序ID
            case "parentid":
                msText = strRowJson;
                break;
            case "pihao"://批号 ，也只能单选
                msText = strRowJson;
                break;
            case "userlist":
            case "userlistperm":
            case "tipmanlist":
            case "bmgrade"://以这个字段为准 权限
            case "fileperm":
            case "authmanlist":
                //这里注意数据类型一定要一致，否则就会无法调用
                msText = GetSelNameList(dgName);
                //          alert(msText);

                break;
            case "xjtype"://点检类别
            case "djtype"://点检类别
            case "xjcont"://点检内容
            case "djcont"://点检内容
            //    msText = GetSelRowJsonList(dgName);//不再传输JSON对象
                msText = GetSelNameList(dgName);

          //      alert("sel.js.OnInsertSel.msText:" + msText);
                break;

            case "bynr":
            case "bycont"://保养内容
                msText = GetSelRowJsonList(dgName);
            //    alert1("sel.js.OnInsertSel.msText:" + msText);
               // msText = GetSelNameList(dgName);//2021-01-24 只选取保养内容即可
                break;
            default:
                //   
                break;
        }

        if ("gridtype" == mstrCtrlType) {

            if (mstrOrderRel != "") {
                //这个是引用查询
          //      alert("sel.OnInserSel" + mstrOrderRel);
                window.opener.OnAddRelOrder(strTable, strIDList);
            } else {
                //从Pub_CJB里面查询
                var sRowsJsonList = GetSelRowJsonList(dgName);
           //     alert("sel.OnInsertSel.sRowsJsonList=" + sRowsJsonList);
                if (mlngIsApp == 1) {
                    var ws = plus.webview.currentWebview();
                    var wo = ws.opener();
                    var strCmd = 'OnAddRow("' + sRowsJsonList + '");';
                    //    console.log(strCmd);
                    wo.evalJS(strCmd);
                }
                else {
                    window.opener.OnAddRow(sRowsJsonList);
                }
                
            }

        } else {
            if (mlngIsApp == 1) {
                var ws = plus.webview.currentWebview();
                var wo = ws.opener();
                var strCmd = "OnSetValue('" + strIDList + "','" + msText + "');";
                console.log(strCmd);
                wo.evalJS(strCmd);
                
            } else {
                window.opener.OnSetValue(strIDList, msText);
            }
            

        }
        if (mlngIsApp == 1) {
            back();
        } else {
            window.close();
        }
        
    }
    catch (e) {
        alert("sel.OnInsertSel:" + e.name + ":" + e.message);
    }
}

function onMainSerch(e) {

    var v = $(e.data.target).textbox('getValue');
    var v = $(e.data.target).textbox('getValue');
    //   alert("onMainSerch" + v);
    var sname = e.data.target.id;//这里对应的 是ID
    onMainSerchField(sname);
}

//主表字段 点查询 WebInput调用的
function onMainSerchField(sname) {

 
    try {
        //     var sname = e.data.target.id;//这里对应的 是ID
       
    //    alert("onMainSerchField:" + sname);

        var strTableGroup = "";
        var lShowMe = mlngShowMe;
        var lIsApp = 0;
        if (mlngIsApp == undefined) {
            lIsApp = 0;
        } else {
            lIsApp = mlngIsApp;
        }
        
        //然后这里可以弹出提示 做具体的操作
        var strTableGroup = "";
        mstrFieldName = sname;
        mlngIsSub = 0;
        var strField = GetRelFieldName(sname);
        
        var lID = mlngID;
        var lShowType = 0;
        var lGridType = 4;
        var strUrl = "";
        var lShowNav = 0;
        var strTitle = "";
        switch (strField) {
            case "authmanlist":
                //    alert(strField);
               // strUrl = "WebType.html?IsMulSel=1&ID=" + lID + "&Field=" + strField + "";
                lGridType = 523;
                strUrl = "fmTop.html?IsMulSel=1&ID=" + lID + "&DBID=" + lGridType + "&Field=" + strField + "";
                strTitle = "选择审核人";
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
                break;
            case "userlistperm":
              //  strUrl = "WebType.html?IsMulSel=1&ID=" + lID + "&Field=" + strField + "";
                lGridType = 523;
                strUrl = "fmTop.html?IsMulSel=1&ID=" + lID + "&DBID=" + lGridType + "&Field=" + strField + "";
                strTitle = "选择用户";
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
                break;
            case "tipmanlist":
            case "userlist":
                // strUrl = "WebType.html?IsMulSel=1&ID=" + lID + "&Field=" + strField + "";
                lGridType = 523;
                strUrl = "fmTop.html?IsMulSel=1&ID=" + lID + "&DBID=" + lGridType + "&Field=" + strField + "";
                strTitle = "选择用户";
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
                break;
            case "fileperm"://查看权限
                strField = "BMGrade";
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";
                break;
            case "execcont"://执行内容 包括 保养记录 和执行记录 都用这个吧
          //       alert(strField);
                strField = "djtype";
              //  var v = $("#" + sname + "").textbox('getValue');
                var v = $('#' + sname + '').datagrid('getRows');
                var rowsjson = JSON.stringify(v);
            //    alert("sel.js.onMainSerchField.rowsjson" + JSON.stringify(rowsjson))
                strUrl = "DlgExec.html?RowsJson=" + rowsjson + "&ID=" + lID + "&Field=" + strField + "";// 弹出一个选择对话框按钮


                break;
            case "execxjcont"://执行内容 包括 保养记录 和执行记录 都用这个吧
            //    alert(strField);//ExecXJCont
                strField = "xjtype";
                //  var v = $("#" + sname + "").textbox('getValue');
                var v = $('#' + sname + '').datagrid('getRows');
                var rowsjson = JSON.stringify(v);
                //       alert("sel.js.onMainSerchField.rowsjson" + JSON.stringify(rowsjson))
                strUrl = "DlgExec.html?RowsJson=" + rowsjson + "&ID=" + lID + "&Field=" + strField + "";// 弹出一个选择对话框按钮

                break;
            case "djcont"://点检内容 二者用同样的内容吧
            case "xjcont"://巡检内容
                lGridType = 6089;
              
                strField = "XJType";
              //  strUrl = "WebType.html?IsMulSel=1&ID=" + lID + "&Field=" + strField + "";
                strUrl = "fmTop.html?IsMulSel=1&ID=" + lID + "&DBID=" + lGridType + "&Field=" + strField + "";
                strTitle = "选择巡检内容";
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
                break;
           
            
            case "bycont"://保养内容
                lGridType = 12;
                strUrl = "fmTop.html?IsMulSel=1&ID=" + lID + "&DBID=" + lGridType + "&Field=" + strField + "";
                strField = "BYNR";
                strUrl = "WebType.html?IsMulSel=1&ID=" + lID + "&Field=" + strField + "";
                break;

                //case "groupid":
                //    strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "";
                //    break;
                //case "equiptype":
                //    strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=Equip_Type&FindType=1&FindText=" + sText + "";
                //    break;
                //case "permid":// 权限ID
                //    strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=Sys_PermGroup";
                //    break;
                //case "department":
                //    strTableGroup = "sys_ugroup";
                //    strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "&FindType=1&FindText=" + sText + "";
                //    break;
            case "empman"://选人 是选单个的人
                strTableGroup = "sys_users";
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";
                lGridType = 7001;
                strUrl = "fmTop.html?IsMulSel=1&ID=" + lID + "&DBID=" + lGridType + "&Field=" + strField + "";
                strTitle = "选择人员";
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
                break;
            case "corpcountry":
                strTableGroup = "AreaGroup";
                lShowType = 1;
                strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "&Field=" + strField + "";
                break;
            case "corpprovince":
                lShowType = 1;
                strTableGroup = "AreaGroup";
                strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "&Field=" + strField + "";
                break;
            case "corpcity":
                lShowType = 1;
                //                var txt_CorpProvince = document.getElementById("txt_CorpProvince");
                //if (txt_CorpProvince != null) {
                //    var strVal = txt_CorpProvince.GetText();
                //    //          alert(strVal);
                //    //      strVal = "province='" + strVal + "'";
                //}
                strTableGroup = "AreaCity";
                strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "&Field=" + strField + "&StrVal=" + strVal + "";
                break;
            case "objid"://引用 合同，客户，人事，固定资产主表资料
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "&TableName=" + strTableGroup + "";

                lGridType = mlngGridTypeG;
                lShowNav = 1;
                strUrl = "fmTop.html?IsSingleSel=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                //这个根据
                strTitle = "选择" + GetMainName(lGridType);
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
             //   alert("sel.js.lGridType=" + lGridType);
                switch (parseInt(lGridType)) {
                    case 7071:
                    case 7072://选择
                        strUrl = strUrl + "&ShowAll=1";
                    case 7073:
                    case 7075:
                        
                        break;
                    default:
                        sName = '人员';
                        break;
                }

                break;
            case "gzid"://选择工种ID
                lGridType = 8005;
                lShowNav = 0;
                strUrl = "fmTop.html?IsSingleSel=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                //这个根据
                strTitle = "选择" + GetMainName(lGridType);
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
             //   alert(strUrl);
                break;
            case "gxid"://选择工序ID
                lGridType = 8010;
                lShowNav = 1;
                strUrl = "fmTop.html?IsSingleSel=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                //这个根据
                strTitle = "选择" + GetMainName(lGridType);
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
                break;
            case "func"://计算公式
            case "funcex"://计算公式
                var lSetType = 7;
                var lGridType = 8011;
                var sKeyList = $('#Func').textbox('getValue');
                sKeyList = encodeData(sKeyList);
                var url = "../WebSet/DlgFieldSet.html?GridType=" + lGridType + "";
                url = url + "&SetType=" + lSetType + "";
                url = url + "&ObjID=" + lID + "";
                url = url + "&KeyList=" + sKeyList + "";
                strUrl = url;
           //     alert(strUrl);
                break;
            case "parentid"://引用 合同，客户，人事，固定资产主表资料               
                lGridType = mlngGridTypeG;
                lShowNav = 1;
                strUrl = "fmTop.html?IsSingleSel=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                //这个根据
                strTitle = "选择" + GetMainName(lGridType);
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
                break;
          
            case "customer":
                lShowNav = 1;
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";
                strUrl = strUrl + "&ShowMe=" + lShowMe + "";
                lGridType = 2082;
                strUrl = "fmTop.html?IsSingleSel=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                break;
            case "skcorp"://SKCorp
            case "vender":
                lShowNav = 1;
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";
                lGridType = 2063;
                strUrl = "fmTop.html?IsSingleSel=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                strTitle = "选择供应商";
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
                break;
            case "clcode"://选择商品资料的时候，能够自动选配件资料 需要完善
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";
                lGridType = 4;
                lShowNav = 1;
                strUrl = "fmTop.html?IsSingleSel=1&PropType=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                strTitle = "选择商品资料";
                strUrl = strUrl + "&TitleIn=" + strTitle + "";
                //新的写法，调用fmTop 来做选择，功能更加强大了
                //      strUrl = "fmTop.html?ShowNav=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                break;
        }
        if (mlngIsApp == 1) {
            lShowNav = 0;//APP状态就不要左右显示了
        }
        strUrl = strUrl + "&ShowNav=" + lShowNav + "";
        strUrl = strUrl + "&ShowType=" + lShowType + "";
        strUrl = strUrl + "&ShowSel=1";//显示选择对话框
        strUrl = strUrl + "&IsApp="+ lIsApp +"";//显示选择对话框
 //       alert(strUrl);
        //   ShowPopup(850, 450, strUrl, "选择");//这里IE6浏览器兼容不行
        if (mlngIsApp == 1) {
            //      alert("onMainSelGroup.mlngIsApp=1");
            clicked(strUrl);//调用APP的打开函数
        } else {
            //alert("JSInput.onMainSelGroup.mlngIsApp=0");
            var result = ShowDlg(1050, 600, strUrl);
        }

   //     alert(sname + 'The inputed value is ' + (v ? v : 'empty'));
    }
    catch (ex) {
        alert("sel.js.onMainSerch:" + ex.message);
    }

}


//网格的弹出
function onGridFieldSerch(e) {

    var sname = e.data.target.id;//这里对应的 是ID
    var v = $(e.data.target).textbox('getValue');
   
    try {
        
        var strTableGroup = "";
        var lShowMe = mlngShowMe;
        //然后这里可以弹出提示 做具体的操作
        var strTableGroup = "";
        mstrFieldName = sname;
        mlngIsSub = 1;
        sname = sname.substring(3);

    //    alert("onGridFieldSerch" + v + "id=" + sname);
        var strField = GetRelFieldName(sname);

        var lID = mlngID;
        var lShowType = 0;
        var lGridType = 4;
        var strUrl = "";
        var lWidth = 1050;
        var lHeight = 600;
   //     alert(strField);
        switch (strField) {
            case "authmanlist":
                //    alert(strField);
                strUrl = "WebType.html?IsMulSel=1&ID=" + lID + "&Field=" + strField + "";
                break;
            case "execxjcont"://执行内容 包括 保养记录 和执行记录 都用这个吧
                // alert(strField);
                strField = "xjtype";
                var rowsjson = v;
           //     strUrl = "DlgExec.html?RowsJson=" + rowsjson + "&ID=" + lID + "&Field=" + strField + "";// 弹出一个选择对话框按钮
                var sNameList = v;
                var sRowJSonResult = "";
                
                strUrl = "DlgExec.html?RowJSonResult=" + sRowJSonResult + "&NameList=" + sNameList + "&ID=" + lID + "&Field=" + strField + "";// 弹出一个选择对话框按钮


                break;
            case "execcont"://执行内容 包括 保养记录 和执行记录 都用这个吧
               // alert(strField);
                strField = "djtype";
                var rowsjson = v;
                strUrl = "DlgExec.html?RowJSonResult=" + rowsjson + "&ID=" + lID + "&Field=" + strField + "";// 弹出一个选择对话框按钮
                break;
            case "userlistperm":
                strUrl = "WebType.html?IsMulSel=1&ID=" + lID + "&Field=" + strField + "";
                break;
            case "userlist":
                strUrl = "WebType.html?IsMulSel=1&ID=" + lID + "&Field=" + strField + "";
                break;
            case "fileperm"://查看权限
                strField = "BMGrade";
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";
                break;
                //case "groupid":
                //    strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "";
                //    break;
                //case "equiptype":
                //    strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=Equip_Type&FindType=1&FindText=" + sText + "";
                //    break;
                //case "permid":// 权限ID
                //    strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=Sys_PermGroup";
                //    break;
                //case "department":
                //    strTableGroup = "sys_ugroup";
                //    strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "&FindType=1&FindText=" + sText + "";
                //    break;
            case "empman"://选人 是选单个的人
                strTableGroup = "sys_users";
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";

                break;
            case "corpcountry":
                strTableGroup = "AreaGroup";
                lShowType = 1;
                strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "&Field=" + strField + "";
                break;
            case "corpprovince":
                lShowType = 1;
                strTableGroup = "AreaGroup";
                strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "&Field=" + strField + "";
                break;
            case "corpcity":
                lShowType = 1;
                //                var txt_CorpProvince = document.getElementById("txt_CorpProvince");
                //if (txt_CorpProvince != null) {
                //    var strVal = txt_CorpProvince.GetText();
                //    //          alert(strVal);
                //    //      strVal = "province='" + strVal + "'";
                //}
                strTableGroup = "AreaCity";
                strUrl = "DlgTree.aspx?ID=" + lID + "&TableGroup=" + strTableGroup + "&Field=" + strField + "&StrVal=" + strVal + "";
                break;
            case "objid"://引用 合同，客户，人事，固定资产主表资料
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "&TableName=" + strTableGroup + "";

                lGridType = mlngGridTypeG;
                strUrl = "fmTop.html?IsSingleSel=1&ShowNav=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                //这个根据
                break;
            case "customer":
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";
                strUrl = strUrl + "&ShowMe=" + lShowMe + "";
                lGridType = 2082;
                strUrl = "fmTop.html?IsSingleSel=1&ShowNav=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                break;
            case "vender":
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";
                lGridType = 2063;
                strUrl = "fmTop.html?IsSingleSel=1&ShowNav=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                break;
            case "clcode"://选择商品资料的时候，能够自动选配件资料 需要完善
                strUrl = "WebType.html?ID=" + lID + "&Field=" + strField + "";
                lGridType = 4;
                strUrl = "fmTop.html?IsSingleSel=1&PropType=1&ShowNav=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                //新的写法，调用fmTop 来做选择，功能更加强大了
                //      strUrl = "fmTop.html?ShowNav=1&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
                break;
            case "pihao":
                //批号弹出提示
                lGridType = 93;
                strUrl = "fmTop.html?IsSingleSel=1&ShowNav=0&DBID=" + lGridType + "&ID=" + lID + "&Field=" + strField + "";
              
                var strCKName = $('#OutCK').textbox('getValue');
                
                var dgName = "dg";
                var sCodeList = '';
                var rows = $('#' + dgName + '').datagrid('getRows');
                var row = rows[editIndex];
                strUrl = strUrl + "&CKName=" + strCKName + "";//显示选择对话框
                strUrl = strUrl + "&CLCode=" + row.CLCode + "";//显示选择对话框
                lWidth = 900;
                lHeight = 500;
                //稍微窄点吧
                break;
        }


        strUrl = strUrl + "&ShowType=" + lShowType + "";
        strUrl = strUrl + "&ShowSel=1";//显示选择对话框

  //         alert(strUrl);
        //   ShowPopup(850, 450, strUrl, "选择");//这里IE6浏览器兼容不行
        if (mlngIsApp == 1) {
            //      alert("onMainSelGroup.mlngIsApp=1");
            clicked(strUrl);//调用APP的打开函数
        } else {
            //alert("JSInput.onMainSelGroup.mlngIsApp=0");

            var result = ShowDlg(lWidth, lHeight, strUrl);
        }
        //     alert(sname + 'The inputed value is ' + (v ? v : 'empty'));
    }
    catch (ex) {
        alert("onGridFieldSerch:" + ex.message);
    }

}
