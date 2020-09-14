package com.project.vo;

public class SurveyResultVO {
    private int surveyNum;
    private int questionNum;
    private String answerValue;
    private String ipAddr;

    public int getSurveyNum() {
        return surveyNum;
    }

    public void setSurveyNum(int surveyNum) {
        this.surveyNum = surveyNum;
    }

    public int getQuestionNum() {
        return questionNum;
    }

    public void setQuestionNum(int questionNum) {
        this.questionNum = questionNum;
    }

    public String getAnswerValue() {
        return answerValue;
    }

    public void setAnswerValue(String answerValue) {
        this.answerValue = answerValue;
    }

    public String getIpAddr() {
        return ipAddr;
    }

    public void setIpAddr(String ipAddr) {
        this.ipAddr = ipAddr;
    }
}
