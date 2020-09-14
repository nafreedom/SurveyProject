package com.project.vo;

public class SurveyQuestionVO {
    private int surveyNum;
    private int questionNum;
    private String questionType;
    private String questionValue;
    private String extInfo;

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

    public String getQuestionType() { return questionType; }

    public void setQuestionType(String questionType) { this.questionType = questionType; }

    public String getQuestionValue() {
        return questionValue;
    }

    public void setQuestionValue(String questionValue) {
        this.questionValue = questionValue;
    }

    public String getExtInfo() {
        return extInfo;
    }

    public void setExtInfo(String extInfo) {
        this.extInfo = extInfo;
    }
}
