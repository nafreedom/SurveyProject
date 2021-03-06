package com.project.controller.survey;

import com.project.dao.SurveyDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/doGetSurveyUrl")
public class GetSurveyUrlServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String data = "",
               url = "",
               targetCreatorId = request.getParameter("targetCreatorId"),
               targetTitle = request.getParameter("targetTitle");

        try {
            SurveyDAO survey = SurveyDAO.getInstance();
            url = survey.getSurveyUrl(targetCreatorId, targetTitle);
            System.out.println(url);

            response.setContentType("application/x-json; charset = utf-8");
            response.setCharacterEncoding("utf-8");

            data = "{\"url\" : \"" + url + "\"}";
            response.getWriter().print(data);
            System.out.println("==== share url data : " + data);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
