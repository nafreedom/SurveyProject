package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/doSetResponseForm")
public class SetResponseFormServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String creatorId = request.getParameter("creatorId"),
               title = request.getParameter("title");

        System.out.println("doSetResponseForm : " + creatorId + ", " + title);

        JSONObject jsonObject = null;

        try {
            SurveyDAO survey = SurveyDAO.getInstance();
            jsonObject = survey.setResponseForm(creatorId, title);

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
