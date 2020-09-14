import util from "../common/network.js";
import {colors} from "../common/colors.js";
import '/libs/jquery-3.4.1.min.js';
import '/libs/jquery.fileDownload.js';

function alertClass (alert, addingClass, text) {
    setTimeout(function () {
        alert.removeClass();
        alert.addClass('alert');
        alert.addClass(addingClass).html(text);
    }, 1000);

    setTimeout(function () {
        alert.removeClass();
        alert.addClass('surveyAlert');
        alert.text('');
    }, 2000);
    alert.removeAttr('style');
}

function getEachOptionEle(answerType, optionArr = []){
    let returnElement = document.createElement("div");

    if(answerType === "radio" || answerType === "checkbox"){
        let optionP = null,
            eachOptionDiv = null,
            optionPreview = null,
            optionInput = null,
            optionDeleteBtn = null,
            optionType = null;

        if (answerType === "checkbox")
            optionType = "checkbox";
        else
            optionType = "radio";

        optionP = document.createElement("p");
        optionP.innerText = "선택지 : ";
        returnElement.appendChild(optionP);

        if(optionArr.length){
            function getEachOptionDiv(){}


            for(let i = 0; i < optionArr.length; i++){
                if(optionArr[i] != null && optionArr[i] !== ""){
                    optionPreview = document.createElement("input");
                    optionPreview.type = optionType;
                    optionPreview.value = " ";

                    optionInput = document.createElement("input");
                    optionInput.type = "text";
                    optionInput.placeholder = "보기를 입력하세요";
                    optionInput.className = 'Option';
                    optionInput.name = 'Option';
                    optionInput.value = optionArr[i];

                    optionDeleteBtn = document.createElement("input");
                    optionDeleteBtn.type = "button";
                    optionDeleteBtn.className = "optionDelete";
                    optionDeleteBtn.name = "deleteOption_btn";

                    eachOptionDiv = document.createElement("div");
                    eachOptionDiv.className = "eachOption";
                    eachOptionDiv.appendChild(optionPreview);
                    eachOptionDiv.appendChild(optionInput);
                    eachOptionDiv.appendChild(optionDeleteBtn);
                    returnElement.appendChild(eachOptionDiv);
                }
            }

            optionPreview = document.createElement("input");
            optionPreview.type = optionType;
            optionPreview.value = " ";

            optionInput = document.createElement("input");
            optionInput.type = "text";
            optionInput.placeholder = "보기를 입력하세요";
            optionInput.className = 'Option';
            optionInput.name = 'Option';

            optionDeleteBtn = document.createElement("input");
            optionDeleteBtn.type = "button";
            optionDeleteBtn.className = "optionDelete";
            optionDeleteBtn.name = "deleteOption_btn";

            eachOptionDiv = document.createElement("div");
            eachOptionDiv.className = "eachOption";
            eachOptionDiv.appendChild(optionPreview);
            eachOptionDiv.appendChild(optionInput);
            eachOptionDiv.appendChild(optionDeleteBtn);
            returnElement.appendChild(eachOptionDiv);
        }else{
            for(let i = 0; i < 2; i++){
                optionPreview = document.createElement("input");
                optionPreview.type = optionType;
                optionPreview.value = " ";

                optionInput = document.createElement("input");
                optionInput.type = "text";
                optionInput.placeholder = "보기를 입력하세요";
                optionInput.className = 'Option';
                optionInput.name = 'Option';

                optionDeleteBtn = document.createElement("input");
                optionDeleteBtn.type = "button";
                optionDeleteBtn.className = "optionDelete";
                optionDeleteBtn.name = "deleteOption_btn";

                eachOptionDiv = document.createElement("div");
                eachOptionDiv.className = "eachOption";
                eachOptionDiv.appendChild(optionPreview);
                eachOptionDiv.appendChild(optionInput);
                eachOptionDiv.appendChild(optionDeleteBtn);
                returnElement.appendChild(eachOptionDiv);
            }
        }
    }
    else if(answerType === "text"){
        let answerP = null,
            answerInput = null;

        answerP = document.createElement("p");
        answerP.innerText = "답변 : ";
        returnElement.appendChild(answerP);

        answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.placeholder = "주관식 답변 텍스트";
        answerInput.setAttribute("readonly", "readonly");
        returnElement.appendChild(answerInput);
    }
    else if(answerType === "file"){
        const randomId = Math.random().toString().substr(2);
        let answerP = null;

        let answerChkDiv = null,
            answerChkbox = null,
            answerLabel = null,
            answerInputHidden = null;

        answerP = document.createElement("p");
        answerP.innerText = "답변 : ";
        returnElement.appendChild(answerP);

        answerChkDiv = document.createElement("div");
        answerChkDiv.className = "eachAnswerFileType";

        answerChkbox = document.createElement("input");
        answerChkbox.type = "checkbox";
        answerChkbox.name = "file_image";
        answerChkbox.id = `image_${randomId}`;
        answerLabel = document.createElement("label");
        answerLabel.setAttribute("for", `image_${randomId}`);
        answerLabel.innerHTML = "이미지(jpg/jpeg/png)";

        answerChkDiv.appendChild(answerChkbox);
        answerChkDiv.appendChild(answerLabel);

        answerChkbox = document.createElement("input");
        answerChkbox.type = "checkbox";
        answerChkbox.name = "file_video";
        answerChkbox.id = `video_${randomId}`;
        answerLabel = document.createElement("label");
        answerLabel.setAttribute("for", `video_${randomId}`);
        answerLabel.innerHTML = "동영상(avi/mkv/mov)";

        answerChkDiv.appendChild(answerChkbox);
        answerChkDiv.appendChild(answerLabel);

        answerChkbox = document.createElement("input");
        answerChkbox.type = "checkbox";
        answerChkbox.name = "file_doc";
        answerChkbox.id = `doc_${randomId}`;
        answerLabel = document.createElement("label");
        answerLabel.setAttribute("for", `doc_${randomId}`);
        answerLabel.innerHTML = "문서(hwp/doc)";

        answerChkDiv.appendChild(answerChkbox);
        answerChkDiv.appendChild(answerLabel);

        answerInputHidden = document.createElement("input");
        answerInputHidden.type = "hidden";
        answerInputHidden.name = "fileType";

        answerChkDiv.appendChild(answerInputHidden);

        answerP = document.createElement("p");
        answerP.innerText = "※ 파일은 최대 1개, 100mb 로 제한합니다.";

        returnElement.appendChild(answerChkDiv);
        returnElement.appendChild(answerP);
    }
    else if(answerType === "date" || answerType === "time"){
        let optionType = null;

        if (answerType === "date")
            optionType = "date";
        else
            optionType = "time";

        let answerP = null,
            answerInput = null;

        answerP = document.createElement("p");
        answerP.innerText = "답변 : ";
        returnElement.appendChild(answerP);

        answerInput = document.createElement("input");
        answerInput.type = optionType;
        answerInput.setAttribute("readonly", "readonly");
        returnElement.appendChild(answerInput);
    }

    return returnElement;
}

function getInactiveAnswerAreaEle(){
    const defaultAnswerType = "radio";
    let eachAnswerArea = null,
        answerTypeDiv = null,
        answerTypeSelect = null,
        questionDiv = null,
        questionP = null,
        questionInput = null,
        questionDeleteDiv = null,
        questionDeleteBtn = null,
        optionDiv = null,
        optionP = null,
        optionInput = null,
        answerInput = null,
        imgInput = null,
        distance = null,
        deleteAnswerOption = null,
        optionToRemove = null,
        optionPreview = null;

    //start append question, answer, answerType area
    eachAnswerArea = document.createElement("div");
    eachAnswerArea.className = "eachAnswerArea inactive";

    //1. add question
    questionDiv = document.createElement("div");
    questionDiv.className = "eachQuestionDiv";

    questionP = document.createElement("p");
    questionP.innerText = "문항 : ";

    questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.name = "question";
    questionInput.className = "question";

    questionDiv.appendChild(questionP);
    questionDiv.appendChild(questionInput);
    eachAnswerArea.appendChild(questionDiv);

    //2. add question Delete Button
    questionDeleteDiv = document.createElement("div");
    questionDeleteDiv.className = "eachQuestionDeleteDiv";

    questionDeleteBtn = document.createElement("input")
    questionDeleteBtn.type = "button";
    questionDeleteBtn.name = "deleteQuestion_btn";
    questionDeleteBtn.id = "deleteQuestion_btn";
    questionDeleteDiv.appendChild(questionDeleteBtn);
    eachAnswerArea.appendChild(questionDeleteDiv);

    //3. add answerType Div
    answerTypeDiv = document.createElement("div");
    answerTypeDiv.className = "eachAnswerTypeDiv";
    answerTypeSelect = document.getElementById("addAnswerTypeSelect").cloneNode(true);
    answerTypeSelect.removeAttribute("id");
    answerTypeDiv.appendChild(answerTypeSelect);
    eachAnswerArea.appendChild(answerTypeDiv);

    //4. add option
    optionDiv = document.createElement("div");
    optionDiv.className = "eachAnswerDiv";

    optionP = document.createElement("p");
    optionP.innerText = "선택지 : ";
    optionDiv.appendChild(optionP);

    for (let i=0; i<2; i++) {
        const optionDeleteBtn = document.createElement("input");
        optionDeleteBtn.type = "button";
        optionDeleteBtn.className = "optionDelete";
        optionDeleteBtn.name = "deleteOption_btn";

        let eachOptionDiv = null;

        optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "보기를 입력하세요";
        optionInput.className = "Option";
        optionInput.name = "Option";

        optionPreview = document.createElement("input");
        optionPreview.type = defaultAnswerType;

        eachOptionDiv = document.createElement("div");
        eachOptionDiv.className = "eachOption";
        eachOptionDiv.appendChild(optionPreview);
        eachOptionDiv.appendChild(optionInput);
        eachOptionDiv.appendChild(optionDeleteBtn);
        optionDiv.appendChild(eachOptionDiv);
    }
    eachAnswerArea.appendChild(optionDiv);

    answerInput = document.createElement("input");
    answerInput.type = "hidden";
    answerInput.value = defaultAnswerType;
    answerInput.name = "questionType";
    questionInput.after(answerInput);

    return eachAnswerArea;
}

