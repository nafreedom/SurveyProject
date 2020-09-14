package com.project.controller.member;

import com.project.dao.MemberDAO;
import com.project.vo.MemberVO;
import com.project.dao.MemberDAO;
import netscape.javascript.JSObject;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet("/doLogin")
public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        PrintWriter out = response.getWriter();

        System.out.println("inside the loginServlet");

        boolean result = false;
        String data = "";
        String id = request.getParameter("id");
        String pw = request.getParameter("pw");

        System.out.println("loginServlet : " + id + " " + pw);

        try {
            MemberDAO member = MemberDAO.getInstance();

            result = member.loginMember(id, pw);
            System.out.println("loginServlet result : " + result);

            response.setContentType("application/x-json; charset=utf-8");
            response.setCharacterEncoding("utf-8");

            data = "{\"result\" : " + result + ", \"id\" : \"" + id + "\"}";
            response.getWriter().print(data);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}