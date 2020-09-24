package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import org.json.simple.JSONObject;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/doEditSurvey")
public class EditServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        System.out.println("in editservlet");

        int surveyNum = Integer.parseInt(request.getParameter("surveyNum"));
        System.out.println(" surveyNum in editServlet : " + surveyNum);

        JSONObject jsonObject = null;

        try {
            SurveyDAO survey = SurveyDAO.getInstance();
            jsonObject = survey.getSurveyInfo(surveyNum);

            String stringifiedJson = jsonObject.toJSONString();
            System.out.println("jsonObject : " + jsonObject);
            System.out.println("stringifiedJson : " + stringifiedJson);

            response.setContentType("application/x-json; charset=utf-8");
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(stringifiedJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
