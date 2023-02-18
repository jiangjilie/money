$(function () {
    toastr.options.positionClass = 'toast-bottom-right';
    Init.Onload();
})

var Init = {
    Onload: function () {
        var id = $.getUrlParam('id');
        var Depid = $.getUrlParam('depid');
        if (id != null) {
            Init.LoadInfo(id, Depid);
        } else {
            if (Depid != '') {
              //  $("#selDept").attr("disabled", "disabled");
                Common.BindSelect1("selDept", "../DepartMent/GetDepartMentSelect", Depid);
            }
            else
            {
                Common.BindSelect("selDept", "../DepartMent/GetDepartMentSelect");
            }

            Common.BindSelect("selRole", "../Role/GetSelectRoleList");
        }

    },
    Save: function () {
        if ($('#formAdd').parsley().validate() == false)
            return;
        var sha = hex_sha1($("#txtPassWord").val());
        $("#txtPassWord1").val(sha);
        var id = $.getUrlParam('id');
        var url = "OperateUser";
        var option = {
            url: url,
            type: "post",
            dataType: 'text',
            data: { id: id },
            success: function (text) {
                Common.CloseForm(text);
            }
        };
        $("#formAdd").ajaxSubmit(option);
    },
    LoadInfo: function (id, Depid) {
        $.ajax({
            type: "POST",
            url: "GetUserInfo",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                //var data = eval('(' + text + ')');
                if (data.length > 0) {
                    $("#txtUserName").val(data[0].USERNAME);
                    $("#txtName").val(data[0].NAME);
                    $("#txtPassWord").val(data[0].PASSWORD);
                    $("#txtPassWord").attr('disabled', true);
                    $("#txtRePassWord").val(data[0].PASSWORD);
                    $("#txtRePassWord").attr('disabled', true);
                    $("#txtRePassWord1").val(data[0].PASSWORD);
                    Common.BindSelect1("selRole", "../Role/GetSelectRoleList", data[0].RID);
                    Common.BindSelect1("selDept", "../DepartMent/GetDepartMentSelect", data[0].DEPID);
                    $("#txtEmail").val(data[0].EMAIL);
                    $("#txtMobile").val(data[0].MOBILE);
                    if (Depid != null) {
                        $("#selDept").attr("disabled", "disabled");
                    }
                }
            }
        });
    }
}