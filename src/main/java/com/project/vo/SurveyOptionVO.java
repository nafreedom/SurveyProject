package com.project.vo;

public class SurveyOptionVO {
    private int questionSeq;
    private int questionNum;
    private int optionNum;
    private String optionValue;

    public int getQuestionSeq() {
        return questionSeq;
    }

    public void setQuestionSeq(int questionSeq) {
        this.questionSeq = questionSeq;
    }

    public int getQuestionNum() {
        return questionNum;
    }

    public void setQuestionNum(int questionNum) {
        this.questionNum = questionNum;
    }

    public int getOptionNum() {
        return optionNum;
    }

    public void setOptionNum(int optionNum) {
        this.optionNum = optionNum;
    }

    public String getOptionValue() {
        return optionValue;
    }

    public void setOptionValue(String optionValue) {
        this.optionValue = optionValue;
    }
}
