import util from "../common/network.js";
import {colors} from "../common/colors.js";
import '/libs/jquery-3.4.1.min.js';

function alertClass (alert, addingClass, text) {
    setTimeout(function () {
        alert.removeClass();
        alert.addClass('alert');
        alert.addClass(addingClass).text(text);
    }, 1000);

    setTimeout(function () {
        alert.removeClass();
        alert.addClass('surveyAlert');
        alert.text('');
    }, 2000);
    alert.removeAttr('style');
}

export var survey = {
    newSurvey: function (target) {
        console.log("inside the newSurvey function");
        $("#creatorId").val(sessionStorage.getItem("id"));

        let idTitle = sessionStorage.getItem("id") + "/" + $("#title").val();
        $("#url").val(encodeURIComponent(idTitle));
        //$("#url").val(encryptURL);

        console.log($("#title").val());
        console.log($("#creatorId").val());
        console.log("url : " + $("#url").val());
        let form = $("#surveyForm").serialize(),
            alert = $(".surveyAlert"),
            listArea = $("#listArea");

        function surveySuccessCb(data) {
            let form = null;

            console.log($("#url").val());
            console.log(data.result);
            if(data.result === 1) {
                list.showSurveyList(target);
                listArea.load("surveyList.html");
                alertClass(alert, 'alert-success', '새로운 설문조사가 저장되었습니다');
            }
            else if (data.result === 0) {
                alertClass(alert, 'alert-warning', '같은 제목의 설문조사가 존재합니다');
            }
            else if (data.result === 2) {
                alertClass(alert, 'alert-warning', '마감일을 현재 날짜 이전의 값으로 설정할 수 없습니다');
            }

            console.log($("#title").val());
            console.log($("#creatorId").val());
            $("#addTitle").val($("#title").val());
            $("#addUserId").val($("#creatorId").val());
            console.log($("#addTitle").val());
            console.log($("#addUserId").val());
            form = $("#addLabelForm").serialize();
            console.log(form);
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

        if($("#question").length) {
            util.requestURL("/doNewSurvey", form, surveySuccessCb, errorCb);
        }
        else
            alertClass(alert, 'alert-warning', '최소 한 개 이상의 문항을 등록해주세요');
    },
    defAnswerType: function (target) {
        console.log("inside the addQuestion function");
        let form = $("#addQuestionForm").serialize(),
            questionInput = null,
            answerInput = null,
            deleteAnswerOption = null,
            optionToRemove = null,
            optionPreview = null;

        function successCb(data) {
            let answerArea = document.getElementById("aQDAnswerSheetArea"),
                eachAnswerArea = document.createElement("div"),
                question = data.question,
                answerType = data.answerType,
                optionInput = null,
                questionP = null,
                optionP = null,
                imgInput = null,
                distance = null;

            eachAnswerArea.className = "eachAnswerArea";

            questionP = document.createElement("p");
            questionP.innerText = "문항 : ";
            eachAnswerArea.prepend(questionP);

            questionInput = document.createElement("input");
            questionInput.type = "text";
            questionInput.value = question;
            questionInput.id = "question";
            questionInput.name = "question";
            eachAnswerArea.appendChild(questionInput);
            answerArea.appendChild(eachAnswerArea);

            if (answerType === "text") {
                answerInput = document.createElement("input");
                answerInput.type = "text";
                answerInput.placeholder = "주관식 텍스트";
                answerInput.setAttribute("readonly", "readonly");
                questionInput.after(answerInput);
            }
            if (answerType != "text") {
                optionP = document.createElement("p");
                optionP.innerText = "선택지 : ";
                questionInput.after(optionP);

                for (let i=0; i<2; i++) {
                    // if (answerType === "img") {
                    //     optionInput = document.createElement("input");
                    //     optionInput.type = "file";
                    //     optionInput.className = question + "Option";
                    //     optionInput.name = question + "Option";
                    //     eachAnswerArea.appendChild(optionInput);
                    // }
                    // else {
                        optionInput = document.createElement("input");
                        optionInput.type = "text";
                        optionInput.placeholder = "보기를 입력하세요";
                        optionInput.className = question + "Option";
                        optionInput.name = question + "Option";
                        eachAnswerArea.appendChild(optionInput);

                        optionPreview = document.createElement("input");
                        if (answerType === "checkbox")
                            optionPreview.type = "checkbox";
                        else
                            optionPreview.type = "radio";
                        optionPreview.value = " ";

                        optionInput.before(optionPreview);
                    //}
                }
            }

            $(deleteAnswerOption).click(function () {
                optionToRemove = $(this).prev();
                console.log($(this));
                console.log(optionToRemove);
                optionToRemove.remove();
                $(this).remove();
            });


            answerInput = document.createElement("input");
            answerInput.type = "hidden";
            answerInput.value = answerType;
            answerInput.name = "questionType";
            questionInput.after(answerInput);

            console.log("question : " + question);
            console.log("answerType : " + answerType);
        }

        function errorCb() {
            alertClass(alert, 'alert-error', '설문조사 질문 및 답변 형태 등록 에러입니다');
        }

        util.requestURL("/doAddQuestionType", form, successCb, errorCb);
    },
    deleteQuestionList : function(target) {
        console.log(target);
        console.log(target.id);

        let addQuestionArea = $("#aQDAnswerSheetArea")[0],
            questionInAddQuestionArea = $( "#aQDAnswerSheetArea #question"),
            questionCnt = questionInAddQuestionArea.length;
        console.log(addQuestionArea);

        let deleteQuestionList = $("#deleteQuestionList")[0],
            questionP = null,
            question = null;

        console.log(deleteQuestionList);

        deleteQuestionList.innerHTML = "";

        if (questionInAddQuestionArea) {
            for (let i=0; i<questionCnt; i++) {
                questionP = document.createElement("p");
                questionP.innerHTML = questionInAddQuestionArea[i].value;

                question = document.createElement("input");
                question.type = "checkbox";
                question.name = "question";
                question.value = questionInAddQuestionArea[i].value + i;
                questionP.prepend(question);
                deleteQuestionList.append(questionP);

                console.log(questionInAddQuestionArea[i].value);
            }
        }
        else {
            questionP = document.createElement("p");
            questionP.innerHTML = "추가된 질문이 없습니다";
            deleteQuestionList.append(questionP);
        }
    },
    deleteQuestion : function(target) {
        console.log(target);
        console.log(target.id);

        let deleteQuestionList = $("#deleteQuestionList")[0],
            form = $("#deleteQuestionForm").serialize();
        console.log(deleteQuestionList);
        console.log(form);

        function successCb(data) {
            console.log(data);

            let questionCnt = data.questions.length;
            console.log(questionCnt);

            let questionInput = null,
                eachQuestionArea = null,
                question = "",
                idx = 0,
                idxArr = new Array();

            console.log($("#eachAnswerArea").eq(0)[0]);

            for (let i=0; i<questionCnt; i++) {
                question = data.questions[i].question;
                console.log(question);
                idx = parseInt(question.substr(question.length - 1));
                console.log(idx);
                console.log(typeof idx);
                console.log($("div.eachAnswerArea").eq(idx)[0]);
                idxArr.push(idx);
            }

            console.log(idxArr.length);
            for (let i=0; i<idxArr.length; i++) {
                console.log(idxArr[i]);
                $("div.eachAnswerArea").eq(idxArr[i]-i)[0].remove();
            }
        }

        function errorCb() {
            console.log("error");
        }

        util.requestURL("/doDeleteQuestion", form, successCb, errorCb);
    },
    addOption : function(target) {
        console.log(target);
        console.log(target.id);

        console.log(target.parentNode);

        let targetQuestion = target.value,
            targetParentArea = target.parentNode,
            optionPreview = null,
            questionType = target.parentNode.childNodes[2].value;

        console.log(questionType);

        let optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "보기를 입력하세요";
        optionInput.className = targetQuestion + "Option";
        optionInput.name = targetQuestion + "Option";
        targetParentArea.append(optionInput);

        optionPreview = document.createElement("input");
        if (questionType === "checkbox")
            optionPreview.type = "checkbox";
        else
            optionPreview.type = "radio";
        optionPreview.value = " ";
        optionInput.before(optionPreview);
    },
    deleteOption : function(target) {
        console.log(target);
        console.log(target.id);
        console.log(target.prev());

        target.remove();
        target.prev().remove();
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
        console.log(target);
        console.log(target.id);

        let userId = sessionStorage.getItem("id"),
            title = target.id,
            pageValue = "{\"userId\" : \"" + userId + "\", \"title\" : \"" + title + "\"}";

        function getSurveyInfo (data) {
            let surveyNumValue = "{\"surveyNum\" : " +data.surveyNum + "}";
            console.log(data);
            console.log(data.surveyNum);
            console.log(surveyNumValue);

            util.requestURL("/doEditSurvey", JSON.parse(surveyNumValue), setSurveyInfo, errorCb);
        }

        function setSurveyInfo (data) {
            console.log(data);

            let title = data.survey[0].title,
                expl = data.survey[0].expl,
                creatorId = data.survey[0].creatorId,
                endTime = data.survey[0].endTime.replace(' ', 'T'),
                questionCnt = data.survey[0].questionCnt,
                optionCnt = 0;

            console.log(endTime);

            // survey info
            let editTitleArea = $("#editTitle"),
                editExplArea = $("#expl"),
                editEndTimeArea = $("#endTime");

            editTitleArea.text(title);
            editExplArea.val(expl);

            endTime = endTime.split('.')[0];
            editEndTimeArea.val(endTime);
            //

            // hidden values
            let hiddenTitleValue = $("#title"),
                hiddenCreatorIdValue = $("#creatorId");

            hiddenTitleValue.val(title);
            hiddenCreatorIdValue.val(creatorId);
            //

            // elements to be created
            let eachEditArea = null,
                questionInput = null,
                questionTypeInput = null,
                optionInput = null,
                deleteOptionBtn = null,
                addOptionBtn = null,
                deleteQuestionBtn = null;
            //

            // elements to be changed (value)
            let questionValue = null,
                questionTypeValue = null,
                optionValue = null,
                answerInput = null,
                questionP = null,
                optionP = null,
                optionPreview = null,
                distance = null;
            //

            // addQuestion dialog
            let modal = document.getElementById("addEditQuestion_dialog");
            //

            console.log("questionCnt : " + questionCnt);
            for (let i=0; i<questionCnt; i++){
                eachEditArea = document.createElement("div");
                eachEditArea.id = "eachEditArea" + i;
                eachEditArea.className = "eachEditArea";

                questionP = document.createElement("p");
                questionP.innerText = "문항 : ";

                questionValue = data.survey[0].questions[i].questionValue;
                questionInput = document.createElement("input");
                questionInput.type = "text";
                questionInput.name = "question";
                questionInput.className = "question";
                questionInput.value = questionValue;
                eachEditArea.append(questionInput);

                questionTypeValue = data.survey[0].questions[i].questionType;
                questionTypeInput = document.createElement("input");
                questionTypeInput.type = "hidden";
                questionTypeInput.name = "questionType";
                questionTypeInput.value = questionTypeValue;
                questionInput.after(questionTypeInput);

                console.log(questionValue);
                console.log(questionTypeValue);

                if (!(questionTypeValue === "text")) {
                    optionCnt = data.survey[0].questions[i].optionCnt;

                    for (let j=0; j<optionCnt; j++) {
                        optionValue = data.survey[0].questions[i].options[j].optionValue;
                        optionInput = document.createElement("input");
                        optionInput.type = "text";
                        optionInput.name = questionValue + "Option";
                        optionInput.className = questionValue + "Option";
                        optionInput.id = questionValue + "Option";
                        optionInput.value = optionValue;

                        eachEditArea.prepend(questionInput);
                        eachEditArea.append(optionInput);

                        optionPreview = document.createElement("input");
                        if (questionTypeValue === "checkbox")
                            optionPreview.type = "checkbox";
                        else
                            optionPreview.type = "radio";
                        optionPreview.value = " ";
                        optionInput.before(optionPreview);

                        distance = document.createElement("p");
                        optionInput.after(distance);
                    }

                    optionP = document.createElement("p");
                    optionP.innerText = "선택지 : ";
                    questionInput.after(optionP);
                }
                else {
                    answerInput = document.createElement("input");
                    answerInput.type = "text";
                    answerInput.placeholder = "주관식 텍스트";
                    answerInput.setAttribute("readonly", "readonly");
                    questionInput.after(answerInput);
                }

                eachEditArea.prepend(questionP);

                $("#surveyEditTbl").append(eachEditArea);
            }

            $("input[name=addEditQuestion_submitBtn]").click(function () {
                modal.style.display = "none";

                let questionDialog = $("#addEditQuestionForm"),
                    questionInputValue = questionDialog.find("input[name=question]").val(),
                    answerTypeInputValue = questionDialog.find("input[name=answerType]:checked").val(),
                    lastEachEditAreaId = $(".eachEditArea").last()[0].id,
                    lastEachEditAreaIdx = parseInt(lastEachEditAreaId.substr(lastEachEditAreaId.length - 1)),
                    newQuestionArray = null;


                eachEditArea = document.createElement("div");
                eachEditArea.id = "eachEditArea" + (lastEachEditAreaIdx + 1);
                eachEditArea.className = "eachEditArea";
                $("#surveyEditTbl").append(eachEditArea);

                questionP = document.createElement("p");
                questionP.innerText = "문항 : ";
                eachEditArea.append(questionP);

                questionInput = document.createElement("input");
                questionInput.type = "text";
                questionInput.name = "question";
                questionInput.value = questionInputValue;
                eachEditArea.append(questionInput);

                questionTypeInput = document.createElement("input");
                questionTypeInput.type = "hidden";
                questionTypeInput.name = "questionType";
                questionTypeInput.value = answerTypeInputValue;
                questionInput.after(questionTypeInput);

                if (answerTypeInputValue === "text") {
                    answerInput = document.createElement("input");
                    answerInput.type = "text";
                    answerInput.placeholder = "주관식 텍스트";
                    answerInput.setAttribute("readonly", "readonly");
                    questionInput.after(answerInput);
                }
                else {
                    questionP = document.createElement("p");
                    optionP.innerText = "선택지 : ";
                    eachEditArea.append(optionP);

                    for (let i = 0; i < 2; i++) {
                        optionInput = document.createElement("input");
                        optionInput.type = "text";
                        optionInput.placeholder = "보기를 입력하세요";
                        optionInput.className = questionInputValue + "Option";
                        optionInput.name = questionInputValue + "Option";
                        eachEditArea.appendChild(optionInput);

                        optionPreview = document.createElement("input");
                        if (answerTypeInputValue === "checkbox")
                            optionPreview.type = "checkbox";
                        else
                            optionPreview.type = "radio";
                        optionPreview.value = " ";
                        optionInput.before(optionPreview);
                    }
                }
            });
        }

        function errorCb () {
            console.log("error");
        }

        util.requestURL("/doFindSurveyNum", JSON.parse(pageValue), getSurveyInfo, errorCb);
    },
    addEditQuestion : function (target) {
        let modal = $("#addEditQuestion_dialog"),
            form = $("#addEditQuestionForm").serialize(),
            questionInput = null,
            answerInput = null,
            deleteAnswerOption = null,
            optionToRemove = null;

        function  successCb(data) {
            let answerArea = document.getElementById("surveyEditTbl"),
                eachEditArea = document.createElement("div"),
                question = data.question,
                answerType = data.answerType;

            eachEditArea.className = "eachEditArea";

            $(deleteAnswerOption).click(function () {
                optionToRemove = $(this).prev();
                optionToRemove.remove();
                $(this).remove();
            });

            answerInput = document.createElement("input");
            answerInput.type = "hidden";
            answerInput.value = answerType;
            answerInput.name = "questionType";
            eachEditArea.append(answerInput);
        }

        function errorCb(){
            alertClass(alert, 'alert-error', '설문조사 질문 및 답변 형태 수정 등록 에러입니다');
        }

        util.requestURL("/doAddQuestionType", form, successCb, errorCb);
    },
    deleteEditQuestionList : function (target) {
        console.log(target);
        console.log(target.id);
        console.log($("#surveyEditTbl .eachEditArea .question"));

        let addEditQuestionArea = $("#surveyEditTbl")[0],
            questionInAddEditQuestionArea = $("#surveyEditTbl .eachEditArea input[name=question]");
        console.log(addEditQuestionArea);

        let deleteEditQuestionList = $("#deleteEditQuestionList")[0],
            questionP = null,
            question = null;

        deleteEditQuestionList.innerHTML = "";

        console.log(questionInAddEditQuestionArea.length);
        console.log($("#surveyEditTbl.eachEditArea").length);
        console.log(deleteEditQuestionList);

        if (questionInAddEditQuestionArea.length > 0) {
            for (let i=0; i<questionInAddEditQuestionArea.length; i++) {
                console.log(questionInAddEditQuestionArea[i].value);
                questionP = document.createElement("p");
                questionP.innerHTML = questionInAddEditQuestionArea[i].value;
                console.log(questionP);

                question = document.createElement("input");
                question.type = "checkbox";
                question.name = "question";
                question.value = questionInAddEditQuestionArea[i].value + i;
                questionP.prepend(question);
                deleteEditQuestionList.append(questionP);
            }
        }
        else {
            questionP = document.createElement("p");
            questionP.innerHTML = "추가된 질문이 없습니다";
            deleteEditQuestionList.append(questionP);
        }
    },
    deleteEditQuestion : function (target) {
        let deleteEditQuestionList = $("#deleteEditQuestionList")[0],
            form = $("#deleteEditQuestionForm").serialize();

        console.log(form);

        function successCb (data) {
            console.log(data);
            let questionCnt = data.questions.length,
                question = "",
                idx = 0,
                idxArr = new Array();

            for (let i=0; i<questionCnt; i++) {
                question = data.questions[i].question;
                idx = parseInt(question.substr(question.length - 1));
                idxArr.push(idx);
            }

            for (let i=0; i<idxArr.length; i++) {
                $("div.eachEditArea").eq(idxArr[i]-i)[0].remove();
            }
        }

        function errorCb () {
            console.log("error");
        }

        util.requestURL("/doDeleteQuestion", form, successCb, errorCb);
    },
    addEditOption : function (target) {
        console.log(target);

        console.log(target.parentNode);
        console.log(target.parentNode.id);

        let targetQuestion = target.value,
            targetParentArea = target.parentNode,
            optionPreview = null;

        let questionType = $("#" + target.parentNode.id + " > input[type=hidden]")[0].value;
        console.log(questionType);

        if (questionType != 'text') {
            let optionInput = document.createElement("input");
            optionInput.type = "text";
            optionInput.placeholder = "보기를 입력하세요";
            optionInput.className = targetQuestion + "Option";
            optionInput.name = targetQuestion + "Option";
            optionInput.id = targetQuestion + "Option";
            targetParentArea.append(optionInput);

            optionPreview = document.createElement("input");
            if (questionType === "checkbox")
                optionPreview.type = "checkbox";
            else
                optionPreview.type = "radio";
            optionPreview.value = " ";
            optionInput.before(optionPreview);
        }
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
        let idTitle = sessionStorage.getItem("id") + "/" + $("#title").val(),
            endTime = $("#endTime").val().replace(' ', 'T');

        console.log(endTime);
        endTime = endTime.split('.')[0];
        console.log(endTime);
        $("input[name=endTime]").val(endTime);
        $("#url").val(encodeURIComponent(idTitle));
        $("input[name=expl]").val($("#expl").val());

        // console.log($("#endTime").val());
        // console.log($("#expl").val());
        // console.log($("input[name=endTime]").val());
        // console.log($("input[name=expl]").val());

        let form = $("#editSurveyForm").serialize();

        function saveEditedSurvey(data) {
            console.log("success");

            form = $("#editSurveyForm").serialize();

            util.requestURL("/doNewSurvey", form, editLabel, errorCb);
        }

        function editLabel (data) {
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

        console.log(form);
        util.requestURL("/doSaveEditedSurvey", form, saveEditedSurvey, errorCb);
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
            urlInput.attr('value', "172.30.6.170:8080/html/surveyResponse.html?url=" + data.url);
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

        url = "172.30.6.170:8080/html/surveyResponse.html?url=" + url;
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
    }
};

export var list = {
    showSurveyList: function (target) {
        let alert = $(".surveyAlert"),
            loginId = sessionStorage.getItem("id"),
            loginIdJson = "{\"loginId\" : \"" + loginId + "\"}";

        console.log("loginId : "+loginId);
        console.log("loginIdJson : " + loginIdJson);

        function dataSort(a, b) {
            let aDate = new Date(a.endTime),
                bDate = new Date(b.endTime);

            if (aDate > bDate) {
                return 0;
            }
            return (aDate > bDate) ? 1 : -1;
        }

        function successCb (data) {
            console.log(data.survey);

            data.survey.sort(function (a, b) {
                let aTime = Date.parse(a.endTime),
                    bTime = Date.parse(b.endTime);

                return aTime > bTime ? -1 : aTime < bTime ? 1 : 0;
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

                let surveyTr = document.createElement("tr");
                    item = surveyData[i],
                    surveyTblCol = [item.title, item.endTime, item.responseCnt, edit_btn, result_btn, share_btn, delete_btn],
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
                    }
                    surveyTr.appendChild(surveyTd);
                    surveyTbody.appendChild(surveyTr);
                }
            }
            surveyTbl.appendChild(surveyTbody);
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
        let form = $("#surveyResponseForm").serialize(),
            alert = $(".surveyAlert"),
            isEmpty = false,
            isEmptyArr = new Array();
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
            console.log($("#surveyResponseArea .actualSurveyResponseArea input[name=questionType]").eq(i).val());
            if (questionType === "text") {
                if ($("#surveyResponseArea .actualSurveyResponseArea").eq(i).find("input[type='text']").val() != "")
                    isEmptyArr[i] = isEmpty;
                else
                    isEmptyArr[i] = false;
            } else if (questionType === "checkbox") {
                $("#surveyResponseArea .actualSurveyResponseArea").eq(i).find("input[type='checkbox']").each(function () {
                    console.log($(this)[0]);
                    console.log($(this).prop("checked"));
                    if (!$(this).prop("checked"))
                        isEmptyArr[i] = true;
                    else {
                        isEmptyArr[i] = false;
                        return false;
                    }
                });
            } else {
                $("#surveyResponseArea .actualSurveyResponseArea").eq(i).find("input[type='radio']").each(function () {
                    console.log($(this)[0]);
                    console.log($(this).prop("checked"));
                    if (!$(this).prop("checked"))
                        isEmpty = true;
                    else {
                        isEmptyArr[i] = false;
                        return false;
                    }
                });
            }
        }

        console.log(isEmptyArr);
        if (isEmptyArr.every(chkResponse) === true)
            util.requestURL("/doSaveResponse", form, saveLabelFunc, errorCb);
        else {
            alertClass(alert, 'alert-warning', '모든 문항에 답변해주세요');
            return false;
        }

        function chkResponse(value) {
            return value === false;
        }
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
        $("input[name=showStat_btn]").css("background-color", "lightpink");
        let title = $("body #surveyInfo").find("#title")[0].innerText,
            creatorId = sessionStorage.getItem("id"),
            surveyValue = "{\"title\" : \"" + title + "\", \"creatorId\" : \"" + creatorId + "\"}";
        console.log(surveyValue);
        util.requestURL("/doGetResultInfo", JSON.parse(surveyValue), successCb, errorCb);

        function successCb (data) {
            console.log(data);

            console.log(data.result[0].hasOwnProperty('answers') === false);
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
                else {
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
                        console.log(data.labelResult[i].options[j].labels[0].hasOwnProperty('labelOptions'));
                        if (data.labelResult[i].options[j].labels[0].hasOwnProperty('labelOptions') === false) {
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
    }
};