import {login, logout, join} from "../function/member.js";
import {survey,  list, response, remove, result} from "../function/survey.js";

import "/libs/jquery-3.4.1.min.js";

function doMouseClick(e) {
    let target = e.target,
        loginId = sessionStorage.getItem("id"),
        name = target && target.getAttribute("name"),
        modal =  document.getElementById("addQuestion_dialog"),
        modal2 =  document.getElementById("shareSurvey_dialog"),
        modal3 = document.getElementById("addEditQuestion_dialog"),
        modal4 = document.getElementById("deleteQuestion_dialog"),
        modal5 = document.getElementById("addLabel_dialog"),
        modal6 = document.getElementById("deleteEditQuestion_dialog"),
        modal7 = document.getElementById("addEditLabel_dialog"),
        modal8 = document.getElementById("responseLabel_dialog"),
        modal9 = document.getElementById("showStat_dialog"),
        addOption_btn = document.getElementById("addOption_btn"),
        deleteOption_btn = document.getElementById("deleteOption_btn"),
        addLabel_btn = document.getElementById("addLabel_btn"),
        deleteLabel_btn = document.getElementById("deleteLabel_btn"),
        addLabelOption_btn = document.getElementById("addLabelOption_btn"),
        deleteLabelOption_btn = document.getElementById("deleteLabelOption_btn"),
        addEditOption_btn = document.getElementById("addEditOption_btn"),
        deleteEditOption_btn = document.getElementById("deleteEditOption_btn"),
        addEditLabel_btn = document.getElementById("addEditLabel_btn"),
        deleteEditLabel_btn = document.getElementById("deleteEditLabel_btn"),
        addEditLabelOption_btn = document.getElementById("addEditLabelOption_btn"),
        deleteEditLabelOption_btn = document.getElementById("deleteEditLabelOption_btn"),
        findQuestionClass = $("#aQDAnswerSheetArea").find(".eachAnswerArea > .questionToAddOption")[0],
        findOptionClass = $("#aQDAnswerSheetArea").find(".eachAnswerArea > .optionToDelete")[0],
        findLabelClass = $("#labelArea").find(".eachLabelArea > .labelToEdit")[0],
        findLabelOptionClass = $("#labelArea").find(".eachLabelArea > .labelOptionToDelete")[0],
        findEditQuestionClass = $("#surveyEditTbl").find(".eachEditArea > .questionToAddOption")[0],
        findEditOptionClass = $("#surveyEditTbl").find(".eachEditArea > .optionToDelete")[0],
        labelCnt = $("#labelArea").find(".eachLabelArea").length;

    if (name === "login_btn")
        login.loginMember(target);
    else if (name === "logout_btn")
        logout.doLogout(target);
    else if (name === "join_btn")
        join.joinMember(target);
    else if (name === "newSurvey_btn")
        $("#listArea").load("newSurvey.html");
    else if (name === "showList_btn") {
        list.showSurveyList(target);
        $("#listArea").load("surveyList.html");
    }
    else if (name === "edit_btn") {
        $("#listArea").load("surveyEdit.html");
        survey.editSurvey(target);
    }
    else if (name === "result_btn")
        window.open("surveyResult.html?url=" + loginId + "+" + target.id, "_blank");
    else if (name === "delete_btn")
        remove.removeSurvey(target);
    else if (name === "share_btn") {
        survey.shareSurvey(target);
        modal2.style.display = "block";
    }
    else if (name === "showResultMenu") {
        $(".eachQuestionArea").remove();
        result.showStat(target);
    }
    else if (name === "copyUrl_btn")
        survey.copyUrl(target);
    else if (name === "shareEmail_btn")
        survey.shareUrlWithEmail(target);
    else if (name === "shareCancel_btn")
        modal2.style.display = "none";
    else if (name === "addQuestion_btn")
        modal.style.display = "block";
    else if (name === "saveSurvey_btn")
        survey.newSurvey(target);
    else if (name === "saveEditSurvey_btn")
        survey.saveEditedSurvey(target);
    else if (name === "addQuestionCancel_btn")
        modal.style.display = "none";
    else if (name === "addQuestionConfirm_btn") {
        survey.defAnswerType(target);
        modal.style.display = "none";
    }
    else if (name === "deleteQuestion_btn") {
        survey.deleteQuestionList(target);
        modal4.style.display = "block";
    }
    else if (name === "deleteQuestionConfirm_btn") {
        survey.deleteQuestion(target);
        modal4.style.display = "none";
    }
    else if (name === "deleteQuestionCancel_btn")
        modal4.style.display = "none";
    else if (name === "question") {
        let parentClassName = target.parentNode.className;
        console.log(parentClassName);
        if (parentClassName === "eachAnswerArea") {
            addOption_btn.disabled = false;
            addOption_btn.style.backgroundColor = "lightblue";
            deleteOption_btn.disabled = "disabled";
            deleteOption_btn.style.backgroundColor = "lightgray";
            if (findQuestionClass)
                findQuestionClass.className = "";
        }
        else {
            addEditOption_btn.disabled = false;
            addEditOption_btn.style.backgroundColor = "lightblue";
            deleteEditOption_btn.disabled = "disabled";
            deleteEditOption_btn.style.backgroundColor = "lightgray";
            if (findEditQuestionClass)
                findEditQuestionClass.className = "";
        }
        target.className = "questionToAddOption";
    }
    else if (name === "addOption_btn") {
        addOption_btn.disabled = false;
        addOption_btn.style.backgroundColor = "lightblue";
        survey.addOption(findQuestionClass);
    }
    else if (name === "addEditOption_btn") {
        addEditOption_btn.disabled = false;
        addEditOption_btn.style.backgroundColor = "lightblue";
        survey.addEditOption(findEditQuestionClass);
    }
    else if (name === "deleteOption_btn") {
        survey.deleteOption(findOptionClass);
    }
    else if (name === "labelDialog_btn")
        modal5.style.display = "block";
    else if (name === "addLabel_btn") {
        survey.addLabel(labelCnt);
    }
    else if (name === "deleteLabel_btn")
        survey.deleteLabel(findLabelClass);
    else if (name === "addLabelOption_btn")
        survey.addLabelOption(findLabelClass);
    else if (name === "deleteLabelOption_btn")
        survey.deleteLabelOption(findLabelOptionClass);
    else if (name === "labelDialogConfirm_btn")
        modal5.style.display = "none";
    else if (name === "labelDialogCancel_btn")
        modal5.style.display = "none";
    else if (name === "label") {
        let parentIdName = target.parentNode.parentNode.parentNode.id;
        console.log(parentIdName);
        if (parentIdName === "addLabelForm") {
            addLabelOption_btn.disabled = false;
            addLabelOption_btn.style.backgroundColor = "lightblue";
            deleteLabel_btn.disabled = false;
            deleteLabel_btn.style.backgroundColor = "lightblue";
            deleteLabelOption_btn.disabled = "disabled";
            deleteLabelOption_btn.style.backgroundColor = "lightgray"
        }
        else {
            addEditLabelOption_btn.disabled = false;
            addEditLabelOption_btn.style.backgroundColor = "lightblue";
            deleteEditLabel_btn.disabled = false;
            deleteEditLabel_btn.style.backgroundColor = "lightblue";
            deleteEditLabelOption_btn.disabled = "disabled";
            deleteEditLabelOption_btn.style.backgrondColor = "lightgray";
        }

        if (findLabelClass)
            findLabelClass.className = "";
        target.className = "labelToEdit";
    }
    else if (name && name.endsWith("Path")) {
        $("#base rect.rectPart").remove();
        result.setLabelChart(target);
    }
    else if (name && name.endsWith("LabelOption")) {
        let parentIdName = target.parentNode.parentNode.parentNode.id;
        console.log(parentIdName);
        if (parentIdName === "addLabelForm") {
            deleteLabelOption_btn.disabled = false;
            deleteLabelOption_btn.style.backgroundColor = "lightblue";
            addLabelOption_btn.disabled = "disabled";
            addLabelOption_btn.style.backgroundColor = "lightgray";
        }
        else {
            deleteEditLabelOption_btn.disabled = false;
            deleteEditLabelOption_btn.style.backgroundColor = "lightblue";
            addEditLabelOption_btn.disabled = "disabled";
            addEditLabelOption_btn.style.backgroundColor = "lightgray";
        }

        if (findLabelOptionClass)
            findLabelOptionClass.className = "";
        target.className = "labelOptionToDelete";
    }
    else if (name && name.endsWith("Option")) {
        let parentClassName = target.parentNode.className;
        console.log(parentClassName);
        if (parentClassName === "eachAnswerArea") {
            deleteOption_btn.disabled = false;
            deleteOption_btn.style.backgroundColor = "lightblue";
            addOption_btn.disabled = "disabled";
            addOption_btn.style.backgroundColor = "lightgray";
            if (findOptionClass)
                findOptionClass.className = "";
        }
        else {
            deleteEditOption_btn.disabled = false;
            deleteEditOption_btn.style.backgroundColor = "lightblue";
            addEditOption_btn.disabled = "disabled";
            addEditOption_btn.style.backgroundColor = "lightgray";
            if (findEditOptionClass)
                findEditOptionClass.className = "";
        }
        target.className = "optionToDelete";
    }
    else if (name === "deleteOption_btn") {
        deleteOption_btn.disabled = false;
        deleteOption_btn.style.backgroundColor = "lightblue";
        // survey.deleteOption(findOptionClass);

        console.log("delete");
        findOptionClass.remove();
    }

    else if (name === "editSurvey_btn")
        survey.saveEditedSurvey(target);
    else if (name === "addEditQuestion_btn") {
        modal3.style.display = "block";
        survey.addEditQuestion(target);
    }
    else if (name === "deleteEditQuestion_btn") {
        survey.deleteEditQuestionList(target);
        modal6.style.display = "block";
    }
    else if (name === "deleteEditQuestionConfirm_btn") {
        survey.deleteEditQuestion(target);
        modal6.style.display = "none";
    }
    else if (name === "deleteEditQuestionCancel_btn")
        modal6.style.display = "none";
    else if (name === "editLabelDialog_btn") {
        modal7.style.display = "block";
        survey.getLabelInfo(target);
    }
    else if (name === "addEditOption_btn")
        survey.addEditOption(target);
    else if (name === "deleteEditOption_btn")
        survey.deleteEditOption(findEditOptionClass);
    else if (name === "addEditQuestion_cancelBtn")
        modal3.style.display = "none";
    else if (name === "saveSurveyResponse_btn") {
        response.saveResponse(target);
    }
    else if (name === "addEditOption_btn") {
        addEditOption_btn.disabled = false;
        addEditOption_btn.style.backgroundColor = "lightblue";
        survey.addOption(findQuestionClass);
    }
    else if (name === "addEditLabel_btn")
        survey.addLabel(target);
    else if (name === "deleteEditLabel_btn")
        survey.deleteLabel(findLabelClass);
    else if (name === "addEditLabelOption_btn")
        survey.addLabelOption(findLabelClass);
    else if (name === "deleteEditLabelOption_btn")
        survey.deleteLabelOption(findLabelOptionClass);
    else if (name === "labelEditDialogConfirm_btn")
        modal7.style.display = "none";
    else if (name === "labelEditDialogCancel_btn")
        modal7.style.display = "none";
    else if (name === "responseDialogConfirm_btn") {
        survey.chkPreQuestion(target);
    }
    else if (name === "showStat_btn") {
        $("#wholeSurveyResultArea").load("surveyStat.html");
        result.showStat(target);
    }
    else if (name === "showResult_btn") {
        let title = localStorage.getItem("title"),
            creatorId = sessionStorage.getItem("id");
        console.log(title);
        location.href = "surveyResult.html?url=" + creatorId + "+" + title;
    }
    else if (name === "statDialogClose_btn")
        modal9.style.display = "none";

    else if (name === "moveToIndex")
        window.open("index.html", "_blank");
    else if (name && name != "question" && !(name.endsWith("Option")) && !(name.endsWith("LabelOption")) && !(name.endsWith("Path")) && !($("input[id^='standardBtn']"))) {
        if (addOption_btn.disabled === false) {
            addOption_btn.disabled = "disabled";
            addOption_btn.style.backgroundColor = "lightgray";
        }
        if (deleteOption_btn.disabled === false) {
            deleteOption_btn.disabled = "disabled";
            deleteOption_btn.style.backgroundColor = "lightgray";
        }
        if (deleteLabelOption_btn.disabled === false) {
            deleteLabelOption_btn.disabled = "disabled";
            deleteLabelOption_btn.style.backgroundColor = "lightgray";
        }
        else {
            console.log("blank");
        }
    }
}

function doKeyDown(e) {

}

export default {
    init: () => {
        let $documentEl = $(document);

        $documentEl
            .on("click", doMouseClick)
            .on("keydown", doKeyDown);
    }
};