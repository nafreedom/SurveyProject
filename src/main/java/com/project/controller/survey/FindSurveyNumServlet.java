package com.project.controller.survey;

import com.project.dao.SurveyDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/doFindSurveyNum")
public class FindSurveyNumServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String userId = request.getParameter("userId"),
               title = request.getParameter("title"),
               data = "";
        SurveyDAO survey = SurveyDAO.getInstance();
        int surveyNum = 0;

        System.out.println("userId : " + userId);
        System.out.println("title : " + title);

        surveyNum = survey.getSurveyNum(userId, title);
        System.out.println("surveyNum in findSurveyNumServlet : " + surveyNum);

        response.setContentType("application/x-json; charset = utf-8");
        response.setCharacterEncoding("utf-8");

        data = "{\"surveyNum\" : " + surveyNum + "}";
        response.getWriter().write(data);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
