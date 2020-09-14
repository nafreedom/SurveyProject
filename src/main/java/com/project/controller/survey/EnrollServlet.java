package com.project.controller.survey;

import com.project.constants.SurveyConstants;
import com.project.dao.SurveyDAO;
import com.project.vo.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

@WebServlet("/doNewSurvey")
public class EnrollServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        System.out.println("inside the doNewSurvey");
        String data = "";
        Timestamp endTime  = null;

        String title = request.getParameter("title");
        String expl = request.getParameter("expl");
        String creatorId = request.getParameter("creatorId");
        Timestamp madeDate = new Timestamp(System.currentTimeMillis());
        String time = request.getParameter("endTime");
        endTime = Timestamp.valueOf(time.replace("T", " ").concat(".0"));
        String url = request.getParameter("url");

        //SETTINGS
        int emailCollectYN = SurveyConstants.YN_N;
        if(request.getParameter("emailCollect") != null && request.getParameter("emailCollect").equals("on")){
            emailCollectYN = SurveyConstants.YN_Y;
        }
        int emailOpenYN = SurveyConstants.YN_N;
        if(request.getParameter("emailOpen") != null && request.getParameter("emailOpen").equals("on")){
            emailOpenYN = SurveyConstants.YN_Y;
        }

        System.out.println(title);
        System.out.println(expl);
        System.out.println(creatorId);
        System.out.println(madeDate);
        System.out.println(time);
        System.out.println(endTime);
        System.out.println(url);

        String[] questionArr = request.getParameterValues("question");
        String[] questionTypeArr = request.getParameterValues("questionType");
        String[] optionArr = null;

        String[] labelArr = request.getParameterValues("label");
        String[] labelOptionArr = null;

        int surveyNum = 0,
            questionSeq = 0,
            result = 0,
            duplicateSurvey = 0;

        if (!(madeDate.before(endTime))) {
            result = 2;
        }
        else {
            duplicateSurvey = chkDuplicateSurvey(title, creatorId);
            if (duplicateSurvey != 2) {
                surveyNum = updateSurveyTbl(title, expl, creatorId, madeDate, endTime, url);

                //SURVEY SETTING
                updateSurveySetting(surveyNum, emailCollectYN, emailOpenYN);

                for (int i = 0; i < questionArr.length; i++) {
                    if(questionArr[i].isEmpty()){
                        continue;
                    }

                    String fileTypeJsonStr = "";
                    if(questionTypeArr[i].equals("file") && request.getParameter(questionArr[i] + "FileType") != null){
                        fileTypeJsonStr = request.getParameter(questionArr[i] + "FileType");
                    }

                    questionSeq = updateSurveyQuestionTbl(surveyNum, (i + 1), questionTypeArr[i], questionArr[i], fileTypeJsonStr);
                    System.out.println(questionArr[i]);
                    System.out.println(questionTypeArr[i]);

                    if (questionTypeArr[i].equals("radio") || questionTypeArr[i].equals("checkbox")) {
                        optionArr = request.getParameterValues(questionArr[i] + "Option");
                        for (int j = 0; j < optionArr.length; j++) {
                            result = updateSurveyOptionTbl(questionSeq, (i + 1), (j + 1), optionArr[j]);

                            System.out.println("enrollServlet result : " + result);
                        }
                    }
                    else
                        result = 1;
                }

//                System.out.println(labelArr);
//                System.out.println(labelArr.length);
//                for (int i=0; i<labelArr.length; i++) {
//                    result = updateLabelTbl(surveyNum, (i+1), labelArr[i]);
//                    labelOptionArr = request.getParameterValues(labelArr[i] + "LabelOption");
//                    for (int j=0; j<labelOptionArr.length; j++) {
//                        result = updateLabelOptionTbl((j+1), labelOptionArr[j]);
//                    }
//                }
            }
            else {
                result = -1;
            }
        }

        response.setContentType("application/x-json; charset = utf-8");
        response.setCharacterEncoding("utf-8");

        data = "{\"result\" : " + result + "}";
        response.getWriter().write(data);

        System.out.println("enrollservlet data : " + data);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    int chkDuplicateSurvey(String title, String creatorId) {
        SurveyDAO survey = SurveyDAO.getInstance();
        int result = 0;

        System.out.println("title in enrollServlet : " + title);
        System.out.println("id in enrollServlet : " + creatorId);

        try {
            result = survey.chkDuplicateSurvey(title, creatorId);
            System.out.println("result in enrollServlet : " + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    int updateSurveyTbl(String title, String expl, String creatorId, Timestamp madeDate, Timestamp endTime, String url) {
        SurveyDAO survey = SurveyDAO.getInstance();
        SurveyVO surveyVO = new SurveyVO();
        int surveyNum = 0;

        surveyVO.setTitle(title);
        surveyVO.setExpl(expl);
        surveyVO.setCreatorId(creatorId);
        surveyVO.setMadeDate(madeDate);
        surveyVO.setEndTime(endTime);
        surveyVO.setUrl(url);

        try {
            surveyNum = survey.newSurvey(surveyVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return surveyNum;
    }

    int updateSurveyQuestionTbl(int surveyNum, int questionNum, String questionType, String questionValue, String extInfo) {
        SurveyDAO survey = SurveyDAO.getInstance();
        SurveyQuestionVO surveyQuestionVO = new SurveyQuestionVO();
        int questionSeq = 0;

        surveyQuestionVO.setSurveyNum(surveyNum);
        surveyQuestionVO.setQuestionNum(questionNum);
        surveyQuestionVO.setQuestionType(questionType);
        surveyQuestionVO.setQuestionValue(questionValue);
        surveyQuestionVO.setExtInfo(extInfo);

        try {
            questionSeq = survey.newSurveyQuestion(surveyQuestionVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return questionSeq;
    }

    int updateSurveyOptionTbl(int questionSeq, int questionNum, int optionNum, String optionValue) {
        SurveyDAO survey = SurveyDAO.getInstance();
        SurveyOptionVO surveyOptionVO = new SurveyOptionVO();
        int result = 0;

        surveyOptionVO.setQuestionSeq(questionSeq);
        surveyOptionVO.setQuestionNum(questionNum);
        surveyOptionVO.setOptionNum(optionNum);
        surveyOptionVO.setOptionValue(optionValue);

        try {
            result = survey.newSurveyOption(surveyOptionVO);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    int updateSurveySetting(int surveyNum, int emailCollect, int emailOpen){
        int result = 0;

        SurveyDAO survey = SurveyDAO.getInstance();
        SurveySettingVO vo = new SurveySettingVO();

        vo.setSurveyNum(surveyNum);
        vo.setEmailCollect(emailCollect);
        vo.setEmailOpen(emailOpen);

        try {
            result = survey.newSurveySetting(vo);
        }catch(Exception e){
            e.printStackTrace();
        }

        return result;
    }
}
