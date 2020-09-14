package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/doGetEachResultInfo")
public class GetEachResultInfoServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String data = "",
               title = request.getParameter("title"),
               creatorId = request.getParameter("creatorId");

        int surveyNum = 0;
        JSONObject jsonObject = null;

        try {
            SurveyDAO survey = SurveyDAO.getInstance();
            surveyNum = survey.getSurveyNum(creatorId, title);

            jsonObject = survey.getEachResultInfo(surveyNum);

            response.setContentType("application/x-json; charset = utf-8");
            response.setCharacterEncoding("utf-8");

            String stringifiedJson = jsonObject.toJSONString();

            response.getWriter().print(stringifiedJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
