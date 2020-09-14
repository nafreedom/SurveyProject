import handler from '/js/common/handler.js';
import '/libs/jquery-3.4.1.min.js';
import util from '/js/common/network.js';

window.$ = $;

$(document).ready(function (e) {
    // if (localStorage.getItem("surveyDone") === "true") {
    //     $("#surveyResponseForm").load("surveyResponseAlreadyDone.html");
    //     $("#responseLabel_dialog")[0].style.display = "none";
    // }
    console.log(window.location.href);
    console.log("decodeURLComponent : "  + decodeURIComponent(getParam("url")));
    let url = decodeURIComponent(getParam("url"));
    let substrUrl = url.substr(4, url.length);
    console.log(substrUrl);
    let creatorId = substrUrl.split("/")[0],
        title = substrUrl.split("/")[1];
    console.log(creatorId);
    console.log(title);

    let surveyInfo = "{\"creatorId\" : \"" + creatorId + "\", \"title\" : \"" + title + "\"}";
    console.log(surveyInfo);

    util.requestURL("/doGetIPAddr", JSON.parse(surveyInfo), getIPAddr, errorCb);

    handler.init();
});

function getIPAddr (data) {
    console.log("ip");
    console.log(data);

    let modal = $("#responseLabel_dialog")[0];

    // 같은 ip일 때 다시 응답하지 못하게
    //if (data.ip === "responseDone") {
    //    modal.style.display = "none";
    //    $("#surveyResponseForm").load("surveyResponseAlreadyDone.html");
    //    return false;
    //}

    $("#ipAddr").val(data.ip);
    console.log($("#ipAddr"));

    let surveyInfo = "{\"creatorId\" : \"" + data.creatorId + "\", \"title\" : \"" + data.title + "\"}";
    console.log(surveyInfo);

    util.requestURL("/doSetResponseForm", JSON.parse(surveyInfo), successCb, errorCb);
}

function successCb(data) {
    console.log(data);

    let currentTime = new Date(),
        time = data.survey[0].endTime,
        endTime = new Date(time);

    console.log(currentTime);
    console.log(endTime);

    if (endTime < currentTime) {
        $("#responseLabel_dialog")[0].style.display = 'none';
        $("#surveyResponseForm").load("invalidResponseUrl.html");
    }

    let titleElement = $("#responseTitle"),
        explElement = $("#expl"),
        endTimeElement = $("#endTime"),
        questionCnt = data.survey[0].questionCnt,
        eachQuestionArea = null,
        question = null,
        option = null,
        questionType = null,
        questionTypeInput = null,
        endtime = null,
        optionCnt = 0,
        optionP = null,
        titleValue = $("input[name=title]"),
        creatorIdValue = $("input[name=creatorId]"),
        questionValue = null;

    endTime = data.survey[0].endTime.toString();

    titleElement.text(data.survey[0].title);
    explElement.text(data.survey[0].expl);
    endTimeElement.text("마감일 : " + endTime.replace("T", " "));

    titleValue.val(data.survey[0].title);
    creatorIdValue.val(data.survey[0].creatorId);

    for (let i=0; i<questionCnt; i++) {
        eachQuestionArea = document.createElement("div");
        eachQuestionArea.className = "actualSurveyResponseArea";

        question = document.createElement("h4");
        question.className = "question";
        question.name = "question";
        question.innerText = data.survey[0].questions[i].questionNum + ". " + data.survey[0].questions[i].questionValue;
        questionType = data.survey[0].questions[i].questionType;

        questionValue = document.createElement("input");
        questionValue.type = "hidden";
        questionValue.name = "question";
        questionValue.value = data.survey[0].questions[i].questionValue;

        questionTypeInput = document.createElement("input");
        questionTypeInput.type = "hidden";
        questionTypeInput.name = "questionType";
        questionTypeInput.value = questionType;

        if (questionType === "text") {
            // question.innerText += " (주관식 문항)";
            eachQuestionArea.prepend(question);
            option = document.createElement("input");
            option.type = "text";
            option.name = question.innerText + "Answer";
            option.placeholder = "답변을 입력해주세요";

            eachQuestionArea.append(option);
        }
        else {
            // if (questionType === "radio")
            //     question.innerText += " (단일 선택형 문항)";
            // else
            //     question.innerText += " (다중 선택형 문항)";
            optionCnt = data.survey[0].questions[i].optionCnt;
            console.log(optionCnt);

            for(let j=0; j<optionCnt; j++) {
                optionP = document.createElement("p");
                optionP.innerHTML = data.survey[0].questions[i].options[j].optionValue;
                option = document.createElement("input");

                if (questionType === "radio")
                    option.type = "radio";
                else if (questionType === "checkbox")
                    option.type = "checkbox";

                option.name = question.innerText + "Answer";
                option.value = data.survey[0].questions[i].options[j].optionValue;

                optionP.prepend(option);
                eachQuestionArea.append(optionP);
            }
            eachQuestionArea.prepend(question);
        }
        question.after(questionTypeInput);
        eachQuestionArea.append(questionValue);
        $("#surveyResponseArea").append(eachQuestionArea);
    }

    let title = data.survey[0].title,
        creatorId = data.survey[0].creatorId,
        surveyValue = "{\"title\" : \"" + title + "\", \"userId\" : \"" + creatorId + "\"}";

    util.requestURL("/doGetLabelInfo", JSON.parse(surveyValue), getLabelInfo, errorCb);
}

function getLabelInfo (data) {
    console.log(data);
    let modal = $("#responseLabel_dialog")[0];
    if (data.labelInfo.length !== 0) {
        modal.style.display = "block";
    } else {
        return false;
    }

    let responseLabelArea = $("#responseLabelArea")[0];
    console.log(responseLabelArea);

    let labelCnt = data.labelInfo.length,
        labelOptionCnt = 0;

    let eachLabelArea = null,
        label = null,
        hiddenLabelResponse = null,
        labelOptionP = null,
        labelOption = null;

    for (let i=0; i<labelCnt; i++) {
        labelOptionCnt = data.labelInfo[i].labelOptionCnt;
        console.log(labelOptionCnt);

        eachLabelArea = document.createElement("div");
        eachLabelArea.className = "eachLabelArea";

        label = document.createElement("h4");
        label.innerHTML = (i+1) + ". " + data.labelInfo[i].labelName;
        label.name = "responseLabel";
        eachLabelArea.append(label);

        hiddenLabelResponse = document.createElement("input");
        hiddenLabelResponse.type = "hidden";
        hiddenLabelResponse.name = "responseLabel";
        hiddenLabelResponse.value = i+1;
        label.after(hiddenLabelResponse);

        for (let j=0; j<labelOptionCnt; j++) {
            console.log(data.labelInfo[i].options[j].labelOptionValue);
            labelOptionP = document.createElement("p");
            labelOptionP.innerHTML = data.labelInfo[i].options[j].labelOptionValue;

            labelOption = document.createElement("input");
            labelOption.type = "radio";
            labelOption.innerHTML = data.labelInfo[i].options[j].labelOptionValue;
            labelOption.name = hiddenLabelResponse.value + "LabelResponseoption";
            labelOption.value = j+1;
            labelOptionP.prepend(labelOption);
            label.append(labelOptionP);
        }
        responseLabelArea.append(eachLabelArea);
    }
}

function errorCb() {
    console.log("error");
}

function getParam(url) {
    let param = location.search.substr(location.search.indexOf("?") + 1)

    console.log(param);
    return param;
}