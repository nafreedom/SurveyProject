import handler from '/js/common/handler.js';
import {colors} from '/js/common/colors.js';
import '/libs/jquery-3.4.1.min.js';
import util from '/js/common/network.js';

window.$ = $;

$(document).ready(function (e) {

    localStorage.removeItem("prevTarget");
    localStorage.removeItem("prevBgColor");

    console.log(window.location.href);
    let url = window.location.href,
        params = decodeURIComponent(getParam("url")),
        substrUrl = params.substr(4, url.length),
        creatorId = substrUrl.split("+")[0],
        title = substrUrl.split("+")[1];

    console.log(params);
    console.log(substrUrl);
    console.log(creatorId);
    console.log(title);

    let surveyInfo = "{\"creatorId\" : \"" + creatorId + "\", \"title\" : \"" + title + "\"}";
    console.log(surveyInfo);

    util.requestURL("/doSetResultForm", JSON.parse(surveyInfo), setResultForm, errorCb);
});

function setResultForm (data) {
    console.log(data);

    localStorage.setItem("title", data.survey[0].title);
    $("input[name=showResult_btn]").css("background-color", "lightpink");

    let surveyInfo = null,
        title = data.survey[0].title,
        expl = data.survey[0].expl,
        creatorId = data.survey[0].creatorId;

    let titleArea = $("#title"),
        explArea = $("#expl");

    titleArea.text(title);
    explArea.text(expl);

    let questionCnt = data.survey[0].questionCnt;
    console.log(questionCnt);

    let wholeSurveyResultArea = $("#wholeSurveyResultArea"),
        eachQuestionArea = null,
        eachResultArea = null,
        question = null;

    for (let i=0; i<questionCnt; i++) {
        console.log(data.survey[0].questions[i].questionNum);
        console.log(data.survey[0].questions[i].questionValue);

        eachQuestionArea = document.createElement("div");
        eachQuestionArea.className = "eachQuestionArea";
        eachQuestionArea.id = data.survey[0].questions[i].questionValue;
        wholeSurveyResultArea.append(eachQuestionArea);

        question = document.createElement("h4");
        question.innerText = data.survey[0].questions[i].questionNum + ". " + data.survey[0].questions[i].questionValue;
        eachQuestionArea.prepend(question);

        eachResultArea = document.createElement("div");
        eachResultArea.className = "eachResultArea";
        eachResultArea.id = "eachResultArea" + (i+1);
        eachQuestionArea.append(eachResultArea);
    }
    handler.init();

    surveyInfo = "{\"title\" : \"" + title + "\", \"creatorId\" : \"" + creatorId + "\"}";
    console.log(surveyInfo);
    util.requestURL("/doGetResultInfo", JSON.parse(surveyInfo), successCb, errorCb);
}

