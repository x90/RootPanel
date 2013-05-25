function addTime(uname)
{
    $.post("/admin/add-time/",{"uname": uname, "day": prompt("请输入要延时的天数")}, function(data){
        if(data.status=="ok")
            window.location.reload();
        else
            alert(data.msg);
    },"json");
}

function alertUser(uname, type)
{
    $.post("/admin/alert-user/",{"uname": uname, "type":type}, function(data){
        alert(data.msg);
    },"json");
}

/*
showLog
loginAs
enableUser
deleteUser
disableUser
*/

function userLog(uname)
{
    $.post("/commit/admin/",{"do":"getlog","uname":uname},function(data){
        $("#logView .rp-title").html(uname);
        $("#logView .rp-body").html(data);
        $("#logView").modal();
    },"html");
    return false;
}

function userDelete(uname)
{
    if(confirm("你确定要删除？"))
    {
        $.post("/commit/admin/",{"do":"delete","uname":uname},function(data){
            if(data.status=="ok")
                window.location.reload();
            else
                alert(data.msg);
        },"json");
    }
    return false;
}

function commonAct(act,uname,isReload)
{
    $.post("/commit/admin/",{"do":act,"uname":uname},function(data){
        if(data.status=="ok")
        {
            if(isReload)
                window.location.reload();
            else
                alert(data.status);
        }
        else
            alert(data.msg);
    },"json");
    return false;
}