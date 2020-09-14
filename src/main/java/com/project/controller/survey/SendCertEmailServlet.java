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

@WebServlet("/doSendCertEmail")
public class SendCertEmailServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String email = request.getParameter("email");
        int surveyNum = Integer.parseInt(request.getParameter("surveyNum"));

        JSONObject jsonObject = null;

        try {
            SurveyDAO survey = SurveyDAO.getInstance();
            JSONObject surveyInfoJsonTmp = survey.getSurveyInfo(surveyNum);
            JSONArray surveyInfoArrTmp = (JSONArray) surveyInfoJsonTmp.get("survey");
            JSONObject surveyInfoJson = (JSONObject) surveyInfoArrTmp.get(0);

            String surveyTitle = (String) surveyInfoJson.get("title");
            String surveyUrl = "http://172.30.7.77:8080/html/surveyResponse.html?url=" + (String) surveyInfoJson.get("url");

            String password = SMTPUtil.sendCertEmail(email,surveyTitle,surveyUrl);

            SurveySettingEmailVO vo = new SurveySettingEmailVO();
            vo.setSurveyNum(surveyNum);
            vo.setEmail(email);
            vo.setPassword(password);
            int result = survey.saveEmailCollectPassword(vo);

            jsonObject = new JSONObject();
            jsonObject.put("result", result);
            String stringifiedJson = jsonObject.toJSONString();

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
