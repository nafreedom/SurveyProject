package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/doShowSurveyList")
public class ListServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset = utf-8");

        System.out.println("inside the doShowSurveyList");

        JSONObject jsonObject = null;
        String loginId = request.getParameter("loginId");

        System.out.println("loginId : " + loginId);

        try {
            SurveyDAO survey = SurveyDAO.getInstance();
            jsonObject = survey.surveyList(loginId);

            String stringifiedJson = jsonObject.toJSONString();
            System.out.println("jsonObject : " + jsonObject);
            System.out.println("stringifiedJson : " + stringifiedJson);

            System.out.println(jsonObject);
            System.out.println(stringifiedJson);

            response.setContentType("application/x-json; charset=utf-8");
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(stringifiedJson);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
