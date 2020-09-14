package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/doGetLabelInfo")
public class GetLabelInfoServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String data = "",
                title = request.getParameter("title"),
                creatorId = request.getParameter("creatorId");

        System.out.println("doGetLabelInfo : " + title + ", " + creatorId);

        int surveyNum = 0;
        JSONObject jsonObject = null;

        try {
            SurveyDAO survey = SurveyDAO.getInstance();
            surveyNum = survey.getSurveyNum(creatorId, title);
            System.out.println("surveyNum : " + surveyNum);

            jsonObject = survey.getLabelInfo(surveyNum);

            response.setContentType("application/x-json; charset = utf-8");
            response.setCharacterEncoding("utf-8");

            String stringifiedJson = jsonObject.toJSONString();
            response.getWriter().print(stringifiedJson);
            System.out.println(stringifiedJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
