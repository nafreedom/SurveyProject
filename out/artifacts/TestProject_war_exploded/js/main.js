import handler from '/js/common/handler.js';
import '/libs/jquery-3.4.1.min.js';
import {list} from "/js/function/survey.js";

window.$ = $;

$(document).ready(function (e) {
    let sessionId = sessionStorage.getItem("id"),
        newSurveyArea = $("#aQDAnswerSheetArea");

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

