package com.project.controller.survey;

import com.project.dao.SurveyDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/doEncryptURL")
public class encryptURLServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String title = request.getParameter("title"),
               creatorId = request.getParameter("creatorId"),
               url = "",
               data = "";
        SurveyDAO survey = SurveyDAO.getInstance();

        // encrypt url here

        response.setContentType("application/x-json; charset = utf-8");
        response.setCharacterEncoding("utf-8");

        data = "{\"url\" : \"" + url + "\"}";
        response.getWriter().write(data);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
