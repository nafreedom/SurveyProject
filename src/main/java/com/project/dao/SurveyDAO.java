package com.project.dao;

import com.project.constants.SurveyConstants;
import com.project.controller.survey.SaveEditedSurveyServlet;
import com.project.vo.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import javax.xml.crypto.Data;
import java.io.UnsupportedEncodingException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class SurveyDAO {
    private static SurveyDAO _instance = new SurveyDAO();

    DBConnector dbConnector = new DBConnector();
    Connection conn = null;
    PreparedStatement pstmt = null;

    ResultSet rs = null,
            _rs = null,
            __rs = null;

    String sql = "",
            _sql = "",
            __sql = "";

    public static SurveyDAO getInstance() { return _instance; }

    public int newSurvey (SurveyVO surveyVO) throws Exception {
        int surveyNum = 0;

        try {
            conn = dbConnector.getDBConnection();

            sql = "insert into SURVEY(title, expl, creatorId, madeDate, endTime, url) values (?, ?, ?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, surveyVO.getTitle());
            pstmt.setString(2, surveyVO.getExpl());
            pstmt.setString(3, surveyVO.getCreatorId());
            pstmt.setTimestamp(4, surveyVO.getMadeDate());
            pstmt.setTimestamp(5, surveyVO.getEndTime());
            pstmt.setString(6, surveyVO.getUrl());
            pstmt.executeUpdate();

            sql = "select surveyNum from SURVEY where title=? and creatorId=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, surveyVO.getTitle());
            pstmt.setString(2, surveyVO.getCreatorId());
            rs = pstmt.executeQuery();
            if(rs.next())
                surveyNum = rs.getInt("surveyNum");
            System.out.println("title in surveyDAO : " + surveyVO.getTitle());
            System.out.println("creatorId in surveyDAO : " + surveyVO.getCreatorId());
            System.out.println("surveyNum in surveyDAO : " + rs.getInt("surveyNum"));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return surveyNum;
    }

    public int newSurveyQuestion (SurveyQuestionVO surveyQuestionVO) throws Exception {
        int questionSeq = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "insert into survey_question(surveyNum, questionNum, questionType, questionValue, extInfo) values (?, ?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyQuestionVO.getSurveyNum());
            pstmt.setInt(2, surveyQuestionVO.getQuestionNum());
            pstmt.setString(3, surveyQuestionVO.getQuestionType());
            pstmt.setString(4, surveyQuestionVO.getQuestionValue());
            pstmt.setString(5, surveyQuestionVO.getExtInfo());
            pstmt.executeUpdate();

            sql = "select questionSeq from survey_question where surveyNum=? and questionNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyQuestionVO.getSurveyNum());
            pstmt.setInt(2, surveyQuestionVO.getQuestionNum());
            rs = pstmt.executeQuery();
            if(rs.next())
                questionSeq = rs.getInt("questionSeq");
            System.out.println("questionSeq in surveyDAO : " + rs.getInt("questionSeq"));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return questionSeq;
    }

    public int newSurveyOption (SurveyOptionVO surveyOptionVO) throws Exception {
        int result = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "insert into survey_option(questionSeq, questionNum, optionNum, optionValue) values(?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyOptionVO.getQuestionSeq());
            pstmt.setInt(2, surveyOptionVO.getQuestionNum());
            pstmt.setInt(3, surveyOptionVO.getOptionNum());
            pstmt.setString(4, surveyOptionVO.getOptionValue());
            result = pstmt.executeUpdate();

            System.out.println("result in surveyDAO : " + result);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeUpdate(pstmt, conn);
        }
        return result;
    }

    public int newLabel (LabelVO labelVO) throws Exception {
        int labelSeq = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "insert into LABEL(surveyNum, labelNum, labelName, labelNickname) values (?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, labelVO.getSurveyNum());
            pstmt.setInt(2, labelVO.getLabelNum());
            pstmt.setString(3, labelVO.getLabelName());
            pstmt.setString(4, labelVO.getLabelNickname());
            pstmt.executeUpdate();

            sql = "select labelSeq from LABEL where surveyNum=? AND labelNum=? AND labelName=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, labelVO.getSurveyNum());
            pstmt.setInt(2, labelVO.getLabelNum());
            pstmt.setString(3, labelVO.getLabelName());
            rs = pstmt.executeQuery();
            if(rs.next())
                labelSeq = rs.getInt("labelSeq");

            System.out.println("labelSeq in surveyDAO : " + labelSeq);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeUpdate(pstmt, conn);
        }
        return labelSeq;
    }

    public int newLabelOption (LabelOptionVO labelOptionVO) throws Exception {
        int result = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "insert into label_option(labelSeq, labelOptionNum,labelOptionValue) values(?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, labelOptionVO.getLabelSeq());
            pstmt.setInt(2, labelOptionVO.getLabelOptionNum());
            pstmt.setString(3, labelOptionVO.getLabelOptionValue());
            result = pstmt.executeUpdate();

            System.out.println("result in surveyDAO: " + result);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeUpdate(pstmt, conn);
        }
        return result;
    }

    public int chkDuplicateSurvey (String title, String creatorId) {
        int result = 0;

        System.out.println("title in chkDuplicateSurvey : " + title);
        System.out.println("id in chkDuplicateSurvey : " + creatorId);
        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select surveyNum from SURVEY where title=? and creatorId=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, title);
            pstmt.setString(2, creatorId);
            rs = pstmt.executeQuery();

            System.out.println("sql in surveyDAO : " + sql);
            if(rs.next()) {
                result = 2;
                System.out.println("rs surveyNum : " + rs.getInt("surveyNum"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }

        System.out.println("result in surveyDAO : " + result);
        return result;
    }

    public int getSurveyNum (String userId, String title) {
        int surveyNum = 0;

        System.out.println("**");
        System.out.println(userId);
        System.out.println(title);
        System.out.println("**");

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select surveyNum from survey where creatorId=? and title=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, userId);
            pstmt.setString(2, title);
            rs = pstmt.executeQuery();

            while (rs.next())
                surveyNum = rs.getInt("surveyNum");
            System.out.println("getSurveyNum : " + surveyNum);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }

        return surveyNum;
    }

    public JSONObject getSurveyInfo (int surveyNum) {
        JSONObject jsonObject = new JSONObject(),
                editInfo = null,
                questionInfo = null,
                optionInfo = null;
        JSONArray editArray = new JSONArray(),
                questionArray = new JSONArray(),
                optionArray = null;
        int questionSeq = 0,
                questionCnt = 0,
                optionCnt = 0;
        Timestamp time = null;
        String endTime = "",
                madeDate = "";

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select count(*) as questionCnt from survey_question where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            if(rs.next()) {
                System.out.println(sql);
                System.out.println("questionCnt : " + rs.getInt("questionCnt"));
                questionCnt = rs.getInt("questionCnt");
            }

            editInfo = new JSONObject();

            sql = "select questionSeq, questionNum, questionType, questionValue, extInfo from survey_question where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            while(rs.next()) {
                questionInfo = new JSONObject();
                questionInfo.put("questionValue", rs.getString("questionValue"));
                questionInfo.put("questionNum", rs.getInt("questionNum"));
                questionInfo.put("questionType", rs.getString("questionType"));
                questionInfo.put("extInfo", rs.getString("extInfo"));
                questionSeq = rs.getInt("questionSeq");
                System.out.println("questionSeq : " + questionSeq);

                _sql = "select count(optionNum) as optionCnt from survey_option where questionSeq=?";
                pstmt = conn.prepareStatement(_sql);
                pstmt.setInt(1, questionSeq);
                System.out.println("count(optionNum)의 questionSeq : " + questionSeq);
                _rs = pstmt.executeQuery();

                while(_rs.next()) {
                    questionInfo.put("optionCnt", _rs.getInt("optionCnt"));
                    System.out.println("optionCnt : " + _rs.getInt("optionCnt"));
                }

                __sql = "select optionNum, optionValue from survey_option where questionSeq=?";
                System.out.println("!!!!!!1questionSeq : " + questionSeq);
                pstmt = conn.prepareStatement(__sql);
                pstmt.setInt(1, questionSeq);
                __rs = pstmt.executeQuery();

                optionArray = new JSONArray();
                while(__rs.next()) {
                    optionInfo = new JSONObject();
                    optionInfo.put("optionNum", __rs.getInt("optionNum"));
                    optionInfo.put("optionValue", __rs.getString("optionValue"));
                    System.out.println("------optionNum : " + __rs.getInt("optionNum"));
                    System.out.println("------optionValue : " + __rs.getString("optionValue"));
                    optionArray.add(optionInfo);
                    questionInfo.put("options", optionArray);
                }
                optionArray = null;
                questionArray.add(questionInfo);
            }
            editInfo.put("questions", questionArray);
            editInfo.put("questionCnt", questionCnt);

            sql = "select title, expl, endTime, creatorId, madeDate, url from survey where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            while(rs.next()) {
                editInfo.put("title", rs.getString("title"));
                editInfo.put("expl", rs.getString("expl"));
                time = rs.getTimestamp("endTime");
                endTime = time.toString();
                endTime = endTime.replace(" ", "T").concat("00");
                System.out.println("********** time : " + time);
                System.out.println("********** endTime : " + endTime);
                editInfo.put("endTime", endTime.toString());
                time = rs.getTimestamp("madeDate");
                madeDate = time.toString();
                madeDate = madeDate.replace(" ", "T").concat("00");
                editInfo.put("madeDate", madeDate.toString());
                editInfo.put("creatorId", rs.getString("creatorId"));
                editInfo.put("url", rs.getString("url"));
            }

            sql = "select emailCollect, emailOpen from survey_setting where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            while (rs.next()){
                editInfo.put("emailCollect", rs.getInt("emailCollect"));
                editInfo.put("emailOpen", rs.getInt("emailOpen"));
            }

            editArray.add(editInfo);
            jsonObject.put("survey", editArray);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
            dbConnector.closeQuery(_rs, pstmt, conn);
            dbConnector.closeQuery(__rs, pstmt, conn);
        }
        return jsonObject;
    }

    public int deleteOriginalData(int surveyNum) throws Exception {
        int isDeleted = 0,
                labelSeq = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "delete from survey where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            isDeleted = pstmt.executeUpdate();
            System.out.println(isDeleted);
            System.out.println("surveyNum:" + surveyNum);

            sql = "delete from survey_setting where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            isDeleted = pstmt.executeUpdate();
            System.out.println(isDeleted);
            System.out.println("surveyNum:" + surveyNum);

            sql = "delete from survey_option where questionSeq in (select questionSeq from survey_question where surveyNum=?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            isDeleted = pstmt.executeUpdate();
            System.out.println(isDeleted);

            sql = "delete from survey_question where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            isDeleted = pstmt.executeUpdate();
            System.out.println(isDeleted);
            System.out.println("surveyNum:" + surveyNum);

            sql = "select labelSeq from label where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                labelSeq = rs.getInt("labelSeq");

                sql = "delete from label where surveyNum=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, surveyNum);
                isDeleted = pstmt.executeUpdate();
                System.out.println(isDeleted);

                sql = "delete from label_option where labelSeq=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, labelSeq);
                isDeleted = pstmt.executeUpdate();
                System.out.println("isDeleted");
            }

            System.out.println("surveyNum in surveyDAO : " + surveyNum);
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return isDeleted;
    }

    public JSONObject surveyList (String loginId) throws Exception {
        JSONObject jsonObject = new JSONObject(),
                surveyInfo = null;
        JSONArray surveyArray = new JSONArray();
        int updateResult = 0,
                surveyNum = 0,
                responseCnt = 0;

        System.out.println("loginId : " + loginId);

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select title, madeDate, endTime, surveyNum from survey where creatorId=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, loginId);
            rs = pstmt.executeQuery();

            /*if (!rs.next()) {
                System.out.println("생성한 설문조사가 존재하지 않습니다");
            }*/

            while (rs.next()) {
                System.out.println(rs.getString("title"));
                System.out.println(rs.getTimestamp("madeDate"));
                System.out.println(rs.getTimestamp("endTime"));

                Timestamp madeDate = rs.getTimestamp("madeDate"),
                        endTime = rs.getTimestamp("endTime"),
                        currentTime = new Timestamp(System.currentTimeMillis());

                __sql = "select surveyNum from survey where creatorId=? AND title=?";
                pstmt = conn.prepareStatement(__sql);
                pstmt.setString(1, loginId);
                pstmt.setString(2, rs.getString("title"));
                __rs = pstmt.executeQuery();

                while (__rs.next()) {
                    surveyNum = __rs.getInt("surveyNum");

                    _sql = "select count(*) as responseCnt from (select count(*) from survey_result where surveyNum=? group by resultSeq) as cnt";
                    pstmt = conn.prepareStatement(_sql);
                    pstmt.setInt(1, surveyNum);
                    _rs = pstmt.executeQuery();
                    while(_rs.next())
                        responseCnt = _rs.getInt("responseCnt");
                    System.out.println("responseCnt : " + responseCnt);

                    surveyInfo = new JSONObject();
                    surveyInfo.put("title", rs.getString("title"));
                    surveyInfo.put("endTime", rs.getTimestamp("endTime").toString());
                    surveyInfo.put("surveyNum", rs.getInt("surveyNum"));
                    surveyInfo.put("responseCnt", responseCnt);
                    surveyArray.add(surveyInfo);

                    jsonObject.put("survey", surveyArray);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
            dbConnector.closeQuery(_rs, pstmt, conn);
            dbConnector.closeQuery(__rs, pstmt, conn);
        }
        return jsonObject;
    }

    public String getSurveyUrl (String targetCreatorId, String targetTitle) throws Exception {
        String url = "";
        System.out.println("inside the getSurveyUrl");

        System.out.println(targetCreatorId);
        System.out.println(targetTitle);

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select url from survey where creatorId=? AND title=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, targetCreatorId);
            pstmt.setString(2, targetTitle);
            rs = pstmt.executeQuery();

            System.out.println(sql);

            while (rs.next()) {
                url = rs.getString("url");
                System.out.println("url : " + url);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return url;
    }

    public JSONObject setResponseForm (String creatorId, String title) throws Exception {
        JSONObject jsonObject = null;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select surveyNum from survey where creatorId=? AND title=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, creatorId);
            pstmt.setString(2, title);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                jsonObject = getSurveyInfo(rs.getInt("surveyNum"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return jsonObject;
    }

    public int getResultSeq () throws Exception {
        int resultSeq = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select resultSeq from survey_result order by resultSeq desc limit 1";
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            if (rs.next())
                resultSeq = rs.getInt("resultSeq");
            System.out.println("resultSeq : " + resultSeq);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return resultSeq;
    }

    public int saveResponse (int resultSeq, int surveyNum, int questionNum, String answerValue, String filePath, String ipAddr, String email) throws Exception {
        int result = 0;

        System.out.println("inside saveResponse in SurveyDAO");
        System.out.println(surveyNum);
        System.out.println(questionNum);
        System.out.println(answerValue);

        System.out.println("*****surveyNum : " + surveyNum);

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "insert into survey_result(resultSeq, surveyNum, questionNum, answerValue, filePath, ipAddr, email) values(?,?,?,?,?,?,?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, (resultSeq + 1));
            pstmt.setInt(2, surveyNum);
            pstmt.setInt(3, questionNum);
            pstmt.setString(4, answerValue);
            pstmt.setString(5, filePath);
            pstmt.setString(6, ipAddr);
            pstmt.setString(7, email);
            result = pstmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeUpdate(pstmt, conn);
        }

        return result;
    }

    public int deleteSurveyResponseData (int surveyNum) throws Exception {
        int result = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "delete from survey_result where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            result = pstmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeUpdate(pstmt, conn);
        }

        return result;
    }

    public int deleteLabelResponseData (int surveyNum) throws Exception {
        int result = 0,
                resultSeq = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select resultSeq from survey_result where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                resultSeq = rs.getInt("resultSeq");

                sql = "delete from label_result where resultSeq=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, resultSeq);
                result = pstmt.executeUpdate();

                System.out.println("delete labelResult result : " + result);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return result;
    }

    // survey ?번의 label 전체 갯수
    public int getLabelCnt(int surveyNum) throws Exception {
        int labelCnt = 0;
        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select count(*) as labelCnt from label where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            if (rs.next())
                labelCnt = rs.getInt("labelCnt");
            System.out.println("=====");
            System.out.println("labelCnt : " + labelCnt);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return labelCnt;
    }

    // survey ?번의 각 라벨 ?번에 대한 응답 갯수
    public int getEachLabelResponseCnt(int surveyNum, int labelNum) throws Exception {
        int eachLabelResponseCnt = 0;
        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select count(*) as eachLabelResponseCnt from label_result "
                    + "where resultSeq in ("
                    + "select resultSeq from survey_result where surveyNum=?"
                    + ") AND labelNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            pstmt.setInt(2, labelNum);
            rs = pstmt.executeQuery();

            if (rs.next())
                eachLabelResponseCnt = rs.getInt("eachLabelResponseCnt");
            System.out.println("=====");
            System.out.println("eachLabelResponseCnt : " + eachLabelResponseCnt);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return eachLabelResponseCnt;
    }

    // survey ?번의 각 라벨 ?번 선택지 번호 ?번에 대한 응답 갯수
    public int getEachLabelOptionResponseCnt(int surveyNum, int labelNum, int labelOptionNum) throws Exception {
        int eachLabelOptionResponseCnt = 0;
        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select count(*) as eachLabelOptionResponseCnt from label_result "
                    + "where resultSeq in ("
                    + "select resultSeq from survey_result where surveyNum=?"
                    + ") AND labelNum=? AND labelOptionNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            pstmt.setInt(2, labelNum);
            pstmt.setInt(3, labelOptionNum);
            rs = pstmt.executeQuery();

            if (rs.next())
                eachLabelOptionResponseCnt = rs.getInt("eachLabelOptionResponseCnt");
            System.out.println("=====");
            System.out.println("eachLabelOptionResponseCnt : " + eachLabelOptionResponseCnt);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return eachLabelOptionResponseCnt;
    }

    public int getLabelSeq(int surveyNum, int labelNum) throws Exception {
        int labelSeq = 0;
        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select labelSeq from label where surveyNum=? AND labelNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            pstmt.setInt(2, labelNum);
            rs = pstmt.executeQuery();

            if (rs.next())
                labelSeq = rs.getInt("labelSeq");
            System.out.println("labelSeq : " + labelSeq);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return labelSeq;
    }

    public String getLabelName (int labelSeq) throws Exception {
        String labelName = "";
        try{
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select labelName from label where labelSeq=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, labelSeq);
            rs = pstmt.executeQuery();

            if (rs.next())
                labelName = rs.getString("labelName");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return labelName;
    }

    public String getLabelNickname (int labelSeq) throws Exception {
        String labelNickname = "";
        try{
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select labelNickname from label where labelSeq=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, labelSeq);
            rs = pstmt.executeQuery();

            if (rs.next())
                labelNickname = rs.getString("labelNickname");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return labelNickname;
    }

    // 라벨의 선택지 갯수
    public int getLabelOptionCnt(int labelSeq) throws Exception {
        int labelOptionCnt = 0;
        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select count(*) as labelOptionCnt from label_option where labelSeq=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, labelSeq);
            rs = pstmt.executeQuery();

            if (rs.next())
                labelOptionCnt = rs.getInt("labelOptionCnt");
            System.out.println("=====");
            System.out.println("labelOptionCnt : " + labelOptionCnt);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return labelOptionCnt;
    }

    // 라벨 선택지 각각 value 추출
    public String getLabelOptionValue(int labelSeq, int labelOptionNum) throws Exception {
        String labelOptionValue = "";
        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select labelOptionValue from label_option JOIN label "
                    + "where label.labelSeq=label_option.labelSeq "
                    + "AND label.labelSeq=? "
                    + "AND labelOptionNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, labelSeq);
            pstmt.setInt(2, labelOptionNum);
            rs = pstmt.executeQuery();

            if (rs.next())
                labelOptionValue = rs.getString("labelOptionValue");
            System.out.println("=====");
            System.out.println("labelOptionValue : " + labelOptionValue);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return labelOptionValue;
    }

    public int getResponseCnt (int surveyNum) throws Exception {
        int surveyResponseCnt = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select count(*) as responseCnt from (select count(*) from survey_result where surveyNum=? group by resultSeq) as cnt";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();
            while (rs.next())
                surveyResponseCnt = rs.getInt("responseCnt");
            System.out.println("surveyResponseCnt : " + surveyResponseCnt);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs,pstmt, conn);
        }
        return surveyResponseCnt;
    }

    public String getEndTime (int surveyNum) throws Exception {
        Timestamp time = null;
        String endTime = "";

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select endTime from survey where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                time = rs.getTimestamp("endTime");
                endTime = time.toString();
                endTime = endTime.replace(" ", "T").concat("00");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);;
        }
        return endTime;
    }

    public String getMadeDate (int surveyNum) throws Exception {
        Timestamp time = null;
        String madeDate = "";

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select madeDate from survey where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                time = rs.getTimestamp("madeDate");
                madeDate = time.toString();
                madeDate = madeDate.replace(" ", "T").concat("00");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);;
        }
        return madeDate;
    }

    public JSONObject getResultInfo (int surveyNum) throws Exception {
        JSONObject jsonObject = new JSONObject(),
                resultObject = null,
                optionObject = null;
        JSONArray resultArray = new JSONArray(),
                optionArray = new JSONArray();


        int questionNum = 0,
                questionCnt = 0,
                optionCnt = 0;
        String questionType = "",
                questionValue = "",
                answerValue = "";

        //
        JSONObject labelObject = null,
                labelOptionObject = null;

        JSONArray labelArray = new JSONArray(),
                labelOptionArray = new JSONArray();

        int labelTotalCnt = 0,
                labelOptionCnt = 0,
                labelSeq = 0,
                labelResponseCnt = 0,
                labelOptionResponseCnt = 0;
        String labelName = "",
                labelNickname = "",
                labelOptionValue = "";

        labelTotalCnt = getLabelCnt(surveyNum);
        System.out.println("labelTotalCnt : " + labelTotalCnt);
        //

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select count(*) as questionCnt from survey_question where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            if (rs.next())
                questionCnt = rs.getInt("questionCnt");

            for (int i=1; i<=questionCnt; i++) {
                sql = "select questionType, questionValue from survey_question where surveyNum=? AND questionNum=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, surveyNum);
                pstmt.setInt(2, i);
                rs = pstmt.executeQuery();

                if (rs.next()) {
                    questionType = rs.getString("questionType");
                    questionValue = rs.getString("questionValue");
                }

                resultObject = new JSONObject();
                optionArray = new JSONArray();
                if (questionType.equals("text") || questionType.equals("date") || questionType.equals("time")) {
                    System.out.println("**** inside text");
                    sql = "select answerValue from survey_result where surveyNum=? AND questionNum=?";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1, surveyNum);
                    pstmt.setInt(2, i);
                    _rs= pstmt.executeQuery();

                    while (_rs.next()) {
                        optionObject = new JSONObject();
                        optionObject.put("answerValue", _rs.getString("answerValue"));
                        optionArray.add(optionObject);
                        resultObject.put("answers", optionArray);
                    }
                }
                else if(questionType.equals("file")){
                    sql = "select answerValue, filePath from survey_result where surveyNum=? AND questionNum=?";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1, surveyNum);
                    pstmt.setInt(2, i);
                    _rs= pstmt.executeQuery();

                    while (_rs.next()) {
                        optionObject = new JSONObject();
                        optionObject.put("answerValue", _rs.getString("answerValue"));
                        optionObject.put("filePath", _rs.getString("filePath"));
                        optionArray.add(optionObject);
                        resultObject.put("answers", optionArray);
                    }
                }
                else {
                    System.out.println("**** inside radio or checkbox");
                    System.out.println("i : " + i);
                    sql = "select answerValue, count(*) as answerCnt from survey_result where surveyNum=? AND questionNum=? group by answerValue";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1, surveyNum);
                    pstmt.setInt(2, i);
                    _rs = pstmt.executeQuery();

                    while (_rs.next()) {
                        optionObject = new JSONObject();
                        optionObject.put("answerValue", _rs.getString("answerValue"));
                        optionObject.put("answerCnt", _rs.getInt("answerCnt"));
                        optionArray.add(optionObject);
                        resultObject.put("answers", optionArray);
                    }
                }
                System.out.println(optionArray);
                optionArray = null;
                resultObject.put("questionType", questionType);
                resultObject.put("questionValue", questionValue);
                resultArray.add(resultObject);
            }
            jsonObject.put("result", resultArray);


            //
            JSONObject questionObject = null;
            JSONArray questionArray = new JSONArray();
            ArrayList answerValueArr = new ArrayList();

            int questionSeq = 0,
                    labelCnt = 0;
            String optionValue = "";
            //

            System.out.println(questionCnt);
            System.out.println("==> labelTotalCnt : " + labelTotalCnt);
            System.out.println("questionCnt : " + questionCnt);
            //labelResult

            questionArray = new JSONArray();
            for (int i=1; i<=questionCnt; i++) {
                questionObject = new JSONObject();
                System.out.println("<<" + i + ">>");    //questionNum 1 ~ questionCnt

                sql = "select questionSeq from survey_question where surveyNum=? AND questionNum=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, surveyNum);
                pstmt.setInt(2, i);
                rs = pstmt.executeQuery();

                if (rs.next())
                    questionSeq = rs.getInt("questionSeq");
                System.out.println("questionSeq : " + questionSeq);

                sql = "select count(optionNum) as optionCnt from survey_option where questionSeq=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, questionSeq);
                System.out.println("count(optionNum)의 questionSeq : " + questionSeq);
                rs = pstmt.executeQuery();

                if (rs.next())
                    optionCnt = rs.getInt("optionCnt");
                System.out.println("optionCnt : " + optionCnt);

                optionArray = new JSONArray();
                for (int j=1; j<=optionCnt; j++) {
                    optionObject = new JSONObject();
                    System.out.println("<<<" + j + ">>>");

                    sql = "select optionValue from survey_option where questionSeq in (select questionSeq from survey_question where surveyNum=?) AND questionNum=? AND optionNum=?";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1, surveyNum);
                    pstmt.setInt(2, i);
                    pstmt.setInt(3, j);
                    rs = pstmt.executeQuery();

                    if (rs.next())
                        optionValue = rs.getString("optionValue");
                    System.out.println("optionValue : " + optionValue);

                    sql = "select count(*) as labelCnt from label where surveyNum=?";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1, surveyNum);
                    rs = pstmt.executeQuery();

                    if (rs.next())
                        labelCnt = rs.getInt("labelCnt");
                    System.out.println("labelCnt : " + labelCnt);

                    labelArray = new JSONArray();
                    for (int l = 1; l <= labelCnt; l++) {
                        labelObject = new JSONObject();
                        System.out.println("<<<<" + l + ">>>>");

                        sql = "select labelSeq, labelName from label where surveyNum=? AND labelNum=?";
                        pstmt = conn.prepareStatement(sql);
                        pstmt.setInt(1, surveyNum);
                        pstmt.setInt(2, l);
                        rs = pstmt.executeQuery();

                        if (rs.next()) {
                            labelSeq = rs.getInt("labelSeq");
                            labelName = rs.getString("labelName");
                        }
                        System.out.println("labelSeq : " + labelSeq);
                        System.out.println("labelName : " + labelName);

                        sql = "select count(*) as labelOptionCnt from label_option where labelSeq=?";
                        pstmt = conn.prepareStatement(sql);
                        pstmt.setInt(1, labelSeq);
                        rs = pstmt.executeQuery();

                        if (rs.next())
                            labelOptionCnt = rs.getInt("labelOptionCnt");
                        System.out.println("labelOptionCnt : " + labelOptionCnt);

                        labelOptionArray = new JSONArray();
                        for (int k = 1; k <= labelOptionCnt; k++) {
                            labelOptionObject = new JSONObject();
                            System.out.println("<<<<<" + k + ">>>>>");

                            sql = "select labelOptionValue from label_option where labelSeq=? AND labelOptionNum=?";
                            pstmt = conn.prepareStatement(sql);
                            pstmt.setInt(1, labelSeq);
                            pstmt.setInt(2, k);
                            rs = pstmt.executeQuery();

                            if (rs.next())
                                labelOptionValue = rs.getString("labelOptionValue");
                            System.out.println("labelOptionValue : " + labelOptionValue);

                            sql = "select answerValue from survey_result where surveyNum=? AND questionNum=? group by answerValue";
                            pstmt = conn.prepareStatement(sql);
                            pstmt.setInt(1, surveyNum);
                            pstmt.setInt(2, i);
                            rs = pstmt.executeQuery();

                            while (rs.next()) {
                                answerValue = rs.getString("answerValue");
                                System.out.println("answerValue : " + answerValue);

                                sql = "select count(*) as labelOptionResponseCnt from label_result where resultSeq in (select resultSeq from survey_result where surveyNum=? AND questionNum=? AND answerValue=? group by resultSeq) AND labelNum=? AND labelOptionNum=?";
                                pstmt = conn.prepareStatement(sql);
                                pstmt.setInt(1, surveyNum);
                                pstmt.setInt(2, i);
                                pstmt.setString(3, answerValue);
                                pstmt.setInt(4, l);
                                pstmt.setInt(5, k);
                                _rs = pstmt.executeQuery();
                                System.out.println("pstmt : " + pstmt);

                                if (_rs.next()) {
                                    if (answerValue.equals(optionValue)) {
                                        labelOptionResponseCnt = _rs.getInt("labelOptionResponseCnt");
                                        System.out.println("labelOptionResponseCnt : " + labelOptionResponseCnt);

                                        labelOptionObject.put("labelOptionResponseCnt", labelOptionResponseCnt);
                                        labelOptionObject.put("answerValue", answerValue);
                                        labelOptionObject.put("labelOptionValue", labelOptionValue);
                                        labelOptionArray.add(labelOptionObject);
                                        labelObject.put("labelOptions", labelOptionArray);
                                    }
                                }
                            }
                        }
                        labelObject.put("labelSeq", labelSeq);
                        labelObject.put("labelName", labelName);
                        labelArray.add(labelObject);
                        optionObject.put("labels", labelArray);
                    }
                    optionObject.put("labelCnt", labelCnt);
                    //optionObject.put("optionNum", j);
                    optionObject.put("optionValue", optionValue);
                    optionArray.add(optionObject);
                    questionObject.put("options", optionArray);
                }

                questionObject.put("optionCnt", optionCnt);
                questionArray.add(questionObject);
            }
            jsonObject.put("labelResult", questionArray);

            //labelInfo
            System.out.println("labelTotalCnt : " + labelTotalCnt);
            labelArray = new JSONArray();
            for (int i=1; i<=labelTotalCnt; i++) {
                System.out.println("i : " + i);
                labelObject = new JSONObject();

                labelResponseCnt = getEachLabelResponseCnt(surveyNum, i);
                System.out.println("labelResponseCnt : " + labelResponseCnt);
                labelObject.put("labelResponseCnt", labelResponseCnt);

                labelSeq = getLabelSeq(surveyNum, i);
                System.out.println("labelSeq : " + labelSeq);
                labelObject.put("labelSeq", labelSeq);

                labelName = getLabelName(labelSeq);
                System.out.println("labelName : " + labelName);
                labelObject.put("labelName", labelName);

                labelNickname = getLabelNickname(labelSeq);
                System.out.println("labelNickname : " + labelNickname);
                labelObject.put("labelNickname", labelNickname);

                labelOptionCnt = getLabelOptionCnt(labelSeq);
                System.out.println("labelOptionCnt : " + labelOptionCnt);
                labelObject.put("labelOptionCnt", labelOptionCnt);

                labelOptionArray = new JSONArray();
                for (int j=1; j<=labelOptionCnt; j++) {
                    System.out.println("j : " + j);
                    labelOptionObject = new JSONObject();

                    System.out.println("[[" + j + "]]");
                    labelOptionResponseCnt = getEachLabelOptionResponseCnt(surveyNum, i, j);
                    System.out.println("labelOptionResponseCnt : " + labelOptionResponseCnt);
                    labelOptionObject.put("labelOptionResponseCnt", labelOptionResponseCnt);

                    labelOptionValue = getLabelOptionValue(labelSeq, j);
                    System.out.println("labelOptionValue : " + labelOptionValue);
                    labelOptionObject.put("labelOptionValue", labelOptionValue);

                    labelOptionArray.add(labelOptionObject);
                }
                labelObject.put("labels", labelOptionArray);
                labelArray.add(labelObject);
            }
            jsonObject.put("labelInfo", labelArray);

            //surveyResponseCnt
            int surveyResponseCnt = getResponseCnt(surveyNum);
            String endTime = getEndTime(surveyNum),
                    madeDate = getMadeDate(surveyNum);
            jsonObject.put("surveyResponseCnt", surveyResponseCnt);
            jsonObject.put("endTime", endTime);
            jsonObject.put("madeDate", madeDate);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return jsonObject;
    }

    public JSONObject getLabelInfo (int surveyNum) throws Exception {
        JSONObject jsonObject = new JSONObject(),
                labelObject = null,
                labelOptionObject = null;
        JSONArray labelArray = new JSONArray(),
                labelOptionArray = new JSONArray();

        int labelCnt = 0,
                labelSeq = 0,
                labelOptionCnt = 0;

        String labelName = "",
                labelNickname = "",
                labelOptionValue = "";

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select count(*) as labelCnt from label where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            if (rs.next())
                labelCnt = rs.getInt("labelCnt");
            System.out.println("labelCnt : " + labelCnt);

            labelArray = new JSONArray();
            for (int i=1; i<=labelCnt; i++) {
                labelObject = new JSONObject();

                sql = "select labelSeq, labelName, labelNickname from label where surveyNum=? AND labelNum=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, surveyNum);
                pstmt.setInt(2, i);
                rs = pstmt.executeQuery();

                if (rs.next()) {
                    labelSeq = rs.getInt("labelSeq");
                    labelName = rs.getString("labelName");
                    labelNickname = rs.getString("labelNickname");
                }
                System.out.println("labelSeq : " + labelSeq);
                System.out.println("labelName : " + labelName);
                System.out.println("labelNickname : " + labelNickname);

                sql = "select count(*) as labelOptionCnt from label_option where labelSeq=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, labelSeq);
                rs = pstmt.executeQuery();

                if (rs.next())
                    labelOptionCnt = rs.getInt("labelOptionCnt");
                System.out.println("labelOptionCnt : " + labelOptionCnt);

                labelObject.put("labelOptionCnt", labelOptionCnt);
                labelObject.put("labelSeq", labelSeq);
                labelObject.put("labelName", labelName);
                labelObject.put("labelNickname", labelNickname);

                labelOptionArray = new JSONArray();
                for (int j=1; j<=labelOptionCnt; j++) {
                    labelOptionObject = new JSONObject();

                    sql = "select labelOptionValue from label_option where labelSeq=? AND labelOptionNum=?";
                    pstmt = conn.prepareStatement(sql);
                    pstmt.setInt(1, labelSeq);
                    pstmt.setInt(2, j);
                    rs = pstmt.executeQuery();

                    if (rs.next())
                        labelOptionValue = rs.getString("labelOptionValue");
                    System.out.println("labelOptionValue : " + labelOptionValue);

                    labelOptionObject.put("labelOptionValue", labelOptionValue);
                    labelOptionArray.add(labelOptionObject);
                }
                labelObject.put("options", labelOptionArray);
                labelArray.add(labelObject);
            }
            jsonObject.put("labelInfo", labelArray);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }

        return jsonObject;
    }

    public int saveResponseLabel(int resultSeq, int labelNum, int labelOptionNum) throws Exception {
        int result = 0;

        System.out.println("inside saveResponseLabel in surveyDAO");
        System.out.println(resultSeq);
        System.out.println(labelNum);
        System.out.println(labelOptionNum);

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql= "insert into label_result(resultSeq, labelNum, labelOptionNum) values(?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, resultSeq);;
            pstmt.setInt(2, labelNum);
            pstmt.setInt(3, labelOptionNum);
            result = pstmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeUpdate(pstmt, conn);
        }
        return result;
    }

    public JSONObject getSurveyFormList () {
        JSONObject returnJsonObj = new JSONObject();

        try{
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "SELECT surveyFormNum, title, expl, type FROM survey_form";
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();

            JSONArray surveyFormArr = new JSONArray();
            while(rs.next()){
                JSONObject formObj = new JSONObject();
                formObj.put("surveyFormNum", rs.getInt("surveyFormNum"));
                formObj.put("title", rs.getString("title"));
                formObj.put("expl", rs.getString("expl"));
                formObj.put("type", rs.getString("type"));
                surveyFormArr.add(formObj);
            }

            returnJsonObj.put("returnObj",surveyFormArr);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }

        return returnJsonObj;
    }

    public JSONObject getSurveyFormInfo (int surveyNum) {
        JSONObject jsonObject = new JSONObject(),
                editInfo = null,
                questionInfo = null,
                optionInfo = null;
        JSONArray editArray = new JSONArray(),
                questionArray = new JSONArray(),
                optionArray = null;
        int questionSeq = 0,
                questionCnt = 0,
                optionCnt = 0;
        Timestamp time = null;
        String endTime = "",
                madeDate = "";

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select count(*) as questionCnt from survey_form_question where surveyFormNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            if(rs.next()) {
                questionCnt = rs.getInt("questionCnt");
            }

            editInfo = new JSONObject();

            sql = "select questionSeq, questionNum, questionType, questionValue, extInfo from survey_form_question where surveyFormNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            while(rs.next()) {
                questionInfo = new JSONObject();
                questionInfo.put("questionValue", rs.getString("questionValue"));
                questionInfo.put("questionNum", rs.getInt("questionNum"));
                questionInfo.put("questionType", rs.getString("questionType"));
                questionInfo.put("extInfo", rs.getString("extInfo"));
                questionSeq = rs.getInt("questionSeq");

                _sql = "select count(optionNum) as optionCnt from survey_form_option where questionSeq=?";
                pstmt = conn.prepareStatement(_sql);
                pstmt.setInt(1, questionSeq);
                System.out.println("count(optionNum)의 questionSeq : " + questionSeq);
                _rs = pstmt.executeQuery();

                while(_rs.next()) {
                    questionInfo.put("optionCnt", _rs.getInt("optionCnt"));
                }

                __sql = "select optionNum, optionValue from survey_form_option where questionSeq=?";
                pstmt = conn.prepareStatement(__sql);
                pstmt.setInt(1, questionSeq);
                __rs = pstmt.executeQuery();

                optionArray = new JSONArray();
                while(__rs.next()) {
                    optionInfo = new JSONObject();
                    optionInfo.put("optionNum", __rs.getInt("optionNum"));
                    optionInfo.put("optionValue", __rs.getString("optionValue"));
                    optionArray.add(optionInfo);
                    questionInfo.put("options", optionArray);
                }
                optionArray = null;
                questionArray.add(questionInfo);
            }
            editInfo.put("questions", questionArray);
            editInfo.put("questionCnt", questionCnt);

            sql = "select title, expl, type from survey_form where surveyFormNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            while(rs.next()) {
                editInfo.put("title", rs.getString("title"));
                editInfo.put("expl", rs.getString("expl"));
                editInfo.put("type", rs.getString("type"));
            }

            editArray.add(editInfo);
            jsonObject.put("survey", editArray);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
            dbConnector.closeQuery(_rs, pstmt, conn);
            dbConnector.closeQuery(__rs, pstmt, conn);
        }
        return jsonObject;
    }

    public int newSurveySetting (SurveySettingVO vo) throws Exception {
        int result = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "insert into survey_setting (surveyNum, emailCollect, emailOpen) values (?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, vo.getSurveyNum());
            pstmt.setInt(2, vo.getEmailCollect());
            pstmt.setInt(3, vo.getEmailOpen());
            result = pstmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return result;
    }

    public JSONObject getEmailCollectOpenYN(String creatorId, String title) throws Exception {
        JSONObject returnJsonObj = new JSONObject();
        returnJsonObj.put("creatorId", creatorId);
        returnJsonObj.put("title", title);

        int surveyNum = 0;
        int emailCollectYN = SurveyConstants.YN_N;
        int emailOpenYN = SurveyConstants.YN_N;

        try{
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "select surveyNum from survey where creatorId=? AND title=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, creatorId);
            pstmt.setString(2, title);
            rs = pstmt.executeQuery();

            if(rs.next()){
                surveyNum = rs.getInt("surveyNum");

                _sql = "select emailCollect, emailOpen from survey_setting where surveyNum=?";
                pstmt = conn.prepareStatement(_sql);
                pstmt.setInt(1, surveyNum);
                _rs = pstmt.executeQuery();

                if(_rs.next()){
                    emailCollectYN = _rs.getInt("emailCollect");
                    emailOpenYN = _rs.getInt("emailOpen");

                    returnJsonObj.put("emailCollect", emailCollectYN);
                    returnJsonObj.put("emailOpen", emailOpenYN);
                    returnJsonObj.put("surveyNum", surveyNum);
                }
            }

        }catch (Exception e){
            e.printStackTrace();
        }finally {
            dbConnector.closeQuery(rs, pstmt, conn);
            dbConnector.closeQuery(_rs, pstmt, conn);
        }

        return returnJsonObj;
    }

    public int saveEmailCollectPassword(SurveySettingEmailVO vo) throws Exception{
        int result = 0;

        try{
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "INSERT INTO survey_setting_send_email (surveyNum, email, password) VALUES(?,?,?)" +
                    "ON DUPLICATE KEY UPDATE password = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, vo.getSurveyNum());
            pstmt.setString(2, vo.getEmail());
            pstmt.setString(3, vo.getPassword());
            pstmt.setString(4, vo.getPassword());
            result = pstmt.executeUpdate();

        }catch (Exception e){
            e.printStackTrace();
        }finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }

        return result;
    }

    public JSONObject certPassword(SurveySettingEmailVO vo){
        JSONObject returnJsonObj = new JSONObject();
        boolean result = false;

        try{
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            sql = "SELECT count(surveyNum) as count FROM survey_setting_send_email where surveyNum = ? and email = ? and password = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, vo.getSurveyNum());
            pstmt.setString(2, vo.getEmail());
            pstmt.setString(3, vo.getPassword());
            rs = pstmt.executeQuery();

            while(rs.next()){
                int count = rs.getInt("count");
                if(count > 0){
                    result = true;
                }
            }

            returnJsonObj.put("result", result);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }

        return returnJsonObj;
    }

    public JSONObject getEachResultInfo(int surveyNum){
        JSONObject returnJsonObj = new JSONObject();

        JSONArray resultEmailArr = new JSONArray();
        JSONObject resultObj = new JSONObject();

        try{
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.getDBConnection();

            //1. get emailOpenYn
            int emailOpenYN = SurveyConstants.YN_N;
            sql = "SELECT emailOpen FROM survey_setting where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();
            if(rs.next()){
                emailOpenYN = rs.getInt("emailOpen");
            }

            //2. get answerList
            sql = "SELECT email, resultSeq FROM survey_result WHERE surveyNum=? GROUP BY resultSeq ORDER BY resultSeq";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();
            while (rs.next()){
                JSONObject emailJsonObj = new JSONObject();
                if(emailOpenYN == SurveyConstants.YN_Y){
                    emailJsonObj.put("email", rs.getString("email"));
                }
                emailJsonObj.put("resultSeq", rs.getString("resultSeq"));
                resultEmailArr.add(emailJsonObj);
            }
            returnJsonObj.put("resultEmailList", resultEmailArr);



            //3. get questionList
            Map<Integer, Object> questionMap = new HashMap<Integer, Object>();
            int questionCnt = 0;
            sql = "select count(*) as questionCnt from survey_question where surveyNum=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            if (rs.next())
                questionCnt = rs.getInt("questionCnt");

            for (int i=1; i<=questionCnt; i++) {
                sql = "select questionType, questionValue, questionNum from survey_question where surveyNum=? AND questionNum=?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, surveyNum);
                pstmt.setInt(2, i);
                rs = pstmt.executeQuery();

                if (rs.next()) {
                    JSONObject questionObj = new JSONObject();
                    questionObj.put("questionType",rs.getString("questionType"));
                    questionObj.put("questionValue",rs.getString("questionValue"));

                    questionMap.put(rs.getInt("questionNum"), questionObj);
                }
            }


            //3. get resultList & MATCH with question
            sql = "select resultSeq from survey_result where surveyNum=? GROUP BY resultSeq ORDER BY resultSeq";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            rs = pstmt.executeQuery();

            while (rs.next()){
                int resultSeq = rs.getInt("resultSeq");

                JSONArray questionAnswerArr =  new JSONArray();
                for(int i=1; i<=questionCnt; i++){
                    _sql = "SELECT answerValue FROM survey_result WHERE surveyNum = ? AND resultSeq = ? AND questionNum = ?";
                    pstmt = conn.prepareStatement(_sql);
                    pstmt.setInt(1, surveyNum);
                    pstmt.setInt(2, resultSeq);
                    pstmt.setInt(3, i);
                    _rs = pstmt.executeQuery();

                    JSONArray answerArr = new JSONArray();
                    while (_rs.next()){
                        JSONObject answerObj = new JSONObject();
                        answerObj.put("answerValue", _rs.getString("answerValue"));
                        answerArr.add(answerObj);
                    }

                    JSONObject questionObj = (JSONObject) questionMap.get(i);

                    JSONObject questionAnswerObj = new JSONObject();
                    questionAnswerObj.put("questionValue", questionObj.get("questionValue"));
                    questionAnswerObj.put("questionType", questionObj.get("questionType"));
                    questionAnswerObj.put("answerList", answerArr);

                    questionAnswerArr.add(questionAnswerObj);
                }
                resultObj.put("resultSeq_"+resultSeq, questionAnswerArr);
            }

            returnJsonObj.put("resultList", resultObj);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            dbConnector.closeQuery(rs, pstmt, conn);
            dbConnector.closeQuery(_rs, pstmt, conn);
        }

        return returnJsonObj;
    }
}
