$(function() {
    var countdown=60;
    var storage=window.localStorage;
    if(storage.id){
        $("#logout").show();
    }
    //获取旧的时间
    function cancel() {
        alert("Asd");
    }
    function getStorageValue() {
        return storage["oldTime"];
    }
    //得到新的时间
    function getNewTime() {
        var data=new Date();
        var days=data.getDay();
        var hours=data.getHours();
        var minutes=data.getMinutes();
        var seconds=data.getSeconds();
        var oldSeconds=days*24*60*60+hours*60*60+minutes*60+seconds;
        return oldSeconds;
    }
    //存储时间
    function setStorageValue() {
        storage.setItem("oldTime",getNewTime());
    }
    //计算新，旧时间的差值
    function computeTime(){
        return getNewTime()-getStorageValue();
    }
    //页面开始时，查看验证码冷却时间是否有60s
    $(document).ready(function () {
        var obj=$('#code-btn');
        var dValue=computeTime();
        if(dValue<60){
            var time=60-dValue;
            settime(obj,time);
        }
    });
    //冷却时间每秒递减
    function settime(obj,dValue) { //发送验证码倒计时
        // countdown=getStorageValue("secondsremained");
        if (dValue <= 60 ) {
            countdown=dValue || countdown;
        }
        
        if (countdown ==0) {
            //冷却时间为零，改变countdown的初始值
            obj.attr('disabled',false);
            //obj.removeattr("disabled");
            obj.html("获取验证码");
            countdown = 60;
            obj.css({
                color:"#f4b01b",
            });
            $(".success-text").hide();
            return;
        } else {
            //就是不断的去减少值
            obj.attr('disabled',true);
            obj.css({
                color:"#708090",
            });
            obj.html("(" + countdown + "s)重新发送");
            countdown--;

        }
        setTimeout(function() {
                settime(obj) }
            ,1000)
    }

    $('.error-text').hide();
    $('.success-text').hide();

    /**
     * ENQUIRY FORMS
     */

    // 提交评论
    $('#comment-btn').on('click', function(e) {
        e.preventDefault();
        var event = window.event || e;
        if ($('#content').val() == '') {
            $('.error-text').show();
            return false
        } else {
            submit(1, "#comment-form", $(this), 'http://47.103.42.252/put_comment');
        }

    });

    //提交论坛
    $('#bbs-btn').on('click', function(e) {
        e.preventDefault();
        var event = window.event || e;
        if ($('#content').val() == '' || $('#name').val() == '' ) {
            $('.error-text').show();
            return false
        } else {
            submit(2,"#bbs-form", $(this), 'http://47.103.42.252/put_bbs_test');
        }

    });

    //提交验证码
    $('#code-btn').on('click', function(e) {
        e.preventDefault();
        var event = window.event || e;
        var number=$('#phone').val();
        var pattern = /^1[0-9]{10}$/;/*是否为11位*/
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; /*手机号段设置*/
        if ( number== '') {
            $('.error-text').show();
            return false
        }else if(!pattern.test(number) || !myreg.test(number)){
            $('.error-text').show();
            return false
        }else {
            settime($('#code-btn'));
            setStorageValue();
            submit(3,"#register-form",$(this),"http://47.103.42.252/sms_code");
        }
    });

    //  登录
    $("#login-btn").on("click",function (e) {
        e.preventDefault();
        var event = window.event || e;
        var stop = false
        $("#loginModal .form-input").each(function (i,e) {
            if ($(e).val() == '') {
                stop=true
                $(".error-text").show();
                setTimeout(function() {
                    $(".error-text").hide()
                }, 500);
            }
        });
        if (stop) return false
        submit(4,"#login-form",$(this),"http://47.103.42.252/login");

    });

    //修改昵称
    $('#rename-btn').on('click', function(e) {
        e.preventDefault();
        var event = window.event || e;
        if ($('#new-name').val() == '') {
            $('.error-text').show();
            return false
        } else {
            submit(5,"#rename-form", $(this), 'http://47.103.42.252/rename');
        }
    });

    //注册
    $('#register-btn').on('click', function(e) {
        e.preventDefault();
        var event = window.event || e;
        submit(6, "#register-form", $(this), 'http://47.103.42.252/register')
    });

    function submit(types, formID, btn, url) {
        $('.error-text').hide();
        if(types!=3){
            btn.hide();
        }
        if(types==2 || types==1){
            var storage=window.localStorage;
            if(storage.id){
                $("#user_id").val(storage.id);
            }
        }
        var form = $(formID);
        var type = $('#type').val();
        var data = form.serialize();
        console.log(data);
        if (types==5) {
            var data = {
                id: $("#old-name").attr("data-id"),
                name: $("#new-name").val()
            }
        } else if (types==3) {
            var data = {
                phone: $("#phone").val(),
            }
        }
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function(response) {
                var js = JSON.parse(response);
                var code = js.code;
                var msg = js.message;
                if (code == "0000") {
                    $('.success-text').show();
                    if(types!=3){
                        $(formID).hide();
                        setTimeout(function() {
                            $('.success-text').css({
                                'opacity': 1
                            });
                        }, 200);
                        setTimeout(function() {
                            $('#loginModal').modal('hide');
                            $('#renameModal').modal('hide');
                            $('#registerModal').modal('hide');
                            $('#commentModal').modal('hide');
                            $('#bbsModal').modal('hide');
                            $('.success-text').css({
                                'opacity': 0
                            });
                        }, 500);
                        setTimeout(function() {
                            $(formID).show();
                            btn.show();
                        }, 1000);
                    }
                    if (types == 1) {
                        initLayPage(type)
                    } else if (types == 2) {
                        getLayData(5, 10, 1)
                    } else if(types == 3){
                        $(".success-text").html(msg);
                        $(".success-text").css({
                            'opacity': 1
                        });
                        setTimeout(function() {
                            $(".success-text").css({
                                'opacity': 0
                            })
                        }, 1000);
                    }else if(types == 4 || types == 5 || types == 6){
                        if(!window.localStorage){
                            alert("浏览器不支持localstorage");
                        }else{
                            var storage=window.localStorage;
                            storage.setItem("name",js.data.name);
                            storage.setItem("id",js.data.id);
                            $("#logout").show();
                            $("#login").hide();
                            $("#username").text(js.data.name).show();
                        }
                    }
                }
                else {
                    $('.error-text').html(msg).show();
                    setTimeout(function() {
                        $(".error-text").hide()
                    }, 1000)
                    btn.show();
                }
            },
            error: function(error) {
                btn.show();
            }
        });
    }


    /**
     * REGISTRATION FORM
     */
    var $registerForm = $('#js-register-form');
    var $submitRegBtn = $('#js-register-btn-submit');
    var regValidator = $registerForm.validate({
        rules: {
            first: "required",
            last: "required",
            email: "required",
            country: "required",
            terms: "required"
        },
        submitHandler: handleRegSubmit,
        invalidHandler: handleRegInvalid,
        focusInvalid: false
    });

    function handleRegSubmit(form) {

        $submitRegBtn.prop('disabled', true);
        $registerForm.removeClass('form-error');
        var _this = this;

        var body = {
            'first_name': form.first.value,
            'last_name': form.last.value,
            'email': form.email.value,
            'country_code': form.country.value,
            'source': 'web',
            'lang': 'en'
        };

        var url = '/subscriptions/subscribe.php';
        $.ajax({
            url: url,
            type: 'POST',
            data: body,
            success: function (response) {
                $('.register-modal .form').addClass("hidden");
                $('.register-modal .form-success').removeClass("hidden");
                if (typeof(ga) != "undefined")
                    ga('send','event', 'newsletter', 'subscribed');
            },
            error: function (error) {
                if (typeof(ga) != "undefined")
                    ga('send','event', 'newsletter', 'subscribe_failed');
                $submitRegBtn.prop('disabled', false);
            }
        });
    }

    function handleRegInvalid() {
        $registerForm.addClass('form-error');
        // add additional validation callbacks for fields that aren't proper inputs
        $registerForm.find('.checkbox').on('ifChecked', function(event){
            regValidator.element(event.target);
        });
        $registerForm.find('.select-country').change(function(event){
            regValidator.element(event.target);
        });
    }


    /**
     * UNSUBSCRIBE FORM
     */
    var $submitUnsubscribeBtn = $('#js-unsubscribe-btn-submit');
    var $unsubscribeForm = $('#js-unsubscribe-form');
    var unsubscribeValidator = $unsubscribeForm.validate({
        rules: {
            email: "required"
        },
        submitHandler: handleUnsubscribeSubmit,
        invalidHandler: handleUnsubscribeInvalid,
        focusInvalid: false
    });

    function handleUnsubscribeSubmit(form) {
        $submitUnsubscribeBtn.prop('disabled', true);
        $unsubscribeForm.removeClass('form-error');

        var _this = this;
        var body = {
            'email': form.email.value,
            'source': 'web',
            'lang': 'en'
        };

        var url = '/subscriptions/subscribe?unsubscribe=true';
        $.ajax({
            url: url,
            type: 'POST',
            data: body,
            success: function (response) {
                window.location.href = "confirm-unsubscribe.php";
            },
            error: function (error) {
                if (typeof(ga) != "undefined")
                    ga('send','event', 'newsletter', 'unsubscribe_failed');
                $submitUnsubscribeBtn.prop('disabled', false);
            }
        });
    }

    function handleUnsubscribeInvalid() {
        $unsubscribeForm.addClass('form-error');
    }

});

