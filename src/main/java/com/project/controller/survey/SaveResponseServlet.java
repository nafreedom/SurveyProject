package com.project.controller.survey;

import com.project.constants.SurveyConstants;
import com.project.dao.SurveyDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/doSaveResponse")
@MultipartConfig(maxFileSize=1024*1024*100, location=SurveyConstants.fileUploadPath)
public class SaveResponseServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        response.setContentType("text/html; charset=utf-8");

        String data = "",
                title = request.getParameter("title"),
                creatorId = request.getParameter("creatorId"),
                answer = "",
                ipAddr = request.getParameter("ipAddr"),
                email = request.getParameter("email");
        String[] questionArr = request.getParameterValues("question");
        String[] questionTypeArr = request.getParameterValues("questionType");
        String[] answerArr = null;
        int result = 0,
           resultSeq = 0,
           surveyNum = 0;

        try {
            SurveyDAO survey = SurveyDAO.getInstance();

            surveyNum = survey.getSurveyNum(creatorId, title);

            resultSeq = survey.getResultSeq();

            for (int i=0; i<questionArr.length; i++) {
                System.out.println((i+1) + ". " + questionArr[i] + "Answer");
                if (questionTypeArr[i].equals("checkbox")) {
                    answerArr = request.getParameterValues((i+1) + ". " + questionArr[i] + "Answer");
                    for (int j=0; j<answerArr.length; j++) {
                        result = survey.saveResponse(resultSeq, surveyNum, (i + 1), answerArr[j], "", ipAddr, email);
                    }
                }
                else if(questionTypeArr[i].equals("file")){
                    Part part = request.getPart((i+1) + ". " + questionArr[i] + "Answer");
                    if(part != null){
                        String fileName = getFilename(part);
                        String uploadFileName = "";
                        String uploadPath = "";
                        if(fileName != null && !fileName.isEmpty())
                        {
                            uploadFileName = System.currentTimeMillis() + fileName;
                            part.write(uploadFileName);
                            uploadPath = SurveyConstants.fileUploadPath + "\\" +uploadFileName;
                        }

                        result = survey.saveResponse(resultSeq, surveyNum, (i+1), uploadFileName, uploadPath, ipAddr, email);
                    }
                }
                else {
                    answer = request.getParameter((i+1) + ". " + questionArr[i] + "Answer");
                    result = survey.saveResponse(resultSeq, surveyNum, (i+1), answer, "", ipAddr, email);
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

    private void getPartConfig(Part part) {
        System.out.println("------------------------------------------------------------");
        System.out.println(" LOG :: [HTML태그의 폼태그 이름] :: " + part.getName());
        System.out.println(" LOG :: [ 파일 사이즈 ] :: " + part.getSize());
        for(String name : part.getHeaderNames()) {
            System.out.println(" LOG :: HeaderName :: " + name + ", HeaderValue :: " + part.getHeader(name) + "\n");
        }
        System.out.println("------------------------------------------------------------");
    }

    private String getFilename(Part part){
        String returnFileName = null;

        String contentDispositionHeader = part.getHeader("content-disposition");
        String [] contentArr = contentDispositionHeader.split(";");
/*

        for(String element: elements){
            System.out.println("서브스트링 전:" +element);
            returnFileName = element.substring(element.indexOf('=')+1);
            System.out.println("트림 전:"+returnFileName);
            returnFileName = returnFileName.trim().replace("\""," "); // " <- 쌍따옴표 지움
            System.out.println("트림 후:"+returnFileName);
        }
*/

        for (String content : contentArr) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf("=") + 2, content.length()-1);
            }
        }

        return returnFileName;
    }
}
