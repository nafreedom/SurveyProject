package com.project.controller.survey;

import com.project.dao.DBConnector;
import com.project.dao.SurveyDAO;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.InetAddress;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/doGetIPAddr")
public class GetIPAddrServlet extends HttpServlet {
    InetAddress inetAddress = null;
    String ipAddress = "";
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        JSONObject jsonObject = new JSONObject();
        String ip = "",
               creatorId = request.getParameter("creatorId"),
               title = request.getParameter("title"),
               stringifiedJson = "";
        int surveyNum = 0;

        try {
            SurveyDAO surveyDAO = SurveyDAO.getInstance();
            surveyNum = surveyDAO.getSurveyNum(creatorId, title);
            System.out.println("surveyNum : " + surveyNum);

            ip = getIPAddr(request);
            if (ip.equalsIgnoreCase("127.0.0.1")) {
                 inetAddress = InetAddress.getLocalHost();
                ipAddress = inetAddress.getHostAddress();
                ip = ipAddress;
            }

            ip = responseOrNot(surveyNum, ip, request);

            System.out.println("ip in servlet : " + ip);

            jsonObject.put("ip", ip);
            jsonObject.put("creatorId", creatorId);
            jsonObject.put("title", title);
            stringifiedJson = jsonObject.toJSONString();

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

    protected String getIPAddr (HttpServletRequest request) {
        return request.getRemoteAddr();
    }

    protected String responseOrNot (int surveyNum, String ip, HttpServletRequest request) {
        DBConnector dbConnector = null;
        Connection conn = null;
        ResultSet rs = null;
        PreparedStatement pstmt = null;

        String sql = "",
               savedIp = "";

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.dbConnect();

            sql = "select * from survey_result where surveyNum=? AND ipAddr=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, surveyNum);
            pstmt.setString(2, ip);
            rs = pstmt.executeQuery();

            if (rs.next())
                savedIp = "responseDone";
            else {
                savedIp = getIPAddr(request);
                if (ip.equalsIgnoreCase("127.0.0.1")) {
                    inetAddress = InetAddress.getLocalHost();
                    ipAddress = inetAddress.getHostAddress();
                    savedIp = ipAddress;
                }
            }
            System.out.println("savedIp : " + savedIp);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }

        return savedIp;
    }
}
