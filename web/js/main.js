import handler from '/js/common/handler.js';
import '/libs/jquery-3.4.1.min.js';
import '/libs/jquery-ui.min.js';
import {list, surveyForm} from "/js/function/survey.js";

window.$ = $;

$(document).ready(function (e) {
    const sessionId = sessionStorage.getItem("id");

    console.log("sessionId : " + sessionId);

    if (sessionId === null)
        $("#contentArea").load("login.html");
    else {
        $("#logoutArea").load("logout.html");
        $("#menuArea").load("surveyMenu.html");

        $("#contentArea").remove();
        list.showSurveyList(e.target);
        $("#listArea").load("surveyList.html");
    }
    handler.init();
});

