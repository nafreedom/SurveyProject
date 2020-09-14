package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/doShowSurveyFormList")
public class ListSurveyFormServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset = utf-8");

        SurveyDAO survey = SurveyDAO.getInstance();
        JSONObject returnJSONObj = survey.getSurveyFormList();
        String returnString = returnJSONObj.toJSONString();

        response.setContentType("application/x-json; charset=utf-8");
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(returnString);
    }
}
