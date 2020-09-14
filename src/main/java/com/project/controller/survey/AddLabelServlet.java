package com.project.controller.survey;

import com.project.dao.SurveyDAO;
import com.project.vo.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Timestamp;

@WebServlet("/doNewLabel")
public class AddLabelServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        int result = 0;
        int labelSeq = 0;
        String data = "";

        int surveyNum = 0;
        String userId = request.getParameter("addUserId"),
                title = request.getParameter("addTitle"),
                labelNickname = null;
        String[] labelArr = request.getParameterValues("label");
        String[] labelOptionArr = null;

        System.out.println(userId);
        System.out.println(title);

        try {
            SurveyDAO survey = SurveyDAO.getInstance();
            surveyNum = survey.getSurveyNum(userId, title);

            System.out.println(labelArr);
            System.out.println("!!surveyNum : " + surveyNum);

            if (labelArr != null) {
                for (int i = 0; i < labelArr.length; i++) {
                    labelNickname = request.getParameter(labelArr[i] + "LabelNickname");
                    System.out.println("nick : " + labelNickname);
                    labelSeq = updateLabelTbl(surveyNum, (i + 1), labelArr[i], labelNickname);
                    labelOptionArr = request.getParameterValues(labelArr[i] + "LabelOption");
                    for (int j = 0; j < labelOptionArr.length; j++) {
                        result = updateLabelOptionTbl(labelSeq, (j + 1), labelOptionArr[j]);
                    }
                }
            }

            response.setContentType("application/x-json; charset = utf-8");
            response.setCharacterEncoding("utf-8");

            data = "{\"result\" : " + result + "}";
            response.getWriter().write(data);

            System.out.println("enrollservlet data : " + data);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    int updateLabelTbl(int surveyNum, int labelNum, String labelName, String labelNickname) {
        SurveyDAO survey = SurveyDAO.getInstance();
        LabelVO labelVO = new LabelVO();
        int labelSeq = 0;

        labelVO.setSurveyNum(surveyNum);
        labelVO.setLabelNum(labelNum);
        labelVO.setLabelName(labelName);
        labelVO.setLabelNickname(labelNickname);

        try {
            labelSeq = survey.newLabel(labelVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return labelSeq;
    }

    int updateLabelOptionTbl(int labelSeq, int labelOptionNum, String labelOptionValue) {
        SurveyDAO survey = SurveyDAO.getInstance();
        LabelOptionVO labelOptionVO = new LabelOptionVO();
        int result = 0;

        labelOptionVO.setLabelSeq(labelSeq);
        labelOptionVO.setLabelOptionNum(labelOptionNum);
        labelOptionVO.setLabelOptionValue(labelOptionValue);

        try {
            result = survey.newLabelOption(labelOptionVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
