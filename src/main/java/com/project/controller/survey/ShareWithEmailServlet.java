//package com.project.controller.survey;
//
//import javax.mail.Message;
//import javax.mail.PasswordAuthentication;
//import javax.mail.Session;
//import javax.mail.Transport;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import javax.mail.Authenticator;
//import java.util.Properties;
//
//@WebServlet("/doShareWithEmail")
//public class ShareWithEmailServlet extends HttpServlet {
//    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        response.setContentType("text/html; charset=utf-8");
//
////        int result = 0;
////        String data = "",
////              email = request.getParameter("email"),
////              username = request.getParameter("username"),
////              url = request.getParameter("url");
////        System.out.println(email);
////        System.out.println(username);
////        System.out.println(url);
//
//        service(request, response);
//    }
//
//    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        int result = 0;
//        String data = "",
//                email = request.getParameter("email"),
//                username = request.getParameter("username"),
//                url = request.getParameter("url");
//        System.out.println(email);
//        System.out.println(username);
//        System.out.println(url);
//
//        Properties props = System.getProperties();
//        props.setProperty("mail.transport.protocol", "smtp");
//        props.setProperty("mail.host", "smtp.gmail.com");
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.port", "465");
//        props.put("mail.smtp.socketFactory.port", "465");
//        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//        props.put("mail.smtp.socketFactory.fallback", "false");
//
//        Authenticator auth = new MyAuthenticator();
//
//        Session session = Session.getDefaultInstance(props, auth);
//        session.setDebug(true);
//
//        MimeMessage msg = new MimeMessage(session);
//
//        try {
//            msg.setFrom(new InternetAddress("s2017s16@e-mirim.hs.kr", "보내는 사람"));
//            msg.addRecipient(Message.RecipientType.TO, new InternetAddress(email, "받는 사람"));
//            msg.setSubject("설문조사 응답 요청");
//            msg.setContent("here : " + url + "!!", "text/html; charset=utf-8");
//
//            Transport.send(msg);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        response.setContentType("application/x-json; charset = utf-8");
//        response.setCharacterEncoding("utf-8");
//
//        data = "{\"result\" : " + result + "}";
//        response.getWriter().print(data);
//        System.out.println("result : " + result);
//    }
//
//    static class MyAuthenticator extends Authenticator {
//        public PasswordAuthentication getPasswordAuthentication() {
//            String username = "s2017s16@e-mirim.hs.kr";
//            String password = "Tjslrkwhdk1!";
//            return new PasswordAuthentication(username, password);
//        }
//    }
//
//    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        doPost(request, response);
//    }
//}
