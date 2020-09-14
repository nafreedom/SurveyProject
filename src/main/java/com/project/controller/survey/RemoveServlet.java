package com.project.controller.survey;

import com.project.dao.SurveyDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/doRemoveSurvey")
public class RemoveServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String title = request.getParameter("title"),
               creatorId = request.getParameter("creatorId"),
               data = "";
        int surveyNum = 0,
            result = 0;

        try {
            SurveyDAO survey = SurveyDAO.getInstance();
            surveyNum = survey.getSurveyNum(creatorId, title);

            result = survey.deleteLabelResponseData(surveyNum);
            System.out.println("result : " + result);
            result = survey.deleteSurveyResponseData(surveyNum);
            System.out.println("result : " + result);
            result = survey.deleteOriginalData(surveyNum);
            System.out.println("result : " + result);

            response.setContentType("application/x-json; charset = utf-8");
            response.setCharacterEncoding("utf-8");

            data = "{\"result\" : " + result + "}";
            response.getWriter().print(data);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