export var survey = {
    newSurvey: function (target) {
        const alert = $(".surveyAlert");
        let isvalid = true;

        $("#creatorId").val(sessionStorage.getItem("id"));

        let idTitle = sessionStorage.getItem("id") + "/" + $("input[name='title']").val();
        $("#url").val(encodeURIComponent(idTitle));
        //$("#url").val(encryptURL);

        let endTime = "9999-12-31T23:59:59";
        if($("#endTime").val() !== ""){ endTime = $("#endTime").val().replace(' ', 'T'); }
        endTime = endTime.split('.')[0];
        $("#endTime").val(endTime);

        if($("input[name='question']", "div.eachAnswerArea:not(.inactive) ").length == 0) {
            alertClass(alert, 'alert-warning', '최소 한 개 이상의 문항을 등록해주세요');
            return false;
        }

        $("div.eachAnswerArea:not(.inactive)").each(function(){
            const questionType = $("input[name='questionType']", this).val();

            if(questionType == "radio" || questionType == "checkbox"){
                let validOptionLength = 0;
                $("input[name$='Option']", this).each(function(){
                    if($(this).val() != undefined && $(this).val() != ""){
                        validOptionLength += 1;
                    }
                });

                if(validOptionLength == 0){
                    const questionStr = $("input[name='question']", this).val();
                    alertClass(alert, 'alert-error', `${questionStr} 문항에 최소 한개 이상의 선택지를 입력바랍니다.`);
                    isvalid = false;
                    return false;
                }
            }
        });

        if(!isvalid){
            return false;
        }

        $("input[name$='Option']").each(function(){
            if($(this).val()){
                $(this).attr("name", $(this).parents("div.eachAnswerArea").find("input[name='question']").val() + "Option");
            }
        });

        $("div.eachAnswerFileType").each(function(){
            let fileTypeJsonObj = new Object();
            let fileTypeArr = new Array();

            $("input[name^='file_']", this).each(function(){
                const fileType = $(this).attr("name").replace("file_", "");

                if($(this).prop("checked")){
                    fileTypeArr.push(fileType);
                }
            });

            fileTypeJsonObj.fileType = fileTypeArr;
            $("input[name='fileType']", this).val(JSON.stringify(fileTypeJsonObj));

            $("input[name='fileType']", this).each(function(){
                $(this).attr("name", $(this).parents("div.eachAnswerArea").find("input[name='question']").val() + "FileType");
            });
        });

        let form = $("#surveyForm").serialize() + "&" + $("#settingForm").serialize(),
            listArea = $("#listArea");

        function surveySuccessCb(data) {
            let form = null;

            if(data.result === 1) {
                list.showSurveyList(target);
                listArea.load("surveyList.html");
                alertClass(alert, 'alert-success', '새로운 설문조사가 저장되었습니다');
            }
            else if (data.result === 0) {
                alertClass(alert, 'alert-warning', '같은 제목의 설문조사가 존재합니다');
                return false;
            }
            else if (data.result === 2) {
                alertClass(alert, 'alert-warning', '마감일을 현재 날짜 이전의 값으로 설정할 수 없습니다');
                return false;
            }

            $("#addTitle").val($("#title").val());
            $("#addUserId").val($("#creatorId").val());

            form = $("#addLabelForm").serialize();

            if (form)
                util.requestURL("/doNewLabel", form, labelSuccessCb, errorCb);
            else
                labelSuccessCb(null);
        }

        function labelSuccessCb(data) {
            console.log(data);
            console.log("success");

            location.href = "index.html";
        }

        function errorCb() {
            alertClass(alert, 'alert-error', '설문조사 등록 에러입니다');
        }

        util.requestURL("/doNewSurvey", form, surveySuccessCb, errorCb);

    },
    addInactiveAnswerArea (target) {
        const inactiveAnswerArea = getInactiveAnswerAreaEle();
        target.appendChild(inactiveAnswerArea);

        $(target).sortable({items : " > div:not(.inactive)"});
    },
    deleteQuestion : function(target) {
        if(!$(target).parents("div.eachAnswerArea ").hasClass("inactive")){
            if(document.getElementsByClassName("eachAnswerArea").length === 1){
                const alert = $(".surveyAlert");
                alertClass(alert, 'alert-warning', '최소 한개 이상의 문항이 필요합니다.');
                return false;
            }

            $(target).parents("div.eachAnswerArea").remove();
        }
    },
    deleteOption : function(target) {
        if(!$(target).parents("div.eachAnswerArea ").hasClass("inactive")
            && $(target).siblings("input[type='text']").val() != ""){
            if($(target).parents("div.eachAnswerDiv").find("div.eachOption").length === 1){
                const alert = $(".surveyAlert");
                alertClass(alert, 'alert-warning', '최소 한개 이상의 선택지가 필요합니다.');
                return false;
            }

            target.parentElement.remove();
        }
    },
    addLabel : function (target) {
        console.log(target);

        let labelArea = $("#labelArea")[0],
            eachLabelArea = document.createElement("div"),
            label = document.createElement("input"),
            labelValue = "",
            option = null,
            labelNickname = null,
            labelNicknameTitle = null,
            labelTitle = null,
            optionTitle = null,
            optionPreview = null,
            areaIdx = 0,
            optionCnt = 0,
            distance = null;

        let labelNicknameHelp = null,
            labelNicknameHelpImg = null,
            labelNicknameHelpSpan = null;

        eachLabelArea.className = "eachLabelArea";
        labelArea.append(eachLabelArea);

        console.log($(".eachLabelArea").index());
        areaIdx = $(".eachLabelArea").index() + 1;

        label.type = "text";
        label.name = "label";
        label.placeholder = "사전질문 제목을 입력하세요";
        eachLabelArea.append(label);

        labelTitle = document.createElement("p");
        labelTitle.innerText = "문항 : ";
        eachLabelArea.prepend(labelTitle);

        $("input[name='label']").keyup(function () {
            $(this)[0].parentNode.id = $(this)[0].value;
            labelValue = $(this)[0].parentNode.id;
            labelNickname.name = labelValue + "LabelNickname";

            $(".eachLabelArea .LabelOption").attr("name", labelValue + "LabelOption");
        });

        labelNicknameTitle = document.createElement("span");
        labelNicknameTitle.innerHTML = "라벨 : ";
        label.after(labelNicknameTitle);

        labelNicknameHelp = document.createElement("span");
        labelNicknameHelp.className = "tooltip";
        labelNicknameTitle.after(labelNicknameHelp);

        labelNicknameHelpImg = document.createElement("img");
        labelNicknameHelpImg.src = "/img/question.png";
        labelNicknameHelpImg.className = "tooltipMark";
        labelNicknameHelp.append(labelNicknameHelpImg);

        labelNicknameHelpSpan = document.createElement("span");
        labelNicknameHelpSpan.className = "tooltiptext";
        labelNicknameHelpSpan.style.marginLeft = "-50px";
        labelNicknameHelpSpan.innerText = "응답 결과 수치에 선택한 기준 항목을 추가하여 더 상세하게 볼 수 있습니다. 기준 항목은 사전 질문에 정의한 라벨값입니다.";
        labelNicknameHelp.append(labelNicknameHelpSpan);

        labelNickname =document.createElement("input");
        labelNickname.type = "text";
        labelNickname.placeholder = "라벨을 입력하세요";
        labelNicknameHelp.after(labelNickname);

        optionTitle = document.createElement("p");
        optionTitle.innerText = "선택지 : ";
        labelNickname.after(optionTitle);

        for (let i=0; i<2; i++) {
            option = document.createElement("input");
            option.type = "text";
            option.placeholder = "선택지를 입력하세요";
            option.className = "LabelOption";
            eachLabelArea.append(option);

            optionPreview = document.createElement("input");
            optionPreview.type = "radio";
            optionPreview.value = " ";
            option.before(optionPreview);

            // distance = document.createElement("p");
            // option.after(distance);
        }
    },
    deleteLabel : function (target) {
        console.log(target);
        console.log(target.parentNode);

        target.parentNode.remove();
    },
    addLabelOption : function (target) {
        console.log(target);

        let targetLabel = target.value,
            targetParentArea = target.parentNode,
            optionPreview = null,
            distance = null;

        console.log(targetLabel);

        let labelOptionInput = document.createElement("input");
        labelOptionInput.type = "text";
        labelOptionInput.placeholder = "라벨 보기를 입력하세요";
        labelOptionInput.className = "LabelOption";
        labelOptionInput.name = targetLabel + "LabelOption";
        targetParentArea.append(labelOptionInput);

        optionPreview = document.createElement("input");
        optionPreview.type = "radio";
        optionPreview.value = " ";
        labelOptionInput.before(optionPreview);

        // distance = document.createElement("p");
        // // distance.innerHTML = " ";
        // labelOptionInput.after(distance);
    },
    deleteLabelOption : function (target) {
        console.log(target);
        console.log(target.id);

        target.remove();
        target.prev().remove();
    },
    editSurvey : function(target) {
        let userId = sessionStorage.getItem("id"),
            title = target.id,
            pageValue = "{\"userId\" : \"" + userId + "\", \"title\" : \"" + title + "\"}";

        function getSurveyInfo (data) {
            let surveyNumValue = "{\"surveyNum\" : " +data.surveyNum + "}";

            util.requestURL("/doEditSurvey", JSON.parse(surveyNumValue), setSurveyInfo, errorCb);
        }

        function setSurveyInfo (data) {
            const surveyInfo = data.survey[0],
                title = surveyInfo.title,
                expl = surveyInfo.expl,
                creatorId = surveyInfo.creatorId,
                endTime = surveyInfo.endTime.replace(' ', 'T').split('.')[0],
                questionCnt = surveyInfo.questionCnt,
                emailCollectYN = surveyInfo.emailCollect,
                emailOpenYN = surveyInfo.emailOpen;

            $("#editTitleWithForm").remove();

            // 1. set basic survey info
            $("#editTitle").show();
            let editTitleArea = $("#editTitle"),
                editExplArea = $("#expl"),
                editEndTimeArea = $("#endTime");

            editTitleArea.text(title);
            editExplArea.val(expl);

            editEndTimeArea.val(endTime);

            // 2. set hidden values
            let hiddenTitleValue = $("#title"),
                hiddenCreatorIdValue = $("#creatorId");

            hiddenTitleValue.val(title);
            hiddenCreatorIdValue.val(creatorId);

            //3. add each question
            for (let i=0; i<questionCnt; i++){
                const questionInfo =  surveyInfo.questions[i],
                    questionValue = questionInfo.questionValue,
                    questionTypeValue = questionInfo.questionType,
                    extInfo = questionInfo.extInfo;

                let eachAnswerArea = null,
                    questionDiv = null,
                    questionP = null,
                    questionInput = null,
                    questionDeleteDiv = null,
                    questionDeleteBtn = null,
                    answerTypeDiv = null,
                    answerTypeSelect = null,
                    answerTypeInput = null,
                    answerElement = null;

                eachAnswerArea = document.createElement("div");
                eachAnswerArea.id = "eachAnswerArea";
                eachAnswerArea.className = "eachAnswerArea";

                //3-1. add question
                questionDiv = document.createElement("div");
                questionDiv.className = "eachQuestionDiv";

                questionP = document.createElement("p");
                questionP.innerText = "문항 : ";

                questionInput = document.createElement("input");
                questionInput.type = "text";
                questionInput.name = "question";
                questionInput.className = "question";
                questionInput.value = questionValue;

                questionDiv.appendChild(questionP);
                questionDiv.appendChild(questionInput);
                eachAnswerArea.appendChild(questionDiv);

                //3-2. add question Delete Button
                questionDeleteDiv = document.createElement("div");
                questionDeleteDiv.className = "eachQuestionDeleteDiv";

                questionDeleteBtn = document.createElement("input")
                questionDeleteBtn.type = "button";
                questionDeleteBtn.name = "deleteQuestion_btn";
                questionDeleteBtn.id = "deleteQuestion_btn";
                questionDeleteDiv.appendChild(questionDeleteBtn);
                eachAnswerArea.appendChild(questionDeleteDiv);

                //3-3. add answerType Select
                answerTypeDiv = document.createElement("div");
                answerTypeDiv.className = "eachAnswerTypeDiv";
                answerTypeSelect = document.getElementById("addAnswerTypeSelect").cloneNode(true);
                answerTypeSelect.removeAttribute("id");
                answerTypeDiv.appendChild(answerTypeSelect);
                eachAnswerArea.appendChild(answerTypeDiv);

                answerTypeInput = document.createElement("input");
                answerTypeInput.type = "hidden";
                answerTypeInput.name = "questionType";
                answerTypeInput.value = questionTypeValue;
                questionInput.after(answerTypeInput);

                //3-4. add option
                if (questionTypeValue === "radio" || questionTypeValue === "checkbox") {
                    const optionCnt = questionInfo.optionCnt;
                    let optionArr = [];

                    for (let j=0; j<optionCnt; j++) {
                        optionArr.push(questionInfo.options[j].optionValue);
                    }
                    answerElement = getEachOptionEle(questionTypeValue, optionArr);
                }
                else {
                    answerElement = getEachOptionEle(questionTypeValue);
                }
                answerElement.className = "eachAnswerDiv";
                $(eachAnswerArea).append(answerElement);

                //3-5. add all
                $("#addAnswerArea").append(eachAnswerArea);

                //3-6. set answerType select value
                survey.changeAnswerType(answerTypeSelect.querySelector(`a[name='answerType_${questionTypeValue}']`))

                //3-7. set fileType checkbox
                survey.setExtInfo($(eachAnswerArea), extInfo);
            }

            //4. set settings
            if(emailCollectYN == "1"){
                $("#emailCollect").prop("checked", true);
                $("#emailOpen").attr("disabled", false);
            }
            if(emailOpenYN == "1"){
                $("#emailOpen").prop("checked", true);
                $("#emailOpen").attr("disabled", false);
            }

            //5. add default inactive answerArea
            $("#addAnswerArea").append(getInactiveAnswerAreaEle());

            //6. set sortable
            $("#addAnswerArea").sortable({items : " > div:not(.inactive)"});
        }

        function errorCb () {
            console.log("error");
        }

        util.requestURL("/doFindSurveyNum", JSON.parse(pageValue), getSurveyInfo, errorCb);
    },
    deleteEditOption : function (target) {
        console.log(target);
        console.log(target.prev());
        console.log(target.id);
        console.log($("#" + target.id));
        console.log($("#" + target.id).index());
        console.log($("#" + target.id).index(this));
        console.log($("#" + target.id + ":nth-child(0)"));
        console.log($("#" + target.id).prev()[0]);

        target.remove();
        $("#" + target.id).prev()[0].remove();
    },
    getLabelInfo : function (target) {
        console.log(target);
        let title = $("#surveyEditArea #editQuestionArea #editTitle")[0].innerText,
            userId = sessionStorage.getItem("id"),
            surveyValue = "{\"userId\" : \"" + userId + "\", \"title\" : \"" + title + "\"}";
        console.log(surveyValue);

        function successCb (data) {
            console.log(data);

            let labelArea = $("#labelArea"),
                eachLabelArea = null,
                labelCnt = data.labelInfo.length,
                labelOptionCnt = 0;

            let labelTitle = null,
                labelValue = null,
                labelNickname = null,
                labelNicknameTitle = null,
                labelNicknameHelp = null,
                labelNicknameHelpImg = null,
                labelNicknameHelpSpan = null,
                optionTitle = null;

            for (let i=0; i<labelCnt; i++) {
                labelOptionCnt = data.labelInfo[i].labelOptionCnt;

                eachLabelArea = document.createElement("div");
                eachLabelArea.className = "eachLabelArea";

                labelTitle = document.createElement("p");
                labelTitle.innerText = "문항 : ";
                eachLabelArea.prepend(labelTitle);

                $("input[name='label']").keyup(function () {
                    $(this)[0].parentNode.id = $(this)[0].value;
                    labelValue = $(this)[0].parentNode.id;
                    labelNickname.name = labelValue + "LabelNickname";

                    $(".eachLabelArea .LabelOption").attr("name", labelValue + "LabelOption");
                });

                let labelInput = document.createElement("input");
                labelInput.type = "text";
                labelInput.value = data.labelInfo[i].labelName;
                labelInput.name = "label";
                eachLabelArea.append(labelInput);

                labelNicknameTitle = document.createElement("span");
                labelNicknameTitle.innerHTML = "라벨 : ";
                labelInput.after(labelNicknameTitle);

                labelNicknameHelp = document.createElement("span");
                labelNicknameHelp.className = "tooltip";
                labelNicknameTitle.after(labelNicknameHelp);

                labelNicknameHelpImg = document.createElement("img");
                labelNicknameHelpImg.src = "/img/question.png";
                labelNicknameHelpImg.className = "tooltipMark";
                labelNicknameHelp.append(labelNicknameHelpImg);

                labelNicknameHelpSpan = document.createElement("span");
                labelNicknameHelpSpan.className = "tooltiptext";
                labelNicknameHelpSpan.style.marginLeft = "-50px";
                labelNicknameHelpSpan.innerText = "응답 결과 수치에 선택한 기준 항목을 추가하여 더 상세하게 볼 수 있습니다. 기준 항목은 사전 질문에 정의한 라벨값입니다.";
                labelNicknameHelp.append(labelNicknameHelpSpan);

                labelNickname =document.createElement("input");
                labelNickname.type = "text";
                labelNickname.placeholder = "라벨을 입력하세요";
                labelNickname.name = data.labelInfo[i].labelName + "LabelNickname";
                labelNickname.value = data.labelInfo[i].labelNickname;
                labelNicknameHelp.after(labelNickname);

                optionTitle = document.createElement("p");
                optionTitle.innerText = "선택지 : ";
                labelNickname.after(optionTitle);

                for (let j=0; j<labelOptionCnt; j++) {
                    let optionRadio = document.createElement("input");
                    optionRadio.type = "radio";
                    optionRadio.innerText = "";
                    eachLabelArea.append(optionRadio);

                    let labelOptionInput = document.createElement("input");
                    labelOptionInput.type = "text";
                    labelOptionInput.value = data.labelInfo[i].options[j].labelOptionValue;
                    labelOptionInput.class = data.labelInfo[i].labelName + "LabelOption";
                    labelOptionInput.name = data.labelInfo[i].labelName + "LabelOption";
                    eachLabelArea.append(labelOptionInput);
                }
                labelArea.append(eachLabelArea);
            }
        }

        function errorCb () {
            console.log("error");
        }

        util.requestURL("/doGetLabelInfo", JSON.parse(surveyValue), successCb, errorCb);
    },
    saveEditedSurvey: function (target) {
        const alert = $(".surveyAlert");
        let isvalid = true;

        let idTitle = sessionStorage.getItem("id") + "/" + $("input[name='title']").val();

        let endTime = "9999-12-31T23:59:59";
        if($("#endTime").val() !== ""){ endTime = $("#endTime").val().replace(' ', 'T'); }
        endTime = endTime.split('.')[0];
        $("input[name=endTime]").val(endTime);

        $("#creatorId").val(sessionStorage.getItem("id"));
        $("#url").val(encodeURIComponent(idTitle));
        $("input[name=expl]").val($("#expl").val());

        if($("input[name='question']", "div.eachAnswerArea:not(.inactive) ").length == 0) {
            alertClass(alert, 'alert-warning', '최소 한 개 이상의 문항을 등록해주세요');
            return false;
        }

        $("div.eachAnswerArea:not(.inactive)").each(function(){
            const questionType = $("input[name='questionType']", this).val();

            if(questionType == "radio" || questionType == "checkbox"){
                let validOptionLength = 0;
                $("input[name$='Option']", this).each(function(){
                    if($(this).val() != undefined && $(this).val() != ""){
                        validOptionLength += 1;
                    }
                });

                if(validOptionLength == 0){
                    const questionStr = $("input[name='question']", this).val();
                    alertClass(alert, 'alert-error', `${questionStr} 문항에 최소 한개 이상의 선택지를 입력바랍니다.`);
                    isvalid = false;
                    return false;
                }
            }
        });

        if(!isvalid){
            return false;
        }

        $("input[name$='Option']").each(function(){
            if($(this).val()){
                $(this).attr("name", $(this).parents("div.eachAnswerArea").find("input[name='question']").val() + "Option");
            }
        });

        $("div.eachAnswerFileType").each(function(){
            let fileTypeJsonObj = new Object();
            let fileTypeArr = new Array();

            $("input[name^='file_']", this).each(function(){
                const fileType = $(this).attr("name").replace("file_", "");

                if($(this).prop("checked")){
                    fileTypeArr.push(fileType);
                }
            });

            fileTypeJsonObj.fileType = fileTypeArr;
            $("input[name='fileType']", this).val(JSON.stringify(fileTypeJsonObj));

            $("input[name='fileType']", this).each(function(){
                $(this).attr("name", $(this).parents("div.eachAnswerArea").find("input[name='question']").val() + "FileType");
            });
        });

        let form = $("#editSurveyForm").serialize();

        function saveNewSurvey(data) {
            console.log("success");

            form = $("#editSurveyForm").serialize() + "&" + $("#settingForm").serialize();

            util.requestURL("/doNewSurvey", form, editLabel, errorCb);
        }

        function editLabel (data) {
            if(data.result == -1){
                alertClass(alert, 'alert-error', '동일한 제목의 설문이 존재합니다. 다른 설문 제목을 입력해주시기 바랍니다.');
                return false;
            }

            $("#addTitle").val($("#title").val());
            $("#addUserId").val($("#creatorId").val());

            console.log(data);
            console.log("success");

            form = $("#addEditLabelForm").serialize();
            console.log(form);
            util.requestURL("/doNewLabel", form, labelSuccessCb, errorCb);
        }

        function labelSuccessCb(data) {
            console.log(data);
            console.log("success");
            location.href = "index.html";
        }

        function errorCb () {
            console.log("error");
        }

        if($("#isCopySurvey").val()){
            saveNewSurvey();
        }else{
            util.requestURL("/doSaveEditedSurvey", form, saveNewSurvey, errorCb);
        }
    },
    chkPreQuestion : function (target) {
        let isEmpty = false,
            isEmptyArr = new Array(),
            modal = $("#responseLabel_dialog")[0],
            alert = $("#responseLabel_dialog .surveyAlert"),
            labelNum = $(".eachLabelArea").length;

        for (let i = 0; i < labelNum; i++) {
            $("#responseLabelArea .eachLabelArea").eq(i).find("input[type='radio']").each(function () {
                console.log($(this)[0]);
                console.log("isEmpty[" + i + "] : " + !$(this).prop("checked"));
                if (!$(this).prop("checked")) {
                    isEmptyArr[i] = true;
                }
                else {
                    isEmptyArr[i] = false;
                    return false;
                }
            });
        }

        console.log(isEmptyArr);
        if (isEmptyArr.every(chkLabel) === true)
            modal.style.display = "none";
        else {
            alertClass(alert, 'alert-warning', '사전 질문에 답변해주세요');
            return false;
        }

        function chkLabel(value) {
            return value === false;
        }
    },
    shareSurvey: function (target) {
        let targetTitle = target.parentNode.parentNode.firstChild.innerText,
            targetCreatorId = sessionStorage.getItem("id"),
            targetValue = "{\"targetTitle\" : \"" + targetTitle + "\", \"targetCreatorId\" : \"" + targetCreatorId + "\"}",
            urlInput = $("#shareLink");

        console.log(target);
        console.log(targetTitle);
        console.log(targetCreatorId);

        function successCb (data) {
            console.log(data);
            console.log(data.url);
            urlInput.select();
            urlInput.attr('value', "172.30.7.77:8080/html/surveyResponse.html?url=" + data.url);
        }

        function errorCb () {
            console.log("error");
        }

        console.log(targetValue);
        util.requestURL("/doGetSurveyUrl", JSON.parse(targetValue), successCb, errorCb);
    },
    copyUrl: function (target) {
        let urlInput = document.getElementById("shareLink"),
              urlAlert = $(".surveyAlert");
        console.log(urlInput.value);

        urlInput.select();
        document.execCommand("Copy");

        alertClass(urlAlert, "alert-success", "URL이 복사되었습니다");
    },
    shareUrlWithEmail: function (target) {
        console.log(target);
        let alert = $(".surveyAlert"),
            username = sessionStorage.getItem("id"),
            email = $("#emailShare")[0].value,
            emailValue = "",
            url = document.getElementById("shareLink").value;

        let chkText = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if (chkText.test(email) === false) {
            alertClass(alert, 'alert-warning', '올바른 이메일 형식을 입력해주세요');
            return false;
        }

        url = "172.30.7.77:8080/html/surveyResponse.html?url=" + url;
        console.log(url);

        console.log(email);
        console.log(url);

        let testElement = document.createElement("a");
        testElement.setAttribute("href", url);

        emailValue = "mailto:" + email;
        emailValue += "?subject=" + username + "님의 설문조사에 응답해주세요";
        emailValue += "&body=아래의 링크에 접속하세요%0D%0A%0D%0A" + url + "%0D%0A%0D%0A";

        let emailTag = document.createElement("a");
        emailTag.setAttribute("href", emailValue);
        emailTag.setAttribute("id", "sendEmail");

        document.body.appendChild(emailTag);
        $("#sendEmail").get(0).click();

        // alertClass(alert, "alert-success", "메일 전송이 완료되었습니다");
    },
    copySurvey(target){
        const userId = sessionStorage.getItem("id"),
            surveyNum = target.id.replace("surveyNum_", "");
        const surveyNumJsonParam = `{"surveyNum" : "${surveyNum}"}`;

        function successCb(data){
            const surveyJsonObj = data.survey[0],
                title = surveyJsonObj.title,
                expl = surveyJsonObj.expl,
                questionCnt = surveyJsonObj.questionCnt;
            let optionCnt = 0;

            //1. basic survey info
            $("#editTitle").remove();

            $("#editTitleWithForm").show();
            $("#title_form", "#editTitleWithForm").val(`${title} 사본`);
            $("#title").remove();

            $("#expl").val(expl);

            //2. set iscopysurvey true
            $("#isCopySurvey").val(true);

            //3. add each question
            for (let i=0; i<questionCnt; i++){
                const questionInfo =  surveyJsonObj.questions[i],
                    questionValue = questionInfo.questionValue,
                    questionTypeValue = questionInfo.questionType,
                    extInfo = questionInfo.extInfo;

                let eachAnswerArea = null,
                    questionDiv = null,
                    questionP = null,
                    questionInput = null,
                    questionDeleteDiv = null,
                    questionDeleteBtn = null,
                    answerTypeDiv = null,
                    answerTypeSelect = null,
                    answerTypeInput = null,
                    answerElement = null;

                eachAnswerArea = document.createElement("div");
                eachAnswerArea.id = "eachAnswerArea";
                eachAnswerArea.className = "eachAnswerArea";

                //3-1. add question
                questionDiv = document.createElement("div");
                questionDiv.className = "eachQuestionDiv";

                questionP = document.createElement("p");
                questionP.innerText = "문항 : ";

                questionInput = document.createElement("input");
                questionInput.type = "text";
                questionInput.name = "question";
                questionInput.className = "question";
                questionInput.value = questionValue;

                questionDiv.appendChild(questionP);
                questionDiv.appendChild(questionInput);
                eachAnswerArea.appendChild(questionDiv);

                //3-2. add question Delete Button
                questionDeleteDiv = document.createElement("div");
                questionDeleteDiv.className = "eachQuestionDeleteDiv";

                questionDeleteBtn = document.createElement("input")
                questionDeleteBtn.type = "button";
                questionDeleteBtn.name = "deleteQuestion_btn";
                questionDeleteBtn.id = "deleteQuestion_btn";
                questionDeleteDiv.appendChild(questionDeleteBtn);
                eachAnswerArea.appendChild(questionDeleteDiv);

                //3-3. add answerType Select
                answerTypeDiv = document.createElement("div");
                answerTypeDiv.className = "eachAnswerTypeDiv";
                answerTypeSelect = document.getElementById("addAnswerTypeSelect").cloneNode(true);
                answerTypeSelect.removeAttribute("id");
                answerTypeDiv.appendChild(answerTypeSelect);
                eachAnswerArea.appendChild(answerTypeDiv);

                answerTypeInput = document.createElement("input");
                answerTypeInput.type = "hidden";
                answerTypeInput.name = "questionType";
                answerTypeInput.value = questionTypeValue;
                questionInput.after(answerTypeInput);

                //3-4. add option
                if (questionTypeValue === "radio" || questionTypeValue === "checkbox") {
                    const optionCnt = questionInfo.optionCnt;
                    let optionArr = [];

                    for (let j=0; j<optionCnt; j++) {
                        optionArr.push(questionInfo.options[j].optionValue);
                    }
                    answerElement = getEachOptionEle(questionTypeValue, optionArr);
                }
                else {
                    answerElement = getEachOptionEle(questionTypeValue);
                }
                answerElement.className = "eachAnswerDiv";
                $(eachAnswerArea).append(answerElement);

                //3-5. add all
                $("#addAnswerArea").append(eachAnswerArea);

                //3-6. set answerType select value
                survey.changeAnswerType(answerTypeSelect.querySelector(`a[name='answerType_${questionTypeValue}']`))

                //3-7. set fileType checkbox
                survey.setExtInfo($(eachAnswerArea), extInfo);
            }

            //4. add default inactive answerArea
            $("#addAnswerArea").append(getInactiveAnswerAreaEle());

            //5. set sortable
            $("#addAnswerArea").sortable({items : " > div:not(.inactive)"});
        }

        function errorCb(){
            alertClass(alert, 'alert-error', '설문조사를 불러올 수 없습니다');
        }

        util.requestURL("/doEditSurvey", JSON.parse(surveyNumJsonParam), successCb, errorCb);
    },
    changeAnswerType(target){
        const name = target && target.getAttribute("name");
        const selectedAnswerTypeDiv = $(target).parents("div.eachAnswerTypeDiv");

        if(name === "answerType_default"){
            $(selectedAnswerTypeDiv).find("ul").toggle();
        }else{
            const selectedOptionStr = $(target).html(),
                selectedOptionVal = name.replace("answerType_",""),
                bfOptionVal = $(selectedAnswerTypeDiv).find("#selectedValue").val(),
                answerArea =  $(target).parents("div.eachAnswerArea"),
                answerDiv = $("div.eachAnswerDiv", answerArea);
            let bfOptionArr = [],
                answerElement = null;

            if(bfOptionVal === selectedOptionVal){
                $(selectedAnswerTypeDiv).find("ul").hide();
                return true;
            }

            //1. change AnswerType UI && value
            $(selectedAnswerTypeDiv).find("span[name='answerType_default']").html(selectedOptionStr);
            $(selectedAnswerTypeDiv).find("#selectedValue").val(selectedOptionVal);
            $(selectedAnswerTypeDiv).find("ul").hide();

            //2. save bfOption Values
            if(bfOptionVal &&
                (bfOptionVal === "radio" || bfOptionVal === "checkbox") &&
                (selectedOptionVal === "radio" || selectedOptionVal === "checkbox")){

                $(answerArea).find(".eachOption").each(function(){
                    bfOptionArr.push($(this).find("input[type='text']").val());
                });
            }

            //3. change Answer Area UI
            $(answerDiv).children().remove();
            answerElement = getEachOptionEle(selectedOptionVal, bfOptionArr);
            $(answerDiv).append(answerElement.childNodes)

            //4. set hidden input
            $("input[name='questionType']", answerArea).val(selectedOptionVal);
        }
    },
    setExtInfo(target, extInfoStr){
        if(extInfoStr == null || extInfoStr === ""){
            return false;
        }

        const extInfoJson = JSON.parse(extInfoStr);

        if(extInfoJson.fileType != null){
            const fileTypeArr = extInfoJson.fileType;
            for(let i=0; i<fileTypeArr.length; i++){
                $(`input[name='file_${fileTypeArr[i]}']`, target).prop("checked", true);
            }
        }
    },
    setNextStepSetting(target){
        if($(target).prop("checked")){
            $(target).siblings("div.nextStepDiv").find("input[type='checkbox']").attr("disabled", false);
        }else{
            $(target).siblings("div.nextStepDiv").find("input[type='checkbox']").prop("checked", false);
            $(target).siblings("div.nextStepDiv").find("input[type='checkbox']").attr("disabled", true);
        }
    }
};

