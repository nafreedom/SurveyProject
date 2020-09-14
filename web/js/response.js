import handler from '/js/common/handler.js';
import '/libs/jquery-3.4.1.min.js';
import util from '/js/common/network.js';
import {response} from "./function/survey.js";

window.$ = $;

$(document).ready(function (e) {

    // if (localStorage.getItem("surveyDone") === "true") {
    //     $("#surveyResponseForm").load("surveyResponseAlreadyDone.html");
    //     $("#responseLabel_dialog")[0].style.display = "none";
    // }
    let url = decodeURIComponent(getParam("url"));
    let substrUrl = url.substr(4, url.length);

    let creatorId = substrUrl.split("/")[0],
        title = substrUrl.split("/")[1];

    response.getIPAddr(creatorId, title);

    handler.init();
});

$(document).ajaxStart(function () { $("#loadingLayer").show(); });
$(document).ajaxStop(function () { $("#loadingLayer").hide(); });

function getParam(url) {
    let param = location.search.substr(location.search.indexOf("?") + 1)

    console.log(param);
    return param;
}

function sendEmailbyEmailJS(){
    const templateParams = {
        from_name : "surveyProject",
        to_name : "to user",
        message_html : "<h1>SURVEY TEST</h1>"
    };
    emailjs.init("user_3EEpQ3HpSywwDCJmyCNrw");
    emailjs.send('gmail_nafreedom', 'template_yRNCI10B', templateParams)
        .then(function(response){
            console.log("success", response.status, response.text);
        },function(error){
            console.log("error", error);
        });
}