package com.project.dao;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.io.FileReader;
import java.sql.*;
import java.util.Properties;

public class DBConnector {
    private DataSource dataSource;
    private Connection connection = null;

    private static DBConnector dbConnector = new DBConnector();

    public static DBConnector getInstance() {return dbConnector; }

    public DBConnector(){
        try{
            Context context = new InitialContext();
            dataSource = (DataSource)context.lookup("java:comp/env/jdbc_conn");
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public Connection getDBConnection() throws Exception{
        try{
            connection = dataSource.getConnection();
        }catch (Exception e){
            e.printStackTrace();
        }

        return connection;
    }

    public void closeQuery(ResultSet rs, PreparedStatement pstmt, Connection conn) {
        if (rs != null) {
            try {
                rs.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (pstmt != null) {
            try {
                pstmt.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void closeUpdate(PreparedStatement pstmt, Connection conn) {
        if (pstmt != null) {
            try {
                pstmt.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
