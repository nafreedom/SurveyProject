import util from "../common/network.js";
import '/libs/jquery-3.4.1.min.js';
import {list} from "../function/survey.js";
import session from "/js/function/checkSession.js";

function alertClass (alert, addingClass, text) {
    setTimeout(function () {
        alert.removeClass();
        alert.addClass('alert');
        alert.addClass(addingClass).text(text);
    }, 1000);

    setTimeout(function () {
        //alert.fadeOut();
        alert.removeClass();
        alert.addClass('loginAlert');
        alert.text('');
    }, 2000);
    alert.removeAttr('style');
}

export var join = {
    joinMember: function (target) {
        let form = $("#loginForm").serialize(),
            id = $("#_id").val(),
            pw = $("#_pw").val(),
            alert = $('.loginAlert');

        function successCb(data) {
            if(data.result == 1) {
                alertClass(alert, 'alert-success', '가입을 축하드립니다');
                sessionStorage.setItem("id", data.id);
            }
            else if (data.result == 0) {
                alertClass(alert, 'alert-warning', '이미 사용 중인 아이디입니다');
            }
        }

        function errorCb() {
            alertClass(alert, 'alert-danger', '회원가입 에러입니다');
        }

        if (id === "" || pw === "") {
            alertClass(alert, 'alert-error', '회원 정보를 입력해주세요');
        }
        else
            util.requestURL("/doJoin", form, successCb, errorCb);
    }
};

export var login = {
    loginMember: function (target) {
        let form = $("#loginForm").serialize(),
            alert = $(".loginAlert");

        function successCb(data) {
            if (data.result === true) {
                sessionStorage.setItem("id", data.id);
                location.reload();
                alertClass(alert, 'alert-success', '환영합니다');
            }
            else {
                alertClass(alert, 'alert-error', '입력 정보를 다시 한 번 확인해주세요');
            }
        }

        function errorCb() {
            alertClass(alert, 'alert-danger', '로그인 에러입니다');
        }

        util.requestURL("/doLogin", form, successCb, errorCb);
    }
};

export var logout = {
    doLogout: function (target) {
        let alert = $('.loginAlert');
        sessionStorage.clear();
        location.reload();
        alertClass(alert, 'alert-primary', '로그아웃합니다');
    }
};