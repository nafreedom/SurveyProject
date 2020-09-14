package com.project.controller.survey;

import com.project.dao.SurveyDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/doSaveResponseLabel")
public class SaveResponseLabelServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

       int resultSeq = Integer.parseInt(request.getParameter("resultSeq"));
       String[] labelArr = request.getParameterValues("responseLabel");

       String data = "";
       int result = 0,
           surveyNum = 0,
            labelOptionNum = 0;

       System.out.println("inside the saveResponseLabelServlet");
       System.out.println("resultSeq : " + resultSeq);

        try {
            SurveyDAO survey = SurveyDAO.getInstance();

            //System.out.println("labelArr.length : " + labelArr.length);
            if(labelArr != null){
                for (int i=0; i<labelArr.length; i++) {
                    System.out.println("============ i : " + i);
                    System.out.println("labelArr[i] : " + labelArr[i]);
                    System.out.println((i+1) + ". " + labelArr[i] + "LabelResponseoption");
                    labelOptionNum = Integer.parseInt(request.getParameter(labelArr[i] + "LabelResponseoption"));
                    result = survey.saveResponseLabel(resultSeq, (i+1), labelOptionNum);
                    System.out.println("labelResponseoption : " + labelOptionNum);
                }
            }

            response.setContentType("application/x-json; charset = utf-8");
            response.setCharacterEncoding("utf-8");

            data = "{\"result\" : " + result + ", \"resultSeq\" : " + resultSeq + "}";
            response.getWriter().print(data);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
