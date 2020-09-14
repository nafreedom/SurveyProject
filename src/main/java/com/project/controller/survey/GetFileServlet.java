package com.project.controller.survey;

import com.project.constants.SurveyConstants;
import com.project.dao.SurveyDAO;
import org.json.simple.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.plaf.synth.SynthTextAreaUI;
import java.io.*;
import java.net.URLEncoder;

@WebServlet("/getFileServlet")
public class GetFileServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        String uploadPath = SurveyConstants.fileUploadPath + "\\" + request.getParameter("fileName");

        try {
            File downloadFile = new File(uploadPath);

            if(downloadFile.length() > 0 && downloadFile.isFile()){
                FileInputStream inStream = new FileInputStream(downloadFile);

                // obtains ServletContext
                ServletContext context = getServletContext();

                String mimeType = context.getMimeType(uploadPath);
                if (mimeType == null) {
                    mimeType = "application/octet-stream";
                }
                System.out.println("MIME type: " + mimeType);

                response.setContentType(mimeType);
                response.setContentLength((int) downloadFile.length());

                String headerKey = "Content-Disposition";
                String headerValue = String.format("attachment; filename=\"%s\"", downloadFile.getName());
                response.setHeader(headerKey, headerValue);

                response.addHeader("Set-Cookie", "fileDownload=true; path=/");

                OutputStream outStream = response.getOutputStream();

                byte[] buffer = new byte[4096];
                int bytesRead = -1;

                while ((bytesRead = inStream.read(buffer)) != -1) {
                    outStream.write(buffer, 0, bytesRead);
                }

                inStream.close();
                outStream.close();
            }else{
                response.addHeader("Set-Cookie", "fileDownload=false; path=/");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
