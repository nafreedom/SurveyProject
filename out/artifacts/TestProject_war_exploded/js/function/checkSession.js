import'/libs/jquery-3.4.1.min.js';

export default {
    checkSession: function (target) {
        let sessionId = sessionStorage.getItem("id"),
            login_btn = $("input[name*='login_btn']"),
            logout_btn = $("input[name*='logout_btn']"),
            join_btn = $("input[name*='join_btn']"),
            inputId = $("input[name*='_id']"),
            inputPw = $("input[name*='_pw']"),
            newSurveyBtn = $("input[name*='newSurvey_btn']"),
            listArea = $("#listArea");

        console.log("login_btn change! : " + sessionId);
        console.log("chk "+login_btn.attr('name'));

        function toDisplayNone (name) {
            name.css('display', 'none');
            console.log(name + " to Display None");
        }

        function toDisplayInline (name) {
            name.css('display', 'inline');
            console.log(name + " to Display Inline");
        }

        if (sessionId === null) {
            $("#contentArea").load("login.html");
            logout_btn.attr({
                value : '로그인',
                name : 'login_btn',
                id : 'login_btn'
            });

            toDisplayInline(join_btn);
            toDisplayInline(inputId);
            toDisplayInline(inputPw);

            newSurveyBtn.attr("type", "hidden");
            listArea.css('display', 'none');

            console.log("checking sessionId1 : " + sessionId);
        }
        else {
            $("#contentArea").load("login.html");
            // login_btn.attr({
            //     value : '로그아웃',
            //     name : 'logout_btn',
            //     id : 'logout_btn'
            // });

            login_btn.attr('value', '로그아웃');
            login_btn.attr('name', 'logout_btn');
            login_btn.attr('id', 'logout_btn');

            console.log("login_btn value " + login_btn.attr('value'));
            console.log("login_btn name " + login_btn.name);
            console.log("login_btn id " + login_btn.id);

            toDisplayNone(join_btn);
            toDisplayNone(inputId);
            toDisplayNone(inputPw);

            alert("로그인 중");

            newSurveyBtn.attr("type", "button");
            listArea.css('display', 'block');

            console.log("checking sessionId2 : " + sessionId);
        }

        //location.reload();

        // setTimeout(function () {
        //     location.reload();
        // }, 1000);
    }
}