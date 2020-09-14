package com.project.dao;

import com.project.vo.MemberVO;

import java.io.File;
import java.io.FileReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;


public class MemberDAO {
    private static MemberDAO _instance = new MemberDAO();
    DBConnector dbConnector = null;
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    public static MemberDAO getInstance() { return _instance; }

    public int joinMember (MemberVO member) throws Exception {
        int result = 0;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.dbConnect();

            String sql = "select id from members where id = ?";

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, member.getId());
            rs = pstmt.executeQuery();

            if(rs.next()) {
                result = 0;
            }
            else {
                sql = "insert into members values (?, ?)";

                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, member.getId());
                pstmt.setString(2, member.getPw());
                result = pstmt.executeUpdate();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeUpdate(pstmt, conn);
        }

        return result;
    }

    public boolean loginMember (String id, String pw) throws Exception {
        boolean result = false;

        try {
            dbConnector = DBConnector.getInstance();
            conn = dbConnector.dbConnect();

            String sql = "select id, pw from members where id = ? AND pw = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            pstmt.setString(2, pw);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                result = true;
                System.out.println(rs.getString("id"));
                System.out.println(rs.getString("pw"));
                System.out.println(sql);
            }
            else result = false;

            System.out.println("MemberDAO : "+result);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            dbConnector.closeQuery(rs, pstmt, conn);
        }
        return result;
    }
}