function successCb (data) {
    let infoUL = null,
        infoLI = null;

    let madeDate = data.madeDate.replace("T", " "),
        endTime =data.endTime.replace("T", " ");

    infoUL = document.createElement("ul");
    $("#surveyInfoArea")[0].append(infoUL);

    infoLI = document.createElement("li");
    infoLI.innerHTML = "<b>설문조사 진행 기간 : </b>" + madeDate.substr(0, madeDate.length - 4) + " ~ " + endTime.substr(0, endTime.length - 4);
    infoUL.append(infoLI);

    infoLI = document.createElement("li");
    infoLI.innerHTML = "<b>총 응답자 수 : </b>" + data.surveyResponseCnt + "명";
    infoUL.append(infoLI);

    infoLI = document.createElement("li");
    infoLI.innerHTML = "<b>총 문항 수 : </b>" + data.result.length + "개";
    infoUL.append(infoLI);

    console.log(data.result[0].hasOwnProperty('answers'));
    $("#base rect.rectPart").remove();
    $("#base .partText").remove();
    $("#base .linePath").remove();
    console.log(data);

    let totalAnswerCnt = data.result.length,
        questionType = null,
        answerCnt = 0,
        answerValue = null;

    //주관식 문항 영역
    let answerArea = null,
        eachAnswer = null;

    //객관식 문항 영역
    let chartArea = null,
        svg = null,
        chart = null,
        part = null,
        totalOptionCnt = 0;

    let centerXArr = new Array(),
        centerYArr = new Array();

    let labelCnt = data.labelInfo.length;
    console.log(labelCnt);

    // let labelTitle = document.createElement("p");
    // labelTitle.innerText = "라벨 선택";
    // $("#fixedMenu").prepend(labelTitle);

    for (let a=labelCnt-1; a>=0; a--) {
        console.log(a);
        let tabBtn = document.createElement("input");
        tabBtn.type = "button";
        tabBtn.value = data.labelInfo[a].labelNickname;
        tabBtn.name = data.labelInfo[a].labelName;
        tabBtn.id = "standardBtn" + a;
        if (a === labelCnt-1) {
            tabBtn.className = "standard";
        }

        $("#fixedMenu").append(tabBtn);
        let distance = document.createElement("p");
        tabBtn.after(distance);
    }

    let floatPosition = parseInt($("#fixedMenu").css('top'));
    $(window).scroll(function () {
        let scrollTop = 340,
            newPosition = scrollTop + floatPosition + "px";

        $("#fixedMenu").stop().animate({
            "top" : newPosition
        }, 200);
    }).scroll();

    // 데이터가 없을 시
    if (data.result[0].hasOwnProperty('answers') === false) {
        let noDataInput = document.createElement("h3");
        noDataInput.innerText = "응답 데이터가 존재하지 않습니다";
        $(".eachResultArea").append(noDataInput);
        return false;
    }

    for (let i=0; i<totalAnswerCnt; i++) {
        answerCnt = data.result[i].answers.length;
        questionType = data.result[i].questionType;
        console.log(questionType);
        console.log(answerCnt);

        if (questionType === "text" || questionType === "date" || questionType === "time") {
            answerArea = $("#eachResultArea" + (i+1))[0];

            for (let j=0; j<answerCnt; j++) {
                answerValue = data.result[i].answers[j].answerValue;
                // console.log(answerValue);

                eachAnswer = document.createElement("p");
                eachAnswer.className = "eachAnswer";
                eachAnswer.innerText = answerValue;

                answerArea.append(eachAnswer);
            }
        }
        else if(questionType === "radio" || questionType === "checkbox"){
            centerXArr = new Array();
            centerYArr = new Array();
            answerCnt = data.result[i].answers.length;

            svg = $("#base").clone();
            chartArea = $("#eachResultArea" + (i + 1))[0];
            chartArea.append(svg[0]);
            svg[0].style.display = "block";

            console.log(chartArea);
            console.log(answerCnt);

            totalOptionCnt = 0;
            for (let j=0; j<answerCnt; j++)
                totalOptionCnt += data.result[i].answers[j].answerCnt;
            console.log("total : " + totalOptionCnt);

            let calcAngle = 0,
                wholeAngle = 360;
            for (let j=0; j<answerCnt; j++) {
                console.log("wholeAngle : " + wholeAngle);

                console.log(data.result[i].answers);

                chart = $("body > #base").clone();
                part = $("body > #part path").clone();
                $(".standard").css("background-color", "lightpink");

                console.log(part[0]);
                console.log(part[0].getAttribute("d"));
                console.log(part[0].getAttribute("d").split(' '));

                console.log(data.result[i].answers[j].answerCnt);
                console.log(data.result[i].answers[j].answerCnt/totalOptionCnt);
                let percentage = data.result[i].answers[j].answerCnt/totalOptionCnt;
                console.log("percentage : " + percentage);


                let startX = 10,
                    startY = 150;

                if (j != 0) {
                    console.log($("#eachResultArea" + (i+1) + " path:nth-child(" + (j+1) + ")")[0]);
                    let prevPath = $("#eachResultArea" + (i+1) + " path:last-child")[0];
                    console.log(prevPath);
                    console.log(prevPath.getAttribute("d").split(' '));
                    startX = prevPath.getAttribute("d").split(' ')[12];
                    startY = prevPath.getAttribute("d").split(' ')[13];
                }

                console.log(startX);
                console.log(startY);

                let r = 140;
                let angle = 360 * percentage;
                console.log(angle);
                let a = 0, b = 0;
                let endX = 0, endY = 0;
                let temp1 = 0, temp2 = 0;
                let halfAngle = 0, centerX = 0, centerY = 0;
                console.log("calcAngle : " + calcAngle);

                function getAngleRadian (angle) {
                    return Math.PI * angle / 180;
                }

                function getSinAngle (angleRadian) {
                    return Math.abs(Math.sin(angleRadian));
                }

                function getCosAngle (angleRadian) {
                    return Math.abs(Math.cos(angleRadian));
                }

                function getTanAngle (angleRadian) {
                    return Math.abs(Math.tan(angleRadian));
                }

                console.log("angle : " + angle);
                wholeAngle = wholeAngle - angle;


                console.log("a : " + a);
                console.log("b : " + b);

                if (angle === 360) {
                    console.log(part[0]);
                    part[0].remove();

                    let whole = $("#whole")[0];
                    console.log(whole);
                    //$("#whole")[0].remove();
                    whole.style.display = "block";
                    whole.setAttribute("name", data.result[i].answers[j].answerValue + "Path");
                    $("#eachResultArea" + (i+1) + " > #base").append(whole);

                    centerXArr.push(150);
                    centerYArr.push(150);

                    break;
                }

                if (startX < 150 && startY >= 150) {
                    let angleUntilNow = 360 - (wholeAngle + angle);
                    console.log(angleUntilNow);

                    if (angle <= 90) {
                        angle = getAngleRadian(angle);
                        a = getCosAngle(angle) * r;
                        b = getSinAngle(angle) * r;

                        endX = 150 - a;
                        endY = 150 + b;

                        angle = angle * (180/Math.PI);
                        halfAngle = angle / 2;
                        if ((angle + angleUntilNow) > 90) {
                            if (startX != 10 && startY != 150) {
                                let tempAngle = 180 - (angle + angleUntilNow);
                                tempAngle = 180 - (tempAngle + angle);
                                tempAngle = 90 - (tempAngle + halfAngle);
                                tempAngle = 90 - tempAngle;
                                tempAngle = getAngleRadian(tempAngle);
                                a = getCosAngle(tempAngle) * (r/2);
                                b = getSinAngle(tempAngle) * (r/2);

                                centerX = 150 - a;
                                centerY = 150 + b;
                                console.log(centerX);
                                console.log(centerY);
                            }
                            else {
                                halfAngle = getAngleRadian(halfAngle);
                                a = getCosAngle(halfAngle) * (r/2);
                                b = getSinAngle(halfAngle) * (r/2);

                                centerX = 150 - a;
                                centerY = 150 + b;
                                console.log(centerX);
                                console.log(centerY);
                            }
                        }
                        else {
                            if (startX != 10 && startY != 150) {
                                let tempAngle = 90 - (angleUntilNow + halfAngle);
                                tempAngle = getAngleRadian(tempAngle);
                                a = getSinAngle(tempAngle) * (r/2);
                                b = getCosAngle(tempAngle) * (r/2);

                                centerX = 150 - a;
                                centerY = 150 + b;
                                console.log(centerX);
                                console.log(centerY);
                            }
                            else {
                                halfAngle = getAngleRadian(halfAngle);
                                a = getCosAngle(halfAngle) * (r/2);
                                b = getSinAngle(halfAngle) * (r/2);

                                centerX = 150 - a;
                                centerY = 150 + b;
                                console.log(centerX);
                                console.log(centerY);
                            }
                        }
                    }
                    else if (angle < 180) {
                        if (startX === 10 && startY === 150) {
                            angle = 180 - angle;

                            console.log(angle);

                            angle = getAngleRadian(angle);
                            a = getSinAngle(angle) * r;
                            b = getCosAngle(angle) * r;

                            endX = 150 + a;
                            endY = 150 + b;
                        }
                        else {
                            angle = Math.abs(270 - (angle + angleUntilNow));

                            console.log(angle);

                            angle = getAngleRadian(angle);
                            a = getSinAngle(angle) * r;
                            b = getCosAngle(angle) * r;

                            endX = 150 + a;
                            endY = 150 - b;
                        }

                        angle = angle * (180 / Math.PI);
                        if (startX === 10 && startY === 150)
                            angle = 180 - angle;
                        else
                            angle = Math.abs(270 - (angle + angleUntilNow));
                        angle = 180 - angle;
                        if (startX === 10 && startY === 150) {
                            halfAngle = (angle / 2) / 2;
                            halfAngle = getAngleRadian(halfAngle);
                            a = getSinAngle(halfAngle) * (r / 2);
                            b = getCosAngle(halfAngle) * (r / 2);
                            centerX = 150 - a;
                            centerY = 150 + b;
                        }
                        else {
                            halfAngle = angle/2;
                            let tempAngle1 = 90 - angleUntilNow,
                                tempAngle2 = angle - tempAngle1;

                            if (tempAngle1 > tempAngle2) {
                                halfAngle = halfAngle - tempAngle1;
                                //tempAngle2 = tempAngle2 + halfAngle;
                                tempAngle2 = getAngleRadian(tempAngle2);

                                a = getSinAngle(tempAngle2) * (r/2);
                                b = getCosAngle(tempAngle2) * (r/2);

                                centerX = 150 + a;
                                centerY = 150 + b;
                            }
                            else if (tempAngle1 === tempAngle2) {
                                centerX = 150;
                                centerY = 220;
                            }
                            else {
                                tempAngle1 = getAngleRadian(tempAngle1);
                                a = getSinAngle(tempAngle1) * (r/2);
                                b = getCosAngle(tempAngle1) * (r/2);

                                centerX = 150 - a;
                                centerY = 150 + b;
                            }
                        }
                    }
                    else if (angle === 180) {
                        endX = 290;
                        endY = 150;

                        centerX = 150;
                        centerY = 225;
                    }
                    else if (angle < 270) {
                        temp1 = 1;
                        temp2 = 0;

                        console.log(angle);
                        console.log(angleUntilNow);

                        angle = 270 - (angle + angleUntilNow);
                        angle = getAngleRadian(angle);
                        console.log(angle);
                        a = getSinAngle(angle) * r;
                        b = getCosAngle(angle) * r;

                        endX = 150 + a;
                        endY = 150 - b;

                        angle = angle * 180 / Math.PI;
                        halfAngle = angle/2 - 90;
                        a = getTanAngle(halfAngle) * (r/2);
                        b = getCosAngle(halfAngle) * (r/2);

                        centerX = 150 + a;
                        centerY = 150 + b;

                        if (startX === 10 && startY ===150) {
                            let tempAngle = angle - 180;
                            tempAngle = halfAngle - tempAngle;

                            a = getCosAngle(tempAngle) * (r/2);
                            b = getSinAngle(tempAngle) * (r/2);

                            centerX = 150 + a;
                            centerY = 150 + b;
                        }
                    }
                    else if (angle === 270) {
                        temp1 = 1;
                        temp2 = 0;

                        endX = 150;
                        endY = 10;

                        halfAngle = getAngleRadian(45);
                        a = getCosAngle(halfAngle) * (r/2);
                        b = getSinAngle(halfAngle) * (r/2);

                        centerX = 150 + a;
                        centerY = 150 + b;
                    }
                    else {
                        temp1 = 1;
                        temp2 = 0;

                        angle = 360 - angle;
                        angle = getAngleRadian(angle);

                        a = getCosAngle(angle) * r;
                        b = getSinAngle(angle) * r;

                        endX = 150 - a;
                        endY = 150 - b;

                        halfAngle = angle/2;
                        a = getCosAngle(halfAngle) * (r/2);
                        b = getSinAngle(halfAngle) * (r/2);

                        centerX = 150 + a;
                        centerY = 150 + b;
                    }
                }
                else if (startX >= 150 && startY > 150) {

                    console.log(wholeAngle);
                    let angleUntilNow = 360 - (wholeAngle + angle);
                    console.log(angleUntilNow);

                    if ((angle + angleUntilNow) < 180) {
                        angle = getAngleRadian(angle);
                        a = getCosAngle(angle) * r;
                        b = getSinAngle(angle) * r;
                        endX = 150 + a;
                        endY = 150 + b;

                        halfAngle = 90 - angle;
                        halfAngle = getAngleRadian(halfAngle);
                        a = getCosAngle(halfAngle) * (r/2);
                        b = getSinAngle(halfAngle) * (r/2);

                        centerX = 150 + a;
                        centerY = 150 + b;
                    }
                    else if ((angle + angleUntilNow) === 180) {
                        endX = 290;
                        endY = 150;

                        centerX = 225;
                        centerY = 150;
                    }
                    else if ((angle + angleUntilNow) < 270) {
                        console.log(angle);
                        let tempAngle = Math.abs(180 - angleUntilNow);
                        console.log(tempAngle);
                        tempAngle = getAngleRadian(tempAngle);
                        let tempA = getCosAngle(tempAngle) * r;
                        console.log("tempA : " + tempA);

                        tempAngle = tempAngle * 180 / Math.PI;
                        angle = angle - tempAngle;
                        console.log("leftover angle : " + angle);
                        angle = getAngleRadian(angle);
                        a = getCosAngle(angle) * r;
                        b = getSinAngle(angle) * r;

                        endX = 150 + a;
                        endY = 150 - b;

                        // tempAngle = getAngleRadian(tempAngle);
                        // angle = tempAngle + angle;
                        //
                        // halfAngle = angle/2;
                        // a = getCosAngle(halfAngle) * (r/2);
                        // b = getSinAngle(halfAngle) * (r/2);
                        //
                        // centerX = 150 + a;
                        // centerY = 150 + b;

                        angle = angle * (180/Math.PI);
                        tempAngle = 270 - (angleUntilNow + angle);
                        tempAngle = 90 - tempAngle;
                        tempAngle = getAngleRadian(tempAngle);
                        centerX = 150 + getCosAngle(tempAngle) * (r/2);
                        centerY = 150;
                    }
                    else if ((angle + angleUntilNow) === 270) {
                        endX = 150;
                        endY = 10;

                        halfAngle = getAngleRadian(45);
                        a = getCosAngle(halfAngle) * (r/2);
                        b = getSinAngle(halfAngle) * (r/2);

                        centerX = 150 + a;
                        centerY = 150 - b;
                    }
                    else {
                        if (angle > 180) {
                            temp1 = 1;
                            temp2 = 0;
                        }

                        angle = 360 - (angle + angleUntilNow);
                        angle = getAngleRadian(angle);
                        a = getCosAngle(angle) * r;
                        b = getSinAngle(angle) * r;

                        endX = 150 - a;
                        endY = 150 - b;

                        angle = angle * (180/Math.PI);

                        halfAngle = angle/2;
                        let tempAngle = 180 - angleUntilNow;
                        tempAngle = halfAngle - tempAngle;
                        tempAngle = getAngleRadian(tempAngle);
                        a = getCosAngle(tempAngle) * (r/2);
                        b = getSinAngle(tempAngle) * (r/2);

                        centerX = 150 + a;
                        centerY = 150 - b;
                    }
                }
                else if (startX > 150 && startY <= 150) {
                    console.log("wholeAngle : " + wholeAngle);
                    let angleUntilNow = 360 - (wholeAngle + angle);
                    console.log(angleUntilNow);

                    if ((angle + angleUntilNow) <= 270) {
                        angle = getAngleRadian(angle);
                        a = getCosAngle(angle) * r;
                        b = getSinAngle(angle) * r;

                        endX = 150 + a;
                        endY = 150 - b;

                        angle = angle * (180/Math.PI);
                        halfAngle = angle/2;
                        let tempAngle = 270 - angleUntilNow;
                        tempAngle = tempAngle - halfAngle;
                        tempAngle = getAngleRadian(tempAngle);
                        a = getSinAngle(tempAngle) * (r/2);
                        b = getCosAngle(tempAngle) * (r/2);

                        centerX = 150 + a;
                        centerY = 150 - b;
                    }
                    else {
                        let tempAngle = Math.abs(270 - angleUntilNow);
                        console.log(tempAngle);
                        tempAngle = getAngleRadian(tempAngle);
                        let tempA = getCosAngle(tempAngle) * r;
                        let tempB = getSinAngle(tempAngle) * r;
                        console.log("tempA : " + tempA);
                        console.log("tempB : " + tempB);

                        tempAngle = tempAngle * 180 / Math.PI;
                        console.log(angle);
                        console.log(tempAngle);
                        angle = angle - tempAngle;
                        console.log("leftover angle : " + angle);
                        angle = getAngleRadian(angle);
                        a = getSinAngle(angle) * r;
                        b = getCosAngle(angle) * r;

                        endX = 150 - a;
                        endY = 150 - b;

                        tempAngle = getAngleRadian(tempAngle);
                        angle = tempAngle + angle;

                        angle = angle * (180/Math.PI);
                        halfAngle = angle/2;
                        console.log("!halfAngle : " + halfAngle);
                        tempAngle = 360 - (angle + angleUntilNow);
                        tempAngle = 90 - (tempAngle + halfAngle);
                        tempAngle = getAngleRadian(tempAngle);

                        a = getSinAngle(tempAngle) * (r/2);
                        b = getCosAngle(tempAngle) * (r/2);

                        centerX = 150 - a;
                        centerY = 150 - b;
                    }
                }
                else if (startX <=150 && startY < 150) {
                    if (j === answerCnt-1) {
                        endX = 10;
                        endY = 150;

                        halfAngle = angle/2;
                        halfAngle = getAngleRadian(halfAngle);
                        a = getCosAngle(halfAngle) * (r/2);
                        b = getSinAngle(halfAngle) * (r/2);

                        centerX = 150 - a;
                        centerY = 150 - b;
                    }
                    else {
                        angle = getAngleRadian(angle);
                        a = getSinAngle(angle) * r;
                        b = getCosAngle(angle) * r;

                        endX = 150 - a;
                        endY = 150 - b;

                        angle = angle * (180/Math.PI);
                        halfAngle = angle/2;
                        halfAngle = getAngleRadian(halfAngle);
                        a = getSinAngle(halfAngle) * (r/2);
                        b = getCosAngle(halfAngle) * (r/2);

                        centerX = 150 - a;
                        centerY = 150 - b;
                    }
                }

                //angle = angle * 180 / Math.PI;
                calcAngle += angle;

                console.log("angle : " + angle);
                console.log("temp1 : " + temp1);
                console.log("temp2 : " + temp2);

                console.log("a : " + a);
                console.log("b : " + b);

                console.log("endX : " + endX);
                console.log("endY : " + endY);

                console.log(part);
                console.log(part[0]);

                console.log(part[0].getAttribute("d").split(' '));
                let dArr = part[0].getAttribute("d").split(' '),
                    dArrString = "";
                console.log(dArr);
                dArr[4] = startX.toString();
                dArr[5] = startY.toString();
                dArr[10] = temp1.toString();
                dArr[11] = temp2.toString();
                dArr[12] = endX.toString();
                dArr[13] = endY.toString();
                console.log(dArr);

                dArrString = dArr.toString().replace(/,/g, " ");
                console.log(dArrString);

                part[0].setAttribute("d", dArrString);
                part[0].id = "partChart";
                part[0].setAttribute("name", data.result[i].answers[j].answerValue + "Path");
                console.log(part[0].getAttribute("d").split(' '));
                part[0].style.display = "block";

                console.log(colors);
                console.log(colors[i]);
                part[0].setAttribute("fill", colors[j]);
                $("#eachResultArea" + (i+1) + " > #base").append(part[0]);
                chart[0].style.display = "block";

                console.log("centerX : " + centerX);
                console.log("centerY : " + centerY);

                centerXArr.push(centerX);
                centerYArr.push(centerY);

                chart = null;
                part = null;

            }

            let optionText = null,
                percentageText = null,
                optionValue = null,
                optionPath = null,
                linePath = null,
                dArr = null,
                dArrString = null,
                percentage = 0;

            totalOptionCnt = 0;
            for (let j=0; j<answerCnt; j++)
                totalOptionCnt += data.result[i].answers[j].answerCnt;
            console.log("totalOptionCnt : " + totalOptionCnt);
            for (let j=0; j<answerCnt; j++) {
                percentage = data.result[i].answers[j].answerCnt/totalOptionCnt;
                percentage = Math.floor(percentage*1000)/10;
                console.log("percentage : " + percentage);

                optionText = $("body > #part .optionText").clone();
                optionValue = data.result[i].answers[j].answerValue;
                optionPath = $("path[name^='" + optionValue + "']")[0];

                optionText[0].textContent = data.result[i].answers[j].answerValue;
                console.log("centerXArr[j] : " +centerXArr[j]);
                console.log("centerYArr[j] : " + centerYArr[j]);
                optionText[0].setAttribute("x", centerXArr[j]);
                optionText[0].setAttribute("y", centerYArr[j]);
                optionText[0].style.display = "block";
                $("#eachResultArea" + (i+1) + " > #base").append(optionText[0]);

                percentageText = $("body > #part .optionText tspan").clone();
                percentageText[0].textContent = "(" + percentage + "%)";
                optionText[0].append(percentageText[0]);

                linePath = $("body > #part .linePath").clone();
                console.log(linePath[0]);
                console.log(linePath[0].getAttribute("d"));

                dArr = linePath[0].getAttribute("d").split(' ');
                dArr[1] = centerXArr[j].toString();
                dArr[2] = centerYArr[j].toString();
                dArrString = dArr.toString().replace(/,/g, " ");
                linePath[0].setAttribute("d", dArrString);
                //linePath[0].style.display = "block";
                $("#eachResultArea" + (i+1) + " > #base").append(linePath[0]);

                optionText = null;
                linePath = null;
            }
            //optionPart[0].style.display = "block";
            //$("#eachResultArea" + (i+1) + " > #base").append(optionPart);
        }
        else if(questionType === "file"){
            answerArea = $("#eachResultArea" + (i+1))[0];

            for (let j=0; j<answerCnt; j++) {
                answerValue = data.result[i].answers[j].answerValue;

                eachAnswer = document.createElement("p");
                eachAnswer.className = "eachAnswer";

                const fileDownloadLink = document.createElement("a");
                fileDownloadLink.href = "#none";
                fileDownloadLink.name = "fileDownload_btn";
                fileDownloadLink.innerText = answerValue;

                eachAnswer.appendChild(fileDownloadLink);
                answerArea.append(eachAnswer);
            }
        }
    }

    $("input[id^='standardBtn']").click(function () {
        $("input[id^='standardBtn']").removeClass();
        console.log($(this)[0]);
        let parentAreaId = $(this)[0].parentNode.id;
        $("#" + parentAreaId + " input[id^='standardBtn']").css("background-color", "aliceblue");
        $(this).css("background-color", "lightpink");
        $(this).addClass("standard");

        $("#base rect.rectPart").remove();
        $("#base .partText").remove();
        //$("#base .linePath").remove();
        $("#base rect#labelBase").each(function() {
            $(this)[0].style.display = "none";
        });
        //$("path").attr("fill", "white");
        //$("#labelBase").fill = "transparent";
        //$("#labelBase").stroke = "transparent";
    });

}

// function fillPartColor (xml, idx) {
//     let xmlDoc = xml.responseXML,
//         x = xmlDoc.getElementsByTagName("colors"),
//         y = x[0].getElementsByTagName("color")[idx].childNodes[0].nodeValue;
//     return y;
// }

function errorCb () {
    console.log("error");
}

function getParam(url) {
    let param = location.search.substr(location.search.indexOf("?") + 1)

    console.log(param);
    return param;
}