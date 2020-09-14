package com.project.vo;

import java.sql.Timestamp;

public class SurveyVO {
    private String title;
    private String expl;
    private String creatorId;
    private Timestamp madeDate;
    private Timestamp endTime;
    private String url;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExpl() {
        return expl;
    }

    public void setExpl(String expl) {
        this.expl = expl;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public Timestamp getMadeDate() {
        return madeDate;
    }

    public void setMadeDate(Timestamp madeDate) {
        this.madeDate = madeDate;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