export var list = {
    showSurveyList(target) {
        let alert = $(".surveyAlert"),
            loginId = sessionStorage.getItem("id"),
            loginIdJson = "{\"loginId\" : \"" + loginId + "\"}";

        console.log("loginId : "+loginId);
        console.log("loginIdJson : " + loginIdJson);

        function successCb (data) {
            if(data.survey == undefined){
                let surveyTbl = document.getElementById("surveyListTbl");
                let surveyTbody = document.createElement("tbody");
                let surveyTr = document.createElement("tr");
                let surveyTd = document.createElement("td");
                surveyTd.colSpan = "8";
                surveyTd.innerText = "등록된 설문이 없습니다.";

                surveyTr.appendChild(surveyTd);
                surveyTbody.appendChild(surveyTr);
                surveyTbl.appendChild(surveyTbody);

                surveyForm.showSurveyFormList();
                return false;
            }

            data.survey.sort(function (a, b) {
                let aTime = Date.parse(a.endTime),
                    bTime = Date.parse(b.endTime);

                //return aTime > bTime ? -1 : aTime < bTime ? 1 : 0;
                return aTime > bTime ? -1 : aTime < bTime ? 1 : b.surveyNum - a.surveyNum;
            });
            console.log(data.survey);

            let surveyTbl = document.getElementById("surveyListTbl"),
                surveyTbody = document.createElement("tbody"),
                surveyData = data.survey,
                item = null,
                surveyTblCol = null,
                edit_btn = null,
                result_btn = null,
                share_btn = null,
                delete_btn = null,
                copy_btn = null,
                currentDate = new Date(),
                endTime = null;

            for (let i = 0; i < surveyData.length; i++) {
                edit_btn = document.createElement("input");
                edit_btn.type = "button";
                edit_btn.value = "편집";
                edit_btn.name = "edit_btn";
                result_btn = document.createElement("input");
                result_btn.type = "button";
                result_btn.value = "결과";
                result_btn.name = "result_btn";
                share_btn = document.createElement("input");
                share_btn.type = "button";
                share_btn.value = "공유";
                share_btn.name = "share_btn";
                delete_btn = document.createElement("input");
                delete_btn.type = "button";
                delete_btn.value = "삭제";
                delete_btn.name = "delete_btn";
                copy_btn = document.createElement("input");
                copy_btn.type = "button";
                copy_btn.value = "복사 후 새 설문";
                copy_btn.name = "copy_btn";
                copy_btn.style.width = "auto";
                copy_btn.style.padding = "5px 15px";

                let surveyTr = document.createElement("tr");
                    item = surveyData[i],
                    surveyTblCol = [item.title, item.endTime, item.responseCnt, edit_btn, result_btn, share_btn, delete_btn, copy_btn],
                    endTime = new Date(item.endTime);

                if (endTime < currentDate) {
                    surveyTr.style.backgroundColor = "gray";
                    //surveyTr.className = "overDate";
                    edit_btn.style.backgroundColor = "gray";
                    share_btn.style.backgroundColor = "gray";

                    edit_btn.disabled = "disabled";
                    share_btn.disabled = "disabled";
                    edit_btn.style.cursor = "not-allowed";
                    share_btn.style.cursor = "not-allowed";
                }

                for (let j = 0; j < surveyTblCol.length; j++) {
                    let surveyTd = document.createElement("td");
                    if (j<3) {
                        surveyTd.appendChild(document.createTextNode(surveyTblCol[j]));
                        if (j === 0)
                            surveyTd.id = surveyTblCol[i];
                    }
                    else {
                        if (surveyTblCol[2] > 0) {
                            surveyTblCol[3].disabled = "disabled";
                            surveyTblCol[3].style.backgroundColor = "gray";
                        }
                        surveyTd.appendChild(surveyTblCol[j]);
                        surveyTblCol[j].id = surveyTblCol[0];
                        if(j === 7)
                            surveyTblCol[j].id = `surveyNum_${item.surveyNum}`;
                    }
                    surveyTr.appendChild(surveyTd);
                    surveyTbody.appendChild(surveyTr);
                }
            }
            surveyTbl.appendChild(surveyTbody);

            surveyForm.showSurveyFormList();
        }

        function errorCb() {
            alertClass(alert, 'alert-error', '설문조사를 불러올 수 없습니다');
        }
        util.requestURL("/doShowSurveyList", JSON.parse(loginIdJson), successCb, errorCb);
    }
};

