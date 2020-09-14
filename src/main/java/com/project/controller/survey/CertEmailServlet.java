package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import com.project.util.SMTPUtil;
import com.project.vo.SurveySettingEmailVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/doCertEmail")
public class CertEmailServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String email = request.getParameter("email");
        String password = request.getParameter("password");
        int surveyNum = Integer.parseInt(request.getParameter("surveyNum"));

        JSONObject jsonObject = null;

        try {
            SurveyDAO survey = SurveyDAO.getInstance();

            SurveySettingEmailVO vo = new SurveySettingEmailVO();
            vo.setSurveyNum(surveyNum);
            vo.setEmail(email);
            vo.setPassword(password);

            jsonObject = survey.certPassword(vo);
            String stringifiedJson = jsonObject.toJSONString();

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
