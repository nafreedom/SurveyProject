package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import com.project.vo.SurveyVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

@WebServlet("/doSaveEditedSurvey")
public class SaveEditedSurveyServlet extends HttpServlet {
    SurveyDAO survey = SurveyDAO.getInstance();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        System.out.println("inside doSaveEditedSurvey");
        String data = "";
        int surveyNum = 0,
            result = 0,
            questionSeq = 0;
        Timestamp endTime = null;

        String title = request.getParameter("title");
        String creatorId = request.getParameter("creatorId");
        String expl = request.getParameter("expl");
        String time = request.getParameter("endTime");
        String url = request.getParameter("url");
        endTime = Timestamp.valueOf(time.replace("T", " ").concat(".0"));
        Timestamp madeDate = new Timestamp(System.currentTimeMillis());

        String[] questionArr = request.getParameterValues("question");
        String[] questionTypeArr = request.getParameterValues("questionType");
        String[] optionArr = null;

        System.out.println("title : " + title);
        System.out.println("creatorId : " + creatorId);
        System.out.println("expl : " + expl);
        System.out.println("endTime : " + endTime);
        System.out.println("madeDate : " + madeDate);
        System.out.println("url : " + url);

        surveyNum = survey.getSurveyNum(creatorId, title);
        result = deleteOriginalSurveyData(surveyNum);
        System.out.println(result);

        response.setContentType("application/x-json; charset = utf-8");
        response.setCharacterEncoding("utf-8");

        data = "{\"result\" : " + result + "}";
        response.getWriter().print(data);

        System.out.println("enrollservlet data : " + data);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    int deleteOriginalSurveyData(int surveyNum) {
        int isDeleted = 0;

        try {
            isDeleted = survey.deleteOriginalData(surveyNum);
            System.out.println("isDeleted : " + isDeleted);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isDeleted;
    }
}