export var response = {
    saveResponse: function (target) {
        console.log($("#resultSeq").val());
        console.log(typeof $("#resultSeq").val());
        let //form = $("#surveyResponseForm").serialize(),
            alert = $(".surveyAlert"),
            isEmptyArr = new Array();

        let form = new FormData($("#surveyResponseForm")[0]);
        console.log(form);

        function successCb(data) {
            console.log(data);
            console.log("success");

            $("#surveyResponseForm").load("surveyResponseComplete.html");
        }

        function saveLabelFunc (data) {
            console.log(data);

            if (data.result === 1) {
                $("#resultSeq").val(data.resultSeq + 1);
                form = $("#responseLabelForm").serialize();
                console.log(form);
                util.requestURL("/doSaveResponseLabel", form, successCb, errorCb);
            }
            else
                errorCb();
        }

        function errorCb() {
            console.log("error");
        }

        let questionNum = $(".actualSurveyResponseArea").length;
        for (let i=0; i<questionNum; i++) {
            let questionType = $("#surveyResponseArea .actualSurveyResponseArea input[name=questionType]").eq(i).val();
            if (questionType === "text") {
                if ($("#surveyResponseArea .actualSurveyResponseArea").eq(i).find("input[type='text']").val() == "")
                    isEmptyArr[i] = true;
                else
                    isEmptyArr[i] = false;
            } else if (questionType === "checkbox") {
                $("#surveyResponseArea .actualSurveyResponseArea").eq(i).find("input[type='checkbox']").each(function () {
                    if (!$(this).prop("checked"))
                        isEmptyArr[i] = true;
                    else {
                        isEmptyArr[i] = false;
                        return false;
                    }
                });
            } else if (questionType === "radio"){
                $("#surveyResponseArea .actualSurveyResponseArea").eq(i).find("input[type='radio']").each(function () {
                    if (!$(this).prop("checked"))
                        isEmptyArr[i] = true;
                    else {
                        isEmptyArr[i] = false;
                        return false;
                    }
                });
            }else if(questionType === "file"){
                if($("#surveyResponseArea .actualSurveyResponseArea").eq(i).find("input[type='file']").val() == ""){
                    isEmptyArr[i] = true;
                }else{
                    isEmptyArr[i] = false;
                }
            }
        }

        console.log(isEmptyArr);
        if (isEmptyArr.every(chkResponse) === true)
            //util.requestURL("/doSaveResponse", form, saveLabelFunc, errorCb);

            $.ajax({
                url: "/doSaveResponse",
                data: form,
                type: 'POST',
                enctype : "multipart/form-data",
                dataType: 'json',
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    saveLabelFunc(data);
                },
                error: function (data, xhr, status) {
                    errorCb();
                    console.log(data);
                    console.error(xhr);
                }
            });

        else {
            alertClass(alert, 'alert-warning', '모든 문항에 답변해주세요');
            return false;
        }

        function chkResponse(value) {
            return value === false;
        }
    },
    isValidFileType(target){
        const validFileTypeArr = $(target).siblings("input[name='fileType']").val();
        const targetFile = target.files[0];
        const alert = $(".surveyAlert");

        function isValidFileType(file, typeArrStr) {
            const typeArr = typeArrStr.split(",");
            let result = null;

            for(let i=0; i<typeArr.length; i++){
                const imageType = ["image/jpeg","image/png","image/jpg"];
                const videoType = ["video/x-msvideo","video/mkv","video/mov", "video/quicktime"];
                const docType = ["application/haansofthwp","application/msword"];

                if(typeArr[i] === "image"){
                    result = (imageType.indexOf(file.type) > -1);
                    if(result) break;
                }else if(typeArr[i] === "video"){
                    result = (videoType.indexOf(file.type) > -1);
                    if(result) break;
                }else if(typeArr[i] === "doc"){
                    result = (docType.indexOf(file.type) > -1);
                    if(result) break;
                }
            }
            return result;
        }

        function isValidFileSize(file){
            const targetFileSize = file.size;
            const validFileSize = 1024*1024*100; //100mb

            if(targetFileSize > validFileSize){
                return false;
            }else{
                return true;
            }
        }

        if(!isValidFileType(targetFile, validFileTypeArr)) {
            alertClass(alert, 'alert-warning', "파일 형식이 잘못되었습니다. 확인 부탁드립니다.");
            target.value = "";
        }
        else if(!isValidFileSize(targetFile)){
            alertClass(alert, 'alert-warning', "파일 최대 크기는 100mb입니다. 확인 부탁드립니다.");
            target.value = "";
        }
    },
    certEmail(target){
        const alert = $(".surveyAlert");

        const email = $(target).siblings("input[name='email']").val();
        const password = $(target).siblings("input[name='password']").val();
        const surveyNum = $(target).siblings("input[name='surveyNum']").val();

        const param = `{"surveyNum" : "${surveyNum}", "email": "${email}", "password":"${password}"}`;

        function successCb(data){
            if(data.result){
                document.getElementById("emailCert_dialog").style.display = "none";
                document.getElementById("surveyResponseForm").style.display = "block";

                const title = $(target).siblings("input[name='title']").val(),
                    creatorId = $(target).siblings("input[name='creatorId']").val();

                response.pageLoad(creatorId, title, email);
            }
            else{
                alertClass(alert, 'alert-error', '이메일 혹은 설문 인증 코드가 잘못되었습니다.<br/>다시 시도 바랍니다.');
            }
        }

        function errorCb(){
            alertClass(alert, 'alert-error', '다시 시도 바랍니다.');
        }

        util.requestURL("/doCertEmail", JSON.parse(param), successCb, errorCb);
    },
    sendCertEmail(target){
        const alert = $(".surveyAlert");

        const email = $(target).siblings("input[name='sendEmail']").val();
        const surveyNum = $(target).siblings("input[name='surveyNum']").val();

        const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@hancom.com$/;
        if(!emailRegExp.test(email)){
            alertClass(alert, 'alert-error', '잘못된 이메일 도메인입니다.');
            return false;
        }

        const param = `{"surveyNum" : "${surveyNum}", "email": "${email}"}`;

        function successCb(data){
            alertClass(alert, 'alert-success', '설문 인증 코드를 입력하신 이메일로 전달했습니다.<br>이메일을 확인 해주시기바랍니다.');
        }

        function errorCb(){
            alertClass(alert, 'alert-error', '다시 시도 바랍니다.');
        }

        $.ajax({
            url: "/doSendCertEmail",
            data: JSON.parse(param),
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function (data) {
                successCb(data);
            },
            error: function (data, xhr, status) {
                errorCb();
                console.log(data);
                console.error(xhr);
            }
        });
    },
    getIPAddr (creatorId, title) {
        const alert = $(".surveyAlert");

        const param = `{"creatorId":"${creatorId}", "title":"${title}"}`;

        function successCb(data){
            let modal = $("#responseLabel_dialog")[0];

            // 같은 ip일 때 다시 응답하지 못하게
            if (data.ip === "responseDone") {
                modal.style.display = "none";
                $("#surveyResponseForm").load("surveyResponseAlreadyDone.html");
                return false;
            }

            $("#ipAddr").val(data.ip);

            response.getEmailCollectOpenYN(data.creatorId, data.title);
        }

        function errorCb(){
            alertClass(alert, 'alert-error', '다시 시도 바랍니다.');
        }

        util.requestURL("/doGetIPAddr", JSON.parse(param), successCb, errorCb);
    },
    getEmailCollectOpenYN(creatorId, title){
        const alert = $(".surveyAlert");
        const param = `{"creatorId":"${creatorId}", "title":"${title}"}`;

        function successCb(data){
            const emailCollectYN = data.emailCollect,
                emailOpenYN = data.emailOpen;
            const emailCertDialog = document.getElementById("emailCert_dialog");

            if(emailCollectYN == "1"){
                const surveyNum = data.surveyNum,
                    title = data.title,
                    creatorId = data.creatorId;

                emailCertDialog.style.display = "block";
                document.getElementById("surveyTitleTxt").innerText = `"${data.title}" 설문 코드 인증`;

                if(emailOpenYN == "1"){
                    document.getElementById("emailOpenTxt").innerText = '해당 설문 응답 완료 시 이메일이 설문 관리자에게 공개됩니다.';
                }

                document.getElementById("surveyNum").value = surveyNum;
                document.getElementById("title").value = title;
                document.getElementById("creatorId").value = creatorId;

                document.getElementById("surveyResponseForm").style.display = "none";
            }else{
                emailCertDialog.style.display = "none";

                response.pageLoad(data.creatorId, data.title);
            }
        }

        function errorCb(){
            alertClass(alert, 'alert-error', '다시 시도 바랍니다.');
        }

        util.requestURL("/doGetEmailCollectOpen", JSON.parse(param), successCb, errorCb);
    },
    pageLoad(creatorId, title, email = ""){
        const alert = $(".surveyAlert");
        const param = `{"creatorId":"${creatorId}", "title":"${title}"}`;

        $("#email").val(email);

        function successCb(data){
            let currentTime = new Date(),
                time = data.survey[0].endTime,
                endTime = new Date(time);

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
                const questionInfo = data.survey[0].questions[i];

                eachQuestionArea = document.createElement("div");
                eachQuestionArea.className = "actualSurveyResponseArea";

                question = document.createElement("h4");
                question.className = "question";
                question.name = "question";
                question.innerText = questionInfo.questionNum + ". " + questionInfo.questionValue;
                questionType = questionInfo.questionType;

                questionValue = document.createElement("input");
                questionValue.type = "hidden";
                questionValue.name = "question";
                questionValue.value = questionInfo.questionValue;

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
                else if(questionType === "file"){
                    const extInfoStr = questionInfo.extInfo;
                    let appendFileTypeInfoP = null;
                    if(extInfoStr != null && extInfoStr !== ""){
                        const extInfoJson = JSON.parse(extInfoStr);
                        if(extInfoJson.fileType != null && extInfoJson.fileType.length){
                            const fileTypeInfo = {
                                "image" : "이미지(jpg/jpeg/png)",
                                "video" : "동영상(avi/mkv/mov)",
                                "doc" : "문서(hwp/doc)"
                            };

                            appendFileTypeInfoP = document.createElement("p");
                            appendFileTypeInfoP.className = "questionExt";
                            appendFileTypeInfoP.innerText = "업로드 가능 파일은 ";
                            for(let i=0; i<extInfoJson.fileType.length; i++){
                                appendFileTypeInfoP.innerText += fileTypeInfo[extInfoJson.fileType[i]];
                                if(i != extInfoJson.fileType.length-1) appendFileTypeInfoP.innerText += ", ";
                                if(i === extInfoJson.fileType.length-1) appendFileTypeInfoP.innerText += " 입니다.";
                            }

                            let fileTypeHidden = null;
                            fileTypeHidden = document.createElement("input");
                            fileTypeHidden.type = "hidden";
                            fileTypeHidden.name = "fileType";
                            fileTypeHidden.value = extInfoJson.fileType.toString();
                            eachQuestionArea.appendChild(fileTypeHidden);
                        }
                    }

                    eachQuestionArea.prepend(question);
                    eachQuestionArea.appendChild(appendFileTypeInfoP);

                    option = document.createElement("input");
                    option.type = questionType;
                    option.name = question.innerText + "Answer";

                    eachQuestionArea.append(option);
                }
                else if(questionType === "date" || questionType === "time"){
                    eachQuestionArea.prepend(question);

                    option = document.createElement("input");
                    option.type = questionType;
                    option.name = question.innerText + "Answer";

                    eachQuestionArea.append(option);
                }
                else {
                    // if (questionType === "radio")
                    //     question.innerText += " (단일 선택형 문항)";
                    // else
                    //     question.innerText += " (다중 선택형 문항)";
                    optionCnt = questionInfo.optionCnt;
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
                        option.value = questionInfo.options[j].optionValue;

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
                creatorId = data.survey[0].creatorId;

            response.getLabelInfo(title, creatorId);
        }

        function errorCb(){
            alertClass(alert, 'alert-error', '다시 시도 바랍니다.');
        }

        util.requestURL("/doSetResponseForm", JSON.parse(param), successCb, errorCb);
    },
    getLabelInfo (title, creatorId) {
        const alert = $(".surveyAlert");
        const param = `{"creatorId":"${creatorId}", "title":"${title}"}`;

        function successCb(data){
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

        function errorCb(){
            alertClass(alert, 'alert-error', '다시 시도 바랍니다.');
        }

        util.requestURL("/doGetLabelInfo", JSON.parse(param), successCb, errorCb);
    }
};

export var remove = {
    removeSurvey: function (target) {
        let title = target.id,
            creatorId = sessionStorage.getItem("id"),
            surveyInfo = "{\"title\" : \"" + title + "\", \"creatorId\" : \"" + creatorId + "\"}";

        function successCb(data) {
            console.log(data);
            location.reload();
        }

        function errorCb() {
            console.log("error");
        }
        util.requestURL("/doRemoveSurvey", JSON.parse(surveyInfo), successCb, errorCb);
    }
};

export var result = {
    setLabelChart : function (target) {
        let url = window.location.href,
            params = decodeURIComponent(getParam("url")),
            substrUrl = params.substr(4, url.length),
            creatorId = substrUrl.split("+")[0],
            title = substrUrl.split("+")[1],
            chartValue = "{\"creatorId\" : \"" + creatorId + "\", \"title\" : \"" + title + "\"}";

        console.log(params);
        console.log(substrUrl);
        console.log(creatorId);
        console.log(title);

        console.log(target);
        let targetResultArea = target.parentNode.parentNode,
            targetResultAreaId = targetResultArea.id;
        console.log(targetResultArea);
        console.log($("#labelBase")[0]);

        let pathName = target.getAttribute("name");
        pathName = pathName.substr(0, pathName.length-4);
        console.log(pathName);

        console.log(targetResultAreaId);
        console.log($("#"+ targetResultAreaId + " #base")[0]);
        $("#labelBase")[0].style.display = "block";
        $("#"+ targetResultAreaId + " #base")[0].append($("#labelBase")[0]);


        console.log(chartValue);
        util.requestURL("/doGetResultInfo", JSON.parse(chartValue), successCb, errorCb);

        function successCb (data) {
            $("#base rect.rectPart").remove();
            $("#base .partText").remove();
            console.log(data);

            console.log(pathName);
            console.log(target);

            console.log($("#base path"));
            //$("#base path").attr("fill", "white");
            target.setAttribute("class", "target");
            console.log(target.style.backgroundColor);
            if (localStorage.getItem("prevTarget")) {
                let prevBgColor = localStorage.getItem("prevBgColor");
                $("path[name='" + localStorage.getItem("prevTarget") + "']")[0].setAttribute("fill", prevBgColor);
            }
            localStorage.setItem("prevTarget", target.getAttribute("name"));
            localStorage.setItem("prevBgColor", target.getAttribute("fill"));
            target.setAttribute("fill", "lightpink");

            let labelElementCnt = data.labelInfo.length,
                labelSeq = 0,
                labelCnt = data.labelInfo.length,
                labelTotalCnt = 0,
                labelOptionValue = "",
                labelOptionCnt= 0,
                percentage = 0,
                totalLabelResponseCnt = 0;

            let rect = null,
                partText = null,
                responseOptionText = null,
                percentageText = null,
                tempRect = $("#part rect").clone(),
                totalHeight = 250,
                usedHeight = 0,
                height = 0;

            console.log(tempRect);

            let targetResultArea = target.parentNode;
            console.log(targetResultArea);

            $("input[id^='standardBtn']").click(function () {
                $("input[id^='standardBtn']").removeClass();
                console.log($(this)[0]);
                let parentAreaId = $(this)[0].parentNode.id;
                $("#" + parentAreaId + " input[id^='standardBtn']").css("background-color", "lightblue");
                $(this).css("background-color", "lightpink");
                $(this).addClass("standard");

                $("#base rect.rectPart").remove();
                $("#base .partText").remove();
                //$("#base .linePath").remove();
                $("#base rect#labelBase").each(function() {
                    $(this)[0].style.display = "none";
                });
                $("#base path.linePath").each(function() {
                    $(this)[0].style.display = "none";
                });
                //$("path").attr("fill", "white");
            });

            let labelStandard = $(".standard")[0].name;
            console.log(labelStandard);

            let standardNum = $(".standard")[0].id;
            standardNum = parseInt(standardNum.substr(standardNum.length - 1));
            console.log(standardNum);

            let standardQuestion = target.parentNode.parentNode.parentNode.id;
            console.log(standardQuestion);

            let standardQuestionNum = target.parentNode.parentNode.id;
            standardQuestionNum = parseInt(standardQuestionNum.substr(standardQuestionNum.length - 1));
            console.log(standardQuestionNum);

            for (let i=0; i<data.labelResult.length; i++) {
                    for (let j = 0; j < data.labelResult[i].optionCnt; j++) {
                        if (data.labelResult[i].optionCnt != 0 && (i + 1) === standardQuestionNum
                            && data.labelResult[i].options[j].optionValue === pathName
                            && data.labelResult[i].options[j].labels[standardNum].labelName === labelStandard) {

                            console.log(data.labelResult[i].options[j].optionValue);
                            let labelOptionLength = data.labelResult[i].options[j].labels[standardNum].labelOptions.length;
                            console.log(labelOptionLength)
                            for (let k = 0; k < labelOptionLength; k++) {
                                labelTotalCnt += data.labelResult[i].options[j].labels[standardNum].labelOptions[k].labelOptionResponseCnt;
                            }
                            console.log(labelTotalCnt);

                            console.log(labelOptionLength);
                            for (let k = 0; k < labelOptionLength; k++) {
                                console.log(k);
                                totalLabelResponseCnt = 0;

                                console.log(data.labelResult[i].options[j].labels[standardNum].labelOptions[k].labelOptionValue);
                                console.log(data.labelResult[i].options[j].labels[standardNum].labelOptions[k].labelOptionResponseCnt);

                                labelOptionValue = data.labelResult[i].options[j].labels[standardNum].labelOptions[k].labelOptionValue;
                                labelOptionCnt = data.labelResult[i].options[j].labels[standardNum].labelOptions[k].labelOptionResponseCnt;

                                console.log(labelOptionCnt);
                                console.log(labelTotalCnt);
                                height = labelOptionCnt / labelTotalCnt * totalHeight;
                                console.log(height);
                                console.log(totalHeight);

                                rect = $("#part rect").clone();
                                partText = $("#part text").clone();
                                $(".partText").removeAttr("display");
                                $("#labelBase")[0].style.display = "block";
                                console.log($("#part rect")[0]);
                                console.log($("#part text")[0]);

                                partText[0].setAttribute("x", 510);
                                if (height != 0) {
                                    partText[0].textContent = labelOptionValue;

                                    percentage = Math.floor(labelOptionCnt/labelTotalCnt*1000)/10;
                                    percentageText = $("body > #part .optionText tspan").clone();
                                    percentageText[0].textContent = "(" + percentage + "%)";
                                    partText[0].append(percentageText[0]);
                                }

                                if (k === 0) {
                                    rect[0].setAttribute("height", height);
                                    rect[0].setAttribute("name", labelOptionValue);

                                    console.log(rect[0]);
                                    console.log(target.parentNode);
                                    rect[0].style.display = "block";
                                    console.log(rect[0]);
                                    partText[0].setAttribute("y", (height / 2) + 30);
                                    target.parentNode.append(rect[0]);
                                    console.log(target.parentNode);
                                } else {
                                    rect[0].setAttribute("height", height);
                                    rect[0].setAttribute("name", labelOptionValue);

                                    console.log(rect[0]);
                                    rect[0].style.display = "block";
                                    partText[0].setAttribute("y", usedHeight + (height / 2) + 30);
                                    target.parentNode.append(rect[0]);
                                    console.log(rect.prev()[0]);

                                    let prevHeight = parseInt(rect.prev().prev()[0].getAttribute("height")),
                                        prevY = parseInt(rect.prev().prev()[0].getAttribute("y"));
                                    console.log(prevHeight);
                                    console.log(prevY);
                                    rect[0].setAttribute("y", prevHeight + prevY);
                                }

                                rect[0].setAttribute("fill", colors[k]);
                                target.parentNode.append(partText[0]);
                                usedHeight += height;
                                console.log(usedHeight);
                                rect = null;
                            }
                            /*
                            console.log($("#eachResultArea" + (i + 1) + " #partChart"));
                            console.log($("#eachResultArea" + (i + 1) + " #partChart").index());
                            console.log($("#eachResultArea" + (i + 1) + " #partChart").length);
                            */

                            console.log(target);
                            console.log (target.tagName);

                            let linePathLength = 0,
                                targetIdx = 0,
                                minusIdx = 0;

                            minusIdx = $("#eachResultArea1" + " #partChart").length;
                            console.log(minusIdx);
                            if (target.tagName != 'circle') {
                                linePathLength = $("#eachResultArea" + (i + 1) + " .linePath").length;
                                if (i > 0) linePathLength -= minusIdx;
                                targetIdx = $("#eachResultArea" + (i + 1) + " #partChart").index(target);
                                console.log(targetIdx);
                                if (i > 0) targetIdx -= minusIdx;
                                console.log(targetIdx);

                                for (let a = 0; a < linePathLength; a++) {
                                    if (a != targetIdx) {
                                        $("#base rect#labelBase").each(function () {
                                            $(this)[0].style.display = "none";
                                        });
                                        $(".eachResultArea .linePath").each(function () {
                                            $(this)[0].style.display = "none";
                                        });
                                        $("#eachResultArea" + (i + 1) + " .linePath:eq(" + a + ")")[0].style.display = "none";
                                    }
                                    if (i === 0)
                                        $("#eachResultArea" + (i + 1) + " .linePath")[targetIdx].style.display = "block";
                                    else
                                        $("#eachResultArea" + (i + 1) + " .linePath")[targetIdx + minusIdx].style.display = "block";
                                }
                            } //if
                            else {
                                $("#base rect#labelBase").each(function () {
                                    $(this)[0].style.display = "none";
                                });
                                $(".eachResultArea .linePath").each(function () {
                                    $(this)[0].style.display = "none";
                                });
                                $("#eachResultArea" + (i + 1) + " .linePath")[targetIdx + minusIdx].style.display = "block";
                            } //else
                        }
                }
            }
        }

        function errorCb () {
            console.log("error");
        }

        function getParam(url) {
            let param = location.search.substr(location.search.indexOf("?") + 1)

            console.log(param);
            return param;
        }
    },
    showStat : function (target) {
        $("input[name=showResult_btn]").css("background-color", "lightblue");
        $("input[name=showEachResult_btn]").css("background-color", "lightblue");
        $("input[name=showStat_btn]").css("background-color", "lightpink");
        let title = $("body #surveyInfo").find("#title")[0].innerText,
            creatorId = sessionStorage.getItem("id"),
            surveyValue = "{\"title\" : \"" + title + "\", \"creatorId\" : \"" + creatorId + "\"}";

        util.requestURL("/doGetResultInfo", JSON.parse(surveyValue), successCb, errorCb);

        function successCb (data) {

            if (data.result[0].hasOwnProperty('answers') === false) {
                let noDataInput = document.createElement("h3");
                noDataInput.innerText = "응답 데이터가 존재하지 않습니다";
                $("#statArea").append(noDataInput);
                return false;
            }

            let questionCnt = data.result.length,
                labelCnt = data.labelInfo.length;

            let questionArea = null,
                titleP = null,
                questionType = null,
                totalOptionCnt = 0,
                optionCnt = 0,
                labelOptionCnt = 0;

            let answerCnt = 0,
                answerP = null;

            let statTbl = null,
                statTr = null,
                statTd = null,
                statHr = null;

            let labelBtn = null,
                labelValue = "",
                labelP = null,
                labelOptionResponseCnt = 0,
                totalLabelResponseCnt = 0,
                percent = "";

            for (let i=0; i<questionCnt; i++) {
                questionArea = document.createElement("div");
                questionArea.className = "eachStatArea";
                $("#statArea").append(questionArea);

                questionType = data.result[i].questionType;
                answerCnt = data.result[i].answers.length;

                titleP = document.createElement("h4");
                titleP.innerText = (i+1) + ". " + data.result[i].questionValue;
                questionArea.prepend(titleP);

                if (questionType === "text") {
                    titleP.innerText += " (주관식 문항)";
                    for (let j=0; j<answerCnt; j++) {
                        answerP = document.createElement("p");
                        answerP.innerText = " - " + data.result[i].answers[j].answerValue;
                        questionArea.append(answerP);
                    }
                }
                else if(questionType === "file"){
                    titleP.innerText += " (파일업로드 문항)";
                    for (let j=0; j<answerCnt; j++) {
                        answerP = document.createElement("p");

                        const fileDownloadLink = document.createElement("a");
                        fileDownloadLink.href = "#none";
                        fileDownloadLink.name = "fileDownload_btn";
                        fileDownloadLink.innerText = data.result[i].answers[j].answerValue;

                        answerP.innerText = "- "+answerP.innerText;
                        answerP.appendChild(fileDownloadLink);
                        questionArea.append(answerP);
                    }
                }
                else if(questionType === "date"){
                    titleP.innerText += " (날짜 문항)";
                    for (let j=0; j<answerCnt; j++) {
                        answerP = document.createElement("p");
                        answerP.innerText = " - " + data.result[i].answers[j].answerValue;
                        questionArea.append(answerP);
                    }
                }
                else if(questionType === "time"){
                    titleP.innerText += " (시간 문항)";
                    for (let j=0; j<answerCnt; j++) {
                        answerP = document.createElement("p");
                        answerP.innerText = " - " + data.result[i].answers[j].answerValue;
                        questionArea.append(answerP);
                    }
                }
                else if(questionType === "radio" || questionType === "checkbox"){
                    if (questionType === "radio")
                        titleP.innerText += " (단일 선택형 문항)";
                    else
                        titleP.innerText += " (다중 선택형 문항)";

                    statTbl = document.createElement("table");
                    statTbl.setAttribute("border", 1);
                    statTbl.setAttribute("cellpadding", 5);
                    statTbl.setAttribute("cellspacing", 0);
                    statTbl.setAttribute("width", "700px");

                    statTr = document.createElement("tr");
                    statTbl.append(statTr);

                    statTd = document.createElement("th");
                    statTd.innerText = "선택지";
                    statTr.append(statTd);

                    statTd = document.createElement("th");
                    statTd.innerText = "응답 퍼센트";
                    statTr.append(statTd);

                    if (data.result[i].questionType === "text") break;
                    optionCnt = data.labelResult[i].optionCnt;
                    console.log(optionCnt);

                    totalOptionCnt = 0;
                    for (let j=0; j<data.result[i].answers.length; j++) {
                        totalOptionCnt += data.result[i].answers[j].answerCnt;
                        console.log(data.result[i].answers[j].answerCnt);
                    }
                    console.log(totalOptionCnt);

                    for (let j=0; j<optionCnt; j++) {
                        answerCnt = 0;
                        console.log(data.labelResult[i].options[j].hasOwnProperty('labels'));
                        if (data.labelResult[i].options[j].hasOwnProperty('labels') === false) {
                            answerCnt = 0;
                            percent = 0;
                            console.log("no label");
                        }
                        else {
                            labelOptionCnt = data.labelResult[i].options[j].labels[0].labelOptions.length;
                            console.log("labelOptionCnt : " + labelOptionCnt);
                            for (let h = 0; h < labelOptionCnt; h++) {
                                answerCnt += data.labelResult[i].options[j].labels[0].labelOptions[h].labelOptionResponseCnt;
                                console.log("answerCnt : " + answerCnt);
                                percent = Math.floor((answerCnt/totalOptionCnt)*1000)/10;
                            }
                        }
                        statTr = document.createElement("tr");
                        statTbl.append(statTr);

                        statTd = document.createElement("td");
                        statTd.innerText = data.labelResult[i].options[j].optionValue;
                        statTr.append(statTd);

                        statTd = document.createElement("td");
                        statTd.innerText = percent + "%";
                        statTr.append(statTd);

                        questionArea.append(statTbl);
                    }

                    for (let j=0; j<labelCnt; j++) {
                        labelValue = data.labelInfo[j].labelName;
                        labelP = document.createElement("p");
                        labelP.innerHTML = "사전질문 문항 <b>\"" + labelValue + "\"</b>에 따른 결과";
                        questionArea.append(labelP);

                        statTbl = document.createElement("table");
                        statTbl.setAttribute("width", "700px");
                        statTbl.setAttribute("border", 1);
                        statTbl.setAttribute("cellpadding", 5);
                        statTbl.setAttribute("cellspacing", 0);

                        statTr = document.createElement("tr");
                        statTbl.append(statTr);

                        statTd = document.createElement("th");
                        statTr.append(statTd);

                        labelOptionCnt = data.labelInfo[j].labelOptionCnt;
                        for (let k=0; k<labelOptionCnt; k++) {
                            statTd = document.createElement("th");
                            statTd.innerText = data.labelInfo[j].labels[k].labelOptionValue;
                            statTr.append(statTd);
                        }

                        optionCnt = data.labelResult[i].optionCnt;
                        for (let k=0; k<optionCnt; k++) {
                            labelOptionResponseCnt = 0;
                            labelOptionCnt = data.labelInfo[j].labelOptionCnt;
                            statTr = document.createElement("tr");

                            statTd = document.createElement("td");
                            statTd.className = "options";
                            statTd.innerText = data.labelResult[i].options[k].optionValue;
                            statTr.append(statTd);

                            totalLabelResponseCnt = 0;
                            console.log("labelOptionCnt : " + labelOptionCnt);
                            for (let h=0; h<labelOptionCnt; h++) {
                                labelOptionResponseCnt = 0;
                                //console.log("t/f : " + data.labelResult[0].options[0].labels[0].hasOwnProperty('labelOptions'));
                                if (data.labelResult[i].options[k].labels[0].hasOwnProperty('labelOptions') === false)
                                    totalLabelResponseCnt = 0;
                                else
                                    totalLabelResponseCnt += data.labelResult[i].options[k].labels[j].labelOptions[h].labelOptionResponseCnt;
                                console.log(totalLabelResponseCnt);
                            }
                            console.log(totalLabelResponseCnt);
                            for (let h=0; h<labelOptionCnt; h++) {
                                labelOptionResponseCnt = 0;
                                statTd = document.createElement("td");

                                if (data.labelResult[i].options[k].labels[0].hasOwnProperty('labelOptions') === false) {
                                    labelOptionResponseCnt = 0;
                                    percent = 0;
                                }
                                else {
                                    labelOptionResponseCnt += data.labelResult[i].options[k].labels[j].labelOptions[h].labelOptionResponseCnt;
                                    percent = Math.floor((labelOptionResponseCnt/totalLabelResponseCnt)*100);
                                }
                                console.log(labelOptionResponseCnt);

                                statTd.innerText = percent + "%";
                                statTr.append(statTd);
                            }
                            statTbl.append(statTr);
                        }
                        questionArea.append(statTbl);
                    }
                    $("table td").css("background-color", "white");
                    $("table th").css("background-color", "lightblue");
                    //$("table td.options").css("background-color", "lightblue");
                }
                statHr = document.createElement("hr");
                questionArea.append(statHr);
            }
            $(".statBtn").click(function () {
                console.log($(this)[0]);
                console.log($(this)[0].value);

                //showLabelStat($(this)[0].value);
            });
        }

        function errorCb () {
            console.log("error");
        }
    },
    fileDownload(target){
        const alert = $(".surveyAlert");
        const fileName = $(target).text();

        $.fileDownload("/getFileServlet?fileName="+fileName).done(function(){
            //console.log("파일다운로드 완료");
        }).fail(function(){
            alert('파일 다운로드를 할수 없습니다. 다시 시도 바랍니다.');
        });
    },
    showEachResult(target) {
        $("input[name=showResult_btn]").css("background-color", "lightblue");
        $("input[name=showStat_btn]").css("background-color", "lightblue");
        $("input[name=showEachResult_btn]").css("background-color", "lightpink");

        let title = $("body #surveyInfo").find("#title")[0].innerText,
            creatorId = sessionStorage.getItem("id"),
            surveyValue = "{\"title\" : \"" + title + "\", \"creatorId\" : \"" + creatorId + "\"}";

        util.requestURL("/doGetEachResultInfo", JSON.parse(surveyValue), successCb, errorCb);

        function successCb(data){
            if(data.resultEmailList.length == 0){
                let noDataInput = document.createElement("h3");
                noDataInput.innerText = "응답 데이터가 존재하지 않습니다";
                $("#statArea").append(noDataInput);
                return false;
            }

            const answerPersonCount = data.resultEmailList.length;

            //1. DRAW SELECT
            const emailCollectYN = data.resultEmailList[0].hasOwnProperty("email") ? 1 : 0;
            let resultSelect = document.createElement("dl");
            resultSelect.name = "result_select";
            resultSelect.className = "selectDL";

            //1-1. draw default option
            let selectedOptionDT = document.createElement("dt");
            let selectedOptionA = document.createElement("a");
            let selectedOptionSpan = document.createElement("span");
            $(selectedOptionSpan).attr("name","eachResultDiv_default");
            selectedOptionSpan.innerText = emailCollectYN == 1 ? `${data.resultEmailList[0].email} 응답` : `1번 응답자 응답`;

            let selectedValue = document.createElement("input");
            selectedValue.type = "hidden";
            selectedValue.value = data.resultEmailList[0].resultSeq;

            selectedOptionA.appendChild(selectedOptionSpan);
            selectedOptionDT.appendChild(selectedOptionA);
            selectedOptionDT.appendChild(selectedValue);

            //1-2. draw all option
            let optionDD = document.createElement("dd");
            let optionUL = document.createElement("ul");
            for(let i=0; i<answerPersonCount; i++){
                const selectOptionStr = emailCollectYN == 1 ? `${data.resultEmailList[i].email} 응답` : `${i+1}번 응답자 응답`;
                const selectedOptionValue = data.resultEmailList[i].resultSeq;

                let optionLI = document.createElement("li");
                let optionA = document.createElement("a");
                optionA.innerText = selectOptionStr;
                optionA.name = `eachResultDiv_${data.resultEmailList[i].resultSeq}`;
                optionLI.appendChild(optionA);
                optionUL.appendChild(optionLI);
            }
            optionDD.appendChild(optionUL);

            //1-3. ADD DOM
            resultSelect.appendChild(selectedOptionDT);
            resultSelect.appendChild(optionDD);

            $("#statArea").append(resultSelect);

            //2. DRAW ALL EACH RESULT
            for(let i=0; i<answerPersonCount; i++){
                const resultSeq = data.resultEmailList[i].resultSeq;
                const resultObj = data.resultList[`resultSeq_${resultSeq}`];

                let eachStatArea = document.createElement("div");
                eachStatArea.className = "eachStatArea";
                eachStatArea.id = `eachResultDiv_${resultSeq}`;

                for(let i=0; i<resultObj.length; i++){
                    const questionAnswerObj = resultObj[i];
                    const answerList = questionAnswerObj.answerList;

                    let question = document.createElement("h4");
                    question.innerText = questionAnswerObj.questionValue;
                    eachStatArea.appendChild(question);

                    if(questionAnswerObj.questionType == "file"){
                        let answerFile = document.createElement("a");
                        answerFile.href = "#none";
                        answerFile.name = "fileDownload_btn";
                        answerFile.innerText = answerList[0].answerValue;

                        let answers = document.createElement("p");
                        answers.innerText = "-";
                        answers.appendChild(answerFile);

                        eachStatArea.appendChild(answers);
                    }else{
                        const answerCnt = answerList.length;

                        for(let i=0; i<answerList.length; i++){
                            let answers = document.createElement("p");
                            answers.innerText = `- ${answerList[i].answerValue}`;

                            eachStatArea.appendChild(answers);
                        }
                    }
                    eachStatArea.appendChild(document.createElement("hr"));
                }

                if(i != 0){
                    eachStatArea.style.display = "none";
                }
                $("#statArea").append(eachStatArea);
            }
        }

        function errorCb(data){
            console.log("")
        }
    },
    changeEachResult(target){
        const name = target && target.getAttribute("name");
        const selectDL = $(target).parents("dl");

        if(name === "eachResultDiv_default"){
            $(selectDL).find("ul").toggle();
        }else{
            const selectedOptionStr = $(target).html(),
                selectedOptionVal = name.replace("eachResultDiv_",""),
                bfOptionVal = $(selectDL).find("#selectedValue").val();

            if(bfOptionVal === selectedOptionVal){
                $(selectDL).find("ul").hide();
                return true;
            }

            $(selectDL).find("span[name='eachResultDiv_default']").html(selectedOptionStr);
            $(selectDL).find("#selectedValue").val(selectedOptionVal);
            $(selectDL).find("ul").hide();

            $("div[id^='eachResultDiv_']", "#statArea").hide();
            $("div[id^='eachResultDiv_"+selectedOptionVal+"']", "#statArea").show();
        }
    }
};

export const surveyForm = {
    newSurvey(target){

        function successCb(data){
            const surveyInfo = data.survey[0],
                title = surveyInfo.title,
                expl = surveyInfo.expl,
                questionCnt = surveyInfo.questionCnt;
            let optionCnt = 0;

            //1.set basic survey info
            $("#editTitle").remove();

            $("#editTitleWithForm").show();
            $("#title_form", "#editTitleWithForm").val(title);
            $("#title").remove();

            $("#expl").val(expl);

            //2. set iscopysurvey true
            $("#isCopySurvey").val(true);

            //3. add each question
            for (let i=0; i<questionCnt; i++){
                const questionInfo =  surveyInfo.questions[i],
                    questionValue = questionInfo.questionValue,
                    questionTypeValue = questionInfo.questionType,
                    extInfo = questionInfo.extInfo;

                let eachAnswerArea = null,
                    questionDiv = null,
                    questionP = null,
                    questionInput = null,
                    questionDeleteDiv = null,
                    questionDeleteBtn = null,
                    answerTypeDiv = null,
                    answerTypeSelect = null,
                    answerTypeInput = null,
                    answerElement = null;

                eachAnswerArea = document.createElement("div");
                eachAnswerArea.id = "eachAnswerArea";
                eachAnswerArea.className = "eachAnswerArea";

                //3-1. add question
                questionDiv = document.createElement("div");
                questionDiv.className = "eachQuestionDiv";

                questionP = document.createElement("p");
                questionP.innerText = "문항 : ";

                questionInput = document.createElement("input");
                questionInput.type = "text";
                questionInput.name = "question";
                questionInput.className = "question";
                questionInput.value = questionValue;

                questionDiv.appendChild(questionP);
                questionDiv.appendChild(questionInput);
                eachAnswerArea.appendChild(questionDiv);

                //3-2. add question Delete Button
                questionDeleteDiv = document.createElement("div");
                questionDeleteDiv.className = "eachQuestionDeleteDiv";

                questionDeleteBtn = document.createElement("input")
                questionDeleteBtn.type = "button";
                questionDeleteBtn.name = "deleteQuestion_btn";
                questionDeleteBtn.id = "deleteQuestion_btn";
                questionDeleteDiv.appendChild(questionDeleteBtn);
                eachAnswerArea.appendChild(questionDeleteDiv);

                //3-3. add answerType Select
                answerTypeDiv = document.createElement("div");
                answerTypeDiv.className = "eachAnswerTypeDiv";
                answerTypeSelect = document.getElementById("addAnswerTypeSelect").cloneNode(true);
                answerTypeSelect.removeAttribute("id");
                answerTypeDiv.appendChild(answerTypeSelect);
                eachAnswerArea.appendChild(answerTypeDiv);

                answerTypeInput = document.createElement("input");
                answerTypeInput.type = "hidden";
                answerTypeInput.name = "questionType";
                answerTypeInput.value = questionTypeValue;
                questionInput.after(answerTypeInput);

                //3-4. add option
                if (questionTypeValue === "radio" || questionTypeValue === "checkbox") {
                    const optionCnt = questionInfo.optionCnt;
                    let optionArr = [];

                    for (let j=0; j<optionCnt; j++) {
                        optionArr.push(questionInfo.options[j].optionValue);
                    }
                    answerElement = getEachOptionEle(questionTypeValue, optionArr);
                }
                else {
                    answerElement = getEachOptionEle(questionTypeValue);
                }
                answerElement.className = "eachAnswerDiv";
                $(eachAnswerArea).append(answerElement);

                //3-5. add all
                $("#addAnswerArea").append(eachAnswerArea);

                //3-6. set answerType select value
                survey.changeAnswerType(answerTypeSelect.querySelector(`a[name='answerType_${questionTypeValue}']`))

                //3-7. set fileType checkbox
                survey.setExtInfo($(eachAnswerArea), extInfo);
            }
            //4. add default inactive answerArea
            $("#addAnswerArea").append(getInactiveAnswerAreaEle());

            //5. set sortable
            $("#addAnswerArea").sortable({items : " > div:not(.inactive)"});
        }

        function errorCb(){
            alertClass(alert, 'alert-error', '설문 양식을 불러올 수 없습니다');
        }

        const surveyFormNum = target.id.replace('survey_form_', '');
        const paramJson = `{"surveyFormNum" : "${surveyFormNum}"}`;

        util.requestURL("/doGetSurveyForm", JSON.parse(paramJson), successCb, errorCb);
    },
    showSurveyFormList(target){
        function successCb(data){
            const surveyFormList = data.returnObj;

            for(let i =0; i < surveyFormList.length; i++){
                const surveyForm = surveyFormList[i];

                let surveyFormBtn = null;
                surveyFormBtn = document.createElement("input");
                surveyFormBtn.type = "button";
                surveyFormBtn.className = surveyForm.type;
                surveyFormBtn.value = surveyForm.title;
                surveyFormBtn.name = `new_survey_form_btn`;
                surveyFormBtn.id = `survey_form_${surveyForm.surveyFormNum}`;

                $("#newSurveyStartArea").append(surveyFormBtn);
                $("#newSurveyStartArea").append(document.createTextNode("\u00A0"));
            }
        }

        function errorCb(){
            alertClass(alert, 'alert-error', '설문 양식을 불러올 수 없습니다');
        }

        util.requestURL("/doShowSurveyFormList", null, successCb, errorCb);
    }
};