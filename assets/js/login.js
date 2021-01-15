$(function () {
    $("#link_reg").on("click", function () {
        $(".reg-box").show();
        $(".login-box").hide();
    })
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    //3.自定义验证规则
    var form = layui.form;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/,
            "密码必须6-16位，且不能输入空格"
        ],

        repwd: function (value) {
            var pwd = $(".reg-box input[name=password]").val()
            if (value !== pwd) {
                return "两次密码输入不一致";
            }
        }
    });
    //4.注册功能
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功，请登录");
                $("#link_login").click();
                $("#form_reg")[0].reset();
            }
        });
    })
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("恭喜你，登录成功");
                localStorage.setItem('token', res.token);
                location.href = "/index.html"
            }
        });
    })
})