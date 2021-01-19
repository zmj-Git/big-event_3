$(function () {
    //1.获取用户信息
    getUserInfo();
    // 2.退出
    var layer = layui.layer;
    $("#btnLogout").on("click", function () {
        //框架提供的询问框
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem("token");
            location.href = "/login.html";

            layer.close(index);
        });

    })
});
function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        // headers: {
        //       Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(user) {
    // 1.渲染名称
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.uesr_pic !== null) {
        // 有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        // 莫得头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".text-avatar").show().html(text);
    }
}