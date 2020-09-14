package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import com.project.vo.SurveyVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/doAddQuestionType")
public class AddQuestionServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        System.out.println("inside the doAddQuestionType");
        PrintWriter out = response.getWriter();

        String data = "",
               question = request.getParameter("questionValue"),
               answerType = request.getParameter("answerType");

        System.out.println(question);
        System.out.println(answerType);

        try {
            SurveyDAO survey = SurveyDAO.getInstance();

            response.setContentType("application/x-json; charset = utf-8");
            response.setCharacterEncoding("utf-8");

            data = "{\"question\" : \"" + question + "\", \"answerType\" : \"" + answerType + "\"}";
            response.getWriter().print(data);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
