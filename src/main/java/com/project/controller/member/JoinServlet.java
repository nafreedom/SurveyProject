package com.project.controller.member;

import com.project.dao.MemberDAO;
import com.project.vo.MemberVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

@WebServlet("/doJoin")
public class JoinServlet extends HttpServlet{

    protected void doPost (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        PrintWriter out = response.getWriter();

        System.out.println("inside the JoinServlet");

        MemberVO vo = new MemberVO();
        int result = 0;
        String data = "";
        String id = request.getParameter("id");
        String pw = request.getParameter("pw");

        System.out.println("joinServlet id : " + id);
        System.out.println("joinServlet pw : " + pw);

        vo.setId(id);
        vo.setPw(pw);

        try {
            MemberDAO member = MemberDAO.getInstance();
            result = member.joinMember(vo);

            // int 형태로 return
            response.setContentType("application/x-json; charset=utf-8");
            response.setCharacterEncoding("utf-8");

            data = "{\"result\" : " + result + ", \"id\" : \"" + id + "\"}";
            response.getWriter().write(data);
            System.out.println("joinServlet result : "+result);
            System.out.println("joinServlet data : " + data);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
