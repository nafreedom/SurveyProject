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

@WebServlet("/doDeleteQuestion")
public class DeleteQuestionServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String stringifiedJson = "";
        String[] questions = request.getParameterValues("question");
        System.out.println(questions);
        System.out.println(questions.length);
        JSONObject jsonObject = new JSONObject(),
            questionObject = null;
        JSONArray jsonArray = new JSONArray();

        for (int i=0; i<questions.length; i++) {
            System.out.println(questions[i]);
            questionObject = new JSONObject();
            questionObject.put("question", questions[i]);
            jsonArray.add(questionObject);
        }
        jsonObject.put("questions", jsonArray);

        response.setContentType("application/x-json; charset = utf-8");
        response.setCharacterEncoding("utf-8");

        stringifiedJson = jsonObject.toJSONString();
        response.getWriter().print(stringifiedJson);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
